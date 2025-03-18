
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { getVideoUrls } from '@/utils/videoLoader';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(0);
  const videoUrls = getVideoUrls();
  const totalVideos = videoUrls.length;
  const [preloadedFrames, setPreloadedFrames] = useState<HTMLIFrameElement[]>([]);

  useEffect(() => {
    // Create elements to preload the videos
    const preloadVideos = () => {
      const frames: HTMLIFrameElement[] = [];
      videoUrls.forEach((videoUrl) => {
        // Create a hidden iframe to preload the video
        const iframe = document.createElement('iframe');
        iframe.src = videoUrl;
        iframe.className = 'preloaded-video';
        iframe.allow = "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media";
        iframe.style.display = 'none';
        
        // Add debug info
        console.log('Preloading video:', videoUrl);
        
        // When the iframe loads, update our loading progress
        iframe.onload = () => {
          console.log('Preloaded video loaded:', videoUrl);
          setVideosLoaded(prev => {
            const newCount = prev + 1;
            // Update progress based on video loading (60% of total progress)
            const videoProgress = (newCount / totalVideos) * 60;
            setProgress(prev => Math.max(prev, videoProgress));
            return newCount;
          });
        };
        
        // Ensure iframe loads even if onload doesn't fire
        setTimeout(() => {
          setVideosLoaded(prev => {
            if (prev < totalVideos) {
              const newCount = prev + 1;
              const videoProgress = (newCount / totalVideos) * 60;
              setProgress(prev => Math.max(prev, videoProgress));
              return newCount;
            }
            return prev;
          });
        }, 3000);
        
        document.body.appendChild(iframe);
        frames.push(iframe);
      });
      
      // Store frames for cleanup
      setPreloadedFrames(frames);
    };

    // Ensure faster loading with fallbacks
    const timer1 = setTimeout(() => {
      setProgress(prev => Math.max(prev, 60));
    }, 2000);
    
    const timer2 = setTimeout(() => {
      setProgress(prev => Math.max(prev, 80));
    }, 2500);
    
    const timer3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }, 3000);

    // Start preloading videos
    preloadVideos();
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      // Clean up any preloaded iframes
      preloadedFrames.forEach(frame => {
        if (frame && frame.parentNode) {
          frame.parentNode.removeChild(frame);
        }
      });
    };
  }, [totalVideos, videoUrls]);

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
