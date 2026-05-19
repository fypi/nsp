"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

const locales = ["en", "zh", "zh-TW"] as const;
type Locale = (typeof locales)[number];

const texts = {
  zh: {
    title: "复利计算器",
    desc: "输入本金、年化收益率、年限和每月追加金额，快速估算长期复利效果。",
    principal: "初始本金",
    annualRate: "年化收益率（%）",
    years: "投资年限",
    monthlyContribution: "每月追加",
    frequency: "复利频率",
    monthly: "按月复利",
    yearly: "按年复利",
    calculate: "开始计算",
    clear: "清空",
    result: "结果概览",
    finalAmount: "最终总额",
    totalPrincipal: "累计投入",
    totalInterest: "累计收益",
    yearlyBreakdown: "年度明细",
    year: "年份",
    invested: "累计投入",
    amount: "账户总额",
    interest: "累计收益",
    empty: "请至少填写本金、年化收益率和投资年限",
    tip: "提示：本工具仅用于估算复利效果，不构成任何投资建议。",
  },
  "zh-TW": {
    title: "複利計算器",
    desc: "輸入本金、年化收益率、年限和每月追加金額，快速估算長期複利效果。",
    principal: "初始本金",
    annualRate: "年化收益率（%）",
    years: "投資年限",
    monthlyContribution: "每月追加",
    frequency: "複利頻率",
    monthly: "按月複利",
    yearly: "按年複利",
    calculate: "開始計算",
    clear: "清空",
    result: "結果概覽",
    finalAmount: "最終總額",
    totalPrincipal: "累計投入",
    totalInterest: "累計收益",
    yearlyBreakdown: "年度明細",
    year: "年份",
    invested: "累計投入",
    amount: "帳戶總額",
    interest: "累計收益",
    empty: "請至少填寫本金、年化收益率和投資年限",
    tip: "提示：本工具僅用於估算複利效果，不構成任何投資建議。",
  },
  en: {
    title: "Compound Interest Calculator",
    desc: "Estimate long-term compound growth with principal, annual return, time horizon, and monthly contribution.",
    principal: "Initial Principal",
    annualRate: "Annual Return (%)",
    years: "Years",
    monthlyContribution: "Monthly Contribution",
    frequency: "Compounding Frequency",
    monthly: "Monthly",
    yearly: "Yearly",
    calculate: "Calculate",
    clear: "Clear",
    result: "Summary",
    finalAmount: "Final Balance",
    totalPrincipal: "Total Invested",
    totalInterest: "Total Gain",
    yearlyBreakdown: "Yearly Breakdown",
    year: "Year",
    invested: "Invested",
    amount: "Balance",
    interest: "Gain",
    empty: "Please enter at least principal, annual return, and years",
    tip: "Note: this tool is for estimation only and does not constitute investment advice.",
  },
} as const;

type ResultRow = {
  year: number;
  invested: number;
  amount: number;
  interest: number;
};

export default function CompoundInterestPage() {
  const params = useParams();

  const locale: Locale = useMemo(() => {
    const raw = params?.locale;
    if (typeof raw === "string" && locales.includes(raw as Locale)) {
      return raw as Locale;
    }
    return "zh";
  }, [params]);

  const t = texts[locale];

  const [principal, setPrincipal] = useState("10000");
  const [annualRate, setAnnualRate] = useState("8");
  const [years, setYears] = useState("10");
  const [monthlyContribution, setMonthlyContribution] = useState("1000");
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");

  const [rows, setRows] = useState<ResultRow[]>([]);
  const [message, setMessage] = useState("");

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat(
      locale === "zh" ? "zh-CN" : locale === "zh-TW" ? "zh-TW" : "en-US",
      {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }
    ).format(value);
  };

  const handleCalculate = () => {
    const p = Number(principal);
    const r = Number(annualRate) / 100;
    const y = Number(years);
    const m = Number(monthlyContribution);

    if (
      Number.isNaN(p) ||
      Number.isNaN(r) ||
      Number.isNaN(y) ||
      p < 0 ||
      y <= 0
    ) {
      setMessage(t.empty);
      setRows([]);
      return;
    }

    let balance = p;
    let invested = p;
    const nextRows: ResultRow[] = [];

    if (frequency === "monthly") {
      const monthlyRate = r / 12;

      for (let year = 1; year <= y; year++) {
        for (let month = 1; month <= 12; month++) {
          balance = balance * (1 + monthlyRate) + m;
          invested += m;
        }

        nextRows.push({
          year,
          invested,
          amount: balance,
          interest: balance - invested,
        });
      }
    } else {
      for (let year = 1; year <= y; year++) {
        balance = balance * (1 + r) + m * 12;
        invested += m * 12;

        nextRows.push({
          year,
          invested,
          amount: balance,
          interest: balance - invested,
        });
      }
    }

    setRows(nextRows);
    setMessage("");
  };

  const handleClear = () => {
    setPrincipal("");
    setAnnualRate("");
    setYears("");
    setMonthlyContribution("");
    setRows([]);
    setMessage("");
    setFrequency("monthly");
  };

  const summary = rows.length ? rows[rows.length - 1] : null;

  return (
    <main className="subpage-main">
      <div className="subpage-container">
        <div className="subpage-hero">
          <h1>{t.title}</h1>
          <p>{t.desc}</p>
        </div>

        <section className="subpage-section">
          <div className="card-grid">
            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.principal}</h3>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.annualRate}</h3>
              <input
                type="number"
                step="0.01"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.years}</h3>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.monthlyContribution}</h3>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div className="card">
              <h3 style={{ marginBottom: "12px" }}>{t.frequency}</h3>
              <select
                value={frequency}
                onChange={(e) =>
                  setFrequency(e.target.value as "monthly" | "yearly")
                }
                style={inputStyle}
              >
                <option value="monthly">{t.monthly}</option>
                <option value="yearly">{t.yearly}</option>
              </select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button onClick={handleCalculate} style={toolBtnPrimary}>
              {t.calculate}
            </button>
            <button onClick={handleClear} style={toolBtnSecondary}>
              {t.clear}
            </button>
          </div>

          {message && (
            <div
              style={{
                marginTop: "16px",
                fontSize: "14px",
                color: "#c00",
              }}
            >
              {message}
            </div>
          )}
        </section>

        {summary && (
          <section className="subpage-section">
            <h2>{t.result}</h2>
            <div className="card-grid">
              <div className="card">
                <h3>{t.finalAmount}</h3>
                <p style={resultValueStyle}>{formatNumber(summary.amount)}</p>
              </div>

              <div className="card">
                <h3>{t.totalPrincipal}</h3>
                <p style={resultValueStyle}>{formatNumber(summary.invested)}</p>
              </div>

              <div className="card">
                <h3>{t.totalInterest}</h3>
                <p style={resultValueStyle}>{formatNumber(summary.interest)}</p>
              </div>
            </div>
          </section>
        )}

        {rows.length > 0 && (
          <section className="subpage-section">
            <h2>{t.yearlyBreakdown}</h2>
            <div
              style={{
                overflowX: "auto",
                border: "1px solid #eee",
                borderRadius: "16px",
                background: "#fff",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "560px",
                }}
              >
                <thead>
                  <tr style={{ background: "#f8f8f8" }}>
                    <th style={thStyle}>{t.year}</th>
                    <th style={thStyle}>{t.invested}</th>
                    <th style={thStyle}>{t.amount}</th>
                    <th style={thStyle}>{t.interest}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.year}>
                      <td style={tdStyle}>{row.year}</td>
                      <td style={tdStyle}>{formatNumber(row.invested)}</td>
                      <td style={tdStyle}>{formatNumber(row.amount)}</td>
                      <td style={tdStyle}>{formatNumber(row.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="disclaimer-box">
          <p>{t.tip}</p>
        </div>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "12px 14px",
  fontSize: "14px",
  boxSizing: "border-box",
  outline: "none",
  background: "#fff",
};

const resultValueStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  color: "#111",
  marginTop: "8px",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 14px",
  fontSize: "14px",
  color: "#111",
  borderBottom: "1px solid #eee",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 14px",
  fontSize: "14px",
  color: "#444",
  borderBottom: "1px solid #f3f3f3",
};

const toolBtnPrimary: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "999px",
  border: "none",
  background: "#111",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
};

const toolBtnSecondary: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "999px",
  border: "1px solid #ddd",
  background: "#fff",
  color: "#111",
  fontSize: "14px",
  cursor: "pointer",
};
