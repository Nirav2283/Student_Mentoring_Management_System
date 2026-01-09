"use client";

import React from 'react';
import Link from 'next/link';

export default function StudentProfileView() {
  // Mock data based on provided Schema
  const student = {
    StudentID: "S1001",
    StudentName: "Alex Johnson",
    EnrollmentNo: "ENR2022054",
    MobileNo: "+1 (555) 123-4567",
    EmailAddress: "alex.j@university.edu",
    Description: "Final year Computer Science student focused on AI and Machine Learning. Active member of the coding club.",
    Created: "Sept 01, 2022",
  };

  const mentoringHistory = [
    {
      StudentMentoringID: "M901",
      DateOfMentoring: "Dec 20, 2025",
      ScheduledMeetingDate: "Dec 20, 2025",
      NextMentoringDate: "Jan 15, 2026",
      IssuesDiscussed: "Mid-term results and career path in cloud computing.",
      AttendanceStatus: "Present",
      StressLevel: "Low",
      LearnerType: "Visual",
      IsParentPresent: "No",
      StaffOpinion: "Alex is showing consistent improvement in technical logic.",
      StudentsOpinion: "Satisfied with the guidance provided for the project."
    },
    {
      StudentMentoringID: "M895",
      DateOfMentoring: "Nov 12, 2025",
      ScheduledMeetingDate: "Nov 10, 2025",
      IssuesDiscussed: "Discussed difficulty in Discrete Mathematics.",
      AttendanceStatus: "Absent",
      AbsentRemarks: "Medical Emergency",
      IsParentPresent: "Yes",
      ParentName: "John Johnson",
      ParentMobileNo: "+1 (555) 987-6543",
      ParentsOpinion: "Happy with the college support system.",
      StaffOpinion: "Needs to focus more on remedial classes.",
      StressLevel: "Medium",
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <Link href="/dashboard" className="hover:text-[#135bec]">Dashboard</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link href="/dashboard/students" className="hover:text-[#135bec]">Students</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="font-bold text-slate-900">{student.StudentName}</span>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="size-24 rounded-full bg-blue-50 border-4 border-slate-50 flex items-center justify-center text-[#135bec] text-3xl font-bold">
              AJ
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-900">{student.StudentName}</h1>
              <p className="text-slate-500 font-medium">Enrollment: {student.EnrollmentNo}</p>
              <div className="flex gap-2 mt-2 justify-center sm:justify-start">
                <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
                <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_today</span>
                  Joined {student.Created}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold hover:bg-slate-50">
              <span className="material-symbols-outlined text-lg">edit</span> Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#135bec] text-white rounded-lg text-sm font-bold shadow-md shadow-[#135bec]/20">
              <span className="material-symbols-outlined text-lg">add</span> New Mentoring
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Student Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Student Details</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Contact Number</p>
                <p className="text-sm font-medium">{student.MobileNo}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                <p className="text-sm font-medium">{student.EmailAddress}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Description</p>
                <p className="text-sm text-slate-600 leading-relaxed">{student.Description}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-sm">Parent Information</h3>
            </div>
            <div className="p-5">
              {mentoringHistory[1].ParentName ? (
                <div className="space-y-3">
                   <p className="text-sm font-bold">{mentoringHistory[1].ParentName}</p>
                   <p className="text-xs text-slate-500">{mentoringHistory[1].ParentMobileNo}</p>
                   <div className="text-xs italic text-slate-500 bg-slate-50 p-2 rounded">
                     &quot;{mentoringHistory[1].ParentsOpinion}&quot;
                   </div>
                </div>
              ) : <p className="text-sm text-slate-400">No parent data linked.</p>}
            </div>
          </div>
        </div>

        {/* Right Column - Mentoring History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Mentoring History</h3>
              <span className="text-xs font-bold text-slate-400">{mentoringHistory.length} Sessions</span>
            </div>
            <div className="divide-y divide-gray-100">
              {mentoringHistory.map((session) => (
                <div key={session.StudentMentoringID} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="size-12 bg-blue-50 rounded-lg flex flex-col items-center justify-center text-[#135bec] border border-blue-100">
                         <span className="text-[10px] font-black uppercase leading-none">Date</span>
                         <span className="text-lg font-bold leading-none mt-1">{session.DateOfMentoring.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{session.IssuesDiscussed}</h4>
                        <p className="text-xs text-slate-500 mt-1">Learner Type: <span className="font-bold text-slate-700">{session.LearnerType || 'N/A'}</span> • Stress Level: <span className="font-bold text-slate-700">{session.StressLevel}</span></p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${session.AttendanceStatus === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {session.AttendanceStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Staff Opinion</p>
                      <p className="text-xs text-slate-600 italic">"{session.StaffOpinion}"</p>
                    </div>
                    <div className="bg-blue-50/30 p-3 rounded-lg border border-blue-100/50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Student Opinion</p>
                      <p className="text-xs text-slate-600 italic">"{session.StudentsOpinion || 'No opinion recorded'}"</p>
                    </div>
                  </div>

                  {session.NextMentoringDate && (
                    <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#135bec]">
                      <span className="material-symbols-outlined text-sm">event_repeat</span>
                      Next Mentoring Scheduled: {session.NextMentoringDate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}