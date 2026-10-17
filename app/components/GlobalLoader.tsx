"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { subscribeLoading } from "../store/Loadingstore";

export function GlobalLoader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeLoading(setIsVisible);
    return () => unsubscribe();
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="global-loader-backdrop" aria-label="Loading" aria-busy="true">
      <div className="global-loader-spinner">
        <Image
          src="/favicon.png"
          alt=""
          width={44}
          height={44}
          className="global-loader-icon"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
 