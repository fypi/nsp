import { commonText, localePath, type Locale, type PageContent } from "@/lib/i18n";

export type { PageContent } from "@/lib/i18n";
export { getLocale } from "@/lib/i18n";

function isExternalHref(href: string) {
  return (
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("#")
  );
}

function localizeHref(locale: Locale, href: string | undefined, fallbackId: string) {
  const target = href || `#${fallbackId}`;

  if (isExternalHref(target)) return target;
  if (target === `/${locale}` || target.startsWith(`/${locale}/`)) return target;

  return localePath(locale, target);
}

export default function SectionPage({
  content,
  locale,
}: {
  content: PageContent;
  locale: Locale;
}) {
  const ui = commonText[locale];

  return (
    <main className="sectionPageRoot">
      <style>{`
        .sectionPageRoot {
          --section-hero-title: clamp(58px, 7.2vw, 40px);
          --section-hero-desc: clamp(22px, 2.45vw, 36px);
          --section-title: clamp(38px, 4.8vw, 30px);
          --section-desc: 17px;
          min-height: 100vh;
          background: #e9ebef;
          color: #05070a;
          padding: 124px 24px 110px;
          overflow: hidden;
        }

        .sectionPageShell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }

        .sectionPageHero {
          padding: 34px 0 56px;
        }

        .sectionPageHero h1 {
          margin: 0;
          font-size: var(--section-hero-title);
          line-height: 0.96;
          letter-spacing: -0.07em;
          font-weight: 950;
          color: #05070a;
        }

        .sectionPageHero p {
          margin: 20px 0 0;
          max-width: 900px;
          font-size: var(--section-hero-desc);
          line-height: 1.42;
          letter-spacing: -0.035em;
          color: #5b6678;
          font-weight: 680;
        }

        .sectionDivider {
          width: 100vw;
          height: 30px;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-top: 0;
          margin-bottom: 58px;
          background: #ffffff;
        }

        .sectionGroup {
          padding: 0 0 72px;
        }

        .sectionGroupHeader {
          margin-bottom: 30px;
        }

        /* 左上角小字已去掉，不再显示 eyebrow */
        .sectionGroupHeader span {
          display: none;
        }

        .sectionGroupHeader h2 {
          margin: 0;
          font-size: var(--section-title);
          line-height: 0.98;
          letter-spacing: -0.065em;
          font-weight: 950;
          color: #05070a;
        }

        .sectionGroupHeader p {
          margin: 16px 0 0;
          max-width: 760px;
          font-size: var(--section-desc);
          line-height: 1.68;
          color: #5b6678;
          font-weight: 620;
        }

        .sectionCardGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .sectionCard {
          min-height: 190px;
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

        .sectionCard:hover {
          background: #d1d8e3;
          text-decoration: none;
        }

        .sectionCard h3 {
          margin: 0 0 12px;
          font-size: 26px;
          line-height: 1.08;
          letter-spacing: -0.045em;
          font-weight: 950;
          color: #05070a;
        }

        .sectionCard p {
          margin: 0;
          max-width: 520px;
          font-size: 16px;
          line-height: 1.65;
          font-weight: 620;
          color: #4b5563;
        }

        .sectionCard em {
          display: inline-flex;
          width: fit-content;
          margin-top: 20px;
          padding: 9px 15px;
          border-radius: 999px;
          font-size: 13px;
          line-height: 1;
          font-style: normal;
          font-weight: 850;
          color: #111827;
          background: rgba(255,255,255,0.32);
          border: 1px solid rgba(255,255,255,0.5);
          backdrop-filter: blur(12px) saturate(160%);
          -webkit-backdrop-filter: blur(12px) saturate(160%);
        }

        @media (max-width: 760px) {
          .sectionPageRoot {
            --section-hero-title: clamp(46px, 14vw, 72px);
            --section-hero-desc: clamp(18px, 6vw, 26px);
            --section-title: clamp(34px, 11vw, 56px);
            padding: 92px 18px 90px;
          }

          .sectionPageShell {
            width: calc(100vw - 36px);
          }

          .sectionPageHero {
            padding-top: 28px;
          }

          .sectionDivider {
            height: 22px;
            margin-bottom: 42px;
          }

          .sectionCardGrid {
            grid-template-columns: 1fr;
          }

          .sectionCard {
            min-height: 170px;
            border-radius: 28px;
            padding: 24px;
          }
        }
      `}</style>

      <div className="sectionPageShell">
        <section className="sectionPageHero">
          <h1>{content.title}</h1>
          <p>{content.desc}</p>
        </section>

        {content.groups.map((group) => (
          <div key={group.id}>
            <div className="sectionDivider" aria-hidden="true" />

            <section className="sectionGroup" id={group.id}>
              <div className="sectionGroupHeader">
                <span aria-hidden="true" />
                <h2>{group.title}</h2>
                <p>{group.desc}</p>
              </div>

              <div className="sectionCardGrid">
                {group.cards.map((card) => (
                  <a
                    className="sectionCard"
                    href={localizeHref(locale, card.href, group.id)}
                    key={`${group.id}-${card.title}`}
                  >
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                    <em>{ui.view}</em>
                  </a>
                ))}
              </div>
            </section>
          </div>
        ))}
      </div>
    </main>
  );
}
