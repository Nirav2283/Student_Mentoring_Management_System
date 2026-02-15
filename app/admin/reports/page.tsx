
import React from 'react';
import { prisma } from "@/app/lib/prisma";
import ReportsClient from '../../ui/ReportsClient';

export const dynamic = 'force-dynamic';

const ReportsPage = async () => {
  // 1. Total Students
  const totalStudents = await prisma.student.count({
    where: { Status: true } // Assuming 'Status' true means active
  });

  // 2. Total Mentors
  // Using 'users' table with Role 'MENTOR' or 'mentor' table?
  // Schema has 'mentor' table. Let's count that.
  const totalMentors = await prisma.mentor.count();

  // 3. Total Sessions
  const totalSessions = await prisma.studentmentoring.count();

  // 4. Pending Sessions
  // Assuming pending means DateOfMentoring is null or in the future?
  // Or maybe AttendanceStatus is null?
  // Let's assume DateOfMentoring is NULL means it's not done yet.
  const pendingSessions = await prisma.studentmentoring.count({
    where: {
      AttendanceStatus: null
    }
  });

  // 5. Monthly Sessions (Current Month)
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const monthlySessions = await prisma.studentmentoring.count({
    where: {
      DateOfMentoring: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    }
  });

  // 6. Attendance Stats (% Present)
  // We need count of Present / Total * 100
  // Total for attendance is sessions that are NOT pending (have a status)
  const sessionsWithStatus = await prisma.studentmentoring.count({
    where: {
      AttendanceStatus: {
        not: null
      }
    }
  });

  const presentSessions = await prisma.studentmentoring.count({
    where: {
      AttendanceStatus: 'PRESENT'
    }
  });

  const attendanceStats = sessionsWithStatus > 0 ? (presentSessions / sessionsWithStatus) * 100 : 0;

  // 7. Chart Data (Sessions per month for current year)
  // We'll fetch all sessions for the current year and group them in JS
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31);

  const yearSessions = await prisma.studentmentoring.findMany({
    where: {
      DateOfMentoring: {
        gte: startOfYear,
        lte: endOfYear
      }
    },
    select: {
      DateOfMentoring: true
    }
  });

  const chartData = new Array(12).fill(0);
  yearSessions.forEach(session => {
    if (session.DateOfMentoring) {
      const month = new Date(session.DateOfMentoring).getMonth();
      chartData[month]++;
    }
  });

  return (
    <ReportsClient
      totalStudents={totalStudents}
      totalMentors={totalMentors}
      totalSessions={totalSessions}
      pendingSessions={pendingSessions}
      avgRatingMentor="4.8" // Hardcoded for now
      avgRatingStudent="4.2" // Hardcoded for now
      monthlySessions={monthlySessions}
      attendanceStats={attendanceStats}
      chartData={chartData}
    />
  );
};

export default ReportsPage;