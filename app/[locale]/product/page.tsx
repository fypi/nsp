"use client";
import Navbar from "../../../components/Navbar";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { locale } = useParams();
  const texts = {
    zh: { title: "产品中心", desc: "高效智能 · 极简体验" },
    "zh-TW": { title: "產品中心", desc: "高效智能 · 極簡體驗" },
    en: { title: "Products", desc: "Efficient & Intelligent · Minimalist Experience" },
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