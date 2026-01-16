"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const AdminProfileSettings = () => {
  const initialData = {
    name: "Sarah Jenkins",
    email: "sarah.jenkins@university.edu"
  };

  const [adminName, setAdminName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [isDark, setIsDark] = useState(false);

  const isDirty = adminName !== initialData.name || email !== initialData.email;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleDiscard = () => {
    setAdminName(initialData.name);
    setEmail(initialData.email);
  };

  return (
    <div className={` min-h-screen font-sans transition-colors duration-300 pb-32`}>

      {/* Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap" rel="stylesheet" />

      <main className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-3">Profile Settings</h1>
            <p className={`${isDark ? "text-slate-400" : "text-[#616f89]"} text-lg`}>
              Manage your account identity and contact information.
            </p>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all 
              ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-gray-100 border-gray-200 text-black"}`}
          >
            <span className="material-symbols-outlined text-sm">
              {isDark ? "dark_mode" : "light_mode"}
            </span>
            {isDark ? "Dark" : "Light"}
          </button>
        </div>

        {/* Section 1: Public Identity */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6 text-[#135bec]">
            <span className="material-symbols-outlined font-bold">account_circle</span>
            <h3 className="text-sm font-black uppercase tracking-widest">Public Identity</h3>
          </div>

          <div className="space-y-8">
            <div className={`flex items-center gap-8 p-8 rounded-3xl border
              ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#f8f9fb] border-[#edf0f5]"}`}>
              <div className="size-20 rounded-2xl bg-[#135bec] flex items-center justify-center text-white text-3xl font-bold shrink-0">
                {getInitials(adminName)}
              </div>
              <div>
                <h4 className="font-bold mb-1">Profile Picture</h4>
                <p className={`${isDark ? "text-slate-400" : "text-[#616f89]"} text-sm mb-4`}>
                  Visual identity for internal mentor directories.
                </p>
                <button className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors
                  ${isDark ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700" : "bg-white border-gray-300 text-black hover:bg-gray-50"}`}>
                  Upload New Image
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[11px] font-black uppercase mb-2">Display Name</label>
                <input
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className={`w-full rounded-2xl px-4 py-3.5 text-sm outline-none border transition-all focus:border-[#135bec]
                    ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-gray-300 text-black"}`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-black uppercase mb-2">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-2xl px-4 py-3.5 text-sm outline-none border transition-all focus:border-[#135bec]
                    ${isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-gray-300 text-black"}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Security (NEW) */}
        <section>
          <div className="flex items-center gap-2 mb-6 text-[#135bec]">
            <span className="material-symbols-outlined font-bold">lock</span>
            <h3 className="text-sm font-black uppercase tracking-widest">Security</h3>
          </div>

          <div className={`p-8 rounded-3xl border flex items-center justify-between
            ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#f8f9fb] border-[#edf0f5]"}`}>
            <div>
              <h4 className="font-bold mb-1">Account Password</h4>
              <p className={`${isDark ? "text-slate-400" : "text-[#616f89]"} text-sm`}>
                Update your password to keep your account secure.
              </p>
            </div>
            <Link href={`change-password`}><button className="flex items-center gap-2 px-5 py-2.5 bg-[#135bec] text-white rounded-xl text-xs font-black hover:bg-[#0e49c5] transition-colors">
              <span className="material-symbols-outlined text-sm">key</span>
              Change Password
            </button></Link>
          </div>
        </section>

      </main>

      {/* Floating Footer */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#111318] rounded-2xl p-4 flex justify-between shadow-2xl transition-all duration-500 z-50 ${isDirty ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}>
        <p className="text-white text-sm font-bold flex items-center px-2">You have unsaved changes</p>
        <div className="flex gap-3">
          <button onClick={handleDiscard} className="text-gray-400 hover:text-white text-xs font-bold px-4">
            Discard
          </button>
          <button className="bg-[#135bec] text-white px-6 py-2.5 rounded-xl text-xs font-black">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileSettings;