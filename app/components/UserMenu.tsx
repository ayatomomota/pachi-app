"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";

type PropsType = {
  user: User;
};

export default function UserMenu({ user }: PropsType) {
  const [open, setOpen] = useState(false);

  const logout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      // ログアウト後の遷移
      window.location.href = "/auth/login";
    }
  };

  return (
    <div className="relative">
      {/* ユーザーアイコン */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
      >
        {/* 仮アイコン */}
        <span>{user.email?.[0]?.toUpperCase()}</span>
      </button>

      {/* ドロップダウンメニュー */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
          <div className="px-4 py-3 border-b text-sm">{user.email}</div>
          <Link
            href="/mypage"
            className="block px-4 py-e hover:bg-gray-100 text-sm"
          >
            マイページ
          </Link>

          <form action={logout} method="post">
            <button
              type="submit"
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
            >
              ログアウト
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
