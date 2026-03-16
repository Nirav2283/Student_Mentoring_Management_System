import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import { Brain, CheckCircle, UserCheck, AlertCircle, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/app/components/ui/table";

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
        include: { studentmentoring: { orderBy: { DateOfMentoring: "desc" } } },
      },
    },
  });

  const sessions = student?.studentmentor?.flatMap((sm: any) => sm.studentmentoring) ?? [];
  sessions.sort((a: any, b: any) => {
    const dateA = a.DateOfMentoring ? new Date(a.DateOfMentoring).getTime() : 0;
    const dateB = b.DateOfMentoring ? new Date(b.DateOfMentoring).getTime() : 0;
    return dateB - dateA;
  });

  const latestStudentMentor = student?.studentmentor?.[0];
  const mentorId = latestStudentMentor?.MentorID;
  let mentor = null;
  if (mentorId) {
    mentor = await prisma.mentor.findUnique({ where: { MentorID: mentorId } });
  }

  const getInitials = (name = "") => {
    const words = name.trim().split(/\s+/);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
  };

  const stress = sessions[0]?.StressLevel?.toLowerCase() as 'low' | 'medium' | 'high' | undefined;
  const stressBar = {
    low: { width: "w-[30%]", color: "bg-green-500" },
    medium: { width: "w-[65%]", color: "bg-yellow-500" },
    high: { width: "w-[90%]", color: "bg-red-500" },
  }[stress || 'low'] || { width: "w-[0%]", color: "bg-muted-foreground/30" };

  const stressColor = {
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
    <div className="space-y-6 animate-fade-in">
      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-5">
                <Avatar className="size-24 rounded-2xl">
                  <AvatarFallback className="rounded-2xl text-3xl font-bold bg-primary text-primary-foreground">
                    {getInitials(student?.StudentName ?? "")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                      {student?.StudentName}
                    </h2>
                    <Link href={`/admin/students/${student?.StudentID}/edit`}>
                      <Button variant="ghost" size="icon" className="size-8">
                        <Edit className="size-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">
                      {student?.studentmentor?.[0]?.studentmentoring?.[0]?.LearnerType || "N/A"}
                    </Badge>
                    <Badge variant="outline">Semester: {student?.CurrentSem}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    Department: {student?.Department}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-border">
              {[
                { label: "Enrollment No", value: student?.EnrollmentNo },
                { label: "Mobile Number", value: student?.MobileNo },
                { label: "Email Address", value: student?.EmailAddress },
                { label: "Current Sem", value: student?.CurrentSem },
                { label: "Department", value: student?.Department },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${student?.Status ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="font-medium text-foreground">{student?.Status ? "Active" : "Not Active"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{student?.Description}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardContent className="p-6 flex-1">
            <h3 className="font-semibold mb-6 flex items-center gap-2 text-foreground text-lg">
              <Brain className="size-5 text-muted-foreground" /> Behavioral Insights
            </h3>
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-muted-foreground font-medium">Stress Level</label>
                  <span className={`px-2 py-0.5 text-xs font-bold rounded ${stressColor}`}>
                    {stress ? stress.toUpperCase() : "N/A"}
                  </span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${stressBar.width} ${stressBar.color}`} />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-2">Learner Classification</p>
                <Badge variant="secondary">
                  {student?.studentmentor?.[0]?.studentmentoring?.[0]?.LearnerType || "Not Evaluated"}
                </Badge>
              </div>
              <div className="p-4 bg-muted rounded-lg border border-border mt-auto">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Staff Opinion Summary</p>
                <p className="text-xs italic text-muted-foreground leading-relaxed">
                  "{sessions[0]?.StaffOpinion || "No opinion recorded"}"
                </p>
                <div className="mt-4">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {mentor?.MentorName ?? "Not assigned"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Bar */}
      <Card>
        <CardContent className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-primary">{totalsession}</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Total Sessions</p>
          </div>
          <div className="space-y-1 border-l border-border">
            <p className="text-3xl font-extrabold text-foreground">{attendancePercentage}%</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Avg. Attendance</p>
          </div>
          <div className="space-y-1 border-l border-border">
            <p className="text-3xl font-extrabold text-foreground">{mentor?.Feedback ? mentor.Feedback.toFixed(1) : "N/A"}</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Staff Rating</p>
          </div>
          <div className="space-y-1 border-l border-border">
            <div className={`flex items-center justify-center gap-1 ${attendancePercentage >= 75 ? "text-green-600" : "text-amber-500"}`}>
              {attendancePercentage >= 75 ? <CheckCircle className="size-6" /> : <AlertCircle className="size-6" />}
              <p className="text-xl font-extrabold text-foreground uppercase">
                {attendancePercentage >= 75 ? "On Track" : "Action Req."}
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Progress Status</p>
          </div>
        </CardContent>
      </Card>

      {/* Session History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mentoring Session History</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Date</TableHead>
              <TableHead>Agenda / Objectives</TableHead>
              <TableHead>Issues Discussed</TableHead>
              <TableHead>Parent Status</TableHead>
              <TableHead>Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No mentoring sessions found
                </TableCell>
              </TableRow>
            )}
            {sessions.map((session: any) => (
              <TableRow key={session.StudentMentoringID}>
                <TableCell className="whitespace-nowrap font-semibold text-foreground">
                  {new Date(session.DateOfMentoring).toLocaleDateString()}
                </TableCell>
                <TableCell className="max-w-xs truncate text-muted-foreground font-medium">
                  {session.MentoringMeetingAgenda || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5 flex-wrap">
                    {session.IssuesDiscussed?.split(",").map((issue: string, i: number) => (
                      <Badge key={i} variant="outline" className="text-[10px]">{issue.trim()}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1.5 font-bold text-xs ${session.IsParentPresent ? "text-green-600" : "text-muted-foreground/50"}`}>
                    <UserCheck size={14} />
                    {session.IsParentPresent ? "YES" : "NO"}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={session.AttendanceStatus === "PRESENT" ? "secondary" : "destructive"}
                    className={session.AttendanceStatus === "PRESENT" ? "bg-green-100 text-green-700" : ""}>
                    {session.AttendanceStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 bg-muted/50 border-t border-border flex justify-between items-center">
          <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
            Showing <span className="text-foreground">{sessions.length}</span> sessions
          </p>
        </div>
      </Card>
    </div>
  );
}
