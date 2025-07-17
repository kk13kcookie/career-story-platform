import React from "react";
import { Search } from "lucide-react";
import { Button, Card, Input } from "@/components/ui";

export default function TestComponents() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          UIコンポーネントテスト
        </h1>

        {/* Tailwind CSS 基本テスト */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Tailwind CSS テスト</h2>
          <div className="space-y-4">
            {/* 直接的なホバーテスト */}
            <div className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded transition-colors duration-200 cursor-pointer">
              このボックスにマウスを乗せると色が変わるはずです
            </div>

            {/* シャドウホバーテスト */}
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 border cursor-pointer">
              このボックスにマウスを乗せると影が濃くなるはずです
            </div>
          </div>
        </div>

        {/* Button テスト */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Button コンポーネント</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
            <div className="flex gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div>
              <Button disabled>Disabled Button</Button>
            </div>
          </div>
        </Card>

        {/* Card テスト */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold mb-2">通常のCard</h3>
            <p>これは通常のCardコンポーネントです。</p>
          </Card>

          <Card hover>
            <h3 className="text-lg font-semibold mb-2">ホバーCard</h3>
            <p>マウスを乗せると影が濃くなります。</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
