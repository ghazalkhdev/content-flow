"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { pipelineStages } from "@/lib/data";
import { useContentItems } from "@/lib/content-store";
import type { ContentItem, ContentStatus } from "@/lib/types";
import { ContentCardView } from "./content-card";
import { PipelineColumn } from "./pipeline-column";

function buildColumns(items: ContentItem[]): Record<ContentStatus, string[]> {
  const columns = pipelineStages.reduce(
    (acc, stage) => {
      acc[stage.id] = [];
      return acc;
    },
    {} as Record<ContentStatus, string[]>,
  );
  for (const item of items) {
    columns[item.status]?.push(item.id);
  }
  return columns;
}

export function PipelineBoard() {
  const items = useContentItems();
  const [columns, setColumns] = useState(() => buildColumns(items));
  const [activeId, setActiveId] = useState<string | null>(null);
  const seededIds = useRef<Set<string>>(new Set(items.map((item) => item.id)));

  const itemsById = useMemo(
    () =>
      Object.fromEntries(items.map((item) => [item.id, item])) as Record<
        string,
        ContentItem
      >,
    [items],
  );

  useEffect(() => {
    setColumns((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const item of items) {
        if (seededIds.current.has(item.id)) continue;
        seededIds.current.add(item.id);
        next[item.status] = [...(next[item.status] ?? []), item.id];
        changed = true;
      }
      return changed ? next : prev;
    });
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function isColumnId(id: string): id is ContentStatus {
    return pipelineStages.some((stage) => stage.id === id);
  }

  function findContainer(id: string): ContentStatus | undefined {
    if (isColumnId(id)) return id;
    return pipelineStages.find((stage) => columns[stage.id].includes(id))?.id;
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeIdStr = String(active.id);
    const overId = String(over.id);
    if (activeIdStr === overId) return;

    setColumns((prev) => {
      const activeContainer = isColumnId(activeIdStr)
        ? activeIdStr
        : pipelineStages.find((s) => prev[s.id].includes(activeIdStr))?.id;
      const overContainer = isColumnId(overId)
        ? overId
        : pipelineStages.find((s) => prev[s.id].includes(overId))?.id;

      if (
        !activeContainer ||
        !overContainer ||
        activeContainer === overContainer
      ) {
        return prev;
      }

      const target = prev[overContainer];
      if (target.includes(activeIdStr)) return prev;

      const nextSource = prev[activeContainer].filter((id) => id !== activeIdStr);
      const nextTarget = [...target];
      const overIndex = target.indexOf(overId);
      nextTarget.splice(overIndex >= 0 ? overIndex : nextTarget.length, 0, activeIdStr);

      return { ...prev, [activeContainer]: nextSource, [overContainer]: nextTarget };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeIdStr = String(active.id);
    const overId = String(over.id);
    if (activeIdStr === overId) return;

    const activeContainer = findContainer(activeIdStr);
    const overContainer = findContainer(overId);
    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      setColumns((prev) => {
        const list = prev[activeContainer];
        const oldIndex = list.indexOf(activeIdStr);
        const newIndex = list.indexOf(overId);
        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return prev;
        return {
          ...prev,
          [activeContainer]: arrayMove(list, oldIndex, newIndex),
        };
      });
      return;
    }

    setColumns((prev) => {
      const target = prev[overContainer];
      if (target.includes(activeIdStr)) {
        const oldIndex = target.indexOf(activeIdStr);
        const overIndex = target.indexOf(overId);
        if (overIndex >= 0 && overIndex !== oldIndex) {
          return {
            ...prev,
            [overContainer]: arrayMove(target, oldIndex, overIndex),
          };
        }
        return prev;
      }

      const nextSource = prev[activeContainer].filter((id) => id !== activeIdStr);
      const nextTarget = [...target];
      const overIndex = target.indexOf(overId);
      nextTarget.splice(overIndex >= 0 ? overIndex : nextTarget.length, 0, activeIdStr);

      return {
        ...prev,
        [activeContainer]: nextSource,
        [overContainer]: nextTarget,
      };
    });
  }

  const activeItem = activeId ? itemsById[activeId] : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="flex min-h-[26rem] gap-4 overflow-x-auto pb-4 lg:h-[calc(100vh-13.5rem)]">
        {pipelineStages.map((stage) => (
          <PipelineColumn
            key={stage.id}
            id={stage.id}
            label={stage.label}
            itemIds={columns[stage.id]}
            itemsById={itemsById}
          />
        ))}
      </div>
      <DragOverlay>
        {activeItem ? (
          <div className="w-72 px-2.5">
            <ContentCardView item={activeItem} overlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
