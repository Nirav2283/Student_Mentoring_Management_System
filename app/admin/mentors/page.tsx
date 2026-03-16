import React from "react";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Search from "@/app/ui/Search";
import DeleteMentorButton from "./DeleteMentorButton";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/app/components/ui/table";
import { UserPlus, Eye, Pencil, Mail, Phone } from "lucide-react";

export default async function MentorListPage(props: {
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

  const mentors = await prisma.mentor.findMany({
    where: {
      CollegeID,
      OR: [
        { MentorName: { contains: query } },
        { EmailAddress: { contains: query } },
        { Department: { contains: query } },
        ...(isNaN(Number(query)) || query === "" ? [] : [{ MentorID: Number(query) }]),
      ],
    },
    select: {
      MentorID: true, MentorName: true, Department: true,
      Education: true, EmailAddress: true, MobileNo: true, CreatedAt: true,
    },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Action Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <Search placeholder="Search by Mentor Name, ID, or Email..." />
          </div>
          <Link href="/admin/mentors/add">
            <Button className="gap-2">
              <UserPlus className="size-4" />
              Add Mentor
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Mentor Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Mentor Details</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mentors.map((mentor) => (
              <TableRow key={mentor.MentorID} className="group">
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{mentor.MentorName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-bold text-foreground">{mentor.MentorName}</div>
                      <div className="text-xs text-muted-foreground">ID: {mentor.MentorID}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-foreground font-semibold">{mentor.Department?.toUpperCase()}</div>
                  <div className="text-xs text-muted-foreground max-w-[200px] truncate" title={mentor.Education!}>
                    {mentor.Education!}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="size-3.5" />{mentor.EmailAddress}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="size-3.5" />{mentor.MobileNo}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-foreground">
                    {new Date(mentor.CreatedAt!).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`mentors/${mentor.MentorID}`}>
                      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                        <Eye className="size-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/mentors/${mentor.MentorID}/edit`}>
                      <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
                        <Pencil className="size-4" />
                      </Button>
                    </Link>
                    <DeleteMentorButton mentorId={mentor.MentorID} />
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
