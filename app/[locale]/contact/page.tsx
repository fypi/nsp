"use client";
import Navbar from "../../../components/Navbar";
import { useParams } from "next/navigation";

export default function ContactPage() {
  const { locale } = useParams();
  const texts = {
    zh: {
      title: "联系方式",
      desc: "客服邮箱：support@ninespro.com",
    },
    "zh-TW": {
      title: "聯絡方式",
      desc: "客服郵箱：support@ninespro.com",
    },
    en: {
      title: "Contact",
      desc: "Email: support@ninespro.com",
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