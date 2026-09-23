import React, { useEffect, useState } from 'react';

export const AmbientAurora = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#09090b]">
      
      {/* 1. Dynamic Mouse Interactive Spotlight Halo */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-25 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${mousePos.x - 250}px, ${mousePos.y - 250}px, 0)`,
          background: 'radial-gradient(circle, rgba(253, 185, 39, 0.4) 0%, rgba(29, 66, 138, 0.25) 50%, transparent 70%)'
        }}
      />

      {/* 2. Distinct High-Tech Blueprint Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px'
        }}
      />

      {/* 3. Glowing Grid Intersection Crosshairs Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(253, 185, 39, 0.8) 1.5px, transparent 0)`,
          backgroundSize: '56px 56px'
        }}
      />

      {/* 4. Top-Left: Radiant Curry Gold Aurora Pool */}
      <div 
        className="absolute -top-[12%] -left-[10%] w-[700px] h-[700px] sm:w-[950px] sm:h-[950px] rounded-full blur-[120px] opacity-55 animate-aurora-1"
        style={{
          background: 'radial-gradient(circle, rgba(253, 185, 39, 0.65) 0%, rgba(253, 185, 39, 0.2) 45%, transparent 70%)'
        }}
      />

      {/* 5. Top-Right: Deep Electric Royal Blue Ambient Glow */}
      <div 
        className="absolute top-[8%] -right-[12%] w-[650px] h-[650px] sm:w-[900px] sm:h-[900px] rounded-full blur-[130px] opacity-60 animate-aurora-2"
        style={{
          background: 'radial-gradient(circle, rgba(29, 66, 138, 0.75) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 75%)'
        }}
      />

      {/* 6. Center: Scuderia Ferrari Crimson & Warm Ember Swirl */}
      <div 
        className="absolute top-[38%] -left-[12%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full blur-[120px] opacity-40 animate-aurora-3"
        style={{
          background: 'radial-gradient(circle, rgba(225, 6, 0, 0.5) 0%, rgba(253, 185, 39, 0.25) 40%, transparent 70%)'
        }}
      />

      {/* 7. Center-Right: Tactical Cyan & Cyber Violet Mesh */}
      <div 
        className="absolute top-[58%] -right-[10%] w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full blur-[120px] opacity-50 animate-aurora-1"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(99, 102, 241, 0.35) 45%, transparent 75%)'
        }}
      />

      {/* 8. Bottom-Center: Golden Warmth for Contact & Footer */}
      <div 
        className="absolute -bottom-[12%] left-[10%] w-[700px] h-[700px] sm:w-[1000px] sm:h-[1000px] rounded-full blur-[130px] opacity-55 animate-aurora-2"
        style={{
          background: 'radial-gradient(circle, rgba(253, 185, 39, 0.65) 0%, rgba(29, 66, 138, 0.35) 50%, transparent 75%)'
        }}
      />

      {/* 9. Soft Vignette Edge Softener */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
};
