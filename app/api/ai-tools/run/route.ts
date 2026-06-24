import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAiToolConfig } from "@/lib/ai-tools/config";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/ai-tools/prompts";
import { runAiCompletion } from "@/lib/ai-tools/ai-client";
import { assertAndConsumeCredits } from "@/lib/ai-tools/quota";
import type { AiToolRequest } from "@/lib/ai-tools/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function badRequest(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return badRequest("LOGIN_REQUIRED", 401);
    }

    const body = (await request.json()) as AiToolRequest;
    const toolId = body?.toolId;
    const input = String(body?.input || "").trim();
    const locale = body?.locale || "zh";

    if (!toolId) return badRequest("MISSING_TOOL_ID");
    if (!input) return badRequest("MISSING_INPUT");

    const config = getAiToolConfig(toolId);
    if (!config) return badRequest("UNKNOWN_TOOL");

    if (input.length > config.maxInputChars) {
      return badRequest(`INPUT_TOO_LONG:${config.maxInputChars}`);
    }

    const quota = await assertAndConsumeCredits(supabase, user.id, config.credits);
    if (!quota.ok) {
      return NextResponse.json(
        { ok: false, error: "QUOTA_EXCEEDED", quota },
        { status: 402 },
      );
    }

    const messages = [
      { role: "system" as const, content: buildSystemPrompt(config, locale) },
      { role: "user" as const, content: buildUserPrompt(input) },
    ];

    const completion = await runAiCompletion(messages);

    const { data: run, error: insertError } = await supabase
      .from("ai_tool_runs")
      .insert({
        user_id: user.id,
        tool_id: config.id,
        input,
        output: completion.output,
        credits_used: config.credits,
        tokens_used: completion.tokensUsed,
        status: "completed",
      })
      .select("id, tool_id, input, output, credits_used, tokens_used, created_at")
      .single();

    if (insertError) throw insertError;

    return NextResponse.json({
      ok: true,
      result: {
        id: run.id,
        toolId: run.tool_id,
        input: run.input,
        output: run.output,
        creditsUsed: run.credits_used,
        tokensUsed: run.tokens_used,
        createdAt: run.created_at,
      },
      quota,
    });
  } catch (error) {
    console.error("AI tool run failed", error);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
