"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from "next/navigation";
import { School, Eye, EyeOff, CheckCircle2, ArrowLeft, LifeBuoy } from 'lucide-react';

export default function ResetPasswordForm() {

  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSuccess("Password updated successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 3000);

    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6">

      <div className="mb-8 flex flex-col items-center">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-3">
          <School className="text-white w-7 h-7" />
        </div>
        <h1 className="text-lg font-bold text-slate-900">Mentorship Portal</h1>
      </div>

      <main className="w-full max-w-[440px] bg-white rounded-2xl border p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Set New Password</h2>
          <p className="text-slate-500 text-sm">
            Your identity is verified. Please choose a secure password.
          </p>

          {error && (
            <p className="text-red-500 text-sm font-semibold mt-3">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm font-semibold mt-3">{success}</p>
          )}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* New Password */}
          <div>
            <label className="text-sm font-semibold">New Password</label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 border rounded-lg mt-1"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <button type="button" className="absolute right-3 top-4"
                onClick={()=>setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold">Confirm Password</label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 border rounded-lg mt-1"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
              <button type="button" className="absolute right-3 top-4"
                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {passwordsMatch && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle2 size={16} />
              Passwords match
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg disabled:opacity-50"
            type="submit"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <Link href="/login" className="text-sm font-semibold text-slate-500 hover:text-blue-600 flex justify-center gap-1 items-center">
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </main>

      <footer className="mt-8 text-xs text-slate-400">
        © {new Date().getFullYear()} Mentorship Portal
      </footer>
    </div>
  );
}
