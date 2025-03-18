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
        
        // Set essential styles
        iframe.style.display = 'block';
        iframe.style.visibility = 'visible';
        iframe.style.opacity = '1';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.pointerEvents = 'none';
        
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
        const forceLoad = setTimeout(() => {
          console.log('Force marking video as loaded:', videoUrl);
          setVideosLoaded(prev => {
            if (prev < totalVideos) {
              const newCount = prev + 1;
              const videoProgress = (newCount / totalVideos) * 60;
              setProgress(prev => Math.max(prev, videoProgress));
              return newCount;
            }
            return prev;
          });
        }, 2000);
        
        document.body.appendChild(iframe);
        frames.push(iframe);
      });
      
      // Store frames for cleanup
      setPreloadedFrames(frames);
    };

    // Ensure faster loading with fallbacks
    const timer1 = setTimeout(() => {
      setProgress(prev => Math.max(prev, 60));
    }, 1500);
    
    const timer2 = setTimeout(() => {
      setProgress(prev => Math.max(prev, 80));
    }, 2000);
    
    const timer3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }, 2500);

    // Start preloading videos
    preloadVideos();
    
    // Add global styles to force video visibility
    const style = document.createElement('style');
    style.textContent = `
      iframe.video-background {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
        z-index: 15 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      
      // Remove the style element
      if (style.parentNode) {
        document.head.removeChild(style);
      }
      
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
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          opacity: 1 !important;
          pointer-events: none !important;
          z-index: -1 !important;
          visibility: visible !important;
          display: block !important;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
