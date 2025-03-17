
import React, { useState, useEffect, memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : '');
  
  // Determine image quality based on device
  const getOptimizedSrc = (originalSrc: string) => {
    if (isMobile && originalSrc.includes('lovable-uploads/')) {
      // For mobile, use a smaller version if we're using project images
      return originalSrc;
    }
    return originalSrc;
  };
  
  useEffect(() => {
    if (priority) {
      setImageSrc(getOptimizedSrc(src));
      setIsLoading(false);
      return;
    }
    
    let isMounted = true;
    
    if (!lazyLoad) {
      // Not lazy loading - load immediately
      setImageSrc(getOptimizedSrc(src));
      const img = new Image();
      img.src = getOptimizedSrc(src);
      img.onload = () => {
        if (isMounted) setIsLoading(false);
      };
      img.onerror = () => {
        if (isMounted) {
          setError(true);
          setIsLoading(false);
          if (src !== fallbackSrc) {
            setImageSrc(fallbackSrc);
          }
        }
      };
    } else {
      // Using intersection observer for lazy loading
      const imgElement = document.createElement('img');
      
      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
          const optimizedSrc = getOptimizedSrc(src);
          setImageSrc(optimizedSrc);
          
          imgElement.onload = () => {
            if (isMounted) {
              setIsLoading(false);
              observer.disconnect();
            }
          };
          
          imgElement.onerror = () => {
            if (isMounted) {
              setError(true);
              setIsLoading(false);
              if (src !== fallbackSrc) {
                setImageSrc(fallbackSrc);
              }
              observer.disconnect();
            }
          };
          
          imgElement.src = optimizedSrc;
        }
      };
      
      const observer = new IntersectionObserver(handleIntersection, { 
        rootMargin: '200px 0px',
        threshold: 0.01
      });
      
      const imgId = `img-${src.replace(/[^a-zA-Z0-9]/g, '')}`;
      const imgRef = document.getElementById(imgId);
      
      if (imgRef) observer.observe(imgRef);
      
      return () => {
        isMounted = false;
        observer.disconnect();
      };
    }
    
    return () => {
      isMounted = false;
    };
  }, [src, lazyLoad, fallbackSrc, priority, isMobile]);

  // Skip loading animation for priority images on mobile
  const showLoadingPlaceholder = isLoading && !(priority && isMobile);

  return (
    <div 
      className={cn("relative overflow-hidden", className)} 
      style={{ width, height }}
      id={`img-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
    >
      {showLoadingPlaceholder && (
        <Skeleton 
          className={cn("absolute inset-0 rounded-md", className)}
          style={{ width: '100%', height: '100%' }}
        />
      )}
      
      {imageSrc && (
        <img
          src={error && src !== fallbackSrc ? fallbackSrc : imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300", 
            isLoading ? "opacity-0" : "opacity-100",
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
          loading={priority ? "eager" : (lazyLoad ? "lazy" : "eager")}
          decoding={priority ? "sync" : "async"}
          {...props}
        />
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(OptimizedImage);
