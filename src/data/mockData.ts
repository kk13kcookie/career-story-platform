import { Story, User } from "@/types";

export const mockStories: Story[] = [
  {
    id: "1",
    title:
      "未経験からエンジニアへの転職成功談：SIerからWeb系へのキャリアチェンジ",
    content:
      "新卒でSIerに入社したものの、Web開発への憧れが強く転職を決意。独学でReact、TypeScriptを習得し、ポートフォリオを作成。面接では技術力不足を補うために、学習意欲と成長性をアピール。結果として念願のWeb系企業に転職を果たしました。",
    author: {
      id: "author1",
      name: "田中 太郎",
      avatar: "👨‍💻",
      isPremium: true,
      company: "メルカリ",
      position: "フロントエンドエンジニア",
    },
    category: "success",
    previousCompany: "NTTデータ",
    currentCompany: "メルカリ",
    industry: "IT・Web",
    experience: "3年",
    likes: 124,
    comments: 23,
    createdAt: "2025-01-15T10:00:00Z",
    tags: ["エンジニア", "未経験", "Web系", "React"],
  },
  {
    id: "2",
    title: "30代でのキャリアチェンジ失敗談：準備不足が招いた転職の落とし穴",
    content:
      "商社からFinTechスタートアップへの転職を試みたが、業界理解不足とスキルギャップで失敗。準備期間が短く、企業研究も不十分でした。その後、しっかりと準備を重ね、現在は金融業界で新しいキャリアを築いています。",
    author: {
      id: "author2",
      name: "佐藤 花子",
      avatar: "👩‍💼",
      isPremium: true,
      company: "野村證券",
      position: "プロダクトマネージャー",
    },
    category: "failure",
    previousCompany: "三菱商事",
    currentCompany: "野村證券",
    industry: "金融",
    experience: "8年",
    likes: 89,
    comments: 31,
    createdAt: "2025-01-10T10:00:00Z",
    tags: ["30代", "失敗談", "FinTech", "学び"],
  },
  {
    id: "3",
    title: "コンサルから事業会社へ：戦略立案から実行へのキャリアシフト体験記",
    content:
      "戦略コンサルでの経験を活かし、事業会社での実行力を身につけたいと思い転職。面接でのアピールポイントや入社後のギャップ、そして新しい環境での成長について詳しく共有します。",
    author: {
      id: "author3",
      name: "山田 次郎",
      avatar: "👨‍💼",
      isPremium: false,
      company: "サイバーエージェント",
      position: "事業開発マネージャー",
    },
    category: "career-change",
    previousCompany: "マッキンゼー",
    currentCompany: "サイバーエージェント",
    industry: "IT・Web",
    experience: "5年",
    likes: 156,
    comments: 45,
    createdAt: "2025-01-08T10:00:00Z",
    tags: ["コンサル", "事業会社", "戦略", "実行力"],
  },
];

export const mockUser: User = {
  id: "user1",
  name: "あなた",
  email: "user@example.com",
  avatar: "👤",
  isPremium: false,
  joinedAt: "2024-12-01",
};
