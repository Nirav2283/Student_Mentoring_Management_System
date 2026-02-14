import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  const { token, newPassword } = await req.json();
  const record = await prisma.passwordresettoken.findUnique({
    where: {
      token,
    },
  });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 },
    );
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.users.update({
    where: {
      Email: record.email,
    },
    data: {
      PasswordHash: hashed,
    },
  });

  await prisma.passwordresettoken.delete({
    where: { token },
  });

  return NextResponse.json({ message: "Password reset successful" });
}
