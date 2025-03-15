
import React from 'react';
import { X, Instagram, ArrowUp, ExternalLink, Youtube, Send, Music } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-gold-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-gold-500/10 rounded-full blur-xl"></div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <a href="#" className="inline-block text-2xl font-display font-bold mb-6 flex items-center">
              <img 
                src="/lovable-uploads/79de4c21-363e-44ae-9950-2529769150cc.png" 
                alt="AWR Logo" 
                className="h-10 w-auto mr-2" 
              />
            </a>
            <p className="text-gray-400 mb-6">
              The future of wealth accumulation, designed to secure your luxurious retirement with innovative blockchain technology.
            </p>
            
            {/* New section for social media with luxurious styling */}
            <div className="mb-8">
              <h3 className="text-lg font-artistic tracking-wider mb-4 relative inline-block">
                <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent font-bold">
                  Follow us on social media
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"></span>
              </h3>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="https://x.com/allwillretire" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gold-500 transition-colors transform hover:scale-110 group"
              >
                <div className="p-3 rounded-full bg-black border border-gold-500/30 group-hover:border-gold-500 shadow-[0_0_10px_rgba(255,195,0,0.2)] group-hover:shadow-[0_0_15px_rgba(255,195,0,0.4)]">
                  <X size={24} className="group-hover:animate-pulse" />
                </div>
              </a>
              <a 
                href="https://www.youtube.com/@allwillretire" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gold-500 transition-colors transform hover:scale-110 group"
              >
                <div className="p-3 rounded-full bg-black border border-gold-500/30 group-hover:border-gold-500 shadow-[0_0_10px_rgba(255,195,0,0.2)] group-hover:shadow-[0_0_15px_rgba(255,195,0,0.4)]">
                  <Youtube size={24} className="group-hover:animate-pulse" />
                </div>
              </a>
              <a 
                href="https://www.instagram.com/awrlifebydesign/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gold-500 transition-colors transform hover:scale-110 group"
              >
                <div className="p-3 rounded-full bg-black border border-gold-500/30 group-hover:border-gold-500 shadow-[0_0_10px_rgba(255,195,0,0.2)] group-hover:shadow-[0_0_15px_rgba(255,195,0,0.4)]">
                  <Instagram size={24} className="group-hover:animate-pulse" />
                </div>
              </a>
              <a 
                href="https://t.me/allwillretire" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gold-500 transition-colors transform hover:scale-110 group"
              >
                <div className="p-3 rounded-full bg-black border border-gold-500/30 group-hover:border-gold-500 shadow-[0_0_10px_rgba(255,195,0,0.2)] group-hover:shadow-[0_0_15px_rgba(255,195,0,0.4)]">
                  <Send size={24} className="group-hover:animate-pulse" />
                </div>
              </a>
              <a 
                href="https://www.tiktok.com/@allwillretire" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-gold-500 transition-colors transform hover:scale-110 group"
              >
                <div className="p-3 rounded-full bg-black border border-gold-500/30 group-hover:border-gold-500 shadow-[0_0_10px_rgba(255,195,0,0.2)] group-hover:shadow-[0_0_15px_rgba(255,195,0,0.4)]">
                  <Music size={24} className="group-hover:animate-pulse" />
                </div>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.coingecko.com/en/coins/all-will-retire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors block flex items-center"
                >
                  Get more info about token on CoinGecko/DexScreener
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </li>
              <li className="flex space-x-3 mt-5">
                <a 
                  href="https://www.coingecko.com/en/coins/all-will-retire"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    className="bg-black border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black flex items-center"
                  >
                    CoinGecko
                    <ExternalLink size={14} className="ml-2" />
                  </Button>
                </a>
                <a 
                  href="https://dexscreener.com/solana/fo7vnhaddvnmx4axjo7cc1wwb9ko2pk2dfdzl3dybxkp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    className="bg-black border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black flex items-center"
                  >
                    DexScreener
                    <ExternalLink size={14} className="ml-2" />
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AllWillRetire. All rights reserved.
          </div>
          <button 
            onClick={scrollToTop} 
            className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
