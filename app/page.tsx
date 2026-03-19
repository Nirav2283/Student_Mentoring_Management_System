// app/page.tsx
import LandingPageClient from "./LandingPageClient";

export default function Page() {
  // Use completely static stats for the landing page
  const stats = {
    mentors: 50,
    sessions: 120,
    universities: 10,
    satisfaction: 98,
  };

  return <LandingPageClient stats={stats} />;
}