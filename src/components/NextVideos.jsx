"use client";

import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { useState, useEffect, useRef } from "react";

export const NextVideos = ({ posts, i }) => {
  const videos = useRef([]);
  const router = useTransitionRouter();

  const nextVideos = [...posts.slice(i + 1), ...posts.slice(0, 4)].slice(0, 4);

  return (
    <div className="text-white grid grid-cols-4 w-full fixed top-0 z-[100]">
      {nextVideos.map((post, index) => {
        const { loop, EN_title: en_title, BG_title: bg_title, slug } = post;

        return (
          <Link
            className="grid grid-cols-1 grid-rows-1"
            onClick={(e) => {
              console.log(videos.current);
              videos.current[
                index
              ].style.viewTransitionName = `project_${slug}`;
              e.preventDefault();

              router.push(`/projects/${slug}`);
            }}
            key={`video_${index}`}
            href={`#`}
          >
            <video
              src={loop}
              className="col-span-1 row-span-1 col-start-1 row-start-1"
              loop
              autoPlay
              muted
              ref={(el) => (videos.current[index] = el)}
              playsInline
              key={slug}
              style={{
                viewTransitionName: ``,
                viewTransitionClass: "thumbnail",
                contain: "layout style",
              }}
            />
            <div className="col-start-1 row-start-1 flex items-center justify-center z-1">
              <h4 className="text-white text-center tracking-[0.12em] !font-[100] uppercase text-sm">
                {en_title} ⁄ {bg_title}
              </h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NextVideos;
