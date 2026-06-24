import type { MetadataRoute } from "next";

const baseUrl = "https://ninespro.com";
const routes = ['', 'about', 'service', 'product', 'solution', 'support', 'tool', 'tool/document', 'tool/learning', 'tool/classics', 'tool/poetry', 'tool/developer', 'tool/finance', 'tool/office', 'tool/ai', 'search', 'feedback', 'privacy', 'terms', 'disclaimer', 'cookie', 'faq', 'sitemap'];
const locales = ["", "/zh", "/zh-TW"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    routes.map((route) => {
      const path = route ? `/${route}` : "";
      return {
        url: `${baseUrl}${locale}${path || "/"}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : route.startsWith("tool") ? 0.8 : 0.6,
      };
    })
  );
}
