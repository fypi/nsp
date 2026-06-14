"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Locale = "en" | "zh" | "zh-TW";
type EssayType = "narrative" | "expository" | "argumentative" | "imaginative";
type EssayLevel = "lower" | "middle" | "upper" | "general";

type EssayText = {
  title: string;
  desc: string;
  checking: string;
  loginRequiredTitle: string;
  loginRequiredDesc: string;
  loginBtn: string;
  settings: string;
  topic: string;
  topicPlaceholder: string;
  essayType: string;
  level: string;
  wordCount: string;
  keywords: string;
  keywordsPlaceholder: string;
  generate: string;
  sample: string;
  clear: string;
  copy: string;
  copied: string;
  result: string;
  titleIdeas: string;
  centralIdea: string;
  structure: string;
  paragraphPlan: string;
  materialIdeas: string;
  sentenceBank: string;
  checklist: string;
  narrative: string;
  expository: string;
  argumentative: string;
  imaginative: string;
  lower: string;
  middle: string;
  upper: string;
  general: string;
  noTopic: string;
  tip: string;
};

type OutlineResult = {
  titleIdeas: string[];
  centralIdea: string;
  structure: string[];
  paragraphPlan: string[];
  materialIdeas: string[];
  sentenceBank: string[];
  checklist: string[];
};

function normalizeLocale(rawLocale: unknown): Locale {
  if (rawLocale === "en") return "en";
  if (rawLocale === "zh-TW" || rawLocale === "zh-tw") return "zh-TW";
  return "zh";
}

const texts: Record<Locale, EssayText> = {
  zh: {
    title: "作文提纲生成器",
    desc: "根据主题、类型和年级生成作文结构、素材提示和段落提纲。",
    checking: "正在检查登录状态...",
    loginRequiredTitle: "这个工具需要登录",
    loginRequiredDesc: "作文提纲生成器属于注册后可用工具。登录后可继续使用。",
    loginBtn: "去登录",
    settings: "生成设置",
    topic: "作文主题",
    topicPlaceholder: "例如：难忘的一天、我的家乡、如果我有一支神笔...",
    essayType: "作文类型",
    level: "学习阶段",
    wordCount: "目标字数",
    keywords: "关键词",
    keywordsPlaceholder: "可选，例如：校园、成长、坚持、观察、想象",
    generate: "生成提纲",
    sample: "加载示例",
    clear: "清空",
    copy: "复制提纲",
    copied: "已复制",
    result: "生成结果",
    titleIdeas: "题目参考",
    centralIdea: "中心思想",
    structure: "整体结构",
    paragraphPlan: "段落安排",
    materialIdeas: "素材提示",
    sentenceBank: "句式参考",
    checklist: "写作检查清单",
    narrative: "记叙文",
    expository: "说明文",
    argumentative: "议论文",
    imaginative: "想象作文",
    lower: "小学低年级",
    middle: "小学中年级",
    upper: "小学高年级",
    general: "通用",
    noTopic: "请输入作文主题。",
    tip: "提示：本工具只生成写作提纲和练习材料，不采集儿童个人信息。生成内容仅供学习参考，建议家长或老师结合实际情况调整。",
  },
  "zh-TW": {
    title: "作文提綱生成器",
    desc: "根據主題、類型和年級生成作文結構、素材提示和段落提綱。",
    checking: "正在檢查登入狀態...",
    loginRequiredTitle: "這個工具需要登入",
    loginRequiredDesc: "作文提綱生成器屬於註冊後可用工具。登入後可繼續使用。",
    loginBtn: "去登入",
    settings: "生成設定",
    topic: "作文主題",
    topicPlaceholder: "例如：難忘的一天、我的家鄉、如果我有一支神筆...",
    essayType: "作文類型",
    level: "學習階段",
    wordCount: "目標字數",
    keywords: "關鍵詞",
    keywordsPlaceholder: "可選，例如：校園、成長、堅持、觀察、想像",
    generate: "生成提綱",
    sample: "載入示例",
    clear: "清空",
    copy: "複製提綱",
    copied: "已複製",
    result: "生成結果",
    titleIdeas: "題目參考",
    centralIdea: "中心思想",
    structure: "整體結構",
    paragraphPlan: "段落安排",
    materialIdeas: "素材提示",
    sentenceBank: "句式參考",
    checklist: "寫作檢查清單",
    narrative: "記敘文",
    expository: "說明文",
    argumentative: "議論文",
    imaginative: "想像作文",
    lower: "小學低年級",
    middle: "小學中年級",
    upper: "小學高年級",
    general: "通用",
    noTopic: "請輸入作文主題。",
    tip: "提示：本工具只生成寫作提綱和練習材料，不採集兒童個人資訊。生成內容僅供學習參考，建議家長或老師結合實際情況調整。",
  },
  en: {
    title: "Essay Outline",
    desc: "Generate essay structure, material prompts, and paragraph outlines by topic, type, and level.",
    checking: "Checking login status...",
    loginRequiredTitle: "This tool requires login",
    loginRequiredDesc: "Essay Outline is available after registration. Log in to continue.",
    loginBtn: "Go to Login",
    settings: "Settings",
    topic: "Essay topic",
    topicPlaceholder: "Example: An unforgettable day, My hometown, If I had a magic pen...",
    essayType: "Essay type",
    level: "Learning level",
    wordCount: "Target word count",
    keywords: "Keywords",
    keywordsPlaceholder: "Optional, e.g. school, growth, persistence, observation, imagination",
    generate: "Generate Outline",
    sample: "Load Sample",
    clear: "Clear",
    copy: "Copy Outline",
    copied: "Copied",
    result: "Result",
    titleIdeas: "Title ideas",
    centralIdea: "Central idea",
    structure: "Overall structure",
    paragraphPlan: "Paragraph plan",
    materialIdeas: "Material ideas",
    sentenceBank: "Sentence bank",
    checklist: "Writing checklist",
    narrative: "Narrative",
    expository: "Expository",
    argumentative: "Argumentative",
    imaginative: "Imaginative",
    lower: "Lower primary",
    middle: "Middle primary",
    upper: "Upper primary",
    general: "General",
    noTopic: "Please enter an essay topic.",
    tip: "Note: this tool only generates writing outlines and practice materials and does not collect children's personal information. The generated content is for learning reference only.",
  },
};

function splitKeywords(value: string) {
  return value
    .split(/[，,、\s]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getTypeName(type: EssayType, t: EssayText) {
  if (type === "narrative") return t.narrative;
  if (type === "expository") return t.expository;
  if (type === "argumentative") return t.argumentative;
  return t.imaginative;
}

function getLevelName(level: EssayLevel, t: EssayText) {
  if (level === "lower") return t.lower;
  if (level === "middle") return t.middle;
  if (level === "upper") return t.upper;
  return t.general;
}

function generateChineseOutline(
  topic: string,
  essayType: EssayType,
  level: EssayLevel,
  wordCount: number,
  keywords: string[],
  traditional: boolean
): OutlineResult {
  const typeName = traditional
    ? essayType === "narrative"
      ? "記敘文"
      : essayType === "expository"
        ? "說明文"
        : essayType === "argumentative"
          ? "議論文"
          : "想像作文"
    : essayType === "narrative"
      ? "记叙文"
      : essayType === "expository"
        ? "说明文"
        : essayType === "argumentative"
          ? "议论文"
          : "想象作文";

  const keyText = keywords.length
    ? keywords.join("、")
    : traditional
      ? "觀察、細節、感受"
      : "观察、细节、感受";

  if (essayType === "expository") {
    return {
      titleIdeas: [
        `《${topic}》`,
        traditional ? `《走近${topic}》` : `《走近${topic}》`,
        traditional ? `《我眼中的${topic}》` : `《我眼中的${topic}》`,
      ],
      centralIdea: traditional
        ? `圍繞「${topic}」介紹主要特點、用途和觀察所得，讓讀者清楚了解它。`
        : `围绕“${topic}”介绍主要特点、用途和观察所得，让读者清楚了解它。`,
      structure: traditional
        ? ["開頭：點明說明對象。", "中間：按特點、用途、例子分層介紹。", "結尾：總結印象或提出建議。"]
        : ["开头：点明说明对象。", "中间：按特点、用途、例子分层介绍。", "结尾：总结印象或提出建议。"],
      paragraphPlan: traditional
        ? [
            `第 1 段：介紹${topic}是什麼，為什麼值得寫。`,
            `第 2 段：寫${topic}的外觀、構成或基本特點。`,
            `第 3 段：寫${topic}的用途、作用或和生活的關係。`,
            `第 4 段：加入具體例子，讓說明更清楚。`,
            `第 5 段：總結全文，表達自己的認識。`,
          ]
        : [
            `第 1 段：介绍${topic}是什么，为什么值得写。`,
            `第 2 段：写${topic}的外观、构成或基本特点。`,
            `第 3 段：写${topic}的用途、作用或和生活的关系。`,
            `第 4 段：加入具体例子，让说明更清楚。`,
            `第 5 段：总结全文，表达自己的认识。`,
          ],
      materialIdeas: traditional
        ? [`可加入關鍵詞：${keyText}。`, "使用數字、對比或例子增加可信度。", "可以從身邊生活場景中選材料。"]
        : [`可加入关键词：${keyText}。`, "使用数字、对比或例子增加可信度。", "可以从身边生活场景中选材料。"],
      sentenceBank: traditional
        ? ["首先，我們可以從……看出它的特點。", "和……相比，它更……", "通過這些例子，我明白了……"]
        : ["首先，我们可以从……看出它的特点。", "和……相比，它更……", "通过这些例子，我明白了……"],
      checklist: traditional
        ? [`目標字數：約 ${wordCount} 字。`, "說明順序是否清楚？", "有沒有具體例子？", "結尾是否總結到位？"]
        : [`目标字数：约 ${wordCount} 字。`, "说明顺序是否清楚？", "有没有具体例子？", "结尾是否总结到位？"],
    };
  }

  if (essayType === "argumentative") {
    return {
      titleIdeas: [
        traditional ? `《我對${topic}的看法》` : `《我对${topic}的看法》`,
        `《${topic}帶給我的思考》`,
        traditional ? `《關於${topic}》` : `《关于${topic}》`,
      ],
      centralIdea: traditional
        ? `圍繞「${topic}」提出觀點，用理由和例子證明觀點，最後總結自己的思考。`
        : `围绕“${topic}”提出观点，用理由和例子证明观点，最后总结自己的思考。`,
      structure: traditional
        ? ["開頭：提出觀點。", "中間：用 2 到 3 個理由展開。", "結尾：總結觀點並升華。"]
        : ["开头：提出观点。", "中间：用 2 到 3 个理由展开。", "结尾：总结观点并升华。"],
      paragraphPlan: traditional
        ? [
            `第 1 段：直接提出關於${topic}的觀點。`,
            "第 2 段：寫第一個理由，配一個生活例子。",
            "第 3 段：寫第二個理由，加入對比或反面例子。",
            "第 4 段：補充第三個理由或寫自己的經歷。",
            "第 5 段：再次點題，總結收穫。",
          ]
        : [
            `第 1 段：直接提出关于${topic}的观点。`,
            "第 2 段：写第一个理由，配一个生活例子。",
            "第 3 段：写第二个理由，加入对比或反面例子。",
            "第 4 段：补充第三个理由或写自己的经历。",
            "第 5 段：再次点题，总结收获。",
          ],
      materialIdeas: traditional
        ? [`可使用關鍵詞：${keyText}。`, "可以引用校園、家庭或閱讀中的例子。", "每個理由後面最好有具體事例。"]
        : [`可使用关键词：${keyText}。`, "可以引用校园、家庭或阅读中的例子。", "每个理由后面最好有具体事例。"],
      sentenceBank: traditional
        ? ["我認為……，因為……", "一個明顯的例子是……", "所以，我們應該……"]
        : ["我认为……，因为……", "一个明显的例子是……", "所以，我们应该……"],
      checklist: traditional
        ? [`目標字數：約 ${wordCount} 字。`, "觀點是否明確？", "理由是否充分？", "例子是否具體？"]
        : [`目标字数：约 ${wordCount} 字。`, "观点是否明确？", "理由是否充分？", "例子是否具体？"],
    };
  }

  if (essayType === "imaginative") {
    return {
      titleIdeas: [
        traditional ? `《如果${topic}》` : `《如果${topic}》`,
        traditional ? `《奇妙的${topic}》` : `《奇妙的${topic}》`,
        traditional ? `《${topic}的一天》` : `《${topic}的一天》`,
      ],
      centralIdea: traditional
        ? `圍繞「${topic}」展開合理想像，寫出奇妙經歷、具體情節和收穫。`
        : `围绕“${topic}”展开合理想象，写出奇妙经历、具体情节和收获。`,
      structure: traditional
        ? ["開頭：設定奇妙情境。", "中間：安排一次完整經歷。", "結尾：回到現實或寫出感悟。"]
        : ["开头：设定奇妙情境。", "中间：安排一次完整经历。", "结尾：回到现实或写出感悟。"],
      paragraphPlan: traditional
        ? [
            `第 1 段：寫自己如何遇到或進入${topic}的情境。`,
            "第 2 段：描寫看到的奇妙畫面。",
            "第 3 段：安排一個小困難或小任務。",
            "第 4 段：寫自己如何解決問題。",
            "第 5 段：寫結尾和感受。",
          ]
        : [
            `第 1 段：写自己如何遇到或进入${topic}的情境。`,
            "第 2 段：描写看到的奇妙画面。",
            "第 3 段：安排一个小困难或小任务。",
            "第 4 段：写自己如何解决问题。",
            "第 5 段：写结尾和感受。",
          ],
      materialIdeas: traditional
        ? [`可加入關鍵詞：${keyText}。`, "加入顏色、聲音、動作，讓畫面更鮮活。", "想像要有起因、經過和結果。"]
        : [`可加入关键词：${keyText}。`, "加入颜色、声音、动作，让画面更鲜活。", "想象要有起因、经过和结果。"],
      sentenceBank: traditional
        ? ["忽然，我發現……", "眼前的景象讓我看到了……", "這次奇妙的經歷讓我明白……"]
        : ["忽然，我发现……", "眼前的景象让我看到了……", "这次奇妙的经历让我明白……"],
      checklist: traditional
        ? [`目標字數：約 ${wordCount} 字。`, "想像是否合理？", "情節是否完整？", "畫面描寫是否具體？"]
        : [`目标字数：约 ${wordCount} 字。`, "想象是否合理？", "情节是否完整？", "画面描写是否具体？"],
    };
  }

  return {
    titleIdeas: [
      `《${topic}》`,
      traditional ? `《難忘的${topic}》` : `《难忘的${topic}》`,
      traditional ? `《${topic}給我的啟發》` : `《${topic}给我的启发》`,
    ],
    centralIdea: traditional
      ? `圍繞「${topic}」寫清楚事情的起因、經過和結果，突出人物、細節和真實感受。`
      : `围绕“${topic}”写清楚事情的起因、经过和结果，突出人物、细节和真实感受。`,
    structure: traditional
      ? ["開頭：交代時間、地點、人物。", "中間：寫事情經過，突出細節。", "結尾：寫感受或收穫。"]
      : ["开头：交代时间、地点、人物。", "中间：写事情经过，突出细节。", "结尾：写感受或收获。"],
    paragraphPlan: traditional
      ? [
          `第 1 段：用一句話引出${topic}。`,
          "第 2 段：交代事情發生的背景。",
          "第 3 段：詳細寫最重要的一幕。",
          "第 4 段：寫人物動作、語言或心理。",
          "第 5 段：總結自己的感受。",
        ]
      : [
          `第 1 段：用一句话引出${topic}。`,
          "第 2 段：交代事情发生的背景。",
          "第 3 段：详细写最重要的一幕。",
          "第 4 段：写人物动作、语言或心理。",
          "第 5 段：总结自己的感受。",
        ],
    materialIdeas: traditional
      ? [`可加入關鍵詞：${keyText}。`, "選一件具體小事，不要只寫大道理。", "多寫看到、聽到、想到和做到的細節。"]
      : [`可加入关键词：${keyText}。`, "选一件具体小事，不要只写大道理。", "多写看到、听到、想到和做到的细节。"],
    sentenceBank: traditional
      ? ["那一刻，我看到……", "我心裡想……", "這件事讓我明白了……"]
      : ["那一刻，我看到……", "我心里想……", "这件事让我明白了……"],
    checklist: traditional
      ? [`目標字數：約 ${wordCount} 字。`, "事情是否完整？", "細節是否具體？", "感受是否真實？"]
      : [`目标字数：约 ${wordCount} 字。`, "事情是否完整？", "细节是否具体？", "感受是否真实？"],
  };
}

function generateEnglishOutline(
  topic: string,
  essayType: EssayType,
  level: EssayLevel,
  wordCount: number,
  keywords: string[]
): OutlineResult {
  const keyText = keywords.length ? keywords.join(", ") : "details, examples, reflection";

  return {
    titleIdeas: [
      topic,
      `My Thoughts on ${topic}`,
      `What ${topic} Taught Me`,
    ],
    centralIdea: `Write about "${topic}" with a clear main idea, specific details, and a short reflection.`,
    structure: [
      "Opening: introduce the topic and main idea.",
      "Body: develop the topic with details, examples, or a short story.",
      "Ending: summarize the idea and explain what was learned.",
    ],
    paragraphPlan: [
      `Paragraph 1: Introduce "${topic}" and why it matters.`,
      "Paragraph 2: Add background or the first important detail.",
      "Paragraph 3: Describe the most important example or moment.",
      "Paragraph 4: Add feelings, thoughts, or another supporting point.",
      "Paragraph 5: End with a clear reflection.",
    ],
    materialIdeas: [
      `Keywords to include: ${keyText}.`,
      "Use one specific example instead of many vague ideas.",
      "Add what you saw, heard, thought, or learned.",
    ],
    sentenceBank: [
      "One thing I noticed was...",
      "This example shows that...",
      "From this experience, I learned...",
    ],
    checklist: [
      `Target length: about ${wordCount} words.`,
      "Is the main idea clear?",
      "Are the examples specific?",
      "Does the ending connect back to the topic?",
      `Level: ${level}. Type: ${essayType}.`,
    ],
  };
}

function outlineToText(result: OutlineResult, t: EssayText) {
  return [
    `${t.titleIdeas}:`,
    ...result.titleIdeas.map((item, index) => `${index + 1}. ${item}`),
    "",
    `${t.centralIdea}:`,
    result.centralIdea,
    "",
    `${t.structure}:`,
    ...result.structure.map((item, index) => `${index + 1}. ${item}`),
    "",
    `${t.paragraphPlan}:`,
    ...result.paragraphPlan.map((item, index) => `${index + 1}. ${item}`),
    "",
    `${t.materialIdeas}:`,
    ...result.materialIdeas.map((item, index) => `${index + 1}. ${item}`),
    "",
    `${t.sentenceBank}:`,
    ...result.sentenceBank.map((item, index) => `${index + 1}. ${item}`),
    "",
    `${t.checklist}:`,
    ...result.checklist.map((item, index) => `${index + 1}. ${item}`),
  ].join("\n");
}

export default function EssayOutlinePage() {
  const params = useParams();

  const locale = useMemo(() => {
    return normalizeLocale(params?.locale);
  }, [params]);

  const t = texts[locale];

  const [userReady, setUserReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [topic, setTopic] = useState(locale === "en" ? "An unforgettable day" : "难忘的一天");
  const [essayType, setEssayType] = useState<EssayType>("narrative");
  const [level, setLevel] = useState<EssayLevel>("middle");
  const [wordCount, setWordCount] = useState(500);
  const [keywords, setKeywords] = useState(locale === "en" ? "school, growth, persistence" : "校园、成长、坚持");
  const [result, setResult] = useState<OutlineResult | null>(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const nextPath = `/${locale}/tool/essay-outline`;

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

  const essayTypeOptions = [
    { value: "narrative" as EssayType, label: t.narrative },
    { value: "expository" as EssayType, label: t.expository },
    { value: "argumentative" as EssayType, label: t.argumentative },
    { value: "imaginative" as EssayType, label: t.imaginative },
  ];

  const levelOptions = [
    { value: "lower" as EssayLevel, label: t.lower },
    { value: "middle" as EssayLevel, label: t.middle },
    { value: "upper" as EssayLevel, label: t.upper },
    { value: "general" as EssayLevel, label: t.general },
  ];

  const handleGenerate = () => {
    const cleanTopic = topic.trim();

    if (!cleanTopic) {
      setMessage(t.noTopic);
      setResult(null);
      return;
    }

    const cleanKeywords = splitKeywords(keywords);
    const safeWordCount = Math.max(100, Math.min(wordCount, 3000));

    const next =
      locale === "en"
        ? generateEnglishOutline(cleanTopic, essayType, level, safeWordCount, cleanKeywords)
        : generateChineseOutline(
            cleanTopic,
            essayType,
            level,
            safeWordCount,
            cleanKeywords,
            locale === "zh-TW"
          );

    setResult(next);
    setMessage("");
    setCopied(false);
  };

  const handleLoadSample = () => {
    if (locale === "en") {
      setTopic("An unforgettable day");
      setKeywords("school, growth, persistence");
      setWordCount(500);
    } else if (locale === "zh-TW") {
      setTopic("難忘的一天");
      setKeywords("校園、成長、堅持");
      setWordCount(500);
    } else {
      setTopic("难忘的一天");
      setKeywords("校园、成长、坚持");
      setWordCount(500);
    }

    setEssayType("narrative");
    setLevel("middle");
    setMessage("");
    setCopied(false);
  };

  const handleClear = () => {
    setTopic("");
    setKeywords("");
    setResult(null);
    setMessage("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(outlineToText(result, t));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
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
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: 14,
              }}
            >
              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.topic}
                <input
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder={t.topicPlaceholder}
                  className="contact-input"
                />
              </label>

              <label style={{ display: "grid", gap: 8, fontSize: 13 }}>
                {t.essayType}
                <select
                  value={essayType}
                  onChange={(event) => setEssayType(event.target.value as EssayType)}
                  className="contact-input"
                >
                  {essayTypeOptions.map((item) => (
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
                  onChange={(event) => setLevel(event.target.value as EssayLevel)}
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
                {t.wordCount}
                <input
                  type="number"
                  min={100}
                  max={3000}
                  value={wordCount}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setWordCount(Number.isFinite(next) ? next : 500);
                  }}
                  className="contact-input"
                />
              </label>
            </div>

            <label
              style={{
                display: "grid",
                gap: 8,
                fontSize: 13,
                marginTop: 14,
              }}
            >
              {t.keywords}
              <input
                value={keywords}
                onChange={(event) => setKeywords(event.target.value)}
                placeholder={t.keywordsPlaceholder}
                className="contact-input"
              />
            </label>

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
            </div>
          </div>
        </section>

        <section className="subpage-section">
          <h2>{t.result}</h2>

          {result && (
            <div className="card-grid">
              <div className="card liquidGlassCard">
                <h3>{t.titleIdeas}</h3>
                <ul>
                  {result.titleIdeas.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="card liquidGlassCard">
                <h3>{t.centralIdea}</h3>
                <p>{result.centralIdea}</p>
              </div>

              <div className="card liquidGlassCard">
                <h3>{t.structure}</h3>
                <ol>
                  {result.structure.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>

              <div className="card liquidGlassCard">
                <h3>{t.paragraphPlan}</h3>
                <ol>
                  {result.paragraphPlan.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>

              <div className="card liquidGlassCard">
                <h3>{t.materialIdeas}</h3>
                <ul>
                  {result.materialIdeas.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="card liquidGlassCard">
                <h3>{t.sentenceBank}</h3>
                <ul>
                  {result.sentenceBank.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="card liquidGlassCard">
                <h3>{t.checklist}</h3>
                <ul>
                  {result.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <div className="disclaimer-box">
          <p>{t.tip}</p>
        </div>
      </div>
    </main>
  );
}