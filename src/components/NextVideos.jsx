"use client";

import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";

export const NextVideos = ({ posts, i }) => {
  const router = useTransitionRouter();
  console.log("🚀 ~ NextVideos ~ router:", router);
  const arr = new Array(4).fill(0);

  return (
    <div className="text-white grid grid-cols-4 w-full">
      {arr.map((el, index) => {
        if (i + index >= posts.length - 1) i = -1;
        const loop = posts[i + index]?.loop;
        const en_title = posts[i + index]?.EN_title;
        const bg_title = posts[i + index]?.BG_title;
        const slug = posts[i + index]?.slug;
        return (
          <Link
            className="grid grid-cols-1 grid-rows-1"
            onClick={(e) => {
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
              playsInline
              style={{
                viewTransitionName: slug,
                // viewTransitionClass: "thumbnail",
                // contain: "layout style",
              }}
            />
            <div className="col-start-1 row-start-1 flex items-center justify-center">
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
