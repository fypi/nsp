type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type CompletionResult = {
  output: string;
  tokensUsed: number;
};

function estimateTokens(text: string) {
  return Math.max(1, Math.ceil(text.length / 4));
}

export async function runAiCompletion(messages: ChatMessage[]): Promise<CompletionResult> {
  const provider = process.env.AI_PROVIDER || "openai";

  if (provider === "azure") {
    return runAzureOpenAI(messages);
  }

  return runOpenAI(messages);
}

async function runOpenAI(messages: ChatMessage[]): Promise<CompletionResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const output = data?.choices?.[0]?.message?.content || "";
  const tokensUsed = data?.usage?.total_tokens || estimateTokens(messages.map((m) => m.content).join("\n") + output);

  return { output, tokensUsed };
}

async function runAzureOpenAI(messages: ChatMessage[]): Promise<CompletionResult> {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-02-15-preview";

  if (!endpoint || !apiKey || !deployment) {
    throw new Error("Missing AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, or AZURE_OPENAI_DEPLOYMENT");
  }

  const url = `${endpoint.replace(/\/$/, "")}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      messages,
      temperature: 0.2,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Azure OpenAI request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const output = data?.choices?.[0]?.message?.content || "";
  const tokensUsed = data?.usage?.total_tokens || estimateTokens(messages.map((m) => m.content).join("\n") + output);

  return { output, tokensUsed };
}
