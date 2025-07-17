// 基本型の定義
export interface Story {
  id: string
  title: string
  content: string
  author: Author
  category: 'success' | 'failure' | 'career-change'
  previousCompany: string
  currentCompany: string
  industry: string
  experience: string
  likes: number
  comments: number
  createdAt: string
  tags: string[]
}

export interface Author {
  id: string
  name: string
  avatar: string
  isPremium: boolean
  company: string
  position: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  isPremium: boolean
  joinedAt: string
}