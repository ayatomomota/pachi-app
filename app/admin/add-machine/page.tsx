import AddMachine from "@/app/components/admin/add-machine/AddMachine";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

export default function AddMachinePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-10">
          {/* Back link */}
          <Link
            href="/admin"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-4"
          >
            <FiChevronLeft className="w-5 h-5 mr-1" />
            管理者ダッシュボードに戻る
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            遊戯台の管理
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            新しい遊戯台の登録や、既存の台の情報を管理します。
          </p>
        </header>

        {/* Main Content */}
        <main>
          <AddMachine />
        </main>
      </div>
    </div>
  );
}
