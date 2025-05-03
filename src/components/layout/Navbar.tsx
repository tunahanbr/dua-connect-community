
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-islamic-green">Make Dua</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium ${isActive('/') ? 'text-islamic-green' : 'text-gray-600 hover:text-islamic-green'}`}>
              Home
            </Link>
            <Link to="/duas" className={`font-medium ${isActive('/duas') ? 'text-islamic-green' : 'text-gray-600 hover:text-islamic-green'}`}>
              Duas Library
            </Link>
            <Link to="/requests" className={`font-medium ${isActive('/requests') ? 'text-islamic-green' : 'text-gray-600 hover:text-islamic-green'}`}>
              Request Duas
            </Link>
            <Link to="/about" className={`font-medium ${isActive('/about') ? 'text-islamic-green' : 'text-gray-600 hover:text-islamic-green'}`}>
              About
            </Link>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 text-gray-600 hover:text-islamic-green"
              aria-label="Search"
            >
              <Search size={20} />
            </Button>
            
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
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 py-2 space-y-3">
            <Link 
              to="/" 
              className={`block py-2 px-4 rounded-lg ${isActive('/') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/duas" 
              className={`block py-2 px-4 rounded-lg ${isActive('/duas') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
              onClick={toggleMenu}
            >
              Duas Library
            </Link>
            <Link 
              to="/requests" 
              className={`block py-2 px-4 rounded-lg ${isActive('/requests') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
              onClick={toggleMenu}
            >
              Request Duas
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 px-4 rounded-lg ${isActive('/about') ? 'bg-islamic-light text-islamic-green' : 'hover:bg-slate-50'}`}
              onClick={toggleMenu}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
