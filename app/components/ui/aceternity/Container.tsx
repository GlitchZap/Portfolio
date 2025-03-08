import React from 'react';
import { motion } from 'framer-motion';

interface AccentricityBackgroundProps {
  variant?: 'cosmos' | 'nebula' | 'circuit' | 'grid' | 'minimal';
  intensity?: number;
  className?: string;
  style?: React.CSSProperties & { y?: string };
}

interface AccentricityContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface AccentricityBackgroundProps {
    variant?: 'cosmos' | 'nebula' | 'circuit' | 'grid' | 'minimal';
    intensity?: number;
    className?: string;
    style?: React.CSSProperties & { y?: string };
  }

export const AccentricityBackground: React.FC<AccentricityBackgroundProps> = ({
  variant = 'cosmos',
  intensity = 0.5,
  className = '',
  style = {}
}) => {
  // Opacity based on intensity
  const opacityFactor = Math.min(Math.max(intensity, 0), 1);
  
  // Get variant-specific elements
  const renderVariantElements = () => {
    switch (variant) {
      case 'cosmos':
        return (
          <>
            {/* Large gradient orbs */}
            <div className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] rounded-full bg-purple-600/10 filter blur-[150px]" style={{ opacity: 0.16 * opacityFactor }}></div>
            <div className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] rounded-full bg-blue-600/10 filter blur-[150px]" style={{ opacity: 0.16 * opacityFactor }}></div>
            
            {/* Animated circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] border border-white/5 rounded-full opacity-30" style={{ opacity: 0.3 * opacityFactor }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] border border-white/5 rounded-full opacity-30" style={{ opacity: 0.3 * opacityFactor }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] border border-white/5 rounded-full opacity-30" style={{ opacity: 0.3 * opacityFactor }}></div>
            
            {/* Stars/particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 * opacityFactor + 0.1,
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                  }}
                />
              ))}
            </div>
          </>
        );
        
      case 'nebula':
        return (
          <>
            {/* Animated blobs */}
            <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-purple-600/10 rounded-full filter blur-[120px] animate-blob" style={{ opacity: 0.15 * opacityFactor }}></div>
            <div className="absolute top-[30%] -right-[10%] w-[60%] h-[70%] bg-blue-600/10 rounded-full filter blur-[120px] animate-blob animation-delay-2000" style={{ opacity: 0.15 * opacityFactor }}></div>
            <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full filter blur-[120px] animate-blob animation-delay-4000" style={{ opacity: 0.15 * opacityFactor }}></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 w-screen bg-[linear-gradient(rgba(255,255,255,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.03)_1.5px,transparent_1.5px)] bg-[size:35px_35px]" style={{ opacity: opacityFactor }}></div>
          </>
        );
        
      case 'circuit':
        return (
          <div className="absolute inset-0 w-full" style={{ backgroundImage: 'url("/circuit-pattern.png")', backgroundSize: '120px', opacity: 0.07 * opacityFactor }}></div>
        );
        
      case 'grid':
        return (
          <div className="absolute inset-0 w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)]" style={{ opacity: opacityFactor }}></div>
        );
        
      case 'minimal':
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" style={{ opacity: opacityFactor }}></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ opacity: opacityFactor }}></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ opacity: opacityFactor }}></div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className={`absolute inset-0 w-full overflow-hidden -z-10 ${className}`}
      style={style}
    >
      {renderVariantElements()}
      
      {/* Common overlay - noise texture */}
      <div className="absolute inset-0 w-full h-full bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
    </motion.div>
  );
};

export const AccentricityContainer: React.FC<AccentricityContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`container mx-auto ${className}`}>
      {children}
    </div>
  );
};