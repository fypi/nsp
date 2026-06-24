"use client";

import { useMemo, useState } from "react";

type Locale = "zh" | "zh-TW" | "en";
type Book = {
  id: string;
  category: "novel" | "philosophy" | "history" | "strategy" | "poetry";
  title: Record<Locale, string>;
  author: Record<Locale, string>;
  era: Record<Locale, string>;
  summary: Record<Locale, string>;
  themes: Record<Locale, string[]>;
  keyPoints: Record<Locale, string[]>;
  studyQuestions: Record<Locale, string[]>;
  chapters: Record<Locale, string[]>;
};

const UI = {
  zh: {
    title: "经典文库",
    desc: "内置经典书籍目录、主题解析、阅读提纲、学习问题和阅读计划。",
    search: "搜索书名、作者、主题",
    all: "全部",
    novel: "小说",
    philosophy: "思想",
    history: "史学",
    strategy: "谋略",
    poetry: "诗词",
    books: "书籍",
    summary: "简介",
    themes: "主题",
    keyPoints: "学习重点",
    questions: "学习问题",
    chapters: "篇章线索",
    plan: "生成阅读计划",
    days: "天数",
    noResult: "没有找到匹配书籍。",
    back: "返回工具中心",
  },
  "zh-TW": {
    title: "經典文庫",
    desc: "內置經典書籍目錄、主題解析、閱讀提綱、學習問題和閱讀計畫。",
    search: "搜尋書名、作者、主題",
    all: "全部",
    novel: "小說",
    philosophy: "思想",
    history: "史學",
    strategy: "謀略",
    poetry: "詩詞",
    books: "書籍",
    summary: "簡介",
    themes: "主題",
    keyPoints: "學習重點",
    questions: "學習問題",
    chapters: "篇章線索",
    plan: "生成閱讀計畫",
    days: "天數",
    noResult: "沒有找到匹配書籍。",
    back: "返回工具中心",
  },
  en: {
    title: "Classics Library",
    desc: "Built-in classic book catalog, themes, reading outlines, study questions, and reading plans.",
    search: "Search title, author, theme",
    all: "All",
    novel: "Novel",
    philosophy: "Thought",
    history: "History",
    strategy: "Strategy",
    poetry: "Poetry",
    books: "Books",
    summary: "Summary",
    themes: "Themes",
    keyPoints: "Study Points",
    questions: "Study Questions",
    chapters: "Chapter Guide",
    plan: "Generate Reading Plan",
    days: "Days",
    noResult: "No matching books.",
    back: "Back to Tools",
  },
} satisfies Record<Locale, Record<string, string>>;

const books: Book[] = [
  {
    id: "hongloumeng",
    category: "novel",
    title: { zh: "红楼梦", "zh-TW": "紅樓夢", en: "Dream of the Red Chamber" },
    author: { zh: "曹雪芹", "zh-TW": "曹雪芹", en: "Cao Xueqin" },
    era: { zh: "清代", "zh-TW": "清代", en: "Qing dynasty" },
    summary: {
      zh: "以贾、史、王、薛四大家族兴衰为背景，围绕贾宝玉、林黛玉、薛宝钗等人物展开，呈现家族秩序、情感关系、命运无常与封建制度衰败。",
      "zh-TW": "以賈、史、王、薛四大家族興衰為背景，圍繞賈寶玉、林黛玉、薛寶釵等人物展開，呈現家族秩序、情感關係、命運無常與封建制度衰敗。",
      en: "A vast novel about the rise and decline of four aristocratic families, centered on Jia Baoyu, Lin Daiyu, and Xue Baochai, exploring family order, affection, fate, and social decline.",
    },
    themes: {
      zh: ["家族兴衰", "情感与命运", "礼教与个体", "真假与空幻", "女性群像"],
      "zh-TW": ["家族興衰", "情感與命運", "禮教與個體", "真假與空幻", "女性群像"],
      en: ["family rise and fall", "love and fate", "ritual order and individuality", "illusion and reality", "women's portraits"],
    },
    keyPoints: {
      zh: ["理解大观园如何成为理想世界与现实秩序的交界。", "对比宝黛钗三人的价值取向和命运结构。", "观察诗社、宴饮、节令如何推动人物关系。"],
      "zh-TW": ["理解大觀園如何成為理想世界與現實秩序的交界。", "對比寶黛釵三人的價值取向和命運結構。", "觀察詩社、宴飲、節令如何推動人物關係。"],
      en: ["Understand the Grand View Garden as a border between ideal space and social order.", "Compare the values and destinies of Baoyu, Daiyu, and Baochai.", "Observe how poetry clubs, banquets, and seasonal rituals shape relationships."],
    },
    studyQuestions: {
      zh: ["为什么《红楼梦》常被称为百科全书式小说？", "大观园既是乐园又是牢笼，这种矛盾如何体现？", "林黛玉与薛宝钗代表的不是简单对立，而是什么复杂关系？"],
      "zh-TW": ["為什麼《紅樓夢》常被稱為百科全書式小說？", "大觀園既是樂園又是牢籠，這種矛盾如何體現？", "林黛玉與薛寶釵代表的不是簡單對立，而是什麼複雜關係？"],
      en: ["Why is the novel often called encyclopedic?", "How is the garden both paradise and prison?", "Why are Daiyu and Baochai not merely opposites?"],
    },
    chapters: {
      zh: ["前五回：神话框架、人物谱系、命运预告", "大观园阶段：诗社、青春、情感张力", "后期：家族危机、秩序崩解、悲剧完成"],
      "zh-TW": ["前五回：神話框架、人物譜系、命運預告", "大觀園階段：詩社、青春、情感張力", "後期：家族危機、秩序崩解、悲劇完成"],
      en: ["Opening chapters: mythic frame, family map, fate foreshadowing", "Garden phase: poetry, youth, emotional tension", "Later phase: family crisis, collapse of order, tragedy"],
    },
  },
  {
    id: "xiyouji",
    category: "novel",
    title: { zh: "西游记", "zh-TW": "西遊記", en: "Journey to the West" },
    author: { zh: "吴承恩", "zh-TW": "吳承恩", en: "Wu Cheng'en" },
    era: { zh: "明代", "zh-TW": "明代", en: "Ming dynasty" },
    summary: { zh: "讲述唐僧师徒西天取经的神魔小说，融合宗教修行、民间想象、讽刺幽默与冒险叙事。", "zh-TW": "講述唐僧師徒西天取經的神魔小說，融合宗教修行、民間想像、諷刺幽默與冒險敘事。", en: "A mythic adventure about the pilgrimage for Buddhist scriptures, combining religious cultivation, folk imagination, satire, and adventure." },
    themes: { zh: ["修行", "欲望控制", "团队协作", "神魔想象", "秩序与反叛"], "zh-TW": ["修行", "欲望控制", "團隊協作", "神魔想像", "秩序與反叛"], en: ["cultivation", "discipline", "teamwork", "mythic imagination", "order and rebellion"] },
    keyPoints: { zh: ["孙悟空从反叛到护法的身份转换。", "九九八十一难不是简单打怪，而是心性磨炼。", "唐僧团队四人各代表不同心理力量。"], "zh-TW": ["孫悟空從反叛到護法的身份轉換。", "九九八十一難不是簡單打怪，而是心性磨煉。", "唐僧團隊四人各代表不同心理力量。"], en: ["Sun Wukong's transformation from rebel to protector.", "The trials are moral and psychological training, not just monsters.", "The four pilgrims can represent different forces of mind."] },
    studyQuestions: { zh: ["孙悟空为什么必须戴上紧箍？", "取经路上的妖怪为何常与天庭或佛界有关？", "猪八戒的缺点为何具有喜剧价值？"], "zh-TW": ["孫悟空為什麼必須戴上緊箍？", "取經路上的妖怪為何常與天庭或佛界有關？", "豬八戒的缺點為何具有喜劇價值？"], en: ["Why must Wukong wear the headband?", "Why are many demons linked to heaven or Buddhist realms?", "Why is Bajie's weakness comic and meaningful?"] },
    chapters: { zh: ["大闹天宫：英雄反叛", "取经启程：团队形成", "诸难循环：诱惑、考验与成长", "取得真经：修行完成"], "zh-TW": ["大鬧天宮：英雄反叛", "取經啟程：團隊形成", "諸難循環：誘惑、考驗與成長", "取得真經：修行完成"], en: ["Havoc in Heaven: heroic rebellion", "Pilgrimage begins: team formation", "Repeated trials: temptation and growth", "Scriptures obtained: completion"] },
  },
  {
    id: "sanguo",
    category: "novel",
    title: { zh: "三国演义", "zh-TW": "三國演義", en: "Romance of the Three Kingdoms" },
    author: { zh: "罗贯中", "zh-TW": "羅貫中", en: "Luo Guanzhong" },
    era: { zh: "元末明初", "zh-TW": "元末明初", en: "Late Yuan / early Ming" },
    summary: { zh: "以汉末三国历史为基础，描写群雄争霸、谋略政治、忠义伦理与历史兴亡。", "zh-TW": "以漢末三國歷史為基礎，描寫群雄爭霸、謀略政治、忠義倫理與歷史興亡。", en: "A historical novel about warlords, strategy, loyalty, politics, and dynastic change in the Three Kingdoms era." },
    themes: { zh: ["谋略", "忠义", "天命", "权力", "人才"], "zh-TW": ["謀略", "忠義", "天命", "權力", "人才"], en: ["strategy", "loyalty", "mandate", "power", "talent"] },
    keyPoints: { zh: ["区分历史事实与小说塑造。", "比较曹操、刘备、孙权的政治资源。", "理解诸葛亮形象如何被理想化。"], "zh-TW": ["區分歷史事實與小說塑造。", "比較曹操、劉備、孫權的政治資源。", "理解諸葛亮形象如何被理想化。"], en: ["Separate history from fictional shaping.", "Compare the political resources of Cao Cao, Liu Bei, and Sun Quan.", "Understand the idealization of Zhuge Liang."] },
    studyQuestions: { zh: ["为什么《三国演义》强调忠义而非纯粹胜负？", "曹操形象为何复杂？", "赤壁之战在叙事中承担什么功能？"], "zh-TW": ["為什麼《三國演義》強調忠義而非純粹勝負？", "曹操形象為何複雜？", "赤壁之戰在敘事中承擔什麼功能？"], en: ["Why does the novel emphasize loyalty over victory?", "Why is Cao Cao complex?", "What narrative role does Red Cliffs play?"] },
    chapters: { zh: ["黄巾与董卓：乱世开启", "群雄割据：联盟与背叛", "赤壁前后：三分格局", "北伐与归晋：理想消散"], "zh-TW": ["黃巾與董卓：亂世開啟", "群雄割據：聯盟與背叛", "赤壁前後：三分格局", "北伐與歸晉：理想消散"], en: ["Yellow Turbans and Dong Zhuo", "Warlords and shifting alliances", "Red Cliffs and tripartite order", "Northern expeditions and Jin unification"] },
  },
  {
    id: "shuihu",
    category: "novel",
    title: { zh: "水浒传", "zh-TW": "水滸傳", en: "Water Margin" },
    author: { zh: "施耐庵", "zh-TW": "施耐庵", en: "Shi Nai'an" },
    era: { zh: "元末明初", "zh-TW": "元末明初", en: "Late Yuan / early Ming" },
    summary: { zh: "描写一百零八好汉聚义梁山的故事，涉及官逼民反、江湖伦理、义气与招安困境。", "zh-TW": "描寫一百零八好漢聚義梁山的故事，涉及官逼民反、江湖倫理、義氣與招安困境。", en: "Stories of 108 outlaws gathering at Liangshan, exploring justice, rebellion, brotherhood, and state incorporation." },
    themes: { zh: ["义气", "反抗", "招安", "江湖", "暴力与秩序"], "zh-TW": ["義氣", "反抗", "招安", "江湖", "暴力與秩序"], en: ["brotherhood", "rebellion", "amnesty", "outlaw world", "violence and order"] },
    keyPoints: { zh: ["关注人物上梁山的社会原因。", "区分个人复仇、江湖义气与政治反抗。", "理解招安结局的矛盾。"], "zh-TW": ["關注人物上梁山的社會原因。", "區分個人復仇、江湖義氣與政治反抗。", "理解招安結局的矛盾。"], en: ["Trace the social reasons behind joining Liangshan.", "Distinguish revenge, brotherhood, and political rebellion.", "Understand the contradiction of amnesty."] },
    studyQuestions: { zh: ["梁山好汉是英雄还是秩序之外的人？", "宋江为什么坚持招安？", "水浒中的义气有什么代价？"], "zh-TW": ["梁山好漢是英雄還是秩序之外的人？", "宋江為什麼堅持招安？", "水滸中的義氣有什麼代價？"], en: ["Are the Liangshan heroes heroic or outside order?", "Why does Song Jiang seek amnesty?", "What is the cost of brotherhood?"] },
    chapters: { zh: ["个人遭遇：逼上梁山", "梁山聚义：组织形成", "对抗官府：军事胜利", "招安征战：悲剧收束"], "zh-TW": ["個人遭遇：逼上梁山", "梁山聚義：組織形成", "對抗官府：軍事勝利", "招安征戰：悲劇收束"], en: ["Personal injustice", "Gathering at Liangshan", "Battles against officials", "Amnesty and tragic campaigns"] },
  },
  {
    id: "lunyu",
    category: "philosophy",
    title: { zh: "论语", "zh-TW": "論語", en: "Analects" },
    author: { zh: "孔子及弟子记录", "zh-TW": "孔子及弟子記錄", en: "Confucius and disciples" },
    era: { zh: "春秋战国", "zh-TW": "春秋戰國", en: "Spring and Autumn / Warring States" },
    summary: { zh: "记录孔子及弟子言行，核心关注仁、礼、义、君子修养与社会秩序。", "zh-TW": "記錄孔子及弟子言行，核心關注仁、禮、義、君子修養與社會秩序。", en: "A collection of sayings and dialogues centered on benevolence, ritual, righteousness, self-cultivation, and social order." },
    themes: { zh: ["仁", "礼", "君子", "学习", "政治伦理"], "zh-TW": ["仁", "禮", "君子", "學習", "政治倫理"], en: ["ren", "ritual", "exemplary person", "learning", "political ethics"] },
    keyPoints: { zh: ["把仁理解为关系中的道德实践。", "礼不是表面仪式，而是秩序与分寸。", "君子修养强调长期自我约束。"], "zh-TW": ["把仁理解為關係中的道德實踐。", "禮不是表面儀式，而是秩序與分寸。", "君子修養強調長期自我約束。"], en: ["Ren is moral practice within relationships.", "Ritual is order and measure, not mere form.", "Self-cultivation is long-term discipline."] },
    studyQuestions: { zh: ["仁与礼是什么关系？", "君子与小人的差别在哪里？", "《论语》的学习观对今天有什么意义？"], "zh-TW": ["仁與禮是什麼關係？", "君子與小人的差別在哪裡？", "《論語》的學習觀對今天有什麼意義？"], en: ["How are ren and ritual related?", "What distinguishes junzi and petty person?", "What does its view of learning mean today?"] },
    chapters: { zh: ["学而：学习与修身", "为政：政治伦理", "里仁：仁的实践", "先进/颜渊：弟子与问答"], "zh-TW": ["學而：學習與修身", "為政：政治倫理", "里仁：仁的實踐", "先進/顏淵：弟子與問答"], en: ["Xue Er: learning", "Wei Zheng: governance", "Li Ren: practice of ren", "Disciples and dialogues"] },
  },
  {
    id: "daodejing",
    category: "philosophy",
    title: { zh: "道德经", "zh-TW": "道德經", en: "Dao De Jing" },
    author: { zh: "老子", "zh-TW": "老子", en: "Laozi" },
    era: { zh: "先秦", "zh-TW": "先秦", en: "Pre-Qin" },
    summary: { zh: "以道、德、无为、柔弱胜刚强为核心，讨论宇宙原则、政治治理与个人处世。", "zh-TW": "以道、德、無為、柔弱勝剛強為核心，討論宇宙原則、政治治理與個人處世。", en: "A concise philosophical text on Dao, virtue, non-action, softness overcoming hardness, governance, and personal conduct." },
    themes: { zh: ["道", "无为", "柔弱", "反者道之动", "政治节制"], "zh-TW": ["道", "無為", "柔弱", "反者道之動", "政治節制"], en: ["Dao", "non-action", "softness", "reversal", "restrained governance"] },
    keyPoints: { zh: ["无为不是不做，而是不妄为。", "柔弱不是软弱，而是顺势与保全。", "语言无法完全把握道。"], "zh-TW": ["無為不是不做，而是不妄為。", "柔弱不是軟弱，而是順勢與保全。", "語言無法完全把握道。"], en: ["Non-action means not forcing.", "Softness is adaptive strength.", "Language cannot fully capture Dao."] },
    studyQuestions: { zh: ["无为和消极有什么区别？", "为什么老子重视柔弱？", "《道德经》的政治理想是什么？"], "zh-TW": ["無為和消極有什麼區別？", "為什麼老子重視柔弱？", "《道德經》的政治理想是什麼？"], en: ["How is non-action different from passivity?", "Why value softness?", "What is the political ideal?" ] },
    chapters: { zh: ["道可道：语言边界", "上善若水：柔性伦理", "无为而治：治理原则", "反复循环：辩证运动"], "zh-TW": ["道可道：語言邊界", "上善若水：柔性倫理", "無為而治：治理原則", "反復循環：辯證運動"], en: ["The speakable Dao", "Water-like virtue", "Governing by non-action", "Reversal and cyclic movement"] },
  },
  {
    id: "shiji",
    category: "history",
    title: { zh: "史记", "zh-TW": "史記", en: "Records of the Grand Historian" },
    author: { zh: "司马迁", "zh-TW": "司馬遷", en: "Sima Qian" },
    era: { zh: "西汉", "zh-TW": "西漢", en: "Western Han" },
    summary: { zh: "纪传体通史，贯通上古至汉武帝时期，兼具史学、文学与人物传记价值。", "zh-TW": "紀傳體通史，貫通上古至漢武帝時期，兼具史學、文學與人物傳記價值。", en: "A biographical history from antiquity to Emperor Wu of Han, valuable as history, literature, and biography." },
    themes: { zh: ["历史判断", "人物命运", "成败", "权力", "士人精神"], "zh-TW": ["歷史判斷", "人物命運", "成敗", "權力", "士人精神"], en: ["historical judgment", "destiny", "success and failure", "power", "scholar spirit"] },
    keyPoints: { zh: ["理解本纪、世家、列传的结构。", "关注司马迁如何评价人物。", "人物传记中常有道德困境。"], "zh-TW": ["理解本紀、世家、列傳的結構。", "關注司馬遷如何評價人物。", "人物傳記中常有道德困境。"], en: ["Understand annals, hereditary houses, and biographies.", "Observe Sima Qian's judgments.", "Biographies often contain moral dilemmas."] },
    studyQuestions: { zh: ["司马迁如何写失败者？", "《史记》的文学性体现在哪里？", "历史叙事是否可能完全客观？"], "zh-TW": ["司馬遷如何寫失敗者？", "《史記》的文學性體現在哪裡？", "歷史敘事是否可能完全客觀？"], en: ["How does Sima Qian write about failures?", "Where is the literary power?", "Can historical narration be fully objective?"] },
    chapters: { zh: ["本纪：帝王政治", "世家：诸侯家族", "列传：人物命运", "书表：制度与时间"], "zh-TW": ["本紀：帝王政治", "世家：諸侯家族", "列傳：人物命運", "書表：制度與時間"], en: ["Annals: rulers", "Hereditary houses", "Biographies", "Treatises and tables"] },
  },
  {
    id: "sunzi",
    category: "strategy",
    title: { zh: "孙子兵法", "zh-TW": "孫子兵法", en: "The Art of War" },
    author: { zh: "孙武", "zh-TW": "孫武", en: "Sun Wu" },
    era: { zh: "春秋", "zh-TW": "春秋", en: "Spring and Autumn" },
    summary: { zh: "中国古代兵学经典，讨论战争决策、形势判断、资源配置、谋略与风险控制。", "zh-TW": "中國古代兵學經典，討論戰爭決策、形勢判斷、資源配置、謀略與風險控制。", en: "A classic on military strategy, decision-making, positioning, resource allocation, deception, and risk control." },
    themes: { zh: ["知己知彼", "不战而胜", "势", "虚实", "用间"], "zh-TW": ["知己知彼", "不戰而勝", "勢", "虛實", "用間"], en: ["know self and other", "win without fighting", "strategic momentum", "void and solid", "intelligence"] },
    keyPoints: { zh: ["最高目标不是战斗，而是以最小代价达成目标。", "势强调结构性优势。", "信息与判断决定行动质量。"], "zh-TW": ["最高目標不是戰鬥，而是以最小代價達成目標。", "勢強調結構性優勢。", "資訊與判斷決定行動品質。"], en: ["The best goal is not battle but achieving objectives with minimal cost.", "Momentum means structural advantage.", "Information and judgment determine action quality."] },
    studyQuestions: { zh: ["不战而胜如何理解？", "虚实原则能否用于商业竞争？", "为什么情报如此重要？"], "zh-TW": ["不戰而勝如何理解？", "虛實原則能否用於商業競爭？", "為什麼情報如此重要？"], en: ["How to understand victory without battle?", "Can void-solid apply to business?", "Why is intelligence crucial?"] },
    chapters: { zh: ["计篇：决策前评估", "作战/谋攻：成本与目标", "形势：结构优势", "虚实/用间：信息与变化"], "zh-TW": ["計篇：決策前評估", "作戰/謀攻：成本與目標", "形勢：結構優勢", "虛實/用間：資訊與變化"], en: ["Planning", "Cost and objectives", "Formation and momentum", "Void-solid and intelligence"] },
  },
];

function includesBook(book: Book, locale: Locale, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    book.title[locale],
    book.title.zh,
    book.title.en,
    book.author[locale],
    book.author.zh,
    book.summary[locale],
    ...book.themes[locale],
  ].join(" ").toLowerCase();
  return haystack.includes(q);
}

function makePlan(book: Book, locale: Locale, days: number) {
  const safeDays = Math.max(1, Math.min(60, days || 7));
  const chapters = book.chapters[locale];
  const rows: string[] = [];
  for (let i = 1; i <= safeDays; i += 1) {
    const chapter = chapters[(i - 1) % chapters.length];
    if (locale === "en") rows.push(`Day ${i}: ${chapter}. Write 3 notes and 1 question.`);
    else if (locale === "zh-TW") rows.push(`第 ${i} 天：${chapter}。寫 3 條筆記和 1 個問題。`);
    else rows.push(`第 ${i} 天：${chapter}。写 3 条笔记和 1 个问题。`);
  }
  return rows;
}

export default function ClassicsLibraryClient({ locale }: { locale: Locale }) {
  const ui = UI[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Book["category"] | "all">("all");
  const [selectedId, setSelectedId] = useState("hongloumeng");
  const [days, setDays] = useState(14);
  const selected = books.find((book) => book.id === selectedId) || books[0];

  const filtered = useMemo(() => {
    return books.filter((book) => (category === "all" || book.category === category) && includesBook(book, locale, query));
  }, [category, locale, query]);

  const plan = useMemo(() => makePlan(selected, locale, days), [selected, locale, days]);
  const backHref = locale === "en" ? "/tool" : `/${locale}/tool`;

  return (
    <main className="classicsRoot">
      <style>{`
        .classicsRoot {
          min-height: 100vh;
          background: #e9ebef;
          color: #05070a;
          padding: 104px 24px 96px;
        }
        .classicsShell {
          width: min(1180px, calc(100vw - 48px));
          margin: 0 auto;
        }
        .classicsHero {
          min-height: 230px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .classicsHero h1 {
          margin: 0;
          font-size: clamp(32px, 4vw, 40px);
          line-height: 1.04;
          letter-spacing: -0.045em;
          font-weight: 950;
        }
        .classicsHero p {
          margin: 14px 0 0;
          max-width: 880px;
          font-size: clamp(17px, 1.8vw, 24px);
          line-height: 1.42;
          color: #5b6678;
          font-weight: 760;
          letter-spacing: -0.03em;
        }
        .classicsDivider {
          width: 100vw;
          height: 24px;
          margin-left: calc(50% - 50vw);
          background: #fff;
        }
        .classicsToolbar {
          margin-top: 34px;
          display: grid;
          grid-template-columns: minmax(260px, 1fr) auto;
          gap: 14px;
          align-items: center;
        }
        .classicsSearch {
          min-height: 48px;
          border: 0;
          outline: none;
          border-radius: 999px;
          padding: 0 20px;
          background: rgba(255,255,255,.68);
          color: #111827;
          font-size: 15px;
          font-weight: 700;
        }
        .classicsBack {
          min-height: 48px;
          border-radius: 999px;
          padding: 0 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #111827;
          background: rgba(255,255,255,.58);
          text-decoration: none;
          font-size: 14px;
          font-weight: 900;
        }
        .classicsCategories {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .classicsCategories button {
          min-height: 38px;
          border: 0;
          border-radius: 999px;
          padding: 0 16px;
          cursor: pointer;
          background: rgba(255,255,255,.58);
          color: #111827;
          font-size: 13px;
          font-weight: 900;
        }
        .classicsCategories button[aria-current="true"] {
          background: #05070a;
          color: #fff;
        }
        .classicsGrid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: 360px minmax(0, 1fr);
          gap: 24px;
        }
        .bookList, .bookDetail {
          border-radius: 32px;
          background: #d8dee8;
          padding: 24px;
        }
        .panelTitle {
          margin: 0 0 16px;
          font-size: 22px;
          line-height: 1.1;
          letter-spacing: -0.04em;
          font-weight: 950;
        }
        .bookItems {
          display: grid;
          gap: 10px;
          max-height: 720px;
          overflow: auto;
          padding-right: 4px;
        }
        .bookButton {
          border: 0;
          border-radius: 22px;
          padding: 16px;
          text-align: left;
          cursor: pointer;
          background: rgba(255,255,255,.48);
          color: #111827;
        }
        .bookButton[aria-current="true"] {
          background: #05070a;
          color: #fff;
        }
        .bookButton strong {
          display: block;
          font-size: 16px;
          line-height: 1.2;
          font-weight: 950;
        }
        .bookButton span {
          display: block;
          margin-top: 6px;
          color: inherit;
          opacity: .72;
          font-size: 12px;
          font-weight: 750;
        }
        .bookHeader h2 {
          margin: 0;
          font-size: clamp(28px, 3vw, 40px);
          line-height: 1.05;
          letter-spacing: -0.05em;
          font-weight: 950;
        }
        .bookMeta {
          margin-top: 10px;
          color: #5b6678;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 800;
        }
        .sectionBlock {
          margin-top: 24px;
          border-radius: 24px;
          padding: 20px;
          background: rgba(255,255,255,.48);
        }
        .sectionBlock h3 {
          margin: 0 0 12px;
          font-size: 20px;
          line-height: 1.15;
          letter-spacing: -0.035em;
          font-weight: 950;
        }
        .sectionBlock p, .sectionBlock li {
          color: #374151;
          font-size: 15px;
          line-height: 1.72;
          font-weight: 650;
        }
        .tagList {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .tag {
          border-radius: 999px;
          padding: 8px 12px;
          background: rgba(255,255,255,.62);
          color: #111827;
          font-size: 13px;
          font-weight: 850;
        }
        .planControls {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 14px;
        }
        .planControls input {
          width: 96px;
          min-height: 40px;
          border: 0;
          border-radius: 999px;
          padding: 0 14px;
          background: rgba(255,255,255,.7);
          font-weight: 850;
        }
        @media (max-width: 900px) {
          .classicsGrid { grid-template-columns: 1fr; }
          .bookItems { max-height: none; }
        }
        @media (max-width: 760px) {
          .classicsRoot { padding: 92px 18px 80px; }
          .classicsShell { width: calc(100vw - 36px); }
          .classicsToolbar { grid-template-columns: 1fr; }
          .bookList, .bookDetail { border-radius: 26px; padding: 18px; }
        }
      `}</style>

      <div className="classicsShell">
        <section className="classicsHero">
          <h1>{ui.title}</h1>
          <p>{ui.desc}</p>
        </section>
        <div className="classicsDivider" aria-hidden="true" />

        <section className="classicsToolbar">
          <input className="classicsSearch" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ui.search} />
          <a className="classicsBack" href={backHref}>{ui.back}</a>
        </section>

        <section className="classicsCategories" aria-label="categories">
          {(["all", "novel", "philosophy", "history", "strategy", "poetry"] as const).map((key) => (
            <button key={key} type="button" aria-current={category === key ? "true" : undefined} onClick={() => setCategory(key)}>
              {ui[key]}
            </button>
          ))}
        </section>

        <section className="classicsGrid">
          <aside className="bookList">
            <h2 className="panelTitle">{ui.books}</h2>
            <div className="bookItems">
              {filtered.length ? filtered.map((book) => (
                <button key={book.id} className="bookButton" type="button" aria-current={selected.id === book.id ? "true" : undefined} onClick={() => setSelectedId(book.id)}>
                  <strong>{book.title[locale]}</strong>
                  <span>{book.author[locale]} · {book.era[locale]}</span>
                </button>
              )) : <p>{ui.noResult}</p>}
            </div>
          </aside>

          <article className="bookDetail">
            <header className="bookHeader">
              <h2>{selected.title[locale]}</h2>
              <div className="bookMeta">{selected.author[locale]} · {selected.era[locale]}</div>
            </header>

            <section className="sectionBlock">
              <h3>{ui.summary}</h3>
              <p>{selected.summary[locale]}</p>
            </section>

            <section className="sectionBlock">
              <h3>{ui.themes}</h3>
              <div className="tagList">{selected.themes[locale].map((item) => <span className="tag" key={item}>{item}</span>)}</div>
            </section>

            <section className="sectionBlock">
              <h3>{ui.keyPoints}</h3>
              <ul>{selected.keyPoints[locale].map((item) => <li key={item}>{item}</li>)}</ul>
            </section>

            <section className="sectionBlock">
              <h3>{ui.questions}</h3>
              <ul>{selected.studyQuestions[locale].map((item) => <li key={item}>{item}</li>)}</ul>
            </section>

            <section className="sectionBlock">
              <h3>{ui.chapters}</h3>
              <ul>{selected.chapters[locale].map((item) => <li key={item}>{item}</li>)}</ul>
            </section>

            <section className="sectionBlock">
              <h3>{ui.plan}</h3>
              <div className="planControls">
                <span>{ui.days}</span>
                <input type="number" min={1} max={60} value={days} onChange={(event) => setDays(Number(event.target.value))} />
              </div>
              <ul>{plan.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </article>
        </section>
      </div>
    </main>
  );
}
