import Link from "next/link";
import { getMember, getProject } from "@/lib/data";
import type { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { PriorityBadge, StatusBadge, TypeBadge } from "@/components/shared/badges";
import { DueChip } from "./due-chip";

const th = "px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground";
const td = "px-4 py-3 align-middle";

export function LibraryTable({ items }: { items: ContentItem[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
      <table className="w-full min-w-[46rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className={th}>Content</th>
            <th className={th}>Status</th>
            <th className={cn(th, "hidden sm:table-cell")}>Project</th>
            <th className={cn(th, "hidden lg:table-cell")}>Platform</th>
            <th className={cn(th, "hidden md:table-cell")}>Owner</th>
            <th className={th}>Priority</th>
            <th className={cn(th, "text-right")}>Due</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => {
            const member = getMember(item.assigneeId);
            const project = getProject(item.projectId);
            return (
              <tr
                key={item.id}
                className="group transition-colors hover:bg-muted/50"
              >
                <td className={cn(td, "min-w-0")}>
                  <Link
                    href={`/content/${item.id}`}
                    className="flex items-center gap-2.5"
                  >
                    <div className="max-w-[20rem]">
                      <p className="truncate font-medium text-foreground group-hover:text-primary">
                        {item.title}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <TypeBadge type={item.type} />
                        <span className="truncate">{item.platform}</span>
                      </p>
                    </div>
                  </Link>
                </td>
                <td className={td}>
                  <StatusBadge status={item.status} />
                </td>
                <td className={cn(td, "hidden sm:table-cell")}>
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        project?.color,
                      )}
                    />
                    <span className="truncate text-muted-foreground">
                      {project?.name}
                    </span>
                  </div>
                </td>
                <td className={cn(td, "hidden text-muted-foreground lg:table-cell")}>
                  {item.platform}
                </td>
                <td className={cn(td, "hidden md:table-cell")}>
                  <div className="flex items-center gap-2">
                    {member && (
                      <Avatar
                        name={member.name}
                        initials={member.initials}
                        size="sm"
                      />
                    )}
                    <span className="truncate text-muted-foreground">
                      {member?.name}
                    </span>
                  </div>
                </td>
                <td className={td}>
                  <PriorityBadge priority={item.priority} />
                </td>
                <td className={cn(td, "text-right")}>
                  <div className="flex justify-end">
                    <DueChip dueDate={item.dueDate} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
