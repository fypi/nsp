"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";

const footerText: Record<
  Locale,
  {
    copyright: string;
    privacy: string;
    contact: string;
    help: string;
  }
> = {
  zh: {
    copyright: "九域 © 2026 版权所有",
    privacy: "隐私与法律",
    contact: "联系方式",
    help: "帮助中心",
  },
  "zh-TW": {
    copyright: "九域 © 2026 版權所有",
    privacy: "隱私與法律",
    contact: "聯絡方式",
    help: "說明中心",
  },
  en: {
    copyright: "NinesPro © 2026 All Rights Reserved",
    privacy: "Privacy & Legal",
    contact: "Contact",
    help: "Help Center",
  },
};

export default function SiteFooter() {
  const params = useParams();
  const pathname = usePathname();

  const rawLocale = params?.locale;

  const locale: Locale =
    rawLocale === "en" || rawLocale === "zh-TW" || rawLocale === "zh"
      ? rawLocale
      : "zh";

  const text = footerText[locale];

  /*
    首页本身已经在 app/[locale]/page.tsx 里面有 footer。
    所以这里首页不再显示，避免出现两个 footer。

    会隐藏：
    /zh
    /en
    /zh-TW
  */
  const isHomePage =
    pathname === `/${locale}` ||
    pathname === `/${locale}/` ||
    pathname === "/";

  if (isHomePage) {
    return null;
  }

  return (
    <footer className="page-footer">
      <div className="footer-links">
        <span>{text.copyright}</span>
        <Link href={`/${locale}/privacy`}>{text.privacy}</Link>
        <Link href={`/${locale}/contact`}>{text.contact}</Link>
        <Link href={`/${locale}/help`}>{text.help}</Link>
      </div>
    </footer>
  );
}