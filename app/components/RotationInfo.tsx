"use client";
import { useEffect, useState } from "react";
import { Machine, Play } from "@/types";
import { updatePlayField } from "./rotationActions";

type Props = {
  playId: string;
};

// 遊戯情報（遊戯台、日付など）を表示するコンポーネント
export default function RotationInfo({ playId }: Props) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [machineId, setMachineId] = useState<string>("");
  const [play, setPlay] = useState<Play | null>(null);

  // playIdが変わったら遊戯情報を取得
  useEffect(() => {
    // 遊戯台情報の取得
    const fetchPlayInfo = async () => {
      try {
        const res = await fetch(`/api/play/${playId}`);
        const fetchedPlay = await res.json();
        setPlay(fetchedPlay);
      } catch (error) {
        console.error("遊戯情報の取得に失敗しました:", error);
      }
    };
    fetchPlayInfo();
  }, [playId]);

  // 初回レンダリング時に遊戯台一覧を取得
  useEffect(() => {
    // ここでDB/APIから遊戯台の一覧を取得
    const fetchMachines = async () => {
      try {
        const res = await fetch("/api/machines");
        const fetchedMachines = await res.json();
        setMachines(fetchedMachines);
      } catch (error) {
        console.error("遊戯台一覧の取得に失敗しました:", error);
      }
    };
    fetchMachines();
  }, []);

  useEffect(() => {
    updatePlayField(playId, { machineId: machineId });
  }, [machineId]);

  useEffect(() => {
    const convertedDate = new Date(startDate);
    updatePlayField(playId, { playDate: convertedDate });
  }, [startDate]);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
      {/* 情報 */}
      <div className="flex">
        <label className="font-semibold block my-1 pr-4">日付</label>
        <input
          type="date"
          className="border border-gray-300 rounded-md p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="flex">
        <label className="font-semibold block my-1 pr-4">遊戯台</label>
        <select
          value={play?.machineId}
          onChange={(e) => setMachineId(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option key="0" value="0">
            ---
          </option>
          {machines.map((machine) => (
            <option key={machine.id} value={machine.id}>
              {machine.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
