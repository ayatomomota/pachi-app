"use client";

import { usePlayList } from "@/app/hooks/usePlayList";
import Loading from "@/app/play/loading";
import PlayListHeader from "@/app/components/play/PlayListHeader";
import PlayList from "@/app/components/play/PlayList";

export default function PlayListPage() {
  const { user, plays, isLoading, handleDelete } = usePlayList();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="shadow rounded p-4 m-2 text-gray-700">
      <PlayListHeader user={user} />
      {user ? (
        <PlayList plays={plays} handleDelete={handleDelete} />
      ) : (
        <p className="text-center text-gray-500 mt-4">ログインしてください。</p>
      )}
    </div>
  );
}
