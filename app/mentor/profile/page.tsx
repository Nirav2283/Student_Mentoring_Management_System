import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Camera,
  Key,
  RotateCcw,
  UserCheck,
  Edit3,
} from "lucide-react";
import Link from "next/link";
import { getSessionUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
const ProfileSettings = async () => {
  const sessionUser = await getSessionUser();
  const mentordata = await prisma.mentor.findFirst({
    where:{
      UserID : sessionUser?.UserID
    }
  })

  const getInitials = (name?: string) => {
    if (!name) return "A";

    return name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className=" min-h-screen text-slate-900 font-sans pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Personal Overview */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-slate-50 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg flex items-center justify-center">
                  <span className="text-white text-4xl font-black tracking-wider">
                    {getInitials(sessionUser?.Name)}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-2xl font-bold text-slate-900">
                  {sessionUser?.Name}
                </h1>
                <p className="text-blue-600 font-medium mt-1">
                  {sessionUser?.Role}
                </p>
                <p className="text-slate-500 text-sm mt-2 max-w-xs">
                  {mentordata?.Description}
                </p>
              </div>

              {/* <div className="w-full mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-900">42</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Active Mentees
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-slate-900">4.9</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    Avg Rating
                  </p>
                </div>
              </div> */}
            </div>

            {/* Contact Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <UserCheck className="text-blue-600" size={20} />
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-tight">
                      Email Address
                    </p>
                    <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                     {sessionUser?.Email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-tight">
                      Mobile Number
                    </p>
                    <p className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                     {mentordata?.MobileNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details and Security */}
          <div className="lg:col-span-8 space-y-6">
            {/* Professional Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">
                  Professional Info
                </h3>
              </div>
              <div className="p-6">
                <div className=" gap-8">
                  <div>
                    <p className="text-sm text-slate-400 font-medium mb-1">
                      Primary Department
                    </p>
                    <p className="text-slate-900 font-semibold">
                      {mentordata?.Department}
                    </p>
                    <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="text-sm text-slate-500 leading-relaxed italic">
                        {mentordata?.Education}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            {/* Account Security Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-6 py-5 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  Account Security
                </h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Key size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        Update Password
                      </p>
                      <p className="text-sm text-slate-500">
                        Manage your access and secure your account
                      </p>
                    </div>
                  </div>
                  <Link href={"/mentor/change-password"}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2 whitespace-nowrap">
                      <RotateCcw size={18} />
                      Change Password
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex justify-end items-center gap-4 pt-4">
              <button className="px-6 py-2 border-2 border-slate-200 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors">
                Logout System
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full border-t border-slate-200 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm gap-4">
          <p>© 2026 MentorHub Academic Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-blue-600 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-blue-600 transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-blue-600 transition-colors" href="#">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfileSettings;
