
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Cta = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden'}}>
          <iframe 
            src="https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            style={{
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              width: '100%', 
              height: '100%', 
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover',
              minWidth: '100%',
              minHeight: '100%'
            }} 
            title="Background Video"
          ></iframe>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent z-10"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-gold-500/20 rounded-full blur-xl z-10"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-gold-500/20 rounded-full blur-xl z-10"></div>
      
      <div className="container mx-auto px-6 relative z-20 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              Limited Time Opportunity
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Begin Your Journey to 
            <span className="relative ml-2">
              <span className="relative z-10">Luxury</span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gold-500/30 rounded-full"></span>
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of forward-thinking investors who are already securing their luxurious future with AllWillRetire.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="bg-gold-500 text-black px-8 py-4 rounded-xl font-medium hover:bg-gold-600 transition-colors flex items-center justify-center">
              <span>Invest Now</span>
              <ArrowRight size={18} className="ml-2" />
            </button>
            <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-colors">
              View Whitepaper
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-3xl font-display font-bold mb-1">15%</div>
              <div className="text-sm text-gray-400">Early Investor Bonus</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-3xl font-display font-bold mb-1">24/7</div>
              <div className="text-sm text-gray-400">Support Available</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-3xl font-display font-bold mb-1">100%</div>
              <div className="text-sm text-gray-400">Secure Transactions</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <div className="text-3xl font-display font-bold mb-1">3 Min</div>
              <div className="text-sm text-gray-400">Setup Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
