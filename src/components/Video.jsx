"use client";
import { useStore } from "@/state/store";
import { useEffect, useRef } from "react";

const Video = ({ src, isInView }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // Pre-set dimensions and aspect ratio to prevent layout shifts
      videoElement.style.aspectRatio = "2.3518637238/1";

      // Efficiently manage playback
      if (isInView) {
        // Only reset time when coming into view
        videoElement.currentTime = 0;

        // Use play() Promise with error handling
        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Video playback error:", error);
          });
        }
      } else {
        // Pause if not in view
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
  }, [isInView]);

  return (
    <video
      playsInline
      loop
      muted
      ref={videoRef}
      src={src}
      preload="metadata"
      className="col-start-1 row-start-1 w-full h-full object-cover aspect-[2.3518637238]"
    />
  );
};

export default Video;
