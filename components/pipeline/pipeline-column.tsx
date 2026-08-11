"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { statusMeta } from "@/lib/data";
import type { ContentItem, ContentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SortableContentCard } from "./content-card";

export function PipelineColumn({
  id,
  label,
  itemIds,
  itemsById,
}: {
  id: ContentStatus;
  label: string;
  itemIds: string[];
  itemsById: Record<string, ContentItem>;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const meta = statusMeta[id];

  return (
    <section
      className={cn(
        "flex h-full w-72 shrink-0 flex-col rounded-xl ring-1 ring-border transition-colors",
        isOver ? "bg-primary/5 ring-primary/40" : "bg-muted/60",
      )}
    >
      <header className="flex items-center gap-2 px-3 pt-3 pb-2">
        <span className={cn("h-2 w-2 rounded-full", meta.dotClass)} />
        <h3 className="text-sm font-semibold tracking-tight">{label}</h3>
        <span className="rounded-full bg-zinc-200/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-muted-foreground">
          {itemIds.length}
        </span>
        <button
          type="button"
          aria-label={`Add content to ${label}`}
          className="ml-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-zinc-200/70 hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
        </button>
      </header>

      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={cn(
            "min-h-0 flex-1 space-y-2 overflow-y-auto px-2.5 pb-2.5 scrollbar-thin",
            isOver && "rounded-b-xl",
          )}
        >
          {itemIds.map((itemId) => (
            <SortableContentCard key={itemId} id={itemId} item={itemsById[itemId]} />
          ))}
          {itemIds.length === 0 && (
            <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
              Drop content here
            </div>
          )}
        </div>
      </SortableContext>
    </section>
  );
}
