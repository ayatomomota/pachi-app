"use client";
import { useEffect, useState } from "react";
import Loading from "../admin/add-machine/loading";

type Machine = {
  id: number;
  name: string;
};

export default function AddMachine() {
  const [machineName, setMachineName] = useState("");
  const [machines, setMachines] = useState<Machine[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/machines");
      const data = await res.json();
      setMachines(data);
    })();
  }, [machineName]);

  const handleAdd = async () => {
    setError(null);
    if (machineName === "") {
      setError("機器名を入力してください");
    }

    const res = await fetch("/api/machines", {
      method: "POST",
      body: JSON.stringify({ name: machineName }),
    });

    if (!res.ok) {
      setError("保存に失敗しました。もう一度お試しください。");
      return;
    }

    setMachineName("");
  };

  return (
    <div className="m-2">
      <h1 className="font-bold p-2">遊戯台追加ページ</h1>
      <h2 className="px-2">ここは遊戯台追加用ページです</h2>
      {/* エラーメッセージ */}
      {error && <div className="px-2 text-red-500">{error}</div>}
      <div className="p-2">
        <span>機器名</span>
        <input
          type="text"
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
          className="border border-gray-500 m-2 p-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        onClick={handleAdd}
        className="border hover:bg-amber-300 border-gray-400 m-2 p-2 bg-blue-200 shadow rounded-md"
      >
        遊戯台追加
      </button>
      <div>
        <h2 className="py-4 font-semibold">遊戯台一覧</h2>
        {machines ? (
          <table className="border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border">編集</th>
                <th className="border">ID</th>
                <th className="border">機器名</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => (
                <tr key={machine.id}>
                  <td className="border px-4 py-2">
                    <button className="text-white bg-gray-500 px-2 py-1 rounded">
                      編集
                    </button>
                  </td>
                  <td className="border px-4 py-2">{machine.id}</td>
                  <td className="border px-4 py-2">{machine.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
