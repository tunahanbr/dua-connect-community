
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DuaFilterProps {
  categories: string[];
  onFilterChange: (search: string, category: string) => void;
}

const DuaFilter = ({ categories, onFilterChange }: DuaFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onFilterChange(term, activeCategory);
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    onFilterChange(searchTerm, category);
  };
  
  return (
    <div className="mb-8 space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search duas..."
          className="input-field pl-10"
        />
      </div>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-2 min-w-max">
          <Button
            onClick={() => handleCategoryChange('all')}
            className={`category-pill ${
              activeCategory === 'all'
                ? 'bg-islamic-green text-white'
                : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
            }`}
          >
            All
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-pill ${
                activeCategory === category
                  ? 'bg-islamic-green text-white'
                  : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DuaFilter;
