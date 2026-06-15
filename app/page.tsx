import { createElement as h } from "react";

const buttonStyle = {
  minWidth: 148,
  minHeight: 48,
  borderRadius: 999,
  padding: "0 22px",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 700,
  color: "#111827",
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(246,248,251,0.86))",
  border: "1px solid rgba(15,23,42,0.08)",
  boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function RootPage() {
  return h(
    "main",
    {
      style: {
        minHeight: "100vh",
        background: "#ffffff",
        color: "#111827",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
      },
    },
    h(
      "section",
      {
        style: {
          width: "min(960px, calc(100vw - 48px))",
          textAlign: "center",
        },
      },
      h(
        "h1",
        {
          style: {
            margin: 0,
            fontSize: "clamp(36px, 6vw, 72px)",
            lineHeight: 1.02,
            letterSpacing: "-0.05em",
            fontWeight: 850,
          },
        },
        "NinesPro"
      ),
      h(
        "p",
        {
          style: {
            margin: "18px auto 0",
            maxWidth: 860,
            fontSize: "clamp(22px, 3vw, 38px)",
            lineHeight: 1.15,
            letterSpacing: "-0.04em",
            fontWeight: 760,
          },
        },
        "All things in the world, available at your fingertips"
      ),
      h(
        "p",
        {
          style: {
            margin: "18px auto 0",
            maxWidth: 720,
            fontSize: 15,
            lineHeight: 1.72,
            color: "#4b5563",
          },
        },
        "A calm workspace for tools, workflows, learning, finance, and AI. Everyday needs organized into ready-to-use cards."
      ),
      h(
        "div",
        {
          style: {
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            gap: 14,
            flexWrap: "wrap",
          },
        },
        h(
          "a",
          {
            href: "/tool",
            style: buttonStyle,
          },
          "Explore Tools"
        ),
        h(
          "a",
          {
            href: "/product",
            style: buttonStyle,
          },
          "Product Center"
        )
      )
    )
  );
}