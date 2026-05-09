'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function HoverCard({
  children,
  className,
}: Props) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      {children}
    </motion.div>
  );
}