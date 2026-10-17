"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { trackedFetch } from "@/app/lib/trackedFetch";

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
    if (!token) { setError("Invalid or missing reset token."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }

    try {
      setLoading(true);
      setError("");
      const res = await trackedFetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = data.error || "Something went wrong";
        setError(errMsg);
        toast.error(errMsg);
        return;
      }

      setSuccess("Password updated successfully! Redirecting to login...");
      toast.success("Password updated successfully!");
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      setError("Server error. Try again.");
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-background min-h-screen flex flex-col items-center justify-center p-6">
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center justify-center size-12 rounded-xl bg-card shadow-sm overflow-hidden border border-border mb-3">
          <img src="/mentora.jpg" alt="Mentora" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-lg font-bold text-foreground">Mentora</h1>
      </div>

      <Card className="w-full max-w-[440px]">
        <CardContent className="p-8 md:p-10">
          <div className="text-center mb-8">
            <CardTitle className="text-2xl mb-2">Set New Password</CardTitle>
            <CardDescription>
              Your identity is verified. Please choose a secure password.
            </CardDescription>

            {error && <p className="text-destructive text-sm font-semibold mt-3">{error}</p>}
            {success && <p className="text-emerald-600 text-sm font-semibold mt-3">{success}</p>}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  className="h-12 pr-12"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <div className="relative">
                <Input
                  className="h-12 pr-12"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="button" className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {passwordsMatch && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                <CheckCircle2 size={16} />
                Passwords match
              </div>
            )}

            <Button type="submit" disabled={loading} size="lg" className="w-full">
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <Link href="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground flex justify-center gap-1 items-center transition-colors">
              <ArrowLeft size={16} />
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Mentora
      </footer>
    </div>
  );
}
