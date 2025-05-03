
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpotlightSearch from "@/components/search/SpotlightSearch";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Handle keyboard shortcut for search
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      toggleSearch();
    }
  };

  // Add event listener for keyboard shortcut
  useState(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-islamic-green">Make Dua</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className={`px-4 py-2 rounded-full font-medium transition-colors ${isActive('/') ? 'bg-islamic-light text-islamic-green' : 'text-gray-600 hover:bg-slate-50'}`}>
                Home
              </Link>
              <Link to="/duas" className={`px-4 py-2 rounded-full font-medium transition-colors ${isActive('/duas') ? 'bg-islamic-light text-islamic-green' : 'text-gray-600 hover:bg-slate-50'}`}>
                Duas
              </Link>
              <Link to="/requests" className={`px-4 py-2 rounded-full font-medium transition-colors ${isActive('/requests') ? 'bg-islamic-light text-islamic-green' : 'text-gray-600 hover:bg-slate-50'}`}>
                Requests
              </Link>
              <Link to="/about" className={`px-4 py-2 rounded-full font-medium transition-colors ${isActive('/about') ? 'bg-islamic-light text-islamic-green' : 'text-gray-600 hover:bg-slate-50'}`}>
                About
              </Link>
            </div>
            
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-600"
                onClick={toggleMenu}
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="container mx-auto px-4 py-2 space-y-1">
              <Link 
                to="/" 
                className={`block py-2 px-4 rounded-full ${isActive('/') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/duas" 
                className={`block py-2 px-4 rounded-full ${isActive('/duas') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
                onClick={toggleMenu}
              >
                Duas
              </Link>
              <Link 
                to="/requests" 
                className={`block py-2 px-4 rounded-full ${isActive('/requests') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
                onClick={toggleMenu}
              >
                Requests
              </Link>
              <Link 
                to="/about" 
                className={`block py-2 px-4 rounded-full ${isActive('/about') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
                onClick={toggleMenu}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </header>
      
      <SpotlightSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Navbar;
