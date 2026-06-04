import Link from "next/link";
import Image from "next/image";

type BrandLogoProps = {
  locale?: string;
  compact?: boolean;
};

export default function BrandLogo({
  locale = "zh",
  compact = false,
}: BrandLogoProps) {
  const href = `/${locale}`;

  return (
    <Link
      href={href}
      aria-label={locale === "en" ? "NinesPro Home" : "九域首页"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        color: "#111827",
        whiteSpace: "nowrap",
        height: compact ? 30 : 34,
      }}
    >
      <Image
        src="/brand/logo-wordmark.png"
        alt="NinesPro"
        width={compact ? 128 : 150}
        height={compact ? 35 : 42}
        priority
        style={{
          width: compact ? 128 : 150,
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
    </Link>
  );
}
