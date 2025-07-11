import React from 'react';
import { MessageCircle, Phone, Clock, Users, CheckCircle } from 'lucide-react';

export const WhatsAppSupport: React.FC = () => {
  const supportTeam = [
    {
      name: 'Dr. Sarah Mthembu',
      role: 'Crop Specialist',
      phone: '+27123456789',
      expertise: 'Crop diseases, pest management, soil health',
      available: '6 AM - 10 PM',
      languages: ['English', 'isiZulu', 'isiXhosa']
    },
    {
      name: 'John van der Merwe',
      role: 'Livestock Expert',
      phone: '+27123456790',
      expertise: 'Cattle, sheep, goats, poultry health',
      available: '24/7 Emergency',
      languages: ['English', 'Afrikaans']
    },
    {
      name: 'Maria Santos',
      role: 'Market Analyst',
      phone: '+27123456791',
      expertise: 'Pricing, market trends, export opportunities',
      available: '8 AM - 6 PM',
      languages: ['English', 'Portuguese']
    },
    {
      name: 'Thabo Molefe',
      role: 'Government Schemes',
      phone: '+27123456792',
      expertise: 'Funding, grants, application assistance',
      available: '9 AM - 5 PM',
      languages: ['English', 'Sesotho', 'Setswana']
    }
  ];

  const openWhatsApp = (phone: string, expertName: string, expertise: string) => {
    const message = `Hello ${expertName}! I need help with ${expertise.toLowerCase()}. I found your contact through AgriAssist farming app.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-full">
              <MessageCircle size={32} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">WhatsApp Expert Support</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect directly with our farming experts via WhatsApp for personalized advice, 
            emergency support, and detailed consultations.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={24} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">24/7 Emergency Support</h3>
            <p className="text-sm text-gray-600">Urgent livestock and crop emergencies handled immediately</p>
          </div>
          <div className="text-center p-4">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Expert Specialists</h3>
            <p className="text-sm text-gray-600">Qualified agricultural professionals with local experience</p>
          </div>
          <div className="text-center p-4">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Multilingual Support</h3>
            <p className="text-sm text-gray-600">Get help in your preferred South African language</p>
          </div>
        </div>

        {/* Expert Team */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 text-center">Our Expert Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportTeam.map((expert, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{expert.name}</h4>
                    <p className="text-green-600 font-medium">{expert.role}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Online</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Expertise:</p>
                    <p className="text-sm text-gray-600">{expert.expertise}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{expert.available}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{expert.phone}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {expert.languages.map((lang, langIndex) => (
                        <span key={langIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openWhatsApp(expert.phone, expert.name, expert.expertise)}
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">🚨 Emergency Farming Support</h3>
            <p className="text-red-700 mb-4">
              For urgent crop diseases, livestock emergencies, or critical farming issues
            </p>
            <button
              onClick={() => openWhatsApp('+27123456789', 'Emergency Team', 'urgent farming emergency')}
              className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <MessageCircle size={18} />
              <span>Emergency WhatsApp Support</span>
            </button>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">How WhatsApp Support Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <p className="text-sm text-gray-700">Choose your expert based on your farming need</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <p className="text-sm text-gray-700">Click "Chat on WhatsApp" to start conversation</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <p className="text-sm text-gray-700">Share photos, describe your farming challenge</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">4</span>
              </div>
              <p className="text-sm text-gray-700">Get personalized advice and follow-up support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};