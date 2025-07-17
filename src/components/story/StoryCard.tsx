import React from "react";
import { Heart, MessageCircle, Building, Clock, Crown } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { Story } from "@/types";

interface StoryCardProps {
  story: Story;
  onLike?: (id: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onLike }) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "success":
        return "転職成功談";
      case "failure":
        return "転職失敗談";
      case "career-change":
        return "キャリアチェンジ";
      default:
        return "";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "success":
        return "bg-green-100 text-green-800";
      case "failure":
        return "bg-red-100 text-red-800";
      case "career-change":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card hover className="overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
            {story.author.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">
                {story.author.name}
              </h3>
              {story.author.isPremium && (
                <Crown className="w-4 h-4 text-yellow-500" />
              )}
            </div>
            <p className="text-sm text-gray-600">
              {story.author.position} at {story.author.company}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
            story.category
          )}`}
        >
          {getCategoryLabel(story.category)}
        </span>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
        {story.title}
      </h2>

      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
        <div className="flex items-center space-x-1">
          <Building className="w-4 h-4" />
          <span>
            {story.previousCompany} → {story.currentCompany}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>経験{story.experience}</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{story.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {story.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onLike?.(story.id)}
            className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">{story.likes}</span>
          </button>
          <div className="flex items-center space-x-1 text-gray-600">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{story.comments}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            詳細を見る
          </Button>
          {story.author.isPremium && (
            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              相談する
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
