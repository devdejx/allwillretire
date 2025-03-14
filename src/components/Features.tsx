
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Lock, TrendingUp, Wallet, CoinsIcon, Users, LineChart } from 'lucide-react';

const Features = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const scrollPercentage = Math.max(0, Math.min(1, -top / (height * 0.6)));
      setScrollPosition(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity based on scroll position
  const overlayOpacity = Math.max(0, 0.7 - scrollPosition * 0.7);
  const contentOpacity = Math.max(0, 1 - scrollPosition * 1.2);

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="py-24 text-white relative"
      style={{
        minHeight: "100vh"
      }}
    >
      {/* Fixed background image */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/lovable-uploads/1637f444-4baf-4c41-9a91-7c131440c4f9.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      
      {/* Overlay with dynamic opacity */}
      <div 
        className="fixed inset-0 bg-black transition-opacity duration-300 -z-10"
        style={{ opacity: overlayOpacity }}
      ></div>
      
      <div 
        className="container mx-auto px-6 relative z-10 transition-opacity duration-300"
        style={{ opacity: contentOpacity }}
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
      
      {/* This is a spacer to ensure the fade effect has room to complete */}
      <div className="h-screen"></div>
    </section>
  );
};

export default Features;
