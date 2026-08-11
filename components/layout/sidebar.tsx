"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsUpDown,
  FileText,
  FolderKanban,
  KanbanSquare,
  LayoutDashboard,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { teamMembers } from "@/lib/data";
import { Avatar } from "@/components/ui/avatar";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pipeline", label: "Content Pipeline", icon: KanbanSquare },
  { href: "/content", label: "Content Library", icon: FileText },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/team", label: "Team", icon: Users },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent() {
  const pathname = usePathname();
  const currentUser = teamMembers[0];

  return (
    <>
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold tracking-tight">
            ContentFlow
          </p>
          <p className="text-xs text-muted-foreground">Content OS</p>
        </div>
      </div>

      <div className="px-3">
        <button className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 text-left shadow-xs transition-colors hover:bg-muted">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-[11px] font-semibold text-white">
              A
            </div>
            <div className="leading-tight">
              <p className="text-sm font-medium">Acme Studio</p>
              <p className="text-xs text-muted-foreground">Workspace</p>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <nav className="mt-5 flex-1 overflow-y-auto px-3">
        <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  {active && (
                    <span className="absolute left-0 h-4 w-1 rounded-r-full bg-primary" />
                  )}
                  <item.icon
                    className={cn(
                      "h-4.5 w-4.5",
                      active
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 pb-3">
        <div className="rounded-xl border border-border bg-gradient-to-b from-indigo-50/70 to-card p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold">Team plan trial</p>
              <p className="truncate text-xs text-muted-foreground">
                14 days left · 30 seats
              </p>
            </div>
          </div>
          <button className="mt-3 w-full cursor-pointer rounded-lg border border-border bg-card py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted">
            Upgrade plan
          </button>
        </div>
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted">
          <Avatar
            name={currentUser.name}
            initials={currentUser.initials}
            size="md"
          />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {currentUser.role}
            </p>
          </div>
          <button className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <SidebarContent />
      </aside>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
