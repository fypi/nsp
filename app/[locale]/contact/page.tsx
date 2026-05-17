export default function ContactPage() {
  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>联系方式</h1>
          <p>有问题、有想法、想合作，随时找我们。</p>
        </div>

        <section className="subpage-section">
          <div className="card-grid">
            <div className="card">
              <h3>邮件联系</h3>
              <p>
                商务、技术、内容相关的问题，统一发邮件至
                one@ninespro.com，我们会尽快回复。
              </p>
            </div>

            <div className="card">
              <h3>回复时间</h3>
              <p>
                通常 1-2 个工作日内回复。紧急情况请在标题注明【紧急】。
              </p>
            </div>

            <div className="card">
              <h3>其他渠道</h3>
              <p>
                如需更直接的沟通，请通过支持中心提交反馈，我们会安排专人对接。
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
