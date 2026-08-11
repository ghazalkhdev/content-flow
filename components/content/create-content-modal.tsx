"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Loader2, X } from "lucide-react";
import {
  pipelineStages,
  platforms,
  priorityMeta,
  projects,
  statusMeta,
  teamMembers,
} from "@/lib/data";
import { addContentItem } from "@/lib/content-store";
import type { ContentStatus, Priority } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormValues {
  title: string;
  projectId: string;
  platform: string;
  assigneeId: string;
  status: ContentStatus;
  priority: Priority;
  dueDate: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  title: "",
  projectId: "",
  platform: "",
  assigneeId: "",
  status: "idea",
  priority: "medium",
  dueDate: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.title.trim()) {
    errors.title = "Title is required.";
  } else if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }
  if (!values.projectId) errors.projectId = "Select a project.";
  if (!values.platform) errors.platform = "Select a platform.";
  if (!values.assigneeId) errors.assigneeId = "Select an owner.";
  if (!values.status) errors.status = "Select a status.";
  if (!values.priority) errors.priority = "Select a priority.";
  if (!values.dueDate) {
    errors.dueDate = "Deadline is required.";
  } else if (Number.isNaN(new Date(values.dueDate).getTime())) {
    errors.dueDate = "Enter a valid date.";
  }
  return errors;
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-foreground"
    >
      {children}
      {required && (
        <span className="text-rose-500" aria-hidden>
          {" "}
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
      {message}
    </p>
  );
}

function FieldSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  placeholder: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "h-9 w-full cursor-pointer appearance-none rounded-lg border border-border bg-card px-3 pr-9 text-sm text-foreground shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            !value && "text-muted-foreground",
            error && "border-rose-300 focus-visible:ring-rose-300",
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function CreateContentModal({
  open,
  onClose,
  onCreated,
  initialProjectId,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (title: string) => void;
  initialProjectId?: string;
}) {
  const [values, setValues] = useState<FormValues>(() => ({
    ...initialValues,
    ...(initialProjectId ? { projectId: initialProjectId } : {}),
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [shown, setShown] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = "create-content-title";

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => setShown(true), 10);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    return () => {
      window.clearTimeout(timer);
      setShown(false);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  function updateValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitting(true);
    window.setTimeout(() => {
      addContentItem(values);
      const title = values.title.trim();
      onCreated(title);
      setSubmitting(false);
    }, 450);
  }

  if (!open) return null;

  const projectOptions = projects.map((p) => ({ value: p.id, label: p.name }));
  const ownerOptions = teamMembers.map((m) => ({ value: m.id, label: m.name }));
  const statusOptions = pipelineStages.map((s) => ({
    value: s.id,
    label: statusMeta[s.id].label,
  }));
  const priorityOptions = (Object.keys(priorityMeta) as Priority[]).map(
    (key) => ({ value: key, label: priorityMeta[key].label }),
  );
  const platformOptions = platforms.map((p) => ({ value: p, label: p }));

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 transition-opacity duration-150 sm:items-center sm:p-4",
        shown ? "opacity-100" : "opacity-0",
      )}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "flex max-h-[calc(100vh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-t-xl border border-border bg-card shadow-xl outline-none transition-all duration-150 sm:rounded-xl",
          shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
          <div>
            <h2 id={titleId} className="text-base font-semibold tracking-tight">
              Create content
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Add a new item to the content pipeline.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="min-h-0 flex-1 overflow-y-auto scrollbar-thin px-6 py-5"
        >
          <div>
            <FieldLabel htmlFor="create-title" required>
              Title
            </FieldLabel>
            <Input
              id="create-title"
              type="text"
              value={values.title}
              onChange={(e) => updateValue("title", e.target.value)}
              placeholder="e.g. Q3 Launch Social Teaser"
              required
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={errors.title ? "create-title-error" : undefined}
              className={cn(
                errors.title && "border-rose-300 focus-visible:ring-rose-300",
              )}
            />
            <FieldError id="create-title-error" message={errors.title} />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldSelect
              id="create-project"
              label="Project"
              value={values.projectId}
              onChange={(value) => updateValue("projectId", value)}
              options={projectOptions}
              error={errors.projectId}
              required
              placeholder="Select project"
            />
            <FieldSelect
              id="create-platform"
              label="Platform"
              value={values.platform}
              onChange={(value) => updateValue("platform", value)}
              options={platformOptions}
              error={errors.platform}
              required
              placeholder="Select platform"
            />
            <FieldSelect
              id="create-owner"
              label="Owner"
              value={values.assigneeId}
              onChange={(value) => updateValue("assigneeId", value)}
              options={ownerOptions}
              error={errors.assigneeId}
              required
              placeholder="Select owner"
            />
            <FieldSelect
              id="create-status"
              label="Status"
              value={values.status}
              onChange={(value) => updateValue("status", value as ContentStatus)}
              options={statusOptions}
              error={errors.status}
              required
              placeholder="Select status"
            />
            <FieldSelect
              id="create-priority"
              label="Priority"
              value={values.priority}
              onChange={(value) => updateValue("priority", value as Priority)}
              options={priorityOptions}
              error={errors.priority}
              required
              placeholder="Select priority"
            />
            <div>
              <FieldLabel htmlFor="create-deadline" required>
                Deadline
              </FieldLabel>
              <Input
                id="create-deadline"
                type="date"
                value={values.dueDate}
                onChange={(e) => updateValue("dueDate", e.target.value)}
                required
                aria-invalid={errors.dueDate ? true : undefined}
                aria-describedby={
                  errors.dueDate ? "create-deadline-error" : undefined
                }
                className={cn(
                  errors.dueDate && "border-rose-300 focus-visible:ring-rose-300",
                )}
              />
              <FieldError id="create-deadline-error" message={errors.dueDate} />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                "Create content"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
