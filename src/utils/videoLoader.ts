
/**
 * Utility for handling video loading and performance
 */

interface VideoLoaderOptions {
  onProgress?: (percent: number) => void;
  onComplete?: () => void;
}

const videoUrls = [
  "https://player.vimeo.com/video/1065963596?h=ff2bc9aa48&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1",
  "https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1"
];

export const markVideoAsLoaded = (iframe: HTMLIFrameElement) => {
  if (iframe && iframe.parentElement) {
    iframe.parentElement.classList.add('loaded');
  }
};

export const setupVideoLoadListener = (iframe: HTMLIFrameElement) => {
  if (!iframe) return;
  
  // When the iframe loads, mark its container as loaded
  iframe.addEventListener('load', () => {
    setTimeout(() => markVideoAsLoaded(iframe), 300);
  });
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
