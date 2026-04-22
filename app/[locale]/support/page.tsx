"use client";
import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";

export default function SupportPage() {
  const { locale } = useParams();
  const texts = {
    zh: { title: "支持中心", desc: "我们为你提供全天候支持" },
    "zh-TW": { title: "支援中心", desc: "我們為你提供全天候支援" },
    en: { title: "Support", desc: "We Provide 24/7 Support" },
  };
  const t = texts[locale as keyof typeof texts] || texts.zh;
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-container" style={{ padding: "80px 20px" }}>
        <div style={{ textAlign: "center", color: "#000" }}>
          <h1 style={{ fontSize: "32px" }}>{t.title}</h1>
          <p style={{ marginTop: 10 }}>{t.desc}</p>
        </div>
      </div>
    </div>
  );
}