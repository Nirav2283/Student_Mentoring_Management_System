"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { toast } from "sonner";
import { trackedFetch } from "@/app/lib/trackedFetch";

type Props = {
  email: string;
};

const ChangePasswordClient = ({ email }: Props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      const res = await trackedFetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errMsg = data.error || "Something went wrong";
        setMessage(errMsg);
        setMessageType("error");
        toast.error(errMsg);
        return;
      }

      setMessage("Password updated successfully");
      setMessageType("success");
      toast.success("Password updated successfully!");
      setFormData({ oldPassword: "", newPassword: "" });
    } catch {
      setMessage("Server error. Try again.");
      setMessageType("error");
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-[480px]">
        <Card>
          <CardContent className="p-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center size-14 rounded-full bg-muted text-foreground mb-4">
                <Lock className="size-7" />
              </div>
              <h1 className="text-foreground text-2xl font-bold mb-2">Change Password</h1>
              <p className="text-muted-foreground text-sm">
                Keep your account secure by choosing a strong password you haven't used before.
              </p>
              {message && (
                <div className={`mt-4 text-sm font-semibold text-center ${messageType === "success" ? "text-green-600" : "text-red-500"}`}>
                  {message}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Input className="pr-10 bg-muted cursor-not-allowed" readOnly type="email" value={email} />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                </div>
              </div>

              {/* Old Password */}
              <div className="flex flex-col gap-2">
                <Label>Current Password</Label>
                <div className="relative">
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    value={formData.oldPassword}
                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                    placeholder="Enter current password"
                    required
                  />
                  <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-0 top-0 h-full px-3 flex items-center text-muted-foreground">
                    {showOldPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-2">
                <Label>New Password</Label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    placeholder="Create a strong password"
                    required
                  />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-0 top-0 h-full px-3 flex items-center text-muted-foreground">
                    {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                <div className="flex gap-1.5 mt-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className={`h-1 flex-1 rounded-full ${formData.newPassword.length >= step * 2 ? "bg-primary" : "bg-muted"}`} />
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ChangePasswordClient;
