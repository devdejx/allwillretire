
import React, { useState, useRef } from 'react';
import { Skeleton } from './ui/skeleton';

const HeroOverlay = () => {
  const financialRef = useRef<HTMLSpanElement>(null);
  const secureRef = useRef<HTMLSpanElement>(null);
  const futureRef = useRef<HTMLSpanElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollLocked, setScrollLocked] = useState(true);
  const [marketData, setMarketData] = useState({
    marketCap: '$1.8B+',
    holders: '4,400+'
  });
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);

  const handleLearnMoreClick = () => {
    setScrollLocked(false);
    document.body.style.overflow = '';
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });

    // Start playing music when button is clicked
    if (audioRef.current && !isPlaying) {
      // Load and play YouTube audio with enablejsapi=1 for external control
      if (audioRef.current.src === '') {
        audioRef.current.src = 'https://www.youtube.com/embed/AKDLoUSaPV8?autoplay=1&enablejsapi=1';
      } else {
        // If already loaded, just play it
        const contentWindow = audioRef.current.contentWindow;
        if (contentWindow) {
          contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      }
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Hidden YouTube audio player */}
      <iframe ref={audioRef} className="hidden" width="0" height="0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title="Background Music"></iframe>
      
      {/* Overlay content with background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10">
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
          <div className="h-14 mb-2"></div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-fade-up tracking-tight text-white" style={{
            animationDelay: '0.2s',
            letterSpacing: '-0.015em',
            textShadow: '0 2px 10px rgba(0,0,0,0.7)'
          }}>
            <span ref={secureRef} className="relative font-artistic font-semibold inline-block transition-transform duration-1000">
              Secure Your
            </span>
            {' '}
            <span ref={financialRef} className="text-gold-500 font-artistic font-bold inline-block transition-transform duration-1000">Financial</span>{' '}
            <span ref={futureRef} className="font-elegant italic font-semibold inline-block transition-transform duration-1000">Future</span>
          </h1>
          
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto animate-fade-up font-elegant" style={{
            animationDelay: '0.4s',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
          }}>
            AllWillRetire is more than a cryptocurrency — it's a promise of financial independence and a future filled with opulence and comfort.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up" style={{
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
          
          <div className="flex justify-center items-center gap-6 md:gap-12 animate-fade-up" style={{
            animationDelay: '0.8s'
          }}>
            <div className="flex flex-col items-center">
              {isLoading ? <Skeleton className="h-10 w-24 rounded-md" /> : <span className="text-4xl font-artistic font-bold text-white">
                  {marketData.marketCap}
                </span>}
              <span className="text-sm text-white/80">Market Cap</span>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="flex flex-col items-center">
              {isLoading ? <Skeleton className="h-10 w-24 rounded-md" /> : <span className="text-4xl font-artistic font-bold text-white">
                  {marketData.holders}
                </span>}
              <span className="text-sm text-white/80">Holders</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroOverlay;
