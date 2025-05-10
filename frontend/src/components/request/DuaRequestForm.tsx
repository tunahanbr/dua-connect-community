
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useLanguage } from "@/contexts/LanguageContext";

interface DuaRequestFormProps {
  onRequestSubmitted: (data: { request: string }) => void;
}

const DuaRequestForm = ({ onRequestSubmitted }: DuaRequestFormProps) => {
  const [request, setRequest] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) return;
    
    onRequestSubmitted({ request: request.trim() });
    setRequest('');
  };

  return (
    <Card className="p-6 border border-slate-100 hover:border-slate-200 transition-all">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{t('requests.shareRequest')}</h3>
          <p className="text-sm text-gray-500">
            {t('requests.shareDescription')}
          </p>
        </div>
        <div className="space-y-4">
          <Textarea
            placeholder={t('requests.placeholder')}
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            className="min-h-[120px] resize-none focus:ring-islamic-green focus:border-islamic-green"
            required
          />
          <Button 
            type="submit"
            className="w-full bg-islamic-green text-white hover:bg-islamic-dark transition-all duration-300 hover:scale-[1.02]"
            disabled={!request.trim()}
          >
            {t('requests.submit')}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DuaRequestForm;
