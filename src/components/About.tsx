import React, { useState } from 'react';
import { Coins, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import OptimizedImage from './OptimizedImage';
import { AspectRatio } from './ui/aspect-ratio';

const About = () => {
  const [showCoinOrbit, setShowCoinOrbit] = useState(false);

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

  return <>
      <section id="about" className="pt-12 pb-0 -mb-16 mt-12 relative overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-80 h-80 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-gold-200/30 rounded-full blur-3xl" />

        <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${showCoinOrbit ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gold-200/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gold-300/10 rounded-full blur-3xl" />
          
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

        <div className="container mx-auto px-6 mt-8">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <div className="inline-block mb-4">
              <span className="uppercase tracking-wider text-sm font-medium text-muted-foreground">ABOUT ALL WILL RETIRE</span>
            </div>
            <h2 id="financial-freedom-title" className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              A New Era of <span className="text-gold-500">Financial Empowerment</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              With the backing of a global family of individuals that share similar financial aspirations, All Will Retire seeks to empower you to secure your financial future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative flex flex-col items-center" onMouseEnter={() => setShowCoinOrbit(true)} onMouseLeave={() => setShowCoinOrbit(false)}>
              <div className="relative z-10 rounded-full overflow-hidden shadow-2xl aspect-square coin-container w-full mb-8">
                <div className="coin-face">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full border-8 border-gold-300 shadow-inner"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full"></div>
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
                  <div className="absolute inset-[12%] bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center border-4 border-gold-400 shadow-inner coin-front">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src="/lovable-uploads/82199989-9426-49c0-b494-3fe93ddaac2a.png" alt="AWR LIFESTYLE" className="w-[65%] h-[65%] object-contain" />
                    </div>
                  </div>
                  <div className="absolute inset-[12%] bg-gradient-to-br from-gold-600 to-gold-800 rounded-full flex flex-col items-center justify-center border-4 border-gold-400 shadow-inner coin-back">
                    <div className="w-[55%] h-[45%] bg-gradient-to-b from-gold-300 to-gold-400 rounded-lg relative overflow-hidden flex flex-col items-center justify-center px-2 py-1.5">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                      <div className="absolute inset-0 border-2 border-gold-600/60 rounded-lg pointer-events-none"></div>
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gold-700 rounded-full shadow-inner"></div>
                      <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-gold-700 rounded-full shadow-inner"></div>
                      <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-gold-700 rounded-full shadow-inner"></div>
                      <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-gold-700 rounded-full shadow-inner"></div>
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
                      </div>
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
                  <div className="absolute top-0 left-[5%] right-[40%] h-[20%] bg-white/20 blur-sm rounded-full transform -rotate-12"></div>
                </div>
              </div>
              <a href="https://jup.ag/swap/USDC-Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump" target="_blank" rel="noopener noreferrer" className="relative bg-gradient-to-r from-transparent via-gold-500 to-transparent backdrop-blur text-black font-bold py-2 px-6 rounded-full border border-gold-300/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block z-20 overflow-hidden group">
                <span className="relative z-10">BUY NOW</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              </a>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold">The Vision</h3>
                <p className="text-muted-foreground">All Will Retire was created with a singular vision: to create the biggest financial movement - globally - to ensure that anyone, regardless of background, can build towards financial security and retire.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                  <div className="bg-gold-500/10 p-3 rounded-lg">
                    <Shield size={24} className="text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Individual Empowerment</h4>
                    <p className="text-sm text-muted-foreground">Be seen for who you are and advocate for what financial security means for you. AWR is meant to fit your life as you best see fit.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                  <div className="bg-gold-500/10 p-3 rounded-lg">
                    <TrendingUp size={24} className="text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Organic Global Growth</h4>
                    <p className="text-sm text-muted-foreground">Growth occurs as a result of our community members humanizing themselves and allowing the world to see their hope and aspirations. They are the best individuals, and already equipped, to spread the message of AWR in their local communities through already established trusted relationships.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                  <div className="bg-gold-500/10 p-3 rounded-lg">
                    <Users size={24} className="text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Community Driven</h4>
                    <p className="text-sm text-muted-foreground">There is no central team behind AWR. Everyone is responsible for the growth of AWR as they best see fit. Never ask for permission. Always be biased towards action. AWR was built from the ground up by passionate family members because it mattered to them - because it was worth it to them.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>;
};

export default About;
