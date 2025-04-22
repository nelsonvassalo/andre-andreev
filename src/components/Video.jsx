"use client";
import { useStore } from "@/state/store";
import { useEffect, useRef } from "react";
import Image from "next/image";

const Video = ({ src, thumbnail, isInView }) => {
  const videoRef = useRef(null);
  const container = useRef(null);
  const { viewMode } = useStore();

  const onMouseEnter = () => {};

  const onMouseLeave = () => {};

  useEffect(() => {
    const videoElement = videoRef.current;

    const play = () => {
      console.log("play");

      if (viewMode === "grid" && videoRef) {
        videoElement.play();
      }
    };

    const pause = () => {
      if (viewMode === "grid" && videoRef) {
        videoElement.pause();
      }
    };

    if (videoElement) {
      videoElement.addEventListener("mouseenter", play);
      videoElement.addEventListener("mouseleave", pause);
      videoElement.style.aspectRatio = "2.3518637238/1";

      if (isInView) {
        // Only reset time when coming into view
        videoElement.currentTime = 0;

        let playPromise;
        if (viewMode === "list") {
          container.current.classList.add("active");
          playPromise = videoElement.play();

          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error("Video playback error:", error);
            });
          }
        }
      } else {
        console.log({ container }, "left view");
        // Pause if not in view
        container.current.classList.remove("active");
        if (!videoElement.paused) {
          videoElement.pause();
        }
      }
    }

    // Clean up
    return () => {
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    };
  }, [isInView, viewMode, videoRef]);

  return (
    <div
      className={`relative video-group${viewMode == "grid" ? " group" : ""}`}
      ref={container}
    >
      <Image
        src={thumbnail ? thumbnail : "/poster.png"}
        width={1000}
        height={500}
        className="w-full group-hover:opacity-0 absolute top-0 transition-opacity duration-700"
      />
      <video
        playsInline
        loop
        muted
        ref={videoRef}
        src={src}
        preload="metadata"
        className="col-start-1 row-start-1 w-full h-full object-cover aspect-[2.3518637238] group-hover:opacity-1 transition-opacity"
      />
    </div>
  );
};

export default Video;
