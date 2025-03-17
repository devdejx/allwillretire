
import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return <section ref={sectionRef} id="features" className="py-24 text-white relative min-h-screen" style={{
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

      {/* Small empty space to ensure smooth transition to next section */}
      <div className="h-24"></div>
    </section>;
};

export default Features;
