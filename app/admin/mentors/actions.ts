"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMentorAction(id: number) {
  if (!id) return { success: false, error: "Invalid ID" };

  try {
    const mentor = await prisma.mentor.findUnique({
      where: { MentorID: id },
      select: { UserID: true },
    });

    if (!mentor) return { success: false, error: "Mentor not found" };

    // Delete mentor record
    await prisma.mentor.delete({
      where: { MentorID: id },
    });

    // Delete corresponding user record
    await prisma.users.delete({
      where: { UserID: mentor.UserID },
    });

    revalidatePath("/admin/mentors");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete mentor:", error);
    return { success: false, error: "Internal server error" };
  }
}
