from pathlib import Path

path = Path("app/[locale]/page.tsx")
text = path.read_text(encoding="utf-8")

old_cta = """      <section className="homeCta">
        <h2>{t.finalTitle}</h2>
        <p>{t.finalDesc}</p>
        <div className="homeActions"><a href={localePath(locale, "/contact")} className="homeGlassButton">{t.finalButton}</a></div>
      </section>"""

new_cta = """      <section className="homeCta">
        <div className="homeCtaInner">
          <h2>{t.finalTitle}</h2>
          <p>{t.finalDesc}</p>
          <div className="homeActions">
            <a href={localePath(locale, "/contact")} className="homeGlassButton">{t.finalButton}</a>
          </div>
        </div>
      </section>"""

if "homeCtaInner" not in text:
    if old_cta not in text:
        raise SystemExit("未找到原始 homeCta JSX。")
    text = text.replace(old_cta, new_cta)

old_css = """        .homeCta { padding: 110px 24px 128px; text-align: center; background: #e9ebef; }
        .homeCta h2 { margin: 0; font-size: clamp(56px, 7vw, 50px); line-height: .98; letter-spacing: -.07em; font-weight: 950; }
        .homeCta p { margin: 18px auto 0; max-width: 760px; font-size: clamp(22px, 2.4vw, 34px); line-height: 1.34; color: #475467; font-weight: 760; }"""

new_css = """        .homeCta { position: relative; min-height: 560px; padding: 110px 24px 128px; text-align: center; background: #e9ebef; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .homeCtaInner { position: relative; z-index: 2; width: min(980px, calc(100vw - 48px)); animation: homeHeroMove 36s linear infinite alternate; will-change: transform; }
        .homeCta h2 { margin: 0; font-size: clamp(56px, 7vw, 116px); line-height: .98; letter-spacing: -.07em; font-weight: 950; }
        .homeCta p { margin: 18px auto 0; max-width: 760px; font-size: clamp(22px, 2.4vw, 34px); line-height: 1.34; color: #475467; font-weight: 760; }"""

if old_css in text:
    text = text.replace(old_css, new_css)
elif ".homeCtaInner" not in text:
    raise SystemExit("未找到原始 homeCta CSS。")

old_mobile = """        @media (max-width: 760px) { .homeHero { padding: 104px 18px 70px; } .homeHeroInner, .homeLayerHead { animation: none; } .homeMotionZone, .homeStatsHeadZone { height: auto; margin-bottom: 34px; overflow: visible; } .homeLayerHead { position: relative; } .homeTrack { grid-auto-columns: minmax(280px, 86vw); padding-left: 84px; padding-right: 84px; } .homeArrowLeft { left: 10px; } .homeArrowRight { right: 10px; } }"""

new_mobile = """        @media (max-width: 760px) { .homeHero { padding: 104px 18px 70px; } .homeHeroInner, .homeLayerHead, .homeCtaInner { animation: none; } .homeMotionZone, .homeStatsHeadZone { height: auto; margin-bottom: 34px; overflow: visible; } .homeLayerHead { position: relative; } .homeTrack { grid-auto-columns: minmax(280px, 86vw); padding-left: 84px; padding-right: 84px; } .homeArrowLeft { left: 10px; } .homeArrowRight { right: 10px; } }"""

if old_mobile in text:
    text = text.replace(old_mobile, new_mobile)
elif ".homeHeroInner, .homeLayerHead, .homeCtaInner" not in text:
    raise SystemExit("未找到原始移动端 CSS。")

path.write_text(text, encoding="utf-8")
print("DONE: app/[locale]/page.tsx 的底部 CTA 已经改成和第一屏一样匀速运动。")
