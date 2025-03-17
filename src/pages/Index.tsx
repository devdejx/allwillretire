
import React, { useEffect, useRef, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import { useIsMobile } from '../hooks/use-mobile';

// Lazy load components to improve initial load time
const Hero = lazy(() => import('../components/Hero'));
const About = lazy(() => import('../components/About'));
const Features = lazy(() => import('../components/Features'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Cta = lazy(() => import('../components/Cta'));
const Footer = lazy(() => import('../components/Footer'));

// Simple loading component
const SectionLoading = () => (
  <div className="w-full py-12 flex justify-center items-center">
    <div className="w-8 h-8 rounded-full border-2 border-gold-500/50 border-t-gold-500 animate-spin"></div>
  </div>
);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Simplified animation for performance improvement
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            
            // Skip child animations on mobile for performance
            if (!isMobile) {
              const children = Array.from(entry.target.children);
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('animate-fade-up');
                }, index * 100);
              });
            }
            
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px'
      }
    );

    // Apply observer with a small delay to ensure DOM is ready
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    // Throttled scroll handler for better performance
    let lastScrollTime = 0;
    const scrollThreshold = isMobile ? 200 : 50; // Higher threshold on mobile
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThreshold) return;
      lastScrollTime = now;
      
      const scrollY = window.scrollY;
      
      // Skip parallax effects on mobile entirely
      if (!isMobile) {
        document.querySelectorAll('.parallax').forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
          (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
      
      // Optimize section highlighting
      const sections = [
        heroRef.current,
        aboutRef.current,
        featuresRef.current,
        testimonialsRef.current,
        ctaRef.current
      ].filter(Boolean);
      
      sections.forEach((section) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollY >= (sectionTop - window.innerHeight/2) && 
            scrollY < (sectionTop + sectionHeight - window.innerHeight/2)) {
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

    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Suspense fallback={<SectionLoading />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <Cta />
      </Suspense>
      <Suspense fallback={<SectionLoading />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
