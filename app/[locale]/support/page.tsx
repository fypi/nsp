import Link from "next/link";

export default function SupportPage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>支持中心</h1>
          <p>有问题，随时来。使用上有疑问、想反馈、想合作，这里都能找到入口。</p>
        </div>

        <section className="subpage-section">
          <h2>常见问题</h2>
          <div className="card-grid">
            <div className="card">
              <h3>需要注册才能使用吗？</h3>
              <p>不需要。九域的大部分内容和工具都可以直接访问。注册只用于收藏、进度记录等增值功能。</p>
            </div>
            <div className="card">
              <h3>内容是免费的吗？</h3>
              <p>公开内容可以免费查看和学习。涉及定制服务或部分高级功能时，我们会在使用前明确告知是否收费。</p>
            </div>
            <div className="card">
              <h3>可以合作或定制吗？</h3>
              <p>可以。如果你有具体项目需求，请通过联系方式与我们沟通，我们会评估后给出方案。</p>
            </div>
            <div className="card">
              <h3>发现内容有问题怎么办？</h3>
              <p>欢迎反馈。你可以通过联系方式提交问题，我们会尽快核实和修正。</p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>联系我们</h2>
          <p>
            有问题或建议？请前往
            <Link
              href={`/${params.locale}/contact`}
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
