
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DuaCardProps {
  id: string;
  arabicText: string;
  englishTranslation: string;
  transliteration?: string;
  source: string;
  category: string;
}

const DuaCard = ({
  id,
  arabicText,
  englishTranslation,
  transliteration,
  source,
  category
}: DuaCardProps) => {
  const [showTransliteration, setShowTransliteration] = useState(false);
  
  return (
    <div className="dua-card animate-fade-up" id={`dua-${id}`}>
      <div className="mb-4">
        <span className="inline-block category-pill bg-islamic-light text-islamic-green">
          #{category}
        </span>
      </div>
      
      <div className="space-y-4">
        <p className="arabic-text text-2xl mb-4">
          {arabicText}
        </p>
        
        <div className="border-t border-slate-100 pt-4">
          <p className="text-gray-700">
            {englishTranslation}
          </p>
          
          {transliteration && showTransliteration && (
            <p className="text-gray-600 italic mt-2 text-sm">
              {transliteration}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-500">
            Source: {source}
          </span>
          
          {transliteration && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTransliteration(!showTransliteration)}
              className="text-xs text-islamic-green hover:text-islamic-dark"
            >
              {showTransliteration ? 'Hide Transliteration' : 'Show Transliteration'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DuaCard;
