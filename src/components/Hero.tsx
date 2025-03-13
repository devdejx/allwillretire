
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const financialRef = useRef<HTMLSpanElement>(null);
  const secureRef = useRef<HTMLSpanElement>(null);
  const futureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const moveParticles = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      orbitRef.current.style.transform = `translateX(${x * 20}px) translateY(${y * 20}px)`;
    };

    // Add subtle floating animation to heading elements
    const animateHeading = () => {
      if (financialRef.current && secureRef.current && futureRef.current) {
        const time = Date.now() / 1000;
        
        // Subtle floating movements with different phases
        secureRef.current.style.transform = `translateY(${Math.sin(time * 0.8) * 5}px)`;
        financialRef.current.style.transform = `translateY(${Math.sin(time * 0.8 + 1) * 5}px)`;
        futureRef.current.style.transform = `translateY(${Math.sin(time * 0.8 + 2) * 5}px)`;
      }
      
      requestAnimationFrame(animateHeading);
    };

    window.addEventListener('mousemove', moveParticles);
    const animationId = requestAnimationFrame(animateHeading);
    
    return () => {
      window.removeEventListener('mousemove', moveParticles);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gold-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gold-300/10 rounded-full blur-3xl" />
      </div>
      
      {/* Animated orbit */}
      <div 
        ref={orbitRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] transition-transform duration-300 ease-out"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-gold-500/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold-500/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold-500/30 rounded-full" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[200px] w-10 h-10 bg-gold-500/80 rounded-full blur-sm animate-pulse" />
          <div className="absolute top-1/2 left-0 -translate-x-[300px] -translate-y-1/2 w-8 h-8 bg-gold-500/80 rounded-full blur-sm animate-pulse" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[200px] w-12 h-12 bg-gold-500/80 rounded-full blur-sm animate-pulse" />
          <div className="absolute top-1/2 right-0 translate-x-[300px] -translate-y-1/2 w-6 h-6 bg-gold-500/80 rounded-full blur-sm animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 animate-fade-in">
            <span className="bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              The Future of Wealth Accumulation
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-fade-up tracking-tight" style={{ animationDelay: '0.2s', letterSpacing: '-0.015em' }}>
            <span ref={secureRef} className="relative font-artistic font-semibold inline-block transition-transform duration-1000">
              Secure Your
            </span>
            {' '}
            <span ref={financialRef} className="text-gold-500 font-artistic font-bold inline-block transition-transform duration-1000">Financial</span>{' '}
            <span ref={futureRef} className="font-elegant italic font-semibold inline-block transition-transform duration-1000">Future</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up font-elegant" style={{ animationDelay: '0.4s' }}>
            AllWillRetire is more than a cryptocurrency — it's a promise of financial independence and a future filled with opulence and comfort.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <button className="bg-white/80 backdrop-blur border border-black/10 text-black px-8 py-4 rounded-xl font-medium hover:bg-white/90 transition-colors">
              Learn More
            </button>
          </div>
          
          <div className="flex justify-center items-center gap-6 md:gap-12 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-artistic font-bold">$1.8B+</span>
              <span className="text-sm text-muted-foreground">Market Cap</span>
            </div>
            <div className="w-px h-12 bg-black/10"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-artistic font-bold">127K+</span>
              <span className="text-sm text-muted-foreground">Holders</span>
            </div>
            <div className="w-px h-12 bg-black/10"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-artistic font-bold">14</span>
              <span className="text-sm text-muted-foreground">Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
