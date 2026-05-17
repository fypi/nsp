import Link from "next/link";

export default function ProductPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params?.locale || "zh";

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>产品中心</h1>
          <p>
            我们做了些东西。挑你需要的拿走——基础打开就能用，进阶注册后解锁，
            定制需求联系我们。
          </p>
        </div>

        <section className="subpage-section">
          <h2>🔓 公开可用</h2>
          <p>不用登录，打开就能用。</p>
          <div className="card-grid">
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>🔓 公开</div>
              <h3>AI 工具</h3>
              <p>从内容到效率，逐步接入可直接使用的工具。先试一下再决定要不要注册。</p>
              <p style={{ marginTop: 8 }}>
                <Link
                  href={`/${locale}/tool`}
                  style={{ color: "#111", fontWeight: 500 }}
                >
                  打开工具中心 →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>🔐 注册后可用</h2>
          <p>注册账号后免费使用，账号还能保存研究记录和个人设置。</p>
          <div className="card-grid">
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>🔐 注册</div>
              <h3>智能投研</h3>
              <p>研究、筛选、追踪，一套更轻的投研入口。</p>
              <p style={{ marginTop: 8 }}>
                <Link
                  href={`/${locale}/login`}
                  style={{ color: "#111", fontWeight: 500 }}
                >
                  登录后使用 →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>💼 定制服务</h2>
          <p>面向具体业务场景，按需开发或服务，沟通后报价。</p>
          <div className="card-grid">
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>💼 定制</div>
              <h3>技术服务</h3>
              <p>网站、网络、系统与自动化的工程落地，一起做下来。</p>
              <p style={{ marginTop: 8 }}>
                <Link
                  href={`/${locale}/contact`}
                  style={{ color: "#111", fontWeight: 500 }}
                >
                  联系我们 →
                </Link>
              </p>
            </div>
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>💼 定制</div>
              <h3>定制开发</h3>
              <p>有明确需求，直接做成能跑的系统。从需求评估到上线维护一条线走完。</p>
              <p style={{ marginTop: 8 }}>
                <Link
                  href={`/${locale}/contact`}
                  style={{ color: "#111", fontWeight: 500 }}
                >
                  联系我们 →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>关于这些产品</h2>
          <p>
            九域的产品线围绕「投研、技术服务、AI 工具」三个方向展开。我们不追求功能最全，
            只追求每一个功能都足够好用。基础工具直接打开就能试，进阶能力注册账号后解锁，
            涉及具体场景的定制需求，欢迎直接联系。
          </p>
        </section>

        <div className="disclaimer-box">
          <p>
            <strong>提示：</strong>本产品中心展示的所有工具和内容仅供学习参考，不构成任何投资建议、
            技术承诺或服务合同。使用相关产品前请自行判断风险。
          </p>
        </div>
      </div>
    </main>
  );
}
