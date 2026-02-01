import { prisma } from "@/app/lib/prisma";
import { Brain, CheckCircle, UserCheck, X } from "lucide-react";

export default async function StudentProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const StudentID = Number(id);
  const student = await prisma.student.findUnique({
    where: { StudentID },
    include: {
      studentmentor: {
        take: 1,
        orderBy: { CreatedAt: "desc" },
        include: {
          studentmentoring: {
            orderBy: { DateOfMentoring: "desc" },
          },
        },
      },
    },
  });

  const sessions = student?.studentmentor?.[0]?.studentmentoring ?? [];

  console.log(sessions);

  // console.log(student?.studentmentor?.[0].studentmentoring?.[0].LearnerType);

  const mentorId = student?.studentmentor?.[0]?.MentorID;

  let mentor = null;

  if (mentorId) {
    mentor = await prisma.mentor.findUnique({
      where: { MentorID: mentorId },
    });
  }

  const getInitials = (name = "") => {
    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
  };

  const stress =
    student?.studentmentor?.[0]?.studentmentoring?.[0]?.StressLevel?.toLowerCase();

  const stressBar = {
    low: {
      width: "w-[30%]",
      color: "bg-green-500",
    },
    medium: {
      width: "w-[65%]",
      color: "bg-yellow-500",
    },
    high: {
      width: "w-[90%]",
      color: "bg-red-500",
    },
  }[stress!] || {
    width: "w-[0%]",
    color: "bg-slate-300",
  };

  const stressColor =
    {
      low: "bg-green-100 text-green-700",
      medium: "bg-yellow-100 text-yellow-700",
      high: "bg-red-100 text-red-700",
    }[stress!] || "bg-slate-100 text-slate-500";

  const studentMentorId = student?.studentmentor?.[0]?.StudentMentorID;

  let attendancePercentage = 0;

  if (studentMentorId) {
    const attendanceStats = await prisma.studentmentoring.groupBy({
      by: ["AttendanceStatus"],
      where: {
        StudentMentorID: studentMentorId,
      },
      _count: {
        AttendanceStatus: true,
      },
    });

    const presentCount =
      attendanceStats.find((a) => a.AttendanceStatus === "PRESENT")?._count
        .AttendanceStatus || 0;

    const absentCount =
      attendanceStats.find((a) => a.AttendanceStatus === "ABSENT")?._count
        .AttendanceStatus || 0;

    const total = presentCount + absentCount;

    attendancePercentage =
      total > 0 ? Math.round((presentCount / total) * 100) : 0;
  }

  let totalsession = 0;

  if (studentMentorId) {
    totalsession = await prisma.studentmentoring.count({
      where: {
        StudentMentorID: studentMentorId,
      },
    });
  }

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 rounded-2xl bg-indigo-600 ring-4 ring-slate-100 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {getInitials(student?.StudentName ?? "")}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    {student?.StudentName}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded uppercase tracking-wider">
                      {student?.studentmentor?.[0]?.studentmentoring?.[0]
                        ?.LearnerType || "N/A"}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded uppercase tracking-wider">
                      Semester : {student?.CurrentSem}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                    <span className="material-icons-outlined text-base">
                      Department:{" "}
                    </span>
                    <span>{student?.Department}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-slate-100">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Enrollment No
                </p>
                <p className="font-medium text-slate-900">
                  {student?.EnrollmentNo}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Mobile Number
                </p>
                <p className="font-medium text-slate-900">
                  {student?.MobileNo}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Email Address
                </p>
                <p className="font-medium text-slate-900">
                  {student?.EmailAddress}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Current Sem
                </p>
                <p className="font-medium text-slate-900">
                  {student?.CurrentSem}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Department
                </p>
                <p className="font-medium text-slate-900">
                  {student?.Department}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Status
                </p>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${student?.Status ? "bg-green-500" : "bg-red-500"
                      }`}
                  ></span>

                  <span className="font-medium text-slate-900">
                    {student?.Status ? "Active" : "Not Active"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Description
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {student?.Description}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <h3 className="font-semibold mb-6 flex items-center gap-2 text-slate-900 text-lg">
              <Brain className="w-5 h-5 text-slate-400" />
              Behavioral Insights
            </h3>
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-slate-500 font-medium">
                    Stress Level
                  </label>

                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded ${stressColor}`}
                  >
                    {stress ? stress.toUpperCase() : "N/A"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${stressBar.width} ${stressBar.color}`}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium mb-2">
                  Learner Classification
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">
                    {student?.studentmentor?.[0]?.studentmentoring?.[0]
                      ?.LearnerType || "Not Evaluated"}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 mt-auto">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Staff Opinion Summary
                </p>
                <p className="text-xs italic text-slate-600 leading-relaxed">
                  "
                  {student?.studentmentor?.[0]?.studentmentoring?.[0]
                    ?.StaffOpinion || "No opinion recorded"}
                  "
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[11px] font-medium text-slate-500">
                    {mentor?.MentorName ?? "Not assigned"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-indigo-600">
              {totalsession}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Total Sessions
            </p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl font-extrabold text-slate-900">
              {attendancePercentage}%
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Avg. Attendance
            </p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl font-extrabold text-slate-900">4.8</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Staff Rating
            </p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <div className="flex items-center justify-center gap-1 text-green-600">
              <CheckCircle className="w-6 h-6" />
              <p className="text-xl font-extrabold text-slate-900 uppercase">
                On Track
              </p>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Progress Status
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-900">
              Mentoring Session History
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.1em]">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Agenda / Objectives</th>
                  <th className="px-6 py-4">Issues Discussed</th>
                  <th className="px-6 py-4">Parent Status</th>
                  <th className="px-6 py-4">Attendance</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50 text-sm">
                {sessions.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-6 text-center text-slate-400"
                    >
                      No mentoring sessions found
                    </td>
                  </tr>
                )}

                {sessions.map((session: any) => (
                  <tr
                    key={session.StudentMentoringID}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900">
                      {new Date(session.DateOfMentoring).toLocaleDateString()}
                    </td>

                    {/* Agenda */}
                    <td className="px-6 py-4 max-w-xs truncate text-slate-500 font-medium">
                      {session.MentoringMeetingAgenda || "-"}
                    </td>

                    {/* Issues */}
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {session.IssuesDiscussed?.split(",").map(
                          (issue: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase"
                            >
                              {issue.trim()}
                            </span>
                          ),
                        )}
                      </div>
                    </td>

                    {/* Parent Status */}
                    <td className="px-6 py-4">
                      <div
                        className={`flex items-center gap-1.5 font-bold text-xs ${session.IsParentPresent
                            ? "text-green-600"
                            : "text-slate-300"
                          }`}
                      >
                        <UserCheck size={14} />
                        {session.IsParentPresent ? "YES" : "NO"}
                      </div>
                    </td>

                    {/* Attendance */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${session.AttendanceStatus === "PRESENT"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {session.AttendanceStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Showing <span className="text-slate-900">{sessions.length}</span>{" "}
              sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
