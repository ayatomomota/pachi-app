"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPlay } from "./actions";
import { Play } from "../../types";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function PlayListPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [plays, setPlays] = useState([]);

  const handleDelete = async (playId: string) => {
    const res = await fetch("/api/plays", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playId }),
    });

    if (res.ok) {
      setPlays(plays.filter((play: Play) => play.id !== playId));
    } else {
      console.error("削除に失敗しました。");
    }
  };

  // ページロード時にユーザー情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase]);

  // userが取得できたら遊戯データを取得
  useEffect(() => {
    // ヘッダーをレンダリングするためにリフレッシュ
    router.refresh();

    // ユーザIDを使って遊戯データを取得
    const fetchPlays = async () => {
      const res = await fetch("api/getPlays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await res.json();
      setPlays(data);
    };
    if (user) {
      fetchPlays();
    }
  }, [user, router]);

  return (
    <div className="shadow rounded p-4 m-2 text-gray-700">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">遊戯履歴</h1>
        <form action={() => createPlay(user?.id || "")}>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
          >
            追加
          </button>
        </form>
      </div>
      {user ? (
        <ul>
          {plays.map((play: Play) => (
            <li
              key={play.id}
              className="border border-gray-400 p-2 my-2 rounded-lg hover:bg-gray-200"
            >
              <Link href={`/play/${play.id}`}>
                <p>
                  日付：
                  {play?.playDate
                    ? new Date(play?.playDate).toLocaleString()
                    : "なし"}
                </p>
                <p>遊戯台：{play.machine?.name}</p>
                <p>平均回転数：{play.average}</p>
              </Link>
              <div>
                <button
                  onClick={() => handleDelete(play.id)}
                  className="px-2 bg-red-400 text-white rounded hover:bg-red-500"
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
