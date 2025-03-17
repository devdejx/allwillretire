
import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Load Vimeo player script
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      {/* Replaced beach image with Vimeo video */}
      <section className="relative w-full h-screen">
        {/* Top gold border - updated to match thinner style from Cta component */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        
        {/* Add gold border around the video */}
        <div className="absolute inset-0 border-2 border-gold-500/80 shadow-[0_0_10px_3px_rgba(255,195,0,0.5)] rounded-md overflow-hidden z-0">
          <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
            <iframe 
              src="https://player.vimeo.com/video/1065963596?h=ff2bc9aa48&badge=0&autopause=0&player_id=0&app_id=58479" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} 
              title="626ac5ce7c4123ab7969da90_bg-vid-transcode">
            </iframe>
          </div>
        </div>
        
        {/* Bottom gold border - updated to match thinner style from Cta component */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        
        {/* Added side gradients to blend the edges like in Cta component */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/80 to-transparent z-10"></div>
      </section>

      <section ref={sectionRef} id="features" className="py-24 text-white relative min-h-screen">
        {/* Keeping the dark overlay but removing the background image */}
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
            <div className="flex flex-col items-center gap-3">
              <div className="text-gold-400 text-sm tracking-widest uppercase font-artistic">Scroll for more</div>
              <div className="w-16 h-16 flex justify-center items-center relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gold-400/30 to-gold-600/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <ChevronDown className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
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
