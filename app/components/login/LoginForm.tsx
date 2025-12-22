import React, { useState } from "react";
import LoginSubmitButton from "./LoginSubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import LoginInputBox from "./LoginInputBox";

const LoginForm = () => {
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

        {/* ログインフォーム */}
        <form action={formAction} className="space-y-5">
          <LoginInputBox
            label="メールアドレス"
            type="email"
            name="email"
            placeholder="example@mail.com"
          />
          <LoginInputBox
            label="パスワード"
            type="password"
            name="password"
            placeholder="******"
          />
          <LoginSubmitButton text="ログイン" loadingText="ログイン中..." />
          <Link
            href="/auth/signUp"
            className="text-center text-blue-600 hover:underline block mt-4"
          >
            新規登録
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
