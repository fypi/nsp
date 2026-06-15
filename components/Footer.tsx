"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

type FooterProps = {
  locale?: string;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const footerCopy = {
  copyright: {
    zh: "九域 © 2026 版权所有",
    en: "NinesPro © 2026 All Rights Reserved",
    tw: "九域 © 2026 版權所有",
  },
  privacy: {
    zh: "隐私与法律",
    en: "Privacy & Legal",
    tw: "隱私與法律",
  },
  contact: {
    zh: "联系方式",
    en: "Contact",
    tw: "聯絡方式",
  },
  help: {
    zh: "帮助中心",
    en: "Help Center",
    tw: "說明中心",
  },
};

function t(value: { zh: string; en: string; tw: string }, locale: Locale) {
  if (locale === "en") return value.en;
  if (locale === "zh-TW") return value.tw;
  return value.zh;
}

function localePath(locale: Locale, path: string) {
  if (locale === "en") return path === "/" ? "/" : path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export default function SiteFooter({ locale: localeProp }: FooterProps) {
  const params = useParams();
  const locale = normalizeLocale(localeProp ?? params?.locale);

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-inner">
        <span className="site-footer-text">{t(footerCopy.copyright, locale)}</span>
        <nav className="site-footer-links" aria-label="Footer links">
          <Link href={localePath(locale, "/privacy")}>{t(footerCopy.privacy, locale)}</Link>
          <Link href={localePath(locale, "/contact")}>{t(footerCopy.contact, locale)}</Link>
          <Link href={localePath(locale, "/help")}>{t(footerCopy.help, locale)}</Link>
        </nav>
      </div>
    </footer>
  );
}
