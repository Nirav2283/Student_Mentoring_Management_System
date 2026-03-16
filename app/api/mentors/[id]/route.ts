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
        const mentorId = Number(id);
        const body = await req.json();

        const {
            MentorName,
            MobileNo,
            EmailAddress,
            Department,
            Description,
            Education,
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

        const mentor = await prisma.mentor.findUnique({
            where: { MentorID: mentorId },
        });

        if (!mentor) {
            return NextResponse.json(
                { success: false, message: "Mentor not found" },
                { status: 404 },
            );
        }

        // Update User record first if email or name changed
        await prisma.users.update({
            where: { UserID: mentor.UserID },
            data: {
                Name: MentorName,
                Email: EmailAddress,
            },
        });

        // Update Mentor record
        const updatedMentor = await prisma.mentor.update({
            where: { MentorID: mentorId },
            data: {
                MentorName,
                EmailAddress,
                Department,
                Education,
                MobileNo,
                Description,
            },
        });

        revalidatePath("/admin/mentors");
        revalidatePath(`/admin/mentors/${mentorId}`);
        revalidatePath("/admin/dashboard");

        return NextResponse.json({
            success: true,
            message: "Mentor updated successfully",
            mentor: updatedMentor,
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { success: false, message: "Failed to update mentor: " + err.message },
            { status: 500 },
        );
    }
}
