"use client";

import { useEffect, useMemo, useState } from "react";
import type { AiToolId } from "@/lib/ai-tools/types";

type Locale = "zh" | "zh-TW" | "en";

type HistoryItem = {
  id: string;
  tool_id: string;
  input: string;
  output: string;
  credits_used: number;
  tokens_used: number;
  status: string;
  created_at: string;
};

type ToolCopy = {
  title: string;
  desc: string;
  placeholder: string;
};

const TOOL_COPY: Record<AiToolId, Record<Locale, ToolCopy>> = {
  ai: {
    zh: { title: "AI 工具", desc: "登录后使用 AI 生成、分析、改写和结构化输出。", placeholder: "输入你的任务，例如：帮我写一个产品发布计划。" },
    "zh-TW": { title: "AI 工具", desc: "登入後使用 AI 生成、分析、改寫和結構化輸出。", placeholder: "輸入你的任務，例如：幫我寫一個產品發布計畫。" },
    en: { title: "AI Tools", desc: "Use AI generation, analysis, rewriting, and structured output after login.", placeholder: "Enter your task, e.g. write a product launch plan." },
  },
  "agent-workflow": {
    zh: { title: "Agent 工作流", desc: "把复杂目标拆解为 Agent 步骤、工具调用、检查点和失败回退。", placeholder: "目标：整理市场调研报告\n资料：竞品网页、用户反馈、销售数据" },
    "zh-TW": { title: "Agent 工作流", desc: "把複雜目標拆解為 Agent 步驟、工具調用、檢查點和失敗回退。", placeholder: "目標：整理市場調研報告\n資料：競品網頁、用戶反饋、銷售數據" },
    en: { title: "Agent Workflow", desc: "Break complex goals into agent steps, tool calls, checkpoints, and fallbacks.", placeholder: "Goal: create a market research report\nInputs: competitor pages, user feedback, sales data" },
  },
  "knowledge-organizer": {
    zh: { title: "知识整理", desc: "把笔记、资料、文章整理成知识结构、摘要、标签和复习卡片。", placeholder: "粘贴笔记、资料、网页内容或学习材料。" },
    "zh-TW": { title: "知識整理", desc: "把筆記、資料、文章整理成知識結構、摘要、標籤和複習卡片。", placeholder: "貼上筆記、資料、網頁內容或學習材料。" },
    en: { title: "Knowledge Organizer", desc: "Organize notes and materials into structure, summaries, tags, and review cards.", placeholder: "Paste notes, materials, page content, or study materials." },
  },
  document: {
    zh: { title: "文档工具", desc: "提炼摘要、标题、行动项、风险点和结构。", placeholder: "粘贴文档内容。" },
    "zh-TW": { title: "文檔工具", desc: "提煉摘要、標題、行動項、風險點和結構。", placeholder: "貼上文檔內容。" },
    en: { title: "Document Tool", desc: "Extract summaries, headings, action items, risks, and structure.", placeholder: "Paste document content." },
  },
  "document-template": { zh: { title: "文书模板", desc: "生成正式文书、申请、声明、通知和计划。", placeholder: "模板类型：项目申请\n主题：AI 工具开发\n对象：合作伙伴" }, "zh-TW": { title: "文書模板", desc: "生成正式文書、申請、聲明、通知和計畫。", placeholder: "模板類型：項目申請\n主題：AI 工具開發\n對象：合作夥伴" }, en: { title: "Document Template", desc: "Generate formal documents, applications, statements, notices, and plans.", placeholder: "Template type: project proposal\nTopic: AI tools development\nAudience: partners" } },
  "email-template": { zh: { title: "邮件模板", desc: "生成商务、销售、合作和客服邮件。", placeholder: "目的：邀约产品演示\n对象：企业客户\n语气：专业简洁" }, "zh-TW": { title: "郵件模板", desc: "生成商務、銷售、合作和客服郵件。", placeholder: "目的：邀約產品演示\n對象：企業客戶\n語氣：專業簡潔" }, en: { title: "Email Template", desc: "Generate business, sales, partnership, and support emails.", placeholder: "Purpose: invite product demo\nAudience: enterprise client\nTone: professional and concise" } },
  "essay-outline": { zh: { title: "文章提纲", desc: "生成文章、论文、报告提纲和论点结构。", placeholder: "主题：AI 自动化如何提升企业效率\n长度：1500 字" }, "zh-TW": { title: "文章提綱", desc: "生成文章、論文、報告提綱和論點結構。", placeholder: "主題：AI 自動化如何提升企業效率\n長度：1500 字" }, en: { title: "Essay Outline", desc: "Generate essay, paper, report outlines, and argument structure.", placeholder: "Topic: how AI automation improves business efficiency\nLength: 1500 words" } },
  "meeting-notes": { zh: { title: "会议纪要", desc: "从会议记录生成摘要、结论、行动项、负责人和截止时间。", placeholder: "粘贴会议记录或录音转写文本。" }, "zh-TW": { title: "會議紀要", desc: "從會議記錄生成摘要、結論、行動項、負責人和截止時間。", placeholder: "貼上會議記錄或錄音轉寫文本。" }, en: { title: "Meeting Notes", desc: "Generate summaries, decisions, action items, owners, and deadlines.", placeholder: "Paste meeting notes or transcript." } },
  "okr-template": { zh: { title: "OKR 模板", desc: "生成目标、关键结果、行动计划和检查节奏。", placeholder: "目标：提升官网转化\n周期：Q3" }, "zh-TW": { title: "OKR 模板", desc: "生成目標、關鍵結果、行動計畫和檢查節奏。", placeholder: "目標：提升官網轉化\n週期：Q3" }, en: { title: "OKR Template", desc: "Generate objectives, key results, action plans, and review cadence.", placeholder: "Goal: improve website conversion\nPeriod: Q3" } },
  "prd-template": { zh: { title: "PRD 模板", desc: "生成产品需求文档、用户故事和验收标准。", placeholder: "产品：工具中心\n用户：访客\n目标：快速使用在线工具" }, "zh-TW": { title: "PRD 模板", desc: "生成產品需求文檔、用戶故事和驗收標準。", placeholder: "產品：工具中心\n用戶：訪客\n目標：快速使用線上工具" }, en: { title: "PRD Template", desc: "Generate PRDs, user stories, and acceptance criteria.", placeholder: "Product: tool center\nUsers: visitors\nGoal: use online tools quickly" } },
  "prompt-template": { zh: { title: "提示词模板", desc: "生成角色、任务、上下文、约束和输出格式明确的提示词。", placeholder: "任务：写商业计划\n角色：产品顾问\n输出：Markdown" }, "zh-TW": { title: "提示詞模板", desc: "生成角色、任務、上下文、約束和輸出格式明確的提示詞。", placeholder: "任務：寫商業計畫\n角色：產品顧問\n輸出：Markdown" }, en: { title: "Prompt Template", desc: "Generate prompts with role, task, context, constraints, and output format.", placeholder: "Task: write a business plan\nRole: product consultant\nOutput: Markdown" } },
  "resume-template": { zh: { title: "简历模板", desc: "生成简历结构、项目描述和技能总结。", placeholder: "职位：前端开发\n经验：3 年\n技能：React, Next.js" }, "zh-TW": { title: "履歷模板", desc: "生成履歷結構、項目描述和技能總結。", placeholder: "職位：前端開發\n經驗：3 年\n技能：React, Next.js" }, en: { title: "Resume Template", desc: "Generate resume structure, project descriptions, and skill summaries.", placeholder: "Role: frontend developer\nExperience: 3 years\nSkills: React, Next.js" } },
  "slide-outline": { zh: { title: "幻灯片提纲", desc: "生成逐页演示文稿结构、标题和讲述重点。", placeholder: "主题：AI 自动化平台介绍\n页数：10" }, "zh-TW": { title: "簡報提綱", desc: "生成逐頁簡報結構、標題和講述重點。", placeholder: "主題：AI 自動化平台介紹\n頁數：10" }, en: { title: "Slide Outline", desc: "Generate slide-by-slide structure, titles, and talking points.", placeholder: "Topic: AI automation platform intro\nSlides: 10" } },
  "study-planner": { zh: { title: "学习计划", desc: "生成阶段目标、每日任务、复习计划和检查清单。", placeholder: "目标：学习 TypeScript\n周期：21 天\n每天：1 小时" }, "zh-TW": { title: "學習計畫", desc: "生成階段目標、每日任務、複習計畫和檢查清單。", placeholder: "目標：學習 TypeScript\n週期：21 天\n每天：1 小時" }, en: { title: "Study Planner", desc: "Generate phase goals, daily tasks, review plan, and checklist.", placeholder: "Goal: learn TypeScript\nPeriod: 21 days\nDaily: 1 hour" } },
  "summary-outline": { zh: { title: "总结提纲", desc: "把长文本整理为摘要、重点、提纲和行动项。", placeholder: "粘贴需要总结的内容。" }, "zh-TW": { title: "總結提綱", desc: "把長文本整理為摘要、重點、提綱和行動項。", placeholder: "貼上需要總結的內容。" }, en: { title: "Summary Outline", desc: "Turn long text into summary, key points, outline, and action items.", placeholder: "Paste content to summarize." } },
  "tech-learning-path": { zh: { title: "技术学习路径", desc: "根据目标和基础生成技术学习路线。", placeholder: "方向：全栈开发\n基础：HTML/CSS/JS\n目标：独立开发 SaaS" }, "zh-TW": { title: "技術學習路徑", desc: "根據目標和基礎生成技術學習路線。", placeholder: "方向：全棧開發\n基礎：HTML/CSS/JS\n目標：獨立開發 SaaS" }, en: { title: "Tech Learning Path", desc: "Generate a technical learning path based on goals and current level.", placeholder: "Direction: full-stack\nLevel: HTML/CSS/JS\nGoal: build SaaS independently" } },
  developer: { zh: { title: "开发工具", desc: "生成 API 设计、TypeScript 类型、任务清单和边界情况。", placeholder: "功能：用户登录 API\n字段：email,password\n返回：token,user" }, "zh-TW": { title: "開發工具", desc: "生成 API 設計、TypeScript 類型、任務清單和邊界情況。", placeholder: "功能：用戶登入 API\n字段：email,password\n返回：token,user" }, en: { title: "Developer Tool", desc: "Generate API design, TypeScript types, tasks, and edge cases.", placeholder: "Feature: login API\nFields: email,password\nReturn: token,user" } },
  office: { zh: { title: "办公工具", desc: "生成周报、计划、流程、汇报和 SOP。", placeholder: "任务：生成周报\n内容：完成官网 Footer 链接修复" }, "zh-TW": { title: "辦公工具", desc: "生成週報、計畫、流程、匯報和 SOP。", placeholder: "任務：生成週報\n內容：完成官網 Footer 連結修復" }, en: { title: "Office Tool", desc: "Generate weekly reports, plans, workflows, briefings, and SOPs.", placeholder: "Task: weekly report\nContent: fixed website footer links" } },
  finance: { zh: { title: "金融工具", desc: "生成预算、风险提示、现金流和规划建议。", placeholder: "目标：一年存 30000\n收入：6000/月\n固定支出：3500/月" }, "zh-TW": { title: "金融工具", desc: "生成預算、風險提示、現金流和規劃建議。", placeholder: "目標：一年存 30000\n收入：6000/月\n固定支出：3500/月" }, en: { title: "Finance Tool", desc: "Generate budget, risk notes, cashflow, and planning suggestions.", placeholder: "Goal: save 30000 in one year\nIncome: 6000/month\nFixed cost: 3500/month" } },
  classics: { zh: { title: "经典文库", desc: "整理经典文本摘要、主题、关键词和学习问题。", placeholder: "输入作品名称或文本片段。" }, "zh-TW": { title: "經典文庫", desc: "整理經典文本摘要、主題、關鍵詞和學習問題。", placeholder: "輸入作品名稱或文本片段。" }, en: { title: "Classics", desc: "Organize classic text summaries, themes, keywords, and study questions.", placeholder: "Enter a classic text title or excerpt." } },
  poetry: { zh: { title: "诗词工具", desc: "整理诗词主题、意象、结构和赏析。", placeholder: "输入诗词文本或标题。" }, "zh-TW": { title: "詩詞工具", desc: "整理詩詞主題、意象、結構和賞析。", placeholder: "輸入詩詞文本或標題。" }, en: { title: "Poetry Tool", desc: "Analyze poem themes, imagery, structure, and commentary.", placeholder: "Enter poem text or title." } },
};

const UI = {
  zh: { run: "运行 AI", clear: "清空", copy: "复制结果", copied: "已复制", input: "输入", output: "AI 输出", history: "历史记录", login: "需要登录，请先登录。", quota: "额度不足", server: "服务器错误", back: "返回工具中心" },
  "zh-TW": { run: "運行 AI", clear: "清空", copy: "複製結果", copied: "已複製", input: "輸入", output: "AI 輸出", history: "歷史記錄", login: "需要登入，請先登入。", quota: "額度不足", server: "伺服器錯誤", back: "返回工具中心" },
  en: { run: "Run AI", clear: "Clear", copy: "Copy result", copied: "Copied", input: "Input", output: "AI Output", history: "History", login: "Login required. Please login first.", quota: "Quota exceeded", server: "Server error", back: "Back to Tools" },
};

export default function AiToolClient({ toolId, locale }: { toolId: AiToolId; locale: Locale }) {
  const copy = TOOL_COPY[toolId]?.[locale] || TOOL_COPY.ai[locale];
  const ui = UI[locale];
  const [input, setInput] = useState(copy.placeholder);
  const [output, setOutput] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState("");

  const backHref = locale === "en" ? "/tool" : `/${locale}/tool`;
  const loginHref = locale === "en" ? "/login" : `/${locale}/login`;

  async function loadHistory() {
    const res = await fetch(`/api/ai-tools/history?toolId=${toolId}`, { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    if (data.ok) setHistory(data.history || []);
  }

  useEffect(() => {
    loadHistory();
  }, [toolId]);

  async function runTool() {
    setBusy(true);
    setError("");
    setOutput("");

    const res = await fetch("/api/ai-tools/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolId, locale, input }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      const code = data?.error || "SERVER_ERROR";
      if (code === "LOGIN_REQUIRED") setError(ui.login);
      else if (code === "QUOTA_EXCEEDED") setError(ui.quota);
      else setError(ui.server);
      setBusy(false);
      return;
    }

    setOutput(data.result.output);
    await loadHistory();
    setBusy(false);
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <main className="aiToolRoot">
      <style>{`
        .aiToolRoot { min-height: 100vh; background: #e9ebef; color: #05070a; padding: 118px 24px 110px; overflow: hidden; }
        .aiToolShell { width: min(1180px, calc(100vw - 48px)); margin: 0 auto; }
        .aiToolHero { min-height: 310px; display: flex; flex-direction: column; justify-content: center; }
        .aiToolHero h1 { margin: 0; font-size: clamp(42px, 5vw, 76px); line-height: .96; letter-spacing: -.068em; font-weight: 950; }
        .aiToolHero p { margin: 18px 0 0; max-width: 930px; color: #5b6678; font-size: clamp(18px, 2vw, 28px); line-height: 1.38; font-weight: 720; letter-spacing: -.035em; text-wrap: balance; }
        .aiToolDivider { width: 100vw; height: 30px; margin-left: calc(50% - 50vw); background: #fff; }
        .aiToolGrid { margin-top: 58px; display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 24px; }
        .aiToolPanel, .aiHistoryPanel { border-radius: 34px; padding: 30px; background: #d8dee8; }
        .aiLabel { display: block; margin: 0 0 10px; color: #5b6678; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; font-weight: 950; }
        .aiTextarea { width: 100%; min-height: 220px; resize: vertical; border: 0; outline: none; border-radius: 24px; padding: 20px; background: rgba(255,255,255,.68); color: #111827; font-size: 15px; line-height: 1.62; font-weight: 650; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        .aiActions { display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0 24px; }
        .aiButton { min-height: 44px; border: 0; border-radius: 999px; padding: 0 20px; cursor: pointer; background: rgba(255,255,255,.58); color: #111827; font-size: 14px; font-weight: 900; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }
        .aiButtonPrimary { background: #05070a; color: #fff; }
        .aiOutput { white-space: pre-wrap; min-height: 250px; border-radius: 24px; padding: 20px; background: rgba(255,255,255,.68); color: #111827; font-size: 15px; line-height: 1.66; font-weight: 650; overflow-wrap: anywhere; }
        .aiError { margin: 0 0 16px; color: #b42318; font-size: 14px; font-weight: 850; }
        .historyTitle { margin: 0 0 18px; font-size: 24px; line-height: 1.1; letter-spacing: -.04em; font-weight: 950; }
        .historyList { display: grid; gap: 12px; }
        .historyItem { border: 0; border-radius: 22px; padding: 16px; text-align: left; background: rgba(255,255,255,.5); cursor: pointer; }
        .historyItem strong { display: block; color: #111827; font-size: 13px; line-height: 1.4; font-weight: 900; }
        .historyItem span { display: block; margin-top: 8px; color: #5b6678; font-size: 12px; font-weight: 650; }
        @media (max-width: 920px) { .aiToolGrid { grid-template-columns: 1fr; } }
        @media (max-width: 760px) { .aiToolRoot { padding: 92px 18px 90px; } .aiToolShell { width: calc(100vw - 36px); } .aiToolPanel, .aiHistoryPanel { border-radius: 28px; padding: 22px; } }
      `}</style>

      <div className="aiToolShell">
        <section className="aiToolHero">
          <h1>{copy.title}</h1>
          <p>{copy.desc}</p>
        </section>
        <div className="aiToolDivider" aria-hidden="true" />
        <section className="aiToolGrid">
          <div className="aiToolPanel">
            {error && <p className="aiError">{error} <a href={loginHref}>Login</a></p>}
            <label className="aiLabel">{ui.input}</label>
            <textarea className="aiTextarea" value={input} onChange={(event) => setInput(event.target.value)} />
            <div className="aiActions">
              <button className="aiButton aiButtonPrimary" type="button" onClick={runTool} disabled={busy}>{busy ? "..." : ui.run}</button>
              <button className="aiButton" type="button" onClick={() => { setInput(""); setOutput(""); }}>{ui.clear}</button>
              <button className="aiButton" type="button" disabled={!output} onClick={copyOutput}>{copied ? ui.copied : ui.copy}</button>
              <a className="aiButton" href={backHref}>{ui.back}</a>
            </div>
            <label className="aiLabel">{ui.output}</label>
            <div className="aiOutput">{output}</div>
          </div>

          <aside className="aiHistoryPanel">
            <h2 className="historyTitle">{ui.history}</h2>
            <div className="historyList">
              {history.map((item) => (
                <button className="historyItem" key={item.id} type="button" onClick={() => { setInput(item.input); setOutput(item.output); }}>
                  <strong>{item.input.slice(0, 80)}</strong>
                  <span>{new Date(item.created_at).toLocaleString()} · {item.credits_used} credits</span>
                </button>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
