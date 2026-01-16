"use client";

import React from 'react';

const SessionRecordForm = () => {
  return (
    <div className="bg-[#f6f7f8] min-h-screen py-12 px-4 md:px-8 font-['Inter',_sans-serif] text-[#111617]">
      {/* Global styles to ensure Material Symbols and Fonts load correctly */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD@200..700,0..1,-25..200');
        
        body {
          font-family: 'Inter', sans-serif;
        }

        /* Reinforced Icon Class for Maximum Visibility */
        .symbol-visible {
          font-family: 'Material Symbols Outlined';
          font-weight: 600;
          font-style: normal;
          font-size: 22px; /* Slightly larger for better clarity */
          display: inline-block;
          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap;
          direction: ltr;
          font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }

        /* Date input appearance fix for Chrome/Safari */
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
        }
      `}</style>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#647e87]">
          <span className="hover:text-[#167b9c] cursor-pointer transition-colors">Sessions</span>
          <span className="symbol-visible text-[14px]">chevron_right</span>
          <span className="text-[#167b9c]">Detailed Session Record</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col gap-1 mb-2">
          <h2 className="text-3xl font-black tracking-tight text-[#111617]">Record Mentoring Session</h2>
          <p className="text-[#647e87] text-sm font-medium">Capture session outcomes and detailed mentor evaluation of student progress.</p>
        </div>

        <form className="flex flex-col gap-8 pb-12">
          
          {/* 1. Student Identification */}
          <div className="bg-white rounded-xl border border-[#f0f3f4] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#f0f3f4] flex items-center gap-3">
              <span className="symbol-visible text-[#167b9c]">badge</span>
              <h3 className="font-bold text-lg">Student Identification</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#111617]">Select Student</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 symbol-visible text-[#167b9c] pointer-events-none">person_search</span>
                  <select className="w-full bg-[#f6f7f8] border-none rounded-lg py-3 pl-11 pr-10 focus:ring-2 focus:ring-[#167b9c]/20 appearance-none cursor-pointer text-sm font-medium">
                    <option>Select a mentee...</option>
                    <option>Alex Rivera (Computer Science)</option>
                    <option>Sarah Chen (Biotechnology)</option>
                  </select>
                  <span className="absolute right-3 symbol-visible text-[#647e87] text-lg pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#111617]">Session Date</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 symbol-visible text-[#167b9c] pointer-events-none">calendar_month</span>
                  <input className="w-full bg-[#f6f7f8] border-none rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-[#167b9c]/20 cursor-pointer text-sm font-medium" type="date" defaultValue="2023-11-20" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#111617]">Review Cycle</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 symbol-visible text-[#167b9c] pointer-events-none">history_edu</span>
                  <select className="w-full bg-[#f6f7f8] border-none rounded-lg py-3 pl-11 pr-10 focus:ring-2 focus:ring-[#167b9c]/20 appearance-none cursor-pointer text-sm font-medium">
                    <option value="regular">Regular Session</option>
                    <option value="monthly">Monthly Review</option>
                    <option value="semester">Semester Review</option>
                  </select>
                  <span className="absolute right-3 symbol-visible text-[#647e87] text-lg pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Discussion Details */}
          <div className="bg-white rounded-xl border border-[#f0f3f4] shadow-sm">
            <div className="p-6 border-b border-[#f0f3f4] flex items-center gap-3">
              <span className="symbol-visible text-[#167b9c]">edit_note</span>
              <h3 className="font-bold text-lg">Discussion Details</h3>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Session Agenda</label>
                <input className="w-full bg-[#f6f7f8] border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#167b9c]/20 text-sm font-medium" placeholder="E.g., Academic progress review and internship planning" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Issues Discussed & Key Outcomes</label>
                <textarea className="w-full bg-[#f6f7f8] border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#167b9c]/20 resize-none text-sm font-medium" placeholder="Provide a detailed summary of the conversation..." rows={4}></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Attendance Status</label>
                  <div className="flex bg-[#f6f7f8] p-1 rounded-lg w-fit">
                    <button type="button" className="px-6 py-2 rounded-md text-xs font-bold bg-white shadow-sm text-[#167b9c]">Present</button>
                    <button type="button" className="px-6 py-2 rounded-md text-xs font-bold text-[#647e87]">Absent</button>
                    <button type="button" className="px-6 py-2 rounded-md text-xs font-bold text-[#647e87]">Excused</button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">Learner Type</label>
                  <div className="relative flex items-center">
                    <select className="w-full bg-[#f6f7f8] border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#167b9c]/20 cursor-pointer text-sm font-medium appearance-none">
                      <option>Average</option>
                      <option>Slow</option>
                      <option>Fast</option>
                      <option>Advanced</option>
                    </select>
                    <span className="absolute right-3 symbol-visible text-[#647e87] text-lg pointer-events-none">unfold_more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Evaluation & Internal Feedback */}
          <div className="bg-white rounded-xl border border-[#f0f3f4] shadow-sm">
            <div className="p-6 border-b border-[#f0f3f4] flex items-center gap-3">
              <span className="symbol-visible text-[#167b9c]">analytics</span>
              <h3 className="font-bold text-lg">Evaluation & Feedback</h3>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Mentor Feedback on Progress</label>
                <textarea className="w-full bg-[#f6f7f8] border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-[#167b9c]/20 resize-none text-sm font-medium" placeholder="Assess achievements since last session..." rows={3}></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#167b9c] flex items-center gap-2">
                  <span className="symbol-visible text-lg">verified_user</span>
                  Staff Opinion (Internal Remarks)
                </label>
                <div className="relative">
                  <textarea className="w-full bg-[#167b9c]/5 border-2 border-[#167b9c]/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#167b9c]/20 focus:border-[#167b9c]/30 outline-none transition-all resize-none text-sm font-medium" placeholder="Restricted verdict for department review..." rows={4}></textarea>
                  <div className="absolute top-2 right-3 opacity-10 pointer-events-none">
                    <span className="symbol-visible text-5xl">rate_review</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#647e87] font-bold uppercase tracking-widest mt-1 italic">Internal staff field - confidential.</p>
              </div>
            </div>
          </div>

          {/* 4. Assessment & Attachments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-[#f0f3f4] shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="symbol-visible text-[#167b9c]">monitoring</span>
                <h3 className="font-bold text-lg">Stress Level</h3>
              </div>
              <div className="flex justify-between items-center bg-[#f6f7f8] p-5 rounded-xl">
                {['Low', 'Medium', 'High'].map((level) => (
                  <label key={level} className="flex flex-col items-center gap-3 cursor-pointer group">
                    <input className="sr-only peer" name="stress" type="radio" defaultChecked={level === 'Medium'} />
                    <div className="w-12 h-12 rounded-full border-2 border-transparent peer-checked:border-[#167b9c] peer-checked:bg-[#167b9c]/10 flex items-center justify-center transition-all">
                      <span className={`symbol-visible text-2xl ${level === 'Low' ? 'text-green-500' : level === 'Medium' ? 'text-yellow-600' : 'text-red-500'}`}>
                        {level === 'Low' ? 'sentiment_satisfied' : level === 'Medium' ? 'sentiment_neutral' : 'sentiment_very_dissatisfied'}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#647e87] peer-checked:text-[#167b9c]">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-[#f0f3f4] shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="symbol-visible text-[#167b9c]">upload_file</span>
                <h3 className="font-bold text-lg">Documents</h3>
              </div>
              <div className="border-2 border-dashed border-[#e0e0e0] rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-center bg-[#f6f7f8]/50 hover:bg-[#167b9c]/5 hover:border-[#167b9c] transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#167b9c]/10 flex items-center justify-center">
                   <span className="symbol-visible text-[#167b9c]">add_circle</span>
                </div>
                <p className="text-sm font-bold">Upload supporting files</p>
                <p className="text-[10px] text-[#647e87] uppercase font-bold tracking-tight">PDF, PNG (Max 5MB)</p>
              </div>
            </div>
          </div>

          {/* 5. Follow Up & Scheduling */}
          <div className="bg-white rounded-xl border border-[#f0f3f4] shadow-sm p-6 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label className="text-sm font-bold">Schedule Next Session</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 symbol-visible text-[#167b9c] pointer-events-none">event_repeat</span>
                <input className="w-full bg-[#f6f7f8] border-none rounded-lg py-3 pl-11 focus:ring-2 focus:ring-[#167b9c]/20 cursor-pointer text-sm font-medium" type="date" />
              </div>
            </div>
            <div className="p-4 bg-[#167b9c]/5 rounded-xl flex gap-4 w-full md:w-1/2">
              <span className="symbol-visible text-[#167b9c] text-2xl">info</span>
              <div>
                <p className="text-xs font-bold text-[#167b9c]">Auto-Update Trigger</p>
                <p className="text-[11px] leading-relaxed text-[#647e87] font-medium">Saving this record notifies the department head and syncs with the student's personal portal.</p>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <button className="px-6 py-3 rounded-lg text-sm font-bold text-[#647e87] hover:bg-white transition-colors" type="button">Discard Draft</button>
            <button className="bg-[#167b9c] hover:bg-[#126480] text-white px-10 py-3.5 rounded-lg text-sm font-bold shadow-xl shadow-[#167b9c]/20 flex items-center gap-2 transition-transform active:scale-95" type="submit">
              <span className="symbol-visible text-lg">save</span>
              Save Detailed Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionRecordForm;