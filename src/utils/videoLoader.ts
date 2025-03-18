
/**
 * Utility for handling video loading and performance
 */

interface VideoLoaderOptions {
  onProgress?: (percent: number) => void;
  onComplete?: () => void;
}

// Remove only the first video (1065963596), keep others
const videoUrls = [
  // Video 1065963596 has been removed
  "https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1"
];

export const markVideoAsLoaded = (iframe: HTMLIFrameElement) => {
  if (iframe && iframe.parentElement) {
    iframe.parentElement.classList.add('loaded');
    
    // Force a repaint to ensure the video is fully visible
    setTimeout(() => {
      if (iframe.parentElement) {
        iframe.parentElement.classList.add('fully-loaded');
      }
    }, 500);
  }
};

export const setupVideoLoadListener = (iframe: HTMLIFrameElement) => {
  if (!iframe) return;
  
  // Create more aggressive loading strategy with multiple fallbacks
  const forceVideoVisibility = () => {
    if (iframe && iframe.parentElement) {
      // Force iframe to be visible through style manipulation
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
      
      // Mark as loaded even if events don't fire properly
      markVideoAsLoaded(iframe);
      
      console.log('Force loaded video iframe:', iframe.src);
    }
  };
  
  // Set up multiple timeouts to ensure loading happens
  setTimeout(forceVideoVisibility, 1000); // Quick fallback
  setTimeout(forceVideoVisibility, 2500); // Medium fallback
  setTimeout(forceVideoVisibility, 5000); // Final fallback
  
  // Try to load through normal events as well
  iframe.addEventListener('load', () => {
    console.log('Video iframe loaded normally:', iframe.src);
    markVideoAsLoaded(iframe);
  });
  
  // Add additional loading state for debugging
  iframe.addEventListener('loadstart', () => console.log('Video iframe load started:', iframe.src));
  iframe.addEventListener('error', (e) => console.error('Video iframe error:', iframe.src, e));
};

export const areAllVideosPreloaded = (): boolean => {
  return document.querySelectorAll('.preloaded-video').length >= videoUrls.length;
};

export const getVideoUrls = () => videoUrls;

export default {
  markVideoAsLoaded,
  setupVideoLoadListener,
  areAllVideosPreloaded,
  getVideoUrls
};
