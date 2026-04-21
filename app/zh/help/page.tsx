"use client";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";

export default function HelpPage() {
  const { locale } = useParams();
  const texts = {
    zh: {
      title: "帮助中心",
      desc: "如有使用问题，请查看常见问题或联系客服。",
    },
    "zh-TW": {
      title: "說明中心",
      desc: "如有使用問題，請查看常見問題或聯繫客服。",
    },
    en: {
      title: "Help Center",
      desc: "For questions, please check FAQs or contact support.",
    },
  };
  const t = texts[locale as keyof typeof texts] || texts.zh;

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-container" style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", color: "#000" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>{t.title}</h1>
          <p style={{ lineHeight: "1.7" }}>{t.desc}</p>
        </div>
      </div>
    </div>
  );
}