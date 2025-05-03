
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from 'lucide-react';

const DuaRequestForm = ({ onRequestSubmitted }: { onRequestSubmitted: () => void }) => {
  const [request, setRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const { toast } = useToast();

  const MAX_CHARS = 280;
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setRequest(text);
      setCharacterCount(text.length);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!request.trim()) {
      toast({
        title: "Please enter a request",
        description: "Your request cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submission - in a real app, this would call an API
    setTimeout(() => {
      toast({
        title: "Request submitted",
        description: "Thank you for sharing your request with the community",
      });
      setRequest('');
      setCharacterCount(0);
      setIsSubmitting(false);
      onRequestSubmitted();
    }, 1000);
  };
  
  return (
    <Card className="border border-slate-100 bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-islamic-light text-islamic-green mr-2">
            <MessageSquare size={16} />
          </span>
          Request Duas from Others
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Share your request anonymously with the community
        </p>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="mb-1 relative overflow-hidden">
            <textarea
              value={request}
              onChange={handleChange}
              placeholder="E.g., I have an important exam tomorrow, please make dua for me..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-islamic-green focus:ring-1 focus:ring-islamic-green/20 focus:outline-none min-h-[120px] resize-none"
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-500">
              {characterCount}/{MAX_CHARS}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col">
          <Button
            type="submit"
            className="bg-islamic-green hover:bg-islamic-dark text-white rounded-xl px-6 py-2.5 font-medium transition-all duration-300 w-full flex gap-2 items-center justify-center"
            disabled={isSubmitting || !request.trim()}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Dua Request'}
            <MessageSquare size={16} className={isSubmitting ? 'animate-pulse' : ''} />
          </Button>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            All requests are anonymous. Please be respectful and follow Islamic etiquette.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DuaRequestForm;
