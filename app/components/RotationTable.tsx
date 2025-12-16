"use client";
import { useEffect, useState } from "react";
import { Record, Play } from "@/types";
import Loading from "@/app/play/[id]/loading";
import { updatePlayField } from "./rotationActions";

type Props = {
  playId: string;
};

export default function RotationTable({ playId }: Props) {
  const [records, setRecords] = useState<Record[]>([]);
  const [play, setPlay] = useState<Play | null>(null);
  const [inputTotal, setInputTotal] = useState<number | "">("");
  const [startCount, setStartCount] = useState<number | null>(null);
  const [average, setAverage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 初期ロード
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/records?playId=${playId}`);
      const data = await res.json();
      setRecords(data);
    })();
  }, [playId]);

  // playIdが渡されたら実行
  useEffect(() => {
    const fetchPlay = async () => {
      try {
        const res = await fetch(`/api/play/${playId}`);
        const fetchedPlay = await res.json();
        setPlay(fetchedPlay);
        setAverage(fetchedPlay.average);
        setStartCount((prev) =>
          prev === null ? fetchedPlay.startCount : prev
        );
      } catch (err) {
        console.error("APIエラー", err);
      }
    };
    fetchPlay();
  }, [playId]);

  const handleAdd = async () => {
    // バリデーション
    setError(null);
    if (startCount === null || inputTotal === "") {
      setError("遊戯開始回転数と累計回転数を入力してください");
      return;
    }

    // DBの開始回転数を更新
    const serverStartCount = play?.startCount ?? null;
    if (
      serverStartCount === null ||
      Number(serverStartCount) !== Number(startCount)
    ) {
      updatePlayField(playId, { startCount: startCount });
    }

    // 以前の累計回転数を取得
    const prevTotal =
      records.length === 0
        ? Number(startCount)
        : records[records.length - 1].total;

    // 新しい回転数のレコードを追加
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
    setRecords(updatedRecords);
    setInputTotal("");

    // 平均回転数を再計算して更新
    const newAverage =
      updatedRecords.length > 0
        ? Math.round(
            (updatedRecords.reduce((sum, r) => sum + r.diff, 0) /
              updatedRecords.length) *
              100
          ) / 100
        : 0;
    setAverage(newAverage);
    await updatePlayField(playId, { average: newAverage });
  };

  const handleDelete = async (recordId: string) => {
    // 削除処理
    const res = await fetch("/api/records", {
      method: "DELETE",
      body: JSON.stringify({ recordId }),
    });

    // レスポンスがOKでなければエラーメッセージを表示して終了
    if (!res.ok) {
      setError("削除に失敗しました。もう一度お試しください。");
      return;
    }

    // 削除したレコードID以外でフィルタリングして状態を更新
    const updatedRecords = records.filter((r) => r.id !== recordId);
    setRecords(updatedRecords);

    // 平均回転数を再計算して更新
    const newAverage =
      updatedRecords.length > 0
        ? Math.round(
            (updatedRecords.reduce((sum, r) => sum + r.diff, 0) /
              updatedRecords.length) *
              100
          ) / 100
        : 0;
    setAverage(newAverage);
    await updatePlayField(playId, { average: newAverage });
  };

  return (
    <div className="space-y-6">
      {/* 入力カード */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        {/* エラーメッセージ */}
        {error && <p className="text-red-400 font-semibold">{error}</p>}
        {/* 平均回転数 */}
        <div className="bg-gray-50 p-3 rounded-lg border">
          <span className="text-lg font-semibold">平均回転数：</span>
          <span className="text-blue-700 text-xl font-bold">{average}</span>回
        </div>
        {/* 遊戯開始回転数*/}
        <div>
          <label className="font-semibold block mb-1">遊戯開始回転数</label>
          <input
            type="number"
            value={startCount ?? ""}
            onChange={(e) => setStartCount(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-blue-400 text-black"
            placeholder="例：100"
          />
        </div>
        {/* 累計回転数 */}
        <div>
          <label className="font-semibold block mb-1">累計回転数</label>
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              value={inputTotal}
              onChange={(e) =>
                setInputTotal(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="累計回転数を入力"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              追加
            </button>
          </div>
        </div>
      </div>

      {/* テーブルカード */}
      <div className="bg-white shadow-md rounded-xl p-6 overflow-x-auto">
        {records ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border-b p-3 font-semibold text-center">No</th>
                <th className="border-b p-3 font-semibold text-center">
                  累計回転数
                </th>
                <th className="border-b p-3 font-semibold text-center">
                  回転数
                </th>
                <th className="border-b p-3 font-semibold text-center">削除</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.id} className="hover:bg-blue-50 transition">
                  <td className="border-b p-3 text-center">{index + 1}</td>
                  <td className="border-b p-3 text-right">{record.total}</td>
                  <td className="border-b p-3 text-right">{record.diff}</td>
                  <td className="border-b p-3 text-right">
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="text-white bg-red-500 rounded px-2 py-1 hover:bg-red-600"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}

        {records.length === 0 && (
          <p className="text-gray-500 text-center mt-4">記録がありません</p>
        )}
      </div>
    </div>
  );
}
