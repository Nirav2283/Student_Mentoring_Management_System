import { prisma } from "@/app/lib/prisma";
import React from "react";

const MENTOR_DATA = {
  MentorID: "MNT-90210", // Primary Key
  UserID: "USR-4421", // Foreign Key from user table
  MentorName: "Dr. Sarah Jenkins", // Name of the mentor
  MobileNo: "+1 (555) 0123-456", // Mentor mobile number
  EmailAddress: "sarah.jenkins@university.edu", // Mentor email address
  Description:
    "Senior Academic Advisor specializing in Molecular Biology and Research Methodologies. Oversees student progress and semester reporting.", // Optional notes/comments
  Created: "2016-08-12 10:30 AM", // Timestamp when mentor was created
  Modified: "2023-10-24 03:45 PM", // Timestamp when mentor was last updated
  Role: "Senior Mentor",
  Department: "Faculty of Science",
};

const ASSIGNED_STUDENTS = [
  {
    id: "STU-001",
    name: "Alexander Wright",
    major: "Biochemistry",
    year: "3",
    reportStatus: "Submitted",
  },
  {
    id: "STU-002",
    name: "Elena Rodriguez",
    major: "Physics",
    year: "2",
    reportStatus: "Pending",
  },
  {
    id: "STU-003",
    name: "Marcus Chen",
    major: "Genetics",
    year: "4",
    reportStatus: "Pending",
  },
  {
    id: "STU-004",
    name: "Sophie Bennett",
    major: "Marine Biology",
    year: "1",
    reportStatus: "Submitted",
  },
];

export default async function MentorProfileView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const MentorID = Number(id);
  const mentor = await prisma.mentor.findUnique({
    where: {
      MentorID,
    },
  });

  const totalStudentsUnderMentor = MentorID
    ? await prisma.studentmentor.count({
        where: {
          MentorID,
        },
      })
    : 0;

  const pendingstudents = MentorID
    ? await prisma.studentmentor.count({
        where: {
          MentorID,
          studentmentoring: {
            none: {},
          },
        },
      })
    : 0;

  const studentslist = MentorID
    ? await prisma.studentmentor.findMany({
        where: {
          MentorID,
        },
        include: {
          student: true,
          studentmentoring: {
            orderBy: { DateOfMentoring: "desc" },
          },
        },
      })
    : [];

  console.log(studentslist);

  return (
    <div className="bg-[#f6f6f8] text-[#111318] min-h-screen p-6 font-sans">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-[#dbdfe6] p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="size-24 rounded-2xl bg-[#135bec]/10 flex items-center justify-center text-[#135bec] text-3xl font-bold border-2 border-[#135bec]/20 shrink-0">
              {mentor?.MentorName.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center gap-3 mb-1 justify-center md:justify-start">
                <h1 className="text-3xl font-bold tracking-tight">
                  {mentor?.MentorName}
                </h1>
              </div>
              <p className="text-[#616f89] text-lg font-medium mb-4">
                {mentor?.Department?.toUpperCase()}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <p className="flex items-center gap-2 text-[#616f89]">
                  <span className="material-symbols-outlined text-base">
                    call
                  </span>
                  <span className="font-semibold text-[#111318]">Mobile:</span>{" "}
                  {mentor?.MobileNo}
                </p>
                <p className="flex items-center gap-2 text-[#616f89]">
                  <span className="material-symbols-outlined text-base">
                    mail
                  </span>
                  <span className="font-semibold text-[#111318]">Email:</span>{" "}
                  {mentor?.EmailAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#dbdfe6] p-6 shadow-sm flex items-center gap-4">
            <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center text-[#135bec]">
              <span className="material-symbols-outlined text-2xl font-bold">
                groups
              </span>
            </div>
            <div>
              <p className="text-sm text-[#616f89] font-medium">
                Total Students
              </p>
              <h2 className="text-2xl font-bold text-[#111318]">
                {totalStudentsUnderMentor}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#dbdfe6] p-6 shadow-sm flex items-center gap-4">
            <div className="size-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined text-2xl font-bold">
                pending_actions
              </span>
            </div>
            <div>
              <p className="text-sm text-[#616f89] font-medium">
                Pending Students
              </p>
              <h2 className="text-2xl font-bold text-amber-600">
                {pendingstudents}
              </h2>
            </div>
          </div>
        </div>

        {/* Description and Timestamps */}
        {/* <div className="bg-white rounded-xl border border-[#dbdfe6] p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined">description</span>
            Staff Description
          </h3>
          <p className="text-[#616f89] text-sm leading-relaxed mb-6">
            {MENTOR_DATA.Description}
          </p>
          
          <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-x-10 gap-y-2 text-[11px] text-[#616f89] uppercase tracking-wider font-semibold">
            <p>Created: {MENTOR_DATA.Created}</p>
            <p>Modified: {MENTOR_DATA.Modified}</p>
          </div>
        </div> */}

        {/* Assigned Students List */}
        <div className="bg-white rounded-xl border border-[#dbdfe6] overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-[#dbdfe6] flex items-center justify-between bg-gray-50/50">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">school</span>
              Students Under {mentor?.MentorName?.split(" ")[0] ?? "Mentor"}
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {studentslist.length === 0 && (
              <div className="p-6 text-center text-sm text-gray-400">
                No students assigned to this mentor
              </div>
            )}

            {studentslist.map((row: any) => {
              const student = row.student;
              const lastSession = row.studentmentoring?.[0];
              const isPending = !lastSession;

              const initials = student.StudentName?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <div
                  key={row.StudentMentorID}
                  className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="size-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {initials}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#111318]">
                        {student.StudentName}
                      </p>
                      <p className="text-xs text-[#616f89]">
                        {student.Department} • Sem {student.CurrentSem}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-6">
                    {/* Status */}
                    <div className="hidden sm:block text-right">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                          isPending
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {isPending ? "Pending" : "Completed"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-[#616f89] uppercase tracking-tighter">
                        ENR: {student.EnrollmentNo}
                      </p>
                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
