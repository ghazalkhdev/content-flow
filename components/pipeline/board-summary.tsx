"use client";

import { Filter } from "lucide-react";
import { projects, teamMembers } from "@/lib/data";
import { useContentItems } from "@/lib/content-store";

export function BoardSummary() {
  const items = useContentItems();

  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Filter className="h-3.5 w-3.5" />
        {items.length} items · {projects.length} projects ·{" "}
        {teamMembers.length} contributors
      </span>
      <span className="hidden items-center gap-1.5 sm:inline-flex">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-200">
          !
        </span>
        Overdue items
      </span>
    </div>
  );
}
