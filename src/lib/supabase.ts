import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          id: string
          user_id: string
          message: string
          sender: 'user' | 'bot'
          category: string | null
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          sender: 'user' | 'bot'
          category?: string | null
          timestamp: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          sender?: 'user' | 'bot'
          category?: string | null
          timestamp?: string
          created_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          language: string
          location: string | null
          farm_size: string | null
          primary_crops: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          language: string
          location?: string | null
          farm_size?: string | null
          primary_crops?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          language?: string
          location?: string | null
          farm_size?: string | null
          primary_crops?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      weather_alerts: {
        Row: {
          id: string
          location: string
          alert_type: string
          title: string
          message: string
          severity: 'low' | 'medium' | 'high'
          active: boolean
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          location: string
          alert_type: string
          title: string
          message: string
          severity: 'low' | 'medium' | 'high'
          active?: boolean
          created_at?: string
          expires_at: string
        }
        Update: {
          id?: string
          location?: string
          alert_type?: string
          title?: string
          message?: string
          severity?: 'low' | 'medium' | 'high'
          active?: boolean
          created_at?: string
          expires_at?: string
        }
      }
    }
  }
}