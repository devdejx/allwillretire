
import React, { useRef, useEffect } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import OptimizedImage from './OptimizedImage';
import { AspectRatio } from './ui/aspect-ratio';

interface FeaturesProps {
  isSecondFeature?: boolean;
  isFirstFeature?: boolean;
  noBottomPadding?: boolean;
}

const Features = ({
  isSecondFeature = false,
  isFirstFeature = false,
  noBottomPadding = false
}: FeaturesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const playerRef = useRef<HTMLIFrameElement>(null);

  // Animation effect for scroll indicator
  useEffect(() => {
    const scrollIndicator = scrollIndicatorRef.current;
    if (!scrollIndicator) return;

    // Animate the scroll indicator
    const animateScrollIndicator = () => {
      const time = Date.now() / 1000;
      const yOffset = Math.sin(time * 1.5) * 8; // Smooth up and down movement

      if (scrollIndicator) {
        scrollIndicator.style.transform = `translateY(${yOffset}px)`;
      }
    };

    // Start animation loop
    const animationId = requestAnimationFrame(function animate() {
      animateScrollIndicator();
      requestAnimationFrame(animate);
    });

    // Cleanup animation on unmount
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <section ref={sectionRef} id="features" className={`pt-0 text-white relative ${isFirstFeature ? "mt-0" : isSecondFeature ? "mt-0" : "-mt-12"} ${noBottomPadding ? "pb-0" : "pb-4"} -mb-2`}>
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
          <iframe 
            ref={playerRef}
            src="https://player.vimeo.com/video/1065963596?h=ff2bc9aa48&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;background=1&amp;muted=1&amp;loop=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
            title="AWR Background Video"
          ></iframe>
        </div>
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-12">
        <div className="max-w-3xl mx-auto mb-4 text-center">
          <div className="inline-block mb-2">
            <span className="flex gap-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="text-gold-500" 
                  size={18} 
                  fill="currentColor" 
                  strokeWidth={1}
                />
              ))}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            What Makes <span className="text-gold-500">All Will Retire</span> Special
          </h2>
          
          
          
          
          <p className="text-lg text-gray-300 mb-3">*All Will Retire is a global movement that seeks to empower individuals to build a financial future that rewards them as they best see fit with a family of individuals around the world that will support them on this journey. Whether you are interested in having the ability to pay off debt, pay for schooling, take the vacation of your dreams, live more opulently, or retire, All Will Retire is meant to fit you and offer you hope for your future.</p>
        </div>
        
        {/* Enhanced scroll indicator with animation - even smaller size */}
        <div className="flex justify-center items-center my-1 z-20">
          <div ref={scrollIndicatorRef} className="flex flex-col items-center gap-0.5 transition-transform scale-75">
            <div className="text-gold-400 text-[10px] tracking-widest uppercase font-artistic animate-pulse">BECOME PART OF</div>
            <div className="w-6 h-6 flex justify-center items-center relative">
              <div className="relative z-10 animate-bounce">
                <ChevronDown className="w-3 h-3 text-gold-500" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default Features;
