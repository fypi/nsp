"use client";
import Navbar from "../../../components/Navbar";
import { useParams } from "next/navigation";

export default function SolutionPage() {
  const { locale } = useParams();
  const texts = {
    zh: { title: "解决方案", desc: "为你提供专业解决方案" },
    "zh-TW": { title: "解決方案", desc: "為你提供專業解決方案" },
    en: { title: "Solutions", desc: "Providing Professional Solutions" },
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