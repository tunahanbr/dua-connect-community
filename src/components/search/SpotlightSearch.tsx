
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
import { DialogTitle } from '@/components/ui/dialog';

// Updated interface to match your new dua structure
interface DuaItem {
  id?: string; // Make optional if not all items have this
  englishTranslation: string;
  category: string;
  path?: string; // Make optional if not all items have this
  arabicText?: string;
  turkishTranslation?: string;
  germanTranslation?: string;
  transliteration?: string;
  source?: string;
  title?: string; // For backward compatibility
}

interface SpotlightSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: DuaItem[];
}

const SpotlightSearch = ({ open, onOpenChange, items = [] }: SpotlightSearchProps) => {
  const [searchResults, setSearchResults] = useState<DuaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  // Debug log to check items
  useEffect(() => {
    if (items.length > 0) {
      console.log('SpotlightSearch items:', items.slice(0, 2)); // Log first 2 items for debugging
    }
  }, [items]);

  // Extract unique categories when items change
  useEffect(() => {
    const uniqueCategories = Array.from(new Set(
      items
        .map(item => item.category)
        .filter(Boolean) // Remove empty categories
    )).sort();
    
    console.log('Unique categories:', uniqueCategories); // Debug log
    setCategories(uniqueCategories);
  }, [items]);

  // Reset search term when opened
  useEffect(() => {
    if (open) {
      setSearchTerm('');
      setSearchResults(items.slice(0, 5)); // Show first 5 items when opening
    }
  }, [open, items]);

  // Handle search
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults(items.slice(0, 5)); // Show first 5 items as defaults
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase().trim();
    
    // Check if search term exactly matches a category (case insensitive)
    const categoryMatch = categories.find(
      category => category.toLowerCase().trim() === lowerSearchTerm
    );
    
    if (categoryMatch) {
      // If it's an exact category match, show all items from that category
      const categoryItems = items.filter(
        item => item.category && item.category.toLowerCase().trim() === lowerSearchTerm
      );
      console.log(`Found ${categoryItems.length} items for category "${categoryMatch}"`); // Debug log
      setSearchResults(categoryItems);
    } else {
      // Otherwise do a regular search across all fields
      const filtered = items.filter(item => 
        (item.englishTranslation?.toLowerCase().includes(lowerSearchTerm) || 
        item.category?.toLowerCase().includes(lowerSearchTerm) ||
        item.arabicText?.toLowerCase().includes(lowerSearchTerm) ||
        item.transliteration?.toLowerCase().includes(lowerSearchTerm) ||
        item.title?.toLowerCase().includes(lowerSearchTerm)) // For backward compatibility
      );
      setSearchResults(filtered);
    }
  }, [searchTerm, items, categories]);

  const handleSelect = (item: DuaItem) => {
    // Use a default path if the item doesn't have one
    const path = item.path || `/duas/${item.id || ''}`;
    console.log(`Navigating to: ${path}`); // Debug log
    navigate(path);
    onOpenChange(false);
  };

  const handleViewAll = () => {
    navigate(`/duas?search=${encodeURIComponent(searchTerm)}`);
    onOpenChange(false);
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    console.log(`Navigating to category: ${category}`); // Debug log
    navigate(`/duas?category=${encodeURIComponent(category)}`);
    onOpenChange(false);
  };

  // Check if search term matches a category (case insensitive)
  const isExactCategoryMatch = categories.some(
    category => category.toLowerCase().trim() === searchTerm.toLowerCase().trim()
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} className="overflow-hidden">
      <DialogTitle className="sr-only">Search duas</DialogTitle>
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput 
            placeholder="Search duas or categories..." 
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none"
            value={searchTerm}
            onValueChange={setSearchTerm}
            autoFocus
          />
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Show category suggestion if there's an exact match */}
          {isExactCategoryMatch && (
            <CommandGroup heading="Category">
              <CommandItem 
                onSelect={() => handleCategorySelect(searchTerm)}
                className="cursor-pointer bg-muted/50"
              >
                <div className="flex items-center">
                  <span>Browse all duas in category: <strong>{searchTerm}</strong></span>
                </div>
              </CommandItem>
            </CommandGroup>
          )}
          
          {/* Show category suggestions if search term starts with "category:" */}
          {searchTerm.toLowerCase().startsWith("category:") && (
            <CommandGroup heading="Categories">
              {categories
                .filter(category => 
                  category.toLowerCase().includes(searchTerm.toLowerCase().replace("category:", "").trim())
                )
                .slice(0, 5)
                .map((category, index) => (
                  <CommandItem
                    key={`category-${index}`}
                    onSelect={() => handleCategorySelect(category)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-islamic-green">📁</span>
                      <span>{category}</span>
                    </div>
                  </CommandItem>
                ))
              }
            </CommandGroup>
          )}
          
          {/* Show matching categories if search term partially matches categories */}
          {!isExactCategoryMatch && !searchTerm.toLowerCase().startsWith("category:") && searchTerm && (
            <CommandGroup heading="Matching Categories">
              {categories
                .filter(category => 
                  category.toLowerCase().includes(searchTerm.toLowerCase().trim())
                )
                .slice(0, 3) // Show top 3 matching categories
                .map((category, index) => (
                  <CommandItem
                    key={`category-match-${index}`}
                    onSelect={() => handleCategorySelect(category)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span>{category}</span>
                    </div>
                  </CommandItem>
                ))
              }
            </CommandGroup>
          )}
          
          <CommandGroup heading="Results">
            {searchResults.map((item, index) => (
              <CommandItem
                key={item.id || index} // Use index as fallback if id is not available
                onSelect={() => handleSelect(item)}
                className="cursor-pointer"
              >
                <div className="flex items-center">
                  <span className="mr-2 text-islamic-green">#</span>
                  <span>{item.englishTranslation || item.title || 'Untitled Dua'}</span>
                </div>
                <span className="ml-auto text-xs text-gray-500">{item.category || 'Uncategorized'}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          
          {searchTerm && searchResults.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem onSelect={handleViewAll} className="cursor-pointer text-islamic-green">
                  View all results
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SpotlightSearch;
