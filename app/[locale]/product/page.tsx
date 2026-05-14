export default function ProductPage() {
  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>产品中心</h1>
          <p>我们做了些东西。都是用得上的工具和应用。挑你需要的拿走，公开可用，无需注册即可上手。</p>
        </div>

        <section className="subpage-section">
          <div className="card-grid">
            <div className="card">
              <h3>智能分析工具</h3>
              <p>数据可视化与分析辅助，让复杂信息一目了然。</p>
            </div>
            <div className="card">
              <h3>网络搭建方案</h3>
              <p>从架构到部署，为企业和个人提供网络基础设施方案。</p>
            </div>
            <div className="card">
              <h3>AI 辅助工具</h3>
              <p>集成多种 AI 能力的实用工具，提升日常工作效率。</p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>关于这些产品</h2>
          <p>
            九域的产品线围绕“投研、技术服务、AI 工具”三个方向展开。我们不追求功能最全，
            只追求每一个功能都足够好用。你可以在工具中心直接试用，也可以在解决方案页面找到针对具体场景的使用思路。
          </p>
        </section>

        <div className="disclaimer-box">
          <p>
            <strong>提示：</strong>本产品中心展示的所有工具和内容仅供学习参考，不构成任何投资建议、技术承诺或服务合同。
            使用相关产品前请自行判断风险。
          </p>
        </div>
      </div>
    </main>
  );
}
