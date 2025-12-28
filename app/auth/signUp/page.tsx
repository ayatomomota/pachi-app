"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "./actions";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (password.length < 6) {
      setError("パスワードは6文字以上で入力してください。");
      setIsLoading(false);
      return;
    }

    const result = await signUp(email, password);
    setIsLoading(false);

    if (result?.error) {
      setError(
        "サインアップに失敗しました。このメールアドレスは既に使用されている可能性があります。"
      );
    } else {
      // Redirect to login page with a message to check email
      router.push("/auth/login?message=confirm-email");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">アカウント作成</h1>
            <p className="text-gray-600 mt-2">
              ようこそ！情報を入力してください。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </p>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="6文字以上"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "登録中..." : "新規登録"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            すでにアカウントをお持ちですか？{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:underline"
            >
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
