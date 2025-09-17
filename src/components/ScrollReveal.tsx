"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ScrollRevealProps {
  children: React.ReactNode;
  offset?: number;
}

export default function ScrollReveal({ children, offset = 20 }: ScrollRevealProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start({ y: 0, opacity: 1 });
      setHasAnimated(true);
    }
  }, [inView, controls, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: offset, opacity: 0 }}
      animate={controls}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="mx-auto w-fit"
    >
      {children}
    </motion.div>
  );
}
