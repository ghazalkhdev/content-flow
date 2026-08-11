"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  CircleDot,
  FolderKanban,
  Layers,
  LayoutGrid,
  List,
  Search,
  SearchX,
  UserRound,
  X,
} from "lucide-react";
import {
  getMember,
  getProject,
  pipelineStages,
  projects,
  statusMeta,
  teamMembers,
} from "@/lib/data";
import type { ContentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useContentItems } from "@/lib/content-store";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/dropdown";
import { LibraryCard } from "./library-card";
import { LibraryTable } from "./library-table";
import { EmptyState } from "./empty-state";

type ViewMode = "card" | "table";

interface FilterOption {
  value: string;
  label: string;
  dot?: string;
  initials?: string;
}

function FilterSelect({
  label,
  icon: Icon,
  options,
  selected,
  onToggle,
  onClear,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
}) {
  const active = selected.length > 0;

  return (
    <Dropdown
      width="md"
      trigger={
        <button
          type="button"
          aria-haspopup="menu"
          className={cn(
            "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none",
            active && "border-primary/40 bg-primary/5 text-primary",
          )}
        >
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span>{label}</span>
          {active && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
              {selected.length}
            </span>
          )}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      }
    >
      <MenuLabel>{label}</MenuLabel>
      <div className="max-h-64 overflow-y-auto scrollbar-thin">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <MenuItem key={option.value} onClick={() => onToggle(option.value)}>
              {option.dot && (
                <span
                  className={cn("h-2 w-2 shrink-0 rounded-full", option.dot)}
                  aria-hidden
                />
              )}
              {option.initials && (
                <Avatar
                  name={option.label}
                  initials={option.initials}
                  size="sm"
                />
              )}
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
              {checked && <Check className="h-4 w-4 shrink-0 text-primary" />}
            </MenuItem>
          );
        })}
      </div>
      {selected.length > 0 && (
        <>
          <MenuSeparator />
          <MenuItem onClick={onClear}>
            <X className="h-4 w-4 text-muted-foreground" /> Clear selection
          </MenuItem>
        </>
      )}
    </Dropdown>
  );
}

export function ContentLibrary({ initialQuery = "" }: { initialQuery?: string }) {
  const items = useContentItems();
  const [query, setQuery] = useState(initialQuery);
  const [prevQuery, setPrevQuery] = useState(initialQuery);

  if (prevQuery !== initialQuery) {
    setPrevQuery(initialQuery);
    setQuery(initialQuery);
  }
  const [view, setView] = useState<ViewMode>("card");
  const [statuses, setStatuses] = useState<ContentStatus[]>([]);
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [ownerIds, setOwnerIds] = useState<string[]>([]);

  const platformOptions = useMemo(() => {
    const unique = Array.from(
      new Set(items.map((i) => i.platform).filter((p): p is string => Boolean(p))),
    );
    return unique.map((p) => ({ value: p, label: p }));
  }, [items]);

  const projectOptions = useMemo(
    () =>
      projects.map((p) => ({
        value: p.id,
        label: p.name,
        dot: p.color,
      })),
    [],
  );

  const ownerOptions = useMemo(
    () =>
      teamMembers.map((m) => ({
        value: m.id,
        label: m.name,
        initials: m.initials,
      })),
    [],
  );

  const statusOptions = useMemo(
    () =>
      pipelineStages.map((s) => ({
        value: s.id,
        label: statusMeta[s.id].label,
        dot: statusMeta[s.id].dotClass,
      })),
    [],
  );

  const filtersActive =
    query.trim().length > 0 ||
    statuses.length > 0 ||
    projectIds.length > 0 ||
    platforms.length > 0 ||
    ownerIds.length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (q) {
        const member = getMember(item.assigneeId);
        const project = getProject(item.projectId);
        const haystack = [
          item.title,
          item.description,
          item.platform ?? "",
          ...item.tags,
          project?.name ?? "",
          member?.name ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (statuses.length > 0 && !statuses.includes(item.status)) return false;
      if (projectIds.length > 0 && !projectIds.includes(item.projectId))
        return false;
      if (platforms.length > 0 && !platforms.includes(item.platform ?? ""))
        return false;
      if (ownerIds.length > 0 && !ownerIds.includes(item.assigneeId))
        return false;
      return true;
    });
  }, [items, query, statuses, projectIds, platforms, ownerIds]);

  function toggleValue<T extends string>(
    list: T[],
    setter: (next: T[]) => void,
    value: string,
  ) {
    const typed = value as T;
    setter(
      list.includes(typed)
        ? list.filter((v) => v !== typed)
        : [...list, typed],
    );
  }

  function clearAll() {
    setQuery("");
    setStatuses([]);
    setProjectIds([]);
    setPlatforms([]);
    setOwnerIds([]);
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tag, project…"
            aria-label="Search content"
            className="pl-9 pr-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 flex h-6 w-6 cursor-pointer -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="Content view"
          className="inline-flex w-fit items-center rounded-lg border border-border bg-card p-0.5 shadow-xs"
        >
          <button
            type="button"
            onClick={() => setView("card")}
            aria-pressed={view === "card"}
            className={cn(
              "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              view === "card"
                ? "bg-muted text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            type="button"
            onClick={() => setView("table")}
            aria-pressed={view === "table"}
            className={cn(
              "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              view === "table"
                ? "bg-muted text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <FilterSelect
          label="Status"
          icon={CircleDot}
          options={statusOptions}
          selected={statuses}
          onToggle={(v) => toggleValue(statuses, setStatuses, v)}
          onClear={() => setStatuses([])}
        />
        <FilterSelect
          label="Project"
          icon={FolderKanban}
          options={projectOptions}
          selected={projectIds}
          onToggle={(v) => toggleValue(projectIds, setProjectIds, v)}
          onClear={() => setProjectIds([])}
        />
        <FilterSelect
          label="Platform"
          icon={Layers}
          options={platformOptions}
          selected={platforms}
          onToggle={(v) => toggleValue(platforms, setPlatforms, v)}
          onClear={() => setPlatforms([])}
        />
        <FilterSelect
          label="Owner"
          icon={UserRound}
          options={ownerOptions}
          selected={ownerIds}
          onToggle={(v) => toggleValue(ownerIds, setOwnerIds, v)}
          onClear={() => setOwnerIds([])}
        />
        {filtersActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Clear all
          </Button>
        )}
        <span className="ml-auto text-xs tabular-nums text-muted-foreground">
          Showing {filtered.length} of {items.length}
        </span>
      </div>

      <div className="mt-4">
        {filtered.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No content found"
            description={
              filtersActive
                ? "No content matches your search or filters. Try adjusting the search terms or clearing some filters."
                : "No content items in the library yet."
            }
            action={
              filtersActive ? (
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <X className="h-4 w-4" />
                  Clear search &amp; filters
                </Button>
              ) : undefined
            }
          />
        ) : view === "card" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <LibraryCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <LibraryTable items={filtered} />
        )}
      </div>
    </div>
  );
}
