"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Plus } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { CreateContentModal } from "./create-content-modal";

export function CreateContentButton({
  label = "New content",
  size,
  variant,
  className,
  initialProjectId,
  ...props
}: {
  label?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
  initialProjectId?: string;
} & Omit<ButtonProps, "size" | "variant" | "className">) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const handleCreated = useCallback((title: string) => {
    setOpen(false);
    setToast(`"${title}" was added to the library.`);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3500);
  }, []);

  return (
    <>
      <Button
        type="button"
        size={size}
        variant={variant}
        className={className}
        onClick={() => setOpen(true)}
        {...props}
      >
        <Plus className="h-4 w-4" />
        {label}
      </Button>

      {open && (
        <CreateContentModal
          open={open}
          onClose={closeModal}
          onCreated={handleCreated}
          initialProjectId={initialProjectId}
        />
      )}

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
        >
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground shadow-lg">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            {toast}
          </div>
        </div>
      )}
    </>
  );
}
