"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/state/store";
import { motion as m } from "motion/react";
import { useTransitionRouter } from "next-view-transitions";
import Player from "@vimeo/player";

const VideoPlayer = ({ video }) => {
  const router = useTransitionRouter();
  const ref = useRef(null);
  const div = useRef(null);
  const container = useRef(null);
  const player = useRef(null);
  const iframe = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const { show, current } = useStore();

  const togglePlay = () => {
    if (isPlaying) {
      player.current.pause();
    } else {
      player.current.play();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      div.current.style.viewTransitionName = `transition-${current}`;
      div.current.style.viewTransitionClass = "thumbnail";
    }, 500);
  }, []);

  //  VIMEO PLAYER

  useEffect(() => {
    if (div.current && !player.current) {
      const defaultOptions = {
        id: 273789434,
        width: 1920,
        height: 1080,
        autoplay: true, // Enable autoplay
        controls: false, // Hide UI controls
        loop: false,
        background: true, // Background mode hides additional UI elements
        title: false, // Hide title
        byline: false, // Hide author byline
        portrait: false,
      };

      // Initialize the Vimeo Player
      player.current = new Player(container.current, defaultOptions);

      player.current.ready().then(() => {
        setIsLoaded(true);
      });

      // You can add event listeners here if needed
      player.current.on("play", () => {
        setIsPlaying(true);
        console.log("Video is playing");
      });

      player.current.on("pause", () => {
        setIsPlaying(false);
        console.log("Video is paused");
      });
    }

    // Clean up when component unmounts
    return () => {
      if (player.current) {
        player.current.destroy();
        player.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
        className="player w-full grid grid-cols-subgrid grid-rows-subgrid col-start-1 row-start-1 z-10 relative"
        ref={div}
      >
        <div className="aspect-[2.3518637238] w-full h-full row-start-1 col-start-1">
          <video
            playsInline
            loop
            ref={ref}
            muted
            autoPlay
            preload="auto"
            src={video.loop.asset.url}
            className="w-full h-full"
          />
        </div>
        <m.div
          className="absolute w-full h-full [&_iframe]:w-full [&_iframe]:aspect-[2.3518637238]"
          ref={container}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        ></m.div>

        <div className="row-start-1 col-start-1 w-full h-full flex items-center justify-center z-10 ">
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
        </div>
      </div>
      <m.div animate={{ opacity: show ? 1 : 0 }}>
        <Link
          className="px-4 py-2 z-20 left-1/2 -translate-x-1/2 fixed flex items-center gap-2 text-[13px] font-[100] tracking-[0.13em] uppercase text-white bottom-16 bg-[rgba(217,217,217,0.1)] border-[0.5px] border-white/10  rounded-[13px] backdrop-blur-[56px] hover:border-white/30 transition-colors hover:font-[300] hover:tracking-[0.12em]"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            router.push("/");
          }}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            animate={{ opacity: show ? 1 : 0 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L1 7L7 13"
              stroke="white"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
          </svg>{" "}
          Back to Listing
        </Link>
      </m.div>
    </>
  );
};

export default VideoPlayer;
