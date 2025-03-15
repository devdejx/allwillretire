import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowUp } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <a href="#" className="inline-block text-2xl font-display font-bold mb-6 flex items-center">
              <img 
                src="/lovable-uploads/478658b3-5853-4394-af3e-82b264c6d23d.png" 
                alt="AWR Lifestyle" 
                className="mr-2 h-10 w-auto"
              />
              <span>AllWillRetire</span>
            </a>
            <p className="text-gray-400 mb-6">
              The future of wealth accumulation, designed to secure your luxurious retirement with innovative blockchain technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Features', 'Community', 'Roadmap', 'Whitepaper', 'Team'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {['How to Buy', 'Tokenomics', 'FAQ', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates about AllWillRetire and exclusive offers.
            </p>
            <form className="mb-6">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <button 
                  type="submit" 
                  className="bg-gold-500 text-black px-4 py-2 rounded-r-lg hover:bg-gold-600 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="text-sm text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </div>
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
