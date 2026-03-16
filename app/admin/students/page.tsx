import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import DeleteButton from "@/app/ui/DeleteButton";
import { revalidatePath } from "next/cache";
import Search from "@/app/ui/Search";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/app/components/ui/table";
import { UserPlus, Eye, Pencil, User } from "lucide-react";

async function deleteStudent(formData: FormData) {
  "use server";
  const id = Number(formData.get("studentId"));
  const student = await prisma.student.findUnique({
    where: { StudentID: id },
    select: { UserID: true },
  });
  if (student) {
    await prisma.users.delete({ where: { UserID: student.UserID } });
  }
  revalidatePath("/admin/students");
}

export default async function StudentListPage(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const token = (await cookies()).get("session")?.value;

  if (!token) redirect("/login/admin");

  const session = await prisma.usersession.findFirst({
    where: { token },
    include: { users: true },
  });

  if (!session) return <p>Unauthorized</p>;

  const CollegeID = session.users.CollegeID;

  const students = await prisma.student.findMany({
    where: {
      CollegeID,
      OR: [
        { StudentName: { contains: query } },
        { EmailAddress: { contains: query } },
        { Department: { contains: query } },
        { EnrollmentNo: { contains: query } },
        ...(isNaN(Number(query)) || query === "" ? [] : [{ StudentID: Number(query) }]),
      ],
    },
    select: {
      StudentID: true, EmailAddress: true, StudentName: true,
      Status: true, CurrentSem: true, Department: true,
      studentmentor: {
        where: { OR: [{ ToDate: null }, { ToDate: { gt: new Date() } }] },
        orderBy: { CreatedAt: "desc" },
        take: 1,
        select: { mentor: { select: { MentorName: true } } },
      },
    },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Search and Actions Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <Search placeholder="Search by name, email, or ID..." />
          </div>
          <Link href="/admin/students/add">
            <Button className="gap-2">
              <UserPlus className="size-4" />
              Add Student
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Student Details</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Mentor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.StudentID} className="group">
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{student.StudentName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-bold text-foreground">{student.StudentName}</div>
                      <div className="text-xs text-muted-foreground">{student.EmailAddress}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-foreground font-medium">{student.Department}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <User className="size-4 text-muted-foreground" />
                    {student.studentmentor[0]?.mentor?.MentorName || "Not assigned"}
                  </div>
                </TableCell>
                <TableCell>
                  {student.Status ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="warning">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/students/${student.StudentID}`}>
                      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                        <Eye className="size-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/students/${student.StudentID}/edit`}>
                      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                        <Pencil className="size-4" />
                      </Button>
                    </Link>
                    <form action={deleteStudent}>
                      <input type="hidden" name="studentId" value={student.StudentID} />
                      <DeleteButton />
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
