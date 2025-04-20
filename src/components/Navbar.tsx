
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
      behavior: 'smooth'
    });
    closeMenu();
  };

  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out", scrolled ? "py-3 neo-glass" : "py-5 bg-transparent")}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="relative text-2xl font-display font-bold flex items-center">
          <img src="/lovable-uploads/9736f09c-0f57-4e9f-86de-eb5f875fad9b.png" alt="AWR Lifestyle" className="mr-2 h-12 w-auto" />
          <span className="relative z-10 -ml-3">All Will Retire</span>
          <span className="absolute -bottom-1 left-9 right-0 h-[6px] bg-gold-500/20 rounded-full shadow-[0_0_5px_1px_rgba(255,195,0,0.3)]"></span>
        </a>
        
        <nav className="hidden md:flex space-x-12 items-center">
          {['About', 'Community'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu} className="text-sm font-medium relative group">
              <span>{item}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-500 shadow-[0_0_3px_1px_rgba(255,195,0,0.4)] transition-all duration-300 group-hover:w-full"></span>
            </a>)}
          <a href="#contact" onClick={scrollToBottom} className="text-sm font-medium relative group">
            <span>Contact</span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-500 shadow-[0_0_3px_1px_rgba(255,195,0,0.4)] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="https://jup.ag/swap/USDC-Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump" target="_blank" rel="noopener noreferrer" className="relative bg-gradient-to-r from-transparent via-gold-500/30 to-transparent backdrop-blur border border-gold-300/50 text-black px-6 py-2 rounded-lg font-medium text-sm overflow-hidden group transition-transform duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10">Buy Now</span>
          </a>

          <a 
            href="https://store.allwillretire.com/password" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative bg-gradient-to-r from-transparent via-gold-500/30 to-transparent backdrop-blur border border-gold-300/50 text-black px-6 py-2 rounded-lg font-medium text-sm overflow-hidden group transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center gap-2">
              Merch Store <ShoppingBag size={16} className="text-black" />
            </span>
          </a>

          <a 
            href="https://awrpostgenerator.lovable.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative bg-gradient-to-r from-transparent via-gold-500/30 to-transparent backdrop-blur border border-gold-300/50 text-black px-6 py-2 rounded-lg font-medium text-sm overflow-hidden group transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10">AWR App</span>
          </a>
        </nav>

        <button className="md:hidden text-2xl" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={cn("md:hidden absolute top-full left-0 right-0 neo-glass", "transition-all duration-300 ease-in-out overflow-hidden", isOpen ? "max-h-[400px] py-6" : "max-h-0")}>
        <div className="container mx-auto px-6 flex flex-col space-y-4">
          {['About', 'Community'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu} className="text-base py-2 font-medium">
              {item}
            </a>)}
          <a href="#contact" onClick={scrollToBottom} className="text-base py-2 font-medium">
            Contact
          </a>
          <a href="https://jup.ag/swap/USDC-Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump" target="_blank" rel="noopener noreferrer" className="relative bg-gradient-to-r from-transparent via-gold-500/30 to-transparent backdrop-blur border border-gold-300/50 text-black px-6 py-3 rounded-lg font-medium text-sm mt-2 transition-transform duration-300 hover:scale-105 group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10">Buy Now</span>
          </a>
        </div>
      </div>
    </header>;
};

export default Navbar;
