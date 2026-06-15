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

export default function BrandLogo({
  locale = "zh",
  compact = false,
  className,
}: BrandLogoProps) {
  const [sourceIndex, setSourceIndex] = useState(0);

  const href = `/${locale}`;
  const src = logoSources[sourceIndex] ?? "/brand/logo-wordmark.png";

  return (
    <Link
      href={href}
      aria-label="NinesPro Home"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: compact ? 34 : 38,
        minWidth: compact ? 116 : 148,
        color: "#111827",
        textDecoration: "none",
        flexShrink: 0,
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
        }}
      />
    </Link>
  );
}
