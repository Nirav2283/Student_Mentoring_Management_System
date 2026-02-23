import React from "react";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import Search from "@/app/ui/Search";

async function deleteMentor(formData: FormData) {
  "use server";

  const id = Number(formData.get("mentorId"));

  if (!id) return;

  const mentor = await prisma.mentor.findUnique({
    where: { MentorID: id },
    select: { UserID: true },
  });

  if (!mentor) return;


  await prisma.mentor.delete({
    where: { MentorID: id },
  });

  await prisma.users.delete({
    where: { UserID: mentor.UserID },
  });

  revalidatePath("/admin/mentors");
}

export default async function MentorListPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const token = (await cookies()).get("session")?.value;

  if (!token) {
    redirect("/login/admin");
  }
  const session = await prisma.usersession.findFirst({
    where: {
      token,
    },
    include: {
      users: true,
    },
  });

  if (!session) {
    return <p>Unauthorized</p>;
  }

  const CollegeID = session.users.CollegeID;

  const mentors = await prisma.mentor.findMany({
    where: {
      CollegeID,
      OR: [
        { MentorName: { contains: query } },
        { EmailAddress: { contains: query } },
        { Department: { contains: query } },
        ...(isNaN(Number(query)) || query === "" ? [] : [{ MentorID: Number(query) }]),
      ]
    },
    select: {
      MentorID: true,
      MentorName: true,
      Department: true,
      Education: true,
      EmailAddress: true,
      MobileNo: true,
      CreatedAt: true,
    },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Search placeholder="Search by Mentor Name, ID, or Email..." />
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>
            <span className="hidden sm:inline">Export List</span>
          </button>
          <Link
            href="/admin/mentors/add"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#135bec] hover:bg-blue-700 text-white transition-all text-sm font-bold shadow-md shadow-[#135bec]/25"
          >
            <span className="material-symbols-outlined text-[20px]">
              person_add
            </span>
            <span>Add Mentor</span>
          </Link>
        </div>
      </div>

      {/* Mentor Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Mentor Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mentors.map((mentor) => (
                <tr
                  key={mentor.MentorID}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-blue-50 text-[#135bec] flex items-center justify-center font-bold text-sm border border-blue-100">
                        {mentor.MentorName[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {mentor.MentorName}
                        </div>
                        <div className="text-xs text-slate-500">
                          ID: {mentor.MentorID}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 font-semibold">
                      {mentor.Department?.toUpperCase()}
                    </div>
                    <div
                      className="text-xs text-slate-400 max-w-[200px] truncate"
                      title={mentor.Education!}
                    >
                      {mentor.Education!}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="material-symbols-outlined text-sm text-slate-400">
                          mail
                        </span>
                        {mentor.EmailAddress}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="material-symbols-outlined text-sm text-slate-400">
                          call
                        </span>
                        {mentor.MobileNo}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-700">
                      {new Date(mentor.CreatedAt!).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`mentors/${mentor.MentorID}`}>
                        <button
                          className="p-1.5 text-slate-400 hover:text-[#135bec] hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Mentor Profile"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            visibility
                          </span>
                        </button>
                      </Link>
                      <button
                        className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Mentor"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <form action={deleteMentor}>
                        <input
                          type="hidden"
                          name="mentorId"
                          value={mentor.MentorID}
                        />

                        <button
                          type="submit"
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove Mentor"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

