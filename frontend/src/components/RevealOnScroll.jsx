import { motion, useReducedMotion } from "framer-motion";
import { forwardRef } from "react";

export const RevealOnScroll = forwardRef(function RevealOnScroll(
  { children, delay = 0, y = 16, className = "", as = "div", ...rest },
  ref
) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
});

export const StaggerGroup = ({ children, className = "", stagger = 0.08 }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "", y = 14 }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: reduce ? {} : { opacity: 0, y },
        show: reduce
          ? {}
          : {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
