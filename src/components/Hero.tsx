import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

const Hero = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const financialRef = useRef<HTMLSpanElement>(null);
  const secureRef = useRef<HTMLSpanElement>(null);
  const futureRef = useRef<HTMLSpanElement>(null);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [showOrbit, setShowOrbit] = useState(true);
  const [marketData, setMarketData] = useState({
    marketCap: '$1.8B+',
    holders: '4,400+'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setIsLoading(true);
        
        const apiUrl = 'https://api.dexscreener.com/latest/dex/pairs/solana/fo7vnhaddvnmx4axjo7cc1wwb9ko2pk2dfdzl3dybxkp';
        console.log('Fetching market data from:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('DEXScreener API response:', data);
        
        let marketCapValue = 0;
        let formattedMarketCap = '$1.8B+'; // Default fallback
        
        if (data && data.pair && data.pair.fdv) {
          marketCapValue = parseFloat(data.pair.fdv);
          formattedMarketCap = formatCurrency(marketCapValue);
        } else if (data && data.pairs && data.pairs.length > 0 && data.pairs[0].fdv) {
          marketCapValue = parseFloat(data.pairs[0].fdv);
          formattedMarketCap = formatCurrency(marketCapValue);
        }
        
        let holdersCount = '4,400+'; // Default fallback
        
        if (data && data.pair && data.pair.info && data.pair.info.holders) {
          holdersCount = formatNumber(data.pair.info.holders) + '+';
        } else if (data && data.pairs && data.pairs.length > 0 && 
                   data.pairs[0].info && data.pairs[0].info.holders) {
          holdersCount = formatNumber(data.pairs[0].info.holders) + '+';
        }
        
        console.log('Formatted market cap:', formattedMarketCap);
        console.log('Holders count:', holdersCount);
        
        setMarketData({
          marketCap: formattedMarketCap,
          holders: holdersCount
        });
        
      } catch (error) {
        console.error('Failed to fetch market data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMarketData();
    
    const refreshInterval = setInterval(fetchMarketData, 300000);

    const formatCurrency = (value: number): string => {
      if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(1)}B+`;
      } else if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(1)}M+`;
      } else if (value >= 1e3) {
        return `$${(value / 1e3).toFixed(1)}K+`;
      } else {
        return `$${Math.round(value).toLocaleString()}+`;
      }
    };
    
    const formatNumber = (value: number): string => {
      return Math.round(value).toLocaleString();
    };

    const animateHeading = () => {
      if (financialRef.current && secureRef.current && futureRef.current) {
        const time = Date.now() / 1000;
        
        secureRef.current.style.transform = `translateY(${Math.sin(time * 0.8) * 5}px)`;
        financialRef.current.style.transform = `translateY(${Math.sin(time * 0.8 + 1) * 5}px)`;
        futureRef.current.style.transform = `translateY(${Math.sin(time * 0.8 + 2) * 5}px)`;
      }
      
      requestAnimationFrame(animateHeading);
    };

    const animationId = requestAnimationFrame(animateHeading);
    
    if (scrollLocked) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(refreshInterval);
      document.body.style.overflow = '';
    };
  }, [scrollLocked]);

  const handleLearnMoreClick = () => {
    setScrollLocked(false);
    document.body.style.overflow = '';
    setShowOrbit(false);
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${showOrbit ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gold-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gold-300/10 rounded-full blur-3xl" />
        
        <div 
          ref={orbitRef} 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] transition-all duration-1000 ${showOrbit ? 'scale-100' : 'scale-0'}`}
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
      </div>

      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden z-10">
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
              <button 
                className="bg-gold-500 backdrop-blur text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-gold-400 transition-all duration-300 hover:scale-105 hover:shadow-gold-300/50 relative overflow-hidden group"
                onClick={handleLearnMoreClick}
              >
                <span className="relative z-10">Learn More</span>
                <span className="absolute inset-0 bg-gold-300 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                <span className="absolute -inset-0.5 bg-gold-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
              </button>
            </div>
            
            <div className="flex justify-center items-center gap-6 md:gap-12 animate-fade-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex flex-col items-center">
                {isLoading ? (
                  <Skeleton className="h-10 w-24 rounded-md" />
                ) : (
                  <span className="text-4xl font-artistic font-bold">
                    {marketData.marketCap}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">Market Cap</span>
              </div>
              <div className="w-px h-12 bg-black/10"></div>
              <div className="flex flex-col items-center">
                {isLoading ? (
                  <Skeleton className="h-10 w-24 rounded-md" />
                ) : (
                  <span className="text-4xl font-artistic font-bold">
                    {marketData.holders}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">Holders</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
