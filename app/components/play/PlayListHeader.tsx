"use client";
import { User } from "@supabase/supabase-js";
import { handleAddPlay } from "@/app/components/play/actions";
import PlaySubmitButton from "./PlaySubmitButton";

type Props = {
  user: User | null;
};

export default function PlayListHeader({ user }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">遊戯履歴</h1>
      {user && (
        <PlaySubmitButton
          text="追加"
          loadingText="作成中..."
          onClick={() => handleAddPlay(user.id)}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400"
        />
      )}
    </div>
  );
}
