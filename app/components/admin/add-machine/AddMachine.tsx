"use client";
import { useEffect, useState } from "react";
import Loading from "@/app/components/common/loading"; // Loadingコンポーネントのパスを修正
import MachineTable from "./MachineTable";
import { Machine } from "@/types";
import RotationLabel from "@/app/components/play/id/RotationLabel"; // RotationLabelをインポート
import SubmitButton from "@/app/components/SubmitButton"; // SubmitButtonをインポート

export default function AddMachine() {
  const [machineName, setMachineName] = useState("");
  const [machines, setMachines] = useState<Machine[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 初回ロード時と機器追加後にマシンリストをフェッチ
  useEffect(() => {
    const fetchMachines = async () => {
      const res = await fetch("/api/machines");
      const data = await res.json();
      setMachines(data);
    };
    fetchMachines();
  }, []); // machineNameが変更されたときではなく、初回と追加後にリフレッシュする

  const formAction = async (formData: FormData) => {
    setError(null);
    const name = formData.get("machineName") as string; // name属性から取得

    if (name === "") {
      setError("機器名を入力してください");
      return;
    }

    const res = await fetch("/api/machines", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      setError("保存に失敗しました。もう一度お試しください。");
      return;
    }

    setMachineName(""); // 入力フィールドをクリア
    // マシンリストを再フェッチしてUIを更新
    const refetch = await fetch("/api/machines");
    const updatedMachines = await refetch.json();
    setMachines(updatedMachines);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-xl space-y-4">
      {/* カード型のスタイル */}
      <h1 className="text-2xl font-bold">遊戯台追加ページ</h1>
      <h2 className="text-gray-600">ここは遊戯台追加用ページです</h2>
      {/* エラーメッセージ */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form action={formAction} className="space-y-4">
        <RotationLabel label="機器名">
          <input
            type="text"
            name="machineName" // name属性を追加
            value={machineName}
            onChange={(e) => setMachineName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200 w-full" // スタイル統一
            placeholder="例：ジャグラー"
          />
        </RotationLabel>
        <SubmitButton
          text="遊戯台追加"
          loadingText="追加中..."
          className="w-auto px-4 py-2"
        />
        {/* SubmitButtonを使用 */}
      </form>
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-3">遊戯台一覧</h2>
        {machines ? <MachineTable machines={machines} /> : <Loading />}
      </div>
    </div>
  );
}
