
import React, { useEffect, useRef } from 'react';
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

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // More sophisticated reveal animations on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add staggered animation by calculating delay based on child index
            const children = Array.from(entry.target.children);
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-fade-up');
              }, index * 150); // 150ms stagger between children
            });
            
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px' // Start animation slightly before element comes into view
      }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    // Smooth scroll handling with parallax effects
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Apply subtle parallax to background elements
      document.querySelectorAll('.parallax').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
        (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
      
      // Track current section for navigation highlighting
      const sections = [
        heroRef.current,
        aboutRef.current,
        featuresRef.current,
        testimonialsRef.current,
        ctaRef.current
      ];
      
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

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      
      {/* Full-width community image section between About and Features - with mobile-specific positioning */}
      <section className={`w-full relative ${isMobile ? 'mt-32' : '-mt-96'}`}>
        <div className="w-full overflow-hidden">
          {/* Mobile version with appropriate aspect ratio */}
          <AspectRatio ratio={16/9} className="w-full md:hidden">
            <OptimizedImage
              src="/lovable-uploads/e51a7f52-b94b-41ef-b8a0-f8bb8d18157c.png"
              alt="All Will Retire Community"
              className="w-full h-full object-cover"
              priority={true}
            />
          </AspectRatio>
          
          {/* Desktop version that fills the width */}
          <div className="hidden md:block w-full">
            <OptimizedImage
              src="/lovable-uploads/e51a7f52-b94b-41ef-b8a0-f8bb8d18157c.png"
              alt="All Will Retire Community" 
              className="w-full h-auto object-contain"
              priority={true}
            />
          </div>
        </div>
      </section>
      
      <Features />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  );
};

export default Index;
