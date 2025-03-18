
/**
 * Utility for handling video loading and performance
 */

interface VideoLoaderOptions {
  onProgress?: (percent: number) => void;
  onComplete?: () => void;
}

// Posodobljeni URL-ji z dodatnimi parametri za boljše delovanje
const videoUrls = [
  "https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=0&responsive=1&dnt=1",
  "https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=0&responsive=1&dnt=1",
  "https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=0&responsive=1&dnt=1"
];

// Inicializacija seznama naloženih videov
if (typeof window !== 'undefined' && !window.loadedVideos) {
  window.loadedVideos = [];
}

export const markVideoAsLoaded = (iframe: HTMLIFrameElement) => {
  if (iframe && iframe.parentElement) {
    // Nastavi vidnost na 100%
    iframe.parentElement.classList.add('loaded');
    iframe.style.opacity = '1';
    
    // Shrani ID videa kot naložen
    const videoSrc = iframe.src;
    if (videoSrc && typeof window !== 'undefined' && window.loadedVideos) {
      if (!window.loadedVideos.includes(videoSrc)) {
        window.loadedVideos.push(videoSrc);
        console.log(`Video marked as loaded: ${videoSrc}`);
      }
    }
  }
};

export const setupVideoLoadListener = (iframe: HTMLIFrameElement) => {
  if (!iframe) return;
  
  // Nastavi vidnost na 0 med nalaganjem
  if (iframe.parentElement) {
    iframe.parentElement.style.opacity = '0';
  }
  
  // Alternativni način nalaganja, ki ga uporabimo za Vimeo posnetke
  const forceLoadVideo = () => {
    console.log(`Force loading video: ${iframe.src}`);
    setTimeout(() => markVideoAsLoaded(iframe), 1500);
  };
  
  // Ob nalaganju označi, da je video naložen
  iframe.addEventListener('load', () => {
    console.log(`Video iframe loaded: ${iframe.src}`);
    setTimeout(() => markVideoAsLoaded(iframe), 800);
  });
  
  // Varnostni časovnik, če dogodek 'load' ne bi bil sprožen
  setTimeout(forceLoadVideo, 3000);
  
  // Postavi poslušalca za sporočila iz iframe-a
  window.addEventListener('message', (event) => {
    try {
      if (typeof event.data === 'string' && event.data.startsWith('{')) {
        const data = JSON.parse(event.data);
        // Ujemamo Vimeo dogodke
        if (data.event === 'ready' || data.event === 'play') {
          const iframeSrc = iframe.src;
          const eventSource = data.player_origin || '';
          
          if (eventSource && iframeSrc && iframeSrc.includes(eventSource.replace('https://', ''))) {
            console.log(`Vimeo video event ${data.event}: ${iframeSrc}`);
            markVideoAsLoaded(iframe);
          }
        }
      }
    } catch (e) {
      // Ignoriramo napake pri obdelavi JSON
    }
  });
};

// Preverimo, če so vsi videoposnetki prednaloženi
export const areAllVideosPreloaded = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (!window.loadedVideos) window.loadedVideos = [];
  return window.loadedVideos.length >= videoUrls.length;
};

export const getVideoUrls = () => videoUrls;

// Funkcija za ročno preverjanje in popravljanje vidnosti videov
export const checkVideoVisibility = () => {
  document.querySelectorAll('.video-background').forEach((video) => {
    if (video instanceof HTMLIFrameElement) {
      // Če je video že naložen, ampak ni viden
      if (!video.parentElement?.classList.contains('loaded')) {
        console.log(`Fixing visibility for: ${video.src}`);
        markVideoAsLoaded(video);
      }
      
      // Ročno nastavimo vidnost
      video.style.opacity = '1';
      if (video.parentElement) {
        video.parentElement.classList.add('loaded');
        video.parentElement.style.opacity = '1';
      }
    }
  });
};

// Nastavimo interval za preverjanje vidnosti
if (typeof window !== 'undefined') {
  setInterval(checkVideoVisibility, 2000);
}

export default {
  markVideoAsLoaded,
  setupVideoLoadListener,
  areAllVideosPreloaded,
  getVideoUrls,
  checkVideoVisibility
};
