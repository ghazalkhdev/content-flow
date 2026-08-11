import Link from "next/link";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { projectStatusMeta } from "@/lib/data";
import { getProjectStats } from "@/lib/stats";
import type { ContentItem, Project } from "@/lib/types";
import { cn, daysUntil, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AvatarStack } from "@/components/shared/avatars";

const statsMeta = [
  {
    key: "total" as const,
    label: "Total",
    valueClass: "text-foreground",
    dotClass: "bg-zinc-400",
  },
  {
    key: "inProgress" as const,
    label: "In progress",
    valueClass: "text-amber-600",
    dotClass: "bg-amber-500",
  },
  {
    key: "waitingReview" as const,
    label: "Waiting review",
    valueClass: "text-violet-600",
    dotClass: "bg-violet-500",
  },
  {
    key: "published" as const,
    label: "Published",
    valueClass: "text-emerald-600",
    dotClass: "bg-emerald-500",
  },
];

export function ProjectCard({
  project,
  items,
}: {
  project: Project;
  items: ContentItem[];
}) {
  const stats = getProjectStats(items, project.id);
  const status = projectStatusMeta[project.status];
  const days = daysUntil(project.dueDate);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <span
        className={cn("absolute inset-x-0 top-0 h-1 rounded-t-xl", project.color)}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={cn("h-2.5 w-2.5 shrink-0 rounded-full", project.color)}
            aria-hidden
          />
          <h3 className="truncate text-[15px] font-semibold tracking-tight group-hover:text-primary">
            {project.name}
          </h3>
        </div>
        <Badge className={cn("shrink-0", status.badgeClass)}>
          {status.label}
        </Badge>
      </div>

      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-4 grid grid-cols-4 gap-2 rounded-lg bg-muted/60 p-2.5">
        {statsMeta.map((stat) => (
          <div
            key={stat.key}
            className="flex min-w-0 flex-col items-center gap-1 text-center"
          >
            <span
              className={cn(
                "flex items-center gap-1.5 text-base font-semibold tabular-nums",
                stat.valueClass,
              )}
            >
              <span
                className={cn("h-1.5 w-1.5 shrink-0 rounded-full", stat.dotClass)}
                aria-hidden
              />
              {stats[stat.key]}
            </span>
            <span className="text-[11px] leading-tight text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <div className="flex items-center gap-2">
          <Progress
            value={project.progress}
            className="flex-1"
            barClassName={project.color}
          />
          <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
            {project.progress}%
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <AvatarStack memberIds={project.memberIds} size="sm" limit={3} />
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CalendarClock className="h-3.5 w-3.5" />
              {days === 0 ? "Due today" : formatDate(project.dueDate)}
            </span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
