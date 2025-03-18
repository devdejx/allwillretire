
import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { setupVideoLoadListener, addGlobalVideoVisibilityStyles } from '@/utils/videoLoader';

const Cta = () => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  
  // References to video iframes
  const videoRef1 = useRef<HTMLIFrameElement>(null);
  const videoRef2 = useRef<HTMLIFrameElement>(null);
  const videoRef3 = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Initialize the video visibility system
    addGlobalVideoVisibilityStyles();
    
    // Setup videos with aggressive visibility enforcement
    const setupVideos = () => {
      console.log('Setting up video refs');
      
      // Apply visibility to all existing video iframes
      [videoRef1, videoRef2, videoRef3].forEach(ref => {
        if (ref.current) {
          // Apply initial styles
          applyVideoStyles(ref.current);
          
          // Setup the video loading listener
          setupVideoLoadListener(ref.current);
        }
      });
    };
    
    // Apply critical styles to a video iframe
    const applyVideoStyles = (iframe: HTMLIFrameElement) => {
      // Critical inline styles to ensure visibility
      iframe.style.display = 'block';
      iframe.style.visibility = 'visible';
      iframe.style.opacity = '1';
      iframe.style.zIndex = '15';
      
      // Add data attributes for CSS targeting
      iframe.setAttribute('data-video-visible', 'true');
      
      // Add necessary classes
      iframe.classList.add('visible-video');
      
      // Ensure parent containers also have visibility markers
      if (iframe.parentElement) {
        iframe.parentElement.classList.add('loaded', 'fully-loaded');
        iframe.parentElement.setAttribute('data-video-loaded', 'true');
      }
    };
    
    // Initial setup
    setupVideos();
    
    // Setup periodic checks to ensure videos remain visible
    const intervals = [100, 300, 500, 1000, 2000, 3000, 5000].map(delay => 
      setTimeout(() => {
        console.log(`Periodic video visibility check at ${delay}ms`);
        [videoRef1, videoRef2, videoRef3].forEach(ref => {
          if (ref.current) {
            applyVideoStyles(ref.current);
          }
        });
        
        // Also find any iframes that might have been missed
        document.querySelectorAll('iframe.video-background').forEach((iframe) => {
          if (iframe instanceof HTMLIFrameElement) {
            applyVideoStyles(iframe);
          }
        });
      }, delay)
    );
    
    // Create a MutationObserver to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check for newly added iframes
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLIFrameElement && node.classList.contains('video-background')) {
              console.log('MutationObserver found new iframe:', node.src);
              applyVideoStyles(node);
              setupVideoLoadListener(node);
            }
          });
        }
      });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      intervals.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);
  
  const handleCopy = () => {
    const textToCopy = "Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump";
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Address has been copied to your clipboard"
      });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(err => {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive"
      });
    });
  };
  
  return <>
      <section className="py-24 relative overflow-hidden bg-black/70">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gold-900/20 to-black/80 animate-gradient-slow"></div>
            <div className="absolute inset-0 bg-black/30 z-5"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 z-20"></div>
          
          <div className="absolute inset-0 w-full h-full overflow-hidden border-2 border-gold-500/80 shadow-[0_0_10px_3px_rgba(255,195,0,0.5)] rounded-md z-15 video-container" data-video-container="true">
            <iframe 
              ref={videoRef2}
              src="https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover min-w-[150%] min-h-[150%] video-background visible-video" 
              title="Background Video"
              style={{opacity: 1, visibility: 'visible', display: 'block', zIndex: 15}}
              data-video-visible="true"
            ></iframe>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-30 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-30 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        
        <div className="absolute left-0 top-0 bottom-0 w-36 bg-gradient-to-r from-black/95 to-transparent z-30"></div>
        <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l from-black/95 to-transparent z-30"></div>
        
        <div className="absolute top-10 right-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl z-20"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl z-20"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl z-20"></div>
        
        <div className="container mx-auto px-6 relative z-40 text-white pt-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-10 mt-[-40px]">
              <img src="/lovable-uploads/d523f3bd-5ac2-4e42-9b2b-0e3c68db822c.png" alt="AWR Lifestyle" className="h-56 w-auto mx-auto object-contain" />
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 mt-12">
              Begin Your Journey to 
              <span className="relative ml-2">
                <span className="relative z-10">Prosperity</span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gold-500/30 rounded-full"></span>
              </span>
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-xs">Join thousands of forward-thinking people who believe in AllWillRetire.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <button className="relative bg-gradient-to-r from-transparent via-gold-500/30 to-transparent backdrop-blur border border-gold-300/50 text-black px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">View Whitepaper</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-black/70">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gold-900/20 to-black/80 animate-gradient-slow"></div>
            <div className="absolute inset-0 bg-black/30 z-5"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 z-20"></div>
          
          <div className="absolute inset-0 w-full h-full overflow-hidden border-2 border-gold-500/80 shadow-[0_0_10px_3px_rgba(255,195,0,0.5)] rounded-md z-15 video-container" data-video-container="true">
            <iframe 
              ref={videoRef1}
              src="https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover min-w-[150%] min-h-[150%] video-background visible-video" 
              title="Background Video"
              style={{opacity: 1, visibility: 'visible', display: 'block', zIndex: 15}}
              data-video-visible="true"
            ></iframe>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-30 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-30 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        
        <div className="absolute left-0 top-0 bottom-0 w-36 bg-gradient-to-r from-black/95 to-transparent z-30"></div>
        <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l from-black/95 to-transparent z-30"></div>
        
        <div className="absolute top-10 right-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl z-20"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl z-20"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl z-20"></div>
        
        <div className="container mx-auto px-6 relative z-40 text-white pt-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-10 mt-[-40px]">
              <img src="/lovable-uploads/d523f3bd-5ac2-4e42-9b2b-0e3c68db822c.png" alt="AWR Lifestyle" className="h-56 w-auto mx-auto object-contain" />
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 mt-12">
              Secure your 
              <span className="relative ml-2">
                <span className="relative z-10">Future</span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gold-500/30 rounded-full"></span>
              </span>
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-xs">
              Financial freedom is not about having money, its about having choices.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 min-h-[48px]">
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-black/70">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gold-900/20 to-black/80 animate-gradient-slow"></div>
            <div className="absolute inset-0 bg-black/30 z-5"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 z-20"></div>
          
          <div className="absolute inset-0 w-full h-full overflow-hidden border-2 border-gold-500/80 shadow-[0_0_10px_3px_rgba(255,195,0,0.5)] rounded-md z-15 video-container" data-video-container="true">
            <iframe 
              ref={videoRef3}
              src="https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover min-w-[150%] min-h-[150%] video-background visible-video" 
              title="Background Video"
              style={{opacity: 1, visibility: 'visible', display: 'block', zIndex: 15}}
              data-video-visible="true"
            ></iframe>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-30 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/80 to-transparent z-30 shadow-[0_0_4px_0.5px_rgba(255,195,0,0.5)]"></div>
        
        <div className="absolute left-0 top-0 bottom-0 w-36 bg-gradient-to-r from-black/95 to-transparent z-30"></div>
        <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l from-black/95 to-transparent z-30"></div>
        
        <div className="absolute top-10 right-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl z-20"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl z-20"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl z-20"></div>
        
        <div className="container mx-auto px-6 relative z-40 text-white pt-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-10 mt-[-40px]">
              <img src="/lovable-uploads/d523f3bd-5ac2-4e42-9b2b-0e3c68db822c.png" alt="AWR Lifestyle" className="h-56 w-auto mx-auto object-contain" />
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 mt-12">
              In life we need 
              <span className="relative ml-2">
                <span className="relative z-10">Purpose</span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gold-500/30 rounded-full"></span>
              </span>
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-xs">
              Join our movement and start believing.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <button onClick={handleCopy} className="relative bg-gradient-to-r from-transparent via-gold-500/30 to-transparent backdrop-blur-sm border border-gold-400/30 text-black px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-md shadow-gold-500/20 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/90 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px] bg-gradient-to-r from-black/70 via-black to-black/70 bg-clip-text text-transparent">
                  Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump
                </span>
                {copied ? <Check className="h-4 w-4 flex-shrink-0 relative z-10 text-black" /> : <Copy className="h-4 w-4 flex-shrink-0 relative z-10 text-black" />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>;
};

export default Cta;
