import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Play } from "@/types";

export const usePlayList = () => {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [plays, setPlays] = useState<Play[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingPlays, setIsLoadingPlays] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setIsLoadingUser(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setIsLoadingUser(false);
  }, [supabase]);

  const fetchPlays = useCallback(async () => {
    if (!user) return;
    setIsLoadingPlays(true);
    try {
      const res = await fetch("/api/getPlays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json();
      setPlays(data);
    } catch (error) {
      console.error("プレイデータの取得に失敗しました:", error);
    } finally {
      setIsLoadingPlays(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isLoadingUser) {
      router.refresh();
      fetchPlays();
    }
  }, [user, router, isLoadingUser, fetchPlays]);

  const handleDelete = async (playId: string) => {
    setDeletingId(playId);
    try {
      const res = await fetch("/api/plays", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playId }),
      });
      if (res.ok) {
        setPlays((prevPlays) => prevPlays.filter((p) => p.id !== playId));
      } else {
        console.error("削除に失敗しました。");
      }
    } catch (error) {
      console.error("削除中にエラーが発生しました:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return {
    user,
    plays,
    isLoading: isLoadingUser || isLoadingPlays,
    deletingId,
    handleDelete,
  };
};
