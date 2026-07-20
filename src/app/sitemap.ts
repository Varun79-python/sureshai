import type { MetadataRoute } from "next";

const BASE_URL = "https://suresh.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/subjects`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/notes`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/mcqs`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/interview`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/roadmaps`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/ai`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/playground`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/pyqs`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/auth`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return staticPages;
}
