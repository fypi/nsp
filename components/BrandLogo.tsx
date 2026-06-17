"use client";

import Link from "next/link";
import { useState } from "react";

type Locale = "en" | "zh" | "zh-TW";

type BrandLogoProps = {
  locale?: Locale;
  compact?: boolean;
  className?: string;
};

const logoSources = [
  "/brand/logo-wordmark.svg",
  "/brand/logo-wordmark.png",
  "/brand/logo-black.png",
  "/brand/logo-white.png",
];

function getHomeHref(locale: Locale) {
  if (locale === "en") return "/";
  return `/${locale}`;
}

function getSlogan(locale: Locale) {
  if (locale === "en") {
    return "— All things in the world, available at your fingertips";
  }

  if (locale === "zh-TW") {
    return "—— 盡知天下事，彈指皆可得";
  }

  return "—— 尽知天下事，弹指皆可得";
}

export default function BrandLogo({
  locale = "zh",
  compact = false,
  className,
}: BrandLogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);

  const href = getHomeHref(locale);
  const src = logoSources[sourceIndex] ?? "/brand/logo-wordmark.png";
  const slogan = getSlogan(locale);

  return (
    <Link
      href={href}
      aria-label="NinesPro Home"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 38,
        minWidth: 0,
        maxWidth: "calc(100vw - 74px)",
        color: "#111827",
        textDecoration: "none",
        flexShrink: 1,
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt="NinesPro"
        onError={() => {
          setSourceIndex((current) =>
            current < logoSources.length - 1 ? current + 1 : current
          );
        }}
        style={{
          display: "block",
          width: compact ? 116 : 148,
          height: "auto",
          maxHeight: compact ? 28 : 32,
          objectFit: "contain",
          flex: "0 0 auto",
        }}
      />

      <span
        style={{
          display: "inline-block",
          fontSize: compact ? 11 : 13,
          lineHeight: 1.15,
          fontWeight: 650,
          letterSpacing: locale === "en" ? "-0.02em" : "0.01em",
          color: "#111827",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          transform: "translateY(0.5px)",
        }}
      >
        {slogan}
      </span>
    </Link>
  );
}