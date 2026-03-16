import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  const user = await prisma.users.findFirst({
    where: {
      EmailVerifyToken: token,
      EmailVerifyExpiry: {
        gt: new Date()
      }
    }
  })

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  await prisma.users.update({
    where: { UserID: user.UserID },
    data: {
      EmailVerified: true,
      EmailVerifyToken: null,
      EmailVerifyExpiry: null,
    },
  });

  return NextResponse.redirect("http://localhost:3000/login");
}