
"use client";

import { useEffect, useRef, useState } from "react";

const NAV_HEIGHT = 52;
const BAR_WIDTH = 12;
const BUTTON_SIZE = 12;
const MIN_THUMB_HEIGHT = 36;

function getScrollTarget(): HTMLElement | null {
  const pageContainer = document.querySelector<HTMLElement>(".page-container");
  if (pageContainer) return pageContainer;

  const scrollingElement = document.scrollingElement as HTMLElement | null;
  return scrollingElement || document.documentElement;
}

export default function NinesTouchScrollbar() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(MIN_THUMB_HEIGHT);

  const targetRef = useRef<HTMLElement | null>(null);
  const draggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);

  const recalc = () => {
    const target = targetRef.current;
    if (!target) return;

    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const scrollTop = target.scrollTop;
    const maxScrollTop = Math.max(1, scrollHeight - clientHeight);

    const viewportHeight = window.innerHeight;
    const trackTop = NAV_HEIGHT + BUTTON_SIZE;
    const trackHeight = Math.max(80, viewportHeight - NAV_HEIGHT - BUTTON_SIZE * 2);

    const nextVisible = scrollHeight > clientHeight + 4;
    const nextThumbHeight = Math.max(
      MIN_THUMB_HEIGHT,
      Math.round((clientHeight / scrollHeight) * trackHeight)
    );
    const travel = Math.max(1, trackHeight - nextThumbHeight);
    const nextThumbTop = trackTop + Math.round((scrollTop / maxScrollTop) * travel);

    setVisible(nextVisible);
    setThumbHeight(nextThumbHeight);
    setThumbTop(nextThumbTop);
  };

  useEffect(() => {
    const updateEnabled = () => {
      const isTouchLike = window.matchMedia("(pointer: coarse)").matches;
      setEnabled(isTouchLike);
    };

    updateEnabled();
    window.addEventListener("resize", updateEnabled);
    return () => window.removeEventListener("resize", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const target = getScrollTarget();
    if (!target) return;

    targetRef.current = target;
    recalc();

    target.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    window.addEventListener("orientationchange", recalc);

    const timer = window.setInterval(recalc, 350);

    return () => {
      target.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
      window.removeEventListener("orientationchange", recalc);
      window.clearInterval(timer);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      event.preventDefault();

      const target = targetRef.current;
      if (!target) return;

      const viewportHeight = window.innerHeight;
      const trackHeight = Math.max(80, viewportHeight - NAV_HEIGHT - BUTTON_SIZE * 2);
      const maxScrollTop = Math.max(1, target.scrollHeight - target.clientHeight);
      const travel = Math.max(1, trackHeight - thumbHeight);
      const deltaY = event.clientY - dragStartYRef.current;
      const deltaScroll = (deltaY / travel) * maxScrollTop;

      target.scrollTop = dragStartScrollTopRef.current + deltaScroll;
    };

    const onPointerUp = () => {
      draggingRef.current = false;
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [enabled, thumbHeight]);

  if (!enabled || !visible) return null;

  const scrollByAmount = (amount: number) => {
    const target = targetRef.current;
    if (!target) return;
    target.scrollBy({ top: amount, behavior: "smooth" });
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: NAV_HEIGHT,
        right: 0,
        bottom: 0,
        width: BAR_WIDTH,
        zIndex: 2147483000,
        pointerEvents: "none",
        background: "#ffffff",
      }}
    >
      <button
        type="button"
        tabIndex={-1}
        onClick={() => scrollByAmount(-280)}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: BAR_WIDTH,
          height: BUTTON_SIZE,
          border: "none",
          borderRadius: 0,
          padding: 0,
          margin: 0,
          pointerEvents: "auto",
          background: "#e0e0e0",
          color: "#666666",
          fontSize: 9,
          lineHeight: `${BUTTON_SIZE}px`,
          textAlign: "center",
          boxShadow: "none",
          WebkitTextFillColor: "#666666",
        }}
      >
        ▲
      </button>

      <div
        style={{
          position: "absolute",
          top: BUTTON_SIZE,
          right: 0,
          bottom: BUTTON_SIZE,
          width: BAR_WIDTH,
          background: "#ffffff",
          pointerEvents: "auto",
        }}
        onClick={(event) => {
          const target = targetRef.current;
          if (!target) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const clickY = event.clientY - rect.top;
          const isAboveThumb = event.clientY < thumbTop;
          const amount = isAboveThumb ? -target.clientHeight * 0.8 : target.clientHeight * 0.8;
          if (clickY >= 0) target.scrollBy({ top: amount, behavior: "smooth" });
        }}
      >
        <div
          onPointerDown={(event) => {
            const target = targetRef.current;
            if (!target) return;
            draggingRef.current = true;
            dragStartYRef.current = event.clientY;
            dragStartScrollTopRef.current = target.scrollTop;
            document.body.style.userSelect = "none";
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          style={{
            position: "fixed",
            right: 2,
            top: thumbTop,
            width: 8,
            height: thumbHeight,
            borderRadius: 999,
            background: "#888888",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.72)",
            pointerEvents: "auto",
            touchAction: "none",
          }}
        />
      </div>

      <button
        type="button"
        tabIndex={-1}
        onClick={() => scrollByAmount(280)}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: BAR_WIDTH,
          height: BUTTON_SIZE,
          border: "none",
          borderRadius: 0,
          padding: 0,
          margin: 0,
          pointerEvents: "auto",
          background: "#e0e0e0",
          color: "#666666",
          fontSize: 9,
          lineHeight: `${BUTTON_SIZE}px`,
          textAlign: "center",
          boxShadow: "none",
          WebkitTextFillColor: "#666666",
        }}
      >
        ▼
      </button>
    </div>
  );
}
