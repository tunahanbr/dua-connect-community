
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { db } from '@/lib/db';

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
  const [hasMadeDua, setHasMadeDua] = useState(() => {
    // Check localStorage for previous dua status
    return localStorage.getItem(`dua-${id}`) === 'true';
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  
  const handleMakeDua = useCallback(async () => {
    if (hasMadeDua || isUpdating) return;
    
    setIsAnimating(true);
    setIsUpdating(true);
    
    try {
      await db.requests.update(id, {
        duas_count: count + 1,
        updated: new Date().toISOString()
      }, {
        $autoCancel: false
      });

      setCount(prev => prev + 1);
      setHasMadeDua(true);
      // Store dua status in localStorage
      localStorage.setItem(`dua-${id}`, 'true');
      
      toast({
        title: "Jazak'Allah khair",
        description: "Thank you for making dua. May Allah accept it.",
      });
    } catch (error) {
      console.error('Failed to update dua count:', error);
      toast({
        title: "Error",
        description: "Failed to update dua count. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [id, count, hasMadeDua, isUpdating, toast]);
  
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
    <Card 
      className="border border-slate-100 hover:border-slate-200 bg-white transition-all duration-300 
      animate-fade-up overflow-hidden hover:shadow-lg hover:shadow-islamic-green/5 group relative" 
      id={`request-${id}`}
    >
      {/* Decorative background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#f0f9f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-islamic-light/20 to-transparent rounded-full -mr-20 -mt-20 
        transition-transform group-hover:scale-150 duration-500 blur-xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-islamic-light/20 to-transparent rounded-full -ml-16 -mb-16 
        transition-transform group-hover:scale-150 duration-500 blur-xl" />
      
      <CardContent className="pt-8 pb-6 px-6 relative">
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-islamic-light/30">
            <Heart size={14} className="text-islamic-green" />
          </span>
        </div>
        
        <p className="text-gray-800 text-lg leading-relaxed relative z-10 pl-12">
          "{request}"
        </p>
      </CardContent>
      
      <CardFooter className="flex flex-col items-center border-t border-slate-100/50 pt-4 pb-4 relative z-10 px-6">
        <Button
          onClick={handleMakeDua}
          disabled={hasMadeDua}
          className={`w-full flex items-center justify-center gap-2 py-6 rounded-xl transition-all duration-300 
            transform hover:scale-[1.02] active:scale-95 disabled:opacity-100 ${
            hasMadeDua 
              ? 'bg-islamic-light text-islamic-green border border-islamic-green/20 hover:bg-islamic-light/80' 
              : 'bg-islamic-green hover:bg-islamic-dark text-white shadow-lg shadow-islamic-green/20'
          }`}
        >
          <Heart 
            size={20} 
            className={`transition-transform duration-300 ${
              hasMadeDua ? 'fill-islamic-green' : ''
            } ${isAnimating ? 'scale-150' : 'group-hover:scale-110'}`} 
          />
          <span className="font-medium tracking-wide">
            {hasMadeDua ? 'Made Dua' : 'I Made Dua'}
          </span>
          
          {isAnimating && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="animate-ping absolute h-8 w-8 rounded-full bg-islamic-green opacity-20" />
              <span className="animate-pulse absolute h-12 w-12 rounded-full bg-islamic-green/10" />
              <span className="animate-pulse absolute h-16 w-16 rounded-full bg-islamic-green/5 delay-75" />
            </div>
          )}
        </Button>
        
        <div className="flex items-center justify-between w-full mt-4 text-xs">
          <span className="text-gray-500 flex items-center gap-2 group/date">
            <span className="w-1.5 h-1.5 rounded-full bg-islamic-green/20 group-hover/date:bg-islamic-green/40 transition-colors" />
            <span className="group-hover/date:text-gray-700 transition-colors">{formatDate(createdAt)}</span>
          </span>
          <span className="font-medium text-islamic-green flex items-center gap-2 group/count">
            <Heart 
              size={12} 
              className="fill-islamic-green/20 stroke-islamic-green group-hover/count:fill-islamic-green/40 transition-colors" 
            />
            <span>{count} {count === 1 ? 'person' : 'people'} made dua</span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DuaRequestCard;
