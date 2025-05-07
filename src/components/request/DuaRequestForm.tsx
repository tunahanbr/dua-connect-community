
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface DuaRequestFormProps {
  onRequestSubmitted: (data: { request: string }) => void;
}

const DuaRequestForm = ({ onRequestSubmitted }: DuaRequestFormProps) => {
  const [request, setRequest] = useState('');

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
          <h3 className="text-lg font-medium">Share Your Dua Request</h3>
          <p className="text-sm text-gray-500">
            Share your request with the community. Others will make dua for you.
          </p>
        </div>
        <div className="space-y-4">
          <Textarea
            placeholder="Share your dua request with the community..."
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
            Submit Request
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default DuaRequestForm;
