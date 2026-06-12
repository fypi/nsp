import Link from "next/link";

type FooterProps = {
  locale?: string;
};

export default function Footer({ locale = "zh" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        marginTop: 64,
        padding: "18px 16px 22px",
        background: "#ffffff",
        color: "#333333",
        textAlign: "center",
        fontSize: 13,
        lineHeight: 1.6,
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 6,
        }}
      >
        <Link
          href={`/${locale}/privacy`}
          style={{ color: "#333333", textDecoration: "none" }}
        >
          隐私政策
        </Link>

        <span style={{ color: "#999999" }}>·</span>

        <Link
          href={`/${locale}/support`}
          style={{ color: "#333333", textDecoration: "none" }}
        >
          支持中心
        </Link>

        <span style={{ color: "#999999" }}>·</span>

        <Link
          href={`/${locale}/help`}
          style={{ color: "#333333", textDecoration: "none" }}
        >
          帮助中心
        </Link>

        <span style={{ color: "#999999" }}>·</span>

        <Link
          href={`/${locale}/contact`}
          style={{ color: "#333333", textDecoration: "none" }}
        >
          联系我们
        </Link>
      </div>

      <div style={{ color: "#666666" }}>
        © {currentYear} NinesPro / 九域. All rights reserved.
      </div>
    </footer>
  );
}
