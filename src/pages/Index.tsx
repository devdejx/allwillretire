
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroOverlay from '@/components/HeroOverlay';

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
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
    return () => {
      document.querySelectorAll('.reveal').forEach(el => {
        observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero section - full height, right below navbar */}
      <section className="relative h-screen w-full" ref={heroRef} id="hero">
        <div className="absolute inset-0 w-full h-full">
          <OptimizedImage 
            src="/lovable-uploads/54d0b489-bd6c-4013-97f4-078c27c0cc96.png" 
            alt="Person enjoying sunrise with arms raised" 
            className="w-full h-full object-cover" 
            priority={true} 
          />
          
          <HeroOverlay />
        </div>
      </section>
      
      <About />
      
      <section className="w-full mt-24 mb-0">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
          
          <div className="w-full relative">
            <div className="w-full aspect-[16/9]">
              <OptimizedImage 
                src="/lovable-uploads/54d0b489-bd6c-4013-97f4-078c27c0cc96.png" 
                alt="Person enjoying sunrise with arms raised" 
                className="w-full h-full object-cover" 
                priority={true} 
              />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        </div>
      </section>
      
      <Features isFirstFeature={true} noBottomPadding={true} />
      
      <section className="w-full mt-0 mb-0">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
          
          <div className="w-full relative">
            <div className="w-full aspect-[16/9]">
              <OptimizedImage 
                src="/lovable-uploads/54d0b489-bd6c-4013-97f4-078c27c0cc96.png" 
                alt="Person enjoying sunrise with arms raised" 
                className="w-full h-full object-cover" 
                priority={false} 
              />
            </div>
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
