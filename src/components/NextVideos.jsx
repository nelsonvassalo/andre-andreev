"use client";

import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { useState, useEffect, useRef } from "react";
import { useStore } from "@/state/store";

export const NextVideos = ({ posts, i }) => {
  const video = useRef(null);
  const { setNavigatedWithin, navigatedWithin } = useStore();
  const router = useTransitionRouter();
  const [transitionKey, setTransitionKey] = useState(Date.now()); // Set a new key on each transition
  useEffect(() => {
    setTransitionKey(Date.now()); // Trigger a new key whenever you want to force a re-render
  }, [posts]);

  const nextVideos = [...posts.slice(i + 1), ...posts.slice(0, 4)].slice(0, 4);

  return (
    <div
      className="text-white grid grid-cols-4 w-full"
      key={`next_${transitionKey}`}
    >
      {nextVideos.map((post, index) => {
        const { loop, EN_title: en_title, BG_title: bg_title, slug } = post;

        return (
          <Link
            className="grid grid-cols-1 grid-rows-1"
            onClick={(e) => {
              video.current.style.viewTransitionName = `project_${slug}`;
              e.preventDefault();
              console.log({ navigatedWithin });
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
              ref={video}
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
