import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMember, getProject } from "@/lib/data";
import type { ContentItem } from "@/lib/types";
import { cn, daysUntil, formatDate } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { TypeBadge } from "@/components/shared/badges";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function dueVariant(days: number) {
  if (days === 0) return "bg-rose-50 text-rose-700 ring-rose-200";
  if (days <= 2) return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-muted text-muted-foreground ring-border";
}

export function UpcomingDeadlines({
  items,
  className,
}: {
  items: ContentItem[];
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Upcoming deadlines</CardTitle>
          <Link
            href="/content"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <CardDescription>Due within the next two weeks</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-10 text-center">
            <p className="text-sm text-muted-foreground">
              All clear — nothing due soon.
            </p>
          </div>
        ) : (
          <ul className="space-y-1">
            {items.map((item) => {
              const member = getMember(item.assigneeId);
              const project = getProject(item.projectId);
              const days = daysUntil(item.dueDate);
              return (
                <li key={item.id}>
                  <Link
                    href={`/content/${item.id}`}
                    className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium group-hover:text-primary">
                        {item.title}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="truncate">{project?.name}</span>
                        {member && (
                          <>
                            <span>·</span>
                            <span>{member.name}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <TypeBadge type={item.type} className="hidden sm:inline-flex" />
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset",
                          dueVariant(days),
                        )}
                      >
                        {days === 0 ? "Today" : formatDate(item.dueDate)}
                      </span>
                      {member && (
                        <Avatar name={member.name} initials={member.initials} size="sm" />
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
