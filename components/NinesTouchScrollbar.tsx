"use client";

import { useEffect, useRef, useState } from "react";

const NAV_HEIGHT = 52;
const HIT_WIDTH = 6;
const THUMB_WIDTH = 3;
const BUTTON_SIZE = 6;
const MIN_THUMB_HEIGHT = 34;

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
    const target = targetRef.current || getScrollTarget();
    if (!target) return;
    targetRef.current = target;

    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const scrollTop = target.scrollTop;
    const maxScrollTop = Math.max(1, scrollHeight - clientHeight);

    const viewportHeight = window.innerHeight;
    const trackTop = NAV_HEIGHT + BUTTON_SIZE;
    const trackHeight = Math.max(
      80,
      viewportHeight - NAV_HEIGHT - BUTTON_SIZE * 2
    );

    const nextVisible = scrollHeight > clientHeight + 4;
    const nextThumbHeight = Math.max(
      MIN_THUMB_HEIGHT,
      Math.round((clientHeight / Math.max(1, scrollHeight)) * trackHeight)
    );
    const travel = Math.max(1, trackHeight - nextThumbHeight);
    const nextThumbTop =
      trackTop + Math.round((scrollTop / maxScrollTop) * travel);

    setVisible(nextVisible);
    setThumbHeight(nextThumbHeight);
    setThumbTop(nextThumbTop);
  };

  useEffect(() => {
    const updateEnabled = () => {
      setEnabled(window.matchMedia("(pointer: coarse)").matches);
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
    if (!target) return;
    targetRef.current = target;

    const run = () => requestAnimationFrame(recalc);
    run();

    target.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", run);
    window.addEventListener("orientationchange", run);

    const resizeObserver = new ResizeObserver(run);
    resizeObserver.observe(target);
    resizeObserver.observe(document.body);

    const mutationObserver = new MutationObserver(run);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    const timer = window.setInterval(recalc, 300);

    return () => {
      target.removeEventListener("scroll", recalc);
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

      const target = targetRef.current;
      if (!target) return;

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
        width: HIT_WIDTH,
        zIndex: 2147483000,
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
            borderBottom: "4px solid #555555",
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
          const target = targetRef.current;
          if (!target) return;
          const isAboveThumb = event.clientY < thumbTop;
          const amount = isAboveThumb
            ? -target.clientHeight * 0.82
            : target.clientHeight * 0.82;
          target.scrollBy({ top: amount, behavior: "smooth" });
        }}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => {
            const target = targetRef.current;
            if (!target) return;
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
            background: "#555555",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.95), 0 2px 6px rgba(0,0,0,0.22)",
            pointerEvents: "auto",
            touchAction: "none",
            opacity: 0.98,
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
            borderTop: "4px solid #555555",
          }}
        />
      </div>
    </div>
  );
}
