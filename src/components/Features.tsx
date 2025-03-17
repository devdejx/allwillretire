
import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* Full-width image section with the beach image - now placed BEFORE the features content */}
      <section className="relative w-full h-screen">
        {/* Top gold border - made thinner and more luxurious with gradient and subtle animation */}
        <div className="absolute top-0 left-0 right-0 h-2 z-10 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 animate-shimmer shadow-md"></div>
        
        <img 
          src="/lovable-uploads/6908fc9a-fe98-4b50-a20b-294fe6c8b560.png" 
          alt="All Will Retire Community" 
          className="w-full h-full object-cover"
        />
        
        {/* Bottom gold border - made thinner and more luxurious with gradient and subtle animation */}
        <div className="absolute bottom-0 left-0 right-0 h-2 z-10 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 animate-shimmer shadow-md"></div>
      </section>

      <section ref={sectionRef} id="features" className="py-24 text-white relative min-h-screen" style={{
        backgroundImage: "url('/lovable-uploads/1637f444-4baf-4c41-9a91-7c131440c4f9.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed" // This makes the background stay in place during scroll
      }}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <div className="inline-block mb-4">
              <span className="uppercase tracking-wider text-sm font-medium text-gold-400">
                Key Features
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              What Makes <span className="text-gold-500">AllWillRetire</span> Special
            </h2>
            <p className="text-lg text-gray-300 mb-4">*Decentralizes responsibility of growth for AWR and financial security of the individual — everyone is the dev of AWR and their own financial security</p>
            
            <p className="text-lg text-gray-300 mb-4">*Makes its community members highly visible — we don't hide behind profile pictures or reduce ourselves to the sum of our social media timelines</p>
            
            <p className="text-lg text-gray-300 mb-4">*Is a family that provides emotional utility around being accepted for who you are regardless of our differences, the ability to self-express your feelings/views to the world, and have a global community to identify with based on the underlying message that everyone deserves financial security</p>
          </div>
          
          {/* Luxurious scroll indicator - moved up to appear right after the text */}
          <div className="flex justify-center items-center my-10 z-20">
            <div className="flex flex-col items-center gap-3 animate-bounce">
              <div className="text-gold-400 text-sm tracking-widest uppercase font-artistic">Scroll for more</div>
              <div className="w-16 h-16 flex justify-center items-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gold-400/30 to-gold-600/10 backdrop-blur-sm animate-pulse"></div>
                <div className="relative z-10">
                  <ChevronDown className="w-8 h-8 text-gold-500 animate-pulse" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
