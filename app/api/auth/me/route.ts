import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const token = (await cookies()).get("session")?.value;
    if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const session = await prisma.usersession.findUnique({
    where: { token },
  include: {
    users: {
      include: {
        college: true,
      },
    },
  },
  })

  if (!session || session.expiresAt < new Date()) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: session.users.UserID,
      name: session.users.Name,
      email: session.users.Email,
      role: session.users.Role,
      collegeId: session.users.CollegeID,
      collegeName : session.users.college.CollegeName
    },
  });
}