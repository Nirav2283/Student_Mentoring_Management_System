import React from 'react';
import Link from 'next/link';

interface UserRoleCardProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const UserRoleCard = ({ icon, title, description, buttonText, href }: UserRoleCardProps) => (
  <Link
    href={href}
    className="group relative flex flex-col items-center text-center p-8 md:p-10 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
  >
    {/* Animated top border line */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#135bec] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <div className="size-24 rounded-2xl bg-blue-50 text-[#135bec] flex items-center justify-center mb-6 group-hover:bg-[#135bec] group-hover:text-white transition-colors duration-300">
      <span className="material-symbols-outlined text-5xl">{icon}</span>
    </div>

    <h2 className="text-2xl font-bold text-[#111318] mb-3">{title}</h2>

    <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base">
      {description}
    </p>

    <div className="mt-auto w-full">
      <div className="w-full py-3 px-4 bg-transparent border border-gray-300 rounded-lg text-gray-700 font-semibold group-hover:bg-[#135bec] group-hover:border-[#135bec] group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
        <span>{buttonText}</span>
        <span className="material-symbols-outlined text-lg">arrow_forward</span>
      </div>
    </div>
  </Link>
);

export default function LoginSelection() {
  return (
    <div className="bg-[#f6f6f8] text-[#111318] min-h-screen flex flex-col font-sans">
      {/* Material Symbols */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block" />

      {/* Header */}
      <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 text-[#135bec] flex items-center justify-center rounded-lg bg-[#135bec]/10">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <h2 className="text-[#111318] text-lg font-bold leading-tight tracking-tight">Mentora</h2>
          </Link>
          <Link href="/" className="text-[#135bec] text-sm font-bold hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[1280px] flex flex-col gap-8 md:gap-12 animate-fade-in-up">

          <div className="text-center flex flex-col gap-3">
            <h1 className="text-[#111318] text-3xl md:text-5xl font-black tracking-tight">
              Select User Type
            </h1>
            <p className="text-gray-500 text-lg max-w-[600px] mx-auto">
              Choose your role to access the Mentora portal securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <UserRoleCard
              icon="supervisor_account"
              title="Mentor Login"
              description="Access administrative tools, manage student rosters, and track mentorship programs."
              buttonText="Continue as Mentor"
              href="/login/mentor"
            />
            <UserRoleCard
              icon="school"
              title="Student Login"
              description="Connect with mentors, track your learning journey, and access exclusive resources."
              buttonText="Continue as Student"
              href="/login/student"
            />
            <UserRoleCard
              icon="admin_panel_settings"
              title="Admin Login"
              description="Manage system settings, user permissions, and view platform analytics."
              buttonText="Continue as Admin"
              href="/login/admin"
            />
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="#" className="text-[#135bec] hover:underline font-medium">
                Contact Administrator
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-gray-200 bg-white">
        <div className="max-w-[960px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#616f89] text-sm font-normal">
            © {new Date().getFullYear()} Mentora Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[#616f89] hover:text-[#135bec] text-sm font-medium transition-colors">About</Link>
            <Link href="#" className="text-[#616f89] hover:text-[#135bec] text-sm font-medium transition-colors">Help Center</Link>
            <Link href="#" className="text-[#616f89] hover:text-[#135bec] text-sm font-medium transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}