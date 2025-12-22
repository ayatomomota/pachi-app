"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FiLogOut, FiUser } from "react-icons/fi"; // react-iconsからアイコンをインポート
import UserMenuLink from "./UserMenuLink";

export default function UserMenu({ user }: { user: User }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // メニューの外側をクリックしたときにメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Escapeキーでメニューを閉じる
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/auth/login");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* ユーザーアイコン */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg hover:opacity-90 transition-opacity"
      >
        {user.email?.[0]?.toUpperCase()}
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl z-10 origin-top-right transition-all duration-200 ease-out"
          style={{
            transform: isOpen ? "scale(1)" : "scale(0.95)",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.email}
              </p>
            </div>
            <UserMenuLink
              text="マイページ"
              icon={<FiUser className="w-5 h-5 text-gray-400" />}
              href="/mypage"
              setIsOpen={setIsOpen}
            />
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gray-100 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span>ログアウト</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
