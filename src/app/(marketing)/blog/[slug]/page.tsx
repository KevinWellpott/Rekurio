import Author from "@/components/blog-author";
import { BlogLeadCapture } from "@/components/blog/blog-lead-capture";
import { getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getSiteBaseUrl } from "@/lib/site-url";
import { absoluteResourceUrl, formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = await getPost(slug);
  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const base = getSiteBaseUrl();
  const canonicalUrl = `${base}/blog/${post.slug}`;
  const ogImage = image || `${base}/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "de_DE",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = await getPost(slug);
  if (!post) {
    notFound();
  }
  return (
    <section id="blog">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            inLanguage: "de-DE",
            image: post.metadata.image
              ? absoluteResourceUrl(post.metadata.image)
              : `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
            url: `${siteConfig.url}/blog/${post.slug}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${siteConfig.url}/blog/${post.slug}`,
            },
            author: {
              "@type": "Person",
              name: post.metadata.author,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: {
                "@type": "ImageObject",
                url: absoluteResourceUrl("/logo.svg"),
              },
            },
          }),
        }}
      />
      <div className="container my-12 space-y-4">
        <div className="mx-auto w-full max-w-[800px] space-y-4">
        <Suspense
          fallback={
            <div className="mb-8 h-64 w-full animate-pulse rounded-lg bg-muted/40"></div>
          }
        >
          {post.metadata.image && (
            <div className="mb-8">
              <Image
                width={1920}
                height={1080}
                src={post.metadata.image}
                alt={post.metadata.title}
                className="w-full h-auto rounded-lg border shadow-md"
              />
            </div>
          )}
        </Suspense>
        <div className="flex flex-col">
          <h1 className="title font-medium text-3xl tracking-tighter">
            {post.metadata.title}
          </h1>
        </div>
        <div className="flex justify-between items-center text-sm">
          <Suspense fallback={<p className="h-5" />}>
            <div className="flex items-center space-x-2">
              <time
                dateTime={post.metadata.publishedAt}
                className="text-sm text-gray-500"
              >
                {formatDate(post.metadata.publishedAt)}
              </time>
            </div>
          </Suspense>
        </div>
        <div className="flex items-center space-x-2">
          <Author
            twitterUsername={post.metadata.author}
            name={post.metadata.author}
            image={"/author.jpg"}
          />
        </div>
        <article
          className="prose dark:prose-invert mx-auto max-w-full"
          dangerouslySetInnerHTML={{ __html: post.source }}
        ></article>
        <div className="mt-14">
          <BlogLeadCapture placement="blog-post" />
        </div>
        </div>
      </div>
    </section>
  );
}
