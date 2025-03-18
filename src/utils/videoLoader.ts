
/**
 * Utility for handling video loading and performance
 */

// Define video URLs
const videoUrls = [
  "https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1"
];

// This function applies important CSS directly to the iframe to ensure visibility
export const markVideoAsLoaded = (iframe: HTMLIFrameElement) => {
  console.log('Marking video as loaded:', iframe.src);
  
  if (!iframe) return;
  
  // Apply critical inline styles directly to the iframe
  iframe.style.display = 'block !important';
  iframe.style.visibility = 'visible !important';
  iframe.style.opacity = '1 !important';
  iframe.style.zIndex = '15 !important';
  
  // Add inline styles to ensure visibility through CSS
  iframe.setAttribute('data-loaded', 'true');
  
  // Add CSS classes to parent for additional styling hooks
  if (iframe.parentElement) {
    iframe.parentElement.classList.add('loaded', 'fully-loaded');
    iframe.parentElement.setAttribute('data-video-loaded', 'true');
  }
  
  // Force a repaint by manipulating the DOM
  const temp = iframe.style.display;
  iframe.style.display = 'none';
  void iframe.offsetHeight; // Force reflow
  iframe.style.display = temp;
};

// Setup a more aggressive approach to video loading
export const setupVideoLoadListener = (iframe: HTMLIFrameElement) => {
  if (!iframe) {
    console.error('No iframe provided to setupVideoLoadListener');
    return;
  }
  
  console.log('Setting up listener for video:', iframe.src);
  
  // Apply critical styles immediately
  applyMandatoryStyles(iframe);
  
  // Create more aggressive loading strategy with multiple approaches
  const forceVideoVisibility = () => {
    console.log('Force loaded video iframe:', iframe.src);
    
    // Apply critical styles directly
    applyMandatoryStyles(iframe);
    
    // Add required CSS classes
    if (iframe.parentElement) {
      iframe.parentElement.classList.add('loaded', 'fully-loaded');
      iframe.parentElement.setAttribute('data-video-loaded', 'true');
    }
    
    // Add to global tracking
    window.loadedVideos = window.loadedVideos || [];
    if (!window.loadedVideos.includes(iframe.src)) {
      window.loadedVideos.push(iframe.src);
    }
  };
  
  // Apply required styles immediately
  applyMandatoryStyles(iframe);
  
  // Load event listener
  iframe.addEventListener('load', () => {
    console.log('Video iframe loaded normally:', iframe.src);
    markVideoAsLoaded(iframe);
    forceVideoVisibility();
  });
  
  // Setup cascading timeouts to ensure loading
  [100, 300, 500, 1000, 2000, 3000, 5000].forEach(timeout => {
    setTimeout(() => forceVideoVisibility(), timeout);
  });
  
  // Set a data attribute to signify we've attached listeners
  iframe.setAttribute('data-has-listeners', 'true');
};

// Helper function to apply critical styles
const applyMandatoryStyles = (iframe: HTMLIFrameElement) => {
  if (!iframe) return;
  
  // Apply inline styles directly to the iframe elements
  const criticalStyles = {
    'display': 'block',
    'visibility': 'visible',
    'opacity': '1',
    'z-index': '15',
    'position': 'absolute',
    'transform': 'none',
    'width': '150%',
    'height': '150%'
  };
  
  // Apply all critical styles directly
  Object.entries(criticalStyles).forEach(([property, value]) => {
    iframe.style.setProperty(property, value, 'important');
  });
  
  // Add required classes
  iframe.classList.add('visible-video', 'video-background');
  
  // Add a data attribute to track this iframe
  iframe.setAttribute('data-video-visible', 'true');
};

// Add a global CSS rule to force iframe visibility
export const addGlobalVideoVisibilityStyles = () => {
  // Create a style element if it doesn't exist
  let styleEl = document.getElementById('video-visibility-styles');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'video-visibility-styles';
    document.head.appendChild(styleEl);
  }
  
  // Add CSS rules to force video visibility
  styleEl.textContent = `
    iframe.video-background {
      opacity: 1 !important;
      visibility: visible !important;
      display: block !important;
      z-index: 15 !important;
    }
    
    .absolute.video-background {
      opacity: 1 !important;
      visibility: visible !important;
      display: block !important;
    }
    
    [data-video-loaded="true"] iframe,
    [data-video-visible="true"],
    iframe[data-loaded="true"],
    iframe[data-has-listeners="true"] {
      opacity: 1 !important;
      visibility: visible !important;
      display: block !important;
      z-index: 15 !important;
    }
  `;
};

export const areAllVideosPreloaded = (): boolean => {
  return document.querySelectorAll('.preloaded-video').length >= videoUrls.length;
};

export const getVideoUrls = () => videoUrls;

// Initialize global video visibility on script load
setTimeout(() => {
  addGlobalVideoVisibilityStyles();
  
  // Ensure global visibility for all iframe videos
  document.querySelectorAll('iframe.video-background').forEach((iframe) => {
    if (iframe instanceof HTMLIFrameElement) {
      setupVideoLoadListener(iframe);
    }
  });
}, 100);

export default {
  markVideoAsLoaded,
  setupVideoLoadListener,
  areAllVideosPreloaded,
  getVideoUrls,
  addGlobalVideoVisibilityStyles
};
