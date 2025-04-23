import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatCurrency, formatNumber, extractHolders } from '@/utils/marketData';

const Hero = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const financialRef = useRef<HTMLSpanElement>(null);
  const secureRef = useRef<HTMLSpanElement>(null);
  const futureRef = useRef<HTMLSpanElement>(null);
  const audioRef = useRef<HTMLIFrameElement>(null);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [showOrbit, setShowOrbit] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [marketData, setMarketData] = useState({
    marketCap: '$1.8B+',
    holders: '0'
  });
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

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
        
        // Check if we have pair data directly or in the pairs array
        const pairData = data.pair || (data.pairs && data.pairs.length > 0 ? data.pairs[0] : null);
        
        if (pairData) {
          // Get market cap from fdv (fully diluted value)
          if (pairData.fdv) {
            marketCapValue = parseFloat(pairData.fdv);
            formattedMarketCap = formatCurrency(marketCapValue);
          }
        }
        
        // Extract holders using our new utility function
        const holdersCount = extractHolders(data);
        console.log('Extracted holders count:', holdersCount);
        
        setMarketData({
          marketCap: formattedMarketCap,
          holders: holdersCount + '+'
        });
      } catch (error) {
        console.error('Failed to fetch market data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMarketData();
    
    const refreshInterval = setInterval(fetchMarketData, 300000); // Refresh every 5 minutes
    
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
    
    const financialFreedomTitle = document.getElementById('financial-freedom-title');
    if (financialFreedomTitle) {
      financialFreedomTitle.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }

    if (audioRef.current && !isPlaying) {
      if (audioRef.current.src === '') {
        audioRef.current.src = 'https://www.youtube.com/embed/AKDLoUSaPV8?autoplay=1&enablejsapi=1';
      } else {
        const contentWindow = audioRef.current.contentWindow;
        if (contentWindow) {
          contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      }
      setIsPlaying(true);
    }
  };

  return (
    <React.Fragment>
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${showOrbit ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gold-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gold-300/10 rounded-full blur-3xl" />
        
        <div ref={orbitRef} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[300px] h-[300px]' : 'w-[800px] h-[800px]'} transition-all duration-1000 ${showOrbit ? 'scale-100' : 'scale-0'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-gold-500/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] border border-gold-500/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] border border-gold-500/30 rounded-full" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px]">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${isMobile ? '-translate-y-[75px]' : '-translate-y-[200px]'} w-10 h-10 bg-gold-500/80 rounded-full blur-sm animate-pulse`} />
            <div className={`absolute top-1/2 left-0 ${isMobile ? '-translate-x-[112px]' : '-translate-x-[300px]'} -translate-y-1/2 w-8 h-8 bg-gold-500/80 rounded-full blur-sm animate-pulse`} />
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${isMobile ? 'translate-y-[75px]' : 'translate-y-[200px]'} w-12 h-12 bg-gold-500/80 rounded-full blur-sm animate-pulse`} />
            <div className={`absolute top-1/2 right-0 ${isMobile ? 'translate-x-[112px]' : 'translate-x-[300px]'} -translate-y-1/2 w-6 h-6 bg-gold-500/80 rounded-full blur-sm animate-pulse`} />
          </div>
        </div>
      </div>

      <iframe ref={audioRef} className="hidden" width="0" height="0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title="Background Music"></iframe>

      <section className={`relative min-h-screen flex items-center ${isMobile ? 'pt-36' : 'pt-20'} overflow-hidden z-10`}>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className={`${isMobile ? 'h-48' : 'h-14'} mb-2`}></div>
            
            <h1 className={`${isMobile ? 'text-3xl leading-snug mt-48' : 'text-4xl md:text-6xl lg:text-7xl leading-tight'} mb-6 animate-fade-up tracking-tight`} style={{
              animationDelay: '0.2s',
              letterSpacing: '-0.015em'
            }}>
              <span ref={secureRef} className="relative font-artistic font-semibold inline-block transition-transform duration-1000">
                {isMobile ? 'Secure' : 'Secure Your'}
              </span>
              {isMobile && <br />}
              {!isMobile && ' '}
              <span ref={financialRef} className="text-gold-500 font-artistic font-bold inline-block transition-transform duration-1000">Financial</span>{' '}
              <span ref={futureRef} className="font-elegant italic font-semibold inline-block transition-transform duration-1000">Future</span>
            </h1>
            
            <p className={`${isMobile ? 'text-base px-2' : 'text-xl'} text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up font-elegant`} style={{
              animationDelay: '0.4s'
            }}>
              {isMobile 
                ? 'AllWillRetire: your promise of financial independence and a future of opulence.' 
                : 'AllWillRetire is more than a cryptocurrency — it\'s a promise of financial independence and a future filled with opulence and comfort.'}
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 ${isMobile ? 'mb-6' : 'mb-16'} animate-fade-up`} style={{
              animationDelay: '0.6s'
            }}>
              <button 
                className="relative bg-gradient-to-r from-transparent via-gold-500 to-transparent backdrop-blur text-black px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden group"
                onClick={handleLearnMoreClick}
              >
                <span className="relative z-10">Tap for More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <span className="absolute -inset-0.5 bg-gold-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
              </button>
            </div>
            
            <div className={`flex justify-center items-center ${isMobile ? 'gap-4 mb-12' : 'gap-6 md:gap-12'} animate-fade-up`} style={{
              animationDelay: '0.8s'
            }}>
              <div className="flex flex-col items-center">
                {isLoading ? <Skeleton className="h-10 w-24 rounded-md" /> : <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-artistic font-bold text-gold-500`}>
                    {marketData.marketCap}
                  </span>}
                <span className="text-sm text-gold-400 font-medium">Market Cap</span>
              </div>
              <div className="w-px h-12 bg-black/10"></div>
              <div className="flex flex-col items-center">
                {isLoading ? <Skeleton className="h-10 w-24 rounded-md" /> : <span className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-artistic font-bold text-gold-500`}>
                    {marketData.holders}
                  </span>}
                <span className="text-sm text-gold-400 font-medium">Holders</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Hero;
