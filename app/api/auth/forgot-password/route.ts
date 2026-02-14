import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendResetEmail } from "@/app/lib/forgotpassmail";
export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.users.findUnique({
    where: {
      Email:email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "If email exists, link sent" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.passwordresettoken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  try {
    await sendResetEmail(email, resetLink);
  } catch (err) {
    console.error("Email service failed:", err);
  }

  return NextResponse.json({ message: "Reset link sent" });
}
