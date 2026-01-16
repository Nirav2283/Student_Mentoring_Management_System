"use client";

import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans flex items-center justify-center p-6">
      {/* Google Fonts & Material Symbols */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap" rel="stylesheet" />

      <main className="w-full max-w-[440px] flex flex-col items-center">
        
        {/* Branding Icon */}
        <div className="mb-5 p-4 bg-blue-100 rounded-2xl">
          <span className="material-symbols-outlined text-blue-600 text-4xl block">
            {isSubmitted ? 'mail' : 'lock_reset'}
          </span>
        </div>

        {/* Focused Card */}
        <div className="w-full bg-white rounded-2xl shadow-sm border border-[#f0f3f4] p-8 md:p-10">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-[#111617] tracking-tight text-2xl md:text-3xl font-bold mb-3">
                  Reset your password
                </h1>
                <p className="text-[#647e87] text-sm md:text-base leading-relaxed">
                  Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="text-[#111617] text-sm font-semibold" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., student@university.edu"
                    className="w-full rounded-xl border border-[#dce3e5] bg-white h-12 px-4 text-base focus:outline-none focus:ring-4 focus:ring-[#167b9c]/10 focus:border-[#167b9c] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center rounded-xl h-12 bg-blue-600 text-white text-base font-bold shadow-lg shadow-[#167b9c]/20 hover:bg-[#126682] active:scale-[0.98] transition-all"
                >
                  Send reset link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-[#111617] text-2xl font-bold mb-3">Check your email</h2>
              <p className="text-[#647e87] text-sm md:text-base leading-relaxed mb-8">
                We've sent a password reset link to <br />
                <span className="font-semibold text-[#111617]">{email}</span>
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full flex items-center justify-center rounded-xl h-12 border-2 border-[#f0f3f4] text-[#111617] text-sm font-bold hover:bg-gray-50 transition-all"
              >
                Resend email
              </button>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="mt-8 flex justify-center border-t border-[#f0f3f4] pt-6">
            <a
              href="/login"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-bold transition-colors group"
            >
              <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              Back to Login
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-10 text-center">
          <p className="text-[10px] text-[#647e87] uppercase tracking-[0.2em] font-bold">
            Mentorship Management Platform
          </p>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;