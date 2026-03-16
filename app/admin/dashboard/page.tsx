import { getSessionUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";
import { GraduationCap, Users, MessageSquare, UserX } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, trend, subtext }: any) => (
  <Card className="hover:shadow-md transition-all">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-muted">
          <Icon className="size-6 text-foreground" />
        </div>
        <Badge variant="success">{trend}</Badge>
      </div>
      <h3 className="text-muted-foreground text-sm font-semibold uppercase tracking-wider">
        {label}
      </h3>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <span className="text-xs text-muted-foreground font-medium">{subtext}</span>
      </div>
    </CardContent>
  </Card>
);

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const CollegeID = user.CollegeID;

  const studentCount = await prisma.student.count({ where: { CollegeID } });
  const mentorCount = await prisma.mentor.count({ where: { CollegeID } });
  const mentors = await prisma.mentor.findMany({ where: { CollegeID } });

  const sessions = await prisma.studentmentoring.count({
    where: { studentmentor: { CollegeID } },
  });

  // Fetch sessions grouped by department
  const sessionsByDeptRaw = await prisma.studentmentoring.findMany({
    where: { studentmentor: { CollegeID } },
    include: {
      studentmentor: {
        include: { mentor: { select: { Department: true } } },
      },
    },
  });

  const deptCounts: Record<string, number> = {};
  sessionsByDeptRaw.forEach((s) => {
    const dept = s.studentmentor.mentor?.Department || "General";
    deptCounts[dept] = (deptCounts[dept] || 0) + 1;
  });

  const chartData = Object.entries(deptCounts).map(([name, count]) => ({ name, count }));

  const studentsWithSessions = await prisma.student.count({
    where: {
      CollegeID,
      studentmentor: { some: { studentmentoring: { some: {} } } },
    },
  });

  const participationRate = studentCount > 0
    ? Math.round((studentsWithSessions / studentCount) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 4-Column Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard icon={GraduationCap} label="Total Students" value={studentCount} trend="+12%" subtext="active" />
        <StatCard icon={Users} label="Total Mentors" value={mentorCount} trend="+5%" subtext="verified" />
        <StatCard icon={MessageSquare} label="Total Sessions" value={sessions} trend="+24%" subtext="all time" />
      </section>

      {/* Analytics Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart: Sessions by Dept */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sessions by Department</CardTitle>
              <Badge variant="secondary" className="text-[10px]">Live Data</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-4">
              {chartData.length > 0 ? (
                chartData.map((dept, i) => {
                  const maxCount = Math.max(...chartData.map((d) => d.count), 1);
                  const barHeight = (dept.count / maxCount) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full">
                      <div className="w-full bg-muted rounded-t-lg relative h-full overflow-hidden">
                        <div
                          className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80 flex items-center justify-center"
                          style={{ height: `${barHeight}%` }}
                        >
                          {barHeight > 15 && (
                            <span className="text-[10px] font-bold text-primary-foreground mb-1">
                              {dept.count}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground truncate w-full text-center" title={dept.name}>
                        {dept.name.substring(0, 4).toUpperCase()}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm italic">
                  No session data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Engagement Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Student Participation Rate</span>
                  <span className="font-bold">{participationRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${participationRate}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / Status */}
      {mentors.length !== 0 ? (
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle>Current Mentor Status</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mentors.map((mentor) => (
                <div key={mentor.MentorID} className="px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{mentor.MentorName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold">{mentor.MentorName}</p>
                      <p className="text-xs text-muted-foreground">{mentor.Department?.toUpperCase()}</p>
                    </div>
                  </div>
                  <Badge variant="success">Available</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle>Current Mentor Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <UserX className="size-5" />
            </div>
            <p className="text-sm font-semibold text-muted-foreground">No mentor Found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
