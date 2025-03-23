import React from 'react';
import { Twitter, Instagram, Youtube, Telegram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TokenInfo from './TokenInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-gold-500/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/9736f09c-0f57-4e9f-86de-eb5f875fad9b.png" 
                alt="AWR Logo" 
                className="h-10 mr-3" 
              />
              <span className="text-gold-500 text-xl font-artist">All Will Retire</span>
            </div>
            <p className="text-gray-400 mb-6">
              The future of wealth accumulation, designed to secure your luxurious retirement with innovative blockchain technology.
            </p>
            
            <TokenInfo />
            
            <div className="flex space-x-4">
              <a href="https://twitter.com/AllWillRetire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/allwillretire/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@AllWillRetire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://t.me/AllWillRetire" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold-500 transition">
                <Telegram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:mr-16 mb-6 md:mb-0">
              <h4 className="text-gold-500 font-semibold mb-4">Explore</h4>
              <ul className="text-gray-400">
                <li className="mb-2"><a href="#" className="hover:text-gold-400 transition">About Us</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gold-400 transition">Roadmap</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gold-400 transition">Whitepaper</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gold-500 font-semibold mb-4">Community</h4>
              <ul className="text-gray-400">
                <li className="mb-2"><a href="#" className="hover:text-gold-400 transition">Telegram</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gold-400 transition">Discord</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gold-400 transition">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500">
          <p>&copy; {currentYear} All Will Retire. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-gold-400 transition">Terms of Service</a> | <a href="#" className="hover:text-gold-400 transition">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
