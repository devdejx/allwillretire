
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const Cta = () => {
  return (
    <>
      {/* First Video Section */}
      <section className="py-24 h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10"></div>
          <iframe 
            src="https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            className="absolute w-full h-full object-cover" 
            title="First Background Video"
          ></iframe>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent z-10"></div>
        
        {/* Content container */}
        <div className="container mx-auto px-6 relative z-20 text-white h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-10">
              <img src="/lovable-uploads/d523f3bd-5ac2-4e42-9b2b-0e3c68db822c.png" alt="AWR Lifestyle" className="h-28 w-auto mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Second Video Section */}
      <section className="py-24 h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10"></div>
          <iframe 
            src="https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            className="absolute w-full h-full object-cover" 
            title="Second Background Video"
          ></iframe>
        </div>
        
        {/* Enhanced atmosphere effects */}
        <div className="absolute top-10 right-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl z-10"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl z-10"></div>
        
        {/* Content container */}
        <div className="container mx-auto px-6 relative z-20 text-white h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4">
              Begin Your Journey to 
              <span className="relative ml-2">
                <span className="relative z-10">Prosperity</span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gold-500/30 rounded-full"></span>
              </span>
            </h2>
          </div>
        </div>
      </section>
      
      {/* Third Video Section */}
      <section className="py-24 h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10"></div>
          <iframe 
            src="https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            className="absolute w-full h-full object-cover" 
            title="Third Background Video"
          ></iframe>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent z-10"></div>
        
        {/* Added side gradients to blend the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/80 to-transparent z-10"></div>
        
        {/* Content container */}
        <div className="container mx-auto px-6 relative z-20 text-white h-full flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Join thousands of forward-thinking people<br />
              who are already securing their luxurious future with AllWillRetire.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors">
                View Whitepaper
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cta;
