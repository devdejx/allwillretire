
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load - lahko zamenjate z dejanskim preverjanjem nalaganja virov
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background",
        "transition-opacity duration-500",
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative">
        <img 
          src="/lovable-uploads/9736f09c-0f57-4e9f-86de-eb5f875fad9b.png" 
          alt="AllWillRetire Logo" 
          className="w-32 h-32 animate-pulse"
        />
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gold-500 rounded-full"
              style={{
                width: '100%',
                animation: 'preloaderProgress 1.5s ease-in-out'
              }}
            />
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes preloaderProgress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default Preloader;
