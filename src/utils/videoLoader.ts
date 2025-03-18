
/**
 * Utility for handling video loading and performance
 */

interface VideoLoaderOptions {
  onProgress?: (percent: number) => void;
  onComplete?: () => void;
}

// Updated URLs with better parameters for improved performance
const videoUrls = [
  "https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=0&responsive=1&dnt=1&quality=1080p",
  "https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=0&responsive=1&dnt=1&quality=1080p",
  "https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=0&responsive=1&dnt=1&quality=1080p"
];

// Initialize loaded videos list
if (typeof window !== 'undefined') {
  window.loadedVideos = window.loadedVideos || [];
}

export const markVideoAsLoaded = (iframe: HTMLIFrameElement) => {
  if (!iframe) return;
  
  console.log(`Marking video as loaded: ${iframe.src}`);
  
  // Force iframe visibility
  iframe.style.opacity = '1';
  iframe.style.visibility = 'visible';
  iframe.style.display = 'block';
  
  // Add loaded class to parent
  if (iframe.parentElement) {
    iframe.parentElement.classList.add('loaded');
    iframe.parentElement.style.opacity = '1';
    iframe.parentElement.style.visibility = 'visible';
  }
  
  // Store video as loaded
  const videoSrc = iframe.src;
  if (videoSrc && typeof window !== 'undefined') {
    window.loadedVideos = window.loadedVideos || [];
    if (!window.loadedVideos.includes(videoSrc)) {
      window.loadedVideos.push(videoSrc);
      console.log(`Video marked as loaded: ${videoSrc}`);
    }
  }
  
  // Attempt to refresh Vimeo player
  try {
    const message = JSON.stringify({ method: 'play' });
    iframe.contentWindow?.postMessage(message, '*');
  } catch (e) {
    console.error('Failed to post play message to iframe:', e);
  }
};

export const setupVideoLoadListener = (iframe: HTMLIFrameElement) => {
  if (!iframe) return;
  
  console.log(`Setting up video load listener for: ${iframe.src}`);
  
  // Reset initial state
  if (iframe.parentElement) {
    iframe.parentElement.style.opacity = '0';
  }
  
  // Multiple strategies to ensure the video loads and displays
  const strategies = [
    // Strategy 1: Listen for iframe load event
    () => {
      iframe.addEventListener('load', () => {
        console.log(`Video iframe loaded via event: ${iframe.src}`);
        setTimeout(() => markVideoAsLoaded(iframe), 500);
      });
    },
    
    // Strategy 2: Force load after delay (backup)
    () => {
      setTimeout(() => {
        console.log(`Force loading video after timeout: ${iframe.src}`);
        markVideoAsLoaded(iframe);
      }, 2000);
    },
    
    // Strategy 3: Listen for Vimeo API events
    () => {
      window.addEventListener('message', (event) => {
        try {
          if (typeof event.data === 'string' && event.data.includes('{')) {
            const data = JSON.parse(event.data);
            if (data.event === 'ready' || data.event === 'play' || data.event === 'loaded') {
              const iframeSrc = iframe.src;
              const eventSource = data.player_origin || '';
              
              if (eventSource && iframeSrc && iframeSrc.includes(eventSource.replace('https://', ''))) {
                console.log(`Vimeo video event ${data.event}: ${iframeSrc}`);
                markVideoAsLoaded(iframe);
              }
            }
          }
        } catch (e) {
          // Ignore JSON parsing errors
        }
      });
    },
    
    // Strategy 4: Periodic check
    () => {
      const interval = setInterval(() => {
        const isVisible = iframe.getBoundingClientRect().width > 0;
        if (isVisible) {
          console.log(`Video detected as visible via interval: ${iframe.src}`);
          markVideoAsLoaded(iframe);
          clearInterval(interval);
        }
      }, 1000);
      
      // Clear interval after 10 seconds regardless
      setTimeout(() => clearInterval(interval), 10000);
    }
  ];
  
  // Apply all strategies
  strategies.forEach(strategy => strategy());
};

// Check if all videos are preloaded
export const areAllVideosPreloaded = (): boolean => {
  if (typeof window === 'undefined') return false;
  window.loadedVideos = window.loadedVideos || [];
  return window.loadedVideos.length >= videoUrls.length;
};

export const getVideoUrls = () => videoUrls;

// Function to manually check and fix video visibility
export const checkVideoVisibility = () => {
  document.querySelectorAll('.video-background').forEach((video) => {
    if (video instanceof HTMLIFrameElement) {
      // Force visibility
      video.style.opacity = '1';
      video.style.visibility = 'visible';
      video.style.display = 'block';
      
      // Also fix parent element
      if (video.parentElement) {
        video.parentElement.classList.add('loaded');
        video.parentElement.style.opacity = '1';
        video.parentElement.style.visibility = 'visible';
      }
      
      console.log(`Manually fixed visibility for: ${video.src}`);
    }
  });
};

// Set up MutationObserver to detect when videos are added to the DOM
export const setupVideoVisibilityObserver = () => {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        setTimeout(checkVideoVisibility, 500);
      }
    });
  });
  
  // Start observing the document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Also run periodic checks
  setInterval(checkVideoVisibility, 3000);
  
  return observer;
};

// Initialize observer when module is loaded
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    setupVideoVisibilityObserver();
    setTimeout(checkVideoVisibility, 1000);
  });
  
  // Also check after window load
  window.addEventListener('load', () => {
    setTimeout(checkVideoVisibility, 1000);
    setTimeout(checkVideoVisibility, 3000);
  });
}

export default {
  markVideoAsLoaded,
  setupVideoLoadListener,
  areAllVideosPreloaded,
  getVideoUrls,
  checkVideoVisibility,
  setupVideoVisibilityObserver
};
