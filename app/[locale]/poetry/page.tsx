import { redirect } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";
function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "en";
}
function localePath(locale: Locale, route: string) {
  const cleanRoute = route.startsWith("/") ? route : `/${route}`;
  if (locale === "en") return cleanRoute === "/" ? "/" : cleanRoute;
  return `/${locale}${cleanRoute === "/" ? "" : cleanRoute}`;
}
export default function Page({ params }: { params: { locale?: string } }) {
  const locale = normalizeLocale(params?.locale);
  redirect(localePath(locale, "/tool/poetry"));
}
