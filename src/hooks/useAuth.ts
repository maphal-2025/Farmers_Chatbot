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

    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session }, error: sessionError }) => {
        if (sessionError) {
          console.error('Session error:', sessionError)
          setError('Unable to connect to authentication service')
        }
        setUser(session?.user ?? null)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error getting session:', error)
        setError('Failed to connect to authentication service. Please check your internet connection.')
        setLoading(false)
      })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      return { data, error }
    } catch (err) {
      console.error('Sign up error:', err)
      return {
        data: { user: null, session: null },
        error: {
          message: 'Unable to connect to the server. Please check your internet connection and try again.',
          name: 'NetworkError',
          status: 0
        } as any
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    } catch (err) {
      console.error('Sign in error:', err)
      return {
        data: { user: null, session: null },
        error: {
          message: 'Unable to connect to the server. Please check your internet connection and try again.',
          name: 'NetworkError',
          status: 0
        } as any
      }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (err) {
      console.error('Sign out error:', err)
      return { error: null }
    }
  }

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  }
}