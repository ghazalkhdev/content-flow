"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getMember, getProject, priorityMeta } from "@/lib/data";
import type { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { PriorityBadge } from "@/components/shared/badges";
import { DueChip } from "@/components/content/due-chip";

export function ContentCardView({
  item,
  overlay = false,
}: {
  item: ContentItem;
  overlay?: boolean;
}) {
  const member = getMember(item.assigneeId);
  const project = getProject(item.projectId);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border border-border border-l-[3px] bg-card p-3 shadow-xs transition-shadow duration-150 hover:shadow-md",
        priorityMeta[item.priority].accentClass,
        overlay && "rotate-1 shadow-xl ring-2 ring-primary/20",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="line-clamp-2 text-[13px] font-medium leading-snug text-foreground">
          {item.title}
        </p>
        <PriorityBadge priority={item.priority} className="shrink-0" />
      </div>

      <p className="mt-2 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
        <span
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            project?.color ?? "bg-zinc-300",
          )}
        />
        <span className="truncate">{project?.name}</span>
        <span aria-hidden>·</span>
        <span className="truncate">{item.platform}</span>
      </p>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/60 pt-2.5">
        <div className="flex min-w-0 items-center gap-1.5">
          {member && <Avatar name={member.name} initials={member.initials} size="sm" />}
          <span className="truncate text-xs text-muted-foreground">
            {member?.name}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <DueChip dueDate={item.dueDate} />
          <Link
            href={`/content/${item.id}`}
            aria-label={`Open ${item.title} details`}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-zinc-200/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SortableContentCard({
  id,
  item,
}: {
  id: string;
  item: ContentItem;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={cn("touch-none cursor-grab active:cursor-grabbing", isDragging && "opacity-30")}
    >
      <ContentCardView item={item} />
    </div>
  );
}
