import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DuaCardProps {
  id: string;
  arabicText: string;
  englishTranslation: string;
  turkishTranslation: string;
  germanTranslation: string;
  transliteration?: string;
  source?: string;
  category?: string;
}

const DuaCard = ({
  id,
  arabicText,
  englishTranslation,
  turkishTranslation,
  germanTranslation,
  transliteration,
  source,
  category,
}: DuaCardProps) => {
  const [showTransliteration, setShowTransliteration] = useState(false);
  const { language, t } = useLanguage();

  // Get the appropriate translation based on the selected language
  const getTranslation = () => {
    switch (language) {
      case 'tr':
        return turkishTranslation;
      case 'de':
        return germanTranslation;
      default:
        return englishTranslation;
    }
  };

  // Clean and translate the category
  const getTranslatedCategory = (category: string | undefined) => {
    if (!category) return '';

    // Remove any 'category.' prefix (case insensitive) and normalize
    // This handles both "Category.X" and "category.X" formats
    const normalizedCategory = category.toLowerCase().replace(/^category\./i, '');
    
    // Log for debugging
    console.log(`Original category: "${category}", Normalized: "${normalizedCategory}"`);

    // Translate using the normalized category key
    return t(`category.${normalizedCategory}`);
  };

  return (
    <Card className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {category && (
          <div className="mb-4">
            <span className="inline-block bg-green-50 text-islamic-green text-xs px-2.5 py-1 rounded-full">
              {getTranslatedCategory(category)}
            </span>
          </div>
        )}

        <div className="mb-6">
          <p className="text-right font-arabic text-2xl leading-loose mb-4">{arabicText}</p>

          {transliteration && showTransliteration && (
            <p className="text-gray-600 italic mb-4">{transliteration}</p>
          )}

          <p className="text-gray-700">{getTranslation()}</p>
        </div>

        <div className="flex justify-between items-center">
          {transliteration ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500"
              onClick={() => setShowTransliteration(!showTransliteration)}
            >
              {showTransliteration ? (
                <>
                  <EyeOff size={14} className="mr-1" />
                  {t('duas.hideTransliteration')}
                </>
              ) : (
                <>
                  <Eye size={14} className="mr-1" />
                  {t('duas.showTransliteration')}
                </>
              )}
            </Button>
          ) : (
            <div></div>
          )}

          {source && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">{t('duas.source')}:</span> {source}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DuaCard;