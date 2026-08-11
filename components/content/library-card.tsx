import Link from "next/link";
import { getMember, getProject, priorityMeta } from "@/lib/data";
import type { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import {
  PriorityBadge,
  StatusBadge,
  TypeBadge,
} from "@/components/shared/badges";
import { DueChip } from "./due-chip";

export function LibraryCard({ item }: { item: ContentItem }) {
  const member = getMember(item.assigneeId);
  const project = getProject(item.projectId);

  return (
    <Link
      href={`/content/${item.id}`}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border border-l-[3px] bg-card p-3.5 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        priorityMeta[item.priority].accentClass,
      )}
    >
      <div className="flex items-center gap-1.5">
        <TypeBadge type={item.type} />
        <StatusBadge status={item.status} />
        <div className="ml-auto">
          <PriorityBadge priority={item.priority} />
        </div>
      </div>

      <h3 className="mt-2.5 line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
        {item.title}
      </h3>

      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      <div className="mt-3 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
        <span
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", project?.color)}
        />
        <span className="truncate font-medium text-foreground/80">
          {project?.name}
        </span>
        <span aria-hidden>·</span>
        <span className="truncate">{item.platform}</span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-3">
        <div className="flex min-w-0 items-center gap-1.5">
          {member && (
            <Avatar name={member.name} initials={member.initials} size="sm" />
          )}
          <span className="truncate text-xs text-muted-foreground">
            {member?.name}
          </span>
        </div>
        <DueChip dueDate={item.dueDate} />
      </div>
    </Link>
  );
}
