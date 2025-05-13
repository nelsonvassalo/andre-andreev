"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/state/store";
import { motion as m, cubicBezier } from "motion/react";
import { useTransitionRouter } from "next-view-transitions";
import Player from "@vimeo/player";
import NextVideos from "@/components/NextVideos";

const ProjectDetail = ({ video, posts, i }) => {
  const router = useTransitionRouter();
  const ref = useRef(null);
  const div = useRef(null);
  const container = useRef(null);
  const player = useRef(null);
  const progressBar = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const { show, autoPlay } = useStore();
  const [isPlaying, setIsPlaying] = useState(false || autoPlay);
  const [aspect, setAspect] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      player.current.pause();
    } else {
      player.current.play();
    }
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const timelineClick = (e) => {
    const timeline = e.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // Distance from left edge
    const clickPercent = Math.min(Math.max(clickX / rect.width, 0), 1);
    console.log("🚀 ~ timelineClick ~ clickPercent:", clickPercent);

    let newTime = clickPercent * duration;
    newTime = Math.max(0, Math.min(newTime, duration)); // Clamp between 0 and duration

    player.current.setCurrentTime(newTime);
  };

  const handleBackClick = async (e) => {
    document.documentElement.classList.add("coming-back");

    div.current.style.viewTransitionName = video.slug.current;
    router.push(`/#${video.slug.current}`);
  };

  // Vimeo player setup
  useEffect(() => {
    if (div.current && !player.current) {
      const defaultOptions = {
        id: video.vimeo_url ? video.vimeo_url.split("/").pop() : 185412081,
        controls: false,
        loop: false,
        title: false,
        byline: false,
        portrait: false,
      };

      // Initialize the Vimeo Player
      player.current = new Player(container.current, defaultOptions);

      player.current.ready().then(async () => {
        player.current.on("play", play);
        player.current.on("pause", pause);

        try {
          const videoWidth = await player.current.getVideoWidth();
          const videoHeight = await player.current.getVideoHeight();
          if (videoWidth && videoHeight) {
            setAspect(videoWidth / videoHeight);
          }

          const dur = await player.current.getDuration();
          setDuration(dur);
          // Update progress every 0.1 second while the video is playing
          const updateProgress = async () => {
            if (!player.current) return;

            const currentTime = await player.current.getCurrentTime();
            const currentDuration = await player.current.getDuration();

            setDuration(currentDuration);

            if (currentDuration > 0) {
              const progress = (currentTime / currentDuration) * 100;
              setProgress(progress);
            }

            requestAnimationFrame(updateProgress);
          };
          requestAnimationFrame(updateProgress);
        } catch (error) {
          console.error("Error getting video dimensions:", error);
        }

        player.current.play();
        setIsLoaded(true);
      });
    }

    return () => {
      if (player.current) {
        player.current.off("play", play);
        player.current.off("pause", pause);
        player.current.destroy();
        player.current.remove;
        player.current = null;
      }
    };
  }, [video.vimeo_url]);

  return (
    <>
      <div className="px-10 w-full">
        <div
          ref={div}
          className="player w-full grid grid-cols-1 grid-rows-1 col-start-1 row-start-1 z-10  relative "
          style={{
            viewTransitionName: "current",
            viewTransitionClass: "thumbnail_fast",
          }}
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
              className="main-loop w-full"
              animate={{ opacity: isLoaded ? 0 : 1 }}
              transition={{ delay: 1, duration: 0.75 }}
            />
          </div>

          <m.div
            className="row-start-1 col-start-1 inline-flex items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
          >
            <div
              className="group aspect-[--aspect] inline w-full [&_iframe]:w-full relative [&_iframe]:aspect-[--aspect] [&_iframe]:h-[calc(var(--aspect)/100%)]"
              ref={container}
              style={{ "--aspect": `${aspect}` }}
            >
              {/* PLAY BUTTON */}
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
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

              {/* TIMELINE */}
              <m.div
                className="timeline w-full absolute -bottom-2 h-1 group-hover:h-2 transition-[height] duration-300 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)]"
                onClick={timelineClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: show ? 1 : 0 }}
              >
                <div
                  className="cursor-pointer h-1 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] bg-white/30 bottom-1 h-full transition-[height] rounded-full overflow-hidden duration-300 group-hover:h-2"
                  ref={progressBar}
                >
                  <m.div
                    className="progress bg-white h-full z-40"
                    // style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.01, ease: "linear" }}
                  ></m.div>
                </div>
              </m.div>
            </div>
          </m.div>
        </div>
        {/* BACK BUTTON */}
        <m.div
          className="mt-10 text-center max-md:flex justify-center w-full flex"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: show ? 0 : "100%", opacity: show ? 1 : 0 }}
          transition={{ y: { bounce: 0.2 } }}
        >
          <Link
            className="px-4 py-2 z-20  flex items-center gap-2 text-sm md:text-[0.9375em] font-[100] tracking-[0.05em] transition-[letter-spacing,font-weight] duration-700 ease-[cubic-bezier(0.25, 0.1, 0.25, 1)]] uppercase text-white bottom-32  hover:tracking-[0.07em] hover:font-[500] cursor-pointer group"
            onClick={handleBackClick}
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
        </m.div>
      </div>

      <NextVideos
        posts={posts}
        i={i}
        show={show}
        video={video}
        div={div}
        player={player.current}
      />
    </>
  );
};

export default ProjectDetail;
