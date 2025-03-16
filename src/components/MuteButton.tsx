
import { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const MuteButton = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [iframes, setIframes] = useState<HTMLIFrameElement[]>([]);

  // Bolj učinkovit debounced YouTube command handler
  const sendYouTubeCommand = useCallback((iframe: HTMLIFrameElement, command: string) => {
    if (iframe.contentWindow && iframe.src.includes('youtube.com')) {
      iframe.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
    }
  }, []);

  // Samo enkrat pridobi vse iframe elemente
  useEffect(() => {
    const findAndSetIframes = () => {
      // Poišči vse iframe elemente, ki bi lahko vsebovali zvok
      const frames = Array.from(document.querySelectorAll('iframe')) as HTMLIFrameElement[];
      
      // Preveri, če še manjkajo API parametri in jih dodaj
      frames.forEach(frame => {
        if (frame.src.includes('youtube.com') && !frame.src.includes('enablejsapi=1')) {
          const separator = frame.src.includes('?') ? '&' : '?';
          frame.src = `${frame.src}${separator}enablejsapi=1`;
        }
      });
      
      setIframes(frames);
    };

    // Prvotno iskanje
    findAndSetIframes();

    // Dodaj poslušalca za nove iframee, ki bi se lahko dinamično dodali kasneje
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          findAndSetIframes();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Efekt za upravljanje z zvočnim stanjem
  useEffect(() => {
    iframes.forEach(frame => {
      if (isMuted) {
        sendYouTubeCommand(frame, 'mute');
      } else {
        sendYouTubeCommand(frame, 'unMute');
      }
    });
  }, [isMuted, iframes, sendYouTubeCommand]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return (
    <button
      onClick={toggleMute}
      className={cn(
        "fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all",
        "bg-black/80 hover:bg-black text-white",
        "focus:outline-none focus:ring-2 focus:ring-gold-500",
        "transform hover:scale-105 active:scale-95"
      )}
      aria-label={isMuted ? "Unmute" : "Mute"}
      title={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <VolumeX size={20} />
      ) : (
        <Volume2 size={20} />
      )}
    </button>
  );
};

export default MuteButton;
