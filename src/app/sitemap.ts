import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE = "https://edumenezes.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...projectUrls,
  ];
}
