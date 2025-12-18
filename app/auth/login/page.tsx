"use client";
import React, { useState } from "react";
import { login } from "./actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SubmitButton from "@/app/components/SubmitButton"; // SubmitButtonをインポート

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const formAction = async (formData: FormData) => {
    setError(null);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await login(email, password);

    if (result?.error) {
      setError(result.error);
    } else {
      router.refresh();
      router.replace("/play");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        {/* エラーメッセージ */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form action={formAction} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              name="email" // name属性を追加
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="example@mail.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              パスワード
            </label>
            <input
              type="password"
              name="password" // name属性を追加
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="******"
            />
          </div>
          <SubmitButton text="ログイン" loadingText="ログイン中..." />
          <Link href="/auth/signUp" className="text-center text-blue-600 hover:underline block mt-4">新規登録</Link>
        </form>
      </div>
    </div>
  );
}
