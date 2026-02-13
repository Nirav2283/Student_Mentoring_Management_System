"use client";

import React, { useState } from "react";

type Props = {
  email: string;
};

const ChangePasswordClient = ({ email }: Props) => {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      const res = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
        setMessageType("error");
        return;
      }

      setMessage("Password updated successfully");
      setMessageType("success");

      // clear fields
      setFormData({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      setMessage("Server error. Try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans flex items-center justify-center p-4">
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
        rel="stylesheet"
      />

      <main className="w-full max-w-[480px]">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center size-14 rounded-full bg-blue-50 text-blue-700 mb-4">
              <span className="material-symbols-outlined text-3xl">
                lock_reset
              </span>
            </div>
            <h1 className="text-gray-900 text-2xl font-bold mb-2">
              Change Password
            </h1>
            <p className="text-gray-500 text-sm">
              Keep your account secure by choosing a strong password you haven't
              used before.
            </p>
            {message && (
              <div
                className={`mt-4 text-sm font-semibold text-center ${
                  messageType === "success" ? "text-green-600" : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-xs font-bold uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-xl border border-gray-100 bg-gray-50 text-gray-400 h-12 px-4 text-sm cursor-not-allowed outline-none"
                  readOnly
                  type="email"
                  value={email}
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 text-[20px]">
                  lock
                </span>
              </div>
            </div>

            {/* Old Password */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-xs font-bold uppercase tracking-wider">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={formData.oldPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, oldPassword: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 h-12 px-4 pr-12 text-sm outline-none"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-0 top-0 h-full px-4 flex items-center"
                >
                  <span className="material-symbols-outlined">
                    {showOldPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 text-xs font-bold uppercase tracking-wider">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 h-12 px-4 pr-12 text-sm outline-none"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-0 top-0 h-full px-4 flex items-center"
                >
                  <span className="material-symbols-outlined">
                    {showNewPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>

              {/* Strength bar */}
              <div className="flex gap-1.5 mt-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1 flex-1 rounded-full ${
                      formData.newPassword.length >= step * 2
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold h-12 rounded-xl disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChangePasswordClient;
