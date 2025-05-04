
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpotlight } from "@/components/search/SpotlightProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleSearch } = useSpotlight();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-base font-bold text-islamic-green">Make Dua</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={`px-2 py-1 rounded-full text-sm font-medium transition-colors ${isActive('/') ? 'bg-islamic-light text-islamic-green' : 'text-gray-600 hover:bg-slate-50'}`}>
              Home
            </Link>
            <Link to="/duas" className={`px-2 py-1 rounded-full text-sm font-medium transition-colors ${isActive('/duas') ? 'bg-islamic-light text-islamic-green' : 'text-gray-600 hover:bg-slate-50'}`}>
              Duas
            </Link>
            <Link to="/requests" className={`px-2 py-1 rounded-full text-sm font-medium transition-colors ${isActive('/requests') ? 'bg-islamic-light text-islamic-green' : 'text-gray-600 hover:bg-slate-50'}`}>
              Requests
            </Link>
            <Link to="/about" className={`px-2 py-1 rounded-full text-sm font-medium transition-colors ${isActive('/about') ? 'bg-islamic-light text-islamic-green' : 'text-gray-600 hover:bg-slate-50'}`}>
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
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
              className={`block py-2 px-3 rounded-full text-sm ${isActive('/') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/duas" 
              className={`block py-2 px-3 rounded-full text-sm ${isActive('/duas') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
              onClick={toggleMenu}
            >
              Duas
            </Link>
            <Link 
              to="/requests" 
              className={`block py-2 px-3 rounded-full text-sm ${isActive('/requests') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
              onClick={toggleMenu}
            >
              Requests
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 px-3 rounded-full text-sm ${isActive('/about') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
              onClick={toggleMenu}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
