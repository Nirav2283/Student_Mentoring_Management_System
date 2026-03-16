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
      // Flatten Zod errors into a readable string for the UI
      const fieldErrors = validated.error.flatten().fieldErrors;
      const messages = Object.entries(fieldErrors)
        .map(([field, errs]) => `${field}: ${(errs as string[]).join(", ")}`)
        .join("; ");
      return NextResponse.json(
        { error: messages || "Validation failed" },
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
      // Tell the user exactly what's duplicated
      const reasons = [];
      if (exists.Email === Email) reasons.push("This email is already registered");
      if (exists.CollegeCode === CollegeCode) reasons.push("This institution code is already in use");
      return NextResponse.json(
        { error: reasons.join(". ") || "College already registered" },
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