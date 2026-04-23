import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["zh", "en", "zh-TW"],
  defaultLocale: "zh",
  localePrefix: "always"
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
};
