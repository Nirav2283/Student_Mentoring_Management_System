import { getSessionUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import StudentLayoutClient from "./StudentLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect("/login");
  }

  if (sessionUser.Role !== "STUDENT") {
    if (sessionUser.Role === "ADMIN") {
      redirect("/admin/dashboard");
    } else if (sessionUser.Role === "MENTOR") {
      redirect("/mentor/dashboard");
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

  return <StudentLayoutClient user={user}>{children}</StudentLayoutClient>;
}
