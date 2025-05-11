"use client";
import React from "react";
import { motion as m, AnimatePresence as AP } from "motion/react";

const ScrollDown = () => {
  return (
    <AP>
      <m.div
        className="text-white absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <svg
          width="3"
          height="47"
          viewBox="0 0 3 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <m.path
            d="M1.89398 1.01617L1.89398 33.586"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 0, strokeDasharray: "33 20" }}
            animate={{ strokeDashoffset: -105, strokeDasharray: "33 20" }}
            transition={{
              repeat: Infinity,
              delay: 1.5,
              duration: 2.25,
              ease: "circInOut",
              repeatDelay: 3,
            }}
          />
        </svg>
      </m.div>
    </AP>
  );
};

export default ScrollDown;
