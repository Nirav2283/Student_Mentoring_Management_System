import { generatePassword } from "@/app/lib/generatepassword";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { users_Role } from "@/app/generated/prisma/client";
import { sendStudentEmail } from "@/app/lib/studentmail";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      StudentName,
      EnrollmentNo,
      EmailAddress,
      Description,
      CurrentSem,
      MobileNo,
      Department,
    } = body;

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

    const CollegeID = body.CollegeID || session.users.CollegeID;

    if (!CollegeID) {
      return NextResponse.json(
        { success: false, message: "CollegeID is missing" },
        { status: 400 },
      );
    }

    const password = generatePassword();
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        Name: StudentName,
        Email: EmailAddress,
        PasswordHash: hashedpassword,
        Role: users_Role.STUDENT,
        CollegeID,
        EmailVerified: true,
      },
    });

    const student = await prisma.student.create({
      data: {
        UserID: user.UserID,
        CollegeID,
        StudentName,
        EnrollmentNo,
        EmailAddress,
        Department,
        CurrentSem,
        MobileNo,
        Description,
      },
    });

    try {
      await sendStudentEmail(StudentName, password, EmailAddress);
    } catch (mailError) {
      console.error("Email service failed:", mailError);
    }

    revalidatePath("/admin/students");
    revalidatePath("/admin/dashboard");

    return NextResponse.json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to add student" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Working" });
}
