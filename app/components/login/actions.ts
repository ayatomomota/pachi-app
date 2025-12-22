"use client";
import { createClient } from "@/lib/supabase/client";

// ログイン処理
export const login = async (email: string, password: string) => {
  // バリデーション: メールアドレスとパスワードが空の場合はエラーを返す
  if (!email || !password) {
    return { error: "メールアドレスとパスワードを入力してください。" };
  }

  const supabase = createClient();

  // メールアドレスとパスワードで認証
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // エラーがない場合は、何も返さずに正常終了
  if (!error) {
    return;
  }

  // エラー内容に応じて、ユーザーフレンドリーなメッセージを返す
  switch (error.message) {
    case "Invalid login credentials":
      return { error: "メールアドレスまたはパスワードが正しくありません。" };
    default:
      return { error: "ログインに失敗しました。時間をおいて再度お試しください。" };
  }
};
