
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MuteButtonProps {
  className?: string;
}

const MuteButton = ({ className }: MuteButtonProps) => {
  const [isMuted, setIsMuted] = useState(false);

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

export default MuteButton;
