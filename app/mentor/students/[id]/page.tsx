"use client";

import React from 'react';

const StudentProfile = () => {
  const sessions = [
    {
      date: "May 12, 2024",
      agenda: "Final project roadmap and technology stack selection.",
      issues: ["Database design", "NextJS"],
      parentStatus: true,
      attendance: "Present",
    },
    {
      date: "Apr 24, 2024",
      agenda: "Mid-term performance review and elective counseling.",
      issues: ["Grade improvement"],
      parentStatus: false,
      attendance: "Present",
    },
    {
      date: "Apr 02, 2024",
      agenda: "Internship opportunities and resume building.",
      issues: ["Career path", "Soft skills"],
      parentStatus: true,
      attendance: "Absent",
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-8 text-slate-900">
      {/* Injecting the font and icons directly for App Router compatibility. 
         Ideally, move these to your layout.tsx for better performance.
      */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        .material-icons-outlined {
          vertical-align: middle;
          line-height: 1;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img 
                    alt="Student Photo" 
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-100" 
                    src="https://ui-avatars.com/api/?name=Johnathan+Doe&background=4f46e5&color=fff"
                  />
                  <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Johnathan Doe</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded uppercase tracking-wider">Fast Learner</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded uppercase tracking-wider">6th Semester</span>
                  </div>
                  <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                    <span className="material-icons-outlined text-base">apartment</span> 
                    <span>Dept. of Computer Science Engineering</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-y border-slate-100">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Enrollment No</p>
                <p className="font-medium text-slate-900">EN2024001</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</p>
                <p className="font-medium text-slate-900">+1 (555) 012-3456</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                <p className="font-medium text-slate-900">j.doe@university.edu</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Sem</p>
                <p className="font-medium text-slate-900">Semester 6</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Department</p>
                <p className="font-medium text-slate-900">CSE - Artificial Intelligence</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="font-medium text-slate-900">Active</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Internal Remarks & Description</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enthusiastic about deep learning and research. Showing great potential in core algorithms. Needs slightly more focus on technical writing for publications. Consistent attendance but occasional stress spikes during exam cycles.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <h3 className="font-semibold mb-6 flex items-center gap-2 text-slate-900 text-lg">
              <span className="material-icons-outlined text-slate-400">psychology</span>
              Behavioral Insights
            </h3>
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-slate-500 font-medium">Stress Level</label>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">MEDIUM</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full w-[65%]"></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium mb-2">Learner Classification</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">Advanced</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">Fast Learner</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 mt-auto">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Staff Opinion Summary</p>
                <p className="text-xs italic text-slate-600 leading-relaxed">
                  "John demonstrates high analytical skills. He is responsive to feedback but often pushes himself too hard during project deadlines."
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[8px] font-bold text-white uppercase">RS</div>
                  <span className="text-[11px] font-medium text-slate-500">Mentored by Dr. Robert Smith</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-indigo-600">14</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Sessions</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl font-extrabold text-slate-900">92%</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Avg. Attendance</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <p className="text-3xl font-extrabold text-slate-900">4.8</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Staff Rating</p>
          </div>
          <div className="space-y-1 border-l border-slate-100">
            <div className="flex items-center justify-center gap-1 text-green-600">
              <span className="material-icons-outlined text-2xl">check_circle</span>
              <p className="text-xl font-extrabold text-slate-900 uppercase">On Track</p>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Progress Status</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-900">Mentoring Session History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.1em]">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Agenda / Objectives</th>
                  <th className="px-6 py-4">Issues Discussed</th>
                  <th className="px-6 py-4">Parent Status</th>
                  <th className="px-6 py-4">Attendance</th>
                 
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {sessions.map((session, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900">{session.date}</td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-500 font-medium">{session.agenda}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 flex-wrap">
                        {session.issues.map((issue, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase">{issue}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1.5 font-bold text-xs ${session.parentStatus ? 'text-green-600' : 'text-slate-300'}`}>
                        <span className="material-icons-outlined text-sm">{session.parentStatus ? 'how_to_reg' : 'close'}</span>
                        {session.parentStatus ? 'YES' : 'NO'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                        session.attendance === 'Present' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                      }`}>
                        {session.attendance}
                      </span>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Showing <span className="text-slate-900">{sessions.length}</span> of 14 sessions
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded border border-slate-200 text-xs font-bold text-slate-400 disabled:opacity-50" disabled>PREV</button>
              <button className="px-3 py-1.5 rounded border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white transition-colors">NEXT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;