import { prisma } from "@/app/lib/prisma";
import Link from "next/link";
import React from "react";
import { Users, Clock, Phone, Mail, Edit, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";

export default async function MentorProfileView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const MentorID = Number(id);
  const mentor = await prisma.mentor.findUnique({ where: { MentorID } });

  const totalStudentsUnderMentor = MentorID
    ? await prisma.studentmentor.count({ where: { MentorID } })
    : 0;

  const pendingstudents = MentorID
    ? await prisma.studentmentor.count({
        where: { MentorID, studentmentoring: { none: {} } },
      })
    : 0;

  const studentslist = MentorID
    ? await prisma.studentmentor.findMany({
        where: { MentorID },
        include: {
          student: true,
          studentmentoring: { orderBy: { DateOfMentoring: "desc" } },
        },
      })
    : [];

  const getInitials = (name: string) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "M";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="size-24 rounded-2xl text-3xl">
              <AvatarFallback className="rounded-2xl text-3xl font-bold bg-primary text-primary-foreground">
                {getInitials(mentor?.MentorName ?? "")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center gap-3 mb-1 justify-center md:justify-start">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {mentor?.MentorName}
                </h1>
                <Link href={`/admin/mentors/${mentor?.MentorID}/edit`}>
                  <Button variant="ghost" size="icon" className="size-8">
                    <Edit className="size-4" />
                  </Button>
                </Link>
              </div>
              <p className="text-muted-foreground text-lg font-medium mb-4">
                {mentor?.Department?.toUpperCase()}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" />
                  <span className="font-semibold text-foreground">Mobile:</span>{" "}
                  {mentor?.MobileNo}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-4" />
                  <span className="font-semibold text-foreground">Email:</span>{" "}
                  {mentor?.EmailAddress}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="size-12 rounded-full bg-muted flex items-center justify-center text-foreground">
              <Users className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Students</p>
              <h2 className="text-2xl font-bold text-foreground">{totalStudentsUnderMentor}</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="size-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Pending Students</p>
              <h2 className="text-2xl font-bold text-amber-600">{pendingstudents}</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="size-5" />
            Students Under {mentor?.MentorName?.split(" ")[0] ?? "Mentor"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {studentslist.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No students assigned to this mentor
              </div>
            )}

            {studentslist.map((row: any) => {
              const student = row.student;
              const lastSession = row.studentmentoring?.[0];
              const isPending = !lastSession;

              const initials = student.StudentName?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <div
                  key={row.StudentMentorID}
                  className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="size-10">
                      <AvatarFallback className="text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-foreground">{student.StudentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {student.Department} • Sem {student.CurrentSem}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block text-right">
                      <Badge variant={isPending ? "outline" : "secondary"} className={isPending ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-green-100 text-green-700 border-green-200"}>
                        {isPending ? "Pending" : "Completed"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                        ENR: {student.EnrollmentNo}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
