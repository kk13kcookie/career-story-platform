import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui";

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user?: any;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  user,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            {user && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{user.name}</span>
                <button
                  onClick={() => setCurrentView("profile")}
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <User size={16} />
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

      {/* モバイルメニュー */}
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
          </div>
        </div>
      )}
    </header>
  );
};
