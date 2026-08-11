import type {
  Activity,
  ContentItem,
  ContentStatus,
  ContentType,
  PipelineStage,
  Priority,
  Project,
  TeamMember,
} from "./types";

const d = (offsetDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString();
};

const h = (offsetHours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + offsetHours);
  return date.toISOString();
};

export const teamMembers: TeamMember[] = [
  { id: "u1", name: "Sarah Chen", role: "Head of Content", email: "sarah@contentflow.io", initials: "SC", workload: 58, skills: ["Strategy", "Editorial", "Brand"] },
  { id: "u2", name: "Marcus Webb", role: "Content Strategist", email: "marcus@contentflow.io", initials: "MW", workload: 52, skills: ["SEO", "Research", "Calendars"] },
  { id: "u3", name: "Priya Patel", role: "Senior Writer", email: "priya@contentflow.io", initials: "PP", workload: 72, skills: ["Long-form", "Interviews"] },
  { id: "u4", name: "Diego Ramirez", role: "Video Producer", email: "diego@contentflow.io", initials: "DR", workload: 88, skills: ["Editing", "Motion", "Scripts"] },
  { id: "u5", name: "Emma Lindqvist", role: "Social Media Manager", email: "emma@contentflow.io", initials: "EL", workload: 93, skills: ["Social", "Community", "Analytics"] },
  { id: "u6", name: "Tom Okafor", role: "SEO Specialist", email: "tom@contentflow.io", initials: "TO", workload: 32, skills: ["Keywords", "Links", "Audits"] },
  { id: "u7", name: "Lena Fischer", role: "Editor", email: "lena@contentflow.io", initials: "LF", workload: 40, skills: ["Editing", "Proofreading"] },
];

export const projects: Project[] = [
  { id: "p1", name: "Q3 Product Launch", description: "Go-to-market content for the Atlas analytics platform launch.", color: "bg-indigo-500", status: "active", progress: 62, dueDate: d(18), memberIds: ["u1", "u2", "u3", "u4", "u5"], itemCount: 7 },
  { id: "p2", name: "Rebrand Storytelling", description: "Content that tells the story behind the new brand identity.", color: "bg-rose-500", status: "active", progress: 35, dueDate: d(30), memberIds: ["u1", "u5", "u7"], itemCount: 5 },
  { id: "p3", name: "Evergreen SEO Hub", description: "Foundational guides built to rank and compound over time.", color: "bg-emerald-500", status: "active", progress: 78, dueDate: d(9), memberIds: ["u2", "u4", "u6"], itemCount: 5 },
  { id: "p4", name: "Customer Spotlight Series", description: "Video and case-study content featuring customer success stories.", color: "bg-sky-500", status: "planned", progress: 12, dueDate: d(45), memberIds: ["u4", "u3", "u5"], itemCount: 2 },
  { id: "p5", name: "Developer Advocacy", description: "Technical tutorials and podcast content for the dev community.", color: "bg-violet-500", status: "active", progress: 48, dueDate: d(24), memberIds: ["u1", "u4", "u7"], itemCount: 3 },
];

export const contentItems: ContentItem[] = [
  { id: "c1", title: "Announcing Atlas: The Analytics Platform for Modern Teams", description: "Launch blog post announcing the Atlas platform, its key features, and what it means for customers.", type: "blog", status: "production", projectId: "p1", assigneeId: "u3", priority: "urgent", progress: 65, dueDate: d(3), createdAt: d(-12), updatedAt: h(-3), platform: "Blog", tags: ["Launch", "Announcement"], wordCount: 1800 },
  { id: "c2", title: "How Realtime Dashboards Changed Our Customers' Workflows", description: "Video walkthrough showcasing the realtime dashboard experience with customer interviews.", type: "video", status: "review", projectId: "p1", assigneeId: "u4", priority: "high", progress: 90, dueDate: d(2), createdAt: d(-20), updatedAt: h(-9), platform: "YouTube", tags: ["Product", "Video"], wordCount: 1400 },
  { id: "c3", title: "Atlas Launch Countdown: 5 Features to Watch", description: "Social campaign teaser building anticipation ahead of the launch date.", type: "social", status: "scenario", projectId: "p1", assigneeId: "u5", priority: "medium", progress: 15, dueDate: d(5), createdAt: d(-6), updatedAt: h(-30), platform: "LinkedIn", tags: ["Campaign", "Launch"], wordCount: 120 },
  { id: "c4", title: "The Data-Driven Content Playbook", description: "Newsletter issue covering how the best teams measure and optimize content performance.", type: "newsletter", status: "idea", projectId: "p1", assigneeId: "u2", priority: "low", progress: 0, dueDate: d(15), createdAt: d(-2), updatedAt: h(-4), platform: "Email", tags: ["Newsletter", "Data"], wordCount: 900 },
  { id: "c5", title: "Behind the Rebrand: Why We Evolved Our Identity", description: "Long-form piece documenting the thinking behind the new visual identity.", type: "blog", status: "review", projectId: "p2", assigneeId: "u7", priority: "medium", progress: 85, dueDate: d(4), createdAt: d(-25), updatedAt: h(-6), platform: "Blog", tags: ["Brand", "Story"], wordCount: 2400 },
  { id: "c6", title: "Rebrand Reveal Teaser", description: "Short-form social video teasing the new identity across Instagram and TikTok.", type: "social", status: "production", projectId: "p2", assigneeId: "u5", priority: "high", progress: 40, dueDate: d(6), createdAt: d(-9), updatedAt: h(-12), platform: "Instagram", tags: ["Brand", "Video"], wordCount: 60 },
  { id: "c7", title: "Customer Journey After the Rebrand", description: "Podcast episode discussing how the rebrand resonates with longtime customers.", type: "podcast", status: "scenario", projectId: "p2", assigneeId: "u1", priority: "low", progress: 10, dueDate: d(20), createdAt: d(-4), updatedAt: h(-8), platform: "Spotify", tags: ["Podcast", "Brand"], wordCount: 0 },
  { id: "c8", title: "SEO Checklist: On-Page Essentials", description: "Definitive guide with a practical checklist for on-page optimization.", type: "blog", status: "published", projectId: "p3", assigneeId: "u6", priority: "high", progress: 100, dueDate: d(-2), createdAt: d(-60), updatedAt: d(-2), publishedAt: d(-2), platform: "Blog", tags: ["SEO", "Guide"], wordCount: 3200, views: 18400 },
  { id: "c9", title: "How to Build a Topic Cluster Strategy", description: "Evergreen video breaking down topic clusters and internal linking.", type: "video", status: "production", projectId: "p3", assigneeId: "u4", priority: "medium", progress: 55, dueDate: d(8), createdAt: d(-30), updatedAt: h(-20), platform: "YouTube", tags: ["SEO", "Strategy"], wordCount: 0 },
  { id: "c10", title: "Keyword Research Fundamentals", description: "Newsletter recap with tools and methods for prioritizing keywords.", type: "newsletter", status: "published", projectId: "p3", assigneeId: "u2", priority: "medium", progress: 100, dueDate: d(-4), createdAt: d(-50), updatedAt: d(-4), publishedAt: d(-4), platform: "Email", tags: ["SEO", "Newsletter"], wordCount: 750, views: 11200 },
  { id: "c11", title: "How Acme Corp Cut Reporting Time by 80%", description: "Case study based on interviews with Acme's analytics team.", type: "case-study", status: "idea", projectId: "p4", assigneeId: "u3", priority: "medium", progress: 0, dueDate: d(22), createdAt: d(-3), updatedAt: h(-15), platform: "Blog", tags: ["Case Study", "Customer"], wordCount: 1500 },
  { id: "c12", title: "Acme Corp Journey: From Excel to Atlas", description: "Customer interview video for the spotlight series.", type: "video", status: "scenario", projectId: "p4", assigneeId: "u4", priority: "high", progress: 5, dueDate: d(12), createdAt: d(-5), updatedAt: h(-40), platform: "YouTube", tags: ["Case Study", "Video"], wordCount: 0 },
  { id: "c13", title: "Building a Real-Time Data Pipeline in 10 Steps", description: "Technical tutorial for developers building streaming pipelines.", type: "blog", status: "published", projectId: "p5", assigneeId: "u1", priority: "high", progress: 100, dueDate: d(-1), createdAt: d(-45), updatedAt: d(-1), publishedAt: d(-1), platform: "Dev Blog", tags: ["Dev", "Tutorial"], wordCount: 2800, views: 9600 },
  { id: "c14", title: "The Developer Content Stack", description: "Podcast episode on tools and workflows for developer advocacy teams.", type: "podcast", status: "production", projectId: "p5", assigneeId: "u4", priority: "low", progress: 30, dueDate: d(14), createdAt: d(-8), updatedAt: h(-7), platform: "Spotify", tags: ["Podcast", "Dev"], wordCount: 0 },
  { id: "c15", title: "Atlas vs. Legacy BI: Honest Comparison", description: "Comparison content for bottom-of-funnel buyers in the evaluation stage.", type: "case-study", status: "review", projectId: "p1", assigneeId: "u3", priority: "urgent", progress: 75, dueDate: d(0), createdAt: d(-14), updatedAt: h(-2), platform: "Blog", tags: ["Comparison", "Sales"], wordCount: 2100 },
  { id: "c16", title: "Community Roundup: Summer 2026", description: "Curated monthly roundup of community highlights and wins.", type: "social", status: "published", projectId: "p2", assigneeId: "u5", priority: "low", progress: 100, dueDate: d(-15), createdAt: d(-40), updatedAt: d(-15), publishedAt: d(-15), platform: "Twitter/X", tags: ["Community"], wordCount: 200, views: 4100 },
  { id: "c17", title: "The Anatomy of a Viral Post", description: "Deep dive on the mechanics behind high-engagement social posts, with examples from recent campaigns.", type: "social", status: "review", projectId: "p2", assigneeId: "u5", priority: "high", progress: 60, dueDate: d(-3), createdAt: d(-15), updatedAt: d(-4), platform: "Instagram", tags: ["Social", "Analysis"], wordCount: 400 },
  { id: "c18", title: "Summer Product Recap", description: "Video recapping the summer releases and customer wins in time for the fall planning cycle.", type: "video", status: "production", projectId: "p1", assigneeId: "u4", priority: "medium", progress: 25, dueDate: d(-1), createdAt: d(-10), updatedAt: h(-18), platform: "YouTube", tags: ["Recap", "Product"], wordCount: 0 },
  { id: "c19", title: "Data Digest: August", description: "Monthly newsletter rounding up the latest analytics insights and trends.", type: "newsletter", status: "production", projectId: "p3", assigneeId: "u2", priority: "medium", progress: 40, dueDate: d(0), createdAt: d(-7), updatedAt: h(-5), platform: "Email", tags: ["Newsletter", "Data"], wordCount: 700 },
  { id: "c20", title: "Internal Linking Audit: A Step-by-Step Guide", description: "Evergreen guide walking through a repeatable internal linking audit — how to find orphan pages, fix link equity, and keep the hub structure healthy.", type: "blog", status: "prompt", projectId: "p3", assigneeId: "u6", priority: "medium", progress: 30, dueDate: d(6), createdAt: d(-3), updatedAt: h(-14), platform: "Blog", tags: ["SEO", "Guide", "Internal Links"], wordCount: 2200 },
  { id: "c21", title: "How Developer Advocacy Teams Plan Their Content Calendar", description: "Topic card for the dev blog exploring how advocacy teams balance shipping, education, and community content without burning out.", type: "blog", status: "idea", projectId: "p5", assigneeId: "u1", priority: "low", progress: 0, dueDate: d(16), createdAt: d(-1), updatedAt: h(-20), platform: "Dev Blog", tags: ["Dev", "Advocacy", "Planning"], wordCount: 1600 },
  { id: "c22", title: "Atlas Launch Week: Behind-the-Scenes", description: "Social series capturing the team preparing for launch week — from the launch page build to go-live — told through daily behind-the-scenes stories.", type: "social", status: "scenario", projectId: "p1", assigneeId: "u5", priority: "medium", progress: 15, dueDate: d(12), createdAt: d(-2), updatedAt: h(-10), platform: "Instagram", tags: ["Launch", "Behind the Scenes"], wordCount: 150 },
];

export const activities: Activity[] = [
  { id: "a1", type: "publish", message: "published “Building a Real-Time Data Pipeline in 10 Steps”", userId: "u1", timestamp: h(-1) },
  { id: "a2", type: "comment", message: "commented on “Atlas vs. Legacy BI: Honest Comparison”", userId: "u7", timestamp: h(-2) },
  { id: "a3", type: "moved", message: "moved “How Realtime Dashboards Changed Our Customers' Workflows” to Review", userId: "u4", timestamp: h(-4) },
  { id: "a4", type: "created", message: "added “The Data-Driven Content Playbook” to the pipeline", userId: "u2", timestamp: h(-6) },
  { id: "a5", type: "assign", message: "assigned “Rebrand Reveal Teaser” to Emma Lindqvist", userId: "u1", timestamp: h(-9) },
  { id: "a6", type: "approve", message: "approved “SEO Checklist: On-Page Essentials”", userId: "u7", timestamp: d(-2) },
  { id: "a7", type: "publish", message: "published “SEO Checklist: On-Page Essentials”", userId: "u6", timestamp: d(-2) },
  { id: "a8", type: "moved", message: "moved “Keyword Research Fundamentals” to Published", userId: "u2", timestamp: d(-4) },
  { id: "a9", type: "comment", message: "added feedback on “How to Build a Topic Cluster Strategy”", userId: "u6", timestamp: d(-3) },
  { id: "a10", type: "created", message: "added “How Acme Corp Cut Reporting Time by 80%” to the pipeline", userId: "u3", timestamp: d(-3) },
  { id: "a11", type: "approve", message: "approved “Keyword Research Fundamentals”", userId: "u7", timestamp: d(-4) },
];

export const pipelineStages: PipelineStage[] = [
  { id: "idea", label: "Idea" },
  { id: "scenario", label: "Scenario" },
  { id: "prompt", label: "Prompt" },
  { id: "production", label: "Production" },
  { id: "review", label: "Review" },
  { id: "published", label: "Published" },
];

export const contentTypeMeta: Record<
  ContentType,
  { label: string; badgeClass: string }
> = {
  blog: { label: "Blog", badgeClass: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  video: { label: "Video", badgeClass: "bg-rose-50 text-rose-700 ring-rose-200" },
  social: { label: "Social", badgeClass: "bg-violet-50 text-violet-700 ring-violet-200" },
  newsletter: { label: "Newsletter", badgeClass: "bg-sky-50 text-sky-700 ring-sky-200" },
  "case-study": { label: "Case Study", badgeClass: "bg-amber-50 text-amber-700 ring-amber-200" },
  podcast: { label: "Podcast", badgeClass: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200" },
};

const platformTypeMap: Record<string, ContentType> = {
  Blog: "blog",
  "Dev Blog": "blog",
  YouTube: "video",
  LinkedIn: "social",
  Instagram: "social",
  "Twitter/X": "social",
  TikTok: "social",
  Email: "newsletter",
  Spotify: "podcast",
};

export const platforms = Array.from(
  new Set(
    contentItems.map((i) => i.platform).filter((p): p is string => Boolean(p)),
  ),
);

export function platformType(platform: string): ContentType {
  return platformTypeMap[platform] ?? "blog";
}

export const statusMeta: Record<
  ContentStatus,
  { label: string; badgeClass: string; dotClass: string; barClass: string }
> = {
  idea: {
    label: "Idea",
    badgeClass: "bg-zinc-100 text-zinc-600 ring-zinc-200",
    dotClass: "bg-zinc-400",
    barClass: "bg-zinc-400",
  },
  scenario: {
    label: "Scenario",
    badgeClass: "bg-sky-50 text-sky-700 ring-sky-200",
    dotClass: "bg-sky-500",
    barClass: "bg-sky-500",
  },
  prompt: {
    label: "Prompt",
    badgeClass: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
    dotClass: "bg-fuchsia-500",
    barClass: "bg-fuchsia-500",
  },
  production: {
    label: "Production",
    badgeClass: "bg-amber-50 text-amber-700 ring-amber-200",
    dotClass: "bg-amber-500",
    barClass: "bg-amber-500",
  },
  review: {
    label: "Review",
    badgeClass: "bg-violet-50 text-violet-700 ring-violet-200",
    dotClass: "bg-violet-500",
    barClass: "bg-violet-500",
  },
  published: {
    label: "Published",
    badgeClass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dotClass: "bg-emerald-500",
    barClass: "bg-emerald-500",
  },
};

export const priorityMeta: Record<
  Priority,
  { label: string; badgeClass: string; accentClass: string }
> = {
  low: { label: "Low", badgeClass: "bg-zinc-100 text-zinc-600 ring-zinc-200", accentClass: "border-l-zinc-300" },
  medium: { label: "Medium", badgeClass: "bg-sky-50 text-sky-700 ring-sky-200", accentClass: "border-l-sky-400" },
  high: { label: "High", badgeClass: "bg-amber-50 text-amber-700 ring-amber-200", accentClass: "border-l-amber-400" },
  urgent: { label: "Urgent", badgeClass: "bg-rose-50 text-rose-700 ring-rose-200", accentClass: "border-l-rose-500" },
};

export const projectStatusMeta: Record<
  Project["status"],
  { label: string; badgeClass: string }
> = {
  active: { label: "Active", badgeClass: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  planned: { label: "Planned", badgeClass: "bg-sky-50 text-sky-700 ring-sky-200" },
  completed: { label: "Completed", badgeClass: "bg-zinc-100 text-zinc-600 ring-zinc-200" },
  "on-hold": { label: "On Hold", badgeClass: "bg-amber-50 text-amber-700 ring-amber-200" },
};

export function getMember(id: string) {
  return teamMembers.find((m) => m.id === id);
}

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export function getContent(id: string) {
  return contentItems.find((c) => c.id === id);
}
