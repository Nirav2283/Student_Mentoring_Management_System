"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent } from "@/app/components/ui/card";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function SetupAdminForm() {
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
      setError("All fields are required"); setLoading(false); return;
    }
    if (form.Password !== form.ConfirmPassword) {
      setError("Passwords do not match"); setLoading(false); return;
    }
    if (!form.CollegeID) {
      setError("Invalid registration link"); setLoading(false); return;
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
    if (!res.ok) { setError(data.error || "Account Creation failed"); setLoading(false); return; }

    router.push("/success");
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-card shadow-sm overflow-hidden border border-border">
            <img src="/mentora.jpg" alt="Mentora" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            Mentora
          </span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          Set up your admin account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Complete your registration details below to start managing your mentorship program.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[540px]">
        <Card>
          <CardContent className="p-6 sm:p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  className="h-12"
                  placeholder="Dr. John Doe"
                  required
                  value={form.Name}
                  onChange={(e) => setForm({ ...form, Name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-12"
                  placeholder="admin@college.edu"
                  required
                  value={form.Email}
                  onChange={(e) => setForm({ ...form, Email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="h-12 pr-12"
                    placeholder="••••••••"
                    required
                    value={form.Password}
                    onChange={(e) => setForm({ ...form, Password: e.target.value })}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="text"
                  className="h-12"
                  placeholder="••••••••"
                  required
                  value={form.ConfirmPassword}
                  onChange={(e) => setForm({ ...form, ConfirmPassword: e.target.value })}
                />
              </div>

              <div className="flex items-start">
                <input type="checkbox" className="h-4 w-4 rounded border-input mt-1" required />
                <label className="ml-3 text-sm text-muted-foreground">
                  I agree to the{" "}
                  <span className="font-semibold text-foreground">Terms</span>{" "}
                  and{" "}
                  <span className="font-semibold text-foreground">Privacy Policy</span>.
                </label>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg font-medium">{error}</p>
              )}

              <Button type="submit" disabled={loading} size="lg" className="w-full">
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <div className="text-center pt-4 border-t border-border">
                <Link href="/register"
                  className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft size={14} />
                  Back to Registration
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
