import { avatarColor, cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
};

export function Avatar({
  name,
  initials,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold ring-1 ring-black/5",
        avatarColor(name),
        sizes[size],
        className,
      )}
      title={name}
      {...props}
    >
      {initials}
    </div>
  );
}
