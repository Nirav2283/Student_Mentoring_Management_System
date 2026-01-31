// "use client";

// import React from "react";

// const StudentProfile = ({ student }: any) => {
//   const sessions = student.studentMentor?.studentMentorings ?? [];

//   return (
//     <div className="bg-[#f8fafc] min-h-screen p-4 md:p-8 text-slate-900">
//       <div className="max-w-7xl mx-auto space-y-6">

//         {/* ================= PROFILE ================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 bg-white rounded-xl p-6 border">
//             <h2 className="text-2xl font-bold">
//               {student.firstName} {student.lastName}
//             </h2>

//             <p className="text-sm text-slate-500 mt-1">
//               Enrollment: {student.enrollmentNo}
//             </p>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6">
//               <Info label="Mobile" value={student.mobile} />
//               <Info label="Email" value={student.email} />
//               <Info label="Semester" value={student.currentSem} />
//               <Info label="Department" value={student.department} />
//               <Info label="Status" value={student.isActive ? "Active" : "Inactive"} />
//             </div>

//             <p className="text-sm text-slate-600">
//               {student.internalRemarks || "No remarks"}
//             </p>
//           </div>

//           {/* ================= MENTOR ================= */}
//           <div className="bg-white rounded-xl p-6 border">
//             <h3 className="font-bold mb-4">Mentor</h3>
//             {student.studentMentor ? (
//               <>
//                 <p className="font-semibold">
//                   {student.studentMentor.mentor.name}
//                 </p>
//                 <p className="text-sm text-slate-500">
//                   {student.studentMentor.mentor.designation}
//                 </p>
//               </>
//             ) : (
//               <p className="text-sm text-slate-400">Not Assigned</p>
//             )}
//           </div>
//         </div>

//         {/* ================= SESSIONS TABLE ================= */}
//         <div className="bg-white rounded-xl border overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-slate-50 text-xs uppercase">
//               <tr>
//                 <th className="px-6 py-3">Date</th>
//                 <th className="px-6 py-3">Agenda</th>
//                 <th className="px-6 py-3">Issues</th>
//                 <th className="px-6 py-3">Parent</th>
//                 <th className="px-6 py-3">Attendance</th>
//               </tr>
//             </thead>

//             <tbody>
//               {sessions.map((s: any) => (
//                 <tr key={s.id} className="border-t">
//                   <td className="px-6 py-3">
//                     {new Date(s.meetingDate).toDateString()}
//                   </td>
//                   <td className="px-6 py-3">{s.agenda}</td>
//                   <td className="px-6 py-3">{s.issues}</td>
//                   <td className="px-6 py-3">
//                     {s.parentPresent ? "YES" : "NO"}
//                   </td>
//                   <td className="px-6 py-3">
//                     {s.attendance}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// };

// const Info = ({ label, value }: any) => (
//   <div>
//     <p className="text-xs text-slate-400 uppercase">{label}</p>
//     <p className="font-medium">{value}</p>
//   </div>
// );

// export default StudentProfile;