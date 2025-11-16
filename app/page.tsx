import RotationTable from "./components/RotationTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">パチンコ回転数 記録</h1>
      <RotationTable />
    </main>
  );
}
