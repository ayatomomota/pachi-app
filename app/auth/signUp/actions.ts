import { createClient } from "@/lib/supabase/client";

// サインアップ処理
export const signUp = async (email: string, password: string) => {
  const supabase = createClient();

  // サインアップ（auth.userにユーザー作成）
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("SignUp Error:", error.message);
    return { error: error.message };
  }

  return { success: true };
};
