"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SidebarFeature = ({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="text-[#135bec] mt-0.5">
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
    </div>
    <div>
      <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
    </div>
  </div>
);

const InputField = ({
  label,
  id,
  value,
  onChange,
  icon,
  placeholder,
  type = "text",
}: any) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </span>
      <input
        className="block w-full pl-10 rounded-lg border-gray-300 bg-white text-gray-900 shadow-sm focus:border-[#135bec] focus:ring-[#135bec] sm:text-sm h-11 transition-colors"
        id={id}
        name={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default function CollegeRegistration() {
  const router = useRouter();
  const [form, setForm] = useState({
    CollegeName: "",
    CollegeCode: "",
    Email: "",
    Address: "",
    Phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.CollegeName || !form.CollegeCode || !form.Email) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    // console.log(data)

    if (!res.ok) {
      setError(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    router.push(`/register/setup-admin?CollegeID=${data.college.CollegeID}`);
  };
  return (
    <div className="bg-[#f6f6f8] text-[#111318] font-sans min-h-screen flex flex-col">
      {/* Material Symbols */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
      />

      {/* Header */}
      <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 text-[#135bec] flex items-center justify-center rounded-lg bg-[#135bec]/10">
              <span className="material-symbols-outlined text-[24px]">
                school
              </span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">Mentora</h2>
          </Link>
          {/* <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium hidden sm:block">Already have an account?</span>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <Link href="/login/staff" className="px-3 py-1.5 text-xs font-semibold rounded text-gray-700 hover:bg-white transition-all">Staff Login</Link>
              <Link href="/login/student" className="px-3 py-1.5 text-xs font-semibold rounded text-[#135bec] bg-white shadow-sm ml-1">Student Login</Link>
            </div>
          </div> */}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 py-8 sm:py-12 relative">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#135bec]/5 blur-3xl"></div>
          <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-3xl"></div>
        </div>

        <div className="w-full max-w-[1000px] relative z-10 flex flex-col md:flex-row bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in">
          {/* Sidebar Info */}
          <div className="hidden md:flex flex-col w-1/3 bg-gray-50 border-r border-gray-100 p-8 justify-between relative">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(#135bec 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#135bec] text-white mb-6 shadow-lg shadow-[#135bec]/30">
                <span className="material-symbols-outlined">how_to_reg</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Join the Community
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Register your college to unlock powerful mentorship tools and
                connect students with industry experts.
              </p>

              <div className="space-y-4">
                <SidebarFeature
                  icon="check_circle"
                  title="Streamlined Management"
                  desc="Manage student data efficiently."
                />
                <SidebarFeature
                  icon="check_circle"
                  title="Real-time Analytics"
                  desc="Track engagement and progress."
                />
                <SidebarFeature
                  icon="check_circle"
                  title="Verified Mentors"
                  desc="Access a network of professionals."
                />
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-8">
              <div className="flex -space-x-2 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-300"
                  />
                ))}
                <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 text-xs font-medium">
                  +2k
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium">
                Join 2,000+ registered institutions.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-6 sm:p-10">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                College Registration
              </h1>
              <p className="text-gray-500">
                Create your institutional account to get started.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Institution Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#135bec] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#135bec]"></span>
                  Institution Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="College Name"
                    id="college-name"
                    icon="apartment"
                    placeholder="e.g. Springfield University"
                    value={form.CollegeName}
                    onChange={(e: any) => {
                      setForm({ ...form, CollegeName: e.target.value });
                    }}
                  />
                  <InputField
                    label="Institution Code"
                    id="college-code"
                    icon="pin"
                    placeholder="e.g. SU-2024"
                    value={form.CollegeCode}
                    onChange={(e: any) => {
                      setForm({ ...form, CollegeCode: e.target.value });
                    }}
                  />
                </div>
                <InputField
                  label="Official Website"
                  id="website"
                  icon="language"
                  placeholder="https://www.college.edu"
                  type="url"
                />
              </div>

              <hr className="border-gray-100" />

              {/* Contact Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#135bec] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#135bec]"></span>
                  Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="College Email"
                    id="college-email"
                    icon="mail"
                    placeholder="college@college.ac.in"
                    type="email"
                    value={form.Email}
                    onChange={(e: any) => {
                      setForm({ ...form, Email: e.target.value });
                    }}
                  />
                  <InputField
                    label="Phone Number"
                    id="phone"
                    icon="phone"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={form.Phone}
                    onChange={(e: any) => {
                      setForm({ ...form, Phone: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Campus Address
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-gray-400">
                      <span className="material-symbols-outlined text-[20px]">
                        location_on
                      </span>
                    </span>
                    <textarea
                      className="block w-full pl-10 rounded-lg border-gray-300 focus:border-[#135bec] focus:ring-[#135bec] sm:text-sm py-2.5 transition-colors resize-none"
                      rows={3}
                      placeholder="123 University Ave, City, State"
                      value={form.Address}
                      onChange={(e: any) => {
                        setForm({ ...form, Address: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start pt-2">
                <input
                  className="h-4 w-4 rounded border-gray-300 text-[#135bec] focus:ring-[#135bec] mt-1"
                  id="terms"
                  type="checkbox"
                  required
                />
                <label className="ml-3 text-sm text-gray-600" htmlFor="terms">
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-[#135bec] font-medium hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-[#135bec] font-medium hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              {error && (
                <p className="text-sm text-red-600 font-medium bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}
              <div className="pt-4">
                <button
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-[#135bec] hover:bg-blue-700 transition-all transform hover:scale-[1.01]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register College"}
                  <span className="material-symbols-outlined text-[20px] ml-2">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-gray-200 bg-white">
        <div className="max-w-[960px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#616f89] text-sm font-normal">
            © 2026 Mentora Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="#"
              className="text-[#616f89] hover:text-[#135bec] text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-[#616f89] hover:text-[#135bec] text-sm font-medium transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
