"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: number;
  y?: number;
}

export function MotionReveal({
  children,
  className = "",
  delay = 0,
  scale = 1,
  y = 18,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y, scale }}
      transition={{
        delay,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ amount: 0.22, once: true }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
    >
      {children}
    </motion.div>
  );
}
