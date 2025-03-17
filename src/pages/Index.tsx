
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { useIsMobile } from '@/hooks/use-mobile';

// Import components normally
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

const Index = () => {
  const isMobile = useIsMobile();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Mark initial load complete after mount
    setIsInitialLoad(false);
    
    // Optimized intersection observer with fewer operations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only animate if not mobile or if mobile but not the initial load
            if (!isMobile || (isMobile && !isInitialLoad)) {
              entry.target.classList.add('animate-fade-in');
              
              // For desktop, apply staggered animations to children
              if (!isMobile) {
                const children = Array.from(entry.target.children);
                children.forEach((child, index) => {
                  setTimeout(() => {
                    child.classList.add('animate-fade-up');
                  }, index * 100); // Reduced delay from 150ms to 100ms
                });
              }
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px' // Adjusted for better performance
      }
    );

    // Delay observer initialization to prevent initial load jank
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
      });
    }, 500);

    // Optimized scroll handler with throttling
    let lastScrollTime = 0;
    const scrollThrottle = 100; // ms between scroll handling
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottle) return;
      lastScrollTime = now;
      
      const scrollY = window.scrollY;
      
      // Parallax effect only on desktop
      if (!isMobile) {
        document.querySelectorAll('.parallax').forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
          (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
      
      // Navigation highlighting
      const sections = [
        heroRef.current,
        aboutRef.current,
        featuresRef.current,
        testimonialsRef.current,
        ctaRef.current
      ];
      
      let activeSection = null;
      sections.forEach((section) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= (sectionTop - window.innerHeight/2) && 
            scrollY < (sectionTop + sectionHeight - window.innerHeight/2)) {
          activeSection = section;
        }
      });
      
      if (activeSection) {
        const id = activeSection.getAttribute('id');
        if (id) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active-link');
            }
          });
        }
      }
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, isInitialLoad]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  );
};

export default Index;
