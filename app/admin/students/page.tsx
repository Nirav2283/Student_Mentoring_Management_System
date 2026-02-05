import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import DeleteButton from "@/app/ui/DeleteButton";
import { revalidatePath } from "next/cache";

async function deleteStudent(formData: FormData) {
  "use server";

  const id = Number(formData.get("studentId"));

  const student = await prisma.student.findUnique({
    where: { StudentID: id },
    select: { UserID: true },
  });

  if (student) {
    await prisma.users.delete({
      where: { UserID: student.UserID },
    });
  }

  revalidatePath("/admin/students");
}

export default async function StudentListPage() {
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

  console.log("::::CollegeID:::::",CollegeID)

  const students = await prisma.student.findMany({
    where: {
      CollegeID,
    },
    select: {
      StudentID: true,
      EmailAddress: true,
      StudentName: true,
      Status: true,
      CurrentSem: true,
      Department: true,

      studentmentor: {
        select: {
          mentor: {
            select: {
              MentorName: true,
            },
          },
        },
      },
    },
  });

 

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Search and Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 min-w-[240px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all outline-none"
              placeholder="Search by name, email, or ID..."
              type="text"
            />
          </div>
          <div className="flex gap-3">
            <select className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-slate-600 focus:ring-2 focus:ring-[#135bec]/20 outline-none cursor-pointer">
              <option value="">All Colleges</option>
              <option value="eng">Engineering</option>
              <option value="arts">Arts & Sciences</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">
              download
            </span>
            <span className="hidden sm:inline">Import Bulk</span>
          </button>
          <Link
            href="/admin/students/add"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#135bec] hover:bg-blue-700 text-white transition-all text-sm font-bold shadow-md shadow-[#135bec]/25"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add Student</span>
          </Link>
        </div>
      </div>

      {/* Student Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Student Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  College / Dept
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Mentor
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr
                  key={student.StudentID}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-blue-50 text-[#135bec] flex items-center justify-center font-bold text-sm border border-blue-100">
                        {student.StudentName[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {student.StudentName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {student.EmailAddress}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 font-medium">
                      {student.Department}
                    </div>
                    {/* <div className="text-xs text-slate-500">{student.dept}</div> */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.studentmentor[0]?.mentor?.MentorName ? (
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          person
                        </span>
                        {student.studentmentor[0].mentor.MentorName}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          person
                        </span>
                        Not assinged
                      </div>
                    )}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      student.Status === true ? 'bg-emerald-50 text-emerald-700' : 
                      student.Status === false ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {student.Status}
                    </span>
                  </td> */}

                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.Status == true ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">
                        Deactive
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/students/${student.StudentID}`}
                        className="p-1.5 text-slate-400 hover:text-[#135bec] hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          visibility
                        </span>
                      </Link>
                      <button
                        className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Student"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit
                        </span>
                      </button>
                      <form action={deleteStudent}>
                        <input
                          type="hidden"
                          name="studentId"
                          value={student.StudentID}
                        />
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">1</span> to{" "}
            <span className="font-bold text-slate-900">5</span> of{" "}
            <span className="font-bold text-slate-900">{totalStudents}</span>{" "}
            students
          </p>
          <div className="flex gap-1">
            <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">
                chevron_left
              </span>
            </button>
            <button className="px-3.5 py-1 border border-[#135bec] bg-blue-50 text-[#135bec] rounded-lg font-bold text-sm">
              1
            </button>
            <button className="px-3.5 py-1 border border-gray-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm">
              2
            </button>
            <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
