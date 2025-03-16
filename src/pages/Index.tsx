
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

const Index = () => {
  const sectionsRef = useRef<HTMLElement[]>([]);

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
      sectionsRef.current.forEach((section) => {
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

  // Function to collect section refs
  const addSectionRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero ref={addSectionRef} />
      <About ref={addSectionRef} />
      <Features ref={addSectionRef} />
      <Testimonials ref={addSectionRef} />
      <Cta ref={addSectionRef} />
      <Footer />
    </div>
  );
};

export default Index;
