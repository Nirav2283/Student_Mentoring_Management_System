import React from 'react';
import Link from 'next/link';
import { prisma } from '@/app/lib/prisma';
import { getSessionUser } from '@/app/lib/auth';
import { Search, Filter, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/app/components/ui/table';

export default async function StudentListPage() {
  const session = await getSessionUser();

  const mentor = await prisma.mentor.findFirst({
    where: { UserID: session?.UserID },
  });

  const assignedStudents = await prisma.studentmentor.findMany({
    where: {
      MentorID: mentor?.MentorID,
      OR: [{ ToDate: null }, { ToDate: { gt: new Date() } }],
    },
    include: { student: true },
  });

  const getInitials = (name: string) => {
    if (!name) return "S";
    return name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase();
  };

  const students = assignedStudents.map((item) => item.student);

  return (
    <div className="min-h-screen p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Heading */}
        <header className="flex items-end justify-between mb-2">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">My Students</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor your {students.length} assigned students</p>
          </div>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <span className="text-primary font-bold">{students.length}</span>
            <span className="text-muted-foreground ml-1">Total Active</span>
          </Badge>
        </header>

        {/* Search and Actions Bar */}
        <Card>
          <CardContent className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input 
                  className="pl-10" 
                  placeholder="Search by name or enrollment number..." 
                  type="text"
                />
              </div>
              <select className="px-3 py-2.5 rounded-lg border border-border bg-card text-sm text-muted-foreground focus:ring-2 focus:ring-ring outline-none cursor-pointer">
                <option value="">All Departments</option>
                <option value="cs">Computer Science</option>
                <option value="me">Mechanical Eng</option>
              </select>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="size-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Student Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead>Student Name</TableHead>
                <TableHead>Enrollment Number</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Current Semester</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.StudentID} className="group">
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar className="size-9">
                        <AvatarFallback className="text-xs font-bold">
                          {getInitials(student.StudentName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-bold text-foreground">{student.StudentName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">
                    {student.EnrollmentNo}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.Department}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-medium">
                    {student.CurrentSem}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/mentor/students/${student.StudentID}`}>
                        <Button variant="ghost" size="icon" title="View Details">
                          <Eye className="size-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">
              Showing <span className="text-foreground">1</span> to <span className="text-foreground">{students.length}</span> of <span className="text-foreground">{students.length}</span> students
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="size-9" disabled>
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-primary text-primary bg-muted font-bold">1</Button>
              <Button variant="outline" size="icon" className="size-9">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
