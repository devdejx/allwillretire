
import React, { useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImage?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  fallbackImage,
  children,
  overlay = true,
  overlayOpacity = 0.5
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playsInline = true;
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* Fallback image for browsers that don't support video or while video is loading */}
      {fallbackImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        className="absolute object-cover w-full h-full z-10"
        preload="auto"
        playsInline
        muted
        loop
        autoPlay
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Optional overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 z-20 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content goes here */}
      {children && (
        <div className="relative z-30 h-full w-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
