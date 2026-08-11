import {
  contentTypeMeta,
  priorityMeta,
  statusMeta,
} from "@/lib/data";
import type {
  ContentStatus,
  ContentType,
  Priority,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function StatusBadge({
  status,
  showDot = true,
  className,
}: {
  status: ContentStatus;
  showDot?: boolean;
  className?: string;
}) {
  const meta = statusMeta[status];
  return (
    <Badge className={cn(meta.badgeClass, className)}>
      {showDot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", meta.dotClass)} />
      )}
      {meta.label}
    </Badge>
  );
}

export function TypeBadge({
  type,
  className,
}: {
  type: ContentType;
  className?: string;
}) {
  const meta = contentTypeMeta[type];
  return <Badge className={cn(meta.badgeClass, className)}>{meta.label}</Badge>;
}

export function PriorityBadge({
  priority,
  className,
}: {
  priority: Priority;
  className?: string;
}) {
  const meta = priorityMeta[priority];
  return (
    <Badge className={cn(meta.badgeClass, className)}>{meta.label}</Badge>
  );
}
