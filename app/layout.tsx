import "./globals.css";
import NinesTouchScrollbar from "@/components/NinesTouchScrollbar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const iconVersion = "20260617";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ninespro.com"),
  title: {
    default: "NinesPro | AI Development & Digital Innovation",
    template: "%s | NinesPro",
  },
  description:
    "NinesPro builds AI-powered software, enterprise platforms, cloud systems, and digital experiences for modern businesses.",
  keywords: [
    "AI Development",
    "Software Development",
    "Digital Innovation",
    "Enterprise Software",
    "Cloud Solutions",
    "Web Development",
    "AI Automation",
    "SaaS Development",
    "Digital Product Design",
    "Business Automation",
  ],
  icons: {
    icon: [
      { url: `/icon.svg?v=${iconVersion}`, type: "image/svg+xml" },
      { url: `/favicon.svg?v=${iconVersion}`, type: "image/svg+xml" },
    ],
    shortcut: `/icon.svg?v=${iconVersion}`,
    apple: [{ url: `/apple-icon.svg?v=${iconVersion}`, type: "image/svg+xml" }],
  },
  openGraph: {
    title: "NinesPro | AI Development & Digital Innovation",
    description:
      "NinesPro builds AI-powered software, enterprise platforms, cloud systems, and digital experiences for modern businesses.",
    url: "https://www.ninespro.com",
    siteName: "NinesPro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NinesPro | AI Development & Digital Innovation",
    description:
      "NinesPro builds AI-powered software, enterprise platforms, cloud systems, and digital experiences for modern businesses.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href={`/icon.svg?v=${iconVersion}`} type="image/svg+xml" />
        <link rel="shortcut icon" href={`/icon.svg?v=${iconVersion}`} />
        <link rel="apple-touch-icon" href={`/apple-icon.svg?v=${iconVersion}`} />
      </head>
      <body>
        {children}
        <NinesTouchScrollbar />
      </body>
    </html>
  );
}