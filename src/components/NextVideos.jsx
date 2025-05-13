"use client";

import Link from "next/link";
import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";
import { motion as m, cubicBezier } from "motion/react";
import { useRef, useEffect } from "react";
import next from "next";

export const NextVideos = ({ posts, i, show, video, div, player }) => {
  const videos = useRef([]);
  const router = useTransitionRouter();

  const nextVideos = [...posts.slice(i), ...posts.slice(0, 6)].slice(0, 6);

  const handleClick = async (e) => {
    document.documentElement.classList.add("coming-back");

    div.current.style.viewTransitionName = video.slug.current;
    router.push(`/#${video.slug.current}`);
  };

  const handleThumbnailClick = (e, slug, index = 0) => {
    console.log("thumbnail ran", { slug }, videos.current[index]);
    const player = document.querySelector(".player");
    player.style.viewTransitionName = "";
    videos.current[index].style.viewTransitionName = "current";
    e && e.preventDefault();

    router.push(`/projects/${slug}`);
  };

  useEffect(() => {
    const nextVideo = nextVideos[1];

    player?.ready().then(async () => {
      player.on("ended", () => {
        if (nextVideo && nextVideo.slug) {
          const slug = nextVideo.slug;
          handleThumbnailClick(null, slug, 1);
        }
      });
    });
  }, [player, video]);

  return (
    <m.div
      className="text-white grid grid-cols-6 w-full fixed bottom-0 z-[100]"
      initial={{ y: "150%" }}
      animate={{ y: show ? 0 : "150%" }}
      transition={{ duration: 0.7, ease: cubicBezier(0.25, 0.1, 0.25, 1) }}
    >
      {/* BACK BUTTON */}
      <div className="absolute -top-16 md:-top-12 left-1/2 -translate-x-1/2 max-md:w-full text-center max-md:flex justify-center">
        <Link
          className="px-4 py-2 z-20  flex items-center gap-2 text-sm md:text-[0.9375em] font-[100] tracking-[0.05em] transition-[letter-spacing,font-weight] duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)]] uppercase text-white bottom-32  hover:tracking-[0.07em] hover:font-[500] cursor-pointer group"
          onClick={handleClick}
          href={`/#${video.slug.current}`}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L1 7L7 13"
              stroke="white"
              className="group-hover:stroke-[1px]"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
          </svg>{" "}
          Back to Listing / обратно към списъка
        </Link>
      </div>
      {nextVideos.map((post, index) => {
        const {
          EN_title: en_title,
          BG_title: bg_title,
          slug,
          thumbnail,
        } = post;

        return index === 0 ? (
          <div className="grid grid-cols-1 grid-rows-1" key={`video_${index}`}>
            <Image
              src={thumbnail.url}
              width={thumbnail.width / 6}
              height={thumbnail.height / 6}
              ref={(el) => (videos.current[index] = el)}
              alt={en_title}
              key={slug}
              className="col-start-1 row-start-1 row-span-1 col-span-1  w-full h-full object-cover"
              style={{
                viewTransitionName: `null_${index}`,
                viewTransitionClass: "thumbnail",
              }}
            />
            <div className="col-start-1 row-start-1 row-span-1 col-span-1 flex items-center justify-center z-10">
              <h4 className="text-white text-center tracking-[0.12em] !font-[100] uppercase text-xs px-4">
                {en_title} ⁄ {bg_title}
              </h4>
            </div>
          </div>
        ) : (
          <Link
            className="grid grid-cols-1 grid-rows-1 group bg-black"
            onClick={(e) => handleThumbnailClick(e, slug, index)}
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
              className="col-start-1 row-start-1 row-span-1 col-span-1  w-full h-full object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)]"
              style={{
                viewTransitionName: `null_${index}`,
                viewTransitionClass: "thumbnail",
              }}
            />
            <div className="col-start-1 row-start-1 row-span-1 col-span-1 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)]">
              <h4 className="text-white text-center tracking-[0.12em] !font-[100] uppercase text-xs px-4">
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
