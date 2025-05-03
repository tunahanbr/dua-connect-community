
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import { useNavigate } from 'react-router-dom';

interface DuaItem {
  id: string;
  title: string;
  category: string;
  path: string;
}

interface SpotlightSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: DuaItem[];
}

const defaultItems: DuaItem[] = [
  { id: "dua-001", title: "Rabbana atina fid-dunya", category: "general", path: "/duas?id=dua-001" },
  { id: "dua-002", title: "Dua for anxiety relief", category: "anxiety", path: "/duas?id=dua-002" },
  { id: "dua-003", title: "Dua for forgiveness", category: "forgiveness", path: "/duas?id=dua-003" },
  { id: "dua-004", title: "Morning dua", category: "daily", path: "/duas?id=dua-004" },
  { id: "dua-005", title: "Evening dua", category: "daily", path: "/duas?id=dua-005" },
  { id: "dua-006", title: "Dua for travel", category: "travel", path: "/duas?id=dua-006" },
];

const SpotlightSearch = ({ open, onOpenChange, items = defaultItems }: SpotlightSearchProps) => {
  const [searchResults, setSearchResults] = useState<DuaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Handle search
  useEffect(() => {
    if (searchTerm) {
      const filtered = items.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(items.slice(0, 5)); // Show first 5 items as defaults
    }
  }, [searchTerm, items]);

  const handleSelect = (item: DuaItem) => {
    navigate(item.path);
    onOpenChange(false);
  };

  const handleViewAll = () => {
    navigate(`/duas?search=${encodeURIComponent(searchTerm)}`);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput 
            placeholder="Search duas..." 
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none"
            value={searchTerm}
            onValueChange={setSearchTerm}
            autoFocus
          />
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Duas">
            {searchResults.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item)}
                className="cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="mr-2 text-islamic-green">#</span>
                  <span>{item.title}</span>
                </div>
                <span className="ml-auto text-xs text-gray-500">{item.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem onSelect={handleViewAll} className="cursor-pointer text-islamic-green">
              View all results
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SpotlightSearch;
