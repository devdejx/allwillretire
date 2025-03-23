
import React from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const TokenInfo = () => {
  const { toast } = useToast();
  const tokenAddress = "7WXnE3NnPSy7ZRzWMvxW7QRV1Y6mpucgv6SVhwJHvLar";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(tokenAddress);
    toast({
      title: "Address copied",
      description: "Token address has been copied to clipboard",
    });
  };

  return (
    <div className="w-full py-6 mt-2 border-t border-gold-500/20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold text-gold-500 mb-3">
            How to Buy AWR
          </h3>
          <p className="text-gray-300 mb-4 max-w-2xl">
            Our AWR token was designed on SOLANA network. If you want to buy, copy address or press BUY NOW button.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2 items-center">
            <div className="flex items-center gap-2 bg-background/80 border border-gold-500/20 px-4 py-2 rounded-lg w-full sm:w-auto max-w-xs">
              <code className="text-xs md:text-sm text-gold-400 overflow-hidden text-ellipsis truncate">
                {tokenAddress}
              </code>
              <button 
                onClick={handleCopyAddress} 
                className="text-gold-500 hover:text-gold-400 transition-colors p-1"
                aria-label="Copy token address"
              >
                <Copy size={16} />
              </button>
            </div>
            
            <a
              href="https://jup.ag/swap/USDC-AWR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="gold" size="lg" className="w-full">
                <span className="relative z-10 flex items-center gap-2 font-bold whitespace-nowrap">
                  BUY NOW <ExternalLink size={16} className="text-black" />
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
