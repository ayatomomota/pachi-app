"use client";
import Link from "next/link";
import { Play } from "@/types";

type Props = {
  play: Play;
  deletingId: string | null;
  handleDelete: (playId: string) => void;
};

export default function PlayListItem({ play, deletingId, handleDelete }: Props) {
  return (
    <li
      key={play.id}
      className="border border-gray-400 p-2 my-2 rounded-lg hover:bg-gray-200 transition-colors"
    >
      <Link href={`/play/${play.id}`} className="block">
        <p className="font-semibold">
          日付：
          {play?.playDate ? new Date(play.playDate).toLocaleDateString() : "なし"}
        </p>
        <p className="text-sm text-gray-600">遊戯台：{play.machine?.name}</p>
        <p className="text-sm text-gray-600">平均回転数：{play.average}</p>
      </Link>
      <div className="mt-2 text-right">
        <button
          onClick={() => handleDelete(play.id)}
          disabled={deletingId === play.id}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 active:bg-red-700 active:scale-95 transition disabled:bg-red-400 disabled:cursor-not-allowed"
        >
          {deletingId === play.id ? "削除中..." : "削除"}
        </button>
      </div>
    </li>
  );
}
