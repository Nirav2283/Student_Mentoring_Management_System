import React from 'react';
import Link from 'next/link';
import { getSessionUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { Calendar, CheckCircle2, TrendingUp, Eye, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/app/components/ui/table';

export default async function MentoringHistoryPage() {
  const sessionUser = await getSessionUser();

  const mentoringData = await prisma.studentmentor.findMany({
    where: { student: { UserID: sessionUser?.UserID } },
    include: {
      mentor: true,
      studentmentoring: { orderBy: { DateOfMentoring: 'desc' } },
    },
  });

  const sessions = mentoringData.flatMap(md =>
    md.studentmentoring.map(s => ({
      ...s,
      mentorName: md.mentor.MentorName,
      mentorInitials: md.mentor.MentorName
        .trim().split(" ").map((n) => n[0]).filter(Boolean).join("").toUpperCase().substring(0, 2),
    }))
  ).sort((a, b) => {
    const dateA = a.DateOfMentoring ? new Date(a.DateOfMentoring).getTime() : 0;
    const dateB = b.DateOfMentoring ? new Date(b.DateOfMentoring).getTime() : 0;
    return dateB - dateA;
  });

  const totalSessions = sessions.length;
  const presentSessions = sessions.filter(s => s.AttendanceStatus === 'PRESENT').length;
  const attendanceRate = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 0;

  const latestLearnerType = sessions[0]?.LearnerType || 'AVERAGE';
  const performanceMap: Record<string, string> = {
    'FAST': 'Excellent', 'AVERAGE': 'Average', 'SLOW': 'Needs Improvement', 'ADVANCED': 'Superior'
  };
  const performance = performanceMap[latestLearnerType] || 'Average';

  const formatDate = (date: Date | null) => {
    if (!date) return "TBA";
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-foreground text-3xl font-black tracking-tight">Mentoring History</h2>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Review your past mentoring sessions, track attendance, and monitor your progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="size-12 rounded-lg bg-muted text-primary flex items-center justify-center">
              <Calendar className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Sessions</p>
              <p className="text-xl font-black text-foreground">{totalSessions}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="size-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Attendance Rate</p>
              <p className="text-xl font-black text-foreground">{attendanceRate}%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="size-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Performance</p>
              <p className="text-xl font-black text-foreground">{performance}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Date</TableHead>
              <TableHead>Mentor</TableHead>
              <TableHead>Agenda</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <TableRow key={session.StudentMentoringID} className="group">
                  <TableCell className="font-bold text-foreground">{formatDate(session.DateOfMentoring)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-[11px] font-bold">{session.mentorInitials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">{session.mentorName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground font-medium">{session.MentoringMeetingAgenda || "Initial Meeting"}</TableCell>
                  <TableCell>
                    <Badge variant={session.AttendanceStatus === 'PRESENT' ? "secondary" : "destructive"}
                      className={session.AttendanceStatus === 'PRESENT' ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}>
                      {session.AttendanceStatus === 'PRESENT' ? 'Present' : 'Absent'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {session.AttendanceStatus === 'PRESENT' && (
                        session.StudentsOpinion ? (
                          <Button variant="ghost" size="sm" disabled className="text-xs">
                            <CheckCircle2 className="size-4 mr-1" /> Feedback Given
                          </Button>
                        ) : (
                          <Link href={`/student/mentoringhistory/feedback/${session.StudentMentoringID}`}>
                            <Button size="sm" className="text-xs">
                              <MessageSquare className="size-4 mr-1" /> Give Feedback
                            </Button>
                          </Link>
                        )
                      )}
                      <Link href={`/student/mentoringhistory/${session.StudentMentoringID}`}>
                        <Button variant="ghost" size="icon" title="View Session Details">
                          <Eye className="size-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-medium">
                  No mentoring sessions found in your history.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{sessions.length > 0 ? 1 : 0}</span> to <span className="font-bold text-foreground">{sessions.length}</span> of <span className="font-bold text-foreground">{sessions.length}</span> sessions
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="size-9" disabled>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-primary bg-muted text-primary font-bold">1</Button>
            <Button variant="outline" size="icon" className="size-9" disabled>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
