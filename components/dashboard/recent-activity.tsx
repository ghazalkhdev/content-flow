import Link from "next/link";
import {
  ArrowRight,
  ArrowRightCircle,
  CheckCircle2,
  MessageSquare,
  PlusCircle,
  Rocket,
  UserPlus,
} from "lucide-react";
import { getMember } from "@/lib/data";
import type { Activity, ActivityType } from "@/lib/types";
import { cn, timeAgo } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const activityIcons: Record<ActivityType, { icon: typeof Rocket; className: string }> = {
  created: { icon: PlusCircle, className: "bg-sky-50 text-sky-600" },
  moved: { icon: ArrowRightCircle, className: "bg-indigo-50 text-indigo-600" },
  comment: { icon: MessageSquare, className: "bg-violet-50 text-violet-600" },
  publish: { icon: Rocket, className: "bg-emerald-50 text-emerald-600" },
  approve: { icon: CheckCircle2, className: "bg-emerald-50 text-emerald-600" },
  assign: { icon: UserPlus, className: "bg-amber-50 text-amber-600" },
};

export function RecentActivity({
  activities,
  className,
}: {
  activities: Activity[];
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Recent activity</CardTitle>
          <Link
            href="/team"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Team feed
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <CardDescription>What the team has been up to</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {activities.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-10 text-center">
            <p className="text-sm text-muted-foreground">No recent activity.</p>
          </div>
        ) : (
          <ul className="space-y-0">
            {activities.map((activity, index) => {
              const meta = activityIcons[activity.type];
              const member = getMember(activity.userId);
              const Icon = meta.icon;
              const isLast = index === activities.length - 1;
              return (
                <li key={activity.id} className="relative flex gap-3 pb-4 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        meta.className,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {!isLast && (
                      <span className="absolute top-8 bottom-0 left-1/2 w-px -translate-x-1/2 bg-border" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pt-1">
                    <p className="text-sm leading-snug">
                      <span className="font-medium">
                        {member?.name ?? "Someone"}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        {activity.message}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {timeAgo(activity.timestamp)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
