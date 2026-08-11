import Link from "next/link";
import { CircleCheck, LayoutList } from "lucide-react";
import { getMember, getProject, statusMeta } from "@/lib/data";
import type { ContentItem } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  PriorityBadge,
  StatusBadge,
  TypeBadge,
} from "@/components/shared/badges";
import { DueChip } from "./due-chip";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <dt className="shrink-0 text-sm text-muted-foreground">{label}</dt>
      <dd className="flex min-w-0 items-center justify-end gap-1.5 text-sm font-medium text-foreground">
        {children}
      </dd>
    </div>
  );
}

function formatViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export function DetailOverview({ item }: { item: ContentItem }) {
  const member = getMember(item.assigneeId);
  const project = getProject(item.projectId);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <LayoutList className="h-4 w-4" />
          </span>
          <CardTitle>Overview</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="divide-y divide-border">
          <Row label="Status">
            <StatusBadge status={item.status} />
          </Row>
          <Row label="Priority">
            <PriorityBadge priority={item.priority} />
          </Row>
          <Row label="Type">
            <TypeBadge type={item.type} />
          </Row>
          <Row label="Platform">
            <span className="truncate">{item.platform}</span>
          </Row>
          <Row label="Project">
            <Link
              href="/projects"
              className="flex min-w-0 items-center gap-1.5 transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  project?.color,
                )}
              />
              <span className="truncate">{project?.name}</span>
            </Link>
          </Row>
          <Row label="Owner">
            <div className="flex min-w-0 items-center gap-1.5">
              {member && (
                <Avatar
                  name={member.name}
                  initials={member.initials}
                  size="sm"
                />
              )}
              <span className="truncate">{member?.name}</span>
            </div>
          </Row>
          <Row label="Deadline">
            <DueChip dueDate={item.dueDate} />
          </Row>
          {item.status === "published" ? (
            item.publishedAt && (
              <Row label="Published">
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <CircleCheck className="h-4 w-4" />
                  {formatDate(item.publishedAt)}
                </span>
              </Row>
            )
          ) : (
            <Row label="Progress">
              <div className="flex w-28 items-center gap-2">
                <Progress
                  value={item.progress}
                  className="flex-1"
                  barClassName={statusMeta[item.status].barClass}
                />
                <span className="w-8 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                  {item.progress}%
                </span>
              </div>
            </Row>
          )}
          {item.views != null && (
            <Row label="Views">{formatViews(item.views)}</Row>
          )}
        </dl>

        {item.tags.length > 0 && (
          <div className="mt-4 border-t border-border pt-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tags
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-inset ring-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
