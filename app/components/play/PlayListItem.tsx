"use client";
import Link from "next/link";
import { Play } from "@/types";
import PlaySubmitButton from "./PlaySubmitButton";

type Props = {
  play: Play;
  handleDelete: (playId: string) => void;
};

export default function PlayListItem({ play, handleDelete }: Props) {
  return (
    <li
      key={play.id}
      className="border border-gray-400 p-2 my-2 rounded-lg hover:bg-gray-200 transition-colors"
    >
      <Link href={`/play/${play.id}`} className="block">
        <p className="font-semibold">
          日付：
          {play?.playDate
            ? new Date(play.playDate).toLocaleDateString()
            : "なし"}
        </p>
        <p className="text-sm text-gray-600">遊戯台：{play.machine?.name}</p>
        <p className="text-sm text-gray-600">平均回転数：{play.average}</p>
      </Link>
      <div className="mt-2 text-right">
        <PlaySubmitButton
          text="削除"
          loadingText="削除中..."
          onClick={() => handleDelete(play.id)}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700"
        />
      </div>
    </li>
  );
}
