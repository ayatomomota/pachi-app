import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// ログアウト処理API
export async function POST() {
  const supabase = await createClient();

  // サインアウト処理
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
