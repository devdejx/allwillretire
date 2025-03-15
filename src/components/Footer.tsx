
import React from 'react';
import { X, Instagram, Youtube, Github, ArrowUp, ExternalLink, MessageSquare } from 'lucide-react';
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <footer className="relative bg-black text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-gold-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-gold-500/10 rounded-full blur-xl"></div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <a href="#" className="inline-block text-2xl font-display font-bold mb-6 flex items-center">
              <img src="/lovable-uploads/73e439bf-9fba-428b-86ad-84fea890807e.png" alt="AWR Lifestyle" className="mr-2 h-20 w-auto" />
            </a>
            <p className="text-gray-400 mb-6">
              The future of wealth accumulation, designed to secure your luxurious retirement with innovative blockchain technology.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/allwillretire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors">
                <X size={20} />
              </a>
              <a href="https://t.me/allwillretire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors">
                <MessageSquare size={20} />
              </a>
              <a href="https://www.instagram.com/allwillretire/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@allwillretire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick links</h3>
            <p className="text-gray-400 mb-4">Find more about AWR on CoinGecko/Dexscreener.</p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href="https://www.coingecko.com/en/coins/all-will-retire" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gold-500 text-black px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors">
                Visit CoinGecko <ExternalLink size={18} className="ml-2" />
              </a>
              <a href="https://dexscreener.com/solana/fo7vnhaddvnmx4axjo7cc1wwb9ko2pk2dfdzl3dybxkp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gold-500 text-black px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors">
                Visit Dexscreener <ExternalLink size={18} className="ml-2" />
              </a>
            </div>
            <div className="text-sm text-gray-500">
              <a href="https://linktr.ee/allwillretire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition-colors">
                Find all AWR links <ExternalLink size={14} className="inline ml-1" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} AllWillRetire. All rights reserved.
          </div>
          <button onClick={scrollToTop} className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full" aria-label="Scroll to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>;
};
export default Footer;
