"use client";

import React from "react";
import Link from "next/link";
export default function MentoringSessionDetail() {
  return (
    <div className="min-h-scree p-4 md:p-8 animate-fade-in font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Actions & Back Button */}
        <div className="flex items-center justify-between">
          <Link href={"/student/mentoringhistory"}>
            <button className="flex items-center gap-2 text-[#135bec] hover:text-blue-700 font-bold text-sm transition-colors group">
              <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Back to History
            </button>
          </Link>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-slate-600 hover:shadow-md transition-all">
            <span className="material-symbols-outlined text-lg">print</span>
            Print Record
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-slate-900 text-3xl font-black tracking-tight">
                  Session Details: Alex Johnson
                </h1>
                <span className="px-3 py-1 bg-blue-50 text-[#135bec] text-[11px] font-bold rounded-full uppercase tracking-wider border border-blue-100">
                  Completed
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">
                Student ID:{" "}
                <span className="text-[#135bec] font-bold">STU-882910</span> •
                Last updated 2 hours ago by Sarah Miller
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Date
                </p>
                <p className="text-lg font-bold text-slate-900">Oct 24, 2023</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <span className="material-symbols-outlined">how_to_reg</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Attendance
                </p>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500"></div>
                  <p className="text-lg font-bold text-slate-900">Present</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Learner Type
                </p>
                <p className="text-lg font-bold text-slate-900">Fast Learner</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Section */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-slate-50/50">
                <span className="material-symbols-outlined text-[#135bec]">
                  description
                </span>
                <h3 className="font-bold text-slate-800">Session Overview</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-[11px] font-black text-[#135bec] uppercase tracking-wider mb-2">
                    Agenda
                  </h4>
                  <p className="text-slate-800 text-lg font-semibold leading-snug">
                    Review of midterm results and adjustment of study plan for
                    Calculus II.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-[11px] font-black text-[#135bec] uppercase tracking-wider mb-4">
                    Detailed Issues Discussed
                  </h4>
                  <div className="text-slate-600 text-sm leading-relaxed space-y-4 font-medium">
                    <p>
                      Alex expressed concern about the pacing of the advanced
                      mathematics module. Specifically, we looked at the last
                      three assignments where partial credit was lost due to
                      notation errors rather than conceptual misunderstanding.
                    </p>
                    <p>
                      We discussed time management during exams. Alex mentioned
                      feeling "rushed" during the 50-minute blocks, leading to
                      anxiety spikes. We mapped out a plan to use the first 5
                      minutes purely for reading the entire paper before
                      starting.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mentor Insight Section */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-slate-50/50">
                <span className="material-symbols-outlined text-[#135bec]">
                  rate_review
                </span>
                <h3 className="font-bold text-slate-800">Mentor Insights</h3>
              </div>
              <div className="p-6">
                <h4 className="text-[11px] font-black text-[#135bec] uppercase tracking-wider mb-3">
                  Staff Opinion & Remarks
                </h4>
                <div className="p-5 bg-blue-50/30 rounded-xl border-l-4 border-[#135bec]">
                  <p className="text-sm text-slate-700 italic font-medium leading-relaxed">
                    "Alex is showing great maturity. While the academic pressure
                    is mounting, his willingness to seek help early is a strong
                    indicator of success. I recommend he continues the current
                    trajectory but keeps an eye on his extracurricular workload
                    to prevent burnout."
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            {/* Stress Level Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">
                Student State
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-slate-700">
                      Stress Level
                    </p>
                    <span className="text-[10px] font-black text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded-md">
                      Moderate
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>
                {/* <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Student feels confident but slightly overwhelmed by upcoming deadlines in Calculus.
                </p> */}
              </div>
            </div>

            {/* Next Session Action Card */}
            <div className="bg-[#135bec] p-6 rounded-2xl text-white shadow-lg shadow-blue-200 relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-2 -top-2 text-7xl opacity-10 rotate-12">
                event_upcoming
              </span>
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-80">
                Follow-up Session
              </h3>
              <div className="space-y-1">
                <p className="text-xs opacity-80">Next Date</p>
                <p className="text-2xl font-black">Nov 12, 2023</p>
                <p className="text-[11px] font-bold flex items-center gap-1 opacity-90 pt-2">
                  <span className="material-symbols-outlined text-sm">
                    alarm
                  </span>
                  10:30 AM
                </p>
              </div>
              {/* <button className="w-full mt-6 py-2.5 bg-white text-[#135bec] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                Reschedule
              </button> */}
            </div>

            {/* Attachments Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                Support Assets
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Midterm_Report.pdf",
                    size: "2.4 MB",
                    icon: "picture_as_pdf",
                    color: "text-red-500",
                    bg: "bg-red-50",
                  },
                  {
                    name: "Study_Plan_v2.docx",
                    size: "1.1 MB",
                    icon: "description",
                    color: "text-blue-500",
                    bg: "bg-blue-50",
                  },
                ].map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group border border-transparent hover:border-slate-100"
                  >
                    <div
                      className={`size-10 ${file.bg} ${file.color} rounded-lg flex items-center justify-center`}
                    >
                      <span className="material-symbols-outlined">
                        {file.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {file.size}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-[#135bec] transition-colors">
                      download
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
      </div>
    </div>
  );
}
