
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MuteButtonProps {
  className?: string;
}

const MuteButton = ({ className }: MuteButtonProps) => {
  const [isMuted, setIsMuted] = useState(true); // Default to muted

  useEffect(() => {
    // Load Vimeo player API if it's not already loaded
    if (!window.Vimeo && !document.getElementById('vimeo-player-api')) {
      const script = document.createElement('script');
      script.id = 'vimeo-player-api';
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.body.appendChild(script);

      // Add an onload handler to mute all videos when the script loads
      script.onload = () => {
        muteAllVideos();
      };
    } else if (window.Vimeo) {
      // If Vimeo API is already loaded, mute all videos immediately
      muteAllVideos();
    }
  }, []);

  const muteAllVideos = () => {
    // Find all iframes and mute them
    document.querySelectorAll('iframe').forEach(iframe => {
      // Handle Vimeo videos
      if (iframe.src.includes('vimeo.com') && window.Vimeo) {
        try {
          const player = new window.Vimeo.Player(iframe);
          player.setVolume(0);
        } catch (error) {
          console.error('Error muting Vimeo player:', error);
        }
      }
      
      // Handle YouTube videos
      if (iframe.src.includes('youtube.com')) {
        try {
          const message = '{"event":"command","func":"mute","args":""}';
          iframe.contentWindow?.postMessage(message, '*');
        } catch (error) {
          console.error('Error muting YouTube iframe:', error);
        }
      }
    });
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    // Send message to all YouTube iframes to mute/unmute
    const message = newMuteState 
      ? '{"event":"command","func":"mute","args":""}' 
      : '{"event":"command","func":"unMute","args":""}';
    
    // Find all iframes and post message to them
    document.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.src.includes('youtube.com')) {
        try {
          iframe.contentWindow?.postMessage(message, '*');
        } catch (error) {
          console.error('Error sending message to iframe:', error);
        }
      }
      
      // Handle Vimeo videos - we only allow unmuting YouTube videos
      // Vimeo videos stay muted always
      if (iframe.src.includes('vimeo.com') && window.Vimeo) {
        try {
          const player = new window.Vimeo.Player(iframe);
          player.setVolume(0); // Always keep Vimeo videos muted
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
