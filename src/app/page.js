import { client } from "@/sanity/client";
import ProjectList from "@/components/ProjectList";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

const POSTS_QUERY = `*[
  _type == "project"
  && defined(slug.current)
]{_id, EN_title, BG_title, loop { asset->{ url } }, vimeo_url, slug, publishedAt}`;

const HOMEPAGE_QUERY = `*[_type == "homePage"][0]{ vimeoUrl }`;

const options = { next: { revalidate: 30 } };

const arr = new Array(10).fill(0);

export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);
  const homepage = await client.fetch(HOMEPAGE_QUERY, {}, options);

  return (
    <main className="snap-start">
      <Hero vimeoURLs={homepage?.vimeoUrl} />
      <ProjectList posts={posts} arr={arr} />
    </main>
  );
}
