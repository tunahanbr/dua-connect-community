
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <Card className="border border-slate-100 hover:border-slate-200 bg-white transition-all animate-fade-up" id={`dua-${id}`}>
      <CardHeader className="pb-0">
        <Badge variant="outline" className="text-islamic-green bg-islamic-light border-islamic-green/10 w-fit">
          #{category}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
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
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-0">
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
      </CardFooter>
    </Card>
  );
};

export default DuaCard;
