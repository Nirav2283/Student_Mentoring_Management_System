import {z} from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

const CollegeSchema = z.object({
  CollegeName: z.string().min(3, "College Name required"),
  CollegeCode: z.string().min(2, "College code required"),
  Email: z.email("Valid email required"),
  Address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Too long")
    .optional(),
  Phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number too long")
    .regex(/^[0-9+\-()\s]+$/, "Invalid phone number format"),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = CollegeSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { CollegeName, CollegeCode, Address, Email, Phone } = validated.data;

    const exists = await prisma.college.findFirst({
      where: {
        OR: [{ Email }, { CollegeCode }],
      },
    });

    if (exists) {
      return NextResponse.json(
        { error: "College already registered" },
        { status: 409 }
      );
    }

    const college = await prisma.college.create({
      data: {
        CollegeName,
        CollegeCode,
        Email,
        Address,
        Phone,
      },
    });

    return NextResponse.json({
      success: true,
      college,
      
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
    return NextResponse.json({
        message:"API is working"
    })
}