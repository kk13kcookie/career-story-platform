import React, { useState } from "react";
import { Header } from "@/components/layout";
import { StoryCard } from "@/components/story";
import { Button, Card } from "@/components/ui";
import { mockStories, mockUser } from "@/data/mockData";

export default function TestComponents() {
  const [currentView, setCurrentView] = useState("test");
  const [stories, setStories] = useState(mockStories);

  const handleLike = (storyId: string) => {
    setStories(
      stories.map((story) =>
        story.id === storyId ? { ...story, likes: story.likes + 1 } : story
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={mockUser}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          UIコンポーネントテスト
        </h1>

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
          </div>
        </Card>

        {/* StoryCard テスト */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            StoryCard コンポーネント
          </h2>
          <div className="space-y-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} onLike={handleLike} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
