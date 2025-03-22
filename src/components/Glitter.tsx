
import React, { useEffect, useState } from 'react';

interface GlitterProps {
  isActive: boolean;
  onComplete: () => void;
}

const Glitter: React.FC<GlitterProps> = ({ isActive, onComplete }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    color: string;
  }>>([]);

  useEffect(() => {
    if (!isActive) return;
    
    // Create gold particles
    const newParticles = [];
    const colors = ['#FFC300', '#FFD700', '#FFDF00', '#F0E68C', '#DAA520'];
    
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setParticles(newParticles);
    
    // Remove effect after animation completes
    const timer = setTimeout(() => {
      setParticles([]);
      onComplete();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-fade-out"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animation: `glitterFloat 1.5s ease-out forwards, glitterFade 1.5s ease-out forwards`,
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes glitterFloat {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100px) rotate(360deg); }
        }
        
        @keyframes glitterFade {
          0% { opacity: 0; }
          10% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Glitter;
