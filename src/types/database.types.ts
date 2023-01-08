export type Json = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

// export default sql;

export interface Database {
  public: {
    Tables: {
      social_event_1: {
        Row: {
          id: number
          user_id: string
          promise: string
          email: string | null
          submission: string | null
          inserted: string
          updated: string
          fulfilled: boolean | null
          deleted: string | null
        }
        Insert: {
          id?: number
          user_id: string
          username: string
          promise: string
          email?: string | null
          submission?: string | null
          inserted?: string
          updated?: string,
          fulfilled?: boolean | null
          deleted?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          username?: string
          promise?: string
          email?: string | null
          submission?: string | null
          inserted?: string
          updated?: string,
          fulfilled?: boolean | null
          deleted?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
