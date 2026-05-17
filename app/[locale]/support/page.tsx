import Link from "next/link";

export default function SupportPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params?.locale || "zh";

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>支持中心</h1>
          <p>有问题，随时来。使用上有疑问、想反馈、想合作，这里都能找到入口。</p>
        </div>

        <section className="subpage-section">
          <h2>访问规则速览</h2>
          <p>
            九域的内容和工具按三层组织，每张卡片右上角会标注它属于哪一层：
          </p>
          <div className="card-grid">
            <div className="card">
              <h3>🔓 公开可用</h3>
              <p>少数基础工具，打开就能用，无需登录。引流和体验入口。</p>
            </div>
            <div className="card">
              <h3>🔐 注册后可用</h3>
              <p>大多数工具，注册账号后免费使用。账号还能保存历史和个人设置。</p>
            </div>
            <div className="card">
              <h3>💼 定制服务</h3>
              <p>面向具体业务场景的定制开发与咨询，按需报价。联系我们沟通。</p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>常见问题</h2>
          <div className="card-grid">
            <div className="card">
              <h3>需要注册才能使用吗？</h3>
              <p>
                看情况。带 🔓 的工具公开可用，打开就能用；带 🔐 的工具注册账号后解锁；
                带 💼 的服务联系我们沟通。
              </p>
            </div>
            <div className="card">
              <h3>注册要钱吗？</h3>
              <p>
                注册免费。注册解锁的工具也免费用。涉及定制服务或部分高级功能时，
                我们会在使用前明确告知是否收费，不会自动扣费。
              </p>
            </div>
            <div className="card">
              <h3>可以合作或定制吗？</h3>
              <p>
                可以。如果你有具体项目需求，请通过联系方式与我们沟通，
                我们会评估后给出方案。
              </p>
            </div>
            <div className="card">
              <h3>发现内容有问题怎么办？</h3>
              <p>
                欢迎反馈。你可以通过联系方式提交问题，我们会尽快核实和修正。
              </p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>联系我们</h2>
          <p>
            有问题或建议？请前往
            <Link
              href={`/${locale}/contact`}
              style={{ color: "#111", fontWeight: 500 }}
            >
              联系方式
            </Link>
            页面，找到适合你的沟通渠道。我们会尽快回复。
          </p>
        </section>
      </div>
    </main>
  );
}
