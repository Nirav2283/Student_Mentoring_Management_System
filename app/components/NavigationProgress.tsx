"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function NavigationProgress() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [isNavigating, setIsNavigating] = useState(false);
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      // Navigation started — show loading
      setIsNavigating(true);
      toastIdRef.current = toast.loading("Loading…", {
        duration: Infinity,
        position: "top-center",
      });

      prevPathname.current = pathname;

      // Dismiss after a short delay (page has already loaded since pathname changed)
      const timer = setTimeout(() => {
        if (toastIdRef.current !== null) {
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
        }
        setIsNavigating(false);
      }, 600);

      return () => {
        clearTimeout(timer);
        if (toastIdRef.current !== null) {
          toast.dismiss(toastIdRef.current);
          toastIdRef.current = null;
        }
      };
    }
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none">
      <div
        className="h-full bg-primary rounded-r-full"
        style={{
          animation: "nav-progress 1.2s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes nav-progress {
          0% { width: 0%; margin-left: 0%; }
          30% { width: 60%; margin-left: 0%; }
          60% { width: 30%; margin-left: 50%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
