"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/state/store";
import { motion as m } from "motion/react";
import { useTransitionRouter } from "next-view-transitions";
import Player from "@vimeo/player";

const VideoPlayer = ({ video, posts, i }) => {
  const router = useTransitionRouter();
  const ref = useRef(null);
  const div = useRef(null);
  const container = useRef(null);
  const player = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const { show, current, autoPlay, navigatedFromHome } = useStore();
  const [isPlaying, setIsPlaying] = useState(false || autoPlay);

  const togglePlay = () => {
    if (isPlaying) {
      player.current.pause();
    } else {
      player.current.play();
    }
  };

  const handleClick = async (e) => {
    document.documentElement.classList.add("coming-back");
    router.push(`/#${video.slug.current}`);
  };

  // Vimeo player setup
  useEffect(() => {
    if (div.current && !player.current) {
      const defaultOptions = {
        id: video.vimeo_url ? video.vimeo_url.split("/").pop() : 185412081,
        width: window.innerWidth,
        height: window.innerHeight, // More responsive height
        controls: false,
        loop: false,
        title: false,
        byline: false,
        portrait: false,
      };

      // Initialize the Vimeo Player
      player.current = new Player(container.current, defaultOptions);

      player.current.on("play", () => {
        setIsPlaying(true);
      });

      player.current.on("pause", () => {
        setIsPlaying(false);
      });

      player.current.ready().then(() => {
        player.current.play();
        setIsLoaded(true);
      });

      const TIMER = setTimeout(() => {
        ref.current.style.viewTransitionName = video.slug.current;
      }, 100);
    }

    return () => {
      if (player.current) {
        player.current.destroy();
        player.current = null;
      }
    };
  }, [video.vimeo_url]);

  return (
    <>
      <div
        className="player w-full grid grid-cols-1 grid-rows-1 col-start-1 row-start-1 z-10 px-[5%] relative"
        ref={div}
      >
        <div className="w-full row-start-1 col-start-1 flex items-center justify-center relative ">
          <m.video
            playsInline
            loop
            ref={ref}
            muted
            autoPlay
            preload="auto"
            src={video.loop.asset.url}
            className="w-full"
            animate={{ opacity: isLoaded ? 0 : 1 }}
            transition={{ delay: 1, duration: 0.75 }}
            style={{
              viewTransitionName: navigatedFromHome
                ? "current"
                : video.slug.current,
              viewTransitionClass: "thumbnail",
              // contain: "layout size style",
            }}
          />
        </div>

        <m.div
          className="h-full row-start-1 col-start-1 inline-flex items-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
        >
          <div
            className="h-fit w-full [&_iframe]:w-full relative"
            ref={container}
          >
            <div className="timeline px-4 w-full absolute bottom-1 h-1">
              <div className="bg-white/30 h-full w-full">
                <div
                  className="progress bg-white h-full"
                  style={{ width: "34%" }}
                ></div>
              </div>
            </div>
          </div>
        </m.div>

        <div className="row-start-1 col-start-1 w-full flex items-center justify-center z-10 ">
          {isLoaded ? (
            <m.button
              onClick={togglePlay}
              className="play w-[101px] h-[101px] cursor-pointer flex items-center justify-center"
              animate={{ opacity: show ? 1 : 0 }}
            >
              {isPlaying ? (
                <svg
                  width="102"
                  height="102"
                  viewBox="0 0 102 102"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50.7991"
                    cy="50.7991"
                    r="50.5491"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <path
                    d="M33 31.3936C32.8619 31.3936 32.75 31.5055 32.75 31.6436V73.3559C32.75 73.494 32.8619 73.6059 33 73.6059H45.4658C45.6038 73.6059 45.7158 73.494 45.7158 73.3559V31.6436C45.7158 31.5055 45.6038 31.3936 45.4658 31.3936H33Z"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M55.5342 31.3936C55.3961 31.3936 55.2842 31.5055 55.2842 31.6436V73.3559C55.2842 73.494 55.3961 73.6059 55.5342 73.6059H67.9999C68.138 73.6059 68.2499 73.494 68.2499 73.3559V31.6436C68.2499 31.5055 68.138 31.3936 67.9999 31.3936H55.5342Z"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="102"
                  height="102"
                  viewBox="0 0 102 102"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M75.8679 50.6052C75.9839 50.5382 76.0554 50.4144 76.0554 50.2804C76.0554 50.1465 75.9839 50.0227 75.8679 49.9557L37.7686 27.959C37.6525 27.892 37.5096 27.892 37.3936 27.959C37.2775 28.026 37.2061 28.1498 37.2061 28.2838L37.2061 72.2771C37.2061 72.4111 37.2775 72.5349 37.3936 72.6019C37.5096 72.6688 37.6525 72.6688 37.7686 72.6019L75.8679 50.6052Z"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="50.7991"
                    cy="50.7991"
                    r="50.4241"
                    stroke="white"
                    strokeWidth="1"
                  />
                </svg>
              )}
            </m.button>
          ) : null}
        </div>
      </div>

      <m.div animate={{ opacity: show ? 1 : 0 }}>
        <a
          className="px-4 py-2 z-20 left-1/2 -translate-x-1/2 fixed flex items-center gap-2 text-[0.9375em] font-[100] tracking-[0.25em] uppercase text-white bottom-3  hover:font-[300] hover:tracking-[0.23em] cursor-pointer group"
          onClick={handleClick}
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
        </a>
      </m.div>
    </>
  );
};

export default VideoPlayer;
