import Image from "next/image";
import { client, urlFor } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import ScrollDown from "@/components/ScrollDown";
import { portableTextComponents } from "../utils/portableText";

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
      <section className="h-screen relative snap-start" id="bio">
        <div className="prose prose-sm md:prose-base lg:prose-lg z-10 relative flex items-center h-full py-40 px-4">
          <div className="mx-auto flex flex-col items-center">
            <h2 className="text-lg tracking-[0.12em] !font-[100] uppercase text-white md:text-[1.75rem] mb-8 text-center">
              {page.en_title} / {page.bg_title}
            </h2>
            <div className="flex flex-col gap-10 text-white font-thin text-base md:text-[1.54rem] tracking-[0.01em] leading-[1.54] mx-auto px-4 max-w-5xl [&_p]:text-pretty text-center">
              <div>
                <PortableText
                  value={page.bio_en}
                  className="text-white"
                  components={portableTextComponents}
                />
              </div>

              <div>
                <PortableText
                  value={page.bio_bg}
                  className="text-white"
                  components={portableTextComponents}
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          src={urlFor(page.photo).url()}
          alt="Profile photo"
          width={2560}
          height={2560}
          sizes="100vw"
          quality={100}
          priority
          className="w-full h-full object-cover absolute top-0 z-0"
        />

        <ScrollDown />
      </section>
      <section
        className="h-screen relative snap-center bg-red-500"
        id="contact"
      >
        <div className="prose prose-sm md:prose-base lg:prose-lg z-10 relative flex items-center h-full py-40 px-4">
          <div className="mx-auto flex flex-col items-center">
            <h2 className="text-lg tracking-[0.12em] !font-[100] uppercase text-white md:text-[1.75rem] mb-8 text-center">
              {page.en_contact_title} / {page.bg_contact_title}
            </h2>
            <div className="flex flex-col gap-10 text-white font-thin text-base md:text-[1.54rem] tracking-[0.01em] leading-[1.54] mx-auto px-4 max-w-5xl [&_p]:text-pretty text-center group">
              <div className="group">
                <PortableText
                  value={page.contact}
                  className="text-white"
                  components={{
                    ...portableTextComponents,
                    marks: {
                      ...portableTextComponents.marks,
                      link: ({ value, children }) => {
                        const { href } = value;
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all duration-[750ms] group-hover:tracking-[0.1em] underline underline-offset-4 decoration-1 group-hover:blur-md hover:!blur-none focus:!blur-none ease-in-out hover:!tracking-[0.01em]"
                          >
                            {children}
                          </a>
                        );
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          src={urlFor(page.contact_photo).url()}
          alt="Profile photo"
          width={2560}
          height={2000}
          quality={100}
          sizes="100vw"
          className="w-full h-full object-cover absolute top-0 z-0"
        />

        <ScrollDown />
      </section>
      <section className="h-screen relative snap-end bg-blue-500" id="press">
        <div className="prose prose-sm md:prose-base lg:prose-lg z-10 relative flex items-center h-full py-40 px-4">
          <div className="mx-auto flex flex-col items-center">
            <h2 className="text-lg tracking-[0.12em] !font-[100] uppercase text-white md:text-[1.75rem] mb-8 text-center">
              {page.en_press_title} / {page.bg_press_title}
            </h2>
            <div className="flex flex-col gap-y-4 text-white font-thin text-base md:text-[1.54rem] tracking-[0.01em] leading-[1.54] mx-auto px-4 max-w-5xl [&_p]:text-pretty text-center group">
              {page.press?.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-[750ms] group-hover:tracking-[0.1em] underline underline-offset-4 decoration-1 group-hover:blur-md hover:!blur-none focus:!blur-none ease-in-out hover:!tracking-[0.01em]"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <Image
          src={urlFor(page.press_photo).url()}
          alt="Profile photo"
          width={2650}
          height={2000}
          sizes="100vw"
          quality={100}
          className="w-full h-full object-cover absolute top-0 z-0"
        />
      </section>
    </>
  );
}
