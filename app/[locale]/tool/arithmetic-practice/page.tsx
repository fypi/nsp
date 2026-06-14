"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";
type Operator = "+" | "-" | "×" | "÷";
type Difficulty = "easy" | "medium" | "hard";

type ArithmeticText = {
  title: string;
  desc: string;
  checking: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginBtn: string;
  settings: string;
  difficulty: string;
  easy: string;
  medium: string;
  hard: string;
  operators: string;
  count: string;
  minNumber: string;
  maxNumber: string;
  includeAnswers: string;
  generate: string;
  shuffle: string;
  print: string;
  copy: string;
  copied: string;
  clear: string;
  result: string;
  question: string;
  answer: string;
  tip: string;
};

type Problem = {
  id: string;
  left: number;
  right: number;
  operator: Operator;
  answer: number;
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const texts: Record<Locale, ArithmeticText> = {
  zh: {
    title: "口算练习生成器",
    desc: "按难度、范围和运算类型生成加减乘除练习，适合打印和日常训练。",
    checking: "正在检查登录状态...",
    loginRequiredTitle: "这个工具需要登录",
    loginRequiredDesc: "口算练习生成器属于注册后可用工具。登录后可继续使用。",
    loginBtn: "去登录",
    settings: "生成设置",
    difficulty: "难度",
    easy: "简单",
    medium: "中等",
    hard: "较难",
    operators: "运算类型",
    count: "题目数量",
    minNumber: "最小数字",
    maxNumber: "最大数字",
    includeAnswers: "显示答案",
    generate: "生成练习",
    shuffle: "随机打乱",
    print: "打印",
    copy: "复制内容",
    copied: "已复制",
    clear: "清空",
    result: "生成结果",
    question: "题目",
    answer: "答案",
    tip: "提示：本工具只用于生成学习练习材料，不采集儿童个人信息。建议家长或老师根据学习阶段调整题量和难度。",
  },
  "zh-TW": {
    title: "口算練習生成器",
    desc: "按難度、範圍和運算類型生成加減乘除練習，適合列印和日常訓練。",
    checking: "正在檢查登入狀態...",
    loginRequiredTitle: "這個工具需要登入",
    loginRequiredDesc: "口算練習生成器屬於註冊後可用工具。登入後可繼續使用。",
    loginBtn: "去登入",
    settings: "生成設定",
    difficulty: "難度",
    easy: "簡單",
    medium: "中等",
    hard: "較難",
    operators: "運算類型",
    count: "題目數量",
    minNumber: "最小數字",
    maxNumber: "最大數字",
    includeAnswers: "顯示答案",
    generate: "生成練習",
    shuffle: "隨機打亂",
    print: "列印",
    copy: "複製內容",
    copied: "已複製",
    clear: "清空",
    result: "生成結果",
    question: "題目",
    answer: "答案",
    tip: "提示：本工具只用於生成學習練習材料，不採集兒童個人資訊。建議家長或老師根據學習階段調整題量和難度。",
  },
  en: {
    title: "Arithmetic Practice",
    desc: "Generate addition, subtraction, multiplication, and division practice by difficulty, range, and operator type.",
    checking: "Checking login status...",
    loginRequiredTitle: "This tool requires login",
    loginRequiredDesc: "Arithmetic Practice is available after registration. Log in to continue.",
    loginBtn: "Go to Login",
    settings: "Settings",
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    operators: "Operators",
    count: "Question count",
    minNumber: "Minimum number",
    maxNumber: "Maximum number",
    includeAnswers: "Show answers",
    generate: "Generate Practice",
    shuffle: "Shuffle",
    print: "Print",
    copy: "Copy content",
    copied: "Copied",
    clear: "Clear",
    result: "Result",
    question: "Question",
    answer: "Answer",
    tip: "Note: this tool only generates learning practice materials and does not collect children's personal information. Parents or teachers should adjust count and difficulty based on the learner's stage.",
  },
};

function randomInt(min: number, max: number) {
  const low = Math.ceil(min);
  const high = Math.floor(max);

  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function shuffleArray<T>(items: T[]) {
  const cloned = [...items];

  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }

  return cloned;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getDefaultsByDifficulty(difficulty: Difficulty) {
  if (difficulty === "easy") {
    return {
      min: 1,
      max: 20,
      count: 20,
      operators: ["+", "-"] as Operator[],
    };
  }

  if (difficulty === "medium") {
    return {
      min: 1,
      max: 100,
      count: 30,
      operators: ["+", "-", "×"] as Operator[],
    };
  }

  return {
    min: 1,
    max: 500,
    count: 40,
    operators: ["+", "-", "×", "÷"] as Operator[],
  };
}

function createProblem(
  operator: Operator,
  minNumber: number,
  maxNumber: number
): Problem {
  let left = randomInt(minNumber, maxNumber);
  let right = randomInt(minNumber, maxNumber);
  let answer = 0;

  if (operator === "+") {
    answer = left + right;
  }

  if (operator === "-") {
    if (right > left) {
      [left, right] = [right, left];
    }

    answer = left - right;
  }

  if (operator === "×") {
    const multiplyMax = Math.min(maxNumber, 20);
    left = randomInt(Math.max(1, minNumber), multiplyMax);
    right = randomInt(Math.max(1, minNumber), multiplyMax);
    answer = left * right;
  }

  if (operator === "÷") {
    right = randomInt(Math.max(1, minNumber), Math.min(maxNumber, 20));
    answer = randomInt(Math.max(1, minNumber), Math.min(maxNumber, 20));
    left = right * answer;
  }

  return {
    id: `${Date.now()}-${Math.random()}`,
    left,
    right,
    operator,
    answer,
  };
}

function createProblems(
  selectedOperators: Operator[],
  count: number,
  minNumber: number,
  maxNumber: number
) {
  const safeOperators = selectedOperators.length ? selectedOperators : ["+"];
  const safeCount = clamp(count, 1, 100);

  const list: Problem[] = [];

  for (let i = 0; i < safeCount; i += 1) {
    const operator = safeOperators[i % safeOperators.length];
    list.push(createProblem(operator, minNumber, maxNumber));
  }

  return shuffleArray(list);
}

function problemText(problem: Problem) {
  return `${problem.left} ${problem.operator} ${problem.right} =`;
}

export default function ArithmeticPracticePage() {
  const params = useParams();

  const locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const [userReady, setUserReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const initialDefaults = getDefaultsByDifficulty("easy");

  const [selectedOperators, setSelectedOperators] = useState<Operator[]>(
    initialDefaults.operators
  );
  const [count, setCount] = useState(initialDefaults.count);
  const [minNumber, setMinNumber] = useState(initialDefaults.min);
  const [maxNumber, setMaxNumber] = useState(initialDefaults.max);
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [problems, setProblems] = useState<Problem[]>(() =>
    createProblems(
      initialDefaults.operators,
      initialDefaults.count,
      initialDefaults.min,
      initialDefaults.max
    )
  );
  const [copied, setCopied] = useState(false);

  const nextPath = `/${locale}/tool/arithmetic-practice`;

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

  const difficultyOptions = useMemo(
    () => [
      { value: "easy" as Difficulty, label: t.easy },
      { value: "medium" as Difficulty, label: t.medium },
      { value: "hard" as Difficulty, label: t.hard },
    ],
    [t]
  );

  const operatorOptions: Operator[] = ["+", "-", "×", "÷"];

  const handleDifficultyChange = (value: Difficulty) => {
    const defaults = getDefaultsByDifficulty(value);

    setDifficulty(value);
    setMinNumber(defaults.min);
    setMaxNumber(defaults.max);
    setCount(defaults.count);
    setSelectedOperators(defaults.operators);
    setProblems(
      createProblems(defaults.operators, defaults.count, defaults.min, defaults.max)
    );
    setCopied(false);
  };

  const toggleOperator = (operator: Operator) => {
    setSelectedOperators((current) => {
      if (current.includes(operator)) {
        const next = current.filter((item) => item !== operator);
        return next.length ? next : current;
      }

      return [...current, operator];
    });

    setCopied(false);
  };

  const handleGenerate = () => {
    const safeMin = Math.min(minNumber, maxNumber);
    const safeMax = Math.max(minNumber, maxNumber);

    setProblems(createProblems(selectedOperators, count, safeMin, safeMax));
    setCopied(false);
  };

  const handleShuffle = () => {
    setProblems((current) => shuffleArray(current));
    setCopied(false);
  };

  const handleClear = () => {
    setProblems([]);
    setCopied(false);
  };

  const handleCopy = async () => {
    const output = problems
      .map((problem, index) => {
        const base = `${index + 1}. ${problemText(problem)}`;

        if (!includeAnswers) return base;

        return `${base} ${problem.answer}`;
      })
      .join("\n");

    await navigator.clipboard.writeText(output);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

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
            <div
              className="card liquidGlassCard"
              style={{ textAlign: "center" }}
            >
              <Link
                href={`/${locale}/login?next=${encodeURIComponent(nextPath)}`}
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
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 14,
              }}
            >
              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.difficulty}
                <select
                  value={difficulty}
                  onChange={(event) =>
                    handleDifficultyChange(event.target.value as Difficulty)
                  }
                  className="contact-input"
                >
                  {difficultyOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.count}
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setCount(Number.isFinite(next) ? next : 20);
                  }}
                  className="contact-input"
                />
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.minNumber}
                <input
                  type="number"
                  value={minNumber}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setMinNumber(Number.isFinite(next) ? next : 1);
                  }}
                  className="contact-input"
                />
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.maxNumber}
                <input
                  type="number"
                  value={maxNumber}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setMaxNumber(Number.isFinite(next) ? next : 20);
                  }}
                  className="contact-input"
                />
              </label>
            </div>

            <div style={{ marginTop: 18 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#374151",
                  marginBottom: 10,
                }}
              >
                {t.operators}
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {operatorOptions.map((operator) => {
                  const active = selectedOperators.includes(operator);

                  return (
                    <button
                      key={operator}
                      type="button"
                      className={active ? "liquidGlassPill" : "liquidGlassPillMuted"}
                      onClick={() => toggleOperator(operator)}
                    >
                      {operator}
                    </button>
                  );
                })}
              </div>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 18,
                fontSize: 14,
                color: "#374151",
              }}
            >
              <input
                type="checkbox"
                checked={includeAnswers}
                onChange={(event) => setIncludeAnswers(event.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              {t.includeAnswers}
            </label>

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
                onClick={handleGenerate}
              >
                {t.generate}
              </button>

              <button
                type="button"
                className="liquidGlassPillMuted"
                onClick={handleShuffle}
                disabled={!problems.length}
              >
                {t.shuffle}
              </button>

              <button
                type="button"
                className="liquidGlassPillMuted"
                onClick={handlePrint}
                disabled={!problems.length}
              >
                {t.print}
              </button>

              <button
                type="button"
                className="liquidGlassPillMuted"
                onClick={handleCopy}
                disabled={!problems.length}
              >
                {copied ? t.copied : t.copy}
              </button>

              <button
                type="button"
                className="liquidGlassPillMuted"
                onClick={handleClear}
              >
                {t.clear}
              </button>
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.result}</h2>

          <div
            className="arithmetic-print-area"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: 14,
            }}
          >
            {problems.map((problem, index) => (
              <article
                key={problem.id}
                className="card liquidGlassCard"
                style={{
                  minHeight: 112,
                  display: "grid",
                  alignContent: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    fontWeight: 700,
                  }}
                >
                  {index + 1}. {t.question}
                </div>

                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: "#111827",
                    letterSpacing: "0.02em",
                  }}
                >
                  {problemText(problem)}
                </div>

                {includeAnswers && (
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 750,
                      color: "#374151",
                    }}
                  >
                    {t.answer}: {problem.answer}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <div className="disclaimer-box">
          <p>{t.tip}</p>
        </div>

        <style jsx global>{`
          @media print {
            nav,
            .subpage-hero,
            .disclaimer-box,
            .subpage-section:first-of-type,
            footer {
              display: none !important;
            }

            body {
              background: #ffffff !important;
            }

            .subpage-main {
              padding: 0 !important;
              background: #ffffff !important;
            }

            .subpage-container {
              max-width: none !important;
              padding: 20px !important;
            }

            .arithmetic-print-area {
              display: grid !important;
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 12px !important;
            }

            .arithmetic-print-area .card {
              border: 1px solid #d1d5db !important;
              box-shadow: none !important;
              background: #ffffff !important;
              break-inside: avoid !important;
            }
          }
        `}</style>
      </div>
    </main>
  );
}