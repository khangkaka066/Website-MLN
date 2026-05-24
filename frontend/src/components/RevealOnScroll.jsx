import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" };
const REVEAL_TRANSITION = { duration: 0.55, ease: EASE_OUT };
const STAGGER_PARENT_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const buildRevealInitial = (y) => ({ opacity: 0, y });
const REVEAL_WHILE = { opacity: 1, y: 0 };

const buildStaggerItemVariants = (y) => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
});

export const RevealOnScroll = forwardRef(function RevealOnScroll(
  { children, delay = 0, y = 16, className = "", as = "div", ...rest },
  ref
) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      initial={reduce ? false : buildRevealInitial(y)}
      whileInView={reduce ? undefined : REVEAL_WHILE}
      viewport={VIEWPORT}
      transition={{ ...REVEAL_TRANSITION, delay }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

const buildStaggerParentVariants = (stagger) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

export const StaggerGroup = ({ children, className = "", stagger = 0.08 }) => {
  const reduce = useReducedMotion();
  const variants =
    stagger === 0.08 ? STAGGER_PARENT_VARIANTS : buildStaggerParentVariants(stagger);
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={VIEWPORT}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "", y = 14 }) => {
  const reduce = useReducedMotion();
  const variants = reduce
    ? { hidden: {}, show: {} }
    : buildStaggerItemVariants(y);
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};
