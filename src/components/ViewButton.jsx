"use client";
import { useStore } from "@/state/store";
import { useEffect } from "react";

const ViewButton = () => {
  const { viewMode, setViewMode } = useStore();

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
    <button
      className="mt-40 flex items-center gap-2 text-[0.9375em] px-4 py-2 z-[9999] left-1/2 -translate-x-1/2 sticky font-[100] tracking-[0.25em] uppercase text-white bottom-12 transition-colors hover:font-[300] hover:tracking-[0.23em] w-fit"
      onClick={handleClick}
      style={{ viewTransitionClass: "null", viewTransitionName: "btn" }}
    >
      View as {viewMode == "list" ? "Grid " : "List "} / Преглед като{" "}
      {viewMode == "list" ? "Pешетка" : "Cписък"}
      {viewMode == "list" ? (
        <svg
          width="15"
          height="11"
          viewBox="0 0 15 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="7" height="3" fill="white" />
          <rect x="8" width="7" height="3" fill="white" />
          <rect y="4" width="7" height="3" fill="white" />
          <rect x="8" y="4" width="7" height="3" fill="white" />
          <rect y="8" width="7" height="3" fill="white" />
          <rect x="8" y="8" width="7" height="3" fill="white" />
        </svg>
      ) : (
        <svg
          width="15"
          height="10"
          viewBox="0 0 15 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="15" height="1" fill="white" />
          <rect y="2" width="15" height="6" fill="white" />
          <rect y="9" width="15" height="1" fill="white" />
        </svg>
      )}{" "}
    </button>
  );
};
export default ViewButton;
