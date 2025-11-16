import RotationTable from "./components/RotationTable";

export default function Home() {
  return (
    <div className="text-gray-900 max-w-2xl mx-auto space-y-6">

      {/* タイトルカード */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">パチンコ回転数 記録</h1>
        <p className="text-gray-600">遊戯開始回転数に基づいて平均回転数を自動計算します。</p>
      </div>
      <RotationTable />
    </div>
  );
}
