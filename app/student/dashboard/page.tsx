import React from "react";
import {
  Mail, GraduationCap, MessageSquare, CalendarDays,
  BarChart3, CheckCircle2, Brain,
} from "lucide-react";
import { getSessionUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";

const StudentDashboard = async () => {
  const sessionUser = await getSessionUser();
  const now = new Date();

  const activeAssignment = await prisma.studentmentor.findFirst({
    where: {
      student: { UserID: sessionUser?.UserID },
      OR: [{ ToDate: null }, { ToDate: { gt: now } }],
    },
    orderBy: { CreatedAt: "desc" },
    include: { mentor: true },
  });

  const allAssignments = await prisma.studentmentor.findMany({
    where: { student: { UserID: sessionUser?.UserID } },
    select: { StudentMentorID: true },
  });

  const assignmentIds = allAssignments.map((a) => a.StudentMentorID);

  const studentData = await prisma.student.findFirst({
    where: { UserID: sessionUser?.UserID },
  });

  const mentorData = activeAssignment?.mentor ?? null;

  const sessionCount = assignmentIds.length > 0
    ? await prisma.studentmentoring.count({ where: { StudentMentorID: { in: assignmentIds } } }) : 0;

  const latestSession = assignmentIds.length > 0
    ? await prisma.studentmentoring.findFirst({
        where: { StudentMentorID: { in: assignmentIds } },
        orderBy: { DateOfMentoring: "desc" },
      }) : null;

  const displayNextDate = latestSession?.NextMentoringDate || null;
  const isFutureNextDate = displayNextDate && new Date(displayNextDate) >= new Date();
  const displayAgenda = isFutureNextDate ? "Scheduled follow-up session" : "No upcoming sessions scheduled";

  const recentSessions = assignmentIds.length > 0
    ? await prisma.studentmentoring.findMany({
        where: { StudentMentorID: { in: assignmentIds } },
        orderBy: { DateOfMentoring: "desc" },
        take: 3,
      }) : [];

  const getInitials = (name?: string) => {
    if (!name) return "A";
    return name.trim().split(" ").map((n) => n[0]).filter(Boolean).join("").toUpperCase().substring(0, 2);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
          Welcome back, {sessionUser?.Name.trim().split(" ")[0]}
        </h1>
        <p className="text-muted-foreground text-base">
          Here's an overview of your mentoring progress.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Mentor Profile Card */}
        <Card className="col-span-12 lg:col-span-4">
          <CardContent className="p-6">
            {mentorData ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">Assigned Mentor</Badge>
                    <h3 className="text-xl font-bold text-foreground">{mentorData.MentorName}</h3>
                    <p className="text-muted-foreground text-sm font-medium">{mentorData.Department}</p>
                  </div>
                  <Avatar className="size-16">
                    <AvatarFallback className="text-2xl font-black bg-primary text-primary-foreground">
                      {getInitials(mentorData.MentorName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail size={18} />
                    <span className="text-sm font-medium">{mentorData.EmailAddress}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <GraduationCap size={18} />
                    <span className="text-sm font-medium">{mentorData.Education}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-8">
                <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <GraduationCap size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Mentor not assigned yet</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Your mentor will be assigned by the admin soon. Please check back later.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Session Highlight */}
        <Card className="col-span-12 lg:col-span-8 bg-primary text-primary-foreground border-0 shadow-xl relative overflow-hidden">
          <CardContent className="p-8 relative z-10">
            <div className="absolute top-0 right-0 p-8 opacity-10 z-0">
              <CalendarDays size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-primary-foreground/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Next Mentoring Date
                </span>
                <span className="flex size-2 rounded-full bg-primary-foreground/60 animate-pulse" />
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h2 className="text-4xl font-extrabold tracking-tight">
                  {displayNextDate ? formatDate(displayNextDate) : "TBA"}
                </h2>
                <div className="bg-primary-foreground/10 backdrop-blur-md p-5 rounded-2xl border border-primary-foreground/10 max-w-sm">
                  <h4 className="text-[10px] font-bold uppercase mb-2 text-primary-foreground/70">Meeting Agenda</h4>
                  <p className="text-sm font-medium leading-relaxed italic">{displayAgenda}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mentoring Summary */}
        <Card className="col-span-12 lg:col-span-5 hover:-translate-y-1 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Mentoring Summary</CardTitle>
            <BarChart3 className="text-foreground" size={20} />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-6 rounded-2xl border border-border flex flex-col items-center text-center">
                <div className="relative flex items-center justify-center mb-3">
                  <svg className="size-20 -rotate-90">
                    <circle className="text-border" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="8" />
                    <circle className="text-primary" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="8"
                      strokeDasharray="213.6" strokeDashoffset={213.6 - (Math.min(sessionCount, 20) / 20) * 213.6} />
                  </svg>
                  <span className="absolute text-xl font-extrabold text-foreground">{sessionCount}</span>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Total Sessions</p>
              </div>

              <div className="bg-muted p-6 rounded-2xl border border-border flex flex-col items-center justify-center">
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">Status</h4>
                <p className={`text-[10px] font-bold uppercase tracking-tight ${studentData?.Status ? "text-emerald-600" : "text-destructive"}`}>
                  {studentData?.Status ? "Active" : "Inactive"}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-muted/50 border border-border">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase mb-2 flex items-center gap-2">
                <Brain size={14} /> Staff Opinion
              </h4>
              <p className="text-sm font-medium text-foreground leading-relaxed italic">
                {latestSession?.StaffOpinion ? `"${latestSession.StaffOpinion}"` : "No staff feedback recorded yet."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card className="col-span-12 lg:col-span-7 hover:-translate-y-1 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Updates</CardTitle>
            <div className="size-2 rounded-full bg-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.length > 0 ? (
                recentSessions.map((session, index) => (
                  <div key={session.StudentMentoringID} className={`flex gap-4 p-4 rounded-2xl border hover:shadow-md transition-all ${index === 0 ? "bg-primary/5 border-primary/20" : "bg-muted border-border"}`}>
                    <div className={`size-10 flex-shrink-0 rounded-full flex items-center justify-center ${index === 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {index === 0 ? <CalendarDays size={18} /> : <MessageSquare size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-foreground">
                          {index === 0 ? "Latest Session" : `Session on ${formatDate(session.DateOfMentoring)}`}
                        </h4>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">
                          {formatDate(session.DateOfMentoring)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium mt-1 line-clamp-2">
                        {session.IssuesDiscussed || "Discussion details not recorded."}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MessageSquare className="text-muted-foreground" size={32} />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">No recent updates available.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
