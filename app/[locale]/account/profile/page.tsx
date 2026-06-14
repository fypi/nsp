
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];
function getLocale(raw: unknown): Locale { if (raw === "en") return "en"; if (raw === "zh-TW") return "zh-TW"; return "zh"; }
const copy = {
  zh: { title:"个人信息", desc:"修改账号显示信息。邮箱由认证系统管理，不能在这里直接修改。", email:"邮箱", displayName:"显示名称", fullName:"姓名", save:"保存修改", saving:"保存中...", saved:"已保存。", failed:"保存失败，请稍后重试。", back:"返回个人中心", login:"请先登录", goLogin:"去登录" },
  en: { title:"Profile", desc:"Edit account display information. Email is managed by the auth system and cannot be changed here directly.", email:"Email", displayName:"Display name", fullName:"Full name", save:"Save changes", saving:"Saving...", saved:"Saved.", failed:"Failed to save. Please try again later.", back:"Back to account center", login:"Please log in first", goLogin:"Login" },
  "zh-TW": { title:"個人資訊", desc:"修改帳號顯示資訊。信箱由認證系統管理，不能在這裡直接修改。", email:"信箱", displayName:"顯示名稱", fullName:"姓名", save:"儲存修改", saving:"儲存中...", saved:"已儲存。", failed:"儲存失敗，請稍後重試。", back:"返回個人中心", login:"請先登入", goLogin:"去登入" },
};

export default function ProfilePage() {
  const params = useParams();
  const locale = getLocale(params?.locale);
  const c = copy[locale];
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user ?? null;
      setUser(u);
      setDisplayName((u?.user_metadata?.display_name as string) || "");
      setFullName((u?.user_metadata?.full_name as string) || "");
      setLoading(false);
    });
  }, []);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setOk(false);
    const { data, error } = await supabase.auth.updateUser({
      data: { display_name: displayName.trim(), full_name: fullName.trim() },
    });
    setSaving(false);
    if (error) { setMessage(c.failed); return; }
    setUser(data.user);
    setOk(true);
    setMessage(c.saved);
  }

  if (!loading && !user) {
    return <main className="auth-page"><div className="auth-box"><h1>{c.login}</h1><div className="auth-links" style={{display:"grid",justifyContent:"center"}}><Link href={`/${locale}/login`} className="liquidGlassPill">{c.goLogin}</Link></div></div></main>;
  }

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <section className="subpage-hero"><h1>{c.title}</h1><p>{c.desc}</p></section>
        <section className="subpage-section">
          <div className="card liquidGlassCard">
            <form className="auth-form" onSubmit={save}>
              <label>{c.email}</label>
              <input value={user?.email || ""} disabled />
              <label>{c.displayName}</label>
              <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              <label>{c.fullName}</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              {message && <p style={{color: ok ? "#166534" : "#b42318", margin: 0, fontSize: 13}}>{message}</p>}
              <button type="submit" disabled={saving}>{saving ? c.saving : c.save}</button>
            </form>
            <p style={{ marginTop: 18, marginBottom: 0 }}><Link href={`/${locale}/account`}>{c.back}</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
