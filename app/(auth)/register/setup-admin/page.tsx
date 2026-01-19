"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SetupAdminAccount() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const collegeidUrl = searchParams.get("CollegeID");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    CollegeID: collegeidUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.Name || !form.Email || !form.Password || !form.ConfirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (form.Password !== form.ConfirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!form.CollegeID) {
      setError("Invalid registration link");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/setup-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: form.Name,
        Email: form.Email,
        Password: form.Password,
        CollegeID: form.CollegeID,
      }),
    });

    const data = await res.json();
    // console.log(data)

    if (!res.ok) {
      setError(data.error || "Account Creation failed");
      setLoading(false);
      return;
    }

    router.push(`/success`);
  };

  return (
    <div className="bg-[#f6f6f8] text-slate-900 font-sans min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-3">
          <span className="material-symbols-outlined text-[#135bec] text-4xl">
            school
          </span>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Mentora
          </span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Set up your admin account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Complete your registration details below to start managing your
          mentorship program.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[540px]">
        <div className="bg-white px-4 py-8 shadow-xl sm:rounded-xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-900">
                Full Name
              </label>
              <div className="mt-2 relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-[20px]">
                  person
                </span>
                <input
                  className="block w-full rounded-lg border-gray-300 py-3 pl-10 focus:ring-2 focus:ring-[#135bec] focus:border-[#135bec]"
                  placeholder="Dr. John Doe"
                  required
                  value={form.Name}
                  onChange={(e) => setForm({ ...form, Name: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-900">
                Email Address
              </label>
              <div className="mt-2 relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  className="block w-full rounded-lg border-gray-300 py-3 pl-10 focus:ring-2 focus:ring-[#135bec] focus:border-[#135bec]"
                  placeholder="admin@college.edu"
                  required
                  value={form.Email}
                  onChange={(e) => setForm({ ...form, Email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900">
                  Password
                </label>
                <div className="mt-2 relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-[20px]">
                    lock
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="block w-full rounded-lg border-gray-300 py-3 pl-10 pr-10 focus:ring-2 focus:ring-[#135bec] focus:border-[#135bec]"
                    placeholder="••••••••"
                    required
                    value={form.Password}
                    onChange={(e) =>
                      setForm({ ...form, Password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900">
                  Confirm Password
                </label>
                <div className="mt-2 relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400 text-[20px]">
                    lock
                  </span>
                  <input
                    type="text"
                    className="block w-full rounded-lg border-gray-300 py-3 pl-10 pr-10 focus:ring-2 focus:ring-[#135bec] focus:border-[#135bec]"
                    placeholder="••••••••"
                    required
                    value={form.ConfirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, ConfirmPassword: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[#135bec] mt-1"
                required
              />
              <label className="ml-3 text-sm text-slate-600">
                I agree to the{" "}
                <Link href="#" className="font-semibold text-[#135bec]">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="font-semibold text-[#135bec]">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-lg bg-[#135bec] px-3 py-3 text-sm font-bold text-white shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5"
            >
              {loading ? "Creating..." : "Create Account "}
            </button>

            <div className="text-center pt-4 border-t border-slate-100">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 hover:text-[#135bec] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">
                  arrow_back
                </span>
                Back to Registration
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
