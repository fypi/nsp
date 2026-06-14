"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";

type Track =
  | "frontend"
  | "backend"
  | "fullstack"
  | "ai"
  | "network"
  | "system"
  | "devops";

type Level = "beginner" | "intermediate" | "advanced";
type Pace = "light" | "normal" | "intense";

type TechPathText = {
  title: string;
  desc: string;
  checking: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginBtn: string;
  settings: string;
  track: string;
  level: string;
  weeks: string;
  pace: string;
  goal: string;
  goalPlaceholder: string;
  generate: string;
  sample: string;
  clear: string;
  copy: string;
  copied: string;
  print: string;
  result: string;
  overview: string;
  weeklyPlan: string;
  projectIdeas: string;
  checkpoints: string;
  resources: string;
  frontend: string;
  backend: string;
  fullstack: string;
  ai: string;
  network: string;
  system: string;
  devops: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  light: string;
  normal: string;
  intense: string;
  week: string;
  focus: string;
  tasks: string;
  output: string;
  noGoal: string;
  tip: string;
};

type WeekPlan = {
  week: number;
  focus: string;
  tasks: string[];
  output: string;
};

type PathResult = {
  overview: string[];
  weeklyPlan: WeekPlan[];
  projectIdeas: string[];
  checkpoints: string[];
  resources: string[];
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const texts: Record<Locale, TechPathText> = {
  zh: {
    title: "技术学习路线",
    desc: "按方向、基础、周期和节奏生成前端、后端、AI、网络、系统和 DevOps 学习路线。",
    checking: "正在检查登录状态...",
    loginRequiredTitle: "这个工具需要登录",
    loginRequiredDesc: "技术学习路线属于注册后可用工具。登录后可继续使用。",
    loginBtn: "去登录",
    settings: "生成设置",
    track: "学习方向",
    level: "当前基础",
    weeks: "学习周期",
    pace: "学习节奏",
    goal: "学习目标",
    goalPlaceholder: "例如：3 个月入门前端、学习 AI 应用开发、转后端工程...",
    generate: "生成路线",
    sample: "加载示例",
    clear: "清空",
    copy: "复制路线",
    copied: "已复制",
    print: "打印",
    result: "生成结果",
    overview: "路线总览",
    weeklyPlan: "周计划",
    projectIdeas: "项目练习",
    checkpoints: "阶段检查点",
    resources: "学习资源建议",
    frontend: "前端",
    backend: "后端",
    fullstack: "全栈",
    ai: "AI 应用",
    network: "网络",
    system: "系统",
    devops: "DevOps",
    beginner: "零基础 / 入门",
    intermediate: "有基础",
    advanced: "进阶提升",
    light: "轻量",
    normal: "标准",
    intense: "强化",
    week: "第",
    focus: "重点",
    tasks: "任务",
    output: "产出",
    noGoal: "请输入学习目标。",
    tip: "提示：本工具生成的是学习路线草案，适合自学规划和复盘。路线不采集个人隐私信息，建议结合实际时间和基础调整。",
  },
  "zh-TW": {
    title: "技術學習路線",
    desc: "按方向、基礎、週期和節奏生成前端、後端、AI、網路、系統和 DevOps 學習路線。",
    checking: "正在檢查登入狀態...",
    loginRequiredTitle: "這個工具需要登入",
    loginRequiredDesc: "技術學習路線屬於註冊後可用工具。登入後可繼續使用。",
    loginBtn: "去登入",
    settings: "生成設定",
    track: "學習方向",
    level: "目前基礎",
    weeks: "學習週期",
    pace: "學習節奏",
    goal: "學習目標",
    goalPlaceholder: "例如：3 個月入門前端、學習 AI 應用開發、轉後端工程...",
    generate: "生成路線",
    sample: "載入示例",
    clear: "清空",
    copy: "複製路線",
    copied: "已複製",
    print: "列印",
    result: "生成結果",
    overview: "路線總覽",
    weeklyPlan: "週計劃",
    projectIdeas: "專案練習",
    checkpoints: "階段檢查點",
    resources: "學習資源建議",
    frontend: "前端",
    backend: "後端",
    fullstack: "全端",
    ai: "AI 應用",
    network: "網路",
    system: "系統",
    devops: "DevOps",
    beginner: "零基礎 / 入門",
    intermediate: "有基礎",
    advanced: "進階提升",
    light: "輕量",
    normal: "標準",
    intense: "強化",
    week: "第",
    focus: "重點",
    tasks: "任務",
    output: "產出",
    noGoal: "請輸入學習目標。",
    tip: "提示：本工具生成的是學習路線草案，適合自學規劃和複盤。路線不採集個人隱私資訊，建議結合實際時間和基礎調整。",
  },
  en: {
    title: "Tech Learning Path",
    desc: "Generate learning paths for frontend, backend, AI applications, networking, systems, and DevOps by track, level, duration, and pace.",
    checking: "Checking login status...",
    loginRequiredTitle: "This tool requires login",
    loginRequiredDesc: "Tech Learning Path is available after registration. Log in to continue.",
    loginBtn: "Go to Login",
    settings: "Settings",
    track: "Track",
    level: "Current level",
    weeks: "Duration in weeks",
    pace: "Pace",
    goal: "Learning goal",
    goalPlaceholder: "Example: learn frontend in 3 months, build AI apps, switch to backend engineering...",
    generate: "Generate Path",
    sample: "Load Sample",
    clear: "Clear",
    copy: "Copy Path",
    copied: "Copied",
    print: "Print",
    result: "Result",
    overview: "Overview",
    weeklyPlan: "Weekly Plan",
    projectIdeas: "Project Practice",
    checkpoints: "Checkpoints",
    resources: "Resource Suggestions",
    frontend: "Frontend",
    backend: "Backend",
    fullstack: "Full Stack",
    ai: "AI Applications",
    network: "Networking",
    system: "Systems",
    devops: "DevOps",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    light: "Light",
    normal: "Normal",
    intense: "Intense",
    week: "Week",
    focus: "Focus",
    tasks: "Tasks",
    output: "Output",
    noGoal: "Please enter a learning goal.",
    tip: "Note: this tool generates a learning path draft for self-study planning and review. It does not collect private information. Adjust the path based on actual time and background.",
  },
};

const trackTopics: Record<Track, { zh: string[]; tw: string[]; en: string[] }> = {
  frontend: {
    zh: ["HTML / CSS 基础", "JavaScript", "TypeScript", "React / Next.js", "状态管理", "接口请求", "组件设计", "性能优化"],
    tw: ["HTML / CSS 基礎", "JavaScript", "TypeScript", "React / Next.js", "狀態管理", "接口請求", "元件設計", "效能優化"],
    en: ["HTML / CSS basics", "JavaScript", "TypeScript", "React / Next.js", "State management", "API requests", "Component design", "Performance"],
  },
  backend: {
    zh: ["HTTP 基础", "数据库", "Node.js / API", "认证权限", "缓存", "队列", "日志监控", "部署"],
    tw: ["HTTP 基礎", "資料庫", "Node.js / API", "認證權限", "快取", "佇列", "日誌監控", "部署"],
    en: ["HTTP basics", "Databases", "Node.js / API", "Auth and permissions", "Caching", "Queues", "Logging and monitoring", "Deployment"],
  },
  fullstack: {
    zh: ["前端基础", "后端 API", "数据库设计", "认证登录", "文件上传", "部署上线", "错误处理", "完整项目"],
    tw: ["前端基礎", "後端 API", "資料庫設計", "認證登入", "檔案上傳", "部署上線", "錯誤處理", "完整專案"],
    en: ["Frontend basics", "Backend APIs", "Database design", "Authentication", "File upload", "Deployment", "Error handling", "Complete project"],
  },
  ai: {
    zh: ["AI 基础概念", "Prompt 设计", "API 调用", "RAG 基础", "向量数据库", "Agent 流程", "评估与安全", "AI 应用项目"],
    tw: ["AI 基礎概念", "Prompt 設計", "API 呼叫", "RAG 基礎", "向量資料庫", "Agent 流程", "評估與安全", "AI 應用專案"],
    en: ["AI basics", "Prompt design", "API calls", "RAG basics", "Vector databases", "Agent workflows", "Evaluation and safety", "AI app project"],
  },
  network: {
    zh: ["网络模型", "IP / 子网", "DNS", "HTTP / HTTPS", "路由交换", "防火墙", "抓包分析", "网络排障"],
    tw: ["網路模型", "IP / 子網", "DNS", "HTTP / HTTPS", "路由交換", "防火牆", "封包分析", "網路排障"],
    en: ["Network models", "IP / subnetting", "DNS", "HTTP / HTTPS", "Routing and switching", "Firewalls", "Packet analysis", "Troubleshooting"],
  },
  system: {
    zh: ["操作系统基础", "Linux 命令", "进程与线程", "文件系统", "Shell 脚本", "权限管理", "系统监控", "故障排查"],
    tw: ["作業系統基礎", "Linux 命令", "程序與執行緒", "檔案系統", "Shell 腳本", "權限管理", "系統監控", "故障排查"],
    en: ["OS basics", "Linux commands", "Processes and threads", "File systems", "Shell scripting", "Permission management", "System monitoring", "Troubleshooting"],
  },
  devops: {
    zh: ["Git 工作流", "CI/CD", "Docker", "环境变量", "云部署", "反向代理", "监控告警", "自动化运维"],
    tw: ["Git 工作流", "CI/CD", "Docker", "環境變數", "雲部署", "反向代理", "監控告警", "自動化維運"],
    en: ["Git workflow", "CI/CD", "Docker", "Environment variables", "Cloud deployment", "Reverse proxy", "Monitoring and alerts", "Automation"],
  },
};

function getTrackLabel(track: Track, t: TechPathText) {
  if (track === "frontend") return t.frontend;
  if (track === "backend") return t.backend;
  if (track === "fullstack") return t.fullstack;
  if (track === "ai") return t.ai;
  if (track === "network") return t.network;
  if (track === "system") return t.system;
  return t.devops;
}

function getLevelLabel(level: Level, t: TechPathText) {
  if (level === "beginner") return t.beginner;
  if (level === "advanced") return t.advanced;
  return t.intermediate;
}

function getPaceLabel(pace: Pace, t: TechPathText) {
  if (pace === "light") return t.light;
  if (pace === "intense") return t.intense;
  return t.normal;
}

function getLocalizedTopics(track: Track, locale: Locale) {
  const topics = trackTopics[track];

  if (locale === "en") return topics.en;
  if (locale === "zh-TW") return topics.tw;
  return topics.zh;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function tasksForWeek({
  topic,
  level,
  pace,
  locale,
}: {
  topic: string;
  track: Track;
  level: Level;
  pace: Pace;
  locale: Locale;
}) {
  const taskCount = pace === "light" ? 2 : pace === "intense" ? 4 : 3;

  const zhTasks =
    level === "beginner"
      ? [
          `理解「${topic}」的基本概念和常见用途`,
          `完成 2 到 3 个「${topic}」相关小练习`,
          `整理「${topic}」常见问题和关键词`,
          `用自己的话写一段「${topic}」总结`,
        ]
      : level === "advanced"
        ? [
            `深入阅读「${topic}」的高级实践`,
            `完成一个和「${topic}」相关的实战功能`,
            `整理性能、安全或工程化注意点`,
            `复盘项目中可以优化的部分`,
          ]
        : [
            `复习「${topic}」的核心概念`,
            `完成一个中等难度练习`,
            `把「${topic}」应用到一个小项目中`,
            `记录问题、解决方法和下一步计划`,
          ];

  const twTasks =
    level === "beginner"
      ? [
          `理解「${topic}」的基本概念和常見用途`,
          `完成 2 到 3 個「${topic}」相關小練習`,
          `整理「${topic}」常見問題和關鍵詞`,
          `用自己的話寫一段「${topic}」總結`,
        ]
      : level === "advanced"
        ? [
            `深入閱讀「${topic}」的進階實踐`,
            `完成一個和「${topic}」相關的實戰功能`,
            `整理效能、安全或工程化注意點`,
            `複盤專案中可以優化的部分`,
          ]
        : [
            `複習「${topic}」的核心概念`,
            `完成一個中等難度練習`,
            `把「${topic}」應用到一個小專案中`,
            `記錄問題、解決方法和下一步計劃`,
          ];

  const enTasks =
    level === "beginner"
      ? [
          `Understand the basic concepts and common use cases of ${topic}.`,
          `Complete 2 to 3 small exercises related to ${topic}.`,
          `Organize common questions and keywords for ${topic}.`,
          `Write a short summary of ${topic} in your own words.`,
        ]
      : level === "advanced"
        ? [
            `Study advanced practices for ${topic}.`,
            `Build one practical feature related to ${topic}.`,
            `Summarize performance, security, or engineering concerns.`,
            `Review what can be improved in the project.`,
          ]
        : [
            `Review the core concepts of ${topic}.`,
            `Complete one medium-level exercise.`,
            `Apply ${topic} to a small project.`,
            `Record problems, solutions, and the next step.`,
          ];

  const base = locale === "en" ? enTasks : locale === "zh-TW" ? twTasks : zhTasks;

  return base.slice(0, taskCount);
}

function generatePath({
  track,
  level,
  weeks,
  pace,
  goal,
  locale,
  t,
}: {
  track: Track;
  level: Level;
  weeks: number;
  pace: Pace;
  goal: string;
  locale: Locale;
  t: TechPathText;
}): PathResult {
  const safeWeeks = clamp(weeks, 1, 52);
  const topics = getLocalizedTopics(track, locale);
  const weeklyPlan: WeekPlan[] = [];

  for (let i = 1; i <= safeWeeks; i += 1) {
    const topic = topics[(i - 1) % topics.length];

    weeklyPlan.push({
      week: i,
      focus: topic,
      tasks: tasksForWeek({ topic, track, level, pace, locale }),
      output:
        locale === "en"
          ? `A small note, demo, or checklist related to ${topic}.`
          : locale === "zh-TW"
            ? `產出一份和「${topic}」相關的筆記、Demo 或檢查清單。`
            : `产出一份和“${topic}”相关的笔记、Demo 或检查清单。`,
    });
  }

  return {
    overview:
      locale === "en"
        ? [
            `Goal: ${goal}`,
            `Track: ${getTrackLabel(track, t)}`,
            `Level: ${getLevelLabel(level, t)}`,
            `Duration: ${safeWeeks} weeks`,
            `Pace: ${getPaceLabel(pace, t)}`,
          ]
        : locale === "zh-TW"
          ? [
              `目標：${goal}`,
              `方向：${getTrackLabel(track, t)}`,
              `基礎：${getLevelLabel(level, t)}`,
              `週期：${safeWeeks} 週`,
              `節奏：${getPaceLabel(pace, t)}`,
            ]
          : [
              `目标：${goal}`,
              `方向：${getTrackLabel(track, t)}`,
              `基础：${getLevelLabel(level, t)}`,
              `周期：${safeWeeks} 周`,
              `节奏：${getPaceLabel(pace, t)}`,
            ],
    weeklyPlan,
    projectIdeas:
      locale === "en"
        ? [
            "Build a small personal dashboard.",
            "Create a notes or task management app.",
            "Deploy one complete project and write a postmortem.",
          ]
        : locale === "zh-TW"
          ? [
              "做一個個人儀表板小專案。",
              "做一個筆記或任務管理工具。",
              "部署一個完整專案並寫複盤。",
            ]
          : [
              "做一个个人仪表板小项目。",
              "做一个笔记或任务管理工具。",
              "部署一个完整项目并写复盘。",
            ],
    checkpoints:
      locale === "en"
        ? [
            "Can you explain the core concepts in your own words?",
            "Can you build a small feature without copying line by line?",
            "Can you debug common errors independently?",
            "Can you document the learning result clearly?",
          ]
        : locale === "zh-TW"
          ? [
              "是否能用自己的話講清核心概念？",
              "是否能不逐行照抄完成小功能？",
              "是否能獨立排查常見錯誤？",
              "是否能清楚記錄學習成果？",
            ]
          : [
              "是否能用自己的话讲清核心概念？",
              "是否能不逐行照抄完成小功能？",
              "是否能独立排查常见错误？",
              "是否能清楚记录学习成果？",
            ],
    resources:
      locale === "en"
        ? [
            "Official documentation first.",
            "One structured course or book.",
            "Small projects and review notes.",
            "Use issues and changelogs to learn real-world tradeoffs.",
          ]
        : locale === "zh-TW"
          ? [
              "優先看官方文件。",
              "選一本系統課程或書。",
              "用小專案和複盤筆記鞏固。",
              "透過 issue 和 changelog 了解真實工程取捨。",
            ]
          : [
              "优先看官方文档。",
              "选一本系统课程或书。",
              "用小项目和复盘笔记巩固。",
              "通过 issue 和 changelog 了解真实工程取舍。",
            ],
  };
}

function pathToText(path: PathResult, t: TechPathText) {
  return [
    `${t.overview}:`,
    ...path.overview.map((item) => `- ${item}`),
    "",
    `${t.weeklyPlan}:`,
    ...path.weeklyPlan.flatMap((item) => [
      `${t.week} ${item.week}`,
      `${t.focus}: ${item.focus}`,
      `${t.tasks}:`,
      ...item.tasks.map((task) => `- ${task}`),
      `${t.output}: ${item.output}`,
      "",
    ]),
    `${t.projectIdeas}:`,
    ...path.projectIdeas.map((item) => `- ${item}`),
    "",
    `${t.checkpoints}:`,
    ...path.checkpoints.map((item) => `- ${item}`),
    "",
    `${t.resources}:`,
    ...path.resources.map((item) => `- ${item}`),
  ].join("\n");
}

export default function TechLearningPathPage() {
  const params = useParams();

  const locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const [userReady, setUserReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [track, setTrack] = useState<Track>("frontend");
  const [level, setLevel] = useState<Level>("beginner");
  const [weeks, setWeeks] = useState(12);
  const [pace, setPace] = useState<Pace>("normal");
  const [goal, setGoal] = useState(
    locale === "en" ? "Learn frontend development in 3 months" : "3 个月入门前端开发"
  );
  const [result, setResult] = useState<PathResult | null>(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const nextPath = `/${locale}/tool/tech-learning-path`;
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

  const trackOptions = [
    { value: "frontend" as Track, label: t.frontend },
    { value: "backend" as Track, label: t.backend },
    { value: "fullstack" as Track, label: t.fullstack },
    { value: "ai" as Track, label: t.ai },
    { value: "network" as Track, label: t.network },
    { value: "system" as Track, label: t.system },
    { value: "devops" as Track, label: t.devops },
  ];

  const levelOptions = [
    { value: "beginner" as Level, label: t.beginner },
    { value: "intermediate" as Level, label: t.intermediate },
    { value: "advanced" as Level, label: t.advanced },
  ];

  const paceOptions = [
    { value: "light" as Pace, label: t.light },
    { value: "normal" as Pace, label: t.normal },
    { value: "intense" as Pace, label: t.intense },
  ];

  const handleGenerate = () => {
    const cleanGoal = goal.trim();

    if (!cleanGoal) {
      setMessage(t.noGoal);
      setResult(null);
      return;
    }

    const next = generatePath({
      track,
      level,
      weeks,
      pace,
      goal: cleanGoal,
      locale,
      t,
    });

    setResult(next);
    setMessage("");
    setCopied(false);
  };

  const handleLoadSample = () => {
    if (locale === "en") {
      setGoal("Learn frontend development in 3 months");
    } else if (locale === "zh-TW") {
      setGoal("3 個月入門前端開發");
    } else {
      setGoal("3 个月入门前端开发");
    }

    setTrack("frontend");
    setLevel("beginner");
    setWeeks(12);
    setPace("normal");
    setMessage("");
    setCopied(false);
  };

  const handleClear = () => {
    setGoal("");
    setResult(null);
    setMessage("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(pathToText(result, t));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (!loggedIn) return;

    handleGenerate();
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
            <div
              className="card liquidGlassCard"
              style={{ textAlign: "center" }}
            >
              {loginHref}
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
                {t.goal}
                <input
                  value={goal}
                  onChange={(event) => setGoal(event.target.value)}
                  placeholder={t.goalPlaceholder}
                  className="contact-input"
                />
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.track}
                <select
                  value={track}
                  onChange={(event) => setTrack(event.target.value as Track)}
                  className="contact-input"
                >
                  {trackOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.level}
                <select
                  value={level}
                  onChange={(event) => setLevel(event.target.value as Level)}
                  className="contact-input"
                >
                  {levelOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.weeks}
                <input
                  type="number"
                  min={1}
                  max={52}
                  value={weeks}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setWeeks(Number.isFinite(next) ? next : 12);
                  }}
                  className="contact-input"
                />
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.pace}
                <select
                  value={pace}
                  onChange={(event) => setPace(event.target.value as Pace)}
                  className="contact-input"
                >
                  {paceOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
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
                onClick={handleGenerate}
              >
                {t.generate}
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

              <button
                type="button"
                className="liquidGlassPillMuted"
                onClick={handlePrint}
                disabled={!result}
              >
                {t.print}
              </button>
            </div>
          </div>
        </section>

        <section className="subpage-section tech-path-print-area">
          <h2>{t.result}</h2>

          {result && (
            <>
              <div className="card-grid">
                <div className="card liquidGlassCard">
                  <h3>{t.overview}</h3>
                  <ul>
                    {result.overview.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="card liquidGlassCard">
                  <h3>{t.projectIdeas}</h3>
                  <ul>
                    {result.projectIdeas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="card liquidGlassCard">
                  <h3>{t.checkpoints}</h3>
                  <ul>
                    {result.checkpoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="card liquidGlassCard">
                  <h3>{t.resources}</h3>
                  <ul>
                    {result.resources.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h2 style={{ marginTop: 28 }}>{t.weeklyPlan}</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 16,
                }}
              >
                {result.weeklyPlan.map((item) => (
                  <article
                    key={item.week}
                    className="card liquidGlassCard"
                    style={{ display: "grid", gap: 10 }}
                  >
                    <h3>
                      {t.week} {item.week}
                    </h3>

                    <p>
                      <strong>{t.focus}: </strong>
                      {item.focus}
                    </p>

                    <div>
                      <strong>{t.tasks}: </strong>
                      <ul style={{ marginTop: 8 }}>
                        {item.tasks.map((task) => (
                          <li key={task}>{task}</li>
                        ))}
                      </ul>
                    </div>

                    <p>
                      <strong>{t.output}: </strong>
                      {item.output}
                    </p>
                  </article>
                ))}
              </div>
            </>
          )}
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

            .tech-path-print-area .card {
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