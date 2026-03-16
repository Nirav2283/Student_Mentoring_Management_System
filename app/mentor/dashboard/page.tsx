import React from "react";
import Link from "next/link";
import { Users, Calendar, TrendingUp } from "lucide-react";
import { getSessionUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/app/components/ui/table";

const StatCard = ({ label, value, trend, isAlert = false }: any) => (
  <Card className="hover:shadow-md transition-all">
    <CardContent className="p-6 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="p-2 rounded-lg bg-muted">
          <TrendingUp className="size-4 text-foreground" />
        </div>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
      {trend && (
        <p className={`text-sm font-medium ${isAlert ? "text-destructive" : "text-emerald-600"}`}>
          {trend}
        </p>
      )}
    </CardContent>
  </Card>
);

const MentorshipDashboard = async () => {
  const sessionUser = await getSessionUser();
  const mentor = await prisma.mentor.findFirst({ where: { UserID: sessionUser?.UserID } });

  if (!mentor) return <div>Mentor not found</div>;

  const activeStudentMentors = await prisma.studentmentor.findMany({
    where: {
      MentorID: mentor.MentorID,
      OR: [{ ToDate: null }, { ToDate: { gt: new Date() } }],
    },
    include: {
      student: true,
      studentmentoring: { orderBy: { CreatedAt: "desc" } },
    },
  });

  const now = new Date();
  const upcomingList = activeStudentMentors.filter((sm) => {
    const lastSession = sm.studentmentoring[0];
    return !lastSession || (lastSession.NextMentoringDate && lastSession.NextMentoringDate >= now);
  });

  const pendingList = activeStudentMentors.filter((sm) => {
    const lastSession = sm.studentmentoring[0];
    return lastSession && lastSession.AttendanceStatus === "ABSENT";
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">
            Welcome back, {mentor.MentorName}
          </h1>
          <p className="text-muted-foreground mt-1">Summary of mentoring activity.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Students" value={activeStudentMentors.length} />
        <StatCard label="Upcoming Meetings" value={upcomingList.length} />
        <StatCard label="Pending Mentoring" value={pendingList.length}
          trend={pendingList.length > 0 ? "Requires attention" : "Everything clear"}
          isAlert={pendingList.length > 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-foreground" />
              Upcoming Mentoring
            </CardTitle>
            <Link href="/mentor/students" className="text-sm text-muted-foreground font-semibold hover:text-foreground">
              View All
            </Link>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Status</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingList.length > 0 ? upcomingList.map((sm) => {
                const lastSession = sm.studentmentoring[0];
                const dateText = lastSession?.NextMentoringDate
                  ? new Date(lastSession.NextMentoringDate).toLocaleDateString() : "Never Mentored";
                return (
                  <TableRow key={sm.StudentMentorID}>
                    <TableCell className="text-sm font-medium">{dateText}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs">
                            {sm.student.StudentName.split(" ").map((n: string) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{sm.student.StudentName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">Upcoming</Badge>
                    </TableCell>
                  </TableRow>
                );
              }) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10 text-muted-foreground italic">
                    No upcoming students
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Pending Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5 text-foreground" />
              Pending Students
            </CardTitle>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Student Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingList.length > 0 ? pendingList.map((sm) => (
                <TableRow key={sm.StudentMentorID}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">
                          {sm.student.StudentName.split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{sm.student.StudentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive">Absent in last session</Badge>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-10 text-muted-foreground italic">
                    No pending students
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default MentorshipDashboard;