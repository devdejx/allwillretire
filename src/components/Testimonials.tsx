import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from '@/components/ui/card';
import { useMediumArticles } from '@/utils/mediumFetcher';
import { Skeleton } from '@/components/ui/skeleton';
import OptimizedImage from '@/components/OptimizedImage';
import { toast } from '@/hooks/use-toast';

const fallbackArticles = [{
  title: "Statement On Magnetix",
  publishDate: "April 3, 2025",
  readTime: "6 min read",
  image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
  excerpt: "All Will Retire is in no way involved with Magnetix and has no desire to be. Recently events around a coin/community named Magnetix —led by Andrej Bohinc—have unfolded that have caused others to scrutinize them and unfortunately All Will Retire...",
  url: "https://medium.com/@allwillretire/statement-on-magnetix-d61e24e4355f"
}, {
  title: "Why Now Is The Perfect Time To Tell Our Story",
  publishDate: "March 15, 2025",
  readTime: "5 min read",
  image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
  excerpt: "The current macroeconomic environment has changed the way we think about personal finance, security, and wealth...",
  url: "https://medium.com/@allwillretire/why-now-is-the-perfect-time-to-tell-our-story-c8a2ab6b8943"
}, {
  title: "Staying Safe in the AWR Community",
  publishDate: "March 22, 2025",
  readTime: "4 min read",
  image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
  excerpt: "As our community grows, ensuring a safe environment for all members becomes increasingly important...",
  url: "https://medium.com/@allwillretire/staying-safe-in-the-awr-community-41b1a73fb943"
}, {
  title: "Celebrating the Aspirations of AWR",
  publishDate: "March 25, 2025",
  readTime: "4 min read",
  image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
  excerpt: "The AWR community's journey of shared dreams and collective vision for financial independence...",
  url: "https://medium.com/@allwillretire/celebrating-the-aspirations-of-awr-72872aaebb8f"
}, {
  title: "Why the Trump Coin Validates All Will Retire",
  publishDate: "March 28, 2025",
  readTime: "5 min read",
  image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
  excerpt: "Understanding the significance of cryptocurrency trends and their impact on financial independence...",
  url: "https://medium.com/@allwillretire/why-the-trump-coin-validates-all-will-retire-c575653994a7"
}, {
  title: "AWR Day 43: Small Incremental Progress to Believe In",
  publishDate: "March 30, 2025",
  readTime: "3 min read",
  image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
  excerpt: "Tracking our daily progress and celebrating small wins on the path to financial freedom...",
  url: "https://medium.com/@allwillretire/awr-day-43-small-incremental-progress-to-believe-in-5f788a1b69d7"
}, {
  title: "Why We Need Stress-Scaling Communities: Being Process Oriented",
  publishDate: "April 2, 2025",
  readTime: "4 min read",
  image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
  excerpt: "Exploring the importance of community resilience and sustainable growth strategies...",
  url: "https://medium.com/@allwillretire/why-we-need-stress-scaling-communities-being-process-oriented-1cd5ebe372a8"
}];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const isMobile = useIsMobile();
  const { data: mediumArticles, isLoading, error } = useMediumArticles();
  
  const articles = React.useMemo(() => {
    if (error || !mediumArticles || mediumArticles.length === 0) {
      console.log("Using fallback articles due to error or empty response");
      return fallbackArticles;
    }
    
    console.log(`Received ${mediumArticles.length} articles from API`);
    mediumArticles.forEach((article, i) => {
      console.log(`API Article ${i + 1}: ${article.title} - URL: ${article.url} - Image: ${article.image}`);
    });
    
    const apiUrls = new Set(mediumArticles.map(a => a.url));
    const missingArticles = fallbackArticles.filter(article => {
      const normalizedUrl = article.url.split('?')[0];
      return !apiUrls.has(normalizedUrl);
    });
    
    if (missingArticles.length > 0) {
      console.log(`Found ${missingArticles.length} articles missing from API, adding them`);
      missingArticles.forEach(article => {
        console.log(`Adding missing article: ${article.title} - ${article.url}`);
      });
      
      return [...mediumArticles, ...missingArticles];
    }
    
    return mediumArticles;
  }, [mediumArticles, error]);

  useEffect(() => {
    if (error) {
      console.error("Error loading Medium articles:", error);
      toast({
        title: "Couldn't load latest articles",
        description: "Using cached articles instead.",
        variant: "destructive"
      });
    } else if (mediumArticles) {
      console.log("Medium articles loaded successfully:", mediumArticles.length);
    }
  }, [mediumArticles, error]);

  const next = () => {
    setCurrent(prev => prev === articles.length - 1 ? 0 : prev + 1);
  };
  const prev = () => {
    setCurrent(prev => prev === 0 ? articles.length - 1 : prev - 1);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      next();
    }, 7000);
    return () => clearInterval(interval);
  }, [autoplay, current]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[400px]">
      <Skeleton className="w-full max-w-4xl h-[400px] rounded-xl" />
    </div>;
  }

  return <section id="community" className="py-24 relative overflow-hidden">
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
          <p className="text-lg text-muted-foreground">Read more about our journey on Medium</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden" onMouseEnter={() => setAutoplay(false)} onMouseLeave={() => setAutoplay(true)}>
            {articles.map((article, index) => (
              <div 
                key={`${article.url}-${index}`} 
                className={`w-full neo-glass rounded-2xl p-8 md:p-12 hover:shadow-lg transition-shadow duration-300 absolute inset-0 ${
                  index === current ? 'opacity-100 z-10 transform translate-x-0 transition-all duration-500' : 'opacity-0 -z-10 transform translate-x-full transition-all duration-500'
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <img src="/lovable-uploads/1a3e2030-93ba-48a8-bad1-11bf6f691350.png" alt="Medium" className="w-8 h-8 mr-3" />
                    <div>
                      <h3 className="font-medium">AllWillRetire</h3>
                      <p className="text-sm text-muted-foreground">{article.publishDate} · {article.readTime}</p>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
                  
                  <div className="mb-6 relative overflow-hidden rounded-lg" style={{
                    maxHeight: isMobile ? '150px' : '250px'
                  }}>
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        console.error(`Error loading image for ${article.title}: ${article.image}`);
                        e.currentTarget.src = "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*m-R_BkNf1Qjr1YbyOIJY2w.png";
                      }}
                    />
                  </div>
                  
                  <div className="prose prose-sm max-w-none mb-6">
                    <p className="line-clamp-3 md:line-clamp-4">
                      {article.excerpt}
                    </p>
                  </div>
                  
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-auto inline-flex items-center text-gold-600 hover:text-gold-700 font-medium"
                    onClick={() => {
                      console.log(`Clicked on article: ${article.title} - ${article.url}`);
                    }}
                  >
                    Read the full article on Medium
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
            
            <div className="w-full neo-glass rounded-2xl p-8 md:p-12 invisible">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 mr-3"></div>
                  <div>
                    <h3 className="font-medium invisible">AllWillRetire</h3>
                    <p className="text-sm text-muted-foreground invisible">Date</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 invisible">Title</h2>
                
                <div className="mb-6 relative overflow-hidden rounded-lg" style={{
                height: isMobile ? '150px' : '250px'
              }}>
                </div>
                
                <div className="prose prose-sm max-w-none mb-6">
                  <p className="line-clamp-3 md:line-clamp-4 invisible">
                    Placeholder text
                  </p>
                </div>
                
                <div className="mt-auto inline-flex items-center invisible">
                  Read more
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            {articles.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrent(index)} 
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === current ? 'bg-gold-500' : 'bg-gray-300'
                }`} 
                aria-label={`Go to article ${index + 1}`} 
              />
            ))}
          </div>

          <button 
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20" 
            onClick={prev} 
            aria-label="Previous article"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20" 
            onClick={next} 
            aria-label="Next article"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>;
};

export default Testimonials;
