"use client";

import React from 'react';

const ReportsAnalytics = () => {
  return (
    <div className="bg-[#f6f6f8] min-h-screen text-[#111318] font-sans selection:bg-blue-100">
      {/* Material Symbols Font Link */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#111318]">
              Advanced Reports and Analytics
            </h1>
            <p className="text-gray-500 mt-2 text-base">
              Real-time performance metrics and historical data analysis.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>Select Date Range</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#135bec] text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span>Export Dashboard</span>
            </button>
          </div>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total students", value: "2,845", trend: "+4.2%", trendColor: "text-green-600" },
            { label: "Total mentors", value: "142", trend: "Stable", trendColor: "text-gray-400" },
            { label: "Total sessions", value: "12,490", trend: "+12%", trendColor: "text-green-600" },
            { label: "Pending sessions", value: "84", trend: "-5%", trendColor: "text-orange-600" },
            { label: "Avg rating per mentor", value: "4.8", icon: "star", trend: "Top Tier", trendColor: "text-gray-400" },
            { label: "Avg rating per student", value: "4.2", icon: "star", trend: "+0.3", trendColor: "text-green-600" },
            { label: "Monthly sessions", value: "1,240", trend: "Last Month", trendColor: "text-[#135bec]" },
            { label: "Attendance stats", value: "92.4%", progress: 92.4 },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-32">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-1">
                  <h3 className="text-2xl font-black">{stat.value}</h3>
                  {stat.icon && <span className="material-symbols-outlined text-yellow-500 fill-1 text-xl">star</span>}
                </div>
                {stat.trend && <span className={`text-xs font-bold ${stat.trendColor}`}>{stat.trend}</span>}
                {stat.progress && (
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${stat.progress}%` }}></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Line Chart Component */}
          <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-xl font-black">Mentoring Sessions per Month</h2>
                <p className="text-sm text-gray-500">Yearly trend of completed mentoring sessions</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#135bec]"></span>
                  <span className="text-xs font-bold text-gray-500">Current Year</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span>
                  <span className="text-xs font-bold text-gray-500">Previous Year</span>
                </div>
              </div>
            </div>

            <div className="h-[280px] w-full relative flex flex-col justify-end">
              <div className="absolute inset-0 flex flex-col justify-between py-1">
                {[...Array(5)].map((_, i) => <div key={i} className="border-t border-gray-50 w-full h-px"></div>)}
              </div>
              <svg className="relative w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                {/* Previous Year Path */}
                <path d="M0,250 Q100,240 200,260 T400,230 T600,250 T800,220 T1000,240" fill="none" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="6" />
                {/* Current Year Path */}
                <path d="M0,220 L100,200 L200,180 L300,140 L400,160 L500,100 L600,80 L700,110 L800,90 L900,60 L1000,40" fill="none" stroke="#135bec" strokeWidth="4" strokeLinecap="round" />
                {[500, 600, 900, 1000].map((x, i) => (
                  <circle key={i} cx={x} cy={[100, 80, 60, 40][i]} r="6" fill="#135bec" stroke="white" strokeWidth="2" />
                ))}
              </svg>
              <div className="flex justify-between mt-6 px-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
              </div>
            </div>
          </div>

          {/* Donut Chart Component */}
          <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            <h2 className="text-xl font-black mb-1">Attendance</h2>
            <p className="text-sm text-gray-500 mb-10">Participation breakdown</p>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#135bec" strokeWidth="4" strokeDasharray="75 100" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-75" />
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-90" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black">92%</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Average</span>
                </div>
              </div>
              <div className="w-full mt-10 space-y-3">
                {[
                  { label: "Present", val: "75%", color: "bg-[#135bec]" },
                  { label: "Excused", val: "15%", color: "bg-purple-500" },
                  { label: "Absent", val: "10%", color: "bg-red-500" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                      <span className="text-gray-500">{item.label}</span>
                    </div>
                    <span>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Mentor Performance", desc: "Detailed audit for faculty mentors.", icon: "badge", bg: "bg-blue-50", text: "text-[#135bec]" },
            { title: "Student Progress", desc: "Aggregate student growth metrics.", icon: "trending_up", bg: "bg-purple-50", text: "text-purple-600" },
            { title: "Department Summary", desc: "Inter-departmental resource ranking.", icon: "account_balance", bg: "bg-orange-50", text: "text-orange-600" },
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#135bec]/50 transition-all group cursor-pointer shadow-sm">
              <div className={`${card.bg} ${card.text} p-3 rounded-xl w-fit mb-4`}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <h3 className="font-black text-base">{card.title}</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{card.desc}</p>
              <button className="mt-6 text-[#135bec] text-xs font-black flex items-center gap-1 group-hover:gap-2 transition-all">
                GENERATE REPORT <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="bg-gray-100 text-gray-500 p-3 rounded-xl w-fit mb-4">
              <span className="material-symbols-outlined">export_notes</span>
            </div>
            <h3 className="font-black text-base">Bulk Export Utility</h3>
            <p className="text-xs text-gray-500 mt-2">Download raw data formats.</p>
            <div className="flex gap-2 mt-6">
              <button className="flex-1 py-2 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-black border border-gray-200 hover:bg-gray-100 transition-all">PDF</button>
              <button className="flex-1 py-2 bg-gray-50 text-gray-600 rounded-lg text-[10px] font-black border border-gray-200 hover:bg-gray-100 transition-all">EXCEL</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ReportsAnalytics;