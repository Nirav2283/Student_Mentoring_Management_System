"use client";

import React from 'react';

interface ReportsClientProps {
    totalStudents: number;
    totalMentors: number;
    totalSessions: number;
    pendingSessions: number;
    avgRatingMentor: string;
    avgRatingStudent: string;
    monthlySessions: number;
    attendanceStats: number;
    chartData: number[]; // Array of 12 numbers for each month
}

const ReportsClient: React.FC<ReportsClientProps> = ({
    totalStudents,
    totalMentors,
    totalSessions,
    pendingSessions,
    avgRatingMentor,
    avgRatingStudent,
    monthlySessions,
    attendanceStats,
    chartData
}) => {
    // Calculate trends (mock logic for now as we don't have historical data for everything)
    // In a real app, you'd pass previous values to calculate these.

    return (
        <div className="bg-[#f6f6f8] min-h-screen text-[#111318] font-sans selection:bg-blue-100">
            {/* Material Symbols Font Link */}
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-[#111318]">
                            Advanced Reports and Analytics
                        </h1>
                        <p className="text-gray-500 mt-2 text-base">
                            Real-time performance metrics and historical data analysis.
                        </p>
                    </div>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Total students", value: totalStudents.toLocaleString(), trend: "+4.2%", trendColor: "text-green-600" },
                        { label: "Total mentors", value: totalMentors.toLocaleString(), trend: "Stable", trendColor: "text-gray-400" },
                        { label: "Total sessions", value: totalSessions.toLocaleString(), trend: "+12%", trendColor: "text-green-600" },
                        { label: "Pending sessions", value: pendingSessions.toLocaleString(), trend: "-5%", trendColor: "text-orange-600" },
                        { label: "Avg rating per mentor", value: avgRatingMentor, icon: "star", trend: "Top Tier", trendColor: "text-gray-400" },
                        { label: "Avg rating per student", value: avgRatingStudent, icon: "star", trend: "+0.3", trendColor: "text-green-600" },
                        { label: "Monthly sessions", value: monthlySessions.toLocaleString(), trend: "This Month", trendColor: "text-[#135bec]" },
                        { label: "Attendance stats", value: `${attendanceStats.toFixed(1)}%`, progress: attendanceStats },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-32">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <div className="flex items-end justify-between">
                                <div className="flex items-center gap-1">
                                    <h3 className="text-2xl font-black">{stat.value}</h3>
                                    {stat.icon && <span className="material-symbols-outlined text-yellow-500 fill-1 text-xl">star</span>}
                                </div>
                                {stat.trend && <span className={`text-xs font-bold ${stat.trendColor}`}>{stat.trend}</span>}
                                {stat.progress !== undefined && (
                                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full" style={{ width: `${stat.progress}%` }}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Line Chart Component */}
                    <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-xl font-black">Mentoring Sessions per Month</h2>
                                <p className="text-sm text-gray-500">Yearly trend of completed mentoring sessions</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#135bec]"></span>
                                    <span className="text-xs font-bold text-gray-500">Current Year</span>
                                </div>
                                {/* <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span>
                  <span className="text-xs font-bold text-gray-500">Previous Year</span>
                </div> */}
                            </div>
                        </div>

                        <div className="h-[280px] w-full relative flex flex-col justify-end">
                            <div className="absolute inset-0 flex flex-col justify-between py-1">
                                {[...Array(5)].map((_, i) => <div key={i} className="border-t border-gray-50 w-full h-px"></div>)}
                            </div>
                            <svg className="relative w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                                {/* Generate path data from chartData */}
                                {(() => {
                                    const maxVal = Math.max(...chartData, 10); // avoid div by zero
                                    const points = chartData.map((val, i) => {
                                        const x = (i / 11) * 1000;
                                        const y = 300 - (val / maxVal) * 280; // Scale to fit height, leaving some padding
                                        return `${x},${y}`;
                                    });

                                    // Bezier curve approximation or simple line
                                    // For simplicity, let's do a polyline or a simple curved path if possible. 
                                    // Let's stick to the previous style's manual path construction but dynamic.

                                    // Construct 'L' path commands
                                    const p = points.map((pt, i) => (i === 0 ? `M${pt}` : `L${pt}`)).join(" ");

                                    return (
                                        <>
                                            <path d={p} fill="none" stroke="#135bec" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            {points.map((pt, i) => {
                                                const [cx, cy] = pt.split(',');
                                                return (
                                                    <circle key={i} cx={cx} cy={cy} r="6" fill="#135bec" stroke="white" strokeWidth="2" className="hover:r-8 transition-all" />
                                                );
                                            })}
                                        </>
                                    )
                                })()}
                            </svg>
                            <div className="flex justify-between mt-6 px-2 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
                            </div>
                        </div>
                    </div>

                    {/* Donut Chart Component */}
                    <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                        <h2 className="text-xl font-black mb-1">Attendance</h2>
                        <p className="text-sm text-gray-500 mb-10">Participation breakdown</p>
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    {/* Background Circle */}
                                    <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" strokeWidth="4" />

                                    {/* Attendance Circle */}
                                    {/* Circumference = 2 * pi * 16 ≈ 100.5. Let's use 100 for dasharray calculations. */}
                                    {/* Dasharray: first value is the length of the dash (percentage), second is the gap properly. */}
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        fill="none"
                                        stroke="#135bec"
                                        strokeWidth="4"
                                        strokeDasharray={`${attendanceStats} 100`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black">{attendanceStats.toFixed(0)}%</span>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Average</span>
                                </div>
                            </div>
                            <div className="w-full mt-10 space-y-3">
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#135bec]"></span>
                                        <span className="text-gray-500">Present</span>
                                    </div>
                                    <span>{attendanceStats.toFixed(1)}%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                                        <span className="text-gray-500">Other</span>
                                    </div>
                                    <span>{(100 - attendanceStats).toFixed(1)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default ReportsClient;
