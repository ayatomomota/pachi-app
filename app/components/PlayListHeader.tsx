"use client";
import { useFormStatus } from "react-dom";
import { User } from "@supabase/supabase-js";
import { createPlay } from "@/app/play/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow active:bg-blue-800 active:scale-99 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
    >
      {pending ? "作成中..." : "追加"}
    </button>
  );
}

type Props = {
  user: User | null;
};

export default function PlayListHeader({ user }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">遊戯履歴</h1>
      {user && (
        <form action={() => createPlay(user.id)}>
          <SubmitButton />
        </form>
      )}
    </div>
  );
}
