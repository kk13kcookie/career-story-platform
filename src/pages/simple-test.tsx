export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Tailwind CSS テスト
        </h1>

        {/* 基本的なスタイルテスト */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">基本スタイル</h2>
          <p className="text-gray-600">このテキストは灰色で表示されます。</p>
        </div>

        {/* ホバーテスト */}
        <div className="space-y-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
            ホバーテスト ボタン
          </button>

          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            この要素にマウスを乗せると影が変わります
          </div>

          <div className="bg-green-500 hover:bg-green-700 text-white p-4 rounded-lg transition-colors duration-200 cursor-pointer">
            緑のボックス（ホバーで濃い緑に）
          </div>
        </div>
      </div>
    </div>
  );
}
