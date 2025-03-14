import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Lock, TrendingUp, Wallet, CoinsIcon, Users, LineChart } from 'lucide-react';

const Features = () => {
  const [opacity, setOpacity] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const featuresSection = sectionRef.current;
      if (!featuresSection) return;
      const sectionTop = featuresSection.offsetTop;
      const sectionHeight = featuresSection.offsetHeight;
      const scrollPosition = scrollY - sectionTop + windowHeight;
      const scrollPercentage = Math.min(Math.max(scrollPosition / (sectionHeight * 2.5), 0), 1);
      setOpacity(1 - scrollPercentage);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInView]);

  return <section ref={sectionRef} id="features" className="py-24 text-white relative min-h-screen" style={{
    backgroundImage: "url('/lovable-uploads/1637f444-4baf-4c41-9a91-7c131440c4f9.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed" // This makes the background stay in place during scroll
  }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-700" style={{
      opacity
    }}></div>
      
      <div className="container mx-auto px-6 relative z-10 transition-opacity duration-700" style={{
      opacity
    }}>
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="uppercase tracking-wider text-sm font-medium text-gold-400">
              Key Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            What Makes <span className="text-gold-500">AllWillRetire</span> Special
          </h2>
          <p className="text-lg text-gray-300 mb-4">*Decentralizes responsibility of growth for AWR and financial security of the individual — everyone is the dev of AWR and their own financial security</p>
          
          <p className="text-lg text-gray-300 mb-8">*Makes its community members highly visible — we don't hide behind profile pictures or reduce ourselves to the sum of our social media timelines</p>
          
          <p className="text-lg text-gray-300 mb-8">*Is a family that provides emotional utility around being accepted for who you are regardless of our differences, the ability to self-express your feelings/views to the world, and have a global community to identify with based on the underlying message that everyone deserves financial security</p>
        </div>
        
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="flex justify-center mb-10">
            <img 
              src="/lovable-uploads/75dc9d7a-13e3-4d9d-8a27-61e0981c29b9.png" 
              alt="AWR Lifestyle Logo" 
              className="h-28 md:h-36 w-auto"
            />
          </div>
          
          <div className="rounded-2xl overflow-hidden">
            <img 
              src="/lovable-uploads/bc81e8cb-c76b-4275-9298-3b08f6034bb4.png" 
              alt="AllWillRetire Community Members" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div style={{
      height: '150vh'
    }} className="opacity-0"></div>
    </section>;
};

export default Features;
