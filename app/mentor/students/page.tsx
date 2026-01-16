"use client";

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

// Updated Sample Data to match your original mentor-specific list
const students = [
  { id: "EN2021001", name: "John Doe", dept: "Computer Science", year: "3rd Sem", initial: "JD", status: "Active" },
  { id: "EN2021045", name: "Sarah Miller", dept: "Information Tech", year: "3rd Sem", initial: "SM", status: "Active" },
  { id: "EN2022012", name: "Michael Chen", dept: "Computer Science", year: "2nd Sem", initial: "MC", status: "Active" },
  { id: "EN2021089", name: "Emily Davis", dept: "Mechanical Eng", year: "3rd Sem", initial: "ED", status: "Active" },
  { id: "EN2023005", name: "Robert Wilson", dept: "Electrical Eng", year: "1st Sem", initial: "RW", status: "Active" },
];

export default function StudentListPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans animate-fade-in">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300&display=swap" rel="stylesheet" />
      </Head>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Heading */}
        <header className="flex items-end justify-between mb-2">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">My Students</h1>
            <p className="text-slate-500 mt-1">Manage and monitor your 48 assigned students</p>
          </div>
          <div className="bg-[#135bec]/10 px-4 py-2 rounded-lg border border-[#135bec]/20">
            <span className="text-[#135bec] font-bold">48</span>
            <span className="text-[#135bec]/70 text-sm ml-1 font-medium">Total Active</span>
          </div>
        </header>

        {/* Top Search and Actions Bar - Themed */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 min-w-[240px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all outline-none" 
                placeholder="Search by name or enrollment number..." 
                type="text"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-slate-600 focus:ring-2 focus:ring-[#135bec]/20 outline-none cursor-pointer">
                <option value="">All Departments</option>
                <option value="cs">Computer Science</option>
                <option value="me">Mechanical Eng</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center size-11 rounded-lg border border-gray-200 bg-white text-slate-500 hover:text-[#135bec] hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#135bec] hover:bg-blue-700 text-white transition-all text-sm font-bold shadow-md shadow-[#135bec]/25">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Enroll Student</span>
            </button>
          </div>
        </div>

        {/* Student Table Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Enrollment Number</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Current Semester</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="size-9 rounded-full bg-blue-50 text-[#135bec] flex items-center justify-center font-bold text-xs border border-blue-100">
                          {student.initial}
                        </div>
                        <div className="text-sm font-bold text-slate-900">{student.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {student.dept}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                      {student.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/mentor/students/${student.id}`}>
                        <button className="p-2 text-slate-400 hover:text-[#135bec] hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                        </Link>
                    
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">
              Showing <span className="text-slate-900">1</span> to <span className="text-slate-900">5</span> of <span className="text-slate-900">48</span> students
            </p>
            <div className="flex gap-1">
              <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-30" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="px-3.5 py-1 border border-[#135bec] bg-blue-50 text-[#135bec] rounded-lg font-bold text-sm">1</button>
              <button className="px-3.5 py-1 border border-gray-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">2</button>
              <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}