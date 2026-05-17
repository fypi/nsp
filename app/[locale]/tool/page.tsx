import Link from "next/link";

export default function ToolPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params?.locale || "zh";

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>工具中心</h1>
          <p>
            拿去用。一部分工具公开可用，打开就能用；更多工具登录账号后解锁；
            遇到不够用的，定制服务联系我们。
          </p>
        </div>

        <section className="subpage-section">
          <h2>🔓 公开工具</h2>
          <p>下面这些工具不用登录，直接打开就能用。</p>
          <div className="card-grid">
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>🔓 公开</div>
              <h3>数据转换器</h3>
              <p>常见格式之间的快速转换，省去重复劳动。</p>
              <p style={{ marginTop: 8 }}>
                <Link
                  href={`/${locale}/tool/data-converter`}
                  style={{ color: "#111", fontWeight: 500 }}
                >
                  打开使用 →
                </Link>
              </p>
            </div>
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>🔓 公开</div>
              <h3>文本格式化</h3>
              <p>格式化、清洗、整理，让文字工作更高效。</p>
              <p style={{ marginTop: 8 }}>
                <Link
                  href={`/${locale}/tool/text-formatter`}
                  style={{ color: "#111", fontWeight: 500 }}
                >
                  打开使用 →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>🔐 注册后可用</h2>
          <p>下面这些工具需要登录账号。注册免费，工具也免费用，账号还能保存历史和个人设置。</p>
          <div className="card-grid">
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>🔐 注册</div>
              <h3>AI 工作台</h3>
              <p>更多 AI 能力的集成入口，登录后解锁完整功能。</p>
              <p style={{ marginTop: 8 }}>
                <Link
                  href={`/${locale}/login?next=${encodeURIComponent(`/${locale}/tool/ai-workspace`)}`}
                  style={{ color: "#111", fontWeight: 500 }}
                >
                  登录后使用 →
                </Link>
              </p>
            </div>
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>🔐 注册</div>
              <h3>网络检测</h3>
              <p>基础网络诊断与配置检查，登录后可用。</p>
              <p style={{ marginTop: 8 }}>
                <Link
                  href={`/${locale}/login?next=${encodeURIComponent(`/${locale}/tool/network-check`)}`}
                  style={{ color: "#111", fontWeight: 500 }}
                >
                  登录后使用 →
                </Link>
              </p>
            </div>
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>🔐 注册</div>
              <h3>计算辅助</h3>
              <p>投资与技术场景中常用的计算模型和辅助工具。</p>
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
          <div className="card-grid">
            <div className="card">
              <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>💼 定制</div>
              <h3>定制工具开发</h3>
              <p>有具体业务场景但现成工具不够用？我们可以按需开发，独立部署。</p>
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
          <h2>使用说明</h2>
          <p>
            工具中心持续更新，公开工具直接用，注册工具登录后解锁，定制工具按需沟通。
            部分工具涉及数据计算，结果仅供参考，请结合实际情况判断。
          </p>
        </section>

        <div className="disclaimer-box">
          <p>
            <strong>提示：</strong>工具中心所有工具的计算结果仅供参考，不构成专业建议。
            涉及投资、技术决策时，请自行核实和判断。
          </p>
        </div>
      </div>
    </main>
  );
}
