import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError('Database connection not configured')
      setLoading(false)
      return
    }

    supabase.auth.getSession()
      .then(({ data: { session }, error: sessionError }) => {
        if (sessionError) console.error('Session error:', sessionError)
        setUser(session?.user ?? null)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error getting session:', err)
        setLoading(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      return { data, error }
    } catch (err: any) {
      return {
        data: { user: null, session: null },
        error: { message: err?.message || 'Network error — please try again.', name: 'NetworkError', status: 0 } as any,
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      return { data, error }
    } catch (err: any) {
      return {
        data: { user: null, session: null },
        error: { message: err?.message || 'Network error — please try again.', name: 'NetworkError', status: 0 } as any,
      }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error('Sign out error:', err)
    }
  }

  return { user, loading, error, signUp, signIn, signOut }
}
