import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Card, Input } from "@/components/ui";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/hooks/useAuth";

interface StoryFormData {
  title: string;
  content: string;
  category:
    | "success"
    | "failure"
    | "career-change"
    | "side-business"
    | "side-job"
    | "startup";
  previousCompany: string;
  currentCompany: string;
  industry: string;
  experience: string;
  tags: string;
}

export const StoryForm: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState<StoryFormData>({
    title: "",
    content: "",
    category: "success",
    previousCompany: "",
    currentCompany: "",
    industry: "",
    experience: "",
    tags: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      setError("ログインが必要です");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const { data, error } = await supabase
        .from("stories")
        .insert([
          {
            title: formData.title,
            content: formData.content,
            category: formData.category,
            previous_company: formData.previousCompany,
            current_company: formData.currentCompany,
            industry: formData.industry,
            experience: formData.experience,
            tags: tagsArray,
            author_id: user.id,
          },
        ])
        .select();

      if (error) throw error;

      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "投稿に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">ログインが必要です</h2>
        <p className="text-gray-600 mb-6">
          ストーリーを投稿するにはログインしてください
        </p>
        <Button onClick={() => router.push("/auth/login")}>
          ログインページへ
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        キャリアストーリーを投稿
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ストーリータイトル *
          </label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="例：未経験からエンジニアへの転職成功談"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリー *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="success">転職成功談</option>
              <option value="failure">転職失敗談</option>
              <option value="career-change">キャリアチェンジ</option>
              <option value="side-business">複業</option>
              <option value="side-job">副業</option>
              <option value="startup">起業</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              業界
            </label>
            <Input
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="例：IT・Web"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              転職前の会社（または現在の会社）
            </label>
            <Input
              name="previousCompany"
              value={formData.previousCompany}
              onChange={handleInputChange}
              placeholder="例：NTTデータ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              転職後の会社（または活動先）
            </label>
            <Input
              name="currentCompany"
              value={formData.currentCompany}
              onChange={handleInputChange}
              placeholder="例：メルカリ"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            経験年数
          </label>
          <Input
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="例：3年"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ストーリー内容 *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={12}
            placeholder="転職のきっかけ、準備期間、面接での経験、入社後の感想など、できるだけ詳しく書いてください..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            タグ（カンマ区切り）
          </label>
          <Input
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="例：エンジニア, 未経験, Web系, React"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
            disabled={isSubmitting}
          >
            キャンセル
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "投稿中..." : "ストーリーを投稿"}
          </Button>
        </div>
      </form>
    </Card>
  );
};
