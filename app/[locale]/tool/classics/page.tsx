import ClassicsLibraryClient from "@/components/tools/ClassicsLibraryClient";

type Locale = "zh" | "zh-TW" | "en";

function getLocale(raw?: string): Locale {
  if (raw === "en") return "en";
  if (raw === "zh-TW" || raw === "zh-tw") return "zh-TW";
  return "zh";
}

export default function Page({ params }: { params: { locale: string } }) {
  return <ClassicsLibraryClient locale={getLocale(params?.locale)} />;
}
