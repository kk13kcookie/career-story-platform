import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Card, Input } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";

export const SignupForm: React.FC = () => {
  const router = useRouter();
  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // パスワード確認
    if (formData.password !== formData.confirmPassword) {
      setError("パスワードが一致しません");
      setIsLoading(false);
      return;
    }

    // パスワード強度チェック
    if (formData.password.length < 6) {
      setError("パスワードは6文字以上で入力してください");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.displayName
      );

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">登録完了！</h1>
        <p className="text-gray-600 mb-6">
          確認メールを送信しました。
          <br />
          メール内のリンクをクリックしてアカウントを有効化してください。
        </p>
        <Button onClick={() => router.push("/auth/login")}>
          ログインページへ
        </Button>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">新規登録</h1>
        <p className="text-gray-600 mt-2">CareerStoryアカウントを作成</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            表示名
          </label>
          <Input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleInputChange}
            placeholder="田中太郎"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メールアドレス
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your-email@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            パスワード
          </label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="6文字以上のパスワード"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            パスワード確認
          </label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="パスワードを再入力"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "登録中..." : "アカウント作成"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          既にアカウントをお持ちの方は{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ログイン
          </button>
        </p>
      </div>
    </Card>
  );
};
