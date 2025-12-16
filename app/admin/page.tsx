import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h1 className="font-bold">管理者ページ</h1>
      <h2>ここは管理者用ページです</h2>
      <Link href="/admin/add-machine" className="text-blue-500 underline">
        遊戯台追加ページへ
      </Link>
    </div>
  );
}
