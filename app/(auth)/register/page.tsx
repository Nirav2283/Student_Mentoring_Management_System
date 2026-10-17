"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { ArrowRight, CheckCircle, Building2, Users } from "lucide-react";
import { trackedFetch } from "@/app/lib/trackedFetch";

const SidebarFeature = ({ title, desc }: { title: string; desc: string }) => (
  <div className="flex items-start gap-3">
    <CheckCircle className="size-5 text-foreground mt-0.5 shrink-0" />
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
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
      setError("All fields are required"); setLoading(false); return;
    }

    const res = await trackedFetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) { setError(data.error || "Registration failed"); setLoading(false); return; }

    router.push(`/register/setup-admin?CollegeID=${data.college.CollegeID}`);
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border bg-card/80 backdrop-blur-md top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center size-8 rounded-lg bg-card shadow-sm overflow-hidden border border-border">
              <img src="/mentora.jpg" alt="Mentora" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg font-bold tracking-tight">Mentora</h2>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 py-8 sm:py-12 relative">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-muted blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-muted/50 blur-3xl" />
        </div>

        <div className="w-full max-w-[1000px] relative z-10 flex flex-col md:flex-row overflow-hidden animate-fade-in">
          {/* Sidebar Info */}
          <Card className="hidden md:flex flex-col w-1/3 rounded-r-none border-r-0">
            <CardContent className="p-8 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-6 shadow-sm">
                  <Users className="size-5" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Join the Community
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Register your college to unlock powerful mentorship tools and
                  connect students with industry experts.
                </p>

                <div className="space-y-4">
                  <SidebarFeature title="Streamlined Management" desc="Manage student data efficiently." />
                  <SidebarFeature title="Real-time Analytics" desc="Track engagement and progress." />
                  <SidebarFeature title="Verified Mentors" desc="Access a network of professionals." />
                </div>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex -space-x-2 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-card bg-muted" />
                  ))}
                  <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-card bg-secondary text-xs font-medium">+2k</div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  Join 2,000+ registered institutions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Form Content */}
          <Card className="flex-1 md:rounded-l-none md:border-l-0">
            <CardContent className="p-6 sm:p-10">
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  College Registration
                </h1>
                <p className="text-muted-foreground">
                  Create your institutional account to get started.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Institution Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Building2 className="size-3" />
                    Institution Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="college-name">College Name</Label>
                      <Input id="college-name" placeholder="e.g. Springfield University" className="h-11"
                        value={form.CollegeName} onChange={(e) => setForm({ ...form, CollegeName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="college-code">Institution Code</Label>
                      <Input id="college-code" placeholder="e.g. SU-2024" className="h-11"
                        value={form.CollegeCode} onChange={(e) => setForm({ ...form, CollegeCode: e.target.value })} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Building2 className="size-3" />
                    Contact Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="college-email">College Email</Label>
                      <Input id="college-email" type="email" placeholder="college@college.ac.in" className="h-11"
                        value={form.Email} onChange={(e) => setForm({ ...form, Email: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="h-11"
                        value={form.Phone} onChange={(e) => setForm({ ...form, Phone: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Campus Address</Label>
                    <Textarea id="address" rows={3} placeholder="123 University Ave, City, State"
                      value={form.Address} onChange={(e) => setForm({ ...form, Address: e.target.value })} />
                  </div>
                </div>

                <div className="flex items-start pt-2">
                  <input className="h-4 w-4 rounded border-input mt-1" id="terms" type="checkbox" required />
                  <label className="ml-3 text-sm text-muted-foreground" htmlFor="terms">
                    I agree to the{" "}
                    <Link href="#" className="text-foreground font-medium hover:underline">Terms of Service</Link>{" "}
                    and{" "}
                    <Link href="#" className="text-foreground font-medium hover:underline">Privacy Policy</Link>.
                  </label>
                </div>

                {error && (
                  <p className="text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-lg">{error}</p>
                )}

                <Button type="submit" disabled={loading} size="lg" className="w-full">
                  {loading ? "Registering..." : "Register College"}
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-border bg-card">
        <div className="max-w-[960px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm">
            © 2026 Mentora Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">About</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">Help Center</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
