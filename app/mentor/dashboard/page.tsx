import React from 'react';
import { 
  Users, 
  Calendar, 
  Search, 
  TrendingUp, 
  AlertCircle, 
  Video 
} from 'lucide-react';

const MentorshipDashboard = () => {
  return (
    <div className="min-h-screen bg-[#f6f6f8] p-4 md:p-8 font-sans text-[#111318]">
      <div className="max-w-7xl mx-auto">
        
        {/* Simple Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome back, John</h1>
            <p className="text-gray-500 mt-1">Summary of mentoring activity for today.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm shadow-sm" 
              placeholder="Search records..." 
              type="text"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <StatCard label="Total Students" value="42" color="blue" />
          <StatCard label="Upcoming Meetings" value="8" trend="Next meeting at 2:00 PM" color="purple" />
          <StatCard label="Pending Mentoring" value="5" trend="Requires attention" color="orange" isAlert />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Upcoming Meetings Table (Cleaned) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="text-blue-600" size={20} />
                  Upcoming Mentoring Meetings
                </h2>
                <button className="text-sm text-blue-600 font-semibold hover:underline">View All</button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <MeetingRow time="09:00 AM" date="Today" name="Sarah Miller" />
                    <MeetingRow time="11:30 AM" date="Today" name="Alex Wong" />
                    <MeetingRow time="02:00 PM" date="Next Up" name="Emma Johnson" isNext />
                  </tbody>
                </table>
              </div>
            </section>

            {/* Pending Students Table */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="text-orange-500" size={20} />
                  Pending Students for Mentoring
                </h2>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <PendingRow name="Michael Chen" reason="Absent" statusColor="red" />
                    <PendingRow name="Liam Wilson" reason="Absent" statusColor="red" />
                    <PendingRow name="Sophia Taylor" reason="Absent" statusColor="red" />
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Alerts Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 px-1">
              <AlertCircle className="text-orange-500" size={20} />
              Priority Alerts
            </h2>
            <div className="space-y-3">
              <AlertCard 
                title="Action Required" 
                desc="Sarah Miller has missed sessions." 
                color="red" 
                action="Message Student" 
              />
              <AlertCard 
                title="Deadline Approaching" 
                desc="Mid-term feedback forms due tomorrow." 
                color="orange" 
                action="Open Forms" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Updated Sub-components ---

const StatCard = ({ label, value, trend, color, isAlert = false }: any) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <span className={`p-2 rounded-lg ${colorMap[color]}`}>
            <TrendingUp size={18} />
        </span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className={`text-sm font-medium ${isAlert ? 'text-red-500' : 'text-green-600'}`}>
        {trend}
      </p>
    </div>
  );
};

const MeetingRow = ({ time, date, name, isNext = false }: any) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex flex-col">
        <span className={`text-sm font-bold ${isNext ? 'text-blue-600' : 'text-gray-900'}`}>{time}</span>
        <span className="text-[10px] text-gray-400">{date}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-slate-200" />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-right">
      {/* Video icon only shows for 'Next Up' session, otherwise empty to keep layout clean */}
      {isNext && (
        <button className="p-1 text-blue-600 hover:text-blue-700">
          <h1 className='text-sm font-bold'>Next turn</h1>
        </button>
      )}
    </td>
  </tr>
);

const PendingRow = ({ name, reason, statusColor }: any) => {
    const colors: any = {
        red: "bg-red-50 text-red-700",
        orange: "bg-orange-50 text-orange-700",
        blue: "bg-blue-50 text-blue-700"
    };
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                        {name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium">{name}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${colors[statusColor]}`}>{reason}</span>
            </td>
            {/* <td className="px-6 py-4 text-right">
                <button className="text-xs font-bold text-blue-600 hover:underline">Review</button>
            </td> */}
        </tr>
    );
};

const AlertCard = ({ title, desc, color, action }: any) => {
  const styles: any = {
    red: "bg-red-50 border-red-100 text-red-900",
    orange: "bg-orange-50 border-orange-100 text-orange-900"
  };
  return (
    <div className={`p-4 border rounded-xl relative overflow-hidden ${styles[color]}`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${color === 'red' ? 'bg-red-500' : 'bg-orange-500'}`}></div>
      <div className="flex gap-3">
        <AlertCircle size={20} className={color === 'red' ? 'text-red-500' : 'text-orange-500'} />
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-xs mt-1 leading-relaxed opacity-80">{desc}</p>
          <button className="mt-2 text-xs font-bold underline underline-offset-2">{action}</button>
        </div>
      </div>
    </div>
  );
};

export default MentorshipDashboard;