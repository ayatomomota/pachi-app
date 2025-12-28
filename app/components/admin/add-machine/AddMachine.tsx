"use client";
import { useEffect, useState } from "react";
import Loading from "@/app/components/common/loading";
import MachineTable from "./MachineTable";
import { Machine } from "@/types";
import SubmitButton from "@/app/components/SubmitButton";

export default function AddMachine() {
  const [machineName, setMachineName] = useState("");
  const [machines, setMachines] = useState<Machine[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachines = async () => {
      const res = await fetch("/api/machines");
      const data = await res.json();
      setMachines(data);
    };
    fetchMachines();
  }, []);

  const formAction = async (formData: FormData) => {
    setError(null);
    const name = formData.get("machineName") as string;

    if (name.trim() === "") {
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

    setMachineName("");
    const updatedMachines = await res.json();
    setMachines((prevMachines) => 
      prevMachines ? [...prevMachines, updatedMachines].sort((a, b) => a.id - b.id) : [updatedMachines]
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Add Form */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">新規遊戯台の追加</h2>
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="machineName" className="block text-sm font-medium text-gray-700 mb-1">
                機器名
              </label>
              <input
                id="machineName"
                type="text"
                name="machineName"
                value={machineName}
                onChange={(e) => setMachineName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例：SアイムジャグラーEX"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <SubmitButton
              text="遊戯台を追加"
              loadingText="追加中..."
              className="w-full"
            />
          </form>
        </div>
      </div>

      {/* Right Column: Machine List */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">登録済み遊戯台一覧</h2>
        {machines ? <MachineTable machines={machines} /> : <Loading />}
      </div>
    </div>
  );
}

