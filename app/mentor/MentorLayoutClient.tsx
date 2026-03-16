"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logout } from "../actions/logout";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  LayoutDashboard, Users, CalendarDays, User, LogOut,
} from "lucide-react";

const NavItem = ({ icon: Icon, label, href }: { icon: any; label: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <Button
        variant={isActive ? "default" : "ghost"}
        className={`w-full justify-start gap-3 h-10 ${isActive ? "" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Icon className="size-[18px]" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export default function MentorLayoutClient({ children, user }: { children: React.ReactNode; user: any }) {
  return (
    <div className="font-sans bg-background text-foreground overflow-hidden h-screen flex">
      {/* Persistent Sidebar */}
      <aside className="hidden md:flex w-72 flex-col justify-between border-r border-border bg-card p-6 z-20">
        <div className="flex flex-col gap-8 flex-1 overflow-y-auto no-scrollbar">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-2">
            <div className="flex items-center justify-center size-10 rounded-xl bg-card shadow-sm overflow-hidden border border-border">
              <img src="/mentora.jpg" alt="Mentora" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-foreground">Mentora</h1>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Mentor Console</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <NavItem icon={LayoutDashboard} label="Dashboard" href="/mentor/dashboard" />
            <NavItem icon={Users} label="Assigned Students" href="/mentor/students" />
            <NavItem icon={CalendarDays} label="Sessions" href="/mentor/sessions" />
            <NavItem icon={User} label="Your Profile" href="/mentor/profile" />
          </nav>
        </div>

        {/* Footer Actions */}
        <form action={Logout}>
          <Button variant="outline" className="w-full gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/50 hover:bg-destructive/5">
            <LogOut className="size-4" />
            Sign Out
          </Button>
        </form>
      </aside>

      {/* The Dynamic Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-foreground tracking-tight">Mentora Portal</h2>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{user.name} ({user.role})</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <p className="text-[11px] text-muted-foreground font-semibold">{user.collegeName}</p>
                </div>
                <Avatar className="size-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                    {user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1400px] mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
