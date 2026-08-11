import { CalendarClock } from "lucide-react";
import { cn, daysUntil, formatDate } from "@/lib/utils";

export function DueChip({
  dueDate,
  className,
}: {
  dueDate: string;
  className?: string;
}) {
  const days = daysUntil(dueDate);
  const overdue = days < 0;
  const dueToday = days === 0;

  const label = overdue
    ? `${Math.abs(days)}d late`
    : dueToday
      ? "Due today"
      : formatDate(dueDate);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        overdue
          ? "bg-rose-50 text-rose-700 ring-rose-200"
          : dueToday
            ? "bg-amber-50 text-amber-700 ring-amber-200"
            : "bg-muted text-muted-foreground ring-border",
        className,
      )}
    >
      <CalendarClock className="h-3 w-3" />
      {label}
    </span>
  );
}
