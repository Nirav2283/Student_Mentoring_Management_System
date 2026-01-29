import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { Email, Password, Role } = await req.json();

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
      return NextResponse.json(
        { error: "Username or Password is incorrect" },
        { status: 401 },
      );
    }

    const sessionToken = crypto.randomUUID();

    await prisma.usersession.create({
      data: {
        token: sessionToken,
        userId: user.UserID,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
    (await cookies()).set("session", sessionToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    if (!user.EmailVerified) {
      return NextResponse.json(
        { error: "Please verify your email before login" },
        { status: 403 },
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err:any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "API is working" });
}
