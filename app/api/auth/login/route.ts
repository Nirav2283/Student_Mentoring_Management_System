import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { Email, Password,Role } = await req.json();

    if (!Email || !Password || !Role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.users.findFirst({
      where: {
        Email,
        Role: Role.toUpperCase(),
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(Password, user.PasswordHash);

    if (!isMatch) {
      return NextResponse.json({ error: "Username or Password is incorrect" }, { status: 401 });
    }

    return NextResponse.json({ success: true , user},);

  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({message:"API is working"})
}
