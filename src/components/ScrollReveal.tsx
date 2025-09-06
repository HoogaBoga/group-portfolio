"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface ScrollRevealProps {
  children: React.ReactNode;
  offset?: number;
}

export default function ScrollReveal({ children, offset = -100 }: ScrollRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1 });
    } else {
      controls.start({ x: offset, opacity: 0 });
    }
  }, [inView, controls, offset]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: offset, opacity: 0 }}
      animate={controls}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="mx-auto w-fit"
    >
      {children}
    </motion.div>
  );
}
