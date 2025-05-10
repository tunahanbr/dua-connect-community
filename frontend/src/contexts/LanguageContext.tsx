import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import translations from '@/lib/translations';

// Define available languages
export type Language = 'en' | 'tr' | 'de';

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Create a hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Create our provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get the saved language from localStorage, default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    console.log('Language changed to:', language);
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!key) return '';
    
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    // Start with the translations for the current language
    let translation: any = translations[language];
    
    // Navigate through the nested properties
    for (const k of keys) {
      if (!translation || typeof translation !== 'object' || !translation[k]) {
        // If translation not found, try English
        if (language !== 'en') {
          let englishTranslation: any = translations['en'];
          for (const ek of keys) {
            if (!englishTranslation || typeof englishTranslation !== 'object' || !englishTranslation[ek]) {
              console.log('Translation not found for key:', key, 'in language:', language);
              return key; // Return full key if not found in English either
            }
            englishTranslation = englishTranslation[ek];
          }
          console.log('Using English fallback for:', key, '->', englishTranslation, 'in language:', language);
          return englishTranslation as string;
        }
        console.log('Translation not found for key:', key, 'in language:', language);
        return key; // Return full key if not found
      }
      translation = translation[k];
    }
    
    console.log('Translation found:', key, '->', translation, 'in language:', language);
    return translation as string || key; // Return full key as fallback
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default { LanguageProvider, useLanguage };