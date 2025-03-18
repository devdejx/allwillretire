
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const VIDEOS_TO_PRELOAD = [
  "https://player.vimeo.com/video/1065963596?h=ff2bc9aa48&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1"
];

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(0);
  const totalVideos = VIDEOS_TO_PRELOAD.length;

  useEffect(() => {
    // Create elements to preload the videos
    const preloadVideos = () => {
      VIDEOS_TO_PRELOAD.forEach((videoUrl) => {
        // Create a hidden iframe to preload the video
        const iframe = document.createElement('iframe');
        iframe.src = videoUrl;
        iframe.className = 'preloaded-video';
        iframe.style.display = 'none';
        
        // When the iframe loads, update our loading progress
        iframe.onload = () => {
          setVideosLoaded(prev => {
            const newCount = prev + 1;
            // Update progress based on video loading (60% of total progress)
            const videoProgress = (newCount / totalVideos) * 60;
            setProgress(prev => Math.max(prev, videoProgress));
            return newCount;
          });
        };
        
        document.body.appendChild(iframe);
      });
    };

    // Start preloading videos
    preloadVideos();
    
    // Create a more realistic loading simulation with incremental progress for the remaining 40%
    const incrementProgress = () => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        // Only increment the remaining 40% of progress after videos have loaded
        if (prev < 60) return prev;
        // Slow down progress as it approaches 100%
        const increment = Math.max(0.5, 5 * (1 - (prev - 60) / 40));
        return Math.min(prev + increment, 99);
      });
    };

    const progressInterval = setInterval(incrementProgress, 100);
    
    // Simulate complete page load
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        // Clean up preloaded video iframes
        document.querySelectorAll('.preloaded-video').forEach(elem => {
          elem.remove();
        });
      }, 200); // Small delay after reaching 100%
    }, 3000); // Longer minimum loading time to ensure videos are loaded

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
      
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-full"
          style={{
            width: `${progress}%`,
            transition: 'width 0.3s ease-out'
          }}
        />
      </div>
      
      <div className="text-gold-500 text-sm font-medium">
        {progress < 60 ? 'Loading videos...' : 'Preparing experience...'}
      </div>
      
      <style>{`
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 15px 5px rgba(255, 195, 0, 0.4); }
          50% { box-shadow: 0 0 25px 10px rgba(255, 195, 0, 0.2); }
        }
        
        .preloaded-video {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
