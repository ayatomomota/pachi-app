"use client";
import React, { useState } from "react";
import { login } from "./actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await login(email, password);

    if (result?.error) {
      setError(result.error);
    }

    router.refresh();
    router.replace("/play");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="******"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 rounded-lg font-semibold py-3 text-white shadow hover:bg-blue-600 transition"
          >
            ログイン
          </button>
          <Link href="/auth/signUp">新規登録</Link>
        </form>
      </div>
    </div>
  );
}
