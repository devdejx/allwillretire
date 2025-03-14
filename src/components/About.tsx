import React, { useState } from 'react';
import { Coins, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
const About = () => {
  const [showCoinOrbit, setShowCoinOrbit] = useState(false);

  // Chart data for gold growth simulation with more dramatic profit curve
  const goldGrowthData = [{
    month: 'Jan',
    value: 100
  }, {
    month: 'Feb',
    value: 115
  }, {
    month: 'Mar',
    value: 130
  }, {
    month: 'Apr',
    value: 125
  }, {
    month: 'May',
    value: 150
  }, {
    month: 'Jun',
    value: 170
  }, {
    month: 'Jul',
    value: 195
  }, {
    month: 'Aug',
    value: 220
  }, {
    month: 'Sep',
    value: 270
  }, {
    month: 'Oct',
    value: 350
  }];
  return <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -right-40 w-80 h-80 bg-gold-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-gold-200/30 rounded-full blur-3xl" />

      {/* Orbital animation that appears on coin hover */}
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${showCoinOrbit ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gold-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gold-300/10 rounded-full blur-3xl" />
        
        {/* Animated orbit */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] transition-all duration-1000 ${showCoinOrbit ? 'scale-100' : 'scale-0'}`}>
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
      </div>

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
          <div className="relative" onMouseEnter={() => setShowCoinOrbit(true)} onMouseLeave={() => setShowCoinOrbit(false)}>
            <div className="relative z-10 rounded-full overflow-hidden shadow-2xl aspect-square coin-container">
              <div className="coin-face">
                {/* Coin exterior */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full border-8 border-gold-300 shadow-inner"></div>
                
                {/* Coin shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full"></div>
                
                {/* Coin ridges/serrations */}
                <div className="absolute inset-0 rounded-full">
                  {Array.from({
                  length: 32
                }).map((_, i) => <div key={i} className="absolute w-1 h-4 bg-gold-300/70" style={{
                  transform: `rotate(${i * 11.25}deg) translateY(-50%)`,
                  top: '50%',
                  left: '0',
                  transformOrigin: 'right center'
                }}></div>)}
                </div>
                
                {/* Coin front with the new AWR LIFESTYLE image */}
                <div className="absolute inset-[12%] bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center border-4 border-gold-400 shadow-inner coin-front">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/lovable-uploads/82199989-9426-49c0-b494-3fe93ddaac2a.png" alt="AWR LIFESTYLE" className="w-[65%] h-[65%] object-contain" />
                  </div>
                </div>
                
                {/* Coin back side (only visible during flip) with stylized inscription plaque */}
                <div className="absolute inset-[12%] bg-gradient-to-br from-gold-600 to-gold-800 rounded-full flex flex-col items-center justify-center border-4 border-gold-400 shadow-inner coin-back">
                  {/* Decorative plaque/sign with inscription - EVEN SMALLER SIZE */}
                  <div className="w-[55%] h-[45%] bg-gradient-to-b from-gold-300 to-gold-400 rounded-lg relative overflow-hidden flex flex-col items-center justify-center px-2 py-1.5">
                    {/* Plaque shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                    
                    {/* Plaque border with decorative rivets/nails */}
                    <div className="absolute inset-0 border-2 border-gold-600/60 rounded-lg pointer-events-none"></div>
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gold-700 rounded-full shadow-inner"></div>
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-gold-700 rounded-full shadow-inner"></div>
                    <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-gold-700 rounded-full shadow-inner"></div>
                    <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-gold-700 rounded-full shadow-inner"></div>
                    
                    {/* Engraved text with shadow effect - SMALLER TEXT with each phrase on its own line */}
                    <div className="text-center z-10">
                      <div className="font-artistic text-sm mb-0.5 text-gold-800 font-bold tracking-wider flex flex-col" style={{
                      textShadow: "0 0.5px 0 rgba(255,255,255,0.4)"
                    }}>
                        <span>I will retire</span>
                        <span>we will retire</span>
                        <span>all will retire</span>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-700 to-transparent my-0.5"></div>
                      <div className="font-elegant text-[9px] text-gold-900 italic" style={{
                      textShadow: "0 0.3px 0 rgba(255,255,255,0.3)"
                    }}>
                        Financial Freedom Awaits
                      </div>
                      
                      {/* Gold growth chart with more dramatic profit curve */}
                      <div className="mt-1 h-[20px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={goldGrowthData} margin={{
                          top: 0,
                          right: 0,
                          left: 0,
                          bottom: 0
                        }}>
                            <defs>
                              <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FFC300" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#FFC300" stopOpacity={0.2} />
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="#CC9C00" strokeWidth={1.5} fill="url(#colorGold)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  
                  {/* Buy button below the plaque */}
                  <div className="mt-4">
                    <Button variant="default" size="sm" className="bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-bold py-2 px-6 rounded-full border border-gold-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" onClick={() => window.open('https://example.com/buy', '_blank')}>
                      BUY NOW
                    </Button>
                  </div>
                </div>
                
                {/* Reflective shine */}
                <div className="absolute top-0 left-[5%] right-[40%] h-[20%] bg-white/20 blur-sm rounded-full transform -rotate-12"></div>
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
                  <h4 className="font-semibold mb-1">Cryptocurrency Based</h4>
                  <p className="text-sm text-muted-foreground">Build on a solana network. Right now the biggest, most used and most developed blockchain.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <TrendingUp size={24} className="text-gold-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Strategic Growth</h4>
                  <p className="text-sm text-muted-foreground">Our token is designed to promote sustainable long-term growth and value appreciation.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <Users size={24} className="text-gold-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Community Driven</h4>
                  <p className="text-sm text-muted-foreground">Project is fully community driven. There is no team behind. It was built from scratch by people who believe in AWR movement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;