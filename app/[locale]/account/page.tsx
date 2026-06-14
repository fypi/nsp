
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];
function getLocale(raw: unknown): Locale { if (raw === "en") return "en"; if (raw === "zh-TW") return "zh-TW"; return "zh"; }
const copy = {
  zh: { title:"个人中心", desc:"管理账号信息、安全设置和常用入口。", email:"邮箱", emailVerified:"邮箱状态", verified:"已验证", notVerified:"未验证", profile:"个人信息", profileDesc:"修改昵称、姓名和个人资料。", security:"安全设置", securityDesc:"管理邮箱状态、密码和双重认证。", tools:"工具中心", toolsDesc:"返回工具中心继续使用在线工具。", login:"请先登录", goLogin:"去登录" },
  en: { title:"Account Center", desc:"Manage account information, security settings, and common entries.", email:"Email", emailVerified:"Email status", verified:"Verified", notVerified:"Not verified", profile:"Profile", profileDesc:"Edit display name, name, and profile information.", security:"Security", securityDesc:"Manage email status, password, and two-factor authentication.", tools:"Tool Center", toolsDesc:"Return to the tool center and continue using online tools.", login:"Please log in first", goLogin:"Login" },
  "zh-TW": { title:"個人中心", desc:"管理帳號資訊、安全設定和常用入口。", email:"信箱", emailVerified:"信箱狀態", verified:"已驗證", notVerified:"未驗證", profile:"個人資訊", profileDesc:"修改暱稱、姓名和個人資料。", security:"安全設定", securityDesc:"管理信箱狀態、密碼和雙重認證。", tools:"工具中心", toolsDesc:"返回工具中心繼續使用線上工具。", login:"請先登入", goLogin:"去登入" },
};

export default function AccountPage() {
  const params = useParams();
  const router = useRouter();
  const locale = getLocale(params?.locale);
  const c = copy[locale];
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });
  }, []);

  if (!loading && !user) {
    return (
      <main className="auth-page">
        <div className="auth-box">
          <h1>{c.login}</h1>
          <div className="auth-links" style={{ display: "grid", justifyContent: "center" }}>
            <Link href={`/${locale}/login`} className="liquidGlassPill">{c.goLogin}</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <section className="subpage-hero">
          <h1>{c.title}</h1>
          <p>{c.desc}</p>
        </section>

        <section className="subpage-section">
          <div className="card liquidGlassCard">
            <h3>{c.email}</h3>
            <p style={{ marginBottom: 14 }}>{user?.email || "-"}</p>
            <span className="liquidGlassPillMuted">
              {c.emailVerified}: {user?.email_confirmed_at ? c.verified : c.notVerified}
            </span>
          </div>
        </section>

        <section className="subpage-section">
          <div className="card-grid">
            <Link href={`/${locale}/account/profile`} style={{ textDecoration: "none" }}>
              <article className="card liquidGlassCard"><h3>{c.profile}</h3><p>{c.profileDesc}</p></article>
            </Link>
            <Link href={`/${locale}/account/security`} style={{ textDecoration: "none" }}>
              <article className="card liquidGlassCard"><h3>{c.security}</h3><p>{c.securityDesc}</p></article>
            </Link>
            <Link href={`/${locale}/tool`} style={{ textDecoration: "none" }}>
              <article className="card liquidGlassCard"><h3>{c.tools}</h3><p>{c.toolsDesc}</p></article>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
