"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
};

export default function AwardsPageClient({
  children,
  delay = 0,
  direction = "up",
}: Props) {
  const initial =
    direction === "down"
      ? { opacity: 0, y: -60 } // top → down
      : { opacity: 0, y: 60 }; // bottom → up

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}