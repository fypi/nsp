"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Locale = "zh" | "zh-TW" | "en";

type ToastState = "offline" | "online" | null;

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh") return "zh";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";

  return "zh";
}

const texts: Record<
  Locale,
  {
    offline: string;
    online: string;
  }
> = {
  zh: {
    offline: "网络连接不可用，请检查网络后重试。",
    online: "网络已恢复。",
  },

  "zh-TW": {
    offline: "網路連線不可用，請檢查網路後重試。",
    online: "網路已恢復。",
  },

  en: {
    offline:
      "Network connection unavailable. Please check your connection and try again.",
    online: "Connection restored.",
  },
};

export default function NetworkStatusToast() {
  const params = useParams();
  const locale = normalizeLocale(params?.locale);
  const t = texts[locale];

  const [toast, setToast] = useState<ToastState>(null);
  const [mounted, setMounted] = useState(false);

  const message = useMemo(() => {
    if (toast === "offline") return t.offline;
    if (toast === "online") return t.online;
    return "";
  }, [toast, t.offline, t.online]);

  useEffect(() => {
    setMounted(true);

    const handleOffline = () => {
      setToast("offline");
    };

    const handleOnline = () => {
      setToast("online");

      window.setTimeout(() => {
        setToast(null);
      }, 2200);
    };

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setToast("offline");
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!mounted || !toast) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        bottom: 24,
        transform: "translateX(-50%)",
        zIndex: 20000,
        maxWidth: "calc(100vw - 32px)",
        padding: "12px 18px",
        borderRadius: 999,
        background: toast === "offline" ? "#111" : "#0f7a3a",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        lineHeight: 1.4,
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}