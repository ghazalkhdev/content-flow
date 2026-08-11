import { AlertTriangle, ClipboardList, Gauge, Users } from "lucide-react";
import { contentItems, teamMembers } from "@/lib/data";
import { getMemberWorkloads } from "@/lib/stats";
import { PageHeader } from "@/components/shared/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { MemberCard } from "@/components/team/member-card";

export default function TeamPage() {
  const workloads = getMemberWorkloads(contentItems);

  const totalActive = teamMembers.reduce(
    (sum, member) => sum + (workloads[member.id]?.active ?? 0),
    0,
  );
  const totalOverdue = teamMembers.reduce(
    (sum, member) => sum + (workloads[member.id]?.overdue ?? 0),
    0,
  );
  const avgWorkload = Math.round(
    teamMembers.reduce((sum, member) => sum + member.workload, 0) /
      teamMembers.length,
  );

  const sortedMembers = [...teamMembers].sort(
    (a, b) =>
      (workloads[b.id]?.overdue ?? 0) - (workloads[a.id]?.overdue ?? 0) ||
      b.workload - a.workload,
  );

  return (
    <>
      <PageHeader
        title="Team"
        description="See what everyone is working on and spot overload or overdue tasks at a glance."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard
          label="Team members"
          value={teamMembers.length}
          caption="Across all projects"
          icon={Users}
          iconClass="bg-indigo-50 text-indigo-600"
        />
        <KpiCard
          label="Active tasks"
          value={totalActive}
          caption="Scenario through review"
          icon={ClipboardList}
          iconClass="bg-amber-50 text-amber-600"
        />
        <KpiCard
          label="Overdue tasks"
          value={totalOverdue}
          caption="Need rescheduling"
          icon={AlertTriangle}
          iconClass="bg-rose-50 text-rose-600"
          valueClass="text-rose-600"
        />
        <KpiCard
          label="Avg workload"
          value={`${avgWorkload}%`}
          caption="Across all members"
          icon={Gauge}
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedMembers.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            workload={
              workloads[member.id] ?? {
                active: 0,
                overdue: 0,
                published: 0,
                tasks: [],
              }
            }
          />
        ))}
      </div>
    </>
  );
}
