
import React from 'react';
import { ArrowUpRight, Lock, TrendingUp, Wallet, CoinsIcon, Users, LineChart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <LineChart className="text-gold-500" size={24} />,
      title: "Tokenomics",
      description: "Deflationary model with burn mechanisms that increase scarcity and value over time.",
    },
    {
      icon: <Lock className="text-gold-500" size={24} />,
      title: "Security",
      description: "Military-grade encryption and multi-signature protection for all transactions.",
    },
    {
      icon: <CoinsIcon className="text-gold-500" size={24} />,
      title: "Staking",
      description: "Earn up to 15% APY by staking your tokens in our secure protocol.",
    },
    {
      icon: <TrendingUp className="text-gold-500" size={24} />,
      title: "Growth",
      description: "Strategic partnerships and continuous development ensure long-term appreciation.",
    },
    {
      icon: <Wallet className="text-gold-500" size={24} />,
      title: "Liquidity",
      description: "Deep liquidity pools and exchange listings for seamless trading experience.",
    },
    {
      icon: <Users className="text-gold-500" size={24} />,
      title: "Community",
      description: "Vibrant community of investors supporting each other on the journey to financial freedom.",
    },
  ];

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
          <p className="text-lg text-gray-400">
            Our cryptocurrency is designed with exceptional features that set it apart from others in the market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="mb-4 p-3 rounded-xl inline-block bg-white/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-3 flex items-center">
                {feature.title}
                <ArrowUpRight 
                  size={16} 
                  className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                />
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
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
