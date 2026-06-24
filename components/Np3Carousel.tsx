"use client";

import { useMemo, useRef, useState } from "react";

export type Np3CardItem = {
  title: string;
  desc: string;
};

type Np3CarouselProps = {
  kicker: string;
  title: string;
  desc: string;
  items: Np3CardItem[];
};

function ChevronLeft() {
  return (
    <svg className="np3-arrow-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15 6L9 12L15 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="np3-arrow-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 6L15 12L9 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Np3Carousel({
  kicker,
  title,
  desc,
  items,
}: Np3CarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activePage, setActivePage] = useState(0);

  const pageCount = 3;
  const motionText = `${title} — ${desc}`;

  const pages = useMemo(() => [0, 1, 2], []);

  const scrollToPage = (page: number) => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const targetLeft = pageCount <= 1 ? 0 : (maxScroll * page) / (pageCount - 1);

    track.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });

    setActivePage(page);
  };

  const updateActivePage = () => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) {
      setActivePage(0);
      return;
    }

    const ratio = track.scrollLeft / maxScroll;
    const nextPage = Math.min(2, Math.max(0, Math.round(ratio * 2)));

    setActivePage(nextPage);
  };

  const goPrev = () => {
    const next = activePage <= 0 ? 0 : activePage - 1;
    scrollToPage(next);
  };

  const goNext = () => {
    const next = activePage >= 2 ? 2 : activePage + 1;
    scrollToPage(next);
  };

  return (
    <section className="np3-section">
      <style>
        {`
          .np3-section {
            position: relative;
            overflow: hidden;
            background: #e9ebef;
            padding: 88px 0 96px;
            border-top: 30px solid #ffffff;
          }

          .np3-section-inner {
            position: relative;
            z-index: 2;
            width: min(1240px, calc(100vw - 48px));
            margin: 0 auto;
          }

          .np3-head {
            max-width: 760px;
            margin-bottom: 34px;
          }

          .np3-head-kicker {
            margin: 0 0 14px;
            font-size: 20px;
            line-height: 1;
            font-weight: 950;
            color: #344054;
            letter-spacing: 0.02em;
          }

          .np3-head-title {
            margin: 0;
            max-width: 780px;
            font-size: clamp(30px, 3.4vw, 48px);
            line-height: 1;
            letter-spacing: -0.052em;
            font-weight: 950;
            color: #05070a;
          }

          .np3-head-desc {
            margin: 16px 0 0;
            max-width: 700px;
            font-size: 17px;
            line-height: 1.68;
            color: #586275;
            font-weight: 650;
          }

          .np3-motion {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
          }

          .np3-motion-line {
            position: absolute;
            display: inline-flex;
            gap: 46px;
            min-width: max-content;
            white-space: nowrap;
            opacity: 0.2;
          }

          .np3-motion-line span {
            font-size: clamp(18px, 1.8vw, 30px);
            font-weight: 850;
            line-height: 1;
            letter-spacing: -0.035em;
            color: rgba(45, 55, 72, 0.36);
          }

          .np3-motion-line-a {
            top: 24px;
            left: 0;
            animation: np3MoveLeft 46s linear infinite;
          }

          .np3-motion-line-b {
            bottom: 28px;
            right: 0;
            animation: np3MoveRight 50s linear infinite;
          }

          @keyframes np3MoveLeft {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-33.333%, 0, 0); }
          }

          @keyframes np3MoveRight {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(33.333%, 0, 0); }
          }

          .np3-carousel-shell {
            position: relative;
            width: 100vw;
            margin-left: calc((100vw - min(1240px, calc(100vw - 48px))) / -2);
          }

          .np3-track {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: minmax(300px, calc((min(1240px, calc(100vw - 48px)) - 48px) / 3));
            gap: 24px;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            scrollbar-width: none;
            padding:
              4px
              max(24px, calc((100vw - 1240px) / 2))
              14px;
          }

          .np3-track::-webkit-scrollbar {
            display: none;
          }

          .np3-card {
            scroll-snap-align: start;
            min-height: 300px;
            border-radius: 44px;
            padding: 34px;
            display: flex;
            align-items: center;
            background:
              radial-gradient(circle at 16% 0%, rgba(255,255,255,1), rgba(255,255,255,0.72) 38%, rgba(247,248,250,0.92) 76%),
              linear-gradient(145deg, rgba(255,255,255,0.96), rgba(239,243,248,0.8));
            border: 1px solid rgba(255,255,255,0.98);
            box-shadow:
              0 24px 64px rgba(15,23,42,0.08),
              inset 0 1px 0 rgba(255,255,255,0.98);
          }

          .np3-card h3 {
            display: block;
            margin: 0 0 14px;
            font-size: 26px;
            line-height: 1.06;
            letter-spacing: -0.045em;
            font-weight: 950;
            color: #05070a;
          }

          .np3-card p {
            display: block;
            margin: 0;
            max-width: 350px;
            font-size: 16px;
            line-height: 1.65;
            color: #586275;
            font-weight: 620;
          }

          .np3-arrow {
            position: absolute;
            top: 50%;
            z-index: 30;
            width: 56px;
            height: 56px;
            padding: 0;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.96);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #111827;
            background:
              radial-gradient(circle at 18% 8%, rgba(255,255,255,1), rgba(255,255,255,0.62) 38%, rgba(255,255,255,0.24) 76%),
              linear-gradient(145deg, rgba(255,255,255,0.98), rgba(243,246,249,0.88));
            box-shadow:
              0 18px 42px rgba(15,23,42,0.13),
              inset 0 1px 0 rgba(255,255,255,1);
            cursor: pointer;
            transform: translateY(-50%);
            transition: box-shadow 160ms ease, border-color 160ms ease;
          }

          .np3-arrow:hover,
          .np3-arrow:active,
          .np3-arrow:focus,
          .np3-arrow:focus-visible {
            top: 50%;
            transform: translateY(-50%);
            border-color: rgba(126, 177, 231, 0.55);
            box-shadow:
              0 20px 48px rgba(15,23,42,0.16),
              inset 0 1px 0 rgba(255,255,255,1);
          }

          .np3-arrow-left {
            left: 18px;
          }

          .np3-arrow-right {
            right: 30px;
          }

          .np3-arrow-svg {
            display: block;
            width: 24px;
            height: 24px;
            flex: 0 0 24px;
          }

          .np3-dots {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
          }

          .np3-dots button {
            width: 12px;
            height: 12px;
            min-width: 12px;
            min-height: 12px;
            padding: 0;
            border: none;
            border-radius: 999px;
            background: rgba(15,23,42,0.24);
            cursor: pointer;
            transform: none;
          }

          .np3-dots button[aria-current="true"] {
            width: 34px;
            background: rgba(15,23,42,0.78);
          }

          @media (max-width: 760px) {
            .np3-section {
              padding: 76px 0 86px;
            }

            .np3-track {
              grid-auto-columns: minmax(280px, 86vw);
            }

            .np3-arrow-left {
              left: 8px;
            }

            .np3-arrow-right {
              right: 8px;
            }

            .np3-motion-line {
              opacity: 0.12;
            }
          }
        `}
      </style>

      <div className="np3-motion" aria-hidden="true">
        <div className="np3-motion-line np3-motion-line-a">
          <span>{motionText}</span>
          <span>{motionText}</span>
          <span>{motionText}</span>
        </div>

        <div className="np3-motion-line np3-motion-line-b">
          <span>{motionText}</span>
          <span>{motionText}</span>
          <span>{motionText}</span>
        </div>
      </div>

      <button
        type="button"
        className="np3-arrow np3-arrow-left"
        onClick={goPrev}
        aria-label="Previous"
      >
        <ChevronLeft />
      </button>

      <button
        type="button"
        className="np3-arrow np3-arrow-right"
        onClick={goNext}
        aria-label="Next"
      >
        <ChevronRight />
      </button>

      <div className="np3-section-inner">
        <div className="np3-head">
          <p className="np3-head-kicker">{kicker}</p>
          <h2 className="np3-head-title">{title}</h2>
          <p className="np3-head-desc">{desc}</p>
        </div>

        <div className="np3-carousel-shell">
          <div ref={trackRef} className="np3-track" onScroll={updateActivePage}>
            {items.map((item) => (
              <article className="np3-card" key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="np3-dots">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              aria-current={activePage === page ? "true" : undefined}
              onClick={() => scrollToPage(page)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}