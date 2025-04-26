import { client } from "@/sanity/client";
import ProjectDetail from "@/components/ProjectDetail";

const POST_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  EN_title,
  BG_title,
  loop { asset->{ url } },
  "thumbnail": {
    "url": thumbnail.asset->url,
    "width": thumbnail.asset->metadata.dimensions.width,
    "height": thumbnail.asset->metadata.dimensions.height,
    "aspectRatio": thumbnail.asset->metadata.dimensions.aspectRatio
  },
  vimeo_url,
  slug,
  publishedAt
}`;

const ALL_SLUGS_QUERY = `*[_type == "project" && defined(slug.current)] {
  "slug": slug.current,
  EN_title,
  BG_title,
  "loop": loop.asset->url,
  "thumbnail": {
    "url": thumbnail.asset->url,
    "width": thumbnail.asset->metadata.dimensions.width,
    "height": thumbnail.asset->metadata.dimensions.height,
    "aspectRatio": thumbnail.asset->metadata.dimensions.aspectRatio
  }
}`;

export async function generateStaticParams() {
  const projects = await client.fetch(ALL_SLUGS_QUERY);

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

const options = { next: { revalidate: 30 } };

export default async function ProjectPage({ params }) {
  const posts = await client.fetch(ALL_SLUGS_QUERY, {}, options);
  const post = await client.fetch(POST_QUERY, await params, options);

  const index = posts.findIndex((p) => p.slug === post.slug.current);

  return (
    <main className="grid min-h-screen grid-cols-1  grid-rows-1 gap-4">
      <div className="col-start-1 row-start-1 flex w-full h-full z-10 text-white items-center justify-center">
        <h1 className="hidden">
          {post.EN_title} ⁄ {post.BG_title}
        </h1>
      </div>

      <ProjectDetail key={post.slug} video={post} posts={posts} i={index} />
    </main>
  );
}
