import { cn } from "@/lib/utils";
import { getMember } from "@/lib/data";
import { Avatar } from "@/components/ui/avatar";

export function MemberAvatar({
  memberId,
  size = "md",
  stackIndex = 0,
}: {
  memberId: string;
  size?: "sm" | "md" | "lg";
  stackIndex?: number;
}) {
  const member = getMember(memberId);
  if (!member) return null;
  return (
    <div
      className={size === "sm" ? "-space-x-1.5" : "-space-x-2"}
      style={{ zIndex: 10 - stackIndex }}
    >
      <Avatar
        name={member.name}
        initials={member.initials}
        size={size}
        className="ring-2 ring-card"
      />
    </div>
  );
}

export function AvatarStack({
  memberIds,
  size = "sm",
  limit = 4,
}: {
  memberIds: string[];
  size?: "sm" | "md" | "lg";
  limit?: number;
}) {
  const visible = memberIds.slice(0, limit);
  const extra = memberIds.length - visible.length;
  return (
    <div className="flex items-center">
      <div className="flex -space-x-1.5">
        {visible.map((id, i) => (
          <MemberAvatar key={id} memberId={id} size={size} stackIndex={i} />
        ))}
        {extra > 0 && (
          <div
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-muted font-medium text-muted-foreground ring-2 ring-card",
              size === "sm" ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs",
            )}
          >
            +{extra}
          </div>
        )}
      </div>
    </div>
  );
}
