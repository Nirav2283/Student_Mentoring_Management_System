import { prisma } from "@/app/lib/prisma";
import { getSessionUser } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getSessionUser();

        if (!user || user.Role !== "MENTOR") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const mentor = await prisma.mentor.findFirst({
            where: { UserID: user.UserID },
        });

        if (!mentor) {
            return NextResponse.json(
                { success: false, message: "Mentor record not found" },
                { status: 404 }
            );
        }

        const assignedStudents = await prisma.studentmentor.findMany({
            where: {
                MentorID: mentor.MentorID,
                OR: [
                    { ToDate: null },
                    { ToDate: { gt: new Date() } }
                ]
            },
            include: {
                student: true
            }
        });

        const students = assignedStudents.map(mapping => ({
            StudentID: mapping.student.StudentID,
            StudentName: mapping.student.StudentName,
            Department: mapping.student.Department,
            StudentMentorID: mapping.StudentMentorID
        }));

        return NextResponse.json({ success: true, students });
    } catch (error: any) {
        console.error("Error fetching mentor students:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch students" },
            { status: 500 }
        );
    }
}
