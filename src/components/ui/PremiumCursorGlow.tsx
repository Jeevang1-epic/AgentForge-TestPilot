"use client";

import { useEffect, useRef } from "react";

export function PremiumCursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (!glow || reducedMotion.matches || coarsePointer.matches) {
      return;
    }

    let frameId = 0;
    let latestX = window.innerWidth / 2;
    let latestY = window.innerHeight / 3;

    const moveGlow = () => {
      frameId = 0;
      glow.style.transform = `translate3d(${latestX - 210}px, ${
        latestY - 210
      }px, 0)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;

      if (!frameId) {
        frameId = window.requestAnimationFrame(moveGlow);
      }
    };

    moveGlow();
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(197,168,128,0.18),rgba(224,194,152,0.08)_34%,transparent_68%)] blur-2xl md:block"
      ref={glowRef}
    />
  );
}
