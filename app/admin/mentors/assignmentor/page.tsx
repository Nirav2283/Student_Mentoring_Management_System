"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const MentorshipManager = () => {
  // State for Tab Switching
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'assign'

  // Data for Active Mappings
  const [activeMappings] = useState([
    {
      id: "#2024-012",
      studentName: "Johnathan Silver",
      initials: "JS",
      dept: "Computer Science",
      mentorName: "Dr. Sarah Rogers",
      mentorRole: "Associate Professor",
      status: "Active",
      dateLabel: "Started",
      date: "Oct 12, 2023",
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "#2024-088",
      studentName: "Alice Montgomery",
      initials: "AM",
      dept: "Mechanical Eng.",
      mentorName: "Prof. Michael Chen",
      mentorRole: "Department Head",
      status: "Active",
      dateLabel: "Started",
      date: "Aug 05, 2023",
      color: "bg-green-100 text-green-700"
    }
  ]);

  // Data for Assigning New Mentors
  const [unassignedStudents] = useState([
    { id: "#STU-2024-045", name: "Robert K. Long", initials: "RK", dept: "Business Admin", year: "Senior (Year 4)", color: "purple" },
    { id: "#STU-2024-033", name: "Sarah McAllister", initials: "SM", dept: "Electronics", year: "Junior (Year 3)", color: "orange" },
  ]);

  return (
    <div className="bg-[#f6f6f8] text-[#111318]  font-sans">
      {/* External Icons */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <main className="max-w-7xl mx-auto w-full px-6 md:px-10 py-8">
        {/* Breadcrumbs */}
       

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-black tracking-tight text-[#111318]">
              {activeTab === 'active' ? "Manage Mentorship Mappings" : "Assign Mentors to Students"}
            </h1>
            <p className="text-gray-500 text-base">
              {activeTab === 'active' ? "Update or end existing student-mentor pairings." : "Select available mentors to pair with students needing guidance."}
            </p>
          </div>
  
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-gray-200/50 rounded-xl w-fit mb-6">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-white text-[#135bec] shadow-sm' : 'text-gray-500 hover:text-[#135bec]'}`}
          >
            Active Mappings
          </button>
          <button 
            onClick={() => setActiveTab('assign')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'assign' ? 'bg-white text-[#135bec] shadow-sm' : 'text-gray-500 hover:text-[#135bec]'}`}
          >
            Assign New
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center shadow-sm">
          <div className="flex-1 min-w-[300px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-[#135bec] outline-none" placeholder="Search by name or ID..." type="text"/>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <select className="flex-1 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium py-2 px-4 outline-none">
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Mechanical Engineering</option>
            </select>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>

        {/* Main Table Container */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {/* <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-10">
                    <input className="rounded border-gray-300 text-[#135bec] focus:ring-[#135bec]" type="checkbox"/>
                  </th> */}
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {activeTab === 'active' ? "Assigned Mentor" : "Department & Year"}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {activeTab === 'active' ? "Status & Date" : "Select Mentor"}
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                
                {/* CASE 1: ACTIVE MAPPINGS TAB */}
                {activeTab === 'active' && activeMappings.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    {/* <td className="px-6 py-4"><input className="rounded border-gray-300 text-[#135bec]" type="checkbox"/></td> */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm  bg-blue-50 text-[#135bec]`}>{row.initials}</div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{row.studentName}</p>
                          <p className="text-xs text-gray-500">{row.dept} • ID: {row.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="size-7 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[16px] text-gray-600">person</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{row.mentorName}</p>
                          <p className="text-xs text-gray-500">{row.mentorRole}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium w-fit ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{row.status}</span>
                        <span className="text-[10px] text-gray-400 mt-1">{row.dateLabel}: {row.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                         <button className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                        End
                      </button>
                        {/* <button className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">End</button> */}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* CASE 2: ASSIGN NEW TAB */}
                {activeTab === 'assign' && unassignedStudents.map((student, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    {/* <td className="px-6 py-4"><input className="rounded border-gray-300 text-[#135bec]" type="checkbox"/></td> */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm  bg-blue-50 text-[#135bec]`}>{student.initials}</div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">ID: {student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-medium">{student.dept}</span>
                        <span className="text-xs text-gray-500">{student.year}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 min-w-[250px]">
                      <div className="relative">
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-lg text-sm py-2 pl-3 pr-8 focus:ring-[#135bec] appearance-none outline-none">
                          <option value="">Search & Select Mentor...</option>
                          <option>Dr. Sarah Rogers (CS)</option>
                          <option>Prof. Michael Chen (CS)</option>
                          <option>Dr. Emily Watson (Eng)</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">expand_more</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-[#135bec] text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between bg-white gap-4">
            <p className="text-sm text-gray-500 font-medium">
              Showing <span className="text-[#111318] font-bold">1</span> to <span className="text-[#111318] font-bold">10</span> of 142 students
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-1 hover:bg-gray-50 transition-colors" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span> Previous
              </button>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 bg-[#135bec] text-white rounded-lg text-sm font-bold">1</button>
                <button className="px-3 py-1.5 border border-transparent hover:border-gray-200 rounded-lg text-sm font-medium">2</button>
              </div>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-50 transition-colors">
                Next <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorshipManager;