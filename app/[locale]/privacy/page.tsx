"use client";
import Navbar from "../../components/Navbar";
import { useParams } from "next/navigation";

export default function PrivacyPage() {
  const { locale } = useParams();
  const texts = {
    zh: {
      title: "隐私与法律",
      desc: "本政策说明我们如何收集、使用、保护您的个人信息。",
    },
    "zh-TW": {
      title: "隱私與法律",
      desc: "本政策說明我們如何收集、使用、保護您的個人資訊。",
    },
    en: {
      title: "Privacy & Legal",
      desc: "This policy explains how we collect, use and protect your personal information.",
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