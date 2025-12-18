"use client";
import { Play } from "@/types";
import PlayListItem from "./PlayListItem";

type Props = {
  plays: Play[];
  deletingId: string | null;
  handleDelete: (playId: string) => void;
};

export default function PlayList({ plays, deletingId, handleDelete }: Props) {
  if (plays.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        まだ遊戯記録がありません。
      </p>
    );
  }

  return (
    <ul>
      {plays.map((play) => (
        <PlayListItem
          key={play.id}
          play={play}
          deletingId={deletingId}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
