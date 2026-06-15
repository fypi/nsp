"use client";

import Link from "next/link";

type Locale = "zh" | "zh-TW" | "en";

function normalizeLocale(locale: unknown): Locale {
  if (locale === "en") return "en";
  if (locale === "zh-TW" || locale === "zh-tw") return "zh-TW";
  return "zh";
}

function getHomeHref(locale: Locale) {
  if (locale === "en") return "/";
  return `/${locale}`;
}

function getBrandText(locale: Locale) {
  if (locale === "en") return "NinesPro";
  return "九域";
}

function getLogoText(locale: Locale) {
  if (locale === "en") return "NP";
  return "九";
}

export default function BrandLogo({
  locale,
  compact = false,
}: {
  locale?: string;
  compact?: boolean;
}) {
  const currentLocale = normalizeLocale(locale);
  const href = getHomeHref(currentLocale);
  const brandText = getBrandText(currentLocale);
  const logoText = getLogoText(currentLocale);

  return (
    <Link
      href={href}
      aria-label={brandText}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 8 : 10,
        textDecoration: "none",
        color: "#05070a",
        minWidth: 0,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: compact ? 28 : 30,
          height: compact ? 28 : 30,
          borderRadius: 6,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          border: "1px solid rgba(15,23,42,0.10)",
          boxShadow:
            "0 8px 20px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,1)",
          fontSize: currentLocale === "en" ? (compact ? 11 : 12) : compact ? 14 : 15,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: currentLocale === "en" ? "-0.08em" : "-0.04em",
          color: "#05070a",
          flex: "0 0 auto",
        }}
      >
        {logoText}
      </span>

      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontSize: compact ? 16 : 18,
          fontWeight: 850,
          letterSpacing: currentLocale === "en" ? "-0.035em" : "-0.04em",
          lineHeight: 1,
          color: "#05070a",
          whiteSpace: "nowrap",
        }}
      >
        {brandText}
      </span>
    </Link>
  );
}