"use client";

import { useEffect, useRef, useState } from "react";

const NAV_HEIGHT = 52;
const HIT_WIDTH = 6;
const THUMB_WIDTH = 3;
const BUTTON_SIZE = 6;
const MIN_THUMB_HEIGHT = 34;

function getScrollTarget(): HTMLElement {
  const pageContainer = document.querySelector<HTMLElement>(".page-container");

  if (pageContainer) {
    return pageContainer;
  }

  return (document.scrollingElement as HTMLElement | null) || document.documentElement;
}

export default function NinesTouchScrollbar() {
  const [enabled, setEnabled] = useState(false);
  const [thumbTop, setThumbTop] = useState(NAV_HEIGHT + BUTTON_SIZE);
  const [thumbHeight, setThumbHeight] = useState(MIN_THUMB_HEIGHT);
  const [canScroll, setCanScroll] = useState(false);

  const targetRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);

  const recalc = () => {
    const target = getScrollTarget();
    targetRef.current = target;

    const scrollHeight = Math.max(1, target.scrollHeight);
    const clientHeight = Math.max(1, target.clientHeight);
    const scrollTop = target.scrollTop;
    const maxScrollTop = Math.max(1, scrollHeight - clientHeight);

    const viewportHeight = window.innerHeight;
    const trackTop = NAV_HEIGHT + BUTTON_SIZE;
    const trackHeight = Math.max(
      80,
      viewportHeight - NAV_HEIGHT - BUTTON_SIZE * 2
    );

    const pageCanScroll = scrollHeight > clientHeight + 4;
    setCanScroll(pageCanScroll);

    const nextThumbHeight = Math.max(
      MIN_THUMB_HEIGHT,
      Math.round((clientHeight / scrollHeight) * trackHeight)
    );

    const travel = Math.max(1, trackHeight - nextThumbHeight);
    const nextThumbTop =
      trackTop + Math.round((scrollTop / maxScrollTop) * travel);

    setThumbHeight(nextThumbHeight);
    setThumbTop(nextThumbTop);
  };

  useEffect(() => {
    const updateEnabled = () => {
      setEnabled(
        window.matchMedia("(pointer: coarse)").matches ||
          window.innerWidth <= 1180
      );
    };

    updateEnabled();

    window.addEventListener("resize", updateEnabled);
    window.addEventListener("orientationchange", updateEnabled);

    return () => {
      window.removeEventListener("resize", updateEnabled);
      window.removeEventListener("orientationchange", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const target = getScrollTarget();
    targetRef.current = target;

    const run = () => {
      recalc();
    };

    const loop = () => {
      recalc();
      rafRef.current = window.requestAnimationFrame(loop);
    };

    target.addEventListener("scroll", run, { passive: true });
    document.addEventListener("scroll", run, true);
    window.addEventListener("resize", run);
    window.addEventListener("orientationchange", run);

    const resizeObserver = new ResizeObserver(run);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
    resizeObserver.observe(target);

    const mutationObserver = new MutationObserver(run);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    recalc();

    // 关键：持续同步 scrollTop，避免移动端/平板漏掉 scroll 事件。
    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      target.removeEventListener("scroll", run);
      document.removeEventListener("scroll", run, true);
      window.removeEventListener("resize", run);
      window.removeEventListener("orientationchange", run);

      resizeObserver.disconnect();
      mutationObserver.disconnect();

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;

      event.preventDefault();

      const target = targetRef.current || getScrollTarget();

      const viewportHeight = window.innerHeight;
      const trackHeight = Math.max(
        80,
        viewportHeight - NAV_HEIGHT - BUTTON_SIZE * 2
      );
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

  if (!enabled || !canScroll) return null;

  const scrollByAmount = (amount: number) => {
    const target = targetRef.current || getScrollTarget();
    target.scrollBy({ top: amount, behavior: "smooth" });
  };

  return (
    <div
      aria-hidden="true"
      data-nines-touch-scrollbar="true"
      style={{
        position: "fixed",
        top: NAV_HEIGHT,
        right: 0,
        bottom: 0,
        width: HIT_WIDTH,
        zIndex: 2147483647,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        onClick={() => scrollByAmount(-260)}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: HIT_WIDTH,
          height: BUTTON_SIZE,
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            display: "block",
            width: 0,
            height: 0,
            borderLeft: "2px solid transparent",
            borderRight: "2px solid transparent",
            borderBottom: "4px solid #111827",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: BUTTON_SIZE,
          right: 0,
          bottom: BUTTON_SIZE,
          width: HIT_WIDTH,
          background: "transparent",
          pointerEvents: "auto",
          touchAction: "none",
        }}
        onClick={(event) => {
          const target = targetRef.current || getScrollTarget();
          const isAboveThumb = event.clientY < thumbTop;

          target.scrollBy({
            top: isAboveThumb
              ? -target.clientHeight * 0.82
              : target.clientHeight * 0.82,
            behavior: "smooth",
          });
        }}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => {
            const target = targetRef.current || getScrollTarget();

            draggingRef.current = true;
            dragStartYRef.current = event.clientY;
            dragStartScrollTopRef.current = target.scrollTop;
            document.body.style.userSelect = "none";

            event.currentTarget.setPointerCapture(event.pointerId);
            event.stopPropagation();
          }}
          style={{
            position: "fixed",
            right: 1.5,
            top: thumbTop,
            width: THUMB_WIDTH,
            height: thumbHeight,
            minHeight: MIN_THUMB_HEIGHT,
            borderRadius: 999,
            background: "#111827",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.98), 0 2px 8px rgba(0,0,0,0.28)",
            pointerEvents: "auto",
            touchAction: "none",
            opacity: 1,
          }}
        />
      </div>

      <div
        onClick={() => scrollByAmount(260)}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: HIT_WIDTH,
          height: BUTTON_SIZE,
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            display: "block",
            width: 0,
            height: 0,
            borderLeft: "2px solid transparent",
            borderRight: "2px solid transparent",
            borderTop: "4px solid #111827",
          }}
        />
      </div>
    </div>
  );
}