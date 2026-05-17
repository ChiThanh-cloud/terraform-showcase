"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function NumberTicker({
  value,
  suffix = "",
  prefix = ""
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplay(latest));
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.4,
      ease: "easeOut"
    });
    return controls.stop;
  }, [count, inView, value]);

  return (
    <motion.span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
