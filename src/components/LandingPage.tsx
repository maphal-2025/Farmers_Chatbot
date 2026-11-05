import React, { useState, useEffect } from 'react';
import {
  Sprout, MessageCircle, Cloud, TrendingUp, Heart, FileText, MapPin,
  CheckCircle2, ArrowRight, Star, Users, Zap, Globe, Shield, Smartphone, Menu, X
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

interface LandingPageProps {
  onGetStarted: () => void;
}

const stats = [
  { value: '10K+', label: 'Farmers helped' },
  { value: '5', label: 'SA languages' },
  { value: '24/7', label: 'AI assistance' },
  { value: '4.8★', label: 'User rating' },
];

const features = [
  { icon: MessageCircle, title: 'AI Farming Assistant', desc: 'Ask anything about crops, pests, or livestock and get instant, expert-level advice in your language.' },
  { icon: Cloud, title: 'Live Weather Forecasts', desc: 'Plan your week with accurate 7-day forecasts and severe weather alerts for your region.' },
  { icon: TrendingUp, title: 'Market Prices', desc: 'Track live commodity prices so you sell at the right time and maximise your profit.' },
  { icon: Heart, title: 'Livestock Management', desc: 'Monitor herd health, feeding schedules, and get alerts for vaccinations and breeding.' },
  { icon: FileText, title: 'Government Schemes', desc: 'Discover funding and grants you qualify for, with step-by-step application guidance.' },
  { icon: MapPin, title: 'Seed Suppliers Directory', desc: 'Find trusted nurseries and agricultural stores near you with ratings and directions.' },
];

const testimonials = [
  { name: 'Thabo M.', role: 'Maize farmer, Free State', text: 'The AI assistant diagnosed my crop disease in minutes. Saved me a whole harvest.', rating: 5, initials: 'TM', color: 'bg-green-600' },
  { name: 'Sarah N.', role: 'Cattle farmer, KZN', text: 'Found a government grant I never knew existed. The WhatsApp support team is amazing.', rating: 5, initials: 'SN', color: 'bg-blue-600' },
  { name: 'Johan v.', role: 'Vegetable grower, WC', text: 'Market prices helped me sell at the right time. My income went up 30% this season.', rating: 5, initials: 'JV', color: 'bg-amber-600' },
];

const languages = ['English', 'isiZulu', 'isiXhosa', 'Sesotho', 'Afrikaans'];

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                <img src="/farm.webp" alt="AgriAssist" className="w-full h-full object-cover" />
              </div>
              <span className={`text-lg font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>AgriAssist</span>
            </div>

            <div className="hidden md:flex items-center gap-7">
              <a href="#features" className={`text-sm font-medium ${scrolled ? 'text-gray-600 hover:text-green-600' : 'text-white/90 hover:text-white'}`}>Features</a>
              <a href="#testimonials" className={`text-sm font-medium ${scrolled ? 'text-gray-600 hover:text-green-600' : 'text-white/90 hover:text-white'}`}>Stories</a>
              <a href="#languages" className={`text-sm font-medium ${scrolled ? 'text-gray-600 hover:text-green-600' : 'text-white/90 hover:text-white'}`}>Languages</a>
              <LanguageSelector />
              <button
                onClick={onGetStarted}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                Get Started
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector />
              <button onClick={() => setMobileOpen(!mobileOpen)} className={`p-1.5 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}>
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <a href="#features" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Features</a>
              <a href="#testimonials" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Stories</a>
              <a href="#languages" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Languages</a>
              <button onClick={() => { setMobileOpen(false); onGetStarted(); }} className="w-full mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl">
                Get Started <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/FB_IMG_1752006509141.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-green-800/75 to-emerald-900/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Zap size={13} className="text-yellow-300" />
              <span className="text-white text-xs font-semibold tracking-wide">AI-POWERED · MADE FOR SOUTH AFRICA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Smart farming,<br />in your language.
            </h1>
            <p className="text-lg text-green-100 leading-relaxed mb-8 max-w-xl">
              AgriAssist gives South African farmers instant AI advice, live weather, market prices, and expert WhatsApp support — all in one free app.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg"
              >
                Start free today
                <ArrowRight size={18} />
              </button>
              <a
                href="#features"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-colors"
              >
                Explore features
              </a>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-lg">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
                  <div className="text-xs text-green-200 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-green-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
            {[
              { icon: Users, text: 'Join 10,000+ farmers' },
              { icon: Globe, text: 'Available in 5 languages' },
              { icon: Shield, text: 'Free & secure' },
              { icon: Smartphone, text: 'Works on any phone' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-green-50">
                <Icon size={16} className="text-green-200" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">Everything you need</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">All your farming tools in one place</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">From AI-powered advice to live market data, AgriAssist brings the expertise of an agronomist to your pocket.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all group">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <Icon size={22} className="text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wide mb-2">Real stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Farmers love AgriAssist</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">See how farmers across South Africa are using AgriAssist to grow more, earn more, and farm smarter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={15} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section id="languages" className="py-16 bg-gradient-to-br from-green-700 to-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe size={32} className="text-green-200 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-white mb-3">Speak your language</h2>
          <p className="text-green-100 max-w-2xl mx-auto mb-8">AgriAssist is built for South Africa. Get advice and support in the language you're most comfortable with.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <div key={lang} className="px-5 py-2.5 bg-white/15 backdrop-blur-sm rounded-xl text-white font-medium border border-white/20">
                {lang}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-10 sm:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <Sprout size={40} className="text-white mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Ready to farm smarter?</h2>
              <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">Join thousands of South African farmers using AgriAssist. Free forever — no credit card needed.</p>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg text-lg"
              >
                Get started free
                <ArrowRight size={20} />
              </button>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm text-green-100">
                {['No credit card required', 'Setup in 2 minutes', 'Cancel anytime'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-green-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img src="/farm.webp" alt="AgriAssist" className="w-full h-full object-cover" />
              </div>
              <span className="text-white font-bold">AgriAssist</span>
            </div>
            <p className="text-gray-400 text-sm text-center">
              Empowering South African farmers with AI — supporting SDG 2: Zero Hunger
            </p>
            <div className="flex gap-5 text-sm text-gray-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Stories</a>
              <button onClick={onGetStarted} className="hover:text-white transition-colors">Sign in</button>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
            © 2026 AgriAssist. Built for South African farmers.
          </div>
        </div>
      </footer>
    </div>
  );
};
