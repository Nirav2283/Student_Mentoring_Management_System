import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const now = new Date();
  //   const body = await req.json();

  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: No session token" },
      { status: 401 },
    );
  }

  const session = await prisma.usersession.findUnique({
    where: { token },
    include: { users: true },
  });

  if (!session || !session.users) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Invalid session" },
      { status: 401 },
    );
  }

  const CollegeID = session.users.CollegeID;
  const activemappings = await prisma.studentmentor.findMany({
    where: {
      CollegeID,
      AND: [
        { FromDate: { lte: now } },
        {
          OR: [
            { ToDate: null },
            { ToDate: { gt: now } },
          ],
        },
      ],
    },
    include: {
      student: true,
      mentor: true,
      college: true,
    },
  });

  const unassignedStudents = await prisma.student.findMany({
    where: {
      CollegeID,
      NOT: {
        studentmentor: {
          some: {
            AND: [
              { FromDate: { lte: now } },
              {
                OR: [{ ToDate: null }, { ToDate: { gt: now } }],
              },
            ],
          },
        },
      },
    },
    include: {
      college: true,
    },
  });

  const mentors = await prisma.mentor.findMany({
    select: { MentorID: true, MentorName: true, Department: true }
  })

  return NextResponse.json({ unassignedStudents, activemappings, mentors });
}

export async function POST(req: Request) {
  try {
    const { collegeId, mentorId, studentId, fromDate, toDate, description } = await req.json();

    const parsedFromDate = new Date(fromDate);
    const parsedToDate = new Date(toDate);

    if (isNaN(parsedFromDate.getTime()) || isNaN(parsedToDate.getTime())) {
      return NextResponse.json(
        { success: false, message: "Invalid date format" },
        { status: 400 }
      );
    }

    const newAssignment = await prisma.studentmentor.create({
      data: {
        CollegeID: Number(collegeId),
        MentorID: Number(mentorId),
        StudentID: Number(studentId),
        Description: description,
        FromDate: parsedFromDate,
        ToDate: parsedToDate,
      },
    });

    return NextResponse.json({ newAssignment });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Assignment failed" }, { status: 500 });
  }
}

export async function DELETE(){
  
}