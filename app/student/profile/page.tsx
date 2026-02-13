import React from "react";
import Link from "next/link";
import { 
  User, 
  GraduationCap, 
  FileText, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  IdCard, 
  UserRoundPen,
  Share2
} from "lucide-react";
import { getSessionUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export default async function StudentProfile() {
  const sessionUser = await getSessionUser()
  const studata = await prisma.student.findFirst({
    where:{
      UserID:sessionUser?.UserID
    }
  })
  console.log(studata)
  // const initials = "JD";
  const getInitials = (name?: string) => {
  if (!name) return "A";

  return name
    .trim()
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();
};


  return (
    <div className="min-h-screen font-sans selection:bg-blue-100 selection:text-blue-700">
      <main className="max-w-5xl mx-auto p-6 md:p-8 animate-in fade-in duration-500">
        
        {/* Profile Header Area */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Initials Avatar */}
            <div className="size-32 rounded-3xl bg-slate-50 border-2 border-slate-100 shadow-sm flex items-center justify-center text-4xl font-black text-blue-600 tracking-tight">
              {getInitials(sessionUser?.Name)}
            </div>

            <div className="flex-1 text-center md:text-left space-y-1">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                {sessionUser?.Name}
              </h1>
              <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
                <IdCard className="size-5 text-blue-600" />
                Enrollment: <span className="font-mono text-slate-700">{studata?.EnrollmentNo}</span>
              </p>
            </div>

            {/* <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95">
                <UserRoundPen className="size-4" />
                Edit Profile
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                <Share2 className="size-4" />
                Share
              </button>
            </div> */}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Details */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <User className="size-5 text-blue-600" />
                <h2 className="font-bold text-slate-800">Personal Details</h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <p className="mt-1 text-slate-900 font-semibold text-lg">{sessionUser?.Name}</p>
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Enrollment No.</label>
                  <p className="mt-1 text-slate-900 font-bold font-mono">{}</p>
                </div> */}
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Mobile Number</label>
                  <p className="mt-1 text-slate-900 font-semibold">{studata?.MobileNo}</p>
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                  <p className="mt-1 text-blue-600 font-semibold decoration-2 underline-offset-4">{sessionUser?.Email}</p>
                </div>
              </div>
            </section>

            {/* Academic Info */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <GraduationCap className="size-5 text-blue-600" />
                <h2 className="font-bold text-slate-800">Academic Info</h2>
              </div>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Department</label>
                    <p className="mt-1 text-slate-900 font-semibold">{studata?.Department}</p>
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Current Semester</label>
                    <p className="mt-1 text-slate-900 font-semibold">{studata?.CurrentSem}</p>
                  </div>
                </div>
                
              </div>
            </section>

            {/* Bio */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                <FileText className="size-5 text-blue-600" />
                <h2 className="font-bold text-slate-800">Bio / Description</h2>
              </div>
              <div className="p-8">
                <p className="text-slate-600 leading-relaxed font-medium">
                  {studata?.Description}
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Account Security */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-200 relative overflow-hidden">
               <ShieldCheck className="absolute -right-4 -top-4 size-32 opacity-10 rotate-12" />
               <h2 className="text-xl font-black mb-2 flex items-center gap-2">
                 <Lock className="size-5 text-red-400" />
                 Security
               </h2>
               <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                 Manage your password and security settings to protect your data.
               </p>
               <Link href="/student/change-password">
                 <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
                   Change Password
                 </button>
               </Link>
               <div className="mt-6 flex items-center justify-between">
                 {/* <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">2FA Status</span> */}
                 {/* <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-emerald-500/30">
                   Active
                 </span> */}
               </div>
            </div>

            {/* Support Box */}
            {/* <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl group cursor-pointer hover:border-blue-300 transition-all">
              <h3 className="font-black text-blue-900 text-lg mb-1">Need Support?</h3>
              <p className="text-blue-700/70 text-sm mb-6 font-medium">
                Facing issues with your data or mentoring sessions?
              </p>
              <button className="flex items-center gap-2 text-blue-700 font-black text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                Contact Support
                <ArrowRight className="size-4" />
              </button>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
}