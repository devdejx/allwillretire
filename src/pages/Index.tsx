
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
      <Hero />
      
      {/* Full-width Lifestyle Image Section */}
      <section className="w-full">
        <div className="relative w-full">
          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
          
          {/* Full-width image */}
          <div className="w-full">
            <OptimizedImage 
              src="/lovable-uploads/8c23b3d6-c1f4-4e64-85d9-e0614d298c63.png" 
              alt="Luxurious lifestyle by the ocean" 
              className="w-full h-auto" 
              priority={true} 
            />
          </div>
          
          {/* Bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        </div>
      </section>
      
      {/* Add more spacing before About section */}
      <div className="h-24"></div>
      
      <About />
      
      {/* Community Image Section with Borders - replaced with new image */}
      <section className="w-full mt-24 mb-0">
        {/* Container with top border */}
        <div className="relative w-full">
          {/* Top border */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
          
          {/* Mobile image */}
          <div className="md:hidden w-full">
            <AspectRatio ratio={16 / 9} className="w-full">
              <OptimizedImage 
                src="/lovable-uploads/4f24766a-a232-41b2-8cb0-5504af1e57e4.png" 
                alt="All Will Retire Community" 
                className="w-full h-full object-cover" 
                priority={true} 
              />
            </AspectRatio>
          </div>
          
          {/* Desktop image */}
          <div className="hidden md:block w-full">
            <OptimizedImage 
              src="/lovable-uploads/4f24766a-a232-41b2-8cb0-5504af1e57e4.png" 
              alt="All Will Retire Community" 
              className="w-full h-auto object-contain" 
              priority={true} 
            />
          </div>
          
          {/* Bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-10 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        </div>
      </section>
      
      <Features />
      <Testimonials />
      <Cta />
      <Footer />
    </div>;
};

export default Index;
