"use client";
import Project from "@/components/Project";
import { useEffect, useState } from "react";
import { motion as m, AnimatePresence as AP } from "motion/react";
import { useDebouncedCallback, sub } from "use-debounce";
import { useStore } from "@/state/store";
import BlurOverlay from "@/components/BlurOverlay";
import ViewButton from "@/components/ViewButton";
import { usePathname } from "next/navigation";

const ProjectList = ({ posts, arr }) => {
  const pathname = usePathname();
  // 2,3518637238

  const [isTopView, setIsTopView] = useState(true);
  const [blurHeight, setBlurHeight] = useState(0);
  const [isBottomView, setIsBottomView] = useState(false);
  const { viewMode, setCurrent } = useStore();

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
    setBlurHeight(blurHeight);
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
      id="projects"
      className={`${
        viewMode == "grid" ? "grid grid-cols-2 p-1 gap-1" : "flex flex-col"
      } z-10  snap-mandatory snap-y relative`}
    >
      <AP>
        {!isTopView ? (
          <BlurOverlay
            classes="-scale-y-100 !top-0 bottom-auto inverse"
            height={blurHeight}
            _key="top"
          />
        ) : null}
      </AP>

      {posts.map((el, i) => (
        <Project item={el} index={i} key={i} autoPlay={true} />
      ))}
      {/* {arr.map((el, i) => (
        <Project
          item={posts[0]}
          key={i + posts.length}
          index={i + posts.length}
          autoPlay={true}
        />
      ))} */}
      <AP>
        {!isBottomView ? (
          <BlurOverlay _key="bottom" height={blurHeight} />
        ) : null}
      </AP>
      <ViewButton />
    </ul>
  );
};

export default ProjectList;
