
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
  const [imageSrc, setImageSrc] = useState(priority ? src : (lazyLoad ? "" : src));
  const [imageLoaded, setImageLoaded] = useState(priority);
  const uniqueId = `img-${src.replace(/[^a-zA-Z0-9]/g, '')}`;
  
  // Preload images in memory before displaying
  useEffect(() => {
    // Priority images are loaded immediately
    if (priority) {
      setImageSrc(src);
      setIsLoading(false);
      setImageLoaded(true);
      return;
    }
    
    // For lazy-loaded images, use IntersectionObserver
    if (lazyLoad) {
      const imgRef = document.getElementById(uniqueId);
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Create an image in memory to preload
          const imgElement = new Image();
          imgElement.src = src;
          
          // Once the image is loaded, update state
          imgElement.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
            setImageLoaded(true);
            observer.disconnect();
          };
          
          // Handle error case
          imgElement.onerror = () => {
            setError(true);
            setIsLoading(false);
            if (src !== fallbackSrc) {
              setImageSrc(fallbackSrc);
            }
            observer.disconnect();
          };
        }
      }, { rootMargin: '200px 0px' }); // Start loading 200px before entering viewport
      
      if (imgRef) observer.observe(imgRef);
      
      return () => observer.disconnect();
    } else {
      // For non-lazy images, load right away but still preload
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
        setImageLoaded(true);
      };
      
      img.onerror = () => {
        setError(true);
        setIsLoading(false);
        if (src !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
      };
    }
  }, [src, lazyLoad, fallbackSrc, priority, uniqueId]);

  return (
    <div 
      className={cn("relative overflow-hidden", className)} 
      style={{ width, height }}
      id={uniqueId}
    >
      {isLoading && (
        <Skeleton 
          className={cn("absolute inset-0 rounded-md", className)}
          style={{ width: '100%', height: '100%' }}
        />
      )}
      
      {(imageLoaded || error || !lazyLoad) && (
        <img
          src={error && src !== fallbackSrc ? fallbackSrc : imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300", 
            !imageLoaded && lazyLoad ? "opacity-0" : "opacity-100",
            blur && !isLoading ? "blur-none" : blur ? "blur-sm" : "",
            className
          )}
          onLoad={() => {
            setIsLoading(false);
            setImageLoaded(true);
          }}
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
      )}
    </div>
  );
};

export default OptimizedImage;
