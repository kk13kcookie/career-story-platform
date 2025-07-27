import React, { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, profile, isAuthenticated, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
              onClick={() => setCurrentView("home")}
            >
              CareerStory
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentView("home")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "home"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              ホーム
            </button>
            <button
              onClick={() => setCurrentView("post")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "post"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              投稿する
            </button>
            <button
              onClick={() => setCurrentView("premium")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                currentView === "premium"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              プレミアム
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>{profile?.display_name || user.email}</span>
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    {profile?.avatar_emoji || "👤"}
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCurrentView("profile");
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <User className="w-4 h-4 mr-2" />
                        プロフィール
                      </button>
                      <hr />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        ログアウト
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push("/auth/login")}
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  ログイン
                </button>
                <button
                  onClick={() => router.push("/auth/signup")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  新規登録
                </button>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                setCurrentView("home");
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left transition-colors"
            >
              ホーム
            </button>
            <button
              onClick={() => {
                setCurrentView("post");
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left transition-colors"
            >
              投稿する
            </button>
            <button
              onClick={() => {
                setCurrentView("premium");
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left transition-colors"
            >
              プレミアム
            </button>

            {!isAuthenticated && (
              <>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    router.push("/auth/login");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 w-full text-left transition-colors"
                >
                  ログイン
                </button>
                <button
                  onClick={() => {
                    router.push("/auth/signup");
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 w-full text-left transition-colors"
                >
                  新規登録
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
