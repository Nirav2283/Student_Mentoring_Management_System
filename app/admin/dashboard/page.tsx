import { getSessionUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const StatCard = ({ icon, label, value, trend, subtext, colorClass }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
        {trend}
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{label}</h3>
    <div className="flex items-baseline gap-2 mt-1">
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <span className="text-xs text-slate-400 font-medium">{subtext}</span>
    </div>
  </div>
);


export default async function DashboardPage() {
  const user = await getSessionUser()

  if (!user) {
    redirect('/login')
  }

  const CollegeID = user.CollegeID

  const studentCount = await prisma.student.count({
    where: {
      CollegeID
    }
  })

  const mentorCount = await prisma.mentor.count({
    where: {
      CollegeID
    }
  })
  return (
    <div className="space-y-8 animate-fade-in">
      {/* 4-Column Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon="school" label="Total Students" value={studentCount} trend="+12%" subtext="active" colorClass="bg-blue-50 text-[#135bec]" />
        <StatCard icon="supervisor_account" label="Total Mentors" value={mentorCount} trend="+5%" subtext="verified" colorClass="bg-purple-50 text-purple-600" />
        <StatCard icon="forum" label="Total Sessions" value="8,932" trend="+24%" subtext="all time" colorClass="bg-indigo-50 text-indigo-600" />
        <StatCard icon="schedule" label="Next 24h" value="42" trend="Scheduled" subtext="sessions" colorClass="bg-orange-50 text-orange-600" />
      </section>

      {/* Analytics Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mock Chart: Sessions by Dept */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Sessions by Department</h3>
            <span className="text-xs text-slate-400 font-bold uppercase">This Month</span>
          </div>
          <div className="flex items-end justify-between h-48 gap-4">
            {[65, 40, 85, 50, 70, 30].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-slate-50 rounded-t-lg relative h-full overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-[#135bec]/80 rounded-t-lg transition-all hover:bg-[#135bec]"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400">D{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6">Engagement Overview</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Student Participation Rate</span>
                <span className="font-bold">87%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-[#135bec] h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase font-bold">Avg Session</p>
                <p className="text-xl font-bold">48 min</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-slate-500 uppercase font-bold">Satisfaction</p>
                <p className="text-xl font-bold">4.8/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity / Status */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-slate-900">Current Mentor Status</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {[1, 2, 3].map((mentor) => (
            <div key={mentor} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400">person</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Dr. Robert Ford</p>
                  <p className="text-xs text-slate-500">Computer Science</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Available</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}