
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const testimonials = [
  {
    quote: "AllWillRetire has completely transformed my investment portfolio. In just six months, I've seen returns I never thought possible.",
    author: "Alexander Morgan",
    title: "Private Investor",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    quote: "The security and stability of this token gave me the confidence to make it my primary retirement investment. The community is fantastic too.",
    author: "Sophia Chen",
    title: "Financial Analyst",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
  },
  {
    quote: "I joined the AllWillRetire community early, and it's been the best financial decision I've ever made. The growth has been exponential.",
    author: "Michael Lawson",
    title: "Tech Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const isMobile = useIsMobile();

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      next();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, current]);

  return (
    <section id="community" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/80 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white/80 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold-200/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="uppercase tracking-wider text-sm font-medium text-muted-foreground">
              Our Story
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Why <span className="text-gold-500">Now</span> Is The Perfect Time
          </h2>
          <p className="text-lg text-muted-foreground">
            Read our latest article on Medium about the AWR journey and vision
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            className="overflow-hidden" 
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div className="w-full neo-glass rounded-2xl p-8 md:p-12 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <img 
                    src="/lovable-uploads/1a3e2030-93ba-48a8-bad1-11bf6f691350.png"
                    alt="Medium" 
                    className="w-8 h-8 mr-3" 
                  />
                  <div>
                    <h3 className="font-medium">AllWillRetire</h3>
                    <p className="text-sm text-muted-foreground">May 15, 2023 · 5 min read</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">Why Now Is The Perfect Time To Tell Our Story</h2>
                
                <div className="mb-6 relative overflow-hidden rounded-lg" style={{ maxHeight: isMobile ? '150px' : '250px' }}>
                  <img 
                    src="/lovable-uploads/bc81e8cb-c76b-4275-9298-3b08f6034bb4.png"
                    alt="AWR Community" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="prose prose-sm max-w-none mb-6">
                  <p className="line-clamp-3 md:line-clamp-4">
                    The current macroeconomic environment has changed the way we think about personal finance, security, and wealth. With traditional systems showing their vulnerabilities, people are looking for alternatives that provide both stability and growth potential. That's exactly what AllWillRetire offers - a community-driven approach to financial security that empowers individuals...
                  </p>
                </div>
                
                <a 
                  href="https://medium.com/@allwillretire/why-now-is-the-perfect-time-to-tell-our-story-c8a2ab6b8943" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center text-gold-600 hover:text-gold-700 font-medium"
                >
                  Read the full article on Medium
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? 'bg-gold-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button 
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={next}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
