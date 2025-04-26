"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Video from "@/components/Video";
import { useStore } from "@/state/store";
import { useInView } from "motion/react";
import { motion as m } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import { useViewTransitionWithScroll } from "@/hooks/useViewTransitionWithScroll";

const Project = ({ item, index }) => {
  const router = useTransitionRouter();
  const [isCurrent, setIsCurrent] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: "all" });
  const {
    setCurrent,
    setAutoPlay,
    setNavigatedFromHome,
    navigatedFromHome,
    viewMode,
  } = useStore();

  const { navigateToProject } = useViewTransitionWithScroll();

  const handleNavigation = (e) => {
    setNavigatedFromHome(true);
    setIsCurrent(true);
    setAutoPlay(true);
    e.preventDefault();

    // Set current item for view transition naming
    setCurrent(index);

    navigateToProject(item.slug.current, index);
  };

  useEffect(() => {
    console.log({ navigatedFromHome, item });
    setTimeout(() => {
      if (navigatedFromHome) {
        setNavigatedFromHome(false);
        setIsCurrent(false);
      }
    }, 1000);
  }, []);

  return (
    <li
      ref={ref}
      className="w-full flex items-center snap-center relative project aspect-[2.3703703704] transition-opacity"
      id={`${item.slug.current}`}
      style={{
        // Position is directly applied to ensure consistency
        viewTransitionClass: "thumbnail",
        viewTransitionName: item.slug.current,
        opacity: viewMode === "list" ? (isInView ? 1 : 0.35) : 1,
      }}
    >
      <Link
        href={`/projects/${item.slug.current}`}
        className="relative grid grid-cols-1 grid-rows-1 w-full h-full"
        prefetch={true}
        onClick={handleNavigation}
      >
        <div className="col-start-1 row-start-1 top-0 w-full h-full z-10 flex items-center justify-center tracking-[0.22em] !font-[100] uppercase pointer-events-none">
          <m.h2
            className="text-4xl text-white flex flex-wrap"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.03,
                  staggerDirection: -1,
                },
              },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {[...`${item.EN_title} / ${item.BG_title}`].map((char, i) => (
              <m.span
                key={i}
                initial={{ filter: "blur(7px)", scale: 1.25, y: 15 }}
                variants={{
                  hidden: { filter: "blur(7px)", scale: 1.25, y: 15 },
                  visible: { filter: "blur(0px)", scale: 1, y: 0 },
                }}
                transition={{
                  filter: { type: "tween", ease: "easeOut", duration: 0.4 },
                  scale: {
                    type: "spring",
                    mass: 10,
                    damping: 45,
                    stiffness: 200,
                  },
                  y: { type: "spring", mass: 10, damping: 45, stiffness: 200 },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </m.span>
            ))}
          </m.h2>
        </div>

        {/* Video component with consistent dimensions */}
        <div className="col-start-1 row-start-1 w-full h-full">
          <Video
            src={item.loop.asset.url}
            isInView={isInView}
            thumbnail={item.thumbnail?.asset.url}
          />
        </div>
      </Link>
    </li>
  );
};

export default Project;
