import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "LOGIN_REQUIRED" }, { status: 401 });
  }

  const url = new URL(request.url);
  const toolId = url.searchParams.get("toolId");
  const limit = Math.min(Number(url.searchParams.get("limit") || 30), 100);

  let query = supabase
    .from("ai_tool_runs")
    .select("id, tool_id, input, output, credits_used, tokens_used, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (toolId) query = query.eq("tool_id", toolId);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, history: data || [] });
}
