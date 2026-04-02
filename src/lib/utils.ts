import { siteConfig } from "@/lib/config";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || siteConfig.url}${path}`;
}

/** Absolute URL for JSON-LD images etc.: accepts full URLs or site-relative paths. */
export function absoluteResourceUrl(pathOrUrl: string) {
  if (!pathOrUrl) return absoluteUrl("/og");
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const base = (process.env.NEXT_PUBLIC_APP_URL || siteConfig.url).replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  path,
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  /** Optionaler Seiten-Pfad (z. B. "/pricing") für kanonische URL */
  path?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  const base = (process.env.NEXT_PUBLIC_APP_URL || siteConfig.url).replace(/\/$/, "");
  const canonicalUrl = path ? `${base}${path}` : base;

  return {
    title: {
      template: "%s | " + siteConfig.name,
      default: siteConfig.name,
    },
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons: "/favicon.ico",
    metadataBase: new URL(siteConfig.url),
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    ...props,
  };
}

export function formatDate(date: string) {
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  return new Date(date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
