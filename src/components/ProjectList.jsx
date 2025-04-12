"use client";
import Project from "@/components/Project";
import { useEffect, useState } from "react";
import { motion as m, AnimatePresence as AP } from "motion/react";
import { useDebouncedCallback, sub } from "use-debounce";
import { useStore } from "@/state/store";
import BlurOverlay from "./BlurOverlay";
import { usePathname } from "next/navigation";

const ProjectList = ({ posts, arr }) => {
  const pathname = usePathname();
  // 2,3518637238

  const [isTopView, setIsTopView] = useState(true);
  const [isBottomView, setIsBottomView] = useState(false);
  const { viewMode, setCurrent, scrollPosition } = useStore();

  const onScroll = (e) => {
    const { scrollY } = window;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight - 80;
    scrollY === 0 ? setIsTopView(true) : setIsTopView(false);
    scrollY >= docHeight ? setIsBottomView(true) : setIsBottomView(false);
  };

  // const debouncedScroll = useDebouncedCallback(onScroll, 50);

  const onResize = (e) => {
    const RATIO = 2.3518637238;
    let vW = window.innerWidth;
    let vH = window.innerHeight;
    const h = vW / RATIO;
    const blurHeight = (vH - h) / 2;
    const blurEls = document.querySelectorAll(".gradient-blur");
    blurEls.forEach((el) => {
      el.style.height = `${blurHeight}px`;
    });
  };

  // This effect sets the CSS variable --vh to the viewport height in pixel
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    setTimeout(() => {
      document.documentElement.classList.remove("coming-back");
    }, 500);

    onResize();

    setCurrent(null);
  }, [pathname]);

  return (
    <ul
      className={`${
        viewMode == "grid" ? "grid grid-cols-2 p-1 gap-1" : "flex flex-col"
      } relative z-0  snap-mandatory snap-y`}
    >
      <AP>
        {!isTopView ? (
          <BlurOverlay classes="-scale-y-100 !top-0 bottom-auto inverse" />
        ) : null}
      </AP>

      {arr.map((el, i) => (
        <Project item={posts[0]} key={i} index={i} autoPlay={true} />
      ))}
      <AP>{!isBottomView ? <BlurOverlay /> : null}</AP>
    </ul>
  );
};

export default ProjectList;
