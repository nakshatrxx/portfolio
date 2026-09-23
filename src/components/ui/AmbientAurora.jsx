import React from 'react';

export const AmbientAurora = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#09090b]">
      
      {/* 1. Subtle Technical Precision Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />

      {/* 2. Top-Left: Warm Curry Gold Fluid Light Pool */}
      <div 
        className="absolute -top-[10%] -left-[10%] w-[650px] h-[650px] sm:w-[900px] sm:h-[900px] rounded-full blur-[130px] opacity-40 animate-aurora-1"
        style={{
          background: 'radial-gradient(circle, rgba(253, 185, 39, 0.5) 0%, rgba(253, 185, 39, 0.15) 50%, transparent 75%)'
        }}
      />

      {/* 3. Top-Right: Deep Electric Royal Blue Ambient Glow */}
      <div 
        className="absolute top-[10%] -right-[15%] w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full blur-[140px] opacity-45 animate-aurora-2"
        style={{
          background: 'radial-gradient(circle, rgba(29, 66, 138, 0.6) 0%, rgba(29, 66, 138, 0.2) 55%, transparent 80%)'
        }}
      />

      {/* 4. Center-Left: Subtle Scuderia Crimson / Cyber Amber Accent */}
      <div 
        className="absolute top-[40%] -left-[10%] w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full blur-[130px] opacity-25 animate-aurora-3"
        style={{
          background: 'radial-gradient(circle, rgba(225, 6, 0, 0.4) 0%, rgba(253, 185, 39, 0.2) 50%, transparent 75%)'
        }}
      />

      {/* 5. Center-Right: Tactical Cyan & Deep Indigo Mesh */}
      <div 
        className="absolute top-[60%] -right-[10%] w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full blur-[140px] opacity-35 animate-aurora-1"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 80%)'
        }}
      />

      {/* 6. Bottom-Center: Golden Warmth for Contact & Footer */}
      <div 
        className="absolute -bottom-[10%] left-[15%] w-[650px] h-[650px] sm:w-[900px] sm:h-[900px] rounded-full blur-[140px] opacity-35 animate-aurora-2"
        style={{
          background: 'radial-gradient(circle, rgba(253, 185, 39, 0.5) 0%, rgba(29, 66, 138, 0.25) 60%, transparent 80%)'
        }}
      />

      {/* 7. Subtle Vignette & Contrast Mask */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
};
