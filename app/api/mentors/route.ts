import { generatePassword } from "@/app/lib/generatepassword";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { users_Role } from "@/app/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      MentorName,
      MobileNo,
      EmailAddress,
      Department,
      Description,
      Education,
    } = body;

    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized: No session token" }, { status: 401 });
    }

    const session = await prisma.usersession.findUnique({
      where: { token },
      include: { users: true }
    });

    if (!session || !session.users) {
      return NextResponse.json({ success: false, message: "Unauthorized: Invalid session" }, { status: 401 });
    }


    const CollegeID = body.CollegeID || session.users.CollegeID;

    if (!CollegeID) {
      return NextResponse.json({ success: false, message: "CollegeID is missing" }, { status: 400 });
    }

    const password = generatePassword();
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(password)

    const user = await prisma.users.create({
      data: {
        Name: MentorName,
        Email: EmailAddress,
        PasswordHash: hashedpassword,
        Role: users_Role.MENTOR,
        CollegeID: CollegeID,
        EmailVerified: true,
      },
    });

    const mentor = await prisma.mentor.create({
      data: {
        UserID: user.UserID,
        CollegeID,
        MentorName,
        EmailAddress,
        Department,
        Education,
        MobileNo,
        Description,
      },
    });

    // try {
    //   await sendStudentEmail(StudentName, password, EmailAddress);
    // } catch (mailError) {
    //   console.error("Email service failed:", mailError);
    // }

    revalidatePath("/admin/mentors");
    revalidatePath("/admin/dashboard");

    return NextResponse.json({
      success: true,
      message: "mentor created successfully",
      mentor,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to add mentor: " + (err.message || "") },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Working" });
}
