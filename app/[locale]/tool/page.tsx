export default function ToolPage() {
  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>工具中心</h1>
          <p>拿去用。一些自己做的小工具，公开可用。能帮上忙就好。</p>
        </div>

        <section className="subpage-section">
          <div className="card-grid">
            <div className="card">
              <h3>数据转换器</h3>
              <p>常见格式之间的快速转换，省去重复劳动。</p>
            </div>
            <div className="card">
              <h3>文本处理工具</h3>
              <p>格式化、清洗、分析，让文字工作更高效。</p>
            </div>
            <div className="card">
              <h3>计算辅助</h3>
              <p>投资与技术场景中常用的计算模型和辅助工具。</p>
            </div>
            <div className="card">
              <h3>网络检测</h3>
              <p>基础网络诊断与配置检查，快速定位常见问题。</p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>使用说明</h2>
          <p>
            工具中心的所有工具无需注册即可使用。我们持续添加新工具，也欢迎反馈你需要的功能。
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
