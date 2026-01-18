"use client"; // Required for animations in Next.js App Router

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const AccountSuccess = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative overflow-hidden">
      
      <div className="absolute top-6 right-10 z-20">
        <button className="text-slate-400 hover:text-blue-600 transition-colors">
          <HelpCircle size={24} />
        </button>
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-20 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-[520px] w-full"
        >
          <div className="bg-white rounded-xl border border-slate-100 p-10 md:p-16 text-center shadow-sm">
            
            {/* Animated Icon Section */}
            <div className="mb-10 flex justify-center">
              <div className="relative">
                {/* Pulsing Glow Background */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute inset-0 bg-[#2FB85B]/20 rounded-full blur-2xl"
                />
                
                {/* The Success Circle */}
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="relative w-24 h-24 bg-[#2FB85B] flex items-center justify-center rounded-full text-white shadow-lg"
                >
                  {/* Animated Checkmark Path */}
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }}
                      d="M20 6L9 17l-5-5"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Success Message */}
            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              <h1 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight px-4">
                Your account has been created successfully!
              </h1>
              <p className="text-slate-500 text-lg font-normal leading-relaxed px-4">
                You can now log in to your account to start managing your college and mentorship programs.
              </p>
            </motion.div>

            {/* Primary CTA */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 px-4">
              <Link 
                href="/login" 
                className="w-full flex items-center justify-center rounded-lg h-14 px-8 bg-[#2656f2] text-white text-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
              >
                Go to Login
              </Link>
              
              <p className="text-sm text-slate-400 mt-4">
                Need help? <a className="text-[#2656f2] hover:underline" href="#">Contact Support</a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-6 px-5 py-10 text-center bg-white border-t border-slate-100 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <a className="text-slate-500 text-sm font-medium hover:text-[#2656f2] transition-colors" href="#">Terms of Service</a>
          <a className="text-slate-500 text-sm font-medium hover:text-[#2656f2] transition-colors" href="#">Privacy Policy</a>
          <a className="text-slate-500 text-sm font-medium hover:text-[#2656f2] transition-colors" href="#">System Status</a>
        </div>
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Mentorship Management System. All rights reserved.
        </p>
      </footer>

      {/* Background Orbs */}
      <div className="fixed top-0 left-0 -z-0 opacity-20 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="200" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(200)">
              <stop stopColor="#2656f2" />
              <stop offset="1" stopColor="#2656f2" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AccountSuccess;