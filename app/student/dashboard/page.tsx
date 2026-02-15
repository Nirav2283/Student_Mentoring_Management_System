import React from "react";
import {
  Bell,
  Search,
  Mail,
  GraduationCap,
  MessageSquare,
  CalendarDays,
  Clock,
  MapPin,
  BarChart3,
  CheckCircle2,
  Brain,
  ArrowRight,
} from "lucide-react";
import { getSessionUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

const StudentDashboard = async () => {
  const sessionUser = await getSessionUser();

  const Data = await prisma.studentmentor.findFirst({
    where: {
      student: {
        UserID: sessionUser?.UserID,
      },
    },
    include: {
      mentor: true,
    },
  });

  // console.log(Data)

  const studentData = await prisma.student.findFirst({
    where: {
      UserID: sessionUser?.UserID,
    },
  });

  const mentorData = Data?.mentor ?? null;
  // const studentData = Data?.student ?? null;

  console.log(mentorData);

  const getInitials = (name?: string) => {
    if (!name) return "A";

    return name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-slate-900 text-3xl font-extrabold tracking-tight">
              Welcome back, {sessionUser?.Name.trim().split(" ")[0]}
            </h1>
            <p className="text-slate-500 text-base">
              Here's an overview of your mentoring progress.
            </p>
          </div>

          {/* <div className="flex items-center gap-4"> */}
          {/* <div className="relative group">
              <button className="p-2.5 rounded-xl bg-white text-slate-500 shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                <Bell size={20} />
              </button>
              <span className="absolute top-2 right-2 size-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </div>
            
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <Search size={18} className="text-slate-400" />
              <input 
                className="bg-transparent border-none focus:outline-none text-sm font-medium w-40 text-slate-700 placeholder:text-slate-400" 
                placeholder="Search sessions..." 
                type="text"
              />
            </div>
          </div> */}
        </header>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Mentor Profile Card */}

          <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            {mentorData ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                      Assigned Mentor
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      {mentorData?.MentorName}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium">
                      {mentorData?.Department}
                    </p>
                  </div>

                  <div className="size-22 rounded-3xl bg-slate-50 border-2 flex items-center justify-center text-4xl font-black text-blue-600">
                    {getInitials(mentorData?.MentorName)}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail size={18} />
                    <span className="text-sm font-medium">
                      {mentorData?.EmailAddress}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <GraduationCap size={18} />
                    <span className="text-sm font-medium">
                      {mentorData?.Education}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              /* 🟡 EMPTY STATE UI */
              <div className="flex flex-col items-center text-center py-8">
                <div className="size-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <GraduationCap size={32} />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Mentor not assigned yet
                </h3>

                <p className="text-sm text-slate-500 max-w-xs">
                  Your mentor will be assigned by the admin soon. Please check
                  back later.
                </p>
              </div>
            )}
          </div>

          {/* Next Session Highlight */}
          <div className="col-span-12 lg:col-span-8 bg-blue-600 text-white rounded-3xl p-8 shadow-xl shadow-blue-200 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <CalendarDays size={120} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Next Mentoring Date
                </span>
                <span className="flex size-2 rounded-full bg-blue-300 animate-pulse"></span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-4xl font-extrabold tracking-tight">
                    Oct 24, 2023
                  </h2>
                  <div className="text-blue-100/90 text-lg font-medium flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <Clock size={20} /> 02:00 PM
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={20} /> Main Library Room 202
                    </span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 max-w-sm">
                  <h4 className="text-[10px] font-bold uppercase mb-2 text-white/70">
                    Meeting Agenda
                  </h4>
                  <p className="text-sm font-medium leading-relaxed italic">
                    "Reviewing internship applications and finalizing the thesis
                    proposal for the upcoming semester."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mentoring Summary/Stats */}
          <div className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:translate-y-[-4px] transition-transform duration-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900">
                Mentoring Summary
              </h3>
              <BarChart3 className="text-blue-600" size={20} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <div className="relative flex items-center justify-center mb-3">
                  <svg className="size-20 -rotate-90">
                    <circle
                      className="text-slate-200"
                      cx="40"
                      cy="40"
                      fill="transparent"
                      r="34"
                      stroke="currentColor"
                      strokeWidth="8"
                    ></circle>
                    <circle
                      className="text-blue-600"
                      cx="40"
                      cy="40"
                      fill="transparent"
                      r="34"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray="213.6"
                      strokeDashoffset="53.4"
                    ></circle>
                  </svg>
                  <span className="absolute text-xl font-extrabold text-slate-900">
                    12
                  </span>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  Total Sessions
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                <div className="size-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Status
                </h4>
                <p
                  className={`text-[10px] font-bold uppercase tracking-tight ${
                    studentData?.Status === true
                      ? "text-emerald-600"
                      : "text-red-500"
                  }`}
                >
                  {studentData?.Status === true ? "Active" : "Inactive"}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
              <h4 className="text-[10px] font-bold text-blue-600 uppercase mb-2 flex items-center gap-2">
                <Brain size={14} /> Staff Opinion
              </h4>
              <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                "Alex is showing great initiative in project work. Consistent
                progress on core modules."
              </p>
            </div>
          </div>

          {/* Recent Updates List */}
          <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:translate-y-[-4px] transition-transform duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Recent Updates
              </h3>
              <div className="size-2 rounded-full bg-blue-500"></div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:shadow-md transition-all">
                <div className="size-10 flex-shrink-0 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center">
                  <CalendarDays size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-slate-900">
                      Meeting Confirmed
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400">
                      2H AGO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    Dr. Sarah Jenkins confirmed the session for Oct 24.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all">
                <div className="size-10 flex-shrink-0 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-slate-900">
                      Feedback Required
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400">
                      YESTERDAY
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Please rate your last session with Dr. Jenkins.
                  </p>
                </div>
              </div>
            </div>

            {/* <button className="w-full mt-6 text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 transition-colors">
              View all notifications <ArrowRight size={16} />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
