export default function SolutionPage() {
  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>解决方案</h1>
          <p>复杂的事，往简单了做。投研、技术服务、AI 工具——遇到具体问题，这里是我们的思路和方法。</p>
        </div>

        <section className="subpage-section">
          <div className="card-grid">
            <div className="card">
              <h3>投资研究框架</h3>
              <p>系统化的研究方法与风险评估思路，帮助你建立独立判断能力。</p>
            </div>
            <div className="card">
              <h3>技术架构方案</h3>
              <p>网络、网站、AI 系统的搭建思路与最佳实践，从规划到落地。</p>
            </div>
            <div className="card">
              <h3>自动化工作流</h3>
              <p>用工具和脚本替代重复劳动，让机器做该做的事。</p>
            </div>
            <div className="card">
              <h3>数据与 BI</h3>
              <p>数据采集、清洗、可视化到决策支持的全链路方案。</p>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>怎么用这些方案</h2>
          <p>
            这里的方案不是标准化产品，而是我们面对不同场景时的思路记录。你可以直接参考、修改、套用，
            也可以联系我们进一步沟通具体需求。所有内容都保持更新，跟着实际项目一起迭代。
          </p>
        </section>

        <div className="disclaimer-box">
          <p>
            <strong>提示：</strong>本页所有方案均为思路分享，不构成具体项目承诺或服务合同。
            如需定制化服务，请通过联系方式与我们沟通。
          </p>
        </div>
      </div>
    </main>
  );
}
