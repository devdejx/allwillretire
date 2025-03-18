
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
  
  // More robust event handling for iframe loading
  const checkIframeLoaded = () => {
    // Mark as loaded after a reasonable timeout even if the event doesn't fire
    setTimeout(() => markVideoAsLoaded(iframe), 1000);
  };
  
  if (iframe.complete) {
    // If already complete, mark as loaded immediately
    markVideoAsLoaded(iframe);
  } else {
    // When the iframe loads, mark its container as loaded
    iframe.addEventListener('load', () => {
      markVideoAsLoaded(iframe);
    });
    
    // Fallback in case the load event doesn't fire
    checkIframeLoaded();
  }
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
