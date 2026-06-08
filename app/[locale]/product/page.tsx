import Link from "next/link";

type ProductLine = {
  title: string;
  desc: string;
  scenes: string[];
  href: string;
  action: string;
  badge: string;
};

export default function ProductPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params?.locale || "zh";

  const productLines: ProductLine[] = [
    {
      title: "智能投研",
      desc: "面向股票、基金、行业和资产配置的研究辅助能力，帮助把信息整理成可跟踪的判断框架。",
      scenes: ["研究资料整理", "标的跟踪", "风险提示与复盘"],
      href: `/${locale}/solution`,
      action: "查看方案 →",
      badge: "研究",
    },
    {
      title: "网络与系统工程",
      desc: "网站、网络、部署、自动化和内部系统的工程落地，从需求到上线一起做下来。",
      scenes: ["官网与业务站点", "网络与部署排障", "自动化流程搭建"],
      href: `/${locale}/solution`,
      action: "了解能力 →",
      badge: "工程",
    },
    {
      title: "AI 产品与 Agent",
      desc: "把 AI 接入具体业务流程，形成能执行、能协作、能持续迭代的 Agent 和工具系统。",
      scenes: ["AI 助手工作流", "多 Agent 协作", "业务流程自动化"],
      href: `/${locale}/solution`,
      action: "查看方案 →",
      badge: "AI",
    },
    {
      title: "文书与知识工具",
      desc: "围绕文书模板、学习资料、知识整理和内容生成，构建长期可复用的知识工具。",
      scenes: ["文书模板", "知识库整理", "学习与内容辅助"],
      href: `/${locale}/tool`,
      action: "查看工具 →",
      badge: "知识",
    },
    {
      title: "金融计算与决策辅助",
      desc: "提供计算、对比和记录能力，用于学习、测算和辅助判断，不替代专业意见。",
      scenes: ["复利与收益测算", "方案对比", "风险提示"],
      href: `/${locale}/tool/compound-interest`,
      action: "查看示例 →",
      badge: "计算",
    },
    {
      title: "定制服务",
      desc: "针对明确业务场景，定制网站、工具、系统、自动化和内部流程能力。",
      scenes: ["企业工具系统", "内部流程自动化", "专项项目落地"],
      href: `/${locale}/contact`,
      action: "联系咨询 →",
      badge: "定制",
    },
  ];

  return (
    <main className="subpage-main" style={{ paddingBottom: 120 }}>
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>产品中心</h1>
          <p>
            产品中心展示九域正在建设的能力矩阵：投研、工程、AI、文书知识、
            金融计算和定制服务。这里讲方向和场景；能直接使用的小工具，统一放在工具中心。
          </p>
        </div>

        <section className="subpage-section">
          <h2>能力矩阵</h2>
          <p>
            每条产品线都围绕一个目标：把复杂问题拆成能理解、能执行、能持续迭代的系统。
          </p>

          <div className="card-grid">
            {productLines.map((item) => (
              <div className="card" key={item.title}>
                <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>
                  {item.badge}
                </div>

                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <ul
                  style={{
                    marginTop: 12,
                    paddingLeft: 18,
                    color: "#555",
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {item.scenes.map((scene) => (
                    <li key={scene}>{scene}</li>
                  ))}
                </ul>

                <p style={{ marginTop: 12 }}>
                  <Link
                    href={item.href}
                    style={{ color: "#111", fontWeight: 600 }}
                  >
                    {item.action}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>产品与工具的区别</h2>
          <p>
            产品中心讲的是长期能力和业务方向；工具中心放的是可以直接打开使用的具体工具。
            如果你只是要格式化 JSON、对比文本、计算复利或生成文书模板，可以直接去工具中心。
            如果你需要把一套流程、网站、知识库或自动化系统做出来，可以从产品中心了解能力后联系我们。
          </p>

          <p style={{ marginTop: 12 }}>
            <Link
              href={`/${locale}/tool`}
              style={{ color: "#111", fontWeight: 600 }}
            >
              前往工具中心 →
            </Link>
          </p>
        </section>

        <section className="subpage-section">
          <h2>当前开放方式</h2>
          <p>
            九域采用分层开放：基础工具公开可用；需要保存历史、批量处理、导出和个性化配置的能力，
            后续通过账号体系逐步开放；涉及企业流程、内部系统和专用自动化的需求，按定制服务处理。
          </p>
        </section>

        <div className="disclaimer-box">
          <p>
            <strong>提示：</strong>
            产品中心展示的是能力方向和服务范围，不构成投资建议、法律意见、财务意见或服务承诺。
            具体功能、交付范围和费用以实际沟通确认为准。
          </p>
        </div>
      </div>
    </main>
  );
}
