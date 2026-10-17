"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useNavProgress } from "@/app/components/NavigationProgress";
import { Logout } from "../actions/logout";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  LayoutDashboard, Users, CalendarDays, User, LogOut, Menu, X,
} from "lucide-react";

const NavItem = ({ icon: Icon, label, href, onClick }: { icon: any; label: string; href: string; onClick?: () => void }) => {
  const pathname = usePathname();
  const { navigate } = useNavProgress();
  const isActive = pathname === href;

  return (
    <button onClick={() => { navigate(href); onClick?.(); }} className="w-full text-left">
      <Button
        variant={isActive ? "default" : "ghost"}
        className={`w-full justify-start gap-3 h-10 ${isActive ? "" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Icon className="size-[18px]" />
        <span>{label}</span>
      </Button>
    </button>
  );
};

function MentorLayoutContent({ children, user }: { children: React.ReactNode; user: any }) {
  const { startNavigation } = useNavProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const sidebarContent = (
    <>
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
          <NavItem icon={LayoutDashboard} label="Dashboard" href="/mentor/dashboard" onClick={closeMobileMenu} />
          <NavItem icon={Users} label="Assigned Students" href="/mentor/students" onClick={closeMobileMenu} />
          <NavItem icon={CalendarDays} label="Sessions" href="/mentor/sessions" onClick={closeMobileMenu} />
          <NavItem icon={User} label="Your Profile" href="/mentor/profile" onClick={closeMobileMenu} />
        </nav>
      </div>

      {/* Footer Actions */}
      <form action={Logout} onSubmit={startNavigation}>
        <Button variant="outline" className="w-full gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/50 hover:bg-destructive/5">
          <LogOut className="size-4" />
          Sign Out
        </Button>
      </form>
    </>
  );

  return (
    <div className="font-sans bg-background text-foreground overflow-hidden h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col justify-between border-r border-border bg-card p-6 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeMobileMenu}
          />
          <aside className="absolute top-0 left-0 h-full w-72 flex flex-col justify-between bg-card border-r border-border p-6 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex justify-end mb-2">
              <button
                onClick={closeMobileMenu}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* The Dynamic Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Mentora Portal</h2>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
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

export default function MentorLayoutClient({ children, user }: { children: React.ReactNode; user: any }) {
  return <MentorLayoutContent user={user}>{children}</MentorLayoutContent>;
}
