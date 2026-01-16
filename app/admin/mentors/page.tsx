"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// Sample Data mapped from the Database Table
const mentorsData = [
  {
    mentorId: "MNT-2024-001",
    mentorName: "Dr. Robert Ford",
    emailAddress: "r.ford@university.edu",
    mobileNo: "+1 (555) 010-1234",
    designation: "Senior Professor",
    description: "Head of AI Research Department",
    created: "2024-01-15",
    initial: "RF"
  },
  {
    mentorId: "MNT-2024-002",
    mentorName: "Sarah Connor",
    emailAddress: "s.connor@university.edu",
    mobileNo: "+1 (555) 010-5678",
    designation: "Associate Lecturer",
    description: "Specializes in Cyber Security",
    created: "2024-02-10",
    initial: "SC"
  },
  {
    mentorId: "MNT-2024-003",
    mentorName: "Mike Brown",
    emailAddress: "m.brown@university.edu",
    mobileNo: "+1 (555) 010-9988",
    designation: "Department Head",
    description: "Structural Engineering Lead",
    created: "2023-11-20",
    initial: "MB"
  }
];

export default function MentorListPage() {
  const [mentors] = useState(mentorsData);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search and Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 min-w-[240px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">search</span>
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-slate-50 text-sm focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all outline-none"
              placeholder="Search by Mentor Name, ID, or Email..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-slate-600 hover:bg-slate-50 transition-all text-sm font-medium">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span className="hidden sm:inline">Export List</span>
          </button>
          <Link href="/admin/mentors/add" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#135bec] hover:bg-blue-700 text-white transition-all text-sm font-bold shadow-md shadow-[#135bec]/25">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
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
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mentor Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Registration Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mentors.map((mentor) => (
                <tr key={mentor.mentorId} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-blue-50 text-[#135bec] flex items-center justify-center font-bold text-sm border border-blue-100">
                        {mentor.initial}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{mentor.mentorName}</div>
                        <div className="text-xs text-slate-500">ID: {mentor.mentorId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 font-semibold">{mentor.designation}</div>
                    <div className="text-xs text-slate-400 max-w-[200px] truncate" title={mentor.description}>
                      {mentor.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="material-symbols-outlined text-sm text-slate-400">mail</span>
                        {mentor.emailAddress}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="material-symbols-outlined text-sm text-slate-400">call</span>
                        {mentor.mobileNo}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-700">
                      {new Date(mentor.created).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`mentors/${mentor.mentorId}`}>
                        <button className="p-1.5 text-slate-400 hover:text-[#135bec] hover:bg-blue-50 rounded-lg transition-colors" title="View Mentor Profile">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                      </Link>
                      <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Mentor">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove Mentor">
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
            Showing <span className="font-bold text-slate-900">1</span> to <span className="font-bold text-slate-900">{mentors.length}</span> of <span className="font-bold text-slate-900">124</span> mentors
          </p>
          <div className="flex gap-1">
            <button className="p-2 border border-gray-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors" disabled>
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
  );
}