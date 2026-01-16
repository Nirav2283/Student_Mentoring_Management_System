"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Navigation Item Component
const NavItem = ({ icon, label, href }: { icon: string; label: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group ${
        isActive 
          ? "bg-[#135bec] text-white shadow-md shadow-[#135bec]/20" 
          : "text-slate-600 hover:bg-slate-50 hover:text-[#135bec]"
      }`}
    >
      <span className={`material-symbols-outlined text-[22px] ${isActive ? "" : "text-slate-400 group-hover:text-[#135bec]"}`}>
        {icon}
      </span>
      <p className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{label}</p>
    </Link>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans bg-[#f6f6f8] text-slate-900 overflow-hidden h-screen flex">
      {/* Google Material Symbols */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />

      {/* Persistent Sidebar */}
      <aside className="hidden md:flex w-72 flex-col justify-between border-r border-gray-200 bg-white p-6 z-20">
        <div className="flex flex-col gap-8 flex-1 overflow-y-auto no-scrollbar">
          {/* Logo Section */}
          <div className="flex items-center gap-3 px-2">
            <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-[#135bec] to-blue-600 text-white shadow-lg">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold leading-tight">EduMentor</h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Admin Console</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <NavItem icon="dashboard" label="Dashboard" href="/mentor/dashboard" />
            
            {/* <p className="px-4 mt-6 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Student Management</p> */}
            <NavItem icon="groups" label="Assigned Students" href="/mentor/students" />
            {/* <NavItem icon="person_add" label="Add New Student" href="/mentor/students/add" /> */}
            {/* <NavItem icon="upload_file" label="Bulk Import" href="/admin/students/import" /> */}
            
      
            {/* <p className="px-4 mt-6 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Mentor Management</p> */}

            <NavItem icon="event" label="Sessions" href="/mentor/sessions" />
            {/* <NavItem icon="person_add" label="Add New Mentor" href="/mentor/mentors/add" /> */}
            {/* <NavItem icon="upload_file" label="Bulk Import" href="/admin/mentors/import" /> */}
            {/* <NavItem icon="assignment_ind" label="Assign Mentor" href="/mentor/mentors/assignmentor" /> */}
            {/* <NavItem icon="domain" label="College Management" href="/dashboard/colleges" /> */}
            
            {/* <p className="px-4 mt-6 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Analysis</p> */}
            
            <NavItem icon="person" label="Your Profile" href="/mentor/profile" />
          </nav>
        </div>

        {/* Footer Actions */}
        <button className="flex w-full items-center justify-center gap-2 rounded-lg h-10 border border-gray-200 bg-white hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-semibold group">
          <span className="material-symbols-outlined text-[18px] text-slate-400 group-hover:text-red-600">logout</span>
          Sign Out
        </button>
      </aside>

      {/* The Dynamic Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Mentora Portal</h2>
          <div className="flex items-center gap-4">
             {/* Profile and Notifications shared across all screens */}
             <div className="size-8 rounded-full bg-slate-200" />
          </div>
        </header>

        {/* This is where the specific page content (children) will appear */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}