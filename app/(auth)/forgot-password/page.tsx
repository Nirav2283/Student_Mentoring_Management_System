"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ArrowLeft, Mail, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { trackedFetch } from "@/app/lib/trackedFetch";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await trackedFetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data.error || "Something went wrong";
        setError(errMsg);
        toast.error(errMsg);
        return;
      }

      setMessage(data.message);
      setIsSubmitted(true);
      toast.success("Reset link sent! Check your email.");
    } catch (err) {
      setError("Server error. Please try again.");
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex items-center justify-center p-6">
      <main className="w-full max-w-[440px] flex flex-col items-center">
        {/* Icon */}
        <div className="mb-5 p-4 bg-muted rounded-2xl">
          {isSubmitted ? <Mail className="size-8 text-foreground" /> : <KeyRound className="size-8 text-foreground" />}
        </div>

        <Card className="w-full">
          <CardContent className="p-8 md:p-10">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <CardTitle className="text-2xl md:text-3xl mb-3">
                    Reset your password
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base leading-relaxed">
                    Enter the email address associated with your account and we'll
                    send you a link to reset your password.
                  </CardDescription>
                  {error && (
                    <p className="text-destructive text-sm mt-3 font-semibold">{error}</p>
                  )}
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., student@university.edu"
                      className="h-12"
                    />
                  </div>

                  <Button type="submit" disabled={loading} size="lg" className="w-full">
                    {loading ? "Sending..." : "Send reset link"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-foreground text-2xl font-bold mb-3">
                  Check your email
                </h2>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                  We've sent a password reset link to <br />
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
                <Button variant="outline" size="lg" className="w-full" onClick={() => setIsSubmitted(false)}>
                  Resend email
                </Button>
              </div>
            )}

            {/* Back to Login Link */}
            <div className="mt-8 flex justify-center border-t border-border pt-6">
              <Link
                href="/login"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors group"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>

        {message && (
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-4">
            {message} <br />
            <span className="font-semibold text-foreground">{email}</span>
          </p>
        )}

        <div className="mt-10 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
            Mentora Platform
          </p>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
