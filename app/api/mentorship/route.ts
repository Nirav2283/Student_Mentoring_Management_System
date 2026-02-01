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
  return NextResponse.json({ activemappings, unassignedStudents });
}
