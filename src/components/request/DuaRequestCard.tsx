
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

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
  
  const handleMakeDua = () => {
    if (!hasMadeDua) {
      setCount(prev => prev + 1);
      setHasMadeDua(true);
    }
  };
  
  return (
    <div className="dua-card animate-fade-up" id={`request-${id}`}>
      <p className="text-gray-800 text-lg mb-6">
        {request}
      </p>
      
      <div className="flex flex-col items-center border-t border-slate-100 pt-4">
        <Button
          onClick={handleMakeDua}
          disabled={hasMadeDua}
          className={`w-full flex items-center justify-center gap-2 py-6 rounded-xl transition-all ${
            hasMadeDua 
              ? 'bg-islamic-light text-islamic-green border border-islamic-green/20' 
              : 'bg-islamic-green hover:bg-islamic-dark text-white'
          }`}
        >
          <Heart size={20} className={hasMadeDua ? 'fill-islamic-green' : ''} />
          <span>{hasMadeDua ? 'Made Dua' : 'I Made Dua'}</span>
        </Button>
        
        <div className="flex items-center justify-between w-full mt-4">
          <span className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <span className="text-xs font-medium">
            {count} {count === 1 ? 'person' : 'people'} made dua
          </span>
        </div>
      </div>
    </div>
  );
};

export default DuaRequestCard;
