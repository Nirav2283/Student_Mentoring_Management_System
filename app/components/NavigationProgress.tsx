"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/* ── Context ── */
const NavProgressCtx = createContext<{
  isPending: boolean;
  navigate: (href: string) => void;
}>({ isPending: false, navigate: () => {} });

export function useNavProgress() {
  return useContext(NavProgressCtx);
}

/* ── Provider (wrap each layout) ── */
export function NavigationProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const toastIdRef = useRef<string | number | null>(null);

  const navigate = useCallback(
    (href: string) => {
      // Show toast immediately on click
      if (toastIdRef.current !== null) {
        toast.dismiss(toastIdRef.current);
      }
      toastIdRef.current = toast.loading("Loading…", {
        position: "top-center",
      });

      startTransition(() => {
        router.push(href);
      });
    },
    [router, startTransition]
  );

  // Dismiss toast when transition completes
  useEffect(() => {
    if (!isPending && toastIdRef.current !== null) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  }, [isPending]);

  return (
    <NavProgressCtx.Provider value={{ isPending, navigate }}>
      {children}
      {isPending && <ProgressBar />}
    </NavProgressCtx.Provider>
  );
}

/* ── Animated top bar ── */
function ProgressBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none">
      <div
        className="h-full bg-primary rounded-r-full"
        style={{ animation: "nav-progress 1.2s ease-in-out infinite" }}
      />
      <style>{`
        @keyframes nav-progress {
          0%   { width: 0%;  margin-left: 0%; }
          30%  { width: 60%; margin-left: 0%; }
          60%  { width: 30%; margin-left: 50%; }
          100% { width: 0%;  margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
