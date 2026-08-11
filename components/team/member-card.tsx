import Link from "next/link";
import { getProject, statusMeta } from "@/lib/data";
import type { MemberWorkload } from "@/lib/stats";
import type { TeamMember } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DueChip } from "@/components/content/due-chip";

const MAX_VISIBLE_TASKS = 4;

function workloadTone(workload: number) {
  if (workload >= 85)
    return {
      label: "Overloaded",
      barClass: "bg-rose-500",
      textClass: "text-rose-600",
    };
  if (workload >= 60)
    return {
      label: "Heavy",
      barClass: "bg-amber-500",
      textClass: "text-amber-600",
    };
  return {
    label: "On track",
    barClass: "bg-emerald-500",
    textClass: "text-emerald-600",
  };
}

const statsMeta = [
  {
    key: "active" as const,
    label: "Active",
    valueClass: "text-foreground",
    dotClass: "bg-zinc-400",
  },
  {
    key: "overdue" as const,
    label: "Overdue",
    valueClass: "text-rose-600",
    dotClass: "bg-rose-500",
  },
  {
    key: "published" as const,
    label: "Published",
    valueClass: "text-emerald-600",
    dotClass: "bg-emerald-500",
  },
];

export function MemberCard({
  member,
  workload,
}: {
  member: TeamMember;
  workload: MemberWorkload;
}) {
  const tone = workloadTone(member.workload);
  const accentClass =
    workload.overdue > 0 || member.workload >= 85
      ? "bg-rose-500"
      : member.workload >= 60
        ? "bg-amber-500"
        : "bg-emerald-500";

  const visibleTasks = workload.tasks.slice(0, MAX_VISIBLE_TASKS);
  const hiddenCount = workload.tasks.length - visibleTasks.length;

  return (
    <Card className="relative flex flex-col overflow-hidden">
      <span
        className={cn("absolute inset-x-0 top-0 h-1", accentClass)}
        aria-hidden
      />

      <div className="p-5">
        <div className="flex items-center gap-3">
          <Avatar name={member.name} initials={member.initials} size="lg" />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-semibold tracking-tight">
              {member.name}
            </h3>
            <p className="truncate text-sm text-muted-foreground">
              {member.role}
            </p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ring-border",
              tone.textClass,
            )}
          >
            {tone.label}
          </span>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Workload</span>
            <span className="font-medium tabular-nums">{member.workload}%</span>
          </div>
          <Progress
            value={member.workload}
            className="mt-2"
            barClassName={tone.barClass}
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-muted/60 p-2.5">
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
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    stat.dotClass,
                  )}
                  aria-hidden
                />
                {workload[stat.key]}
              </span>
              <span className="text-[11px] leading-tight text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-border/60 p-5 pt-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Current tasks
          </h4>
          <span className="text-xs tabular-nums text-muted-foreground">
            {workload.tasks.length}
          </span>
        </div>

        {visibleTasks.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No active tasks — available for new work.
          </p>
        ) : (
          <>
            <ul className="mt-2">
              {visibleTasks.map((item) => {
                const project = getProject(item.projectId);
                const status = statusMeta[item.status];
                return (
                  <li key={item.id}>
                    <Link
                      href={`/content/${item.id}`}
                      className="group -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          status.dotClass,
                        )}
                        aria-hidden
                      />
                      <span className="sr-only">{status.label}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                          {item.title}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {project?.name}
                        </span>
                      </span>
                      <DueChip dueDate={item.dueDate} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            {hiddenCount > 0 && (
              <p className="px-2 pt-2 text-xs text-muted-foreground">
                +{hiddenCount} more
              </p>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
