"use client";

import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

interface ReportsClientProps {
    totalStudents: number;
    totalMentors: number;
    totalSessions: number;
    pendingSessions: number;
    avgRatingMentor: string;
    avgRatingStudent: string;
    monthlySessions: number;
    attendanceStats: number;
    chartData: number[];
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
    return (
        <div className="bg-background min-h-screen text-foreground">
            <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-foreground">
                            Advanced Reports and Analytics
                        </h1>
                        <p className="text-muted-foreground mt-2 text-base">
                            Real-time performance metrics and historical data analysis.
                        </p>
                    </div>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Total students", value: totalStudents.toLocaleString(), trend: "+4.2%", trendColor: "text-green-600" },
                        { label: "Total mentors", value: totalMentors.toLocaleString(), trend: "Stable", trendColor: "text-muted-foreground" },
                        { label: "Total sessions", value: totalSessions.toLocaleString(), trend: "+12%", trendColor: "text-green-600" },
                        { label: "Pending sessions", value: pendingSessions.toLocaleString(), trend: "-5%", trendColor: "text-orange-600" },
                        { label: "Avg rating per mentor", value: avgRatingMentor, icon: true, trend: "Top Tier", trendColor: "text-muted-foreground" },
                        { label: "Avg rating per student", value: avgRatingStudent, icon: true, trend: "+0.3", trendColor: "text-green-600" },
                        { label: "Monthly sessions", value: monthlySessions.toLocaleString(), trend: "This Month", trendColor: "text-primary" },
                        { label: "Attendance stats", value: `${attendanceStats.toFixed(1)}%`, progress: attendanceStats },
                    ].map((stat, idx) => (
                        <Card key={idx}>
                            <CardContent className="p-6 flex flex-col justify-between h-32">
                                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                <div className="flex items-end justify-between">
                                    <div className="flex items-center gap-1">
                                        <h3 className="text-2xl font-black">{stat.value}</h3>
                                        {stat.icon && <Star className="size-5 text-yellow-500 fill-yellow-500" />}
                                    </div>
                                    {stat.trend && <span className={`text-xs font-bold ${stat.trendColor}`}>{stat.trend}</span>}
                                    {stat.progress !== undefined && (
                                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="bg-green-500 h-full" style={{ width: `${stat.progress}%` }}></div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Line Chart */}
                    <Card className="lg:col-span-8">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-xl font-black">Mentoring Sessions per Month</h2>
                                    <p className="text-sm text-muted-foreground">Yearly trend of completed mentoring sessions</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                                        <span className="text-xs font-bold text-muted-foreground">Current Year</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[280px] w-full relative flex flex-col justify-end">
                                <div className="absolute inset-0 flex flex-col justify-between py-1">
                                    {[...Array(5)].map((_, i) => <div key={i} className="border-t border-border w-full h-px"></div>)}
                                </div>
                                <svg className="relative w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                                    {(() => {
                                        const maxVal = Math.max(...chartData, 10);
                                        const points = chartData.map((val, i) => {
                                            const x = (i / 11) * 1000;
                                            const y = 300 - (val / maxVal) * 280;
                                            return `${x},${y}`;
                                        });
                                        const p = points.map((pt, i) => (i === 0 ? `M${pt}` : `L${pt}`)).join(" ");
                                        return (
                                            <>
                                                <path d={p} fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                {points.map((pt, i) => {
                                                    const [cx, cy] = pt.split(',');
                                                    return (
                                                        <circle key={i} cx={cx} cy={cy} r="6" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="2" />
                                                    );
                                                })}
                                            </>
                                        );
                                    })()}
                                </svg>
                                <div className="flex justify-between mt-6 px-2 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Donut Chart */}
                    <Card className="lg:col-span-4">
                        <CardContent className="p-8 flex flex-col h-full">
                            <h2 className="text-xl font-black mb-1">Attendance</h2>
                            <p className="text-sm text-muted-foreground mb-10">Participation breakdown</p>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <div className="relative w-48 h-48">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                        <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                                        <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeDasharray={`${attendanceStats} 100`} />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-black">{attendanceStats.toFixed(0)}%</span>
                                        <span className="text-[10px] text-muted-foreground font-bold uppercase">Average</span>
                                    </div>
                                </div>
                                <div className="w-full mt-10 space-y-3">
                                    <div className="flex items-center justify-between text-xs font-bold">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                                            <span className="text-muted-foreground">Present</span>
                                        </div>
                                        <span>{attendanceStats.toFixed(1)}%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs font-bold">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-muted"></span>
                                            <span className="text-muted-foreground">Other</span>
                                        </div>
                                        <span>{(100 - attendanceStats).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default ReportsClient;
