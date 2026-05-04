// ✅ 修复版 layout.tsx
// ============ 修复清单 ============
// 1. <html lang> 根据 locale 动态设置  →  修复硬编码 zh-CN
// 2. viewport 用 Next.js metadata API   →  修复三重 meta 标签
// 3. generateMetadata 补全 SEO 元数据   →  修复无标题/描述/OG
// 4. 添加 <html> + <body> 包裹        →  修复根布局结构不规范
// 5. 删除 JSX 中无效的 <meta> 标签     →  修复三重重复

import Navbar from "@/components/Navbar";
import type { Metadata, Viewport } from "next";

// ✅ 视口 — Next.js 自动合并为一个 <meta>，不会重复
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // 不限制缩放 — 无障碍友好
};

// ✅ SEO 元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    zh: "九域 NinesPro — 尽知天下事，弹指皆可得",
    "zh-TW": "九域 NinesPro — 盡知天下事，彈指皆可得",
    en: "NinesPro — All Things in the World, Available at Your Fingertips",
  };

  const descriptions: Record<string, string> = {
    zh: "九域提供高效智能的产品中心、全能工具和解决方案，助力企业数字化转型。",
    "zh-TW": "九域提供高效智能的產品中心、全能工具和解決方案，助力企業數位轉型。",
    en: "NinesPro offers intelligent products, all-purpose tools, and enterprise solutions for digital transformation.",
  };

  return {
    title: titles[locale] || titles.zh,
    description: descriptions[locale] || descriptions.zh,
    icons: { icon: "/favicon.ico" },
    openGraph: {
      title: titles[locale] || titles.zh,
      description: descriptions[locale] || descriptions.zh,
      type: "website",
    },
  };
}

// ✅ 根布局 — 动态 lang 属性
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // HTML lang 按 locale 正确映射
  const lang =
    locale === "en" ? "en" : locale === "zh-TW" ? "zh-TW" : "zh-CN";

  return (
    <html lang={lang}>
      <body style={{ margin: 0, padding: 0, minHeight: "100vh" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
