"use client";

import { useParams } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";

type HomeSection = {
  title: string;
  subtitle: string;
  image: string;
  btn1: string;
  btn2: string;
  link1: string;
  link2: string;
  footer?: {
    copyright: string;
    privacy: string;
    contact: string;
    help: string;
  };
};

export default function Home() {
  const params = useParams();
  const rawLocale = params?.locale;

  const locale: Locale =
    rawLocale === "en" || rawLocale === "zh-TW" || rawLocale === "zh"
      ? rawLocale
      : "zh";

  const data: Record<Locale, HomeSection[]> = {
    zh: [
      {
        title: "九域",
        subtitle: "尽知天下事，弹指皆可得",
        image: "/images/hero-1.jpg",
        btn1: "开始使用",
        btn2: "了解更多",
        link1: "/tool",
        link2: "/product",
        footer: {
          copyright: "九域 © 2026 版权所有",
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
        link1: "/product",
        link2: "/solution",
      },
      {
        title: "全能工具",
        subtitle: "公开可用 · 持续更新",
        image: "/images/hero-3.jpg",
        btn1: "立即体验",
        btn2: "帮助中心",
        link1: "/tool",
        link2: "/help",
      },
    ],
    "zh-TW": [
      {
        title: "九域",
        subtitle: "盡知天下事，彈指皆可得",
        image: "/images/hero-1.jpg",
        btn1: "開始使用",
        btn2: "了解更多",
        link1: "/tool",
        link2: "/product",
        footer: {
          copyright: "九域 © 2026 版權所有",
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
        link1: "/product",
        link2: "/solution",
      },
      {
        title: "全能工具",
        subtitle: "公開可用 · 持續更新",
        image: "/images/hero-3.jpg",
        btn1: "立即體驗",
        btn2: "幫助中心",
        link1: "/tool",
        link2: "/help",
      },
    ],
    en: [
      {
        title: "NinesPro",
        subtitle: "All things in the world, available at your fingertips",
        image: "/images/hero-1.jpg",
        btn1: "Get Started",
        btn2: "Learn More",
        link1: "/tool",
        link2: "/product",
        footer: {
          copyright: "NinesPro © 2026 All Rights Reserved",
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
        link1: "/product",
        link2: "/solution",
      },
      {
        title: "All-Purpose Tools",
        subtitle: "Open Access · Continuous Updates",
        image: "/images/hero-3.jpg",
        btn1: "Try Now",
        btn2: "Help Center",
        link1: "/tool",
        link2: "/help",
      },
    ],
  };

  const sections = data[locale];
  const footer = sections[0]?.footer;

  return (
    <div className="page-wrapper">
      <div className="page-container">
        {sections.map((item, index) => {
          const isFirstScreen = index === 0;

          return (
            <section
              key={index}
              className="screen"
              style={{
                backgroundImage: isFirstScreen ? undefined : `url(${item.image})`,
                overflow: "hidden",
              }}
            >
              {isFirstScreen && (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/hero-1.jpg"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                  }}
                >
                  <source src="/videos/hero-nebula.mp4" type="video/mp4" />
                </video>
              )}

              <div
                className="overlay"
                style={
                  isFirstScreen
                    ? {
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.36) 100%)",
                        zIndex: 1,
                      }
                    : {
                        zIndex: 1,
                      }
                }
              />

              <div
                className="content"
                style={
                  isFirstScreen
                    ? {
                        zIndex: 2,
                        textShadow: "0 6px 24px rgba(0,0,0,0.35)",
                      }
                    : {
                        zIndex: 2,
                      }
                }
              >
                <h1>{item.title}</h1>
                <p>{item.subtitle}</p>

                <div className="btn-group">
                  <a href={`/${locale}${item.link1}`} className="btn-white">
                    {item.btn1}
                  </a>
                  <a href={`/${locale}${item.link2}`} className="btn-dark">
                    {item.btn2}
                  </a>
                </div>
              </div>
            </section>
          );
        })}

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
