
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const DuaRequestForm = ({ onRequestSubmitted }: { onRequestSubmitted: () => void }) => {
  const [request, setRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
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
      setIsSubmitting(false);
      onRequestSubmitted();
    }, 1000);
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100">
      <h2 className="text-xl font-medium mb-2">Request Duas from Others</h2>
      <p className="text-gray-600 mb-6">
        Share your request anonymously with the community
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="E.g., I have an important exam tomorrow, please make dua for me..."
            className="input-field min-h-[120px] resize-none"
          />
        </div>
        
        <Button
          type="submit"
          className="btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Dua Request'}
        </Button>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          All requests are anonymous. Please be respectful and follow Islamic etiquette.
        </p>
      </form>
    </div>
  );
};

export default DuaRequestForm;
