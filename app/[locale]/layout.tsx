import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import NetworkStatusToast from "@/components/NetworkStatusToast";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Locale = "zh" | "zh-TW" | "en";

const iconVersion = "20260617";

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const icons: Metadata["icons"] = {
  icon: [
    { url: `/icon.svg?v=${iconVersion}`, type: "image/svg+xml" },
    { url: `/favicon.svg?v=${iconVersion}`, type: "image/svg+xml" },
  ],
  shortcut: `/icon.svg?v=${iconVersion}`,
  apple: [{ url: `/apple-icon.svg?v=${iconVersion}`, type: "image/svg+xml" }],
};

const seo = {
  en: {
    title: "NinesPro | AI Development & Digital Innovation",
    description:
      "NinesPro builds AI-powered software, enterprise platforms, cloud systems, and digital experiences for modern businesses.",
  },
  zh: {
    title: "NINESPRO｜AI 软件开发与数字创新公司",
    description:
      "NINESPRO 专注于 AI 软件、企业平台、云端系统、自动化工作流与数字体验设计，帮助现代企业构建下一代数字产品。",
  },
  "zh-TW": {
    title: "NINESPRO｜AI 軟體開發與數位創新公司",
    description:
      "NINESPRO 專注於 AI 軟體、企業平台、雲端系統、自動化工作流與數位體驗設計，幫助現代企業構建下一代數位產品。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  const locale = normalizeLocale(params?.locale);
  const current = seo[locale];

  return {
    metadataBase: new URL("https://www.ninespro.com"),
    title: current.title,
    description: current.description,
    keywords:
      locale === "en"
        ? [
            "AI Development",
            "Software Development",
            "Digital Innovation",
            "Enterprise Software",
            "Cloud Solutions",
            "Web Development",
            "AI Automation",
            "SaaS Development",
          ]
        : [
            "AI 开发",
            "软件开发",
            "数字创新",
            "企业软件",
            "云端系统",
            "网站开发",
            "AI 自动化",
            "SaaS 开发",
          ],
    icons,
    alternates: {
      canonical:
        locale === "en"
          ? "https://www.ninespro.com/en"
          : `https://www.ninespro.com/${locale}`,
      languages: {
        en: "https://www.ninespro.com/en",
        "zh-CN": "https://www.ninespro.com/zh",
        "zh-TW": "https://www.ninespro.com/zh-TW",
        "x-default": "https://www.ninespro.com/en",
      },
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url:
        locale === "en"
          ? "https://www.ninespro.com/en"
          : `https://www.ninespro.com/${locale}`,
      siteName: "NinesPro",
      type: "website",
      locale:
        locale === "en" ? "en_US" : locale === "zh-TW" ? "zh_TW" : "zh_CN",
    },
    twitter: {
      card: "summary_large_image",
      title: current.title,
      description: current.description,
    },
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