import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CalendarClock,
  FileClock,
  FileText,
  FolderOpen,
  ListTodo,
  Rocket,
} from "lucide-react";
import {
  contentItems,
  getProject,
  pipelineStages,
  projectStatusMeta,
  projects,
} from "@/lib/data";
import { getProjectStats } from "@/lib/stats";
import { cn, daysUntil, formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { AvatarStack } from "@/components/shared/avatars";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Progress } from "@/components/ui/progress";
import { LibraryCard } from "@/components/content/library-card";
import { EmptyState } from "@/components/content/empty-state";
import { CreateContentButton } from "@/components/content/create-content-button";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const project = getProject(id);
  if (!project) return { title: "Project not found · ContentFlow" };
  return { title: `${project.name} · ContentFlow` };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[id]">,
) {
  const { id } = await props.params;
  const project = getProject(id);
  if (!project) notFound();

  const stageOrder = new Map(
    pipelineStages.map((stage, index) => [stage.id, index]),
  );
  const projectItems = contentItems
    .filter((item) => item.projectId === project.id)
    .sort(
      (a, b) =>
        (stageOrder.get(a.status) ?? 0) - (stageOrder.get(b.status) ?? 0) ||
        a.dueDate.localeCompare(b.dueDate),
    );

  const stats = getProjectStats(contentItems, project.id);
  const status = projectStatusMeta[project.status];
  const days = daysUntil(project.dueDate);

  return (
    <>
      <PageHeader
        backHref="/projects"
        backLabel="Back to Projects"
        title={project.name}
        description={project.description}
        actions={<CreateContentButton initialProjectId={project.id} />}
      />

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Badge className={cn(status.badgeClass)}>{status.label}</Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarClock className="h-4 w-4" />
              {days === 0
                ? "Due today"
                : `Due ${formatDate(project.dueDate)}${days > 0 ? ` · ${days}d left` : ""}`}
            </span>
            <AvatarStack memberIds={project.memberIds} size="sm" limit={4} />
          </div>
          <div className="flex w-full min-w-52 items-center gap-2 sm:w-64">
            <Progress
              value={project.progress}
              className="flex-1"
              barClassName={project.color}
            />
            <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
              {project.progress}%
            </span>
          </div>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard
          label="Total contents"
          value={stats.total}
          caption="Across every stage"
          icon={FileText}
          iconClass="bg-zinc-100 text-zinc-600"
        />
        <KpiCard
          label="In progress"
          value={stats.inProgress}
          caption="Scenario through production"
          icon={ListTodo}
          iconClass="bg-amber-50 text-amber-600"
        />
        <KpiCard
          label="Waiting review"
          value={stats.waitingReview}
          caption="Needs a reviewer's eye"
          icon={FileClock}
          iconClass="bg-violet-50 text-violet-600"
        />
        <KpiCard
          label="Published"
          value={stats.published}
          caption="Shipped to the world"
          icon={Rocket}
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight">
            Contents in this project
          </h2>
          <span className="text-xs tabular-nums text-muted-foreground">
            {projectItems.length} item{projectItems.length === 1 ? "" : "s"}
          </span>
        </div>

        {projectItems.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No contents yet"
            description="This project doesn't have any content items yet. Add one to get the pipeline moving."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projectItems.map((item) => (
              <LibraryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
