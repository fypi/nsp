import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "zh", "zh-TW"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};