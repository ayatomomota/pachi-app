import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { FiDatabase } from "react-icons/fi";

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Site Title */}
          <div className="flex-shrink-0">
            <Link href={user ? "/play" : "/"} className="flex items-center gap-2">
              <FiDatabase className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800 tracking-tight">
                パチンコ記録
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signUp"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  新規登録
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
