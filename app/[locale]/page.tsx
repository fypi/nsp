"use client";

import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "zh";

  const data = {
    zh: [
      {
        title: "九域",
        subtitle: "尽知天下事，弹指皆可得",
        image: "/images/hero-1.jpg",
        btn1: "开始使用",
        btn2: "了解更多",
        footer: {
          copyright: "九域 © 2026 九域 版权所有 | 最终解释权归九域所有",
          privacy: "隐私与法律",
          contact: "联系方式",
          help: "帮助中心",
        },
      },
      {
        title: "产品中心",
        subtitle: "高效智能 · 极简体验",
        image: "/images/hero-2.jpg",
        btn1: "浏览产品",
        btn2: "定制方案",
      },
      {
        title: "全能工具",
        subtitle: "永久免费 · 持续更新",
        image: "/images/hero-3.jpg",
        btn1: "立即体验",
        btn2: "帮助中心",
      },
    ],
    "zh-TW": [
      {
        title: "九域",
        subtitle: "盡知天下事，彈指皆可得",
        image: "/images/hero-1.jpg",
        btn1: "開始使用",
        btn2: "了解更多",
        footer: {
          copyright: "九域 © 2026 九域 版權所有 | 最終解釋權歸九域所有",
          privacy: "隱私與法律",
          contact: "聯絡方式",
          help: "說明中心",
        },
      },
      {
        title: "產品中心",
        subtitle: "高效智能 · 極簡體驗",
        image: "/images/hero-2.jpg",
        btn1: "瀏覽產品",
        btn2: "定制方案",
      },
      {
        title: "全能工具",
        subtitle: "永久免費 · 持續更新",
        image: "/images/hero-3.jpg",
        btn1: "立即體驗",
        btn2: "幫助中心",
      },
    ],
    en: [
      {
        title: "NinesPro",
        subtitle: "All things in the world, available at your fingertips",
        image: "/images/hero-1.jpg",
        btn1: "Get Started",
        btn2: "Learn More",
        footer: {
          copyright: "NinesPro © 2026 NinesPro All Rights Reserved",
          privacy: "Privacy & Legal",
          contact: "Contact",
          help: "Help Center",
        },
      },
      {
        title: "Product Center",
        subtitle: "Efficient & Intelligent · Minimalist Experience",
        image: "/images/hero-2.jpg",
        btn1: "Browse Products",
        btn2: "Custom Solutions",
      },
      {
        title: "All-Purpose Tools",
        subtitle: "Free Forever · Continuous Updates",
        image: "/images/hero-3.jpg",
        btn1: "Try Now",
        btn2: "Help Center",
      },
    ],
  };

  const sections = data[locale] || data.zh;
  const footer = sections[0].footer;

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="page-container">
        {sections.map((item, index) => (
          <section
            key={index}
            className="screen"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="overlay"></div>

            <div className="content">
              <h1>{item.title}</h1>
              <p>{item.subtitle}</p>

              <div className="btn-group">
                <button className="btn-white">{item.btn1}</button>
                <button className="btn-dark">{item.btn2}</button>
              </div>
            </div>
          </section>
        ))}

        <footer className="page-footer">
          <div className="footer-links">
            <span>{footer?.copyright}</span>
            <a href={`/${locale}/privacy`}>{footer?.privacy}</a>
            <a href={`/${locale}/contact`}>{footer?.contact}</a>
            <a href={`/${locale}/help`}>{footer?.help}</a>
          </div>
        </footer>
      </div>
    </div>
  );
}