
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import SpotlightSearch from './SpotlightSearch';
import { db } from '@/lib/db';

// Define the context type
interface SpotlightContextType {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

// Create the context with default values
const SpotlightContext = createContext<SpotlightContextType>({
  isSearchOpen: false,
  openSearch: () => {},
  closeSearch: () => {},
  toggleSearch: () => {},
});

// Create a hook to use the spotlight context
export const useSpotlight = () => useContext(SpotlightContext);

// Create our provider component
export const SpotlightProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [duas, requests] = await Promise.all([
          db.duas.getAll(),
          db.requests.getAll()
        ]);

        const items = [
          ...duas.map(dua => {
            // Check for both camelCase and snake_case field names
            const englishText = dua.englishTranslation || dua.english_translation || "";
            const arabicText = dua.arabicText || dua.arabic_text || "";
            const transliterationText = dua.transliteration || "";
            const categoryText = dua.category || "Uncategorized";
            
            return {
              id: dua.id,
              title: englishText && typeof englishText === 'string' 
                ? englishText.substring(0, 40) + (englishText.length > 40 ? "..." : "") 
                : "Untitled Dua",
              category: categoryText,
              path: `/duas?id=${dua.id}`,
              englishTranslation: englishText,
              arabicText: arabicText,
              transliteration: transliterationText
            };
          }),
          ...requests.map(request => {
            const requestText = request.request || "";
            
            return {
              id: request.id,
              title: requestText && typeof requestText === 'string'
                ? requestText.substring(0, 40) + (requestText.length > 40 ? "..." : "")
                : "Untitled Request",
              category: "request",
              path: `/requests?id=${request.id}`,
              englishTranslation: requestText
            };
          })
        ];

        setSearchItems(items);
        console.log("Search items loaded:", items); // Debug log
      } catch (error) {
        console.error('Failed to fetch search items:', error);
      }
    };

    fetchData();
  }, []);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);
  const toggleSearch = () => setIsSearchOpen(prev => !prev);

  // Handle keyboard shortcuts globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <SpotlightContext.Provider value={{ isSearchOpen, openSearch, closeSearch, toggleSearch }}>
      {children}
      <SpotlightSearch 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen} 
        items={searchItems}
      />
    </SpotlightContext.Provider>
  );
};
