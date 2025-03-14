
import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Lock, TrendingUp, Wallet, CoinsIcon, Users, LineChart } from 'lucide-react';

const Features = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1); // Start fully visible
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start with the overlay visible, then fade it out as we scroll down
      let opacity = 1; // Default to fully visible
      
      if (rect.top < 0) {
        // As we scroll down, reduce the opacity
        // Make the fade-out happen over a shorter distance for a more dramatic effect
        const fadeDistance = windowHeight * 0.5; // Adjust this to control how quickly it fades
        const scrolledPastTop = Math.abs(rect.top);
        
        // Linear fade out
        opacity = Math.max(0, 1 - (scrolledPastTop / fadeDistance));
      }
      
      setScrollOpacity(opacity);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-24 text-white relative overflow-hidden min-h-screen"
      style={{
        backgroundImage: "url('/lovable-uploads/1637f444-4baf-4c41-9a91-7c131440c4f9.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay with dynamic opacity based on scroll */}
      <div 
        className="absolute inset-0 bg-black backdrop-blur-sm transition-opacity duration-500"
        style={{ 
          opacity: scrollOpacity,
          backdropFilter: `blur(${scrollOpacity * 5}px)`
        }}
      ></div>
      
      <div 
        className="container mx-auto px-6 relative z-10 transition-opacity duration-500"
        style={{ opacity: scrollOpacity }}
      >
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="uppercase tracking-wider text-sm font-medium text-gold-400">
              Key Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            What Makes <span className="text-gold-500">AllWillRetire</span> Special
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our cryptocurrency is designed with exceptional features that set it apart from others in the market.
          </p>
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gold-500/10 to-transparent p-8 rounded-2xl backdrop-blur-sm border border-gold-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold mb-2">$0.0025</div>
                <div className="text-sm text-gray-400">Current Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold mb-2">15%</div>
                <div className="text-sm text-gray-400">Monthly Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold mb-2">10B</div>
                <div className="text-sm text-gray-400">Max Supply</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
