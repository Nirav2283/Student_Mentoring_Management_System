"use client";

import React from 'react';
import Link from 'next/link';

// Sample Data for Mentoring History
const mentoringSessions = [
  { id: "SES001", date: "Oct 24, 2023", mentor: "Dr. Jane Doe", initials: "JD", agenda: "Career Path Discussion", status: "Present" },
  { id: "SES002", date: "Oct 10, 2023", mentor: "Mark Smith", initials: "MS", agenda: "Stress Management", status: "Present" },
  { id: "SES003", date: "Sep 28, 2023", mentor: "Dr. Jane Doe", initials: "JD", agenda: "Academic Progress Review", status: "Absent" },
  { id: "SES004", date: "Sep 15, 2023", mentor: "Lisa Ray", initials: "LR", agenda: "Internship Readiness", status: "Present" },
];

export default function MentoringHistoryPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-slate-900 text-3xl font-black tracking-tight">Mentoring History</h2>
        <p className="text-slate-500 text-sm max-w-2xl">
          Review your past academic and personal mentoring sessions, track attendance, and monitor your progress.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-lg bg-blue-50 text-[#135bec] flex items-center justify-center border border-blue-100">
            <span className="material-symbols-outlined">calendar_month</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Sessions</p>
            <p className="text-xl font-black text-slate-900">14</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <span className="material-symbols-outlined">task_alt</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Attendance Rate</p>
            <p className="text-xl font-black text-slate-900">92%</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <span className="material-symbols-outlined">monitoring</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg. Performance</p>
            <p className="text-xl font-black text-slate-900">High</p>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all outline-none" 
            placeholder="Search by agenda or mentor..." 
            type="text"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            <span>Date Range</span>
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mentor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Agenda</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mentoringSessions.map((session) => (
                <tr key={session.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-900">{session.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-blue-50 text-[#135bec] flex items-center justify-center font-bold text-[11px] border border-blue-100">
                        {session.initials}
                      </div>
                      <div className="text-sm font-medium text-slate-700">{session.mentor}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900 font-medium">{session.agenda}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      session.status === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {/* Give Feedback Button - Only visible if Present */}
                      {session.status === 'Present' && (
                        <Link href={`/student/mentoringhistory/feedback/${session.id}`}>
                          <button 
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#135bec] text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                          >
                            <span className="material-symbols-outlined text-[16px]">rate_review</span>
                            <span>Give Feedback</span>
                          </button>
                        </Link>
                      )}
                      
                      {/* View Details Button */}
                      <Link href={`/student/mentoringhistory/${session.id}`}>
                        <button 
                          className="p-1.5 text-slate-400 hover:text-[#135bec] hover:bg-blue-50 rounded-lg transition-colors" 
                          title="View Session Details"
                        >
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">1</span> to <span className="font-bold text-slate-900">4</span> of <span className="font-bold text-slate-900">14</span> sessions
          </p>
          <div className="flex gap-1">
            <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="px-3.5 py-1 border border-[#135bec] bg-blue-50 text-[#135bec] rounded-lg font-bold text-sm">1</button>
            <button className="px-3.5 py-1 border border-gray-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm">2</button>
            <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}