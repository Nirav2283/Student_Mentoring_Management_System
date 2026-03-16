import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    try {
        const student = await prisma.student.findUnique({
            where: { StudentID: Number(id) },
        });

        if (!student) {
            return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, student });
    } catch (err) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
