import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#fff" }}>
      <section style={{ maxWidth: 620, textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: "#2563eb", marginBottom: 12 }}>404</div>
        <h1 style={{ fontSize: "clamp(34px, 6vw, 56px)", letterSpacing: "-0.05em", marginBottom: 16 }}>页面没有找到</h1>
        <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 24 }}>这个入口可能还在建设中，或链接已经调整。你可以返回首页或进入工具中心。</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link href="/" style={{ padding: "10px 16px", borderRadius: 999, background: "#111827", color: "#fff", textDecoration: "none", fontWeight: 800 }}>返回首页</Link>
          <Link href="/tool" style={{ padding: "10px 16px", borderRadius: 999, background: "#f3f4f6", color: "#111827", textDecoration: "none", fontWeight: 800 }}>工具中心</Link>
        </div>
      </section>
    </main>
  );
}
