import "./globals.css";
import NinesTouchScrollbar from "@/components/NinesTouchScrollbar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const iconVersion = "20260617b";

export const metadata: Metadata = {
  title: "NinesPro — All things in the world, available at your fingertips",
  description:
    "A calm workspace for tools, workflows, learning, finance, and AI.",
  icons: {
    icon: [
      { url: `/favicon.ico?v=${iconVersion}`, type: "image/x-icon" },
      { url: `/icon.svg?v=${iconVersion}`, type: "image/svg+xml" },
      { url: `/favicon.svg?v=${iconVersion}`, type: "image/svg+xml" },
    ],
    shortcut: `/favicon.ico?v=${iconVersion}`,
    apple: [{ url: `/apple-icon.svg?v=${iconVersion}`, type: "image/svg+xml" }],
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
        <link rel="icon" href={`/favicon.ico?v=${iconVersion}`} sizes="any" />
        <link rel="icon" href={`/icon.svg?v=${iconVersion}`} type="image/svg+xml" />
        <link rel="shortcut icon" href={`/favicon.ico?v=${iconVersion}`} />
        <link rel="apple-touch-icon" href={`/apple-icon.svg?v=${iconVersion}`} />
      </head>
      <body>
        {children}
        <NinesTouchScrollbar />
      </body>
    </html>
  );
}
