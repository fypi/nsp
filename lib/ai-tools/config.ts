import type { AiToolId } from "./types";

export type AiToolConfig = {
  id: AiToolId;
  title: Record<"zh" | "zh-TW" | "en", string>;
  description: Record<"zh" | "zh-TW" | "en", string>;
  credits: number;
  maxInputChars: number;
  outputFormat: string;
};

export const AI_TOOLS: Record<AiToolId, AiToolConfig> = {
  "agent-workflow": {
    id: "agent-workflow",
    title: { zh: "Agent 工作流", "zh-TW": "Agent 工作流", en: "Agent Workflow" },
    description: { zh: "将复杂目标拆解为可执行 Agent 步骤、工具调用、检查点和失败回退。", "zh-TW": "將複雜目標拆解為可執行 Agent 步驟、工具調用、檢查點和失敗回退。", en: "Break complex goals into agent steps, tool calls, checkpoints, and fallbacks." },
    credits: 3,
    maxInputChars: 12000,
    outputFormat: "workflow",
  },
  ai: {
    id: "ai",
    title: { zh: "AI 工具", "zh-TW": "AI 工具", en: "AI Tools" },
    description: { zh: "通用 AI 生成、分析、改写和结构化输出。", "zh-TW": "通用 AI 生成、分析、改寫和結構化輸出。", en: "General AI generation, analysis, rewriting, and structured output." },
    credits: 2,
    maxInputChars: 12000,
    outputFormat: "markdown",
  },
  "knowledge-organizer": {
    id: "knowledge-organizer",
    title: { zh: "知识整理", "zh-TW": "知識整理", en: "Knowledge Organizer" },
    description: { zh: "把笔记、资料、文章整理成知识结构、摘要、标签、复习卡片。", "zh-TW": "把筆記、資料、文章整理成知識結構、摘要、標籤、複習卡片。", en: "Organize notes and materials into knowledge structure, summaries, tags, and review cards." },
    credits: 3,
    maxInputChars: 16000,
    outputFormat: "knowledge",
  },
  document: { id: "document", title: { zh: "文档工具", "zh-TW": "文檔工具", en: "Document Tool" }, description: { zh: "提炼摘要、标题、结构、行动项和风险点。", "zh-TW": "提煉摘要、標題、結構、行動項和風險點。", en: "Extract summaries, headings, structures, action items, and risks." }, credits: 2, maxInputChars: 16000, outputFormat: "document" },
  "document-template": { id: "document-template", title: { zh: "文书模板", "zh-TW": "文書模板", en: "Document Template" }, description: { zh: "生成正式文书、申请、声明、通知、计划。", "zh-TW": "生成正式文書、申請、聲明、通知、計畫。", en: "Generate formal documents, applications, statements, notices, and plans." }, credits: 2, maxInputChars: 8000, outputFormat: "template" },
  "email-template": { id: "email-template", title: { zh: "邮件模板", "zh-TW": "郵件模板", en: "Email Template" }, description: { zh: "生成商务、销售、合作、客服邮件。", "zh-TW": "生成商務、銷售、合作、客服郵件。", en: "Generate business, sales, partnership, and support emails." }, credits: 1, maxInputChars: 6000, outputFormat: "email" },
  "essay-outline": { id: "essay-outline", title: { zh: "文章提纲", "zh-TW": "文章提綱", en: "Essay Outline" }, description: { zh: "生成文章、论文、报告提纲和论点结构。", "zh-TW": "生成文章、論文、報告提綱和論點結構。", en: "Generate essay, paper, report outlines and argument structure." }, credits: 2, maxInputChars: 8000, outputFormat: "outline" },
  "meeting-notes": { id: "meeting-notes", title: { zh: "会议纪要", "zh-TW": "會議紀要", en: "Meeting Notes" }, description: { zh: "从会议记录生成摘要、结论、行动项、负责人和截止时间。", "zh-TW": "從會議記錄生成摘要、結論、行動項、負責人和截止時間。", en: "Generate summaries, decisions, action items, owners, and deadlines from meeting notes." }, credits: 2, maxInputChars: 16000, outputFormat: "meeting" },
  "okr-template": { id: "okr-template", title: { zh: "OKR 模板", "zh-TW": "OKR 模板", en: "OKR Template" }, description: { zh: "生成目标、关键结果、行动计划和检查节奏。", "zh-TW": "生成目標、關鍵結果、行動計畫和檢查節奏。", en: "Generate objectives, key results, action plans, and review cadence." }, credits: 1, maxInputChars: 6000, outputFormat: "okr" },
  "prd-template": { id: "prd-template", title: { zh: "PRD 模板", "zh-TW": "PRD 模板", en: "PRD Template" }, description: { zh: "生成产品需求文档、用户故事、验收标准。", "zh-TW": "生成產品需求文檔、用戶故事、驗收標準。", en: "Generate PRDs, user stories, and acceptance criteria." }, credits: 2, maxInputChars: 10000, outputFormat: "prd" },
  "prompt-template": { id: "prompt-template", title: { zh: "提示词模板", "zh-TW": "提示詞模板", en: "Prompt Template" }, description: { zh: "生成角色、任务、上下文、约束、输出格式明确的提示词。", "zh-TW": "生成角色、任務、上下文、約束、輸出格式明確的提示詞。", en: "Generate prompts with role, task, context, constraints, and output format." }, credits: 1, maxInputChars: 8000, outputFormat: "prompt" },
  "resume-template": { id: "resume-template", title: { zh: "简历模板", "zh-TW": "履歷模板", en: "Resume Template" }, description: { zh: "生成简历结构、项目描述、技能总结。", "zh-TW": "生成履歷結構、項目描述、技能總結。", en: "Generate resume structure, project descriptions, and skill summaries." }, credits: 2, maxInputChars: 10000, outputFormat: "resume" },
  "slide-outline": { id: "slide-outline", title: { zh: "幻灯片提纲", "zh-TW": "簡報提綱", en: "Slide Outline" }, description: { zh: "生成逐页演示文稿结构、标题和讲述重点。", "zh-TW": "生成逐頁簡報結構、標題和講述重點。", en: "Generate slide-by-slide structure, titles, and talking points." }, credits: 2, maxInputChars: 10000, outputFormat: "slides" },
  "study-planner": { id: "study-planner", title: { zh: "学习计划", "zh-TW": "學習計畫", en: "Study Planner" }, description: { zh: "生成阶段目标、每日任务、复习计划和检查清单。", "zh-TW": "生成階段目標、每日任務、複習計畫和檢查清單。", en: "Generate phase goals, daily tasks, review plan, and checklist." }, credits: 2, maxInputChars: 8000, outputFormat: "study" },
  "summary-outline": { id: "summary-outline", title: { zh: "总结提纲", "zh-TW": "總結提綱", en: "Summary Outline" }, description: { zh: "把长文本整理为摘要、重点、提纲和行动项。", "zh-TW": "把長文本整理為摘要、重點、提綱和行動項。", en: "Turn long text into summary, key points, outline, and action items." }, credits: 2, maxInputChars: 16000, outputFormat: "summary" },
  "tech-learning-path": { id: "tech-learning-path", title: { zh: "技术学习路径", "zh-TW": "技術學習路徑", en: "Tech Learning Path" }, description: { zh: "根据目标和基础生成技术学习路线。", "zh-TW": "根據目標和基礎生成技術學習路線。", en: "Generate a technical learning path based on goals and current level." }, credits: 2, maxInputChars: 8000, outputFormat: "path" },
  developer: { id: "developer", title: { zh: "开发工具", "zh-TW": "開發工具", en: "Developer Tool" }, description: { zh: "生成 API 设计、TypeScript 类型、任务清单和边界情况。", "zh-TW": "生成 API 設計、TypeScript 類型、任務清單和邊界情況。", en: "Generate API design, TypeScript types, tasks, and edge cases." }, credits: 2, maxInputChars: 10000, outputFormat: "developer" },
  office: { id: "office", title: { zh: "办公工具", "zh-TW": "辦公工具", en: "Office Tool" }, description: { zh: "生成周报、计划、流程、汇报和 SOP。", "zh-TW": "生成週報、計畫、流程、匯報和 SOP。", en: "Generate weekly reports, plans, workflows, briefings, and SOPs." }, credits: 2, maxInputChars: 10000, outputFormat: "office" },
  finance: { id: "finance", title: { zh: "金融工具", "zh-TW": "金融工具", en: "Finance Tool" }, description: { zh: "生成预算、风险提示、现金流和规划建议。", "zh-TW": "生成預算、風險提示、現金流和規劃建議。", en: "Generate budget, risk notes, cashflow, and planning suggestions." }, credits: 2, maxInputChars: 8000, outputFormat: "finance" },
  classics: { id: "classics", title: { zh: "经典文库", "zh-TW": "經典文庫", en: "Classics" }, description: { zh: "整理经典文本摘要、主题、关键词和学习问题。", "zh-TW": "整理經典文本摘要、主題、關鍵詞和學習問題。", en: "Organize classic text summaries, themes, keywords, and study questions." }, credits: 2, maxInputChars: 12000, outputFormat: "classics" },
  poetry: { id: "poetry", title: { zh: "诗词工具", "zh-TW": "詩詞工具", en: "Poetry Tool" }, description: { zh: "整理诗词主题、意象、结构和赏析。", "zh-TW": "整理詩詞主題、意象、結構和賞析。", en: "Analyze poem themes, imagery, structure, and commentary." }, credits: 2, maxInputChars: 10000, outputFormat: "poetry" },
};

export function getAiToolConfig(toolId: string) {
  return AI_TOOLS[toolId as AiToolId];
}

export function getAllAiTools() {
  return Object.values(AI_TOOLS);
}
