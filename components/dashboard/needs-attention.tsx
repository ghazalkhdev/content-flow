import Link from "next/link";
import { getMember, getProject } from "@/lib/data";
import type { AttentionItem, AttentionReason } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const reasonMeta: Record<
  AttentionReason,
  { label: string; className: string }
> = {
  overdue: {
    label: "Overdue",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
  },
  "due-today": {
    label: "Due today",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  urgent: {
    label: "Urgent",
    className: "bg-rose-50 text-rose-700 ring-rose-200",
  },
  "stale-review": {
    label: "Stuck in review",
    className: "bg-violet-50 text-violet-700 ring-violet-200",
  },
};

function reviewDays(updatedAt: string) {
  return Math.max(
    0,
    Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86400000),
  );
}

export function NeedsAttention({
  items,
  className,
}: {
  items: AttentionItem[];
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Needs attention</CardTitle>
          <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-200">
            {items.length} item{items.length === 1 ? "" : "s"}
          </span>
        </div>
        <CardDescription>
          Overdue, due today, urgent, or stuck in review
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-sm font-medium text-foreground">
              Nothing needs attention
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything is on track. Nice work.
            </p>
          </div>
        ) : (
          <ul className="space-y-1">
            {items.map(({ item, reasons }) => {
              const member = getMember(item.assigneeId);
              const project = getProject(item.projectId);
              const days = reviewDays(item.updatedAt);

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
                    <div className="flex shrink-0 items-center gap-1.5">
                      {reasons.map((reason) => (
                        <Badge
                          key={reason}
                          className={cn(reasonMeta[reason].className)}
                        >
                          {reason === "stale-review"
                            ? `${reasonMeta[reason].label} · ${days}d`
                            : reasonMeta[reason].label}
                        </Badge>
                      ))}
                      {member && (
                        <Avatar
                          name={member.name}
                          initials={member.initials}
                          size="sm"
                        />
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
