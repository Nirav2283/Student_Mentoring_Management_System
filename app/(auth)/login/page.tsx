"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { trackedFetch } from "@/app/lib/trackedFetch";

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
      const res = await trackedFetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data.error || "Login failed";
        setError(errMsg);
        toast.error(errMsg);
        return;
      }

      const userRole = data.user.Role;
      toast.success("Login successful! Redirecting...");
      if (userRole === "ADMIN") router.push("/admin/dashboard");
      else if (userRole === "STUDENT") router.push("/student/dashboard");
      else if (userRole === "MENTOR") router.push("/mentor/dashboard");
      else setError("Unknown role. Please contact support.");
    } catch (err) {
      setError("Something went wrong");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-background text-foreground antialiased">

      <div className="flex min-h-screen w-full flex-row overflow-hidden">
        {/* Left Side: Visual/Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-neutral-900 items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
            }}
          />
          <div className="absolute inset-0 z-10 bg-neutral-900/75" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="relative z-20 flex flex-col items-start justify-end h-full w-full p-16 pb-24 max-w-2xl">
            <div className="mb-6 rounded-full bg-card/10 backdrop-blur-sm px-4 py-1.5 border border-white/20">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Mentora Portal
              </span>
            </div>
            <h1 className="text-4xl font-black text-white leading-tight tracking-tight mb-4">
              Empowering the next generation of leaders.
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-lg">
              Manage mentorship programs, track student progress, and foster
              academic growth from one central hub.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex w-full lg:w-1/2 flex-col justify-center items-center bg-card px-6 py-12 lg:px-20 relative">
          <div className="w-full max-w-[440px] flex flex-col gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-card shadow-sm overflow-hidden border border-border">
                <img src="/mentora.jpg" alt="Mentora" className="w-full h-full object-cover" />
              </div>
              <span className="text-foreground text-xl font-bold tracking-tight">
                Mentora
              </span>
            </Link>

            <Card className="border-0 shadow-none">
              <CardHeader className="px-0">
                <CardTitle className="text-3xl font-black tracking-tight">
                  Welcome Back
                </CardTitle>
                <CardDescription>
                  Please enter your details to sign in.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0">
                <form
                  className="flex flex-col gap-5 w-full"
                  onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      className="h-12"
                      placeholder="name@college.edu"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        className="h-12 pr-12"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {error && (
                    <p className="text-destructive text-sm font-medium bg-destructive/10 p-3 rounded-lg">{error}</p>
                  )}

                  <Button type="submit" disabled={loading} size="lg" className="w-full mt-2">
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-4 pt-6 border-t border-border flex flex-col gap-4 items-center text-center">
              <p className="text-sm text-muted-foreground">
                Having trouble?{" "}
                <span className="text-foreground font-medium">Contact Support</span>
              </p>
              <p className="text-xs text-muted-foreground/50">
                © 2026 Mentora System. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}