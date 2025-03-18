
/**
 * Utility for handling video loading and performance
 */

interface VideoLoaderOptions {
  onProgress?: (percent: number) => void;
  onComplete?: () => void;
}

// Define video URLs
const videoUrls = [
  "https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1"
];

// Function to mark video as loaded with more aggressive approach
export const markVideoAsLoaded = (iframe: HTMLIFrameElement) => {
  console.log('Marking video as loaded:', iframe.src);
  
  if (iframe && iframe.parentElement) {
    // Apply loaded class
    iframe.parentElement.classList.add('loaded');
    iframe.style.opacity = '1';
    iframe.style.visibility = 'visible';
    iframe.style.display = 'block';
    
    // Force a repaint for visibility after a short delay
    setTimeout(() => {
      if (iframe.parentElement) {
        iframe.parentElement.classList.add('fully-loaded');
        iframe.style.opacity = '1';
        iframe.style.visibility = 'visible';
        iframe.style.display = 'block';
        console.log('Video fully loaded:', iframe.src);
      }
    }, 500);
  }
};

// Enhanced video loading with multiple fallbacks
export const setupVideoLoadListener = (iframe: HTMLIFrameElement) => {
  if (!iframe) {
    console.error('No iframe provided to setupVideoLoadListener');
    return;
  }
  
  console.log('Setting up listener for video:', iframe.src);
  
  // Create more aggressive loading strategy with multiple fallbacks
  const forceVideoVisibility = () => {
    if (iframe && iframe.parentElement) {
      // Force iframe to be visible through style manipulation
      iframe.style.opacity = '1';
      iframe.style.visibility = 'visible';
      iframe.style.display = 'block';
      
      // Apply CSS classes to parent
      iframe.parentElement.classList.add('loaded');
      iframe.parentElement.classList.add('fully-loaded');
      
      console.log('Force loaded video iframe:', iframe.src);
    }
  };
  
  // Add load event listener
  iframe.addEventListener('load', () => {
    console.log('Video iframe loaded normally:', iframe.src);
    markVideoAsLoaded(iframe);
  });
  
  // Add error event listener
  iframe.addEventListener('error', (e) => {
    console.error('Video iframe error:', iframe.src, e);
    // Still try to make it visible on error
    forceVideoVisibility();
  });
  
  // Apply inline style to ensure iframe is visible
  iframe.style.opacity = '1';
  iframe.style.visibility = 'visible';
  iframe.style.display = 'block';
  
  // Set up cascading timeouts to ensure loading happens
  setTimeout(forceVideoVisibility, 500);  // Quick check
  setTimeout(forceVideoVisibility, 1500); // Medium check
  setTimeout(forceVideoVisibility, 3000); // Longer check
  setTimeout(forceVideoVisibility, 5000); // Final check
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
