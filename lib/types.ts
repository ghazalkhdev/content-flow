export type ContentType =
  | "blog"
  | "video"
  | "social"
  | "newsletter"
  | "case-study"
  | "podcast";

export type ContentStatus =
  | "idea"
  | "scenario"
  | "prompt"
  | "production"
  | "review"
  | "published";

export type Priority = "low" | "medium" | "high" | "urgent";

export type ContentAssetType = "image" | "video" | "document" | "audio";

export interface ContentAsset {
  id: string;
  name: string;
  type: ContentAssetType;
  size: string;
  meta?: string;
  updatedAt: string;
}

export type ProjectStatus = "active" | "planned" | "completed" | "on-hold";

export type ActivityType =
  | "created"
  | "moved"
  | "comment"
  | "publish"
  | "approve"
  | "assign";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  initials: string;
  workload: number;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  memberIds: string[];
  itemCount: number;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  status: ContentStatus;
  projectId: string;
  assigneeId: string;
  priority: Priority;
  progress: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  platform?: string;
  tags: string[];
  wordCount?: number;
  views?: number;
}

export interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  userId: string;
  timestamp: string;
}

export interface PipelineStage {
  id: ContentStatus;
  label: string;
}
