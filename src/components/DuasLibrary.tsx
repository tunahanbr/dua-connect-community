import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTranslatedCategory, normalizeCategory } from '@/lib/categoryUtils';
import { db } from '@/lib/db';

const DuasLibrary: React.FC = () => {
  const { t, language } = useLanguage();
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Fetch duas and extract unique categories
  useEffect(() => {
    const fetchDuas = async () => {
      try {
        const duas = await db.duas.getAll();
        console.log('Raw duas from database:', duas.map(dua => ({ id: dua.id, category: dua.category })));
        
        // Get unique categories and normalize them
        const uniqueCategories = Array.from(
          new Set(duas.map((dua: any) => {
            const category = dua.category;
            console.log('Processing category:', category);
            // Remove any "Category." prefix and convert to lowercase
            const normalizedCategory = category ? category.toLowerCase().replace(/^category\./i, '') : null;
            console.log('Normalized to:', normalizedCategory);
            return normalizedCategory;
          }).filter(Boolean))
        );
        
        console.log('Final unique categories:', uniqueCategories);
        setCategories(['all', ...uniqueCategories]);
      } catch (error) {
        console.error('Failed to fetch duas:', error);
      }
    };
    fetchDuas();
  }, []);

  useEffect(() => {
    console.log('Categories in state before rendering:', categories);
  }, [categories]);

  // Debug logging for language and categories
  useEffect(() => {
    console.log('DuasLibrary - Language or categories changed:', {
      currentLanguage: language,
      categories,
      sampleCategory: categories[0],
      sampleTranslation: categories[0] ? getTranslatedCategory(categories[0], t) : null,
      translationFunction: t.toString()
    });
  }, [language, categories, t]);

  // Force re-render of categories when language changes
  useEffect(() => {
    console.log('DuasLibrary - Language changed, updating categories:', {
      currentLanguage: language,
      currentCategories: categories
    });
    // Only update if we have categories
    if (categories.length > 0) {
      setCategories([...categories]);
    }
  }, [language]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* ... existing search code ... */}
        </div>

        {/* Categories */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">{t('duas.categories')}</h2>
          <TabsList className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const translationKey = `category.${category}`;
              const translatedCategory = t(translationKey);
              console.log('Translating category:', {
                originalCategory: category,
                translationKey,
                translatedCategory,
                availableTranslations: translations.tr.category
              });
              
              return (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {translatedCategory}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
      </div>
    </div>
  );
};

export default DuasLibrary; 