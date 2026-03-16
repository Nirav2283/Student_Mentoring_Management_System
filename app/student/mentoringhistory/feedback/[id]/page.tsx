import React from 'react';
import Link from 'next/link';
import { prisma } from '@/app/lib/prisma';
import { ChevronRight, Calendar, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import FeedbackFormClient from './FeedbackFormClient';

export default async function SessionFeedbackPage({
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
    include: { studentmentor: { include: { mentor: true } } },
  });

  if (!session) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Session Not Found</h2>
          <Link href="/student/mentoringhistory">
            <Button>Back to History</Button>
          </Link>
        </div>
      </div>
    );
  }

  const mentorName = session.studentmentor.mentor.MentorName;
  const dateStr = session.DateOfMentoring
    ? new Date(session.DateOfMentoring).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "TBA";
  const agenda = session.MentoringMeetingAgenda || "No specific agenda provided.";

  const getInitials = (name: string) => {
    return name.replace('Dr. ', '').replace('Prof. ', '')
      .split(" ").map((n) => n[0]).filter(Boolean).join("").toUpperCase().substring(0, 2);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumbs & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest">
            <Link href="/student/mentoringhistory" className="hover:text-foreground transition">History</Link>
            <ChevronRight className="size-3" />
            <span className="text-primary">Submit Feedback</span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-foreground text-3xl font-black tracking-tight">Submit Session Feedback</h1>
            <p className="text-muted-foreground text-sm max-w-2xl font-medium">
              Your feedback helps us improve the mentoring experience and track academic progress effectively.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Session Summary Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-6">Session Summary</h3>

                <div className="flex items-center gap-4 mb-8">
                  <Avatar className="size-14">
                    <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                      {getInitials(mentorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground font-bold text-lg leading-tight">{mentorName}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                      <Calendar className="size-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Date</p>
                      <p className="text-sm font-bold text-foreground">{dateStr}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                      <MessageSquare className="size-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Agenda</p>
                      <p className="text-sm font-bold text-foreground leading-relaxed">{agenda}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Feedback Form */}
          <div className="lg:col-span-2">
            <FeedbackFormClient sessionId={sessionId} />
          </div>
        </div>
      </div>
    </div>
  );
}