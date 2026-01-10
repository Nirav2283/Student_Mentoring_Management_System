"use client";

import React, { useState } from 'react';

const AssignMentors = () => {
  // Sample Data for the table
  const [students] = useState([
    { id: "#STU-2024-012", name: "Johnathan Silver", initials: "JS", dept: "Computer Science", year: "Sophomore (Year 2)", color: "blue" },
    { id: "#STU-2024-088", name: "Alice Montgomery", initials: "AM", dept: "Mechanical Eng.", year: "Freshman (Year 1)", color: "green" },
    { id: "#STU-2024-045", name: "Robert K. Long", initials: "RK", dept: "Business Admin", year: "Senior (Year 4)", color: "purple" },
    { id: "#STU-2024-033", name: "Sarah McAllister", initials: "SM", dept: "Electronics", year: "Junior (Year 3)", color: "orange" },
  ]);

  return (
    <div className="bg-[#f6f6f8] text-[#111318] min-h-screen font-sans">
      {/* External Fonts and Icons - Keep these in your layout or here for testing */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-10 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <a className="text-gray-500 text-sm font-medium hover:text-[#135bec] transition-colors" href="#">Mappings</a>
          <span className="text-gray-400 text-sm">/</span>
          <span className="text-[#135bec] text-sm font-medium">Assign Mentors</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#111318] text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
              Assign Mentors to Students
            </h1>
            <p className="text-gray-500 text-base font-normal leading-normal">
              Select available staff to pair with students across departments.
            </p>
          </div>
          
          {/* Header Action Buttons */}
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-white border border-gray-200 text-[#111318] px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">file_upload</span>
              Bulk Upload
            </button>
            <button className="flex-1 md:flex-none bg-[#135bec] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-[#135bec]/20 hover:bg-[#135bec]/90 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              Approve All
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center shadow-sm">
          <div className="flex-1 min-w-[280px]">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-[#135bec] focus:border-[#135bec] transition-all outline-none" 
                placeholder="Search by student name, ID or enrollment..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <select className="flex-1 sm:flex-none bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium py-2 px-4 focus:ring-[#135bec] outline-none">
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Mechanical Engineering</option>
            </select>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-10">
                    <input className="rounded border-gray-300 text-[#135bec] focus:ring-[#135bec]" type="checkbox"/>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Department & Year</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Select Mentor</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input className="rounded border-gray-300 text-[#135bec] focus:ring-[#135bec]" type="checkbox"/>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm
                          ${student.color === 'blue' ? 'bg-blue-100 text-blue-700' : 
                            student.color === 'green' ? 'bg-green-100 text-green-700' : 
                            student.color === 'purple' ? 'bg-purple-100 text-purple-700' : 
                            'bg-orange-100 text-orange-700'}`}>
                          {student.initials}
                        </div>
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
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-lg text-sm py-2 pl-3 pr-8 focus:ring-[#135bec] focus:border-[#135bec] appearance-none outline-none">
                          <option value="">Search & Select staff...</option>
                          <option value="1">Dr. Sarah Rogers (CS)</option>
                          <option value="2">Prof. Michael Chen (CS)</option>
                          <option value="3">Dr. Emily Watson (Eng)</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">expand_more</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="bg-[#135bec] text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
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
              Showing <span className="text-[#111318]">10</span> of <span className="text-[#111318]">142</span> students
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-1 bg-white hover:bg-gray-50 transition-colors" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span> Previous
              </button>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 bg-[#135bec] text-white rounded-lg text-sm font-bold shadow-sm">1</button>
                <button className="px-3 py-1.5 border border-transparent hover:border-gray-200 rounded-lg text-sm font-medium transition-colors">2</button>
              </div>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1 bg-white">
                Next <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Guidelines Info Alert */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl flex gap-4 items-start">
          <span className="material-symbols-outlined text-[#135bec] text-2xl">info</span>
          <div>
            <h4 className="text-blue-900 font-bold mb-1">Assignment Guidelines</h4>
            <p className="text-blue-800/80 text-sm leading-relaxed">
              Mentors can typically handle up to 15 students. The dropdown list highlights staff from the student's department by default, but you can assign cross-department mentors if required. Once assigned, students will receive an automated notification.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssignMentors;