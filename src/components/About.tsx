
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
            <div className="relative z-10 rounded-full overflow-hidden shadow-2xl aspect-square coin-container">
              <div className="coin-face">
                {/* Coin exterior */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500 via-gold-400 to-gold-600 rounded-full border-8 border-gold-400/80 shadow-inner"></div>
                
                {/* Coin texture */}
                <div className="absolute inset-0 rounded-full opacity-30">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.2)_70%)]"></div>
                </div>
                
                {/* Coin shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full"></div>
                
                {/* Coin edge texture - small dots around the edge */}
                <div className="absolute inset-0 rounded-full">
                  {Array.from({ length: 120 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-1 h-1.5 bg-gold-300/70" 
                      style={{ 
                        transform: `rotate(${i * 3}deg) translateY(-49.5%)`,
                        top: '50%',
                        left: '0',
                        transformOrigin: 'right center'
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Coin ridges/serrations */}
                <div className="absolute inset-0 rounded-full">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-1.5 h-3 bg-gold-600/40" 
                      style={{ 
                        transform: `rotate(${i * 6}deg) translateY(-50%)`,
                        top: '50%',
                        left: '2px',
                        transformOrigin: 'right center'
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Coin front with AWR text */}
                <div className="absolute inset-[12%] bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center border-4 border-gold-400 shadow-inner coin-front">
                  {/* Decorative circle pattern */}
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-full h-[1px] bg-gold-300/30" 
                        style={{ 
                          top: '50%',
                          transform: `rotate(${i * 15}deg) translateY(-50%)`
                        }}
                      ></div>
                    ))}
                    <div className="absolute inset-[15%] border-[1px] border-gold-300/30 rounded-full"></div>
                    <div className="absolute inset-[30%] border-[1px] border-gold-300/30 rounded-full"></div>
                  </div>
                  
                  <div className="text-center z-10">
                    <div className="font-display font-bold text-4xl md:text-5xl text-white text-stroke">AWR</div>
                    <div className="text-xs md:text-sm text-gold-200 font-medium mt-1">AllWillRetire</div>
                  </div>
                </div>
                
                {/* Coin back side (only visible during flip) - UPDATED TEXT HERE */}
                <div className="absolute inset-[12%] bg-gradient-to-br from-gold-600 to-gold-800 rounded-full flex items-center justify-center border-4 border-gold-400 shadow-inner coin-back">
                  {/* Decorative pattern for back side */}
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-full h-[1px] bg-gold-300/30" 
                        style={{ 
                          top: '50%',
                          transform: `rotate(${i * 22.5}deg) translateY(-50%)`
                        }}
                      ></div>
                    ))}
                    <div className="absolute inset-[10%] border-[1px] border-gold-300/30 rounded-full"></div>
                    <div className="absolute inset-[25%] border-[1px] border-gold-300/30 rounded-full"></div>
                    <div className="absolute inset-[40%] border-[1px] border-gold-300/30 rounded-full"></div>
                    
                    {/* Small stars pattern */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-2 h-2 text-gold-300/50 flex items-center justify-center text-[8px]" 
                        style={{ 
                          top: `calc(50% + ${Math.sin(i * Math.PI/4) * 35}%)`,
                          left: `calc(50% + ${Math.cos(i * Math.PI/4) * 35}%)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >★</div>
                    ))}
                  </div>
                  
                  <div className="text-center z-10">
                    <div className="font-display font-bold text-2xl md:text-3xl text-white text-stroke">RETIREMENT</div>
                    <div className="text-xs md:text-sm text-gold-200 font-medium mt-1">IN 2025</div>
                  </div>
                </div>
                
                {/* Reflective shine */}
                <div className="absolute top-0 left-[5%] right-[40%] h-[20%] bg-white/20 blur-sm rounded-full transform -rotate-12"></div>
                <div className="absolute bottom-[15%] right-[10%] w-[25%] h-[10%] bg-white/15 blur-sm rounded-full"></div>
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
