import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "soft";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset";
  const variants = {
    default: "bg-primary/10 text-primary ring-primary/20",
    outline: "bg-transparent text-foreground ring-border",
    soft: "ring-border",
  };
  return <span className={cn(base, variants[variant], className)} {...props} />;
}
