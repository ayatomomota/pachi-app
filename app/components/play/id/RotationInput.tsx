"use client";
import RotationLabel from "./RotationLabel";

type Props = {
  startCount: number | null;
  setStartCount: (value: number | null) => void;
  inputTotal: number | "";
  setInputTotal: (value: number | "") => void;
  handleAdd: () => void;
  average: number | null;
  error: string | null;
};

export default function RotationInput({
  startCount,
  setStartCount,
  inputTotal,
  setInputTotal,
  handleAdd,
  average,
  error,
}: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 space-y-3">
      {error && <p className="text-red-400 font-semibold text-sm">{error}</p>}
      <div className="bg-gray-50 p-2 rounded-lg border text-sm">
        <span className="font-semibold">平均回転数：</span>
        <span className="text-blue-700 font-bold">{average}</span>回
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px]">
          <RotationLabel label="遊戯開始回転数">
            <input
              type="number"
              value={startCount ?? ""}
              onChange={(e) =>
                setStartCount(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              className="border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:ring-blue-400 text-black text-base w-full"
              placeholder="例：100"
            />
          </RotationLabel>
        </div>
        <div className="flex-1 min-w-[150px]">
          <RotationLabel label="累計回転数">
            <div className="flex gap-2">
              <input
                type="number"
                value={inputTotal}
                onChange={(e) =>
                  setInputTotal(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="border border-gray-300 px-2 py-1 rounded-lg text-base w-full placeholder:text-sm"
                placeholder="累計回転数を入力"
              />
              <button
                onClick={handleAdd}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm active:bg-blue-700 active:scale-99 transition whitespace-nowrap"
              >
                追加
              </button>
            </div>
          </RotationLabel>
        </div>
      </div>
    </div>
  );
}
