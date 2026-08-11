import {
  AlertCircle,
  CalendarClock,
  FileClock,
  Layers,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { activities, contentItems, projects, teamMembers } from "@/lib/data";
import {
  getDashboardStats,
  getNeedsAttention,
  getStatusDistribution,
} from "@/lib/stats";
import { daysUntil, formatDateLong } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { NeedsAttention } from "@/components/dashboard/needs-attention";
import { ContentStatusChart } from "@/components/dashboard/content-status-chart";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  const stats = getDashboardStats(contentItems);
  const attention = getNeedsAttention(contentItems);
  const statusDistribution = getStatusDistribution(contentItems);

  const upcoming = contentItems
    .filter((c) => c.status !== "published")
    .map((c) => ({ item: c, days: daysUntil(c.dueDate) }))
    .filter((c) => c.days >= 0 && c.days <= 14)
    .sort((a, b) => a.item.dueDate.localeCompare(b.item.dueDate))
    .slice(0, 7)
    .map((c) => c.item);

  const recent = [...activities]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 8);

  const user = teamMembers[0];
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const reviewDueSoon = contentItems.filter(
    (c) =>
      c.status === "review" &&
      daysUntil(c.dueDate) >= 0 &&
      daysUntil(c.dueDate) <= 3,
  ).length;
  const urgentToday = contentItems.filter(
    (c) => c.priority === "urgent" && daysUntil(c.dueDate) === 0,
  ).length;
  const published30d = contentItems.filter(
    (c) =>
      c.status === "published" &&
      daysUntil(c.publishedAt ?? c.updatedAt) > -31,
  ).length;
  const oldestOverdue = contentItems.reduce((max, c) => {
    const days = daysUntil(c.dueDate);
    return c.status !== "published" && days < 0
      ? Math.max(max, Math.abs(days))
      : max;
  }, 0);

  return (
    <>
      <PageHeader
        title={`${greeting}, ${user.name.split(" ")[0]}`}
        description={formatDateLong(new Date().toISOString())}
        actions={
          <Button asChild variant="outline">
            <Link href="/pipeline">View pipeline</Link>
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        <KpiCard
          label="Active content"
          value={stats.active}
          caption={`Across ${projects.length} projects`}
          icon={Layers}
          iconClass="bg-indigo-50 text-indigo-600"
        />
        <KpiCard
          label="Waiting for review"
          value={stats.waitingReview}
          caption={
            reviewDueSoon > 0
              ? `${reviewDueSoon} due in the next 3 days`
              : "Nothing due in the next 3 days"
          }
          icon={FileClock}
          iconClass="bg-violet-50 text-violet-600"
        />
        <KpiCard
          label="Due today"
          value={stats.dueToday}
          caption={
            urgentToday > 0 ? `${urgentToday} urgent` : "No urgent items"
          }
          icon={CalendarClock}
          iconClass="bg-amber-50 text-amber-600"
        />
        <KpiCard
          label="Published"
          value={stats.published}
          caption={
            published30d === stats.published
              ? "All within the last 30 days"
              : `${published30d} within the last 30 days`
          }
          icon={Rocket}
          iconClass="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          label="Overdue"
          value={stats.overdue}
          caption={
            oldestOverdue > 0
              ? `Oldest is ${oldestOverdue}d overdue`
              : "Nothing overdue"
          }
          icon={AlertCircle}
          iconClass="bg-rose-50 text-rose-600"
          valueClass="text-rose-600"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <NeedsAttention items={attention} className="xl:col-span-2" />
        <ContentStatusChart data={statusDistribution} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UpcomingDeadlines items={upcoming} />
        <RecentActivity activities={recent} />
      </div>
    </>
  );
}
