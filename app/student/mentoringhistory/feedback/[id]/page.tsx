"use client";

import React, { useState } from 'react';

export default function SessionFeedbackForm() {
  const [rating, setRating] = useState(4);
  const [helpfulness, setHelpfulness] = useState(5);

  const starLevels = [
    { label: 'POOR', value: 1 },
    { label: 'FAIR', value: 2 },
    { label: 'GOOD', value: 3 },
    { label: 'VERY GOOD', value: 4 },
    { label: 'EXCELLENT', value: 5 },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumbs & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span>Sessions</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-[#135bec]">Submit Feedback</span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 text-3xl font-black tracking-tight">Submit Session Feedback</h1>
            <p className="text-slate-500 text-sm max-w-2xl font-medium">
              Your feedback helps us improve the mentoring experience and track academic progress effectively.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Session Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-8">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">Session Summary</h3>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="size-14 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-[#135bec] font-bold text-xl">
                  SJ
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-lg leading-tight">Dr. Sarah Jenkins</p>
                  {/* <p className="text-[#135bec] text-xs font-bold uppercase tracking-wide">Senior Research Mentor</p> */}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-xl">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Date & Time</p>
                    <p className="text-sm font-bold text-slate-700">Oct 24, 2023 • 2:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-xl">topic</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Agenda</p>
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                      Review of Thesis Chapter 2 and methodology discussion.
                    </p>
                  </div>
                </div>
              </div>

             
            </div>
          </div>

          {/* Right: Feedback Form */}
          <div className="lg:col-span-2">
            <form className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-10">
              
              {/* Rating 1 */}
              <section className="space-y-6">
                <div className="space-y-1">
                  <label className="text-slate-900 text-lg font-black tracking-tight">Overall Satisfaction</label>
                  <p className="text-sm text-slate-500 font-medium">How would you rate the overall quality of this session?</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {starLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setRating(level.value)}
                      className="group flex flex-col items-center gap-2"
                    >
                      <span className={`material-symbols-outlined text-4xl transition-all ${
                        rating >= level.value ? 'text-[#135bec] fill-icon' : 'text-slate-200 group-hover:text-blue-200'
                      }`} style={{ fontVariationSettings: rating >= level.value ? "'FILL' 1" : "'FILL' 0" }}>
                        star
                      </span>
                      <span className={`text-[9px] font-black tracking-tighter uppercase ${
                        rating >= level.value ? 'text-[#135bec]' : 'text-slate-300'
                      }`}>
                        {level.label}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <div className="h-px bg-slate-100 w-full" />

              {/* Rating 2 */}
              {/* <section className="space-y-6">
                <div className="space-y-1">
                  <label className="text-slate-900 text-lg font-black tracking-tight">Mentor's Helpfulness</label>
                  <p className="text-sm text-slate-500 font-medium">Did the mentor address your questions and provide actionable advice?</p>
                </div>
                
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setHelpfulness(num)}
                      className={`material-symbols-outlined text-4xl transition-all ${
                        helpfulness >= num ? 'text-[#135bec]' : 'text-slate-200'
                      }`}
                      style={{ fontVariationSettings: helpfulness >= num ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </button>
                  ))}
                </div>
              </section> */}

              {/* Text Area */}
              <section className="space-y-4">
                <div className="space-y-1">
                  <label className="text-slate-900 text-lg font-black tracking-tight">Comments & Suggestions</label>
                  <p className="text-sm text-slate-500 font-medium">Share your thoughts on what went well or what could be improved.</p>
                </div>
                <textarea 
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl p-4 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] focus:bg-white transition-all outline-none resize-none"
                  placeholder="The methodology discussion was very clear, though I would like more time on Chapter 3 next time..."
                  rows={5}
                />
              </section>

              {/* Actions */}
              <div className="flex items-center justify-end gap-6 pt-6 border-t border-gray-100">
               
                <button 
                  type="submit" 
                  className="px-10 py-3.5 bg-[#135bec] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
                >
                  <span>Submit Feedback</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}