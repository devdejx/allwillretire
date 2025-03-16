
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  lazyLoad?: boolean;
  priority?: boolean;
  blur?: boolean;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  fallbackSrc = "/placeholder.svg",
  lazyLoad = true,
  priority = false,
  blur = false,
  ...props 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : (lazyLoad ? fallbackSrc : src));
  
  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority) {
      setImageSrc(src);
      setIsLoading(false);
      return;
    }
    
    if (lazyLoad) {
      const imgElement = document.createElement('img');
      
      // Set up intersection observer for viewport detection
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          imgElement.src = src;
          imgElement.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
            observer.disconnect();
          };
          imgElement.onerror = () => {
            setError(true);
            setIsLoading(false);
            if (src !== fallbackSrc) {
              setImageSrc(fallbackSrc);
            }
            observer.disconnect();
          };
        }
      }, { rootMargin: '200px 0px' }); // Start loading when within 200px of viewport
      
      const imgRef = document.getElementById(`img-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
      if (imgRef) observer.observe(imgRef);
      
      return () => observer.disconnect();
    } else {
      setImageSrc(src);
      
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoading(false);
      img.onerror = () => {
        setError(true);
        setIsLoading(false);
        if (src !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
      };
    }
  }, [src, lazyLoad, fallbackSrc, priority]);

  return (
    <div 
      className={cn("relative overflow-hidden", className)} 
      style={{ width, height }}
      id={`img-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
    >
      {isLoading && (
        <Skeleton 
          className={cn("absolute inset-0 rounded-md", className)}
          style={{ width: '100%', height: '100%' }}
        />
      )}
      
      <img
        src={error && src !== fallbackSrc ? fallbackSrc : imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "w-full h-full object-cover transition-all", 
          isLoading ? "opacity-0 scale-110" : "opacity-100 scale-100",
          blur && !isLoading ? "blur-none" : blur ? "blur-sm" : "",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
          if (src !== fallbackSrc) {
            setImageSrc(fallbackSrc);
          }
        }}
        loading={priority ? "eager" : (lazyLoad ? "lazy" : undefined)}
        decoding={priority ? "sync" : "async"}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
