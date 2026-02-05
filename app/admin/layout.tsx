import { getSessionUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect("/login");
  }

  if (sessionUser.Role !== "ADMIN") {
    if (sessionUser.Role === "STUDENT") {
      redirect("/student/dashboard");
    } else if (sessionUser.Role === "MENTOR") {
      redirect("/mentor/dashboard");
    } else {
      redirect("/login");
    }
  }

  const user = {
    name: sessionUser.Name,
    email: sessionUser.Email,
    collegeName: sessionUser.college?.CollegeName || "Unknown College", // Handle optional college
  };

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}
