
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface DuaRequestCardProps {
  id: string;
  request: string;
  duasCount: number;
  createdAt: string;
}

const DuaRequestCard = ({
  id,
  request,
  duasCount,
  createdAt
}: DuaRequestCardProps) => {
  const [count, setCount] = useState(duasCount);
  const [hasMadeDua, setHasMadeDua] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  
  const handleMakeDua = () => {
    if (!hasMadeDua) {
      setIsAnimating(true);
      setCount(prev => prev + 1);
      setHasMadeDua(true);
      
      toast({
        title: "Jazak'Allah khair",
        description: "Thank you for making dua. May Allah accept it.",
      });
      
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <Card className="border border-slate-100 hover:border-slate-200 bg-white transition-all animate-fade-up overflow-hidden" id={`request-${id}`}>
      <CardContent className="pt-6 relative">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28.2 90 10 71.8 10 50S28.2 10 50 10s40 18.2 40 40-18.2 40-40 40z" fill="currentColor"/>
          </svg>
        </div>
        
        <p className="text-gray-800 text-lg mb-6 relative z-10">
          {request}
        </p>
      </CardContent>
      
      <CardFooter className="flex flex-col items-center border-t border-slate-100 pt-4 pb-4">
        <Button
          onClick={handleMakeDua}
          disabled={hasMadeDua}
          className={`w-full flex items-center justify-center gap-2 py-6 rounded-xl transition-all relative ${
            hasMadeDua 
              ? 'bg-islamic-light text-islamic-green border border-islamic-green/20' 
              : 'bg-islamic-green hover:bg-islamic-dark text-white'
          }`}
        >
          <Heart size={20} className={`transition-all ${hasMadeDua ? 'fill-islamic-green' : ''} ${isAnimating ? 'scale-150' : ''}`} />
          <span>{hasMadeDua ? 'Made Dua' : 'I Made Dua'}</span>
          
          {isAnimating && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="animate-ping absolute h-8 w-8 rounded-full bg-islamic-green opacity-20"></span>
            </span>
          )}
        </Button>
        
        <div className="flex items-center justify-between w-full mt-4">
          <span className="text-xs text-gray-500">
            {formatDate(createdAt)}
          </span>
          <span className="text-xs font-medium">
            {count} {count === 1 ? 'person' : 'people'} made dua
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DuaRequestCard;
