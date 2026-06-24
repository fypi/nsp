import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "LOGIN_REQUIRED" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("ai_tool_runs")
    .select("id, tool_id, input, output, credits_used, tokens_used, status, created_at")
    .eq("user_id", user.id)
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, item: data });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "LOGIN_REQUIRED" }, { status: 401 });
  }

  const { error } = await supabase
    .from("ai_tool_runs")
    .delete()
    .eq("user_id", user.id)
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
