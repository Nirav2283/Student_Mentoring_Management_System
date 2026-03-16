import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const studentId = Number(id);
        const body = await req.json();

        const {
            StudentName,
            EnrollmentNo,
            EmailAddress,
            Description,
            CurrentSem,
            MobileNo,
            Department,
        } = body;

        const cookieStore = await cookies();
        const token = cookieStore.get("session")?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: No session token" },
                { status: 401 },
            );
        }

        const session = await prisma.usersession.findUnique({
            where: { token },
            include: { users: true },
        });

        if (!session || !session.users || session.users.Role !== "ADMIN") {
            return NextResponse.json(
                { success: false, message: "Unauthorized: Invalid session or insufficient permissions" },
                { status: 401 },
            );
        }

        const student = await prisma.student.findUnique({
            where: { StudentID: studentId },
        });

        if (!student) {
            return NextResponse.json(
                { success: false, message: "Student not found" },
                { status: 404 },
            );
        }

        // Update User record first if email or name changed
        await prisma.users.update({
            where: { UserID: student.UserID },
            data: {
                Name: StudentName,
                Email: EmailAddress,
            },
        });

        // Update Student record
        const updatedStudent = await prisma.student.update({
            where: { StudentID: studentId },
            data: {
                StudentName,
                EnrollmentNo,
                EmailAddress,
                Department,
                CurrentSem: Number(CurrentSem),
                MobileNo,
                Description,
            },
        });

        revalidatePath("/admin/students");
        revalidatePath(`/admin/students/${studentId}`);
        revalidatePath("/admin/dashboard");

        return NextResponse.json({
            success: true,
            message: "Student updated successfully",
            student: updatedStudent,
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Failed to update student: " + err.message },
            { status: 500 },
        );
    }
}
