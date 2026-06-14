"use client";

import Link from "next/link";
importProperties = {import { useEffect, useMemo, useState, type CSSProperties } from "react";
  padding: "10px 8px",
  borderBottom: "1px solid rgba(15,23,42,0.06)",
  color: "#111827",
};
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type InflationText = {
  title: string;
  desc: string;
  checking: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginBtn: string;
  settings: string;
  currentAmount: string;
  years: string;
  annualInflation: string;
  annualReturn: string;
  calculate: string;
  sample: string;
  clear: string;
  copy: string;
  copied: string;
  result: string;
  futureCost: string;
  purchasingPower: string;
  valueLoss: string;
  investmentFutureValue: string;
  realFutureValue: string;
  realGainLoss: string;
  requiredReturn: string;
  timeline: string;
  year: string;
  inflatedCost: string;
  equivalentPower: string;
  investedValue: string;
  invalid: string;
  tip: string;
};

type InflationRow = {
  year: number;
  inflatedCost: number;
  purchasingPower: number;
  investedValue: number;
};

type InflationResult = {
  futureCost: number;
  purchasingPower: number;
  valueLoss: number;
  investmentFutureValue: number;
  realFutureValue: number;
  realGainLoss: number;
  requiredReturn: number;
  rows: InflationRow[];
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const texts: Record<Locale, InflationText> = {
  zh: {
    title: "通胀购买力",
    desc: "估算通胀对未来购买力的影响，并对比投资收益是否能跑赢通胀。",
    checking: "正在检查登录状态...",
    loginRequiredTitle: "这个工具需要登录",
    loginRequiredDesc: "通胀购买力计算器属于注册后可用工具。登录后可继续使用。",
    loginBtn: "去登录",
    settings: "计算设置",
    currentAmount: "当前金额",
    years: "年数",
    annualInflation: "预期年通胀率",
    annualReturn: "预期年收益率",
    calculate: "开始计算",
    sample: "加载示例",
    clear: "清空",
    copy: "复制结果",
    copied: "已复制",
    result: "计算结果",
    futureCost: "未来同等购买力所需金额",
    purchasingPower: "未来实际购买力",
    valueLoss: "购买力损失",
    investmentFutureValue: "投资后名义金额",
    realFutureValue: "投资后实际购买力",
    realGainLoss: "扣除通胀后的实际增减",
    requiredReturn: "维持购买力所需年收益率",
    timeline: "年度明细",
    year: "年份",
    inflatedCost: "通胀后成本",
    equivalentPower: "等效购买力",
    investedValue: "投资名义金额",
    invalid: "请输入有效的金额、年数、通胀率和收益率。",
    tip: "提示：本工具只做本地估算，不构成投资、理财、税务或财务建议。实际通胀、收益、费用和税务会影响结果。",
  },
  "zh-TW": {
    title: "通膨購買力",
    desc: "估算通膨對未來購買力的影響，並對比投資收益是否能跑贏通膨。",
    checking: "正在檢查登入狀態...",
    loginRequiredTitle: "這個工具需要登入",
    loginRequiredDesc: "通膨購買力計算器屬於註冊後可用工具。登入後可繼續使用。",
    loginBtn: "去登入",
    settings: "計算設定",
    currentAmount: "目前金額",
    years: "年數",
    annualInflation: "預期年通膨率",
    annualReturn: "預期年收益率",
    calculate: "開始計算",
    sample: "載入示例",
    clear: "清空",
    copy: "複製結果",
    copied: "已複製",
    result: "計算結果",
    futureCost: "未來同等購買力所需金額",
    purchasingPower: "未來實際購買力",
    valueLoss: "購買力損失",
    investmentFutureValue: "投資後名義金額",
    realFutureValue: "投資後實際購買力",
    realGainLoss: "扣除通膨後的實際增減",
    requiredReturn: "維持購買力所需年收益率",
    timeline: "年度明細",
    year: "年份",
    inflatedCost: "通膨後成本",
    equivalentPower: "等效購買力",
    investedValue: "投資名義金額",
    invalid: "請輸入有效的金額、年數、通膨率和收益率。",
    tip: "提示：本工具只做本地估算，不構成投資、理財、稅務或財務建議。實際通膨、收益、費用和稅務會影響結果。",
  },
  en: {
    title: "Inflation Impact",
    desc: "Estimate how inflation affects future purchasing power and compare whether investment returns can keep up.",
    checking: "Checking login status...",
    loginRequiredTitle: "This tool requires login",
    loginRequiredDesc: "Inflation Impact is available after registration. Log in to continue.",
    loginBtn: "Go to Login",
    settings: "Calculation Settings",
    currentAmount: "Current amount",
    years: "Years",
    annualInflation: "Expected annual inflation",
    annualReturn: "Expected annual return",
    calculate: "Calculate",
    sample: "Load Sample",
    clear: "Clear",
    copy: "Copy Result",
    copied: "Copied",
    result: "Result",
    futureCost: "Future amount needed for same purchasing power",
    purchasingPower: "Future purchasing power",
    valueLoss: "Purchasing power loss",
    investmentFutureValue: "Nominal value after investment",
    realFutureValue: "Real purchasing power after investment",
    realGainLoss: "Real gain/loss after inflation",
    requiredReturn: "Annual return needed to preserve purchasing power",
    timeline: "Yearly Details",
    year: "Year",
    inflatedCost: "Inflated cost",
    equivalentPower: "Equivalent purchasing power",
    investedValue: "Nominal invested value",
    invalid: "Please enter valid amount, years, inflation rate, and return rate.",
    tip: "Note: this tool provides local estimates only and is not investment, financial, tax, or wealth management advice. Actual inflation, returns, fees, and taxes may affect results.",
  },
};

function formatMoney(value: number, locale: Locale) {
  return new Intl.NumberFormat(
    locale === "en" ? "en-US" : locale === "zh-TW" ? "zh-TW" : "zh-CN",
    {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }
  ).format(Number.isFinite(value) ? value : 0);
}

function formatPercent(value: number) {
  return `${Number.isFinite(value) ? value.toFixed(2) : "0.00"}%`;
}

function calculateInflationImpact({
  currentAmount,
  years,
  annualInflation,
  annualReturn,
}: {
  currentAmount: number;
  years: number;
  annualInflation: number;
  annualReturn: number;
}): InflationResult | null {
  if (
    !Number.isFinite(currentAmount) ||
    !Number.isFinite(years) ||
    !Number.isFinite(annualInflation) ||
    !Number.isFinite(annualReturn) ||
    currentAmount <= 0 ||
    years <= 0 ||
    annualInflation <= -99 ||
    annualReturn <= -99
  ) {
    return null;
  }

  const safeYears = Math.round(years);
  const inflationRate = annualInflation / 100;
  const returnRate = annualReturn / 100;

  const futureCost = currentAmount * Math.pow(1 + inflationRate, safeYears);
  const purchasingPower = currentAmount / Math.pow(1 + inflationRate, safeYears);
  const valueLoss = currentAmount - purchasingPower;

  const investmentFutureValue = currentAmount * Math.pow(1 + returnRate, safeYears);
  const realFutureValue =
    investmentFutureValue / Math.pow(1 + inflationRate, safeYears);
  const realGainLoss = realFutureValue - currentAmount;

  const requiredReturn = annualInflation;

  const rows: InflationRow[] = [];

  for (let year = 1; year <= safeYears; year += 1) {
    const inflatedCost = currentAmount * Math.pow(1 + inflationRate, year);
    const equivalentPower = currentAmount / Math.pow(1 + inflationRate, year);
    const investedValue = currentAmount * Math.pow(1 + returnRate, year);

    if (year <= 10 || year % 5 === 0 || year === safeYears) {
      rows.push({
        year,
        inflatedCost,
        purchasingPower: equivalentPower,
        investedValue,
      });
    }
  }

  return {
    futureCost,
    purchasingPower,
    valueLoss,
    investmentFutureValue,
    realFutureValue,
    realGainLoss,
    requiredReturn,
    rows,
  };
}

function resultToText(result: InflationResult, t: InflationText, locale: Locale) {
  return [
    `${t.futureCost}: ${formatMoney(result.futureCost, locale)}`,
    `${t.purchasingPower}: ${formatMoney(result.purchasingPower, locale)}`,
    `${t.valueLoss}: ${formatMoney(result.valueLoss, locale)}`,
    `${t.investmentFutureValue}: ${formatMoney(result.investmentFutureValue, locale)}`,
    `${t.realFutureValue}: ${formatMoney(result.realFutureValue, locale)}`,
    `${t.realGainLoss}: ${formatMoney(result.realGainLoss, locale)}`,
    `${t.requiredReturn}: ${formatPercent(result.requiredReturn)}`,
  ].join("\n");
}

export default function InflationImpactPage() {
  const params = useParams();

  const locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const [userReady, setUserReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [currentAmount, setCurrentAmount] = useState(10000);
  const [years, setYears] = useState(10);
  const [annualInflation, setAnnualInflation] = useState(3);
  const [annualReturn, setAnnualReturn] = useState(6);

  const [result, setResult] = useState<InflationResult | null>(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const nextPath = `/${locale}/tool/inflation-impact`;
  const loginHref = `/${locale}/login?next=${encodeURIComponent(nextPath)}`;

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setLoggedIn(!!data.user);
      setUserReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (!mounted) return;
      setLoggedIn(!!session?.user);
      setUserReady(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleCalculate = () => {
    const next = calculateInflationImpact({
      currentAmount,
      years,
      annualInflation,
      annualReturn,
    });

    if (!next) {
      setResult(null);
      setMessage(t.invalid);
      return;
    }

    setResult(next);
    setMessage("");
    setCopied(false);
  };

  const handleLoadSample = () => {
    setCurrentAmount(10000);
    setYears(10);
    setAnnualInflation(3);
    setAnnualReturn(6);
    setMessage("");
    setCopied(false);
  };

  const handleClear = () => {
    setCurrentAmount(0);
    setYears(0);
    setAnnualInflation(0);
    setAnnualReturn(0);
    setResult(null);
    setMessage("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(resultToText(result, t, locale));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  useEffect(() => {
    if (!loggedIn) return;

    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  if (!userReady) {
    return (
      <main className="subpage-main">
        <div className="subpage-container">
          <section className="subpage-hero">
            <h1>{t.title}</h1>
            <p>{t.checking}</p>
          </section>
        </div>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="subpage-main">
        <div className="subpage-container">
          <section className="subpage-hero">
            <h1>{t.loginRequiredTitle}</h1>
            <p>{t.loginRequiredDesc}</p>
          </section>

          <section className="subpage-section">
            <div className="card liquidGlassCard" style={{ textAlign: "center" }}>
              <Link
                href={loginHref}
                className="liquidGlassPill"
                style={{ textDecoration: "none" }}
              >
                {t.loginBtn}
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <section className="subpage-hero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </section>

        <section className="subpage-section">
          <div className="card liquidGlassCard">
            <h3>{t.settings}</h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: 14,
              }}
            >
              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.currentAmount}
                <input
                  type="number"
                  min={0}
                  value={currentAmount}
                  onChange={(event) => setCurrentAmount(Number(event.target.value))}
                  className="contact-input"
                />
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.years}
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={years}
                  onChange={(event) => setYears(Number(event.target.value))}
                  className="contact-input"
                />
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.annualInflation} (%)
                <input
                  type="number"
                  min={-99}
                  step={0.01}
                  value={annualInflation}
                  onChange={(event) => setAnnualInflation(Number(event.target.value))}
                  className="contact-input"
                />
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.annualReturn} (%)
                <input
                  type="number"
                  min={-99}
                  step={0.01}
                  value={annualReturn}
                  onChange={(event) => setAnnualReturn(Number(event.target.value))}
                  className="contact-input"
                />
              </label>
            </div>

            {message && (
              <p
                style={{
                  color: "#b42318",
                  fontSize: 14,
                  lineHeight: 1.6,
                  marginTop: 14,
                }}
              >
                {message}
              </p>
            )}

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 18,
              }}
            >
              <button
                type="button"
                className="liquidGlassPill"
                onClick={handleCalculate}
              >
                {t.calculate}
              </button>

              <button
                type="button"
                className="liquidGlassPillMuted"
                onClick={handleLoadSample}
              >
                {t.sample}
              </button>

              <button
                type="button"
                className="liquidGlassPillMuted"
                onClick={handleClear}
              >
                {t.clear}
              </button>

              <button
                type="button"
                className="liquidGlassPillMuted"
                onClick={handleCopy}
                disabled={!result}
              >
                {copied ? t.copied : t.copy}
              </button>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.result}</h2>

          {result && (
            <>
              <div className="card-grid">
                <div className="card liquidGlassCard">
                  <h3>{t.futureCost}</h3>
                  <p>{formatMoney(result.futureCost, locale)}</p>
                </div>

                <div className="card liquidGlassCard">
                  <h3>{t.purchasingPower}</h3>
                  <p>{formatMoney(result.purchasingPower, locale)}</p>
                </div>

                <div className="card liquidGlassCard">
                  <h3>{t.valueLoss}</h3>
                  <p>{formatMoney(result.valueLoss, locale)}</p>
                </div>

                <div className="card liquidGlassCard">
                  <h3>{t.investmentFutureValue}</h3>
                  <p>{formatMoney(result.investmentFutureValue, locale)}</p>
                </div>

                <div className="card liquidGlassCard">
                  <h3>{t.realFutureValue}</h3>
                  <p>{formatMoney(result.realFutureValue, locale)}</p>
                </div>

                <div className="card liquidGlassCard">
                  <h3>{t.realGainLoss}</h3>
                  <p>{formatMoney(result.realGainLoss, locale)}</p>
                </div>

                <div className="card liquidGlassCard">
                  <h3>{t.requiredReturn}</h3>
                  <p>{formatPercent(result.requiredReturn)}</p>
                </div>
              </div>

              <div className="card liquidGlassCard" style={{ marginTop: 20 }}>
                <h3>{t.timeline}</h3>

                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 13,
                    }}
                  >
                    <thead>
                      <tr>
                        <th style={thStyle}>{t.year}</th>
                        <th style={thStyle}>{t.inflatedCost}</th>
                        <th style={thStyle}>{t.equivalentPower}</th>
                        <th style={thStyle}>{t.investedValue}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row) => (
                        <tr key={row.year}>
                          <td style={tdStyle}>{row.year}</td>
                          <td style={tdStyle}>
                            {formatMoney(row.inflatedCost, locale)}
                          </td>
                          <td style={tdStyle}>
                            {formatMoney(row.purchasingPower, locale)}
                          </td>
                          <td style={tdStyle}>
                            {formatMoney(row.investedValue, locale)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p style={{ marginTop: 12, color: "#6b7280", fontSize: 13 }}>
                  {locale === "en"
                    ? "For readability, the table shows the first 10 years, every 5-year milestone, and the final year."
                    : locale === "zh-TW"
                      ? "為方便閱讀，表格顯示前 10 年、每 5 年節點和最後一年。"
                      : "为方便阅读，表格显示前 10 年、每 5 年节点和最后一年。"}
                </p>
              </div>
            </>
          )}
        </section>

        <div className="disclaimer-box">
          <p>{t.tip}</p>
        </div>
      </div>
    </main>
  );
}

const thStyle: CSSProperties = {
  textAlign: "left",
  padding: "10px 8px",
  borderBottom: "1px solid rgba(15,23,42,0.12)",
  color: "#374151",
  fontWeight: 800,
};

