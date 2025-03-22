
import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
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
      {/* Dark overlay background */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-12">
        <div className="max-w-3xl mx-auto mb-4 text-center">
          <div className="inline-block mb-2">
            <span className="uppercase tracking-wider text-sm font-medium text-gold-400">
              Key Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            What Makes <span className="text-gold-500">All Will Retire</span> Special
          </h2>
          <p className="text-lg text-gray-300 mb-3">*Decentralizes responsibility of growth for AWR and financial security of the individual — everyone is the dev of AWR and their own financial security</p>
          
          <p className="text-lg text-gray-300 mb-3">*Makes its community members highly visible — we don't hide behind profile pictures or reduce ourselves to the sum of our social media timelines</p>
          
          <p className="text-lg text-gray-300 mb-3">All Will Retire is a global movement that seeks to empower individuals to build a financial future that rewards them as they best see fit with a family of individuals around the world that will support them on this journey. Whether you are interested in having the ability to pay off debt, pay for schooling, take the vacation of your dreams, live more opulently, or retire, All Will Retire is meant to fit you and offer you hope for your future.</p>
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
