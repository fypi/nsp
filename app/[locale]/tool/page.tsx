import Link from "next/link";

type ToolItem = {
  title: string;
  desc: string;
  href?: string;
  status: "public" | "login" | "soon" | "custom";
};

export default function ToolPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params?.locale || "zh";

  const publicTools: ToolItem[] = [
    {
      title: "JSON 格式化",
      desc: "格式化、压缩和校验 JSON，适合接口调试、配置检查和数据整理。",
      href: `/${locale}/tool/json-formatter`,
      status: "public",
    },
    {
      title: "文本对比",
      desc: "对比两段文本差异，适合文案修改、配置变更和代码片段检查。",
      href: `/${locale}/tool/text-diff`,
      status: "public",
    },
    {
      title: "复利计算器",
      desc: "计算长期收益、定投增长和复利变化，仅作学习和参考。",
      href: `/${locale}/tool/compound-interest`,
      status: "public",
    },
    {
      title: "Base64 工具",
      desc: "Base64 编码与解码，支持常见文本处理场景。",
      href: `/${locale}/tool/base64`,
      status: "public",
    },
  ];

  const loginTools: ToolItem[] = [
    {
      title: "Markdown 预览",
      desc: "编写 Markdown 并实时预览，适合文档、说明和内容草稿。",
      href: `/${locale}/tool/markdown-preview`,
      status: "login",
    },
  ];

  const comingSoonTools: ToolItem[] = [
    {
      title: "JSON 转 TypeScript",
      desc: "根据 JSON 自动生成 TypeScript 类型，减少手写结构的重复工作。",
      status: "soon",
    },
    {
      title: "JWT 解码器",
      desc: "快速查看 JWT Header 与 Payload，便于接口调试和登录排查。",
      status: "soon",
    },
    {
      title: "正则测试器",
      desc: "测试正则表达式匹配结果，适合文本清洗和表单校验。",
      status: "soon",
    },
    {
      title: "Cron 表达式解析器",
      desc: "解析 Cron 表达式的执行时间，减少定时任务配置错误。",
      status: "soon",
    },
    {
      title: "URL 编码/解码",
      desc: "处理 URL 参数、查询字符串和特殊字符编码。",
      status: "soon",
    },
    {
      title: "文本清洗工具",
      desc: "清理多余空格、换行、重复内容和常见格式问题。",
      status: "soon",
    },
    {
      title: "图片压缩",
      desc: "压缩常见图片格式，降低网页和内容素材体积。",
      status: "soon",
    },
    {
      title: "PDF 合并",
      desc: "合并多个 PDF 文件，适合文档整理和资料归档。",
      status: "soon",
    },
    {
      title: "贷款计算器",
      desc: "计算月供、利息和还款结构，仅作学习和参考。",
      status: "soon",
    },
    {
      title: "HTTP Header 检查器",
      desc: "查看网页响应头，辅助排查缓存、安全和部署配置。",
      status: "soon",
    },
  ];

  const customServices: ToolItem[] = [
    {
      title: "企业文书体系",
      desc: "围绕合同、流程、模板和内部规范，搭建可持续维护的文书系统。",
      href: `/${locale}/contact`,
      status: "custom",
    },
    {
      title: "课程学习系统",
      desc: "为课程、训练营、内部学习场景搭建学习计划和内容管理能力。",
      href: `/${locale}/contact`,
      status: "custom",
    },
    {
      title: "内部知识库",
      desc: "把分散资料、流程和经验沉淀成可查询、可复用的知识库。",
      href: `/${locale}/contact`,
      status: "custom",
    },
    {
      title: "AI 自动化工作流",
      desc: "把重复操作接成自动流程，减少人工搬运和低价值重复劳动。",
      href: `/${locale}/contact`,
      status: "custom",
    },
  ];

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>工具中心</h1>
          <p>
            工具、文书、学习和知识，一处打开。当前只保留真实可用入口，
            未完成的能力不再挂空链接。
          </p>
        </div>

        <section className="subpage-section">
          <h2>🔓 公开可用</h2>
          <p>不用登录，打开就能用。下面这些是当前已经接好的真实工具。</p>

          <div className="card-grid">
            {publicTools.map((tool) => (
              <ToolCard key={tool.title} tool={tool} locale={locale} />
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>🔐 注册后可用</h2>
          <p>
            这些工具需要登录后使用，后续会逐步支持保存历史、导出和个人设置。
          </p>

          <div className="card-grid">
            {loginTools.map((tool) => (
              <ToolCard key={tool.title} tool={tool} locale={locale} />
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>🧭 即将上线</h2>
          <p>
            下面这些工具已经进入排期。未完成前只展示方向，不挂 404 入口。
          </p>

          <div className="card-grid">
            {comingSoonTools.map((tool) => (
              <ToolCard key={tool.title} tool={tool} locale={locale} />
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>💼 定制服务</h2>
          <p>
            标准工具解决不了的场景，可以按实际业务做成专用系统或自动化流程。
          </p>

          <div className="card-grid">
            {customServices.map((tool) => (
              <ToolCard key={tool.title} tool={tool} locale={locale} />
            ))}
          </div>
        </section>

        <section className="subpage-section">
          <h2>工具分层</h2>
          <p>
            当前采用分层开放：基础工具公开可用；需要保存、导出、批量处理和个人记录的能力，
            登录后逐步开放；企业流程、内部系统和 AI 自动化按定制服务处理。
          </p>
        </section>

        <div className="disclaimer-box">
          <p>
            <strong>提示：</strong>
            工具中心内容仅供学习、计算、格式处理和效率辅助，不构成投资建议、
            法律意见、财务意见或专业服务承诺。涉及关键场景时，请结合实际情况自行核验。
          </p>
        </div>
      </div>
    </main>
  );
}

function ToolCard({
  tool,
  locale,
}: {
  tool: ToolItem;
  locale: string;
}) {
  const badgeMap: Record<ToolItem["status"], string> = {
    public: "🔓 公开",
    login: "🔐 登录",
    soon: "🧭 即将上线",
    custom: "💼 定制",
  };

  const actionText: Record<ToolItem["status"], string> = {
    public: "打开工具 →",
    login: "登录后使用 →",
    soon: "等待上线",
    custom: "联系咨询 →",
  };

  const href =
    tool.status === "login" && tool.href
      ? `/${locale}/login?next=${encodeURIComponent(tool.href)}`
      : tool.href;

  return (
    <div className="card">
      <div style={{ marginBottom: 8, fontSize: 12, color: "#666" }}>
        {badgeMap[tool.status]}
      </div>

      <h3>{tool.title}</h3>
      <p>{tool.desc}</p>

      <p style={{ marginTop: 8 }}>
        {href ? (
          <Link href={href} style={{ color: "#111", fontWeight: 500 }}>
            {actionText[tool.status]}
          </Link>
        ) : (
          <span style={{ color: "#777", fontWeight: 500 }}>
            {actionText[tool.status]}
          </span>
        )}
      </p>
    </div>
  );
}
