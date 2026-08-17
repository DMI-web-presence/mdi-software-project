import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/brief", priority: 0.85, changeFrequency: "monthly" },
  { path: "/portofoliu", priority: 0.8, changeFrequency: "monthly" },
  { path: "/website-de-prezentare", priority: 0.9, changeFrequency: "monthly" },
  { path: "/magazin-online", priority: 0.9, changeFrequency: "monthly" },
  { path: "/aplicatii-web", priority: 0.9, changeFrequency: "monthly" },
  { path: "/confidentialitate", priority: 0.3, changeFrequency: "yearly" },
  { path: "/termeni", priority: 0.3, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
