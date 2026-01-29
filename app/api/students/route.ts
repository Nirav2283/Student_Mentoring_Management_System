import { generatePassword } from "@/app/lib/generatepassword";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { users_Role } from "@/app/generated/prisma/client";
import { sendStudentEmail } from "@/app/lib/studentmail";
import { revalidatePath } from "next/cache";

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
      CollegeID,
      Department,
    } = body;

    const password = generatePassword();
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        Name: StudentName,
        Email: EmailAddress,
        PasswordHash: hashedpassword,
        Role: users_Role.STUDENT,
        CollegeID: CollegeID,
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
