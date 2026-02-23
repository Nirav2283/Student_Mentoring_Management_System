import React from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Search,
  TrendingUp,
  AlertCircle,
  Video
} from 'lucide-react';
import { getSessionUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

const MentorshipDashboard = async () => {
  const sessionUser = await getSessionUser();

  const mentor = await prisma.mentor.findFirst({
    where: {
      UserID: sessionUser?.UserID,
    },
  });

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  // Fetch active students and their latest mentoring session
  const activeStudentMentors = await prisma.studentmentor.findMany({
    where: {
      MentorID: mentor.MentorID,
    },
    include: {
      student: true,
      studentmentoring: {
        orderBy: {
          CreatedAt: "desc",
        },
        take: 1,
      },
    },
  });

  const now = new Date();

  const upcomingList = activeStudentMentors.filter((sm) => {
    const lastSession = sm.studentmentoring[0];
    return (
      !lastSession ||
      (lastSession.NextMentoringDate && lastSession.NextMentoringDate >= now)
    );
  });


  const pendingList = activeStudentMentors.filter((sm) => {
    const lastSession = sm.studentmentoring[0];
    return lastSession && lastSession.AttendanceStatus === "ABSENT";
  });

  const totalStudentsCount = activeStudentMentors.length;
  const upcomingMeetingsCount = upcomingList.length;
  const pendingMentoringCount = pendingList.length;

  return (
    <div className="min-h-screen bg-[#f6f6f8] p-4 md:p-8 font-sans text-[#111318]">
      <div className="max-w-7xl mx-auto">
        {/* Simple Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Welcome back, {mentor.MentorName}
            </h1>
            <p className="text-gray-500 mt-1">Summary of mentoring activity.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <StatCard
            label="Total Students"
            value={totalStudentsCount}
            color="blue"
          />
          <StatCard
            label="Upcoming Meetings"
            value={upcomingMeetingsCount}
            color="purple"
          />
          <StatCard
            label="Pending Mentoring"
            value={pendingMentoringCount}
            trend={pendingMentoringCount > 0 ? "Requires attention" : "Everything clear"}
            color="orange"
            isAlert={pendingMentoringCount > 0}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Meetings Table */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={20} />
                  Upcoming Mentoring Meetings
                </h2>
                <Link href="/mentor/students" className="text-sm text-blue-600 font-semibold hover:underline">
                  View All
                </Link>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {upcomingList.length > 0 ? (
                      upcomingList.map((sm) => {
                        const lastSession = sm.studentmentoring[0];
                        const dateText = lastSession?.NextMentoringDate
                          ? new Date(lastSession.NextMentoringDate).toLocaleDateString()
                          : "Never Mentored";
                        const timeText = lastSession?.NextMentoringDate
                          ? new Date(lastSession.NextMentoringDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : "Pending Initial";

                        return (
                          <MeetingRow
                            key={sm.StudentMentorID}
                            time={timeText}
                            date={dateText}
                            name={sm.student.StudentName}
                            isNext={!lastSession || (lastSession.NextMentoringDate && lastSession.NextMentoringDate >= now)}
                          />
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center text-gray-500 italic">
                          No upcoming student
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pending Students Table */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="text-orange-500" size={20} />
                  Pending Students for Mentoring
                </h2>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pendingList.length > 0 ? (
                      pendingList.map((sm) => (
                        <PendingRow
                          key={sm.StudentMentorID}
                          name={sm.student.StudentName}
                          reason="Absent in last session"
                          statusColor="red"
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-10 text-center text-gray-500 italic">
                          No pending student
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Updated Sub-components ---

const StatCard = ({ label, value, trend, color, isAlert = false }: any) => {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <span className={`p-2 rounded-lg ${colorMap[color]}`}>
          <TrendingUp size={18} />
        </span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p
        className={`text-sm font-medium ${isAlert ? "text-red-500" : "text-green-600"
          }`}
      >
        {trend}
      </p>
    </div>
  );
};

const MeetingRow = ({ time, date, name, isNext = false }: any) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex flex-col">
        <span
          className={`text-sm font-bold ${isNext ? "text-blue-600" : "text-gray-900"
            }`}
        >
          {time}
        </span>
        <span className="text-[10px] text-gray-400">{date}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
          {name.split(" ").map((n: string) => n[0]).join("")}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-right">
      {isNext && (
        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">
          Upcoming
        </span>
      )}
    </td>
  </tr>
);

const PendingRow = ({ name, reason, statusColor }: any) => {
  const colors: any = {
    red: "bg-red-50 text-red-700",
    orange: "bg-orange-50 text-orange-700",
    blue: "bg-blue-50 text-blue-700",
  };
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
            {name.split(" ").map((n: string) => n[0]).join("")}
          </div>
          <span className="text-sm font-medium">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${colors[statusColor]}`}
        >
          {reason}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        {/* Placeholder for action */}
      </td>
    </tr>
  );
};


const AlertCard = ({ title, desc, color, action }: any) => {
  const styles: any = {
    red: "bg-red-50 border-red-100 text-red-900",
    orange: "bg-orange-50 border-orange-100 text-orange-900"
  };
  return (
    <div className={`p-4 border rounded-xl relative overflow-hidden ${styles[color]}`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${color === 'red' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
      <div className="flex gap-3">
        <AlertCircle size={20} className={color === 'red' ? 'text-red-500' : 'text-orange-500'} />
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-xs mt-1 leading-relaxed opacity-80">{desc}</p>
          <button className="mt-2 text-xs font-bold underline underline-offset-2">{action}</button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipDashboard;