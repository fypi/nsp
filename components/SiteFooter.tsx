"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";
type FooterLink = { label: string; href: string };
type FooterColumn = { title: string; links: FooterLink[] };
type FooterCopy = { desc: string; columns: FooterColumn[]; copyright: string };

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "en";
}

function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

const footerCopy: Record<Locale, FooterCopy> = {
  zh: {
    desc: "面向下一代数字产品的 AI 原生软件公司。",
    copyright: "NINESPRO © 2026 版权所有",
    columns: [
      {
        title: "产品",
        links: [
          { label: "Nines AI", href: "/product#automation" },
          { label: "Nines Cloud", href: "/product#cloud" },
          { label: "Nines Studio", href: "/product#studio" },
          { label: "Nines Enterprise", href: "/product#enterprise" },
          { label: "工具中心", href: "/tool" },
        ],
      },
      {
        title: "解决方案",
        links: [
          { label: "业务自动化", href: "/solution#business" },
          { label: "AI 转型", href: "/solution#ai" },
          { label: "数字平台", href: "/solution#platform" },
          { label: "数据智能", href: "/solution#data" },
          { label: "定制开发", href: "/service" },
        ],
      },
      {
        title: "资源",
        links: [
          { label: "博客", href: "/resources#blog" },
          { label: "文档", href: "/resources#docs" },
          { label: "帮助中心", href: "/resources#support" },
          { label: "工具", href: "/tool" },
          { label: "更新日志", href: "/resources#support" },
        ],
      },
      {
        title: "公司",
        links: [
          { label: "关于我们", href: "/company#about" },
          { label: "联系我们", href: "/company#contact" },
          { label: "加入我们", href: "/company#careers" },
          { label: "合作伙伴", href: "/company" },
          { label: "品牌", href: "/company" },
        ],
      },
      {
        title: "法律",
        links: [
          { label: "隐私政策", href: "/privacy" },
          { label: "服务条款", href: "/terms" },
          { label: "Cookie 政策", href: "/cookies" },
          { label: "免责声明", href: "/legal" },
        ],
      },
    ],
  },
  "zh-TW": {
    desc: "面向下一代數位產品的 AI 原生軟體公司。",
    copyright: "NINESPRO © 2026 版權所有",
    columns: [
      {
        title: "產品",
        links: [
          { label: "Nines AI", href: "/product#automation" },
          { label: "Nines Cloud", href: "/product#cloud" },
          { label: "Nines Studio", href: "/product#studio" },
          { label: "Nines Enterprise", href: "/product#enterprise" },
          { label: "工具中心", href: "/tool" },
        ],
      },
      {
        title: "解決方案",
        links: [
          { label: "業務自動化", href: "/solution#business" },
          { label: "AI 轉型", href: "/solution#ai" },
          { label: "數位平台", href: "/solution#platform" },
          { label: "數據智能", href: "/solution#data" },
          { label: "定制開發", href: "/service" },
        ],
      },
      {
        title: "資源",
        links: [
          { label: "部落格", href: "/resources#blog" },
          { label: "文檔", href: "/resources#docs" },
          { label: "幫助中心", href: "/resources#support" },
          { label: "工具", href: "/tool" },
          { label: "更新日誌", href: "/resources#support" },
        ],
      },
      {
        title: "公司",
        links: [
          { label: "關於我們", href: "/company#about" },
          { label: "聯絡我們", href: "/company#contact" },
          { label: "加入我們", href: "/company#careers" },
          { label: "合作夥伴", href: "/company" },
          { label: "品牌", href: "/company" },
        ],
      },
      {
        title: "法律",
        links: [
          { label: "隱私政策", href: "/privacy" },
          { label: "服務條款", href: "/terms" },
          { label: "Cookie 政策", href: "/cookies" },
          { label: "免責聲明", href: "/legal" },
        ],
      },
    ],
  },
  en: {
    desc: "An AI-native software company for next-generation digital products.",
    copyright: "NINESPRO © 2026 All rights reserved.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Nines AI", href: "/product#automation" },
          { label: "Nines Cloud", href: "/product#cloud" },
          { label: "Nines Studio", href: "/product#studio" },
          { label: "Nines Enterprise", href: "/product#enterprise" },
          { label: "Tools", href: "/tool" },
        ],
      },
      {
        title: "Solution",
        links: [
          { label: "Business Automation", href: "/solution#business" },
          { label: "AI Transformation", href: "/solution#ai" },
          { label: "Digital Platforms", href: "/solution#platform" },
          { label: "Data Intelligence", href: "/solution#data" },
          { label: "Custom Development", href: "/service" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/resources#blog" },
          { label: "Documentation", href: "/resources#docs" },
          { label: "Help Center", href: "/resources#support" },
          { label: "Tools", href: "/tool" },
          { label: "Changelog", href: "/resources#support" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/company#about" },
          { label: "Contact", href: "/company#contact" },
          { label: "Careers", href: "/company#careers" },
          { label: "Partners", href: "/company" },
          { label: "Brand", href: "/company" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Cookie Policy", href: "/cookies" },
          { label: "Disclaimer", href: "/legal" },
        ],
      },
    ],
  },
};

export default function SiteFooter() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);
  const copy = footerCopy[locale];

  return (
    <footer className="ninesFooter">
      <style>{`
        .ninesFooter {
          background: #ffffff;
          color: #05070a;
          padding: 74px 24px 32px;
        }
        .ninesFooterInner {
          width: min(1080px, calc(100vw - 48px));
          margin: 0 auto;
        }
        .ninesFooterBrand {
          text-align: center;
          margin-bottom: 44px;
        }
        .ninesFooterBrand h2 {
          margin: 0;
          font-size: 30px;
          line-height: 1;
          letter-spacing: -0.075em;
          font-weight: 950;
        }
        .ninesFooterBrand p {
          margin: 16px auto 0;
          max-width: 620px;
          color: #647084;
          font-size: 15px;
          line-height: 1.7;
          font-weight: 650;
        }
        .ninesFooterGrid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 38px;
          padding-top: 5px;
        }
        .ninesFooterColumn h3 {
          margin: 0 0 16px;
          font-size: 14px;
          line-height: 1;
          font-weight: 950;
          color: #05070a;
        }
        .ninesFooterColumn a {
          display: block;
          width: fit-content;
          margin: 0 0 11px;
          color: #111827;
          text-decoration: none;
          font-size: 14px;
          line-height: 1.3;
          font-weight: 650;
        }
        .ninesFooterColumn a:hover {
          color: #2563eb;
        }
        .ninesFooterBottom {
          margin-top: 20px;
          padding-top: 28px;
          border-top: 0.5px solid rgba(15, 23, 42, 0.1);
          text-align: center;
          color: #647084;
          font-size: 13px;
          font-weight: 650;
        }
        @media (max-width: 880px) {
          .ninesFooterGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 560px) {
          .ninesFooter {
            padding: 58px 20px 28px;
          }
          .ninesFooterInner {
            width: calc(100vw - 40px);
          }
          .ninesFooterGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="ninesFooterInner">
        <div className="ninesFooterBrand">
          <h2>NINESPRO</h2>
          <p>{copy.desc}</p>
        </div>

        <div className="ninesFooterGrid">
          {copy.columns.map((column) => (
            <div className="ninesFooterColumn" key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((item) => (
                <Link key={`${column.title}-${item.label}`} href={localePath(locale, item.href)}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="ninesFooterBottom">{copy.copyright}</div>
      </div>
    </footer>
  );
}
