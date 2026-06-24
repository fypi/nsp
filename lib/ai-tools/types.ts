export type AiToolId =
  | "agent-workflow"
  | "ai"
  | "knowledge-organizer"
  | "document"
  | "document-template"
  | "email-template"
  | "essay-outline"
  | "meeting-notes"
  | "okr-template"
  | "prd-template"
  | "prompt-template"
  | "resume-template"
  | "slide-outline"
  | "study-planner"
  | "summary-outline"
  | "tech-learning-path"
  | "developer"
  | "office"
  | "finance"
  | "classics"
  | "poetry";

export type AiToolRequest = {
  toolId: AiToolId;
  locale?: "zh" | "zh-TW" | "en";
  input: string;
};

export type AiToolResult = {
  id: string;
  toolId: AiToolId;
  input: string;
  output: string;
  tokensUsed: number;
  creditsUsed: number;
  createdAt: string;
};
