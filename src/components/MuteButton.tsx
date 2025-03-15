
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MuteButtonProps {
  className?: string;
}

const MuteButton = ({ className }: MuteButtonProps) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load Vimeo player API if it's not already loaded
    if (!window.Vimeo && !document.getElementById('vimeo-player-api')) {
      const script = document.createElement('script');
      script.id = 'vimeo-player-api';
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    
    // Send message to all YouTube iframes to mute/unmute
    const message = isMuted 
      ? '{"event":"command","func":"unMute","args":""}' 
      : '{"event":"command","func":"mute","args":""}';
    
    // Find all iframes and post message to them
    document.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.src.includes('youtube.com')) {
        try {
          iframe.contentWindow?.postMessage(message, '*');
        } catch (error) {
          console.error('Error sending message to iframe:', error);
        }
      }
      
      // Handle Vimeo videos
      if (iframe.src.includes('vimeo.com') && window.Vimeo) {
        try {
          const player = new window.Vimeo.Player(iframe);
          if (isMuted) {
            player.setVolume(1);
          } else {
            player.setVolume(0);
          }
        } catch (error) {
          console.error('Error controlling Vimeo player:', error);
        }
      }
    });
  };

  return (
    <button
      onClick={toggleMute}
      className={cn(
        "fixed z-50 bottom-6 right-6 p-3 rounded-full bg-black/80 backdrop-blur-sm text-white transition-all duration-300 hover:bg-black shadow-lg",
        "hover:scale-110 active:scale-95",
        className
      )}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <VolumeX className="h-6 w-6" />
      ) : (
        <Volume2 className="h-6 w-6" />
      )}
    </button>
  );
};

// Add Vimeo Player type for TypeScript
declare global {
  interface Window {
    Vimeo?: {
      Player: any;
    };
  }
}

export default MuteButton;
