
import React from 'react';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from "@/hooks/use-toast";

const Cta = () => {
  const {
    toast
  } = useToast();
  const [copied, setCopied] = React.useState(false);

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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10"></div>
          
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe src="https://player.vimeo.com/video/1065939107?h=96cbb5c847&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover min-w-[150%] min-h-[150%]" title="Background Video"></iframe>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-white pt-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-10 mt-[-40px]">
              <img src="/lovable-uploads/ac58b2e6-a5d5-4713-b3c6-6ac008cc4743.png" alt="AWR Lifestyle" className="h-28 w-auto mx-auto" />
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 mt-12">
              Begin Your Journey to 
              <span className="relative ml-2">
                <span className="relative z-10">Prosperity</span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-gold-500/30 rounded-full"></span>
              </span>
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-xs">Join thousands of forward-thinking people who are already securing their luxurious future with AllWillRetire.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors">
                View Whitepaper
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10"></div>
          
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe src="https://player.vimeo.com/video/1065934410?h=1877cd73cd&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover min-w-[150%] min-h-[150%]" title="Background Video"></iframe>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-white pt-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-10 mt-[-40px]">
              <img src="/lovable-uploads/ac58b2e6-a5d5-4713-b3c6-6ac008cc4743.png" alt="AWR Lifestyle" className="h-28 w-auto mx-auto" />
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

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90 z-10"></div>
          
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe src="https://player.vimeo.com/video/1065940999?h=4705f6f507&badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover min-w-[150%] min-h-[150%]" title="Background Video"></iframe>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-white pt-0">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-10 mt-[-40px]">
              <img src="/lovable-uploads/ac58b2e6-a5d5-4713-b3c6-6ac008cc4743.png" alt="AWR Lifestyle" className="h-28 w-auto mx-auto" />
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
              <button onClick={handleCopy} className="bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <span className="truncate max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
                  Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump
                </span>
                {copied ? <Check className="h-4 w-4 flex-shrink-0" /> : <Copy className="h-4 w-4 flex-shrink-0" />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>;
};

export default Cta;
