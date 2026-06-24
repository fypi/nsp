import type { SupabaseClient } from "@supabase/supabase-js";

export async function getOrCreateUserCredits(supabase: SupabaseClient, userId: string) {
  const { data: existing, error: selectError } = await supabase
    .from("user_ai_credits")
    .select("user_id, monthly_limit, used_this_month, reset_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (selectError) throw selectError;

  if (existing) return existing;

  const { data, error } = await supabase
    .from("user_ai_credits")
    .insert({ user_id: userId })
    .select("user_id, monthly_limit, used_this_month, reset_at")
    .single();

  if (error) throw error;
  return data;
}

export async function assertAndConsumeCredits(supabase: SupabaseClient, userId: string, credits: number) {
  const current = await getOrCreateUserCredits(supabase, userId);
  const now = new Date();
  const resetAt = current.reset_at ? new Date(current.reset_at) : null;

  let used = Number(current.used_this_month || 0);
  let limit = Number(current.monthly_limit || 0);

  if (resetAt && resetAt <= now) {
    used = 0;
    const nextReset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0));
    const { error } = await supabase
      .from("user_ai_credits")
      .update({ used_this_month: 0, reset_at: nextReset.toISOString() })
      .eq("user_id", userId);
    if (error) throw error;
  }

  if (used + credits > limit) {
    return {
      ok: false,
      remaining: Math.max(0, limit - used),
      limit,
      used,
    };
  }

  const { error } = await supabase
    .from("user_ai_credits")
    .update({ used_this_month: used + credits, updated_at: new Date().toISOString() })
    .eq("user_id", userId);

  if (error) throw error;

  return {
    ok: true,
    remaining: Math.max(0, limit - used - credits),
    limit,
    used: used + credits,
  };
}
