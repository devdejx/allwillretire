
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Lock, TrendingUp, Wallet, CoinsIcon, Users, LineChart } from 'lucide-react';

const Features = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Get position of the features section
      const featuresSection = document.getElementById('features');
      if (!featuresSection) return;

      const rect = featuresSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the section
      // Start fading when we're 20% into the section
      const scrollStart = windowHeight * 0.2;
      const scrollEnd = windowHeight * 0.6; // End fading at 60% through
      
      // How far have we scrolled into the section (normalized from 0 to 1)
      let scrollProgress = 0;
      
      if (sectionTop < scrollStart) {
        // We've scrolled past the start point, begin fading
        scrollProgress = Math.min(1, (scrollStart - sectionTop) / (scrollEnd - scrollStart));
      }
      
      // Invert opacity (1 -> 0) as we scroll down
      setOpacity(Math.max(0, 1 - scrollProgress));
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
      className="py-24 text-white relative overflow-hidden min-h-[100vh]"
      style={{
        backgroundImage: "url('/lovable-uploads/1637f444-4baf-4c41-9a91-7c131440c4f9.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay that fades out with scroll */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity }}
      ></div>
      
      <div 
        className="container mx-auto px-6 relative z-10 transition-opacity duration-300"
        style={{ opacity }}
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
