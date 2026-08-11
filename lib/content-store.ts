"use client";

import { useSyncExternalStore } from "react";
import {
  contentItems as seedItems,
  contentTypeMeta,
  getProject,
  platformType,
} from "./data";
import type { ContentItem, ContentStatus, Priority } from "./types";

const STORAGE_KEY = "contentflow.content-items.v2";

let cached: ContentItem[] | null = null;
const listeners = new Set<() => void>();

function isValidItem(value: unknown): value is ContentItem {
  if (!value || typeof value !== "object") return false;
  const item = value as ContentItem;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.status === "string"
  );
}

function loadInitial(): ContentItem[] {
  if (typeof window === "undefined") return seedItems;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.every(isValidItem)) {
        return parsed;
      }
    }
  } catch {
    // ignore storage errors and fall back to seed data
  }
  return seedItems;
}

export function getContentItems(): ContentItem[] {
  if (!cached) cached = loadInitial();
  return cached;
}

function setItems(next: ContentItem[]) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota/storage errors
  }
  listeners.forEach((listener) => listener());
}

export function useContentItems(): ContentItem[] {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getContentItems,
    () => seedItems,
  );
}

const statusProgress: Record<ContentStatus, number> = {
  idea: 0,
  scenario: 15,
  prompt: 30,
  production: 60,
  review: 90,
  published: 100,
};

export interface CreateContentInput {
  title: string;
  projectId: string;
  platform: string;
  assigneeId: string;
  status: ContentStatus;
  priority: Priority;
  dueDate: string;
}

function nextId(items: ContentItem[]): string {
  let max = 0;
  for (const item of items) {
    const parsed = Number(item.id.replace(/^c/, ""));
    if (!Number.isNaN(parsed)) max = Math.max(max, parsed);
  }
  return `c${max + 1}`;
}

export function addContentItem(input: CreateContentInput): ContentItem {
  const list = getContentItems();
  const project = getProject(input.projectId);
  const now = new Date().toISOString();
  const item: ContentItem = {
    id: nextId(list),
    title: input.title.trim(),
    description: `${
      contentTypeMeta[platformType(input.platform)].label
    } for ${project?.name ?? "the team"}.`,
    type: platformType(input.platform),
    status: input.status,
    projectId: input.projectId,
    assigneeId: input.assigneeId,
    priority: input.priority,
    progress: statusProgress[input.status],
    dueDate: new Date(`${input.dueDate}T00:00:00`).toISOString(),
    createdAt: now,
    updatedAt: now,
    platform: input.platform,
    tags: [],
  };
  setItems([...list, item]);
  return item;
}
