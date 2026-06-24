import { redirect } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";

function getLocale(raw?: string): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW" || raw === "zh-tw") return "zh-TW";
  return "zh";
}

function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "/" ? "/" : clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = getLocale(params?.locale);
  redirect(localePath(locale, "/tool"));
}
