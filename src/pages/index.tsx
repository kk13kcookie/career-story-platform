import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/layout";
import { StoryCard } from "@/components/story";
import { Button, Card, Input } from "@/components/ui";
import { mockStories, mockUser } from "@/data/mockData";
import { Story, User } from "@/types";

export default function Home() {
  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "success" | "failure" | "career-change"
  >("all");
  const [user, setUser] = useState<User | null>(null);
  const [stories, setStories] = useState<Story[]>(mockStories);

  // 以下は既存のコードそのまま...
  // ユーザー状態をシミュレート
  useEffect(() => {
    setUser(mockUser);
  }, []);

  // ストーリーフィルタリング
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // いいね機能
  const handleLike = (storyId: string) => {
    setStories(
      stories.map((story) =>
        story.id === storyId ? { ...story, likes: story.likes + 1 } : story
      )
    );
  };

  // カテゴリーラベル
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "success":
        return "転職成功談";
      case "failure":
        return "転職失敗談";
      case "career-change":
        return "キャリアチェンジ";
      default:
        return "すべて";
    }
  };

  // 他のページビュー（投稿、プレミアム、プロフィール）
  if (currentView !== "home") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          currentView={currentView}
          setCurrentView={setCurrentView}
          user={user}
        />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {currentView === "post" && "📝 ストーリー投稿"}
              {currentView === "premium" && "💎 プレミアムプラン"}
              {currentView === "profile" && "👤 プロフィール"}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {currentView === "post" &&
                "あなたのキャリアストーリーを共有しましょう"}
              {currentView === "premium" &&
                "転職経験者に直接相談できる特別なプランです"}
              {currentView === "profile" && "アカウント設定と統計情報"}
            </p>
            <Button onClick={() => setCurrentView("home")} size="lg">
              ホームに戻る
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヒーローセクション */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            リアルなキャリアストーリーで、
            <br />
            あなたの転職を成功に導く
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            転職経験者の生の声から学び、直接アドバイスをもらえるプラットフォーム
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setCurrentView("post")}
              className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              ストーリーを投稿する
            </button>
            <button
              onClick={() => setCurrentView("premium")}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              プレミアムプランを見る
            </button>
          </div>
        </div>

        {/* 統計情報セクション */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,500+</div>
            <div className="text-gray-600">キャリアストーリー</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">350+</div>
            <div className="text-gray-600">転職成功者</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">満足度</div>
          </Card>
        </div>

        {/* 検索・フィルター */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="ストーリーを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["all", "success", "failure", "career-change"] as const).map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {getCategoryLabel(category)}
                  </button>
                )
              )}
            </div>
          </div>
        </Card>

        {/* ストーリー一覧 */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              キャリアストーリー
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredStories.length}件)
              </span>
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>並び順:</span>
              <select className="border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="newest">新着順</option>
                <option value="popular">人気順</option>
                <option value="comments">コメント数順</option>
              </select>
            </div>
          </div>

          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <StoryCard key={story.id} story={story} onLike={handleLike} />
            ))
          ) : (
            <Card className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                該当するストーリーが見つかりません
              </h3>
              <p className="text-gray-600 mb-6">
                検索条件を変更するか、新しいストーリーを投稿してみてください
              </p>
              <Button onClick={() => setCurrentView("post")}>
                ストーリーを投稿する
              </Button>
            </Card>
          )}
        </div>

        {/* ページネーション（将来の拡張用） */}
        {filteredStories.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                前へ
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                次へ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* フッター */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                CareerStory
              </h3>
              <p className="text-gray-600 text-sm">
                リアルなキャリアストーリーで、あなたの転職を成功に導くプラットフォーム
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">サービス</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    ストーリー閲覧
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    投稿する
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    相談機能
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    プレミアムプラン
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">サポート</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    ヘルプセンター
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    お問い合わせ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    利用規約
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    プライバシーポリシー
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">フォロー</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    ブログ
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 CareerStory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
