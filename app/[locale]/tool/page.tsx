"use client";
import Navbar from "../../components/Navbar";
import { useParams } from "next/navigation";

export default function ToolPage() {
  const { locale } = useParams();
  const texts = {
    zh: { title: "工具中心", desc: "免费实用工具集合" },
    "zh-TW": { title: "工具中心", desc: "免費實用工具集合" },
    en: { title: "Tools", desc: "Free Useful Tools Collection" },
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