import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(
  req: Request
) {
  try {
    const { sessionId, rating, comments } = await req.json();

    if (!sessionId || typeof rating !== 'number') {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the session and its related mentor
    const session = await prisma.studentmentoring.findUnique({
      where: { StudentMentoringID: Number(sessionId) },
      include: {
        studentmentor: {
          include: {
            mentor: true
          }
        }
      }
    });

    if (!session) {
      return NextResponse.json({ message: "Session not found" }, { status: 404 });
    }

    const mentorId = session.studentmentor.MentorID;
    const currentMentorFeedback = session.studentmentor.mentor.Feedback;

    // 1. Update the studentmentoring session with the comments
    await prisma.studentmentoring.update({
      where: { StudentMentoringID: Number(sessionId) },
      data: {
        StudentsOpinion: comments || null,
      }
    });

    // 2. Calculate new average rating for mentor and update mentor record
    // Using a simple moving average: (current_rating + new_rating) / 2
    // If it's the first rating, just use the new rating
    let newAverageFeedback = rating;
    
    if (currentMentorFeedback !== null && currentMentorFeedback !== undefined) {
      newAverageFeedback = Math.round((currentMentorFeedback + rating) / 2);
    }

    await prisma.mentor.update({
      where: { MentorID: mentorId },
      data: {
        Feedback: newAverageFeedback
      }
    });

    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { message: "An error occurred while submitting feedback" },
      { status: 500 }
    );
  }
}
