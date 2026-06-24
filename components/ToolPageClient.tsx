"use client";

import { useState } from "react";

type Locale = "zh" | "zh-TW" | "en";

type ToolMeta = { zh: string; tw: string; en: string; descZh: string; descTw: string; descEn: string; sample: string };

const meta: Record<string, ToolMeta> = {
  "agent-workflow": { zh: "Agent 工作流", tw: "Agent 工作流", en: "Agent Workflow", descZh: "把目标拆解成可执行步骤、检查点和输出。", descTw: "把目標拆解成可執行步驟、檢查點和輸出。", descEn: "Break a goal into executable steps, checkpoints, and outputs.", sample: "目标：整理市场调研报告\n资料：竞品、用户反馈、销售数据" },
  "ai": { zh: "AI 工具", tw: "AI 工具", en: "AI Tools", descZh: "生成 AI 提示词、任务结构和输出规范。", descTw: "生成 AI 提示詞、任務結構和輸出規範。", descEn: "Generate AI prompts, task structures, and output specs.", sample: "任务：写产品发布计划\n受众：创业团队" },
  "arithmetic-practice": { zh: "算术练习", tw: "算術練習", en: "Arithmetic Practice", descZh: "生成基础算术练习题。", descTw: "生成基礎算術練習題。", descEn: "Generate arithmetic practice questions.", sample: "20 100" },
  "base64": { zh: "Base64 工具", tw: "Base64 工具", en: "Base64", descZh: "Base64 编码与解码。", descTw: "Base64 編碼與解碼。", descEn: "Encode and decode Base64.", sample: "NINESPRO" },
  "compound-interest": { zh: "复利计算", tw: "複利計算", en: "Compound Interest", descZh: "计算本金、年化、年数和每月投入后的复利结果。", descTw: "計算本金、年化、年數和每月投入後的複利結果。", descEn: "Calculate compound growth with contributions.", sample: "10000 8 10 500" },
  "hash-calculator": { zh: "哈希计算", tw: "雜湊計算", en: "Hash Calculator", descZh: "计算 SHA-256 摘要。", descTw: "計算 SHA-256 摘要。", descEn: "Calculate SHA-256 digest.", sample: "NINESPRO" },
  "inflation-impact": { zh: "通胀影响", tw: "通膨影響", en: "Inflation Impact", descZh: "估算通胀后的购买力。", descTw: "估算通膨後的購買力。", descEn: "Estimate inflation-adjusted purchasing power.", sample: "10000 3 10" },
  "json-formatter": { zh: "JSON 格式化", tw: "JSON 格式化", en: "JSON Formatter", descZh: "格式化和校验 JSON。", descTw: "格式化和校驗 JSON。", descEn: "Format and validate JSON.", sample: "{\"name\":\"NINESPRO\",\"type\":\"AI\"}" },
  "markdown-preview": { zh: "Markdown 预览", tw: "Markdown 預覽", en: "Markdown Preview", descZh: "整理 Markdown 基础结构。", descTw: "整理 Markdown 基礎結構。", descEn: "Preview basic Markdown structure.", sample: "# 标题\n\n- 内容\n- **重点**" },
  "mortgage-calculator": { zh: "房贷计算", tw: "房貸計算", en: "Mortgage Calculator", descZh: "计算月供、总还款和利息。", descTw: "計算月供、總還款和利息。", descEn: "Calculate monthly payment, total, and interest.", sample: "500000 6.5 30" },
  "qr-code": { zh: "二维码", tw: "QR Code", en: "QR Code", descZh: "生成二维码预览链接。", descTw: "生成 QR Code 預覽連結。", descEn: "Generate QR code preview link.", sample: "https://www.ninespro.com" },
  "savings-goal": { zh: "储蓄目标", tw: "儲蓄目標", en: "Savings Goal", descZh: "计算达成储蓄目标所需月存款。", descTw: "計算達成儲蓄目標所需月存款。", descEn: "Calculate monthly saving needed.", sample: "30000 5000 12" },
  "sql-formatter": { zh: "SQL 格式化", tw: "SQL 格式化", en: "SQL Formatter", descZh: "基础格式化 SQL。", descTw: "基礎格式化 SQL。", descEn: "Basic SQL formatting.", sample: "select id,name from users where active=1 order by created_at desc" },
  "text-diff": { zh: "文本对比", tw: "文字對比", en: "Text Diff", descZh: "对比两段文本差异。", descTw: "對比兩段文字差異。", descEn: "Compare two text blocks.", sample: "第一段文本\n---\n第二段文本" },
  "timestamp-converter": { zh: "时间戳转换", tw: "時間戳轉換", en: "Timestamp Converter", descZh: "转换秒、毫秒和日期时间。", descTw: "轉換秒、毫秒和日期時間。", descEn: "Convert timestamps and dates.", sample: "1710000000" },
  "url-codec": { zh: "URL 编解码", tw: "URL 編解碼", en: "URL Codec", descZh: "URL 编码和解码。", descTw: "URL 編碼和解碼。", descEn: "Encode and decode URLs.", sample: "https://www.ninespro.com/?q=AI 工具" }
};

const fallbackNames: Record<string, [string,string,string]> = {
  "classics": ["经典文库","經典文庫","Classics"], "developer": ["开发工具","開發工具","Developer Tools"], "document": ["文档工具","文檔工具","Document Tools"], "document-template": ["文书模板","文書模板","Document Templates"], "email-template": ["邮件模板","郵件模板","Email Templates"], "essay-outline": ["文章提纲","文章提綱","Essay Outline"], "finance": ["金融工具","金融工具","Finance Tools"], "formula-cards": ["公式卡片","公式卡片","Formula Cards"], "knowledge-organizer": ["知识整理","知識整理","Knowledge Organizer"], "learning": ["学习工具","學習工具","Learning Tools"], "meeting-notes": ["会议纪要","會議紀要","Meeting Notes"], "office": ["办公工具","辦公工具","Office Tools"], "okr-template": ["OKR 模板","OKR 模板","OKR Template"], "pinyin-card": ["拼音卡片","拼音卡片","Pinyin Cards"], "poetry": ["诗词工具","詩詞工具","Poetry"], "prd-template": ["PRD 模板","PRD 模板","PRD Template"], "prompt-template": ["提示词模板","提示詞模板","Prompt Templates"], "resume-template": ["简历模板","履歷模板","Resume Template"], "slide-outline": ["幻灯片提纲","簡報提綱","Slide Outline"], "study-planner": ["学习计划","學習計畫","Study Planner"], "summary-outline": ["总结提纲","總結提綱","Summary Outline"], "tech-learning-path": ["技术学习路径","技術學習路徑","Tech Learning Path"] };

const labels = {
  zh: { input: "输入", output: "结果", run: "生成 / 处理", clear: "清空", copy: "复制", copied: "已复制", back: "返回工具中心", error: "处理失败，请检查输入。", generic: "输入内容后生成结构化结果。" },
  "zh-TW": { input: "輸入", output: "結果", run: "生成 / 處理", clear: "清空", copy: "複製", copied: "已複製", back: "返回工具中心", error: "處理失敗，請檢查輸入。", generic: "輸入內容後生成結構化結果。" },
  en: { input: "Input", output: "Result", run: "Generate / Run", clear: "Clear", copy: "Copy", copied: "Copied", back: "Back to Tools", error: "Failed. Please check the input.", generic: "Enter content to generate a structured result." }
};

function nums(v:string){ return v.match(/-?\d+(\.\d+)?/g)?.map(Number) || []; }
function money(n:number){ return Number.isFinite(n) ? n.toFixed(2) : "-"; }
async function sha256(value:string){ const data=new TextEncoder().encode(value); const h=await crypto.subtle.digest("SHA-256",data); return Array.from(new Uint8Array(h)).map(b=>b.toString(16).padStart(2,"0")).join(""); }
function generic(slug:string, value:string, locale:Locale){ const zh=locale!=="en"; return zh ? `结构化结果\n\n主题：${value.split(/\n/)[0] || slug}\n\n摘要：\n${value}\n\n步骤：\n1. 背景\n2. 重点\n3. 执行方案\n4. 检查清单\n5. 下一步` : `Structured Result\n\nTopic: ${value.split(/\n/)[0] || slug}\n\nSummary:\n${value}\n\nSteps:\n1. Background\n2. Key points\n3. Execution plan\n4. Checklist\n5. Next steps`; }

async function run(slug:string,value:string,locale:Locale){
  const n=nums(value);
  if(slug==="json-formatter") return JSON.stringify(JSON.parse(value),null,2);
  if(slug==="base64"){ try{return decodeURIComponent(escape(atob(value.trim())))}catch{return btoa(unescape(encodeURIComponent(value)))}}
  if(slug==="url-codec"){ try{return decodeURIComponent(value)}catch{return encodeURIComponent(value)}}
  if(slug==="timestamp-converter"){ const x=value.trim()?Number(value.trim()):Date.now(); const ms=x<10000000000?x*1000:x; const d=new Date(ms); return `Milliseconds: ${d.getTime()}\nSeconds: ${Math.floor(d.getTime()/1000)}\nISO: ${d.toISOString()}\nLocal: ${d.toLocaleString(locale==="en"?"en-US":locale==="zh-TW"?"zh-TW":"zh-CN")}`; }
  if(slug==="hash-calculator") return `SHA-256\n${await sha256(value)}`;
  if(slug==="compound-interest"){ const [p=0,r0=0,y=0,m=0]=n; const months=Math.round(y*12); const r=r0/100/12; let total=p; for(let i=0;i<months;i++) total=total*(1+r)+m; return `Final value: ${money(total)}\nPrincipal: ${money(p)}\nMonthly contribution: ${money(m)}\nMonths: ${months}`; }
  if(slug==="mortgage-calculator"){ const [p=0,r0=0,y=0]=n; const months=Math.round(y*12); const r=r0/100/12; const pay=r===0?p/months:p*r*Math.pow(1+r,months)/(Math.pow(1+r,months)-1); return `Monthly payment: ${money(pay)}\nTotal payment: ${money(pay*months)}\nTotal interest: ${money(pay*months-p)}\nMonths: ${months}`; }
  if(slug==="savings-goal"){ const [goal=0,current=0,months=1]=n; return `Monthly savings needed: ${money((goal-current)/months)}\nGoal: ${money(goal)}\nCurrent: ${money(current)}\nMonths: ${months}`; }
  if(slug==="inflation-impact"){ const [amount=0,rate=0,years=0]=n; return `Current amount: ${money(amount)}\nInflation rate: ${rate}%\nYears: ${years}\nFuture purchasing power: ${money(amount/Math.pow(1+rate/100,years))}`; }
  if(slug==="text-diff"){ const [a="",b=""]=value.split(/\n---\n/); const A=a.split(/\r?\n/),B=b.split(/\r?\n/); const out:string[]=[]; for(let i=0;i<Math.max(A.length,B.length);i++) if((A[i]||"")!==(B[i]||"")) out.push(`Line ${i+1}\n- ${A[i]||""}\n+ ${B[i]||""}`); return out.length?out.join("\n\n"):"No differences."; }
  if(slug==="markdown-preview") return value.replace(/^### (.*)$/gm,"▸ $1").replace(/^## (.*)$/gm,"■ $1").replace(/^# (.*)$/gm,"● $1").replace(/\*\*(.*?)\*\*/g,"$1");
  if(slug==="sql-formatter") return value.replace(/\b(select|from|where|order by|group by|limit|join|left join|right join|inner join|and|or)\b/gi,"\n$1").replace(/^\n/,"").trim();
  if(slug==="qr-code") return `QR preview URL:\nhttps://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(value)}`;
  if(slug==="arithmetic-practice"){ const [count=10,max=100]=n; return Array.from({length:Math.min(count,50)},(_,i)=>{const a=Math.floor(Math.random()*max)+1,b=Math.floor(Math.random()*max)+1;return `${i+1}. ${a} + ${b} = ____    Answer: ${a+b}`}).join("\n"); }
  return generic(slug,value,locale);
}

export default function ToolPageClient({ slug, locale }: { slug: string; locale: Locale }) {
  const localName = fallbackNames[slug];
  const m = meta[slug] || { zh: localName?.[0] || slug, tw: localName?.[1] || slug, en: localName?.[2] || slug, descZh: labels.zh.generic, descTw: labels["zh-TW"].generic, descEn: labels.en.generic, sample: "" };
  const title = locale==="en" ? m.en : locale==="zh-TW" ? m.tw : m.zh;
  const desc = locale==="en" ? m.descEn : locale==="zh-TW" ? m.descTw : m.descZh;
  const l = labels[locale];
  const [input,setInput]=useState(m.sample);
  const [output,setOutput]=useState("");
  const [copied,setCopied]=useState(false);
  async function onRun(){ try{setOutput(await run(slug,input,locale))}catch{setOutput(l.error)} }
  async function onCopy(){ await navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1200); }
  return <main className="toolPageRoot"><style>{`.toolPageRoot{min-height:100vh;background:#e9ebef;color:#05070a;padding:124px 24px 110px;overflow:hidden}.toolPageShell{width:min(1120px,calc(100vw - 48px));margin:0 auto}.toolHero{min-height:300px;display:flex;flex-direction:column;justify-content:center}.toolHero h1{margin:0;font-size:clamp(40px,5vw,72px);line-height:.96;letter-spacing:-.065em;font-weight:950}.toolHero p{margin:18px 0 0;max-width:900px;font-size:clamp(18px,2vw,28px);line-height:1.38;letter-spacing:-.035em;color:#5b6678;font-weight:720;text-wrap:balance}.toolDivider{width:100vw;height:30px;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);background:#fff}.toolWorkspace{margin-top:60px;border-radius:34px;padding:30px;background:#d8dee8}.toolLabel{display:block;margin:0 0 10px;color:#5b6678;font-size:13px;letter-spacing:.12em;text-transform:uppercase;font-weight:950}.toolTextarea{width:100%;min-height:210px;resize:vertical;border:0;outline:none;border-radius:24px;padding:20px;background:rgba(255,255,255,.66);color:#111827;font-size:15px;line-height:1.62;font-weight:650;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}.toolActions{display:flex;gap:12px;flex-wrap:wrap;margin:16px 0 24px}.toolButton{min-height:44px;border:0;border-radius:999px;padding:0 20px;cursor:pointer;background:rgba(255,255,255,.55);color:#111827;font-size:14px;font-weight:900;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}.toolButtonPrimary{background:#05070a;color:#fff}.toolOutput{white-space:pre-wrap;min-height:190px;border-radius:24px;padding:20px;background:rgba(255,255,255,.66);color:#111827;font-size:15px;line-height:1.66;font-weight:650;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;overflow-wrap:anywhere}@media(max-width:760px){.toolPageRoot{padding:92px 18px 90px}.toolPageShell{width:calc(100vw - 36px)}.toolWorkspace{padding:22px;border-radius:28px}}`}</style><div className="toolPageShell"><section className="toolHero"><h1>{title}</h1><p>{desc}</p></section><div className="toolDivider" aria-hidden="true"/><section className="toolWorkspace"><label className="toolLabel">{l.input}</label><textarea className="toolTextarea" value={input} onChange={(e)=>setInput(e.target.value)}/><div className="toolActions"><button className="toolButton toolButtonPrimary" type="button" onClick={onRun}>{l.run}</button><button className="toolButton" type="button" onClick={()=>{setInput("");setOutput("")}}>{l.clear}</button><button className="toolButton" type="button" disabled={!output} onClick={onCopy}>{copied?l.copied:l.copy}</button><a className="toolButton" href={locale==="en"?"/tool":`/${locale}/tool`}>{l.back}</a></div><label className="toolLabel">{l.output}</label><div className="toolOutput">{output}</div></section></div></main>;
}
