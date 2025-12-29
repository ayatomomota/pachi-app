import Link from "next/link";
import { FiPlusSquare, FiUsers, FiBarChart2, FiSettings } from "react-icons/fi";

export default function AdminPage() {
  // 管理者メニューの項目
  const adminMenuItems = [
    {
      href: "/admin/add-machine",
      icon: <FiPlusSquare className="w-8 h-8 text-blue-500" />,
      title: "遊戯台の管理",
      description: "新しい遊戯台の追加や既存台の編集を行います。",
    },
    {
      href: "#", // TODO: 将来的に実装
      icon: <FiUsers className="w-8 h-8 text-green-500" />,
      title: "ユーザー管理",
      description: "ユーザー情報の閲覧や権限の変更を行います。",
    },
    {
      href: "#", // TODO: 将来的に実装
      icon: <FiBarChart2 className="w-8 h-8 text-purple-500" />,
      title: "アナリティクス",
      description: "サイトのアクセス数や利用状況を確認します。",
    },
    {
      href: "#", // TODO: 将来的に実装
      icon: <FiSettings className="w-8 h-8 text-gray-500" />,
      title: "設定",
      description: "アプリケーションの全体的な設定を管理します。",
    },
  ];

  // 統計データのプレースホルダー
  const stats = [
    { label: "総ユーザー数", value: "1,234" },
    { label: "登録台数", value: "56" },
    { label: "本日のアクティブユーザー", value: "78" },
    { label: "保留中のレポート", value: "3" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            管理者ダッシュボード
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            サイト全体の管理と設定を行います。
          </p>
        </header>

        {/* 統計サマリー */}
        <section className="mb-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="ml-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.label}
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 管理ツールメニュー */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            管理ツール
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {adminMenuItems.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-blue-500"
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 rounded-lg bg-gray-100 p-3 group-hover:bg-blue-100 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
