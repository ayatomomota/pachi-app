import { createClient } from "@/lib/supabase/client";

// ログイン処理
export const login = async (email: string, password: string) => {
  const supabase = createClient();

  // メールアドレスとパスワードで認証
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }
};
