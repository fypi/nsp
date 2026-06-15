import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from("keep_alive")
      .select("id,note,created_at")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Supabase keep-alive error:", error);

      return NextResponse.json(
        {
          ok: false,
          message: "Supabase keep-alive query failed.",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Supabase keep-alive success.",
      checkedAt: new Date().toISOString(),
      data,
    });
  } catch (error) {
    console.error("Keep-alive API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Keep-alive API failed.",
      },
      { status: 500 }
