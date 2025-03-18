
/**
 * Utility for handling video loading and performance
 */

interface VideoLoaderOptions {
  onProgress?: (percent: number) => void;
  onComplete?: () => void;
}

// Posodobljeni URLji z boljšimi parametri za boljšo uspešnost in nižjo kakovost (720p namesto 1080p)
const videoUrls = [
  "https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=0&responsive=1&dnt=1&quality=720p",
  "https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=0&responsive=1&dnt=1&quality=720p",
  "https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1&controls=0&transparent=0&responsive=1&dnt=1&quality=720p"
];

// Inicializacija seznama naloženih videov
if (typeof window !== 'undefined') {
  window.loadedVideos = window.loadedVideos || [];
}

// Pomožne funckije za debug
const debugLog = (message: string) => {
  console.log(message);
};

export const markVideoAsLoaded = (iframe: HTMLIFrameElement) => {
  if (!iframe) return;
  
  debugLog(`Marking video as loaded: ${iframe.src}`);
  
  // Prisilno nastavi vidnost iframe-a
  iframe.style.opacity = '1';
  iframe.style.visibility = 'visible';
  iframe.style.display = 'block';
  iframe.style.width = '250%';
  iframe.style.height = '250%';
  iframe.style.minWidth = '250%';
  iframe.style.minHeight = '250%';
  
  // Dodaj razred loaded staršu
  if (iframe.parentElement) {
    iframe.parentElement.classList.add('loaded');
    iframe.parentElement.style.opacity = '1';
    iframe.parentElement.style.visibility = 'visible';
    iframe.parentElement.style.display = 'block';
  }
  
  // Shrani video kot naložen
  const videoSrc = iframe.src;
  if (videoSrc && typeof window !== 'undefined') {
    window.loadedVideos = window.loadedVideos || [];
    if (!window.loadedVideos.includes(videoSrc)) {
      window.loadedVideos.push(videoSrc);
      debugLog(`Video marked as loaded: ${videoSrc}`);
    }
  }
  
  // Poskusi osvežiti Vimeo predvajalnik
  try {
    // Pošlji več ukazov predvajalniku
    const commands = [
      { method: 'play' },
      { method: 'setVolume', value: 0 },
      { method: 'setLoop', value: true },
      { method: 'setCurrentTime', value: 0 }
    ];
    
    commands.forEach(cmd => {
      try {
        const message = JSON.stringify(cmd);
        iframe.contentWindow?.postMessage(message, '*');
      } catch (e) {
        console.error(`Failed to post ${cmd.method} message to iframe:`, e);
      }
    });
  } catch (e) {
    console.error('Failed to communicate with Vimeo player:', e);
  }
  
  // Poskusi z načinom ponovno nalaganja
  setTimeout(() => {
    try {
      const src = iframe.src;
      iframe.src = '';
      setTimeout(() => {
        iframe.src = src;
      }, 50);
    } catch (e) {
      console.error('Failed to reload iframe src:', e);
    }
  }, 2000);
};

export const setupVideoLoadListener = (iframe: HTMLIFrameElement) => {
  if (!iframe) return;
  
  debugLog(`Setting up video load listener for: ${iframe.src}`);
  
  // Ponastavi začetno stanje
  if (iframe.parentElement) {
    iframe.parentElement.style.opacity = '1'; // Spremenjeno v 1 za takojšnjo vidnost
  }
  
  // Več strategij za zagotovitev, da se video naloži in prikaže
  const strategies = [
    // Strategija 1: Poslušaj za iframe dogodek load
    () => {
      iframe.addEventListener('load', () => {
        debugLog(`Video iframe loaded via event: ${iframe.src}`);
        setTimeout(() => markVideoAsLoaded(iframe), 300);
      });
    },
    
    // Strategija 2: Prisilno nalaganje po zamiku (backup)
    () => {
      setTimeout(() => {
        debugLog(`Force loading video after timeout: ${iframe.src}`);
        markVideoAsLoaded(iframe);
      }, 1000);
    },
    
    // Strategija 3: Poslušaj za Vimeo API dogodke
    () => {
      window.addEventListener('message', (event) => {
        try {
          if (typeof event.data === 'string' && event.data.includes('{')) {
            const data = JSON.parse(event.data);
            if (data.event === 'ready' || data.event === 'play' || data.event === 'loaded') {
              const iframeSrc = iframe.src;
              const eventSource = data.player_origin || '';
              
              if (eventSource && iframeSrc && iframeSrc.includes(eventSource.replace('https://', ''))) {
                debugLog(`Vimeo video event ${data.event}: ${iframeSrc}`);
                markVideoAsLoaded(iframe);
              }
            }
          }
        } catch (e) {
          // Ignoriraj napake pri razčlenitvi JSON
        }
      });
    },
    
    // Strategija 4: Periodično preverjanje
    () => {
      const interval = setInterval(() => {
        const isVisible = iframe.getBoundingClientRect().width > 0;
        if (isVisible) {
          debugLog(`Video detected as visible via interval: ${iframe.src}`);
          markVideoAsLoaded(iframe);
          clearInterval(interval);
        }
      }, 500); // Preveri pogosteje
      
      // Počisti interval po 5 sekundah ne glede na vse
      setTimeout(() => clearInterval(interval), 5000);
    },
    
    // Strategija 5: Poskusi ponastaviti src za prisilno nalaganje
    () => {
      setTimeout(() => {
        try {
          const currentSrc = iframe.src;
          iframe.src = '';
          setTimeout(() => {
            iframe.src = currentSrc;
            debugLog(`Reset iframe src to force reload: ${currentSrc}`);
          }, 100);
        } catch (e) {
          console.error('Error resetting iframe src:', e);
        }
      }, 1500);
    },
    
    // Strategija 6: Uporabi CSS animacijo za prisilno prerisovanje
    () => {
      setTimeout(() => {
        iframe.style.animation = 'none';
        setTimeout(() => {
          iframe.style.animation = '';
          iframe.style.transform = 'translate(-50%, -50%) scale(1.01)';
          setTimeout(() => {
            iframe.style.transform = 'translate(-50%, -50%)';
          }, 50);
        }, 50);
      }, 2500);
    }
  ];
  
  // Uporabi vse strategije
  strategies.forEach(strategy => strategy());
  
  // Neposredno nastavi vidnost
  iframe.style.opacity = '1';
  iframe.style.visibility = 'visible';
  iframe.style.display = 'block';
};

// Preveri, ali so vsi videi prednaloženi
export const areAllVideosPreloaded = (): boolean => {
  if (typeof window === 'undefined') return false;
  window.loadedVideos = window.loadedVideos || [];
  return window.loadedVideos.length >= videoUrls.length;
};

export const getVideoUrls = () => videoUrls;

// Funkcija za ročno preverjanje in popravljanje vidnosti videov
export const checkVideoVisibility = () => {
  document.querySelectorAll('.video-background').forEach((video) => {
    if (video instanceof HTMLIFrameElement) {
      // Prisilna vidnost
      video.style.opacity = '1';
      video.style.visibility = 'visible';
      video.style.display = 'block';
      video.style.width = '250%';
      video.style.height = '250%';
      video.style.minWidth = '250%';
      video.style.minHeight = '250%';
      
      // Popravi tudi starševski element
      if (video.parentElement) {
        video.parentElement.classList.add('loaded');
        video.parentElement.style.opacity = '1';
        video.parentElement.style.visibility = 'visible';
        video.parentElement.style.display = 'block';
      }
      
      debugLog(`Manually fixed visibility for: ${video.src}`);
    }
  });
  
  // Dodaj posebno luč za prisilno prerisovanje
  const light = document.createElement('div');
  light.style.position = 'fixed';
  light.style.left = '0';
  light.style.top = '0';
  light.style.width = '1px';
  light.style.height = '1px';
  light.style.opacity = '0.01';
  light.style.backgroundColor = 'white';
  light.style.zIndex = '9999';
  light.style.pointerEvents = 'none';
  
  document.body.appendChild(light);
  setTimeout(() => {
    document.body.removeChild(light);
  }, 100);
};

// Nastavi MutationObserver za zaznavanje, ko so videi dodani v DOM
export const setupVideoVisibilityObserver = () => {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return;
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        setTimeout(checkVideoVisibility, 300);
      }
    });
  });
  
  // Začni opazovati dokument
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Izvajaj tudi periodična preverjanja
  const interval = setInterval(checkVideoVisibility, 1000);
  
  // Počisti interval po 30 sekundah
  setTimeout(() => {
    clearInterval(interval);
  }, 30000);
  
  return observer;
};

// Inicializiraj observer, ko je modul naložen
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    setupVideoVisibilityObserver();
    setTimeout(checkVideoVisibility, 500);
    setTimeout(checkVideoVisibility, 1000);
    setTimeout(checkVideoVisibility, 2000);
  });
  
  // Preveri tudi po nalaganju okna
  window.addEventListener('load', () => {
    setTimeout(checkVideoVisibility, 500);
    setTimeout(checkVideoVisibility, 1500);
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
