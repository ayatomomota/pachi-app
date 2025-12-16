import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import UserMenu from "./UserMenu";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-gray-900 text-white px-6 py-3 shadow">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* ロゴ部分 */}
        <Link href="/play" className="text-xl font-bold tracking-wide">
          パチンコ記録
        </Link>
        {/* ナビゲーション部分 */}
        <nav className="flex items-center gap-4">
          {user?.email === "ayato1651@icloud.com" && (
            <Link href="/admin" className="mr-4 hover:text-gray-300">
              管理者ページ
            </Link>
          )}
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/auth/login" className="mr-4 hover:text-gray-300">
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
