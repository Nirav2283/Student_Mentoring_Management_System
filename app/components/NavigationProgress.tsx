"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { endRequest, startRequest } from "@/app/store/Loadingstore";

const NavProgressCtx = createContext<{
  navigate: (href: string) => void;
  startNavigation: () => void;
}>({
  navigate: () => {},
  startNavigation: () => {},
});

export function useNavProgress() {
  return useContext(NavProgressCtx);
}

export function NavigationProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const pendingRef = useRef(false);

  const startNavigation = useCallback(() => {
    if (pendingRef.current) return;

    pendingRef.current = true;
    startRequest();
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      startNavigation();
      router.push(href);
    },
    [pathname, router, startNavigation]
  );

  useEffect(() => {
    if (!pendingRef.current) return;

    pendingRef.current = false;
    endRequest();
  }, [pathname]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest("a[href]");
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin === window.location.origin &&
        destination.pathname !== pathname
      ) {
        startNavigation();
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [pathname, startNavigation]);

  return (
    <NavProgressCtx.Provider value={{ navigate, startNavigation }}>
      {children}
    </NavProgressCtx.Provider>
  );
}
