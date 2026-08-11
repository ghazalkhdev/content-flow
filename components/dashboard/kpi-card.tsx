import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export interface KpiCardProps {
  label: string;
  value: string | number;
  caption?: string;
  icon: LucideIcon;
  iconClass?: string;
  valueClass?: string;
}

export function KpiCard({
  label,
  value,
  caption,
  icon: Icon,
  iconClass,
  valueClass,
}: KpiCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {label}
          </p>
          <p
            className={cn(
              "mt-1.5 text-2xl font-semibold leading-none tracking-tight",
              valueClass,
            )}
          >
            {value}
          </p>
        </div>
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            iconClass ?? "bg-primary/10 text-primary",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      {caption && (
        <p className="mt-2.5 text-xs text-muted-foreground">{caption}</p>
      )}
    </Card>
  );
}
