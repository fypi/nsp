import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "九域 / NinesPro",
  description: "尽知天下事，弹指皆可得",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
