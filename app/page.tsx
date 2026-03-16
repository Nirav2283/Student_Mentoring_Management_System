// app/page.tsx
import { prisma } from "@/app/lib/prisma";
import LandingPageClient from "./LandingPageClient";

// Revalidate the page occasionally to keep stats fresh, 
// or keep it dynamic if you want real-time stats.
export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
  // Fetch real statistics from the database
  const [mentorsCount, sessionsCount, collegesCount] = await Promise.all([
    prisma.mentor.count(),
    prisma.studentmentoring.count(),
    prisma.college.count(),
  ]);

  // Pass down the dynamic stats to the Client Component containing animations
  const stats = {
    mentors: mentorsCount,
    sessions: sessionsCount,
    universities: collegesCount,
    satisfaction: 98, // You can leave this static or compute an average
  };

  return <LandingPageClient stats={stats} />;
}