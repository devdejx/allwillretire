
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const scrollToBottom = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    closeMenu();
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled 
          ? "py-3 neo-glass" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          className="relative text-2xl font-display font-bold flex items-center"
        >
          <img 
            src="/lovable-uploads/9736f09c-0f57-4e9f-86de-eb5f875fad9b.png" 
            alt="AWR Lifestyle" 
            className="mr-2 h-12 w-auto"
          />
          <span className="relative z-10">
            AllWillRetire
          </span>
          <span className="absolute -bottom-1 left-9 right-0 h-[6px] bg-gold-500/20 rounded-full"></span>
        </a>
        
        <nav className="hidden md:flex space-x-12 items-center">
          {['About', 'Community'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={closeMenu} 
              className="text-sm font-medium relative group"
            >
              <span>{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#contact"
            onClick={scrollToBottom} 
            className="text-sm font-medium relative group"
          >
            <span>Contact</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
            Buy Now
          </button>
        </nav>

        <button 
          className="md:hidden text-2xl" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 neo-glass",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-[400px] py-6" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-6 flex flex-col space-y-4">
          {['About', 'Community'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={closeMenu} 
              className="text-base py-2 font-medium"
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={scrollToBottom} 
            className="text-base py-2 font-medium"
          >
            Contact
          </a>
          <button className="bg-black text-white px-6 py-3 rounded-lg font-medium text-sm mt-2 hover:opacity-90 transition-opacity">
            Buy Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
