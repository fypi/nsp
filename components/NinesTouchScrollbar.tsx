"use client";

import { useEffect, useRef, useState } from "react";

const NAV_HEIGHT = 52;
const HIT_WIDTH = 6;
const THUMB_WIDTH = 3;
const BUTTON_SIZE = 6;
const MIN_THUMB_HEIGHT = 34;

function getTarget(): HTMLElement {
  return (
    document.querySelector<HTMLElement>(".page-container") ||
    (document.scrollingElement as HTMLElement | null) ||
    document.documentElement
  );
}

export default function NinesTouchScrollbar() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [thumbTop, setThumbTop] = useState(NAV_HEIGHT + BUTTON_SIZE);
  const [thumbHeight, setThumbHeight] = useState(MIN_THUMB_HEIGHT);
  const [canScroll, setCanScroll] = useState(true);

  const targetRef = useRef<HTMLElement | null>(null);
  const draggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);

  const recalc = () => {
    const target = getTarget();
    targetRef.current = target;

    const scrollHeight = Math.max(1, target.scrollHeight);
    const clientHeight = Math.max(1, target.clientHeight);
    const scrollTop = target.scrollTop;
    const maxScrollTop = Math.max(1, scrollHeight - clientHeight);

    const viewportHeight = window.innerHeight;
    const trackTop = NAV_HEIGHT + BUTTON_SIZE;
    const trackHeight = Math.max(80, viewportHeight - NAV_HEIGHT - BUTTON_SIZE * 2);

    const pageCanScroll = scrollHeight > clientHeight + 4;
    setCanScroll(pageCanScroll);

    const nextThumbHeight = pageCanScroll
      ? Math.max(MIN_THUMB_HEIGHT, Math.round((clientHeight / scrollHeight) * trackHeight))
      : Math.max(MIN_THUMB_HEIGHT, Math.round(trackHeight * 0.28));

    const travel = Math.max(1, trackHeight - nextThumbHeight);
    const nextThumbTop = pageCanScroll
      ? trackTop + Math.round((scrollTop / maxScrollTop) * travel)
      : trackTop;

    setThumbHeight(nextThumbHeight);
    setThumbTop(nextThumbTop);
  };

  useEffect(() => {
    setMounted(true);
    const updateEnabled = () => {
      setEnabled(window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 1180);
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
    const run = () => requestAnimationFrame(recalc);
    run();

    document.addEventListener("scroll", recalc, true);
    window.addEventListener("resize", run);
    window.addEventListener("orientationchange", run);

    const resizeObserver = new ResizeObserver(run);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);

    const mutationObserver = new MutationObserver(run);
    mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true });

    const timer = window.setInterval(recalc, 200);

    return () => {
      document.removeEventListener("scroll", recalc, true);
      window.removeEventListener("resize", run);
      window.removeEventListener("orientationchange", run);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.clearInterval(timer);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      event.preventDefault();
      const target = targetRef.current || getTarget();
      const viewportHeight = window.innerHeight;
      const trackHeight = Math.max(80, viewportHeight - NAV_HEIGHT - BUTTON_SIZE * 2);
      const maxScrollTop = Math.max(1, target.scrollHeight - target.clientHeight);
      const travel = Math.max(1, trackHeight - thumbHeight);
      const deltaY = event.clientY - dragStartYRef.current;
      target.scrollTop = dragStartScrollTopRef.current + (deltaY / travel) * maxScrollTop;
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

  if (!mounted || !enabled) return null;

  const scrollByAmount = (amount: number) => {
    const target = targetRef.current || getTarget();
    target.scrollBy({ top: amount, behavior: "smooth" });
  };

  const arrowStyle = (direction: "up" | "down") => ({
    display: "block",
    width: 0,
    height: 0,
    borderLeft: "2px solid transparent",
    borderRight: "2px solid transparent",
    ...(direction === "up"
      ? { borderBottom: "4px solid #111827" }
      : { borderTop: "4px solid #111827" }),
  });

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
        background: "rgba(255,255,255,0.01)",
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
          opacity: canScroll ? 1 : 0.55,
        }}
      >
        <span style={arrowStyle("up")} />
      </div>

      <div
        style={{
          position: "absolute",
          top: BUTTON_SIZE,
          right: 0,
          bottom: BUTTON_SIZE,
          width: HIT_WIDTH,
          pointerEvents: "auto",
          touchAction: "none",
        }}
        onClick={(event) => {
          const target = targetRef.current || getTarget();
          const isAboveThumb = event.clientY < thumbTop;
          target.scrollBy({
            top: isAboveThumb ? -target.clientHeight * 0.82 : target.clientHeight * 0.82,
            behavior: "smooth",
          });
        }}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => {
            const target = targetRef.current || getTarget();
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
            boxShadow: "0 0 0 1px rgba(255,255,255,0.98), 0 2px 8px rgba(0,0,0,0.28)",
            pointerEvents: "auto",
            touchAction: "none",
            opacity: canScroll ? 1 : 0.6,
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
          opacity: canScroll ? 1 : 0.55,
        }}
      >
        <span style={arrowStyle("down")} />
      </div>
    </div>
  );
}
