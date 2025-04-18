import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { useStore } from "@/state/store";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";

const POST_QUERY = `*[_type == "project" && slug.current == $slug][0]{_id, EN_title, BG_title, loop { asset->{ url } }, vimeo_url, slug, publishedAt}`;

const ALL_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)] {
  "slug": slug.current
}`;

export async function generateStaticParams() {
  const projects = await client.fetch(ALL_SLUGS_QUERY);

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

const options = { next: { revalidate: 30 } };

export default async function ProjectPage({ params }) {
  const post = await client.fetch(POST_QUERY, await params, options);

  return (
    <main className="grid min-h-screen grid-cols-1  grid-rows-1 gap-4">
      <div className="col-start-1 row-start-1 flex w-full h-full z-10 text-white items-center justify-center">
        <h1 className="hidden">
          {post.EN_title} ⁄ {post.BG_title}
        </h1>
      </div>

      <VideoPlayer video={post} />
    </main>
  );
}
