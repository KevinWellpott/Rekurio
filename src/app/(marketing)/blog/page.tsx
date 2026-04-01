import BlogCard from "@/components/blog-card";
import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Blog",
  description: `Latest news and updates from ${siteConfig.name}.`,
});

export default async function Blog() {
  const allPosts = await getBlogPosts();

  const articles = await Promise.all(
    allPosts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  );

  return (
    <>
      <div className="container mt-24">
        <div className="py-16 text-left">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Articles
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
            Latest news and updates from {siteConfig.name}
          </p>
        </div>
      </div>
      <div className="min-h-[50vh] border-t border-white/10 glass-subtle">
        <div className="container grid grid-cols-1 gap-8 py-10 lg:grid-cols-3">
          {articles.map((data, idx) => (
            <BlogCard key={data.slug} data={data} priority={idx <= 1} />
          ))}
        </div>
      </div>
    </>
  );
}
