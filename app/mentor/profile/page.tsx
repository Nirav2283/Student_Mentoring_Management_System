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
    <div className=" min-h-screen text-foreground font-sans pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Personal Overview */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Header Card */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-amber-300 bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg flex items-center justify-center">
                  <span className="text-white text-4xl font-black tracking-wider">
                    {getInitials(sessionUser?.Name)}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-2xl font-bold text-foreground">
                  {sessionUser?.Name}
                </h1>
                <p className="text-foreground font-medium mt-1">
                  {sessionUser?.Role}
                </p>
                <p className="text-muted-foreground text-sm mt-2 max-w-xs">
                  {mentordata?.Description}
                </p>
              </div>

              {/* <div className="w-full mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">42</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Active Mentees
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">4.9</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Avg Rating
                  </p>
                </div>
              </div> */}
            </div>

            {/* Contact Info Card */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <UserCheck className="text-amber-500" size={20} />
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-muted group-hover:text-foreground transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">
                      Email Address
                    </p>
                    <p className="text-sm font-medium text-foreground group-hover:text-foreground">
                     {sessionUser?.Email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-muted group-hover:text-foreground transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">
                      Mobile Number
                    </p>
                    <p className="text-sm font-medium text-foreground group-hover:text-foreground">
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
            <div className="bg-card rounded-xl shadow-sm border border-border">
              <div className="px-6 py-5 border-b border-border flex justify-between items-center">
                <h3 className="text-lg font-bold text-foreground">
                  Professional Info
                </h3>
              </div>
              <div className="p-6">
                <div className=" gap-8">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      Primary Department
                    </p>
                    <p className="text-foreground font-semibold">
                      {mentordata?.Department}
                    </p>
                    <div className="mt-4 p-4 rounded-lg bg-muted border border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        {mentordata?.Education}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            {/* Account Security Card */}
            <div className="bg-card rounded-xl shadow-sm border border-border">
              <div className="px-6 py-5 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">
                  Account Security
                </h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 rounded-xl bg-muted border border-dashed border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                      <Key size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">
                        Update Password
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Manage your access and secure your account
                      </p>
                    </div>
                  </div>
                  <Link href={"/mentor/change-password"}>
                    <button className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-2.5 rounded-lg font-bold transition-all shadow-md shadow-amber-200/30 flex items-center justify-center gap-2 whitespace-nowrap">
                      <RotateCcw size={18} />
                      Change Password
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex justify-end items-center gap-4 pt-4">
              <button className="px-6 py-2 border-2 border-border text-foreground font-bold rounded-lg hover:bg-muted transition-colors">
                Logout System
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full border-t border-border mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm gap-4">
          <p>© 2026 MentorHub Academic Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-foreground transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-foreground transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-foreground transition-colors" href="#">
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfileSettings;
