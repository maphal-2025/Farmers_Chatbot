import React, { useState } from 'react';
import { MessageCircle, X, Phone, Send } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  message?: string;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber = '+27123456789', // Default South African number
  message = 'Hello! I need help with farming advice.'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState(message);

  const openWhatsApp = (msg?: string) => {
    const encodedMessage = encodeURIComponent(msg || customMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareConversation = (conversationText: string) => {
    const shareMessage = `🌾 FarmBot Conversation Summary:\n\n${conversationText}\n\n📱 Get more farming advice at AgriAssist`;
    openWhatsApp(shareMessage);
  };

  return (
    <>
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          title="Contact via WhatsApp"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* WhatsApp Widget Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-green-500" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AgriAssist Support</h3>
                <p className="text-green-100 text-sm">Farming Help via WhatsApp</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-600 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <div className="text-sm text-gray-600">
              <p className="mb-2">Get instant farming support via WhatsApp:</p>
              <ul className="space-y-1 text-xs">
                <li>• Crop advice and disease diagnosis</li>
                <li>• Livestock health consultations</li>
                <li>• Weather alerts and market prices</li>
                <li>• Government scheme applications</li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button
                onClick={() => openWhatsApp('Hello! I need urgent help with my crops. They are showing signs of disease.')}
                className="w-full text-left p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-red-600">🚨</span>
                  <div>
                    <p className="text-sm font-medium text-red-800">Emergency Crop Help</p>
                    <p className="text-xs text-red-600">Disease, pest, or urgent issues</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => openWhatsApp('Hi! I need advice about livestock health and management.')}
                className="w-full text-left p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-amber-600">🐄</span>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Livestock Support</p>
                    <p className="text-xs text-amber-600">Health, breeding, feeding advice</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => openWhatsApp('Hello! I want to know about government farming schemes and funding opportunities.')}
                className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600">💰</span>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Funding & Schemes</p>
                    <p className="text-xs text-blue-600">Government support programs</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Custom Message */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Message:
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm resize-none"
                rows={3}
                placeholder="Type your farming question..."
              />
              <button
                onClick={() => openWhatsApp(customMessage)}
                className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={16} />
                <span>Send via WhatsApp</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{phoneNumber}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Available 24/7 for farming emergencies
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};