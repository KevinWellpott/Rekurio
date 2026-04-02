import BlogCard from "@/components/blog-card";
import { BlogLeadCapture } from "@/components/blog/blog-lead-capture";
import { getBlogPosts } from "@/lib/blog";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Blog – Klaviyo-Tipps für DTC-Brands",
  description:
    "Praxisartikel zu Klaviyo-Flows, E-Mail-Marketing und Revenue-Optimierung für DTC-Brands.",
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
          <span className="bg-primary/15 text-primary ring-primary/30 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ring-1 mb-4">
            Blog
          </span>
          <h1 className="from-foreground to-foreground/55 bg-linear-to-br from-30% bg-clip-text text-3xl font-semibold tracking-tight text-transparent text-balance sm:text-4xl">
            Klaviyo-Tipps für DTC-Brands
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-balance">
            Praxisartikel zu Flows, Segmentierung und E-Mail-Revenue — für Brands,
            die ihr Klaviyo-Potenzial wirklich ausschöpfen wollen.
          </p>
        </div>
      </div>
      <div className="container pb-10">
        <BlogLeadCapture placement="blog-index" />
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
