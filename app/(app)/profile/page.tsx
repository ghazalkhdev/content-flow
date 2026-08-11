import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Gauge,
  Rocket,
} from "lucide-react";
import {
  activities,
  contentItems,
  getProject,
  projects,
  teamMembers,
} from "@/lib/data";
import { getMemberWorkloads } from "@/lib/stats";
import { cn, timeAgo } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { DueChip } from "@/components/content/due-chip";
import { StatusBadge, TypeBadge } from "@/components/shared/badges";

export default function ProfilePage() {
  const user = teamMembers[0];

  const workloads = getMemberWorkloads(contentItems);
  const workload =
    workloads[user.id] ?? { active: 0, overdue: 0, published: 0, tasks: [] };

  const assignedItems = contentItems
    .filter((c) => c.assigneeId === user.id)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const userProjects = projects.filter((p) => p.memberIds.includes(user.id));

  const userActivity = [...activities]
    .filter((a) => a.userId === user.id)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 5);

  return (
    <>
      <PageHeader
        title="Profile"
        description="Your account details, skills, and current workload at a glance."
      />

      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar
              name={user.name}
              initials={user.initials}
              size="lg"
              className="h-12 w-12 text-sm"
            />
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold tracking-tight">
                {user.name}
              </h2>
              <p className="truncate text-sm text-muted-foreground">
                {user.role}
              </p>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard
          label="Active tasks"
          value={workload.active}
          caption="Scenario through review"
          icon={ClipboardList}
          iconClass="bg-amber-50 text-amber-600"
        />
        <KpiCard
          label="Published"
          value={workload.published}
          caption="Live content items"
          icon={Rocket}
          iconClass="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          label="Overdue tasks"
          value={workload.overdue}
          caption="Need rescheduling"
          icon={AlertTriangle}
          iconClass="bg-rose-50 text-rose-600"
          valueClass="text-rose-600"
        />
        <KpiCard
          label="Workload"
          value={`${user.workload}%`}
          caption="Current capacity"
          icon={Gauge}
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Assigned content</CardTitle>
            <CardDescription>Content items you are working on</CardDescription>
          </CardHeader>
          <CardContent>
            {assignedItems.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No content assigned.
              </p>
            ) : (
              <ul className="space-y-1">
                {assignedItems.map((item) => {
                  const project = getProject(item.projectId);
                  return (
                    <li key={item.id}>
                      <Link
                        href={`/content/${item.id}`}
                        className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium group-hover:text-primary">
                            {item.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="truncate">{project?.name}</span>
                            <span>·</span>
                            <TypeBadge type={item.type} />
                          </p>
                        </div>
                        <StatusBadge
                          status={item.status}
                          className="hidden sm:inline-flex"
                        />
                        <DueChip dueDate={item.dueDate} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Member of {userProjects.length}{" "}
                {userProjects.length === 1 ? "project" : "projects"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userProjects.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Not on any projects.
                </p>
              ) : (
                <ul className="space-y-1">
                  {userProjects.map((project) => (
                    <li key={project.id}>
                      <Link
                        href={`/projects/${project.id}`}
                        className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <span
                          className={cn(
                            "h-2.5 w-2.5 shrink-0 rounded-full",
                            project.color,
                          )}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium group-hover:text-primary">
                          {project.name}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Your latest actions</CardDescription>
            </CardHeader>
            <CardContent>
              {userActivity.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No recent activity.
                </p>
              ) : (
                <ul className="space-y-3">
                  {userActivity.map((activity) => (
                    <li key={activity.id} className="text-sm leading-snug">
                      <span className="text-muted-foreground">
                        {activity.message}
                      </span>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {timeAgo(activity.timestamp)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
