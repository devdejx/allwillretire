
import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const MuteButton = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [iframes, setIframes] = useState<HTMLIFrameElement[]>([]);

  useEffect(() => {
    // Find all iframes that might contain audio
    const frames = Array.from(document.querySelectorAll('iframe')) as HTMLIFrameElement[];
    setIframes(frames);
    
    // Set the initial mute state
    frames.forEach(frame => {
      if (frame.src.includes('youtube.com')) {
        if (isMuted) {
          muteYouTubeVideo(frame);
        } else {
          unmuteYouTubeVideo(frame);
        }
      }
    });
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const muteYouTubeVideo = (iframe: HTMLIFrameElement) => {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
    }
  };

  const unmuteYouTubeVideo = (iframe: HTMLIFrameElement) => {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
    }
  };

  return (
    <button
      onClick={toggleMute}
      className={cn(
        "fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all",
        "bg-black/80 hover:bg-black text-white",
        "focus:outline-none focus:ring-2 focus:ring-gold-500"
      )}
      aria-label={isMuted ? "Unmute" : "Mute"}
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
