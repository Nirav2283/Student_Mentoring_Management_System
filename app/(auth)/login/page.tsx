"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      // Call the API without 'Role'
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      const userRole = data.user.Role; // The API returns the user object with Role

      if (userRole === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (userRole === "STUDENT") {
        router.push("/student/dashboard");
      } else if (userRole === "MENTOR") {
        router.push("/mentor/dashboard");
      } else {
        setError("Unknown role. Please contact support.");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-[#f6f6f8] text-[#111318] antialiased">
      {/* Material Symbols */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
      />

      <div className="flex min-h-screen w-full flex-row overflow-hidden">
        {/* Left Side: Visual/Branding (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-[#101622] items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
            }}
          ></div>
          <div className="absolute inset-0 z-10 bg-[#135bec]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>

          <div className="relative z-20 flex flex-col items-start justify-end h-full w-full p-16 pb-24 max-w-2xl">
            <div className="mb-6 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 border border-white/20">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Mentora Portal
              </span>
            </div>
            <h1 className="text-4xl font-black text-white leading-tight tracking-tight mb-4">
              Empowering the next generation of leaders.
            </h1>
            <p className="text-lg text-white/80 font-medium leading-relaxed max-w-lg">
              Manage mentorship programs, track student progress, and foster
              academic growth from one central hub.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center items-center bg-white px-6 py-12 lg:px-20 relative">
          <div className="w-full max-w-[440px] flex flex-col gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="size-10 text-[#135bec]">
                <span className="material-symbols-outlined text-4xl">
                  school
                </span>
              </div>
              <span className="text-[#111318] text-xl font-bold tracking-tight">
                Mentora
              </span>
            </Link>

            {/* Heading */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[#111318] text-3xl font-black tracking-tight capitalize">
                Welcome Back
              </h2>
              <p className="text-[#616f89] text-base font-normal">
                Please enter your details to sign in.
              </p>
            </div>

            {/* Form */}
            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <label className="flex flex-col w-full">
                <p className="text-[#111318] text-sm font-medium pb-2">
                  Email Address
                </p>
                <input
                  className="form-input w-full rounded-lg border-[#dbdfe6] focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] h-12 p-[15px] transition-colors"
                  placeholder="name@college.edu"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="flex flex-col w-full">
                <p className="text-[#111318] text-sm font-medium pb-2">
                  Password
                </p>
                <div className="relative flex w-full items-stretch">
                  <input
                    className="form-input w-full rounded-lg border-[#dbdfe6] focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] h-12 p-[15px] pr-12 transition-colors"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-[#616f89] hover:text-[#111318]"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </label>

              <div className="flex justify-end">
                <Link
                  href={`/forgot-password`}
                  className="text-sm font-medium text-[#135bec] hover:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-lg bg-[#135bec] h-12 px-6 text-white text-base font-bold hover:bg-blue-700 transition-all shadow-md mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[#f0f2f4] flex flex-col gap-4 items-center text-center">
              <p className="text-sm text-[#616f89]">
                Having trouble?{" "}
                <Link
                  href="#"
                  className="text-[#111318] font-medium hover:underline"
                >
                  Contact Support
                </Link>
              </p>
              <p className="text-xs text-[#9ca3af]/60">
                © 2026 Mentora System. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}