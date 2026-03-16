import React from "react";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { ArrowLeft, Calendar, UserCheck, UserX, Rocket, FileText, MessageCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

export default async function MentoringSessionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sessionId = parseInt(id);

  if (isNaN(sessionId)) {
    return <div>Invalid Session ID</div>;
  }

  const session = await prisma.studentmentoring.findUnique({
    where: { StudentMentoringID: sessionId },
    include: { studentmentor: { include: { student: true, mentor: true } } },
  });

  if (!session) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Session Not Found</h2>
          <p className="text-muted-foreground">The mentoring session you are looking for does not exist.</p>
          <Link href="/student/mentoringhistory">
            <Button>Back to History</Button>
          </Link>
        </div>
      </div>
    );
  }

  const studentName = session.studentmentor.student.StudentName;
  const enrollmentNo = session.studentmentor.student.EnrollmentNo;
  const isCompleted = new Date() > new Date(session.DateOfMentoring || new Date());

  const formatDate = (date: Date | null) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back */}
        <Link href="/student/mentoringhistory">
          <Button variant="ghost" className="gap-2 text-primary hover:text-primary/90 font-bold text-sm group">
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to History
          </Button>
        </Link>

        {/* Hero Section */}
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-foreground text-3xl font-black tracking-tight">
                    Session Details: {studentName}
                  </h1>
                  <Badge variant={isCompleted ? "secondary" : "outline"}
                    className={isCompleted ? "bg-muted text-primary" : "bg-emerald-50 text-emerald-600 border-emerald-100"}>
                    {isCompleted ? "Completed" : "Upcoming"}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  Enrollment No: <span className="text-primary font-bold">{enrollmentNo}</span> •
                  Mentor: {session.studentmentor.mentor.MentorName}
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Date</p>
                  <p className="text-lg font-bold text-foreground">{formatDate(session.DateOfMentoring)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-xl flex items-center justify-center ${session.AttendanceStatus === 'PRESENT' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                  {session.AttendanceStatus === 'PRESENT' ? <UserCheck className="size-5" /> : <UserX className="size-5" />}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Attendance</p>
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${session.AttendanceStatus === 'PRESENT' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <p className="text-lg font-bold text-foreground capitalize">{session.AttendanceStatus?.toLowerCase() || 'Pending'}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Rocket className="size-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Learner Type</p>
                  <p className="text-lg font-bold text-foreground capitalize">{session.LearnerType?.toLowerCase() || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader className="bg-muted/50 flex-row items-center gap-2">
                <FileText className="size-5 text-primary" />
                <CardTitle>Session Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="text-[11px] font-black text-primary uppercase tracking-wider mb-2">Agenda</h4>
                  <p className="text-foreground text-lg font-semibold leading-snug">
                    {session.MentoringMeetingAgenda || "No agenda provided."}
                  </p>
                </div>
                <div className="pt-6 border-t border-border">
                  <h4 className="text-[11px] font-black text-primary uppercase tracking-wider mb-4">Detailed Issues Discussed</h4>
                  <div className="text-muted-foreground text-sm leading-relaxed space-y-4 font-medium whitespace-pre-wrap">
                    {session.IssuesDiscussed || "No discussion details provided."}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mentor Insight */}
            <Card>
              <CardHeader className="bg-muted/50 flex-row items-center gap-2">
                <MessageCircle className="size-5 text-primary" />
                <CardTitle>Mentor Insights</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <h4 className="text-[11px] font-black text-primary uppercase tracking-wider mb-3">
                  Staff Opinion & Remarks
                </h4>
                <div className="p-5 bg-muted rounded-xl border-l-4 border-primary">
                  <p className="text-sm text-foreground italic font-medium leading-relaxed">
                    {session.StaffOpinion ? `"${session.StaffOpinion}"` : "No remarks provided."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stress Level */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mb-6">Student State</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-bold text-foreground">Stress Level</p>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                        session.StressLevel === 'HIGH' ? 'text-red-600 bg-red-50' :
                        session.StressLevel === 'MEDIUM' ? 'text-amber-600 bg-amber-50' :
                        session.StressLevel === 'LOW' ? 'text-emerald-600 bg-emerald-50' :
                        'text-muted-foreground bg-muted'
                      }`}>
                        {session.StressLevel || 'N/A'}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${
                        session.StressLevel === 'HIGH' ? 'bg-red-500 w-[85%]' :
                        session.StressLevel === 'MEDIUM' ? 'bg-amber-400 w-[50%]' :
                        session.StressLevel === 'LOW' ? 'bg-emerald-400 w-[15%]' :
                        'bg-muted-foreground/30 w-0'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Session */}
            <div className="bg-primary p-6 rounded-2xl text-primary-foreground shadow-lg relative overflow-hidden">
              <Clock className="absolute -right-2 -top-2 size-16 opacity-10 rotate-12" />
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-80">Follow-up Session</h3>
              <div className="space-y-1">
                <p className="text-xs opacity-80">Next Date</p>
                <p className="text-2xl font-black">{formatDate(session.NextMentoringDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
