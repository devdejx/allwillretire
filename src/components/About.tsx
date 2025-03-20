import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import OptimizedImage from './OptimizedImage';
import { useIsMobile } from '@/hooks/use-mobile';

const About = () => {
  const isMobile = useIsMobile();
  
  return (
    <section id="about" className="pt-16 pb-20 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto mb-10 text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-gold-500">About AllWillRetire</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-artistic financial-freedom-title">
            A New Era of Financial Freedom
          </h2>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="mb-6 text-lg text-muted-foreground font-elegant">
              AllWillRetire isn't just another cryptocurrency; it's a movement towards securing a future where financial freedom isn't a dream, but a reality. We're dedicated to reshaping the landscape of digital finance, offering a beacon of hope in an ever-evolving world.
            </p>
            <p className="mb-6 text-lg text-muted-foreground font-elegant">
              Our mission is simple: to empower individuals from all walks of life, providing them with the tools and opportunities to achieve lasting financial independence. Through innovation, education, and community-driven initiatives, we're paving the way for a brighter, more prosperous tomorrow.
            </p>
            <p className="mb-6 text-lg text-muted-foreground font-elegant">
              Join us as we embark on this extraordinary journey together. With AllWillRetire, the promise of a secure and abundant future is within reach.
            </p>
          </div>
          <div>
            <AspectRatio ratio={16 / 9} className="w-full">
              <OptimizedImage 
                src="/lovable-uploads/c9990195-9949-4411-bb5c-5493a91a944b.png" 
                alt="Abstract golden design" 
                className="w-full h-full object-cover rounded-lg shadow-md" 
                priority={false} 
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
