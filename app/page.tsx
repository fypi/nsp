export default function HomePage() {
  return (
    <main style={{ padding: "40px", fontSize: "24px" }}>
      <h1>欢迎来到 NSP</h1>
      <p>你的 Next.js 网站已经成功部署。</p>
      <footer className="home-footer">
  <div className="home-footer-inner">
    <span>{text(copy.footerNote, locale)}</span>

    <nav className="home-footer-links" aria-label="Footer links">
      <Link href={localePath(locale, "/privacy")}>
        {text(copy.privacy, locale)}
      </Link>
      <Link href={localePath(locale, "/contact")}>
        {text(copy.contact, locale)}
      </Link>
      <Link href={localePath(locale, "/help")}>
        {text(copy.help, locale)}
      </Link>
    </nav>
  </div>
</footer>
``
    </main>
  );
}
