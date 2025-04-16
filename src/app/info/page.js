import Image from "next/image";
import { client, urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";

export default async function InfoPage() {
  const page = await client.fetch(
    `*[_type == "infoPage"][0]{
      EN_title,
      BG_title,
      bio_en,
      bio_bg,
      photo { asset->{ url, _id } },
    }`
  );
  console.log("🚀 ~ InfoPage ~ info:", page);

  return (
    <>
      <div className="prose prose-sm md:prose-base lg:prose-lg z-10 relative flex items-center min-h-screen py-40">
        <div className="mx-auto flex flex-col items-center">
          {/* <h1 className="tracking-[0.22em] !font-[100] uppercase text-white text-[2.5rem] mb-4">
            {page.EN_title} / {page.BG_title}
          </h1> */}
          <div className="flex flex-col gap-10 text-white font-thin text-[1.54rem] tracking-[0.01em] leading-[1.54] mx-auto px-4 max-w-5xl [&_p]:text-pretty text-center">
            <div>
              <PortableText value={page.bio_en} className="text-white" />
            </div>
            <div>
              <PortableText value={page.bio_bg} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      <Image
        src={urlFor(page.photo).width(1200).height(800).url()}
        alt="Profile photo"
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="w-full h-full object-cover absolute top-0 z-0"
      />
      <div className="overlay bg-black/65 w-full h-full absolute z-1 top-0 p-0 m-0"></div>
    </>
  );
}
