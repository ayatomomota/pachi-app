"use client";
import { useEffect, useState } from "react";
import { Machine, Play } from "@/types";
import { updatePlayField } from "./rotationActions";
import RotationLabel from "./rotation/RotationLabel";

type Props = {
  playId: string;
};

// 遊戯情報（遊戯台、日付など）を表示するコンポーネント
export default function RotationInfo({ playId }: Props) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [userEnteredDate, setUserEnteredDate] = useState<string | null>(null);
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

  // --- stateの派生ロジック ---
  const initialDate = play?.playDate
    ? new Date(play.playDate).toISOString().split("T")[0]
    : "";

  const displayDate = userEnteredDate !== null ? userEnteredDate : initialDate;
  // ---

  useEffect(() => {
    // machineIdが空でない場合のみDBを更新
    if (machineId) {
      updatePlayField(playId, { machineId: machineId });
    }
  }, [machineId, playId]);

  useEffect(() => {
    // displayDateが空でない、かつDBのplayDateと異なる場合のみ更新
    if (displayDate !== initialDate) {
      const convertedDate = new Date(displayDate);
      updatePlayField(playId, { playDate: convertedDate });
    }
  }, [displayDate, initialDate, playId]);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 space-y-3">
      {/* 情報 */}
      <RotationLabel label="日付">
        <input
          type="date"
          className={`w-full rounded-lg border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-blue-400 transition-all duration-200 ${
            displayDate ? "text-gray-700" : "text-gray-400"
          }`}
          value={displayDate}
          onChange={(e) => setUserEnteredDate(e.target.value)}
        />
      </RotationLabel>
      <RotationLabel label="遊戯台">
        <select
          value={play?.machineId ?? ""}
          onChange={(e) => setMachineId(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-blue-400 transition-all duration-200"
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
      </RotationLabel>
    </div>
  );
}
