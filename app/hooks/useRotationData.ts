import { useState, useEffect, useCallback } from "react";
import { Record, Play } from "@/types";
import { updatePlayField } from "../components/rotationActions";

// RotationTableコンポーネントのロジックを管理するカスタムフック
export const useRotationData = (playId: string) => {
  // 状態変数
  const [records, setRecords] = useState<Record[]>([]); // 遊技記録のリスト
  const [play, setPlay] = useState<Play | null>(null); // 現在のプレイ情報
  const [inputTotal, setInputTotal] = useState<number | "">(""); // 累計回転数入力値
  const [startCount, setStartCount] = useState<number | null>(null); // 遊技開始回転数
  const [average, setAverage] = useState<number | null>(null); // 平均回転数
  const [error, setError] = useState<string | null>(null); // エラーメッセージ
  const [isLoadingRecords, setIsLoadingRecords] = useState<boolean>(true); // レコードのロード中かどうかの状態

  // 平均回転数を計算する関数 (メモ化)
  const calculateAverage = useCallback((updatedRecords: Record[]) => {
    if (updatedRecords.length === 0) return 0;
    const totalDiff = updatedRecords.reduce((sum, r) => sum + r.diff, 0);
    return Math.round((totalDiff / updatedRecords.length) * 100) / 100;
  }, []);

  // 平均回転数を更新し、DBに保存する関数 (メモ化)
  const updateAverage = useCallback(
    async (updatedRecords: Record[]) => {
      const newAverage = calculateAverage(updatedRecords);
      setAverage(newAverage);
      await updatePlayField(playId, { average: newAverage });
    },
    [playId, calculateAverage]
  );

  // レコードをフェッチする関数 (メモ化)
  const fetchRecords = useCallback(async () => {
    setIsLoadingRecords(true); // ロード開始
    try {
      const res = await fetch(`/api/records?playId=${playId}`);
      if (!res.ok) throw new Error("レコードの読み込みに失敗しました。");
      const data = await res.json();
      setRecords(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("不明なエラーが発生しました。");
      }
    } finally {
      setIsLoadingRecords(false); // ロード終了
    }
  }, [playId]);

  // プレイ情報をフェッチする関数 (メモ化)
  const fetchPlay = useCallback(async () => {
    try {
      const res = await fetch(`/api/play/${playId}`);
      if (!res.ok) throw new Error("プレイ情報の読み込みに失敗しました。");
      const fetchedPlay = await res.json();
      setPlay(fetchedPlay);
      setAverage(fetchedPlay.average);
      setStartCount(fetchedPlay.startCount);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("不明なエラーが発生しました。");
      }
    }
  }, [playId]);

  // コンポーネントマウント時、またはplayId変更時にレコードとプレイ情報をフェッチ
  useEffect(() => {
    fetchRecords();
    fetchPlay();
  }, [fetchRecords, fetchPlay]);

  // レコードを追加するハンドラ
  const handleAdd = async () => {
    setError(null); // エラーをリセット
    // 入力値のバリデーション
    if (startCount === null || inputTotal === "") {
      setError("遊戯開始回転数と累計回転数を入力してください");
      return;
    }

    // 遊技開始回転数がDBと異なる場合、DBを更新
    if (play?.startCount !== startCount) {
      await updatePlayField(playId, { startCount: startCount });
    }

    // 以前の累計回転数を取得
    const prevTotal =
      records.length === 0 ? startCount : records[records.length - 1].total;

    // 新しいレコードをDBに追加
    const res = await fetch("/api/records", {
      method: "POST",
      body: JSON.stringify({
        totalRotation: Number(inputTotal),
        prevTotalRotation: prevTotal,
        playId: playId,
      }),
    });

    if (!res.ok) {
      setError("保存に失敗しました。もう一度お試しください。");
      return;
    }

    const newRecord = await res.json();
    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords); // stateを更新
    setInputTotal(""); // 入力値をクリア
    await updateAverage(updatedRecords); // 平均回転数を更新
  };

  // 指定したレコードを削除するハンドラ
  const handleDelete = async (recordId: string) => {
    const res = await fetch("/api/records", {
      method: "DELETE",
      body: JSON.stringify({ recordId }),
    });

    if (!res.ok) {
      setError("削除に失敗しました。もう一度お試しください。");
      return;
    }

    const updatedRecords = records.filter((r) => r.id !== recordId);
    setRecords(updatedRecords); // stateを更新
    await updateAverage(updatedRecords); // 平均回転数を更新
  };

  // 一番下のレコードを削除するハンドラ
  const handleDeleteLast = async () => {
    if (records.length === 0) return; // レコードがない場合は何もしない
    const lastRecordId = records[records.length - 1].id;
    await handleDelete(lastRecordId); // 最後のレコードを削除
  };

  // カスタムフックが提供する値
  return {
    records,             // 全ての遊技記録
    play,                // 現在のプレイ情報
    inputTotal,          // 累計回転数の入力値
    setInputTotal,       // 累計回転数入力値を設定する関数
    startCount,          // 遊技開始回転数
    setStartCount,       // 遊技開始回転数を設定する関数
    average,             // 平均回転数
    error,               // エラーメッセージ
    isLoadingRecords,    // レコードがロード中かどうかの状態
    handleAdd,           // レコード追加ハンドラ
    handleDeleteLast,    // 一番下のレコード削除ハンドラ
  };
};
