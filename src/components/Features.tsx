
import React from 'react';
import { ArrowUpRight, Lock, TrendingUp, Wallet, CoinsIcon, Users, LineChart } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold-500/5 rounded-bl-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gold-500/5 rounded-tr-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="uppercase tracking-wider text-sm font-medium text-gold-400">
              Key Features
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            What Makes <span className="text-gold-500">AllWillRetire</span> Special
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Our cryptocurrency is designed with exceptional features that set it apart from others in the market.
          </p>
          
          <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/1637f444-4baf-4c41-9a91-7c131440c4f9.png" 
              alt="AllWillRetire Community" 
              className="w-full"
            />
          </div>
        </div>
        
        {/* Removed the feature cards grid that was here */}
        
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gold-500/10 to-transparent p-8 rounded-2xl backdrop-blur-sm border border-gold-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold mb-2">$0.0025</div>
                <div className="text-sm text-gray-400">Current Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold mb-2">15%</div>
                <div className="text-sm text-gray-400">Monthly Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold mb-2">10B</div>
                <div className="text-sm text-gray-400">Max Supply</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
