import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
  { code: 'xh', name: 'isiXhosa', flag: '🇿🇦' },
  { code: 'st', name: 'Sesotho', flag: '🇿🇦' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
];

const translations: Translations = {
  en: {
    welcome: 'Welcome to FarmBot',
    chatWithBot: 'Chat with AI Assistant',
    weather: 'Weather',
    marketPrices: 'Market Prices',
    govSchemes: 'Government Schemes',
    askQuestion: 'Ask me anything about farming...',
    send: 'Send',
    cropAdvice: 'Crop Advice',
    pestDisease: 'Pest & Disease',
    weatherAlert: 'Weather Alert',
    marketUpdate: 'Market Update',
    seasonalPlant: 'Seasonal Plants',
  },
  zu: {
    welcome: 'Sawubona ku-FarmBot',
    chatWithBot: 'Xoxa ne-AI Assistant',
    weather: 'Isimo sezulu',
    marketPrices: 'Amanani ezimakethe',
    govSchemes: 'Izinhlelo zikahulumeni',
    askQuestion: 'Ngibuze noma yini ngezolimo...',
    send: 'Thumela',
    cropAdvice: 'Izeluleko zezitshalo',
    pestDisease: 'Izinambuzane & Izifo',
    weatherAlert: 'Isexwayiso sezulu',
    marketUpdate: 'Ukwaziswa kwezimakethe',
    seasonalPlant: 'Izitshalo zenkathi',
  },
  xh: {
    welcome: 'Wamkelekile ku-FarmBot',
    chatWithBot: 'Thetha ne-AI Assistant',
    weather: 'Imozulu',
    marketPrices: 'Amaxabiso emarike',
    govSchemes: 'Iinkqubo zikarhulumente',
    askQuestion: 'Ndibuze nantoni na ngezolimo...',
    send: 'Thumela',
    cropAdvice: 'Iingcebiso zezityalo',
    pestDisease: 'Izinambuzane & Izifo',
    weatherAlert: 'Isilumkiso semozulu',
    marketUpdate: 'Uhlaziyo lweemarike',
    seasonalPlant: 'Izityalo zexesha',
  },
  st: {
    welcome: 'Rea u amohela ho FarmBot',
    chatWithBot: 'Bua le AI Assistant',
    weather: 'Boemo ba leholimo',
    marketPrices: 'Litheko tsa mmaraka',
    govSchemes: 'Mananeo a mmuso',
    askQuestion: 'Nkotse eng kapa eng ka temo...',
    send: 'Romela',
    cropAdvice: 'Keletso ea lijalo',
    pestDisease: 'Likokoanyana & Malwetse',
    weatherAlert: 'Temoso ea leholimo',
    marketUpdate: 'Tlhahiso ea mmaraka',
    seasonalPlant: 'Lijalo tsa nako',
  },
  af: {
    welcome: 'Welkom by FarmBot',
    chatWithBot: 'Gesels met AI Assistent',
    weather: 'Weer',
    marketPrices: 'Markpryse',
    govSchemes: 'Regeringskemas',
    askQuestion: 'Vra my enigiets oor boerdery...',
    send: 'Stuur',
    cropAdvice: 'Gewasadvies',
    pestDisease: 'Plae & Siektes',
    weatherAlert: 'Weerwaarskuwing',
    marketUpdate: 'Markopdatering',
    seasonalPlant: 'Seisoenale Plante',
  },
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  languages: Language[];
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const speechRecognition = useSpeechRecognition();

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    // Update speech recognition language when UI language changes
    if (speechRecognition.setLanguage) {
      speechRecognition.setLanguage(language.code);
    }
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages, t }}>
      {children}
    </LanguageContext.Provider>
  );
};