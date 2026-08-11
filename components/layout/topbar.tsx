"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { teamMembers } from "@/lib/data";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown, MenuItem, MenuLabel, MenuSeparator } from "@/components/ui/dropdown";
import { CreateContentButton } from "@/components/content/create-content-button";

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const currentUser = teamMembers[0];
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [userMenuKey, setUserMenuKey] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "/") return;
      const el = document.activeElement;
      const typing =
        el instanceof HTMLElement &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT" ||
          el.isContentEditable);
      if (typing) return;
      e.preventDefault();
      searchRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/content?q=${encodeURIComponent(q)}` : "/content");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <form
        onSubmit={handleSearch}
        role="search"
        className="relative hidden max-w-sm flex-1 md:block"
      >
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search content, projects, people…"
          aria-label="Search content"
          className="pl-9"
        />
      </form>

      <div className="flex-1 md:hidden" />

      <div className="flex items-center gap-1.5">
        <CreateContentButton
          size="sm"
          className="hidden sm:inline-flex"
        />
        <CreateContentButton
          size="icon-sm"
          label=""
          className="sm:hidden"
          aria-label="New content"
        />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Help"
          className="hidden sm:inline-flex"
        >
          <CircleHelp className="h-4.5 w-4.5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />
        </Button>

        <Dropdown
          key={userMenuKey}
          width="sm"
          trigger={
            <button className="ml-1 flex cursor-pointer items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-muted">
              <Avatar
                name={currentUser.name}
                initials={currentUser.initials}
                size="md"
              />
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
            </button>
          }
        >
          <MenuLabel>Signed in as</MenuLabel>
          <div className="px-2 pb-1">
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">{currentUser.email}</p>
          </div>
          <MenuSeparator />
          <MenuItem
            onClick={() => {
              setUserMenuKey((k) => k + 1);
              router.push("/profile");
            }}
          >
            <UserRound className="h-4 w-4 text-muted-foreground" /> Profile
          </MenuItem>
          <MenuItem>
            <Settings className="h-4 w-4 text-muted-foreground" /> Settings
          </MenuItem>
          <MenuSeparator />
          <MenuItem className="text-rose-600 hover:bg-rose-50">
            <LogOut className="h-4 w-4" /> Sign out
          </MenuItem>
        </Dropdown>
      </div>
    </header>
  );
}
