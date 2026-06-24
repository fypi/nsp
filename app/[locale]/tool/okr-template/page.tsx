import AiToolClient from "@/components/tools/AiToolClient";

type Locale = "zh" | "zh-TW" | "en";

function getLocale(raw?: string): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW" || raw === "zh-tw") return "zh-TW";
  return "zh";
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = getLocale(params?.locale);
  return <AiToolClient toolId="okr-template" locale={locale} />;
}
