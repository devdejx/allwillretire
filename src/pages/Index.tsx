import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import OptimizedImage from '@/components/OptimizedImage';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  // Refs for scroll handling and animations
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Animation refs
  const orbitRef = useRef<HTMLDivElement>(null);
  const financialRef = useRef<HTMLSpanElement>(null);
  const secureRef = useRef<HTMLSpanElement>(null);
  const futureRef = useRef<HTMLSpanElement>(null);
  const audioRef = useRef<HTMLIFrameElement>(null);
  
  // State for controls
  const [scrollLocked, setScrollLocked] = useState(true);
  const [showOrbit, setShowOrbit] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [marketData, setMarketData] = useState({
    marketCap: '$1.8B+',
    holders: '4,400+'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling initially
    if (scrollLocked) {
      document.body.style.overflow = 'hidden';
    }
    
    // Scroll animations
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = Array.from(entry.target.children);
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-fade-up');
            }, index * 150);
          });
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    // Parallax scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;

      document.querySelectorAll('.parallax').forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
        (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });

      const sections = [heroRef.current, aboutRef.current, featuresRef.current, testimonialsRef.current, ctaRef.current];
      sections.forEach(section => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop - window.innerHeight / 2 && scrollY < sectionTop + sectionHeight - window.innerHeight / 2) {
          const id = section.getAttribute('id');
          if (id) {
            document.querySelectorAll('.nav-link').forEach(link => {
              link.classList.remove('active-link');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active-link');
              }
            });
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch market data
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
        } else if (data && data.pairs && data.pairs.length > 0 && data.pairs[0].info && data.pairs[0].info.holders) {
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
    
    // Text animations
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

    return () => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
      clearInterval(refreshInterval);
      document.body.style.overflow = '';
    };
  }, [scrollLocked]);

  // Format currency for display
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
  
  // Format number with commas
  const formatNumber = (value: number): string => {
    return Math.round(value).toLocaleString();
  };

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

  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hidden YouTube audio player */}
      <iframe ref={audioRef} className="hidden" width="0" height="0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title="Background Music"></iframe>
      
      {/* Background orbit animation */}
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000 ${showOrbit ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gold-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gold-300/10 rounded-full blur-3xl" />
        
        <div ref={orbitRef} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] transition-all duration-1000 ${showOrbit ? 'scale-100' : 'scale-0'}`}>
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
      
      {/* Dodal še večji razmik zgoraj na mobilnih napravah */}
      <div className={`${isMobile ? 'pt-36' : 'pt-20'}`}></div>
      
      <section className="w-full mt-0 mb-0 relative" ref={heroRef}>
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
          
          <div className="w-full relative">
            <AspectRatio ratio={16 / 9} className="w-full">
              <OptimizedImage 
                src="/lovable-uploads/31c0fdc7-f525-4410-b81b-0faed111eeed.png" 
                alt="Person celebrating sunset" 
                className="w-full h-full object-cover" 
                priority={true} 
              />
              
              <div className="absolute inset-0 bg-black/50 z-[5]"></div>
              
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="container mx-auto px-6 text-center">
                  <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 animate-fade-up tracking-tight text-white" style={{
                      animationDelay: '0.2s',
                      letterSpacing: '-0.015em',
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                      marginTop: isMobile ? '180px' : '0'
                    }}>
                      <span ref={secureRef} className="relative font-artistic font-semibold inline-block transition-transform duration-1000">
                        {isMobile ? 'Secure' : 'Secure Your'}
                      </span>
                      {isMobile && <br />}
                      {!isMobile && ' '}
                      <span ref={financialRef} className="text-gold-500 font-artistic font-bold inline-block transition-transform duration-1000">Financial</span>{' '}
                      <span ref={futureRef} className="font-elegant italic font-semibold inline-block transition-transform duration-1000">Future</span>
                    </h1>
                    
                    <p className={`${isMobile ? 'text-base px-2' : 'text-xl'} text-white mb-10 max-w-2xl mx-auto animate-fade-up font-elegant`} style={{
                      animationDelay: '0.4s',
                      textShadow: '0 1px 3px rgba(0,0,0,0.7)'
                    }}>
                      {isMobile 
                        ? 'AllWillRetire: your promise of financial independence and a future of opulence.' 
                        : 'AllWillRetire is more than a cryptocurrency — it\'s a promise of financial independence and a future filled with opulence and comfort.'}
                    </p>
                    
                    <div className={`flex flex-col sm:flex-row gap-4 ${isMobile ? 'mb-6' : 'mb-8'} animate-fade-up`} style={{
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
                    
                    <div className="flex justify-center items-center gap-6 md:gap-12 animate-fade-up mb-12" style={{
                      animationDelay: '0.8s'
                    }}>
                      {isLoading ? <Skeleton className="h-10 w-24 rounded-md" /> : <span className="text-4xl font-artistic font-bold text-gold-500">
                            {marketData.marketCap}
                          </span>}
                        <span className="text-sm text-white font-medium">Market Cap</span>
                      <div className="w-px h-12 bg-white/10"></div>
                      {isLoading ? <Skeleton className="h-10 w-24 rounded-md" /> : <span className="text-4xl font-artistic font-bold text-gold-500">
                            {marketData.holders}
                          </span>}
                        <span className="text-sm text-white font-medium">Holders</span>
                    </div>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        </div>
      </section>
      
      <div className="hidden">
        <Hero />
      </div>
      
      <div className="h-24"></div>
      
      <About />
      
      <section className="w-full mt-24 mb-0">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
          
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <OptimizedImage 
                src="/lovable-uploads/4f24766a-a232-41b2-8cb0-5504af1e57e4.png" 
                alt="All Will Retire Community" 
                className="w-full h-full object-cover" 
                priority={true} 
              />
            </AspectRatio>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        </div>
      </section>
      
      <Features isFirstFeature={true} noBottomPadding={true} />
      
      <section className="w-full mt-0 mb-0">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
          
          <div className="w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <OptimizedImage 
                src="/lovable-uploads/65553cc3-bc4a-4c17-a4be-a62faadb689e.png" 
                alt="Luxury Beach Lifestyle" 
                className="w-full h-full object-cover" 
                priority={false} 
              />
            </AspectRatio>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        </div>
      </section>
      
      <Features isSecondFeature={true} />
      
      <Testimonials />
      <Cta />
      <Footer />
    </div>;
};

export default Index;
