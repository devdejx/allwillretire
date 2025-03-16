
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
}

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  fallbackSrc = "/placeholder.svg",
  lazyLoad = true,
  ...props 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(lazyLoad ? fallbackSrc : src);

  useEffect(() => {
    if (lazyLoad) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError(true);
        setIsLoading(false);
      };
    } else {
      setImageSrc(src);
    }
  }, [src, lazyLoad, fallbackSrc]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setError(true);
    setIsLoading(false);
    if (src !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
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
        className={cn("w-full h-full object-cover", className, {
          "opacity-0": isLoading,
          "transition-opacity duration-300": true,
        })}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={lazyLoad ? "lazy" : undefined}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
