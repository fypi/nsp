type Locale = "zh" | "zh-TW" | "en";

type BasicCard = {
  title: string;
  desc: string;
  href?: string;
};

type BasicSection = {
  title: string;
  body: string[];
};

type BasicPageContent = {
  eyebrow?: string;
  title: string;
  desc: string;
  cards?: BasicCard[];
  sections?: BasicSection[];
  note?: string;
};

function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "/" ? "/" : clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

function isExternalHref(href: string) {
  return href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("#");
}

function normalizeHref(locale: Locale, href?: string) {
  if (!href) return "#";
  if (isExternalHref(href)) return href;
  if (href === "/en" || href.startsWith("/en/")) return href.replace(/^\/en/, "") || "/";
  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return href;
  return localePath(locale, href);
}

export default function BasicPage({ content, locale }: { content: BasicPageContent; locale: Locale }) {
  return (
    <main className="basicPageRoot">
      <style>{`
        .basicPageRoot {
          min-height: 100vh;
          background: #e9ebef;
          color: #05070a;
          padding: 124px 24px 110px;
          overflow: hidden;
        }

        .basicPageShell {
          width: min(1120px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .basicHero {
          min-height: 360px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .basicHero small {
          display: none !important;
        }

        .basicHero h1 {
          margin: 0;
          max-width: 980px;
          font-size: clamp(34px, 4vw, 40px);
          line-height: 1.04;
          letter-spacing: -0.045em;
          font-weight: 950;
          color: #05070a;
        }

        .basicHero p {
          margin: 20px 0 0;
          max-width: 900px;
          font-size: clamp(18px, 2vw, 26px);
          line-height: 1.38;
          letter-spacing: -0.03em;
          color: #5b6678;
          font-weight: 700;
          text-wrap: balance;
        }

        .basicDivider {
          width: 100vw;
          height: 30px;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #ffffff;
        }

        .basicContent {
          padding-top: 64px;
        }

        .basicSections {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .basicSectionBlock {
          border-radius: 34px;
          padding: 32px;
          background: #d8dee8;
        }

        .basicSectionBlock h2 {
          margin: 0 0 16px;
          font-size: 26px;
          line-height: 1.08;
          letter-spacing: -0.045em;
          font-weight: 950;
          color: #05070a;
        }

        .basicSectionBlock p {
          margin: 0 0 12px;
          max-width: 920px;
          font-size: 16px;
          line-height: 1.72;
          font-weight: 620;
          color: #4b5563;
        }

        .basicSectionBlock p:last-child {
          margin-bottom: 0;
        }

        .basicGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
          padding-top: 36px;
        }

        .basicCard {
          min-height: 170px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 34px;
          padding: 30px;
          background: #d8dee8;
          color: #05070a;
          text-decoration: none;
          border: 0;
          box-shadow: none;
        }

        .basicCard:hover {
          background: #d1d8e3;
          text-decoration: none;
        }

        .basicCard h2 {
          margin: 0 0 12px;
          font-size: 24px;
          line-height: 1.08;
          letter-spacing: -0.045em;
          font-weight: 950;
          color: #05070a;
        }

        .basicCard p {
          margin: 0;
          max-width: 520px;
          font-size: 15px;
          line-height: 1.65;
          font-weight: 620;
          color: #4b5563;
        }

        .basicNote {
          margin-top: 42px;
          max-width: 900px;
          color: #5b6678;
          font-size: 14px;
          line-height: 1.7;
          font-weight: 620;
        }

        @media (max-width: 760px) {
          .basicPageRoot {
            padding: 92px 18px 90px;
          }
          .basicPageShell {
            width: calc(100vw - 36px);
          }
          .basicHero {
            min-height: 300px;
          }
          .basicHero h1 {
            font-size: 34px;
          }
          .basicHero p {
            font-size: 18px;
          }
          .basicContent {
            padding-top: 46px;
          }
          .basicGrid {
            grid-template-columns: 1fr;
          }
          .basicSectionBlock {
            border-radius: 28px;
            padding: 24px;
          }
        }
      `}</style>

      <div className="basicPageShell">
        <section className="basicHero">
          {content.eyebrow && <small>{content.eyebrow}</small>}
          <h1>{content.title}</h1>
          <p>{content.desc}</p>
        </section>

        <div className="basicDivider" aria-hidden="true" />

        <div className="basicContent">
          {!!content.sections?.length && (
            <section className="basicSections">
              {content.sections.map((section) => (
                <article className="basicSectionBlock" key={section.title}>
                  <h2>{section.title}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              ))}
            </section>
          )}

          {!!content.cards?.length && (
            <section className="basicGrid">
              {content.cards.map((card) => (
                <a className="basicCard" href={normalizeHref(locale, card.href)} key={card.title}>
                  <h2>{card.title}</h2>
                  <p>{card.desc}</p>
                </a>
              ))}
            </section>
          )}

          {content.note && <p className="basicNote">{content.note}</p>}
        </div>
      </div>
    </main>
  );
}
