import { getSessionUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import MentorLayoutClient from "./MentorLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect("/login");
  }

  if (sessionUser.Role !== "MENTOR") {
    if (sessionUser.Role === "ADMIN") {
      redirect("/admin/dashboard");
    } else if (sessionUser.Role === "STUDENT") {
      redirect("/student/dashboard");
    } else {
      redirect("/login");
    }
  }

  const user = {
    name: sessionUser.Name,
    email: sessionUser.Email,
    role: sessionUser.Role,
    collegeName: sessionUser.college?.CollegeName || "Unknown College",
  };

  return <MentorLayoutClient user={user}>{children}</MentorLayoutClient>;
}