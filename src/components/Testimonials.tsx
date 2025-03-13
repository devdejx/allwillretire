
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            What Our <span className="text-gold-500">Community</span> Says
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from investors who have already begun their journey to financial freedom with AllWillRetire.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            className="overflow-hidden" 
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="neo-glass rounded-2xl p-8 md:p-12">
                    <Quote size={40} className="text-gold-500/30 mb-6" />
                    <blockquote className="text-xl md:text-2xl font-display mb-8">
                      "{item.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={item.avatar} 
                          alt={item.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{item.author}</div>
                        <div className="text-sm text-muted-foreground">{item.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
