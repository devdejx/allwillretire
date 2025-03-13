
import React from 'react';
import { Coins, Shield, TrendingUp } from 'lucide-react';

const About = () => {
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
            {/* Coin shadow beneath */}
            <div className="absolute inset-0 rounded-full bg-black/50 blur-xl translate-y-2 scale-95"></div>
            
            {/* Main coin container */}
            <div className="relative z-10 rounded-full overflow-hidden shadow-2xl aspect-square">
              {/* Coin base exterior with realistic gold gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-600/90 via-gold-400 to-gold-500 rounded-full border-8 border-gold-500/80">
                {/* Embossed edge */}
                <div className="absolute inset-0 border-[12px] border-gold-600/30 rounded-full"></div>
              </div>
              
              {/* Coin texture overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD4KPC9zdmc+')] opacity-30 rounded-full"></div>
              
              {/* Coin shine effect - more pronounced */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-gold-200/30 to-transparent rounded-full"></div>
              
              {/* Coin ridges/serrations - more defined */}
              <div className="absolute inset-0 rounded-full">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-1 h-5 bg-gradient-to-r from-gold-600 to-gold-400" 
                    style={{ 
                      transform: `rotate(${i * 6}deg) translateY(-50%)`,
                      top: '50%',
                      left: '0',
                      transformOrigin: 'right center',
                      boxShadow: '0 0 2px rgba(0,0,0,0.3)'
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Coin center with AWR text - more metallic look */}
              <div className="absolute inset-[12%] bg-gradient-to-br from-gold-600 via-gold-500 to-gold-600 rounded-full flex items-center justify-center border-[6px] border-gold-500/70 shadow-inner animate-spin-slow">
                {/* Inner circular detail */}
                <div className="absolute inset-[8%] rounded-full border-2 border-gold-700/30"></div>
                
                {/* Light reflections */}
                <div className="absolute top-[10%] left-[10%] w-[20%] h-[20%] bg-white/20 rounded-full blur-sm"></div>
                <div className="absolute bottom-[20%] right-[15%] w-[15%] h-[10%] bg-white/10 rounded-full blur-sm"></div>
                
                {/* Text content with embossed effect */}
                <div className="text-center relative z-10">
                  <div className="font-display font-bold text-4xl md:text-5xl text-gold-100 text-stroke-gold">AWR</div>
                  <div className="text-xs md:text-sm text-gold-200 font-medium mt-1">AllWillRetire</div>
                </div>
              </div>
              
              {/* Multiple reflective highlights for more depth */}
              <div className="absolute top-0 left-[5%] right-[40%] h-[15%] bg-white/30 blur-sm rounded-full transform -rotate-12"></div>
              <div className="absolute bottom-[10%] right-[15%] w-[25%] h-[8%] bg-white/20 blur-sm rounded-full"></div>
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
