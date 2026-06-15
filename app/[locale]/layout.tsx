import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import NetworkStatusToast from "@/components/NetworkStatusToast";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Locale = "zh" | "zh-TW" | "en";

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  const locale = normalizeLocale(params?.locale);

  if (locale === "en") {
    return {
      title: "NinesPro — All things in the world, available at your fingertips",
      description:
        "A calm workspace for tools, workflows, learning, finance, and AI.",
    };
  }

  if (locale === "zh-TW") {
    return {
      title: "九域 — 盡知天下事，彈指皆可得",
      description: "盡知天下事，彈指皆可得。",
    };
  }

  return {
    title: "九域 — 尽知天下事，弹指皆可得",
    description: "尽知天下事，弹指皆可得。",
  };
}

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <SiteFooter />
      <NetworkStatusToast />
    </>
  );
}
