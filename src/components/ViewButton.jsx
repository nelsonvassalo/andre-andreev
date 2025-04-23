"use client";
import { useStore } from "@/state/store";
import { motion as m } from "motion/react";
import { useEffect } from "react";

const ViewButton = () => {
  const { viewMode, setViewMode } = useStore();
  const { headerScrolled } = useStore();

  useEffect(() => {
    const listElements = Array.from(document.querySelectorAll(".video-group"));

    if (viewMode === "list") {
      listElements.forEach((el) => {
        el.classList.remove("hover");
      });
    }
  }, [viewMode]);

  const handleClick = async () => {
    if (!document.startViewTransition) {
      setViewMode(viewMode === "grid" ? "list" : "grid");
      return;
    }
    const transition = document.startViewTransition(() => {
      setViewMode(viewMode === "grid" ? "list" : "grid");
    });
  };

  return (
    <m.button
      className="self-center z-[100] mt-20 flex items-center gap-2 text-[0.9375em] sticky font-[100] tracking-[0.25em] uppercase text-white bottom-3 transition-colors hover:font-[300] hover:tracking-[0.23em] w-[37px] h-[27px]"
      onClick={handleClick}
      // initial={{ transform: "translateY(100px)" }}
      // animate={{
      //   transform: headerScrolled ? "translateY(0px)" : "translateY(100px)",
      // }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ viewTransitionClass: "null", viewTransitionName: "btn" }}
    >
      {viewMode == "list" ? (
        <svg
          width="37"
          height="27"
          viewBox="0 0 37 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.25"
            y="0.0498047"
            width="17.15"
            height="7.35"
            fill="white"
          />
          <rect
            x="19.85"
            y="0.0498047"
            width="17.15"
            height="7.35"
            fill="white"
          />
          <rect x="0.25" y="9.84961" width="17.15" height="7.35" fill="white" />
          <rect
            x="19.85"
            y="9.84961"
            width="17.15"
            height="7.35"
            fill="white"
          />
          <rect x="0.25" y="19.6504" width="17.15" height="7.35" fill="white" />
          <rect
            x="19.85"
            y="19.6504"
            width="17.15"
            height="7.35"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="37"
          height="25"
          viewBox="0 0 37 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.351562" width="36.75" height="2.45" fill="white" />
          <rect y="5.25195" width="36.75" height="14.7" fill="white" />
          <rect y="22.4014" width="36.75" height="2.45" fill="white" />
        </svg>
      )}{" "}
    </m.button>
  );
};
export default ViewButton;
