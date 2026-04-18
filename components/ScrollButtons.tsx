"use client";

import { useEffect, useState } from "react";

export default function ScrollButtons() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="circle-btn"
      >
        ↑
      </button>

      <button
        onClick={() =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          })
        }
        className="circle-btn"
      >
        ↓
      </button>
    </div>
  );
}