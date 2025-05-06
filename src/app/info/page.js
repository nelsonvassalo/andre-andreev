import Image from "next/image";
import { client, urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";

export default async function InfoPage() {
  
  const page = await client.fetch(
    `*[_type == "infoPage"][0]{
      EN_title,
      en_title,
      BG_title,
      bg_title,
      bio_en,
      bio_bg,
      en_contact_title,
      bg_contact_title,
      contact,
      en_press_title,
      bg_press_title,
      press,
      photo { asset->{ url, _id } },
      contact_photo { asset->{ url, _id } },
      press_photo { asset->{ url, _id } },
    }`
  );

  return (
    <>
      <section className="h-[90dvh] relative snap-start" id="bio">
        <div className="prose prose-sm md:prose-base lg:prose-lg z-10 relative flex items-center h-full py-40">
          <div className="mx-auto flex flex-col items-center">
            <h2 className="tracking-[0.12em] !font-[100] uppercase text-white text-[1.75rem] mb-8">
              {page.en_title} / {page.bg_title}
            </h2>
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
      </section>
      <section
        className="h-[90dvh] relative snap-center bg-red-500"
        id="contact"
      >
        <div className="prose prose-sm md:prose-base lg:prose-lg z-10 relative flex items-center h-full py-40">
          <div className="mx-auto flex flex-col items-center">
            <h2 className="tracking-[0.12em] !font-[100] uppercase text-white text-[1.75rem] mb-8">
              {page.en_contact_title} / {page.bg_contact_title}
            </h2>
            <div className="flex flex-col gap-10 text-white font-thin text-[1.54rem] tracking-[0.01em] leading-[1.54] mx-auto px-4 max-w-5xl [&_p]:text-pretty text-center">
              <div>
                <PortableText value={page.contact} className="text-white" />
              </div>
            </div>
          </div>
        </div>
        <Image
          src={urlFor(page.contact_photo).width(1200).height(800).url()}
          alt="Profile photo"
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-cover absolute top-0 z-0"
        />
        <div className="overlay bg-black/65 w-full h-full absolute z-1 top-0 p-0 m-0"></div>
      </section>
      <section className="h-[90dvh] relative snap-end bg-blue-500" id="press">
        <div className="prose prose-sm md:prose-base lg:prose-lg z-10 relative flex items-center h-full py-40">
          <div className="mx-auto flex flex-col items-center">
            <h2 className="tracking-[0.12em] !font-[100] uppercase text-white text-[1.75rem] mb-8">
              {page.en_press_title} / {page.bg_press_title}
            </h2>
            <div className="flex flex-col gap-10 text-white font-thin text-[1.54rem] tracking-[0.01em] leading-[1.54] mx-auto px-4 max-w-5xl [&_p]:text-pretty text-center">
              <div>
                {page.press?.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Image
          src={urlFor(page.press_photo).width(1200).height(800).url()}
          alt="Profile photo"
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-cover absolute top-0 z-0"
        />
        <div className="overlay bg-black/65 w-full h-full absolute z-1 top-0 p-0 m-0"></div>
      </section>
    </>
  );
}
