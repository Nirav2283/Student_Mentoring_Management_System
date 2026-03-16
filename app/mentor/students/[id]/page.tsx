import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { Brain, CheckCircle, UserCheck, X, AlertCircle } from "lucide-react";

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
        orderBy: { CreatedAt: "desc" },
        include: {
          studentmentoring: {
            orderBy: { DateOfMentoring: "desc" },
          },
        },
      },
    },
  });

  // FlatMap to collect all sessions from all mentors the student has had
  const sessions = student?.studentmentor?.flatMap((sm: any) => sm.studentmentoring) ?? [];
  // Re-sort all sessions from newest to oldest
  sessions.sort((a: any, b: any) => {
    const dateA = a.DateOfMentoring ? new Date(a.DateOfMentoring).getTime() : 0;
    const dateB = b.DateOfMentoring ? new Date(b.DateOfMentoring).getTime() : 0;
    return dateB - dateA;
  });

  const latestStudentMentor = student?.studentmentor?.[0];
  const mentorId = latestStudentMentor?.MentorID;

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
    sessions[0]?.StressLevel?.toLowerCase() as 'low' | 'medium' | 'high' | undefined;

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
  }[stress || 'low'] || {
    width: "w-[0%]",
    color: "bg-muted-foreground/30",
  };

  const stressColor =
    {
      low: "bg-green-100 text-green-700",
      medium: "bg-yellow-100 text-yellow-700",
      high: "bg-red-100 text-red-700",
    }[stress || 'low'] || "bg-muted text-muted-foreground";

  let attendancePercentage = 0;
  let totalsession = sessions.length;

  if (sessions.length > 0) {
    const presentCount = sessions.filter((s: any) => s.AttendanceStatus === "PRESENT").length;
    attendancePercentage = Math.round((presentCount / totalsession) * 100);
  }

  return (
    <div className="min-h-screen p-4 md:p-8 text-foreground">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 rounded-2xl bg-primary ring-4 ring-border flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {getInitials(student?.StudentName ?? "")}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {student?.StudentName}
                    </h2>
                    {/* <Link
                      href={`/admin/students/${student?.StudentID}/edit`}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      title="Edit Profile"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </Link> */}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-muted text-primary text-xs font-semibold rounded uppercase tracking-wider">
                      {student?.studentmentor?.[0]?.studentmentoring?.[0]
                        ?.LearnerType || "N/A"}
                    </span>
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-semibold rounded uppercase tracking-wider">
                      Semester : {student?.CurrentSem}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    Department: {student?.Department}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-border">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Enrollment No
                </p>
                <p className="font-medium text-foreground">
                  {student?.EnrollmentNo}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Mobile Number
                </p>
                <p className="font-medium text-foreground">
                  {student?.MobileNo}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Email Address
                </p>
                <p className="font-medium text-foreground">
                  {student?.EmailAddress}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Current Sem
                </p>
                <p className="font-medium text-foreground">
                  {student?.CurrentSem}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Department
                </p>
                <p className="font-medium text-foreground">
                  {student?.Department}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Status
                </p>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${student?.Status ? "bg-green-500" : "bg-red-500"
                      }`}
                  ></span>

                  <span className="font-medium text-foreground">
                    {student?.Status ? "Active" : "Not Active"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Description
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {student?.Description}
              </p>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col">
            <h3 className="font-semibold mb-6 flex items-center gap-2 text-foreground text-lg">
              <Brain className="w-5 h-5 text-muted-foreground" />
              Behavioral Insights
            </h3>
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-muted-foreground font-medium">
                    Stress Level
                  </label>

                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded ${stressColor}`}
                  >
                    {stress ? stress.toUpperCase() : "N/A"}
                  </span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${stressBar.width} ${stressBar.color}`}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-2">
                  Learner Classification
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full">
                    {student?.studentmentor?.[0]?.studentmentoring?.[0]
                      ?.LearnerType || "Not Evaluated"}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg border border-border mt-auto">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                  Staff Opinion Summary
                </p>
                <p className="text-xs italic text-muted-foreground leading-relaxed">
                  "
                  {sessions[0]?.StaffOpinion || "No opinion recorded"}
                  "
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {mentor?.MentorName ?? "Not assigned"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-primary">
              {totalsession}
            </p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Total Sessions
            </p>
          </div>
          <div className="space-y-1 border-l border-border">
            <p className="text-3xl font-extrabold text-foreground">
              {attendancePercentage}%
            </p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Avg. Attendance
            </p>
          </div>
          <div className="space-y-1 border-l border-border">
            <p className="text-3xl font-extrabold text-foreground">
              {mentor?.Feedback ? mentor.Feedback.toFixed(1) : "N/A"}
            </p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Staff Rating
            </p>
          </div>
          <div className="space-y-1 border-l border-border">
            <div className={`flex items-center justify-center gap-1 ${attendancePercentage >= 75 ? "text-green-600" : "text-amber-500"}`}>
              {attendancePercentage >= 75 ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              <p className="text-xl font-extrabold text-foreground uppercase">
                {attendancePercentage >= 75 ? "On Track" : "Action Req."}
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Progress Status
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-lg text-foreground">
              Mentoring Session History
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-[0.1em]">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Agenda / Objectives</th>
                  <th className="px-6 py-4">Issues Discussed</th>
                  <th className="px-6 py-4">Parent Status</th>
                  <th className="px-6 py-4">Attendance</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border text-sm">
                {sessions.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-6 text-center text-muted-foreground"
                    >
                      No mentoring sessions found
                    </td>
                  </tr>
                )}

                {sessions.map((session: any) => (
                  <tr
                    key={session.StudentMentoringID}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-foreground">
                      {new Date(session.DateOfMentoring).toLocaleDateString()}
                    </td>

                    {/* Agenda */}
                    <td className="px-6 py-4 max-w-xs truncate text-muted-foreground font-medium">
                      {session.MentoringMeetingAgenda || "-"}
                    </td>

                    {/* Issues */}
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {session.IssuesDiscussed?.split(",").map(
                          (issue: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-muted border border-border rounded text-[10px] font-bold text-muted-foreground uppercase"
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
                          : "text-muted-foreground/50"
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

          <div className="p-4 bg-muted/50 border-t border-border flex justify-between items-center">
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
              Showing <span className="text-foreground">{sessions.length}</span>{" "}
              sessions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
