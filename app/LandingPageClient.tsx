"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import {
  Search,
  Calendar,
  TrendingUp,
  ArrowRight,
  Quote,
  GraduationCap,
  Users,
  Star,
  BookOpen,
  Sparkles,
  ChevronDown,
} from "lucide-react";

/* ──────────────────────── Animated Counter ──────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    if (target === 0) {
      setCount(0);
      return;
    }
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ──────────────────────── Feature Card ──────────────────────── */
const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: any;
  title: string;
  desc: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border-border/60 bg-card/80 backdrop-blur-sm cursor-default">
        <CardContent className="p-8 flex flex-col items-center gap-4">
          <motion.div
            className="size-14 rounded-2xl bg-amber-400/15 flex items-center justify-center group-hover:bg-amber-400/25 transition-colors duration-300"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="size-6 text-amber-500" />
          </motion.div>
          <h3 className="font-bold text-xl text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* ──────────────────────── Stat Item ──────────────────────── */
const StatItem = ({
  value,
  suffix,
  label,
  icon: Icon,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: any;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="text-center flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="size-10 rounded-full bg-amber-400/15 flex items-center justify-center mb-1">
        <Icon className="size-5 text-amber-500" />
      </div>
      <div className="text-3xl md:text-4xl font-black text-foreground">
        <AnimatedCounter target={value} suffix={suffix} />
      </div>
      <div className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </div>
    </motion.div>
  );
};

/* ──────────────────────── Floating Particles ──────────────────────── */
const FloatingParticle = ({
  delay,
  size,
  x,
  y,
}: {
  delay: number;
  size: number;
  x: string;
  y: string;
}) => (
  <motion.div
    className="absolute rounded-full bg-amber-400/30 pointer-events-none"
    style={{ width: size, height: size, left: x, top: y }}
    animate={{
      y: [0, -30, 0, 20, 0],
      x: [0, 15, -10, 5, 0],
      opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);

/* ──────────────────────── Main Landing Page Client Component ──────────────────────── */
export default function LandingPageClient({
  stats,
}: {
  stats: {
    mentors: number;
    sessions: number;
    universities: number;
    satisfaction: number;
  };
}) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-background text-foreground font-sans overflow-x-hidden min-h-screen flex flex-col">
      {/* ─── Sticky Header ─── */}
      <motion.header
        className="w-full border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center size-8 rounded-lg bg-card shadow-sm overflow-hidden border border-border">
              <img
                src="/mentora.jpg"
                alt="Mentora"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-foreground text-lg font-bold leading-tight tracking-[-0.015em]">
              Mentora
            </h2>
          </motion.div>
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-amber-400 text-black hover:bg-amber-500 font-semibold">
                Login
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.header>

      <main className="flex-grow flex flex-col items-center w-full">
        <div className="w-full max-w-[1280px] p-4 py-8 sm:py-12 flex flex-col items-center">
          {/* ═══════════════ Hero Section ═══════════════ */}
          <div
            ref={heroRef}
            className="relative w-full overflow-hidden rounded-xl bg-neutral-900 shadow-2xl min-h-[520px] flex flex-col items-center justify-center text-center px-4 sm:px-10 mb-14"
          >
            {/* Parallax background */}
            <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
              <img
                alt="Mentors collaborating"
                className="w-full h-full object-cover opacity-30 scale-110"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
            </motion.div>

            {/* Floating Particles */}
            <FloatingParticle delay={0} size={6} x="10%" y="20%" />
            <FloatingParticle delay={1.5} size={4} x="80%" y="30%" />
            <FloatingParticle delay={0.8} size={8} x="60%" y="60%" />
            <FloatingParticle delay={2} size={5} x="25%" y="75%" />
            <FloatingParticle delay={1} size={7} x="90%" y="15%" />
            <FloatingParticle delay={2.5} size={4} x="45%" y="85%" />
            <FloatingParticle delay={0.5} size={6} x="70%" y="45%" />

            {/* Hero content with staggered reveal */}
            <motion.div
              className="relative z-10 max-w-[800px] flex flex-col gap-8 items-center"
              style={{ opacity: heroOpacity }}
            >
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Quote className="size-10 text-amber-400/70 mb-2 mt-5 mx-auto" />
                </motion.div>

                <motion.h1
                  className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-sm"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  &ldquo;Tell me and I forget, teach me and I may remember,{" "}
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                    involve me and I learn.
                  </span>
                  &rdquo;
                </motion.h1>

                <motion.p
                  className="text-white/80 text-sm font-medium uppercase tracking-widest mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  — Benjamin Franklin
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 64 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Separator className="w-16 bg-amber-400/40" />
              </motion.div>

              <motion.div
                className="flex flex-col gap-6 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h2 className="text-gray-200 text-lg sm:text-xl font-normal leading-relaxed max-w-[600px]">
                  Connect with mentors who guide your future. Join a community
                  dedicated to your growth and success.
                </h2>
                <Link href="/register">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="mb-5 gap-2 bg-amber-400 text-black hover:bg-amber-500 font-semibold shadow-lg shadow-amber-400/30"
                    >
                      Get Started
                      <ArrowRight className="size-4" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-5 z-10"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="size-6 text-amber-400/50" />
            </motion.div>
          </div>

          {/* ═══════════════ Core Features ═══════════════ */}
          <motion.div
            className="w-full max-w-[960px] mx-auto mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 text-amber-600 text-sm font-medium mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Sparkles className="size-4" />
                Features
              </motion.div>
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-foreground"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Everything you need to succeed
              </motion.h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[960px] mx-auto mb-12">
            <FeatureCard
              icon={Search}
              title="Find Mentors"
              desc="Discover industry experts aligned with your academic and career goals."
              index={0}
            />
            <FeatureCard
              icon={Calendar}
              title="Schedule Sessions"
              desc="Book 1-on-1 guidance sessions seamlessly with integrated calendar tools."
              index={1}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Track Progress"
              desc="Monitor your growth journey with goal setting and feedback loops."
              index={2}
            />
          </div>

          {/* ═══════════════ Stats Section ═══════════════ */}
          {/* <motion.div
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 py-14 px-6 border-y border-amber-200/50 my-12 bg-amber-50/50 rounded-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <StatItem
              value={stats.mentors}
              suffix="+"
              label="Expert Mentors"
              icon={Users}
              index={0}
            />
            <StatItem
              value={stats.sessions}
              suffix="+"
              label="Sessions Completed"
              icon={BookOpen}
              index={1}
            />
            <StatItem
              value={stats.satisfaction}
              suffix="%"
              label="Satisfaction"
              icon={Star}
              index={2}
            />
            <StatItem
              value={stats.universities}
              suffix="+"
              label="Universities"
              icon={GraduationCap}
              index={3}
            />
          </motion.div> */}
        </div>
      </main>

      {/* ─── Footer ─── */}
      <motion.footer
        className="w-full py-8 mt-auto border-t border-border bg-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[960px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground text-cen">
            © 2026 Mentora Inc. All rights reserved.
          </p>
          {/* <div className="flex items-center gap-8">
            {["About", "Help Center", "Privacy"].map((link) => (
              <Link
                key={link}
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div> */}
        </div>
      </motion.footer>
    </div>
  );
}
