import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "zh", "zh-TW"],
  defaultLocale: "en",

  // English is the default public URL:
  //   /product, /contact, /privacy
  // Chinese keeps prefix:
  //   /zh/product, /zh-TW/product
  // /en/product will be normalized by next-intl to /product.
  localePrefix: "as-needed",

  // Do not auto-switch by browser language.
  // The site only changes language when the user explicitly switches it.
  localeDetection: false,
});

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|favicon.ico|favicon.svg|icon.svg|apple-icon.svg|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
