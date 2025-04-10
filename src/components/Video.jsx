"use client";
import { useStore } from "@/state/store";
import { useEffect, useRef } from "react";

const Video = ({ src, isInView }) => {
  const video = useRef(null);
  const { setVideoTime } = useStore();
  useEffect(() => {
    if (video.current) {
      if (isInView) {
        video.currentTime = 0;
        video.current.play();
        // setVideoTime(video.current.currentTime);
      } else {
        video.current.pause();
      }
    }

    return () => {
      if (video.current) video.current.pause();
    };
  }, [isInView]);

  return (
    <video
      playsInline
      loop
      muted
      ref={video}
      src={src}
      className="col-start-1 row-start-1 top-0 w-full h-full object-cover"
    />
  );
};

export default Video;
