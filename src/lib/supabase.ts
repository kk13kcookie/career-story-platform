import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

// 型定義（後で拡張）
export type Database = {
  public: {
    Tables: {
      stories: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          category: string
          created_at: string
        }
        Insert: {
          title: string
          content: string
          author_id: string
          category: string
        }
        Update: {
          title?: string
          content?: string
          category?: string
        }
      }
    }
  }
}