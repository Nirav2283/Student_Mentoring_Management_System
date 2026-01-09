"use client";

import React from 'react';
import Link from 'next/link';

// Sample Data for the Table
const students = [
  { id: "STU001", name: "Sophia Williams", email: "sophia.w@university.edu", college: "Engineering", dept: "Computer Science", mentor: "Dr. Robert Ford", status: "Active", initial: "SW" },
  { id: "STU002", name: "James Miller", email: "j.miller23@university.edu", college: "Arts & Sciences", dept: "History", mentor: "Sarah Connor", status: "Probation", initial: "JM" },
  { id: "STU003", name: "Ethan Chen", email: "ethan.c@university.edu", college: "Business", dept: "Finance", mentor: null, status: "Active", initial: "EC" },
  { id: "STU004", name: "Olivia Anderson", email: "o.anderson@university.edu", college: "Engineering", dept: "Civil Eng", mentor: "Mike Brown", status: "Inactive", initial: "OA" },
  { id: "STU005", name: "Lucas Wilson", email: "lucas.w@university.edu", college: "Law", dept: "Criminal Law", mentor: null, status: "Active", initial: "LW" },
];

export default function StudentListPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Search and Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 min-w-[240px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">search</span>
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
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span className="hidden sm:inline">Export</span>
          </button>
          <Link href="/dashboard/students/add" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#135bec] hover:bg-blue-700 text-white transition-all text-sm font-bold shadow-md shadow-[#135bec]/25">
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
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">College / Dept</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mentor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-blue-50 text-[#135bec] flex items-center justify-center font-bold text-sm border border-blue-100">
                        {student.initial}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{student.name}</div>
                        <div className="text-xs text-slate-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 font-medium">{student.college}</div>
                    <div className="text-xs text-slate-500">{student.dept}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.mentor ? (
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="material-symbols-outlined text-slate-400 text-lg">person</span>
                        {student.mentor}
                      </div>
                    ) : (
                      <button className="text-xs font-bold text-[#135bec] hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">person_add</span> Assign
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      student.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 
                      student.status === 'Probation' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
               
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/students/${student.id}`} 
                        className="p-1.5 text-slate-400 hover:text-[#135bec] hover:bg-blue-50 rounded-lg transition-colors" 
                        title="View Profile"
                      >
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </Link>
                      <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Student">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">1</span> to <span className="font-bold text-slate-900">5</span> of <span className="font-bold text-slate-900">97</span> students
          </p>
          <div className="flex gap-1">
            <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="px-3.5 py-1 border border-[#135bec] bg-blue-50 text-[#135bec] rounded-lg font-bold text-sm">1</button>
            <button className="px-3.5 py-1 border border-gray-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm">2</button>
            <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:bg-slate-50">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}