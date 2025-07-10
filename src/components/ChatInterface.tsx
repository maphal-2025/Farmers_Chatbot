import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Camera, Leaf, Bug, Cloud, Calendar, Paperclip, FileText, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { AuthModal } from './AuthModal';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  category?: string;
  attachment?: {
    name: string;
    type: string;
    size: number;
  };
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { user } = useAuth();
  const {
    isListening,
    transcript,
    isSupported: speechSupported,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const quickActions = [
    { label: t('cropAdvice'), icon: Leaf, category: 'crop' },
    { label: t('pestDisease'), icon: Bug, category: 'pest' },
    { label: t('weatherAlert'), icon: Cloud, category: 'weather' },
    { label: t('marketUpdate'), icon: () => <span className="text-green-600 font-bold text-lg">R</span>, category: 'market' },
    { label: t('seasonalPlant'), icon: Calendar, category: 'seasonal' },
    { label: t('livestock'), icon: () => <span className="text-amber-600 font-bold text-lg">🐄</span>, category: 'livestock' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history when user is authenticated
  useEffect(() => {
    if (user) {
      loadChatHistory();
    } else {
      // Show welcome message for non-authenticated users
      setMessages([
        {
          id: '1',
          text: `${t('welcome')}! I'm here to help you with farming advice, weather updates, market prices, and government schemes. Sign in to save your chat history and get personalized recommendations.`,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [user, t]);

  // Update input text when speech transcript changes
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        return;
      }
      setAttachedFile(file);
    } else {
      alert('Please select a PDF file only');
    }
    // Reset the input
    if (event.target) {
      event.target.value = '';
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const loadChatHistory = async () => {

    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: true })
        .limit(50);

      if (error) throw error;

      if (data && data.length > 0) {
        const chatMessages: Message[] = data.map(msg => ({
          id: msg.id,
          text: msg.message,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp),
          category: msg.category || undefined,
          // Note: Attachments would need to be stored separately in a real implementation
        }));
        setMessages(chatMessages);
      } else {
        // Welcome message for authenticated users
        setMessages([
          {
            id: '1',
            text: `${t('welcome')}! I'm here to help you with farming advice, weather updates, market prices, and government schemes. How can I assist you today?`,
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const saveChatMessage = async (message: Message) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          message: message.text,
          sender: message.sender,
          category: message.category || null,
          timestamp: message.timestamp.toISOString(),
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  };

  const generateBotResponse = (userMessage: string, category?: string): string => {
    const responses = {
      crop: [
        "Based on the current season, I recommend planting drought-resistant crops like sorghum or millet. Make sure to prepare your soil with organic compost.",
        "For optimal crop growth, ensure proper spacing and regular watering. Consider companion planting to maximize your harvest.",
        "The best time to plant maize is early spring after the last frost. Ensure soil pH is between 6.0-6.8 for optimal growth.",
      ],
      pest: [
        "Common signs of pest infestation include yellowing leaves and visible insects. Try using neem oil as a natural pesticide.",
        "For fungal diseases, ensure good air circulation and avoid overhead watering. Copper-based fungicides can help control the spread.",
        "Integrated Pest Management (IPM) combines biological, cultural, and chemical controls for sustainable pest management.",
      ],
      weather: [
        "Current weather shows 70% chance of rain in the next 3 days. Perfect time for planting! Make sure to have proper drainage.",
        "Temperature will drop to 15°C tonight. Consider covering sensitive plants to protect them from frost damage.",
        "Heavy rains expected next week. Prepare your fields for proper water management to prevent waterlogging.",
      ],
      market: [
        "Current maize prices: R4,500/ton (up 5% from last week). Tomato prices: R18/kg (seasonal high). Good time to sell!",
        "Wheat prices are expected to rise due to increased demand. Consider holding your stock for better prices next month.",
        "Local market report: Potatoes R12/kg, Onions R15/kg, Cabbage R8/kg. Prices stable this week.",
      ],
      seasonal: [
        "For summer planting (December-February): Plant tomatoes, peppers, beans, and maize. Ensure adequate water supply during hot months.",
        "Autumn crops (March-May): Perfect time for planting spinach, lettuce, carrots, and onions. These cool-season crops thrive in mild temperatures.",
        "Winter preparation (June-August): Plant cabbage, broccoli, peas, and broad beans. These crops can withstand frost and cold conditions.",
        "Spring planting (September-November): Ideal for planting potatoes, sweet corn, pumpkins, and most vegetable crops as temperatures warm up.",
      ],
      livestock: [
        "For cattle health, ensure regular vaccinations against FMD, anthrax, and blackleg. Provide clean water and quality feed daily.",
        "Sheep require CDT vaccinations and regular deworming. Monitor for signs of foot rot, especially during wet seasons.",
        "Chicken health: Vaccinate against Newcastle disease and Marek's disease. Maintain clean coops and provide balanced feed for optimal egg production.",
        "Cattle breeding: Best breeding season is spring/early summer. Ensure proper nutrition 2-3 months before breeding for optimal conception rates.",
        "Livestock market prices are favorable this month. Cattle: R45/kg, Sheep: R55/kg, Chickens: R35/kg live weight.",
      ],
      general: [
        "I can help you with crop advice, weather updates, pest control, and market information. What specific area would you like to explore?",
        "Remember to rotate your crops each season to maintain soil health and reduce pest buildup.",
        "Always keep records of your farming activities - planting dates, fertilizer applications, and harvest yields. This data helps improve future planning.",
      ],
    };

    const categoryResponses = category ? responses[category as keyof typeof responses] : responses.general;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleSendMessage = (text: string = inputText, category?: string) => {
    if (!text.trim()) return;

    // Show auth modal if user is not signed in
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      category,
      attachment: attachedFile ? {
        name: attachedFile.name,
        type: attachedFile.type,
        size: attachedFile.size,
      } : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setAttachedFile(null);

    // Save user message to database
    saveChatMessage(userMessage);

    // Simulate bot response
    setTimeout(() => {
      let botResponseText = generateBotResponse(text, category);
      
      // Add specific response for PDF attachments
      if (userMessage.attachment) {
        botResponseText = `I can see you've attached a PDF document "${userMessage.attachment.name}". While I can't directly read PDF files yet, I can help you with any questions about the content you describe. Please tell me what specific information from the document you'd like help with, and I'll provide relevant farming advice.`;
      }
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
        category,
      };
      setMessages((prev) => [...prev, botResponse]);
      
      // Save bot response to database
      saveChatMessage(botResponse);
    }, 1000);
  };

  const handleQuickAction = (action: any) => {
    const questions = {
      crop: "What crops should I plant this season?",
      pest: "How can I identify and treat plant diseases?",
      weather: "What's the weather forecast for farming?",
      market: "What are the current market prices?",
      seasonal: "What should I plant this season?",
      livestock: "How can I improve my livestock management?",
    };
    
    handleSendMessage(questions[action.category as keyof typeof questions], action.category);
  };

  const handleVoiceInput = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in your browser. Please try using Chrome or Edge.');
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
        <h2 className="text-2xl font-bold text-white">{t('chatWithBot')}</h2>
        <p className="text-green-100 mt-2">Get instant advice for all your farming needs</p>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.category}
                onClick={() => handleQuickAction(action)}
                className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
              >
                <Icon size={20} className="text-green-600" />
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {/* Attachment display */}
              {message.attachment && (
                <div className={`mb-3 p-3 rounded-lg border ${
                  message.sender === 'user' 
                    ? 'bg-green-400 border-green-300' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <FileText size={16} className={message.sender === 'user' ? 'text-green-100' : 'text-gray-600'} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        message.sender === 'user' ? 'text-green-100' : 'text-gray-700'
                      }`}>
                        {message.attachment.name}
                      </p>
                      <p className={`text-xs ${
                        message.sender === 'user' ? 'text-green-200' : 'text-gray-500'
                      }`}>
                        PDF • {formatFileSize(message.attachment.size)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        {/* Speech Recognition Status */}
        {isListening && (
          <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-700 font-medium">Listening... Speak now</span>
            </div>
            {transcript && (
              <p className="text-sm text-blue-600 mt-2 italic">"{transcript}"</p>
            )}
          </div>
        )}
        
        {/* Speech Error */}
        {speechError && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              Speech recognition error: {speechError}. Please try again.
            </p>
          </div>
        )}

        <div className="flex items-center space-x-3">
          {/* File attachment input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileAttachment}
            className="hidden"
          />
          
          <button
            onClick={handleVoiceInput}
            disabled={!speechSupported}
            className={`p-3 rounded-full transition-all duration-200 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : speechSupported
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
            title={
              !speechSupported 
                ? 'Speech recognition not supported' 
                : isListening 
                ? 'Stop listening' 
                : 'Start voice input'
            }
          >
            <Mic size={20} />
          </button>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="Attach PDF document"
          >
            <Paperclip size={20} />
          </button>

          <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Camera size={20} />
          </button>

          <div className="flex-1 flex items-center space-x-2">
            {/* Show attached file preview */}
            {attachedFile && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <FileText size={16} className="text-blue-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-800 truncate">
                    {attachedFile.name}
                  </p>
                  <p className="text-xs text-blue-600">
                    {formatFileSize(attachedFile.size)}
                  </p>
                </div>
                <button
                  onClick={removeAttachment}
                  className="p-1 hover:bg-blue-100 rounded transition-colors"
                >
                  <X size={14} className="text-blue-600" />
                </button>
              </div>
            )}
            
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={attachedFile ? 'Add a message about your PDF...' : t('askQuestion')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() && !attachedFile}
              className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Send size={18} />
              <span className="hidden sm:inline">{t('send')}</span>
            </button>
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};