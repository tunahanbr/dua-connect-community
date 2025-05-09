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
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!key) return '';
    
    // Clean up the key - remove any 'category.' prefix if it's already there
    // This prevents issues when calling t('category.something') when 'something' already has category prefix
    const cleanKey = key.replace(/^(category\.)+/i, 'category.');
    
    // Split the key by dots to access nested properties
    const keys = cleanKey.split('.');
    
    // Start with the translations for the current language
    let translation: any = translations[language];
    
    // Navigate through the nested properties
    for (const k of keys) {
      if (!translation || !translation[k]) {
        // If translation not found, return the key itself or fallback to English
        if (language !== 'en') {
          // Try to get English translation as fallback
          let englishTranslation = translations['en'];
          for (const ek of keys) {
            if (!englishTranslation || !englishTranslation[ek]) {
              // If not found in English either, return the last part of the key (the category name)
              return k;
            }
            englishTranslation = englishTranslation[ek];
          }
          return englishTranslation;
        }
        return k; // Return just the key name, not the whole path
      }
      translation = translation[k];
    }
    
    return translation || keys[keys.length - 1]; // Default to the last part of the key if no translation
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default { LanguageProvider, useLanguage };