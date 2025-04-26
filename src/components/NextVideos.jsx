"use client";

import Link from "next/link";
import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";
import { motion as m, cubicBezier } from "motion/react";
import { useRef } from "react";

export const NextVideos = ({ posts, i, show }) => {
  const videos = useRef([]);
  const router = useTransitionRouter();

  const nextVideos = [...posts.slice(i + 1), ...posts.slice(0, 4)].slice(0, 4);

  return (
    <m.div
      className="text-white grid grid-cols-4 w-full fixed top-0 z-[100]"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: show ? 0 : -100, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.7, ease: cubicBezier(0.25, 0.1, 0.25, 1) }}
    >
      {nextVideos.map((post, index) => {
        const {
          EN_title: en_title,
          BG_title: bg_title,
          slug,
          thumbnail,
        } = post;

        return (
          <Link
            className="grid grid-cols-1 grid-rows-1"
            onClick={(e) => {
              console.log(videos.current);
              const mainVideo = document.querySelector(".main-loop");
              mainVideo.style.viewTransitionName = "";
              videos.current[index].style.viewTransitionName = "current";
              e.preventDefault();

              router.push(`/projects/${slug}`);
            }}
            key={`video_${index}`}
            href={`#`}
          >
            <Image
              src={thumbnail.url}
              width={thumbnail.width / 6}
              height={thumbnail.height / 6}
              ref={(el) => (videos.current[index] = el)}
              alt={en_title}
              key={slug}
              className="col-start-1 row-start-1 row-span-1 col-span-1  w-full h-full object-cover"
              style={{
                viewTransitionName: ``,
                viewTransitionClass: "thumbnail",
              }}
            />
            <div className="col-start-1 row-start-1 row-span-1 col-span-1 flex items-center justify-center z-1">
              <h4 className="text-white text-center tracking-[0.12em] !font-[100] uppercase text-sm">
                {en_title} ⁄ {bg_title}
              </h4>
            </div>
          </Link>
        );
      })}
    </m.div>
  );
};

export default NextVideos;
