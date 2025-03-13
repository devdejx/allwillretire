import React, { useEffect, useRef } from 'react';
import { Coins, Shield, TrendingUp } from 'lucide-react';

const About = () => {
  const coinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coin = coinRef.current;
    if (!coin) return;

    const handleMouseMove = (e: MouseEvent) => {
      const coinRect = coin.getBoundingClientRect();
      const x = e.clientX - coinRect.left;
      const y = e.clientY - coinRect.top;
      
      // Calculate the tilt based on mouse position
      const centerX = coinRect.width / 2;
      const centerY = coinRect.height / 2;
      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;
      
      // Apply the tilt effect
      coin.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };
    
    const handleMouseLeave = () => {
      // Reset the tilt when mouse leaves
      coin.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };
    
    coin.addEventListener('mousemove', handleMouseMove);
    coin.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      coin.removeEventListener('mousemove', handleMouseMove);
      coin.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -right-40 w-80 h-80 bg-gold-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-gold-200/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="uppercase tracking-wider text-sm font-medium text-muted-foreground">
              About AllWillRetire
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            A New Era of <span className="text-gold-500">Financial Freedom</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Designed with precision and backed by innovative blockchain technology, AllWillRetire provides a reliable pathway to accumulate wealth for your future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div 
              ref={coinRef} 
              className="relative z-10 rounded-full overflow-hidden shadow-2xl aspect-square coin-container transition-transform duration-200 ease-out"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div className="coin-face" style={{ transformStyle: 'preserve-3d' }}>
                {/* Coin edge/thickness - now with more segments for smoother appearance and positioned further out */}
                <div className="absolute inset-0 rounded-full" style={{ transform: 'translateZ(-8px)' }}>
                  {Array.from({ length: 72 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute bg-gold-700" 
                      style={{ 
                        height: '100%',
                        width: '8px',
                        transform: `rotateY(${i * 5}deg) translateZ(calc(50% - 4px))`,
                        transformOrigin: 'center',
                        left: 'calc(50% - 4px)',
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Coin front - Using the new coin image */}
                <div className="absolute inset-0 coin-front" style={{ transform: 'translateZ(8px)' }}>
                  <img 
                    src="/lovable-uploads/bcbd7898-814b-4214-8df2-b0363c8680c6.png" 
                    alt="Gold coin" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Coin back side (only visible during flip) */}
                <div className="absolute inset-0 coin-back" style={{ transform: 'translateZ(-8px) rotateY(180deg)' }}>
                  <img 
                    src="/lovable-uploads/bcbd7898-814b-4214-8df2-b0363c8680c6.png" 
                    alt="Gold coin" 
                    className="w-full h-full object-contain transform rotate-y-180"
                  />
                </div>
                
                {/* Reflective shine */}
                <div className="absolute top-0 left-[5%] right-[40%] h-[20%] bg-white/20 blur-sm rounded-full transform -rotate-12" style={{ transform: 'translateZ(9px)' }}></div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-gold-500/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-gold-500/10 rounded-full" />
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gold-500/20 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gold-500/20 rounded-full blur-xl" />
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-bold">The Vision</h3>
              <p className="text-muted-foreground">
                AllWillRetire was created with a singular vision: to democratize financial prosperity and ensure that anyone, regardless of background, can achieve a luxurious retirement through strategic cryptocurrency investment.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <Shield size={24} className="text-gold-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Unparalleled Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Built on a reinforced blockchain with advanced security protocols to protect your assets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <TrendingUp size={24} className="text-gold-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Strategic Growth</h4>
                  <p className="text-sm text-muted-foreground">
                    Our tokenomics are designed to promote sustainable long-term growth and value appreciation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <Coins size={24} className="text-gold-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Reward Mechanisms</h4>
                  <p className="text-sm text-muted-foreground">
                    Innovative staking and rewards system to multiply your holdings passively over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
