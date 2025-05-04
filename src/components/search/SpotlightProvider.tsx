
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import SpotlightSearch from './SpotlightSearch';
import { duasData } from '@/data/duas';
import { requestsData } from '@/data/requests';

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

  // Create a combined list of searchable items
  const searchItems = [
    // Map duas to searchable items
    ...duasData.map(dua => ({
      id: dua.id,
      title: dua.englishTranslation.substring(0, 40) + (dua.englishTranslation.length > 40 ? "..." : ""),
      category: dua.category,
      path: `/duas?id=${dua.id}`
    })),
    // Map requests to searchable items
    ...requestsData.map(request => ({
      id: request.id,
      title: request.request.substring(0, 40) + (request.request.length > 40 ? "..." : ""),
      category: "request",
      path: `/requests?id=${request.id}`
    }))
  ];

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
