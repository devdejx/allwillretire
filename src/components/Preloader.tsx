
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Create a more realistic loading simulation with incremental progress
    const incrementProgress = () => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        // Slow down progress as it approaches 100%
        const increment = Math.max(0.5, 5 * (1 - prev / 100));
        return Math.min(prev + increment, 99);
      });
    };

    const progressInterval = setInterval(incrementProgress, 100);
    
    // Simulate complete page load
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 200); // Small delay after reaching 100%
    }, 2000); // Minimum loading time

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background",
        "transition-all duration-700 ease-in-out",
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-gold-500/20 rounded-full blur-lg animate-pulse"></div>
        <img 
          src="/lovable-uploads/9736f09c-0f57-4e9f-86de-eb5f875fad9b.png" 
          alt="AllWillRetire Logo" 
          className={cn(
            "w-32 h-32 relative z-10",
            "transition-transform duration-1000 ease-in-out",
            loading ? "scale-100" : "scale-110"
          )}
        />
      </div>
      
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-full"
          style={{
            width: `${progress}%`,
            transition: 'width 0.3s ease-out'
          }}
        />
      </div>
      
      <style>{`
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 15px 5px rgba(255, 195, 0, 0.4); }
          50% { box-shadow: 0 0 25px 10px rgba(255, 195, 0, 0.2); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
