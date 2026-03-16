import { prisma } from "@/app/lib/prisma";
import { getSessionUser } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { studentmentoring_AttendanceStatus, studentmentoring_LearnerType, studentmentoring_StressLevel } from "@/app/generated/prisma/client";

export async function POST(req: Request) {
    try {
        const user = await getSessionUser();

        if (!user || user.Role !== "MENTOR") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const {
            StudentMentorID,
            DateOfMentoring,
            ScheduledMeetingDate,
            IssuesDiscussed,
            MentoringMeetingAgenda,
            AttendanceStatus,
            AbsentRemarks,
            IsParentPresent,
            ParentName,
            ParentMobileNo,
            ParentsOpinion,
            LearnerType,
            StaffOpinion,
            StressLevel,
            Description,
            NextMentoringDate,
        } = body;


        if (!StudentMentorID || !DateOfMentoring || !AttendanceStatus) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }


        const mentor = await prisma.mentor.findFirst({
            where: { UserID: user.UserID },
        });

        const assignment = await prisma.studentmentor.findUnique({
            where: { StudentMentorID: Number(StudentMentorID) },
        });

        if (!assignment || assignment.MentorID !== mentor?.MentorID) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access to student assignment" },
                { status: 403 }
            );
        }

        const session = await prisma.studentmentoring.create({
            data: {
                StudentMentorID: Number(StudentMentorID),
                DateOfMentoring: new Date(DateOfMentoring),
                ScheduledMeetingDate: ScheduledMeetingDate ? new Date(ScheduledMeetingDate) : null,
                IssuesDiscussed,
                MentoringMeetingAgenda,
                AttendanceStatus: AttendanceStatus as studentmentoring_AttendanceStatus,
                AbsentRemarks,
                IsParentPresent: !!IsParentPresent,
                ParentName,
                ParentMobileNo,
                ParentsOpinion,
                LearnerType: LearnerType as studentmentoring_LearnerType,
                StaffOpinion,
                StressLevel: StressLevel as studentmentoring_StressLevel,
                Description,
                NextMentoringDate: NextMentoringDate ? new Date(NextMentoringDate) : null,
            },
        });

        return NextResponse.json({ success: true, session });
    } catch (error: any) {
        console.error("Error recording session:", error);
        return NextResponse.json(
            { success: false, message: "Failed to record session: " + error.message },
            { status: 500 }
        );
    }
}
