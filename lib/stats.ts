import { pipelineStages } from "./data";
import type { ContentItem, ContentStatus } from "./types";

export interface DashboardStats {
  active: number;
  waitingReview: number;
  dueToday: number;
  published: number;
  overdue: number;
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function diffInDays(date: string) {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = (target.getTime() - startOfToday().getTime()) / 86400000;
  return Math.round(diff);
}

export function getDashboardStats(items: ContentItem[]): DashboardStats {
  const stats: DashboardStats = {
    active: 0,
    waitingReview: 0,
    dueToday: 0,
    published: 0,
    overdue: 0,
  };

  for (const item of items) {
    if (item.status === "published") {
      stats.published++;
      continue;
    }

    stats.active++;

    if (item.status === "review") stats.waitingReview++;

    const days = diffInDays(item.dueDate);
    if (days === 0) stats.dueToday++;
    if (days < 0) stats.overdue++;
  }

  return stats;
}

export type AttentionReason =
  | "overdue"
  | "due-today"
  | "stale-review"
  | "urgent";

export interface AttentionItem {
  item: ContentItem;
  reasons: AttentionReason[];
}

const STALE_REVIEW_HOURS = 48;

export function getNeedsAttention(items: ContentItem[]): AttentionItem[] {
  const result: AttentionItem[] = [];
  const now = Date.now();

  for (const item of items) {
    if (item.status === "published") continue;

    const reasons: AttentionReason[] = [];
    const days = diffInDays(item.dueDate);

    if (days < 0) reasons.push("overdue");
    if (days === 0) reasons.push("due-today");
    if (
      item.status === "review" &&
      now - new Date(item.updatedAt).getTime() > STALE_REVIEW_HOURS * 3600000
    ) {
      reasons.push("stale-review");
    }
    if (item.priority === "urgent" && days <= 2) reasons.push("urgent");

    if (reasons.length > 0) result.push({ item, reasons });
  }

  const rank: Record<AttentionReason, number> = {
    overdue: 0,
    "due-today": 1,
    urgent: 2,
    "stale-review": 3,
  };

  result.sort((a, b) => {
    const minA = Math.min(...a.reasons.map((r) => rank[r]));
    const minB = Math.min(...b.reasons.map((r) => rank[r]));
    if (minA !== minB) return minA - minB;
    return a.item.dueDate.localeCompare(b.item.dueDate);
  });

  return result;
}

export interface StatusCount {
  status: ContentStatus;
  count: number;
}

export function getStatusDistribution(
  items: ContentItem[],
): StatusCount[] {
  const counts = new Map<ContentStatus, number>();
  for (const stage of pipelineStages) counts.set(stage.id, 0);
  for (const item of items) {
    counts.set(item.status, (counts.get(item.status) ?? 0) + 1);
  }
  return pipelineStages.map((stage) => ({
    status: stage.id,
    count: counts.get(stage.id) ?? 0,
  }));
}

export interface MemberWorkload {
  active: number;
  overdue: number;
  published: number;
  tasks: ContentItem[];
}

export function getMemberWorkloads(
  items: ContentItem[],
): Record<string, MemberWorkload> {
  const result: Record<string, MemberWorkload> = {};
  for (const item of items) {
    const workload = (result[item.assigneeId] ??= {
      active: 0,
      overdue: 0,
      published: 0,
      tasks: [],
    });
    if (item.status === "published") {
      workload.published++;
      continue;
    }
    workload.active++;
    if (diffInDays(item.dueDate) < 0) workload.overdue++;
    workload.tasks.push(item);
  }
  for (const id in result) {
    result[id].tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }
  return result;
}

export interface ProjectStats {
  total: number;
  inProgress: number;
  waitingReview: number;
  published: number;
}

export function getProjectStats(
  items: ContentItem[],
  projectId: string,
): ProjectStats {
  const stats: ProjectStats = {
    total: 0,
    inProgress: 0,
    waitingReview: 0,
    published: 0,
  };
  for (const item of items) {
    if (item.projectId !== projectId) continue;
    stats.total++;
    if (item.status === "published") stats.published++;
    else if (item.status === "review") stats.waitingReview++;
    else if (item.status !== "idea") stats.inProgress++;
  }
  return stats;
}
