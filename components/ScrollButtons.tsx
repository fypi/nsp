"use client";

export default function ScrollButtons() {
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
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
        }
        className="circle-btn"
      >
        ↓
      </button>
    </div>
  );
}