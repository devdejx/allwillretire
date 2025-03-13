
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
            {/* Enhanced 3D coin with shadow */}
            <div className="relative z-10 mx-auto rounded-full overflow-hidden shadow-2xl aspect-square coin-container w-[280px] md:w-[320px]">
              <div className="coin-face">
                {/* Coin front side */}
                <div className="coin-front">
                  {/* 3D front coin exterior with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-full border-8 border-gold-300 shadow-inner overflow-hidden">
                    {/* Front side reflective shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full"></div>
                    
                    {/* 3D inner content on front */}
                    <div className="absolute inset-[12%] bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center border-4 border-gold-400 shadow-inner overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center coin-inner-element">
                        <img 
                          src="/lovable-uploads/82199989-9426-49c0-b494-3fe93ddaac2a.png" 
                          alt="AWR LIFESTYLE" 
                          className="w-[65%] h-[65%] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Coin back side */}
                <div className="coin-back">
                  {/* 3D back coin exterior with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 rounded-full border-8 border-gold-300 shadow-inner overflow-hidden">
                    {/* Back side reflective shine */}
                    <div className="absolute inset-0 bg-gradient-to-tl from-white/30 via-transparent to-transparent rounded-full"></div>
                    
                    {/* 3D inner content on back */}
                    <div className="absolute inset-[12%] bg-gradient-to-br from-gold-600 to-gold-800 rounded-full flex items-center justify-center border-4 border-gold-400 shadow-inner overflow-hidden">
                      <div className="absolute inset-0 flex flex-col items-center justify-center coin-inner-element">
                        <div className="text-center">
                          <div className="font-display font-bold text-2xl md:text-3xl text-black text-stroke">RETIREMENT</div>
                          <div className="text-xs md:text-sm text-black font-medium mt-1">IN 2025</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 3D coin edge - visible during rotation */}
                <div className="coin-edge"></div>
              </div>
              
              {/* Dynamic shadow beneath coin */}
              <div className="coin-shadow"></div>
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
