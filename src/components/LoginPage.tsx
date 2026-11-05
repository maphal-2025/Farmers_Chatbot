import React, { useState } from 'react';
import { Mail, Lock, Sprout, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { LanguageSelector } from './LanguageSelector';

export const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signIn, signUp } = useAuth();

  const reset = () => { setError(''); setSuccess(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    reset();

    if (mode === 'forgot') {
      setLoading(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setSuccess('Password reset link sent — check your inbox.');
        setTimeout(() => { setMode('signin'); setSuccess(''); setEmail(''); }, 3000);
      } catch (err: any) {
        setError(err.message || 'Unable to send reset email.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = mode === 'signup'
        ? await signUp(email, password)
        : await signIn(email, password);

      const { error } = result;

      if (error) {
        const msg = error.message || '';
        if (msg.includes('Invalid login credentials') || msg.includes('invalid_credentials')) {
          setError('Incorrect email or password. Please try again.');
        } else if (msg.includes('User already registered') || msg.includes('already registered')) {
          setError('An account with this email already exists. Please sign in instead.');
        } else if (msg.includes('Email not confirmed')) {
          setError('Please confirm your email address before signing in.');
        } else if (msg.includes('Network') || msg.includes('fetch') || msg.includes('Failed to fetch')) {
          setError('Connection error. Please check your internet and try again.');
        } else if (msg.includes('JWT') || msg.includes('expired') || msg.includes('token')) {
          setError('Authentication service error. Please refresh the page and try again.');
        } else {
          setError(msg || 'An error occurred. Please try again.');
        }
      } else if (mode === 'signup') {
        setSuccess('Account created successfully! Signing you in...');
        setTimeout(() => { setSuccess(''); }, 2500);
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next: 'signin' | 'signup' | 'forgot') => {
    reset();
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMode(next);
  };

  const features = [
    'AI-powered crop & livestock advice',
    'Real-time weather forecasts',
    'Live commodity market prices',
    'Government schemes & funding info',
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(/FB_IMG_1752006509141.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-green-900/40" />

      {/* Language selector */}
      <div className="absolute top-5 right-5 z-10">
        <LanguageSelector />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-4 flex flex-col lg:flex-row gap-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Left panel — branding */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-b from-green-700 to-green-900 p-10 w-5/12 text-white">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Sprout size={26} className="text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold leading-tight">AgriAssist</h1>
                <p className="text-green-300 text-xs">Smart Farming Assistant</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold leading-snug mb-4">
              Empowering South African Farmers
            </h2>
            <p className="text-green-200 text-sm leading-relaxed mb-8">
              Get expert agricultural advice in your language, 24/7 — from Johannesburg to the Eastern Cape.
            </p>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-green-100">
                  <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-green-400 text-xs mt-8">
            Supporting SDG 2: Zero Hunger through AI technology
          </p>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 bg-white p-8 sm:p-10">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Sprout size={22} className="text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">AgriAssist</h1>
          </div>

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'signin' && 'Welcome back'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'forgot' && 'Reset your password'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {mode === 'signin' && 'Sign in to access your farming dashboard'}
              {mode === 'signup' && 'Join thousands of farmers getting expert advice'}
              {mode === 'forgot' && "Enter your email and we'll send a reset link"}
            </p>
          </div>

          {success && (
            <div className="mb-5 flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
              <CheckCircle2 size={16} className="flex-shrink-0" />
              {success}
            </div>
          )}
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="farmer@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all"
                  />
                </div>
              </div>
            )}

            {mode === 'signin' && (
              <div className="flex justify-end">
                <button type="button" onClick={() => switchMode('forgot')} className="text-xs text-green-600 hover:text-green-700 font-medium">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : (
                  <>
                    {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                    <ArrowRight size={16} />
                  </>
                )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === 'forgot' ? (
              <button onClick={() => switchMode('signin')} className="text-green-600 hover:text-green-700 font-medium">
                ← Back to Sign In
              </button>
            ) : mode === 'signin' ? (
              <>Don't have an account?{' '}
                <button onClick={() => switchMode('signup')} className="text-green-600 hover:text-green-700 font-semibold">Sign up free</button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button onClick={() => switchMode('signin')} className="text-green-600 hover:text-green-700 font-semibold">Sign in</button>
              </>
            )}
          </div>

          {/* Mobile features list */}
          <div className="lg:hidden mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">What you get access to</p>
            <div className="grid grid-cols-2 gap-2">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <CheckCircle2 size={12} className="text-green-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="absolute bottom-4 text-xs text-white text-opacity-60 text-center w-full">
        Empowering South African farmers with AI — supporting SDG 2: Zero Hunger
      </p>
    </div>
  );
};
