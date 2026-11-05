import React from 'react';
import { MessageCircle, Phone, Clock, Users, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';

const supportTeam = [
  {
    name: 'Dr. Sarah Mthembu',
    initials: 'SM',
    color: 'bg-green-600',
    role: 'Crop Specialist',
    phone: '+27123456789',
    expertise: 'Crop diseases, pest management, soil health',
    available: '6 AM – 10 PM',
    languages: ['English', 'isiZulu', 'isiXhosa'],
    online: true,
  },
  {
    name: 'John van der Merwe',
    initials: 'JM',
    color: 'bg-blue-600',
    role: 'Livestock Expert',
    phone: '+27123456790',
    expertise: 'Cattle, sheep, goats, poultry health',
    available: '24/7 Emergency',
    languages: ['English', 'Afrikaans'],
    online: true,
  },
  {
    name: 'Maria Santos',
    initials: 'MS',
    color: 'bg-amber-600',
    role: 'Market Analyst',
    phone: '+27123456791',
    expertise: 'Pricing, market trends, export opportunities',
    available: '8 AM – 6 PM',
    languages: ['English', 'Portuguese'],
    online: false,
  },
  {
    name: 'Thabo Molefe',
    initials: 'TM',
    color: 'bg-teal-600',
    role: 'Government Schemes',
    phone: '+27123456792',
    expertise: 'Funding, grants, application assistance',
    available: '9 AM – 5 PM',
    languages: ['English', 'Sesotho', 'Setswana'],
    online: true,
  },
];

const steps = [
  'Choose the expert that matches your need',
  'Tap "Chat on WhatsApp" — a message is pre-filled',
  'Send photos or describe your challenge',
  'Receive personalised advice and follow-up',
];

export const WhatsAppSupport: React.FC = () => {
  const openWhatsApp = (phone: string, name: string, expertise: string) => {
    const msg = `Hello ${name}! I need help with ${expertise.toLowerCase()}. I found your contact through AgriAssist.`;
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <MessageCircle size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">WhatsApp Expert Support</h2>
            <p className="text-green-100 mt-1 text-sm">
              Speak directly with qualified agricultural specialists in your language — free of charge.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { icon: Clock, label: '24/7 Emergency', sub: 'Livestock & crop crises' },
            { icon: Users, label: '4 Specialists', sub: 'All farming areas covered' },
            { icon: CheckCircle, label: 'Multilingual', sub: '5 South African languages' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white/15 rounded-xl p-3 text-center">
              <Icon size={20} className="mx-auto mb-1 text-green-200" />
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-xs text-green-200 mt-0.5 hidden sm:block">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expert cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {supportTeam.map((expert, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 ${expert.color} rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {expert.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900 truncate">{expert.name}</h4>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${expert.online ? 'bg-green-500' : 'bg-gray-300'}`} />
                </div>
                <p className="text-sm text-gray-500">{expert.role}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <p className="text-gray-700">{expert.expertise}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock size={11} />{expert.available}</span>
                <span className="flex items-center gap-1"><Phone size={11} />{expert.phone}</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {expert.languages.map((l, j) => (
                  <span key={j} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{l}</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => openWhatsApp(expert.phone, expert.name, expert.expertise)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </button>
          </div>
        ))}
      </div>

      {/* Emergency */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <AlertCircle size={22} className="text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-red-800">Emergency Farming Support</h3>
          <p className="text-sm text-red-600 mt-0.5">
            Urgent crop disease, livestock emergency, or critical farming crisis
          </p>
        </div>
        <button
          onClick={() => openWhatsApp('+27123456789', 'Emergency Team', 'an urgent farming emergency')}
          className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors"
        >
          <MessageCircle size={16} />
          Emergency Support
        </button>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">How it works</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-700 font-bold text-sm">{i + 1}</span>
              </div>
              <p className="text-xs text-gray-600 leading-snug">{step}</p>
              {i < steps.length - 1 && (
                <ChevronRight size={14} className="text-gray-300 mt-2 md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
