"use client";

import { useEffect, useMemo, useRef } from "react";
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

function HeroMotionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const particleCount = window.innerWidth < 768 ? 26 : 42;

    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.00055,
      vy: (Math.random() - 0.5) * 0.00045,
      glow: Math.random() * 0.45 + 0.25,
    }));

    const resize = () => {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBackgroundGlow = (t: number) => {
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      const g1 = ctx.createRadialGradient(
        width * (0.28 + (px - 0.5) * 0.08),
        height * (0.35 + (py - 0.5) * 0.08),
        0,
        width * 0.28,
        height * 0.35,
        Math.max(width, height) * 0.55
      );
      g1.addColorStop(0, "rgba(255,255,255,0.12)");
      g1.addColorStop(0.35, "rgba(133,163,255,0.10)");
      g1.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2 = ctx.createRadialGradient(
        width * 0.75,
        height * (0.65 + Math.sin(t * 0.00035) * 0.03),
        0,
        width * 0.75,
        height * 0.65,
        Math.max(width, height) * 0.45
      );
      g2.addColorStop(0, "rgba(107,114,255,0.10)");
      g2.addColorStop(0.45, "rgba(90,90,160,0.07)");
      g2.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);
    };

    const drawGrid = (t: number) => {
      const gridGap = window.innerWidth < 768 ? 42 : 54;
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;

      const offsetX = Math.sin(t * 0.00015) * 8;
      const offsetY = Math.cos(t * 0.00012) * 6;

      for (let x = -gridGap; x < width + gridGap; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x - offsetX * 0.35, height);
        ctx.stroke();
      }

      for (let y = -gridGap; y < height + gridGap; y += gridGap) {
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(width, y - offsetY * 0.3);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawParticles = (t: number) => {
      const px = (pointerRef.current.x - 0.5) * 18;
      const py = (pointerRef.current.y - 0.5) * 14;

      particles.forEach((p, i) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -0.05) p.x = 1.05;
          if (p.x > 1.05) p.x = -0.05;
          if (p.y < -0.05) p.y = 1.05;
          if (p.y > 1.05) p.y = -0.05;
        }

        const x = p.x * width + px * (0.02 + (i % 5) * 0.01);
        const y = p.y * height + py * (0.02 + (i % 7) * 0.008);

        const twinkle = 0.65 + Math.sin(t * 0.0012 + i) * 0.25;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.glow * twinkle})`;
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const ax = particles[i].x * width;
          const ay = particles[i].y * height;
          const bx = particles[j].x * width;
          const by = particles[j].y * height;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < (window.innerWidth < 768 ? 95 : 130)) {
            const alpha = 1 - dist / (window.innerWidth < 768 ? 95 : 130);
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.10})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    const drawFlowLines = (t: number) => {
      ctx.save();
      ctx.lineWidth = 1.2;

      const baseY = height * 0.72;
      for (let i = 0; i < 3; i++) {
        const hueShift = i * 18;
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `rgba(255,255,255,${0.02 + i * 0.01})`);
        gradient.addColorStop(0.5, `rgba(${180 - hueShift},${190 - hueShift},255,${0.11 + i * 0.015})`);
        gradient.addColorStop(1, "rgba(255,255,255,0.02)");
        ctx.strokeStyle = gradient;

        ctx.beginPath();
        ctx.moveTo(0, baseY + i * 24);

        const cp1x = width * 0.22;
        const cp1y = baseY - 36 + Math.sin(t * 0.00045 + i) * 16 + i * 20;
        const cp2x = width * 0.68;
        const cp2y = baseY + 42 + Math.cos(t * 0.00038 + i * 1.2) * 18;
        const endX = width;
        const endY = baseY + i * 20 - Math.sin(t * 0.00028 + i * 0.8) * 10;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "rgba(7,12,24,0.78)");
      bg.addColorStop(0.45, "rgba(14,18,38,0.56)");
      bg.addColorStop(1, "rgba(10,10,16,0.72)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      drawBackgroundGlow(t);
      drawGrid(t);
      drawFlowLines(t);
      drawParticles(t);

      animationId = requestAnimationFrame(render);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointerRef.current.x = (e.clientX - rect.left) / rect.width;
      pointerRef.current.y = (e.clientY - rect.top) / rect.height;
    };

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = wrap.getBoundingClientRect();
      pointerRef.current.x = (touch.clientX - rect.left) / rect.width;
      pointerRef.current.y = (touch.clientY - rect.top) / rect.height;
    };

    resize();
    render(0);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    wrap.addEventListener("mousemove", handleMove);
    wrap.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
      wrap.removeEventListener("mousemove", handleMove);
      wrap.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 1,
        }}
      />
    </div>
  );
}

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
                backgroundImage: `url(${item.image})`,
                overflow: "hidden",
              }}
            >
              {isFirstScreen && <HeroMotionCanvas />}

              <div
                className="overlay"
                style={
                  isFirstScreen
                    ? {
                        background:
                          "linear-gradient(180deg, rgba(3,6,18,0.32) 0%, rgba(7,10,22,0.45) 100%)",
                      }
                    : undefined
                }
              ></div>

              <div
                className="content"
                style={
                  isFirstScreen
                    ? {
                        textShadow: "0 6px 24px rgba(0,0,0,0.35)",
                      }
                    : undefined
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
