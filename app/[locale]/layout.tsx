import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ScrollButtons from "@/components/ScrollButtons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NinesPro",
  description: "永久免费公益工具平台",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <ScrollButtons />

        <main className="pt-16 min-h-screen">
          {children}
        </main>

        {/* Tesla风格版权 */}
        <footer className="text-center text-xs text-gray-500 py-12 space-y-2 border-t border-gray-100">
          {params.locale === "zh" ? (
            <>
              <div>九 © 2026 九域</div>
              <div>保留所有权利</div>
              <div>最终解释权归九域所有</div>
            </>
          ) : (
            <>
              <div>© 2026 NinesPro</div>
              <div>All rights reserved</div>
              <div>Final interpretation rights belong to NinesPro</div>
            </>
          )}
        </footer>
      </body>
    </html>
  );
}