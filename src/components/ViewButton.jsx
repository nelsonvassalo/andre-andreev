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
      className="self-center z-[100] mt-20 flex items-center gap-2 text-[0.9375em] sticky font-[100] tracking-[0.25em] uppercase text-white bottom-3 transition-colors hover:font-[300] hover:tracking-[0.23em] w-[21px] h-[14px]"
      onClick={handleClick}
      // initial={{ transform: "translateY(100px)" }}
      // animate={{
      //   transform: headerScrolled ? "translateY(0px)" : "translateY(100px)",
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ viewTransitionClass: "null", viewTransitionName: "btn" }}
    >
      {viewMode == "list" ? (
        <svg
          width="21"
          height="14"
          viewBox="0 0 29 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.276794"
            y="0.588867"
            width="12.9878"
            height="5.5662"
            fill="white"
          />
          <rect
            x="15.1199"
            y="0.588867"
            width="12.9878"
            height="5.5662"
            fill="white"
          />
          <rect
            x="0.276794"
            y="8.00977"
            width="12.9878"
            height="5.5662"
            fill="white"
          />
          <rect
            x="15.1199"
            y="8.00977"
            width="12.9878"
            height="5.5662"
            fill="white"
          />
          <rect
            x="0.276794"
            y="15.4326"
            width="12.9878"
            height="5.5662"
            fill="white"
          />
          <rect
            x="15.1199"
            y="15.4326"
            width="12.9878"
            height="5.5662"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="21"
          height="14"
          viewBox="0 0 28 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.351562" width="27.831" height="1.8554" fill="white" />
          <rect y="4.0625" width="27.831" height="11.1324" fill="white" />
          <rect y="17.0498" width="27.831" height="1.8554" fill="white" />
        </svg>
      )}{" "}
    </m.button>
  );
};
export default ViewButton;
