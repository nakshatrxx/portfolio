import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  const pos = useRef({
    currentX: -100,
    currentY: -100,
    targetX: -100,
    targetY: -100,
    initialized: false
  });

  const variantRef = useRef("default");

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad)
    if (window.matchMedia('(hover: none)').matches) return;

    const onPointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      pos.current.targetX = x;
      pos.current.targetY = y;

      if (!pos.current.initialized) {
        pos.current.currentX = x;
        pos.current.currentY = y;
        pos.current.initialized = true;

        if (dotRef.current) {
          dotRef.current.style.opacity = '1';
          dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.opacity = '1';
          ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
      } else {
        // Zero latency direct position update for center dot
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      }

      // Check hovered interactive elements
      const target = e.target;
      if (!target) return;

      let nextVariant = "default";
      let nextText = "";

      if (target.closest('[data-cursor="night-night"]')) {
        nextVariant = "night-night";
        nextText = "😴";
      } else if (target.closest('canvas')) {
        nextVariant = "basketball";
        nextText = "🏀";
      } else if (target.closest('#work .group')) {
        nextVariant = "project";
        nextText = "VIEW";
      } else if (target.closest('button, a, input, select, [role="button"]')) {
        nextVariant = "hover";
        nextText = "";
      }

      if (variantRef.current !== nextVariant) {
        variantRef.current = nextVariant;
        setCursorVariant(nextVariant);
        setCursorText(nextText);
      }
    };

    // Buttery smooth 120fps hardware-accelerated lerp loop
    let rafId;
    const render = () => {
      if (pos.current.initialized) {
        // High responsive lerp smoothing factor (0.32 = instantaneous & silky smooth)
        pos.current.currentX += (pos.current.targetX - pos.current.currentX) * 0.32;
        pos.current.currentY += (pos.current.targetY - pos.current.currentY) * 0.32;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${pos.current.currentX}px, ${pos.current.currentY}px, 0) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const isProject = cursorVariant === "project";
  const isHover = cursorVariant === "hover";
  const isBasketball = cursorVariant === "basketball";

  return (
    <>
      {/* Outer Smooth Lerp Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[999999] rounded-full flex items-center justify-center opacity-0 transition-[width,height,background-color,border-color] duration-150 ease-out will-change-transform ${
          isProject
            ? 'w-16 h-16 bg-[#FDB927] border-2 border-[#FDB927] shadow-[0_0_20px_rgba(253,185,39,0.4)]'
            : isBasketball
              ? 'w-12 h-12 bg-orange-500/20 border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
              : isHover
                ? 'w-12 h-12 bg-[#FDB927]/15 border border-[#FDB927] shadow-[0_0_15px_rgba(253,185,39,0.3)]'
                : 'w-7 h-7 bg-transparent border border-[#FDB927]/50'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)'
        }}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className={`font-display font-extrabold uppercase tracking-tight select-none text-center ${
              isProject ? 'text-black text-[11px]' : 'text-sm'
            }`}
          >
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[1000000] w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#FDB927] shadow-[0_0_8px_#FDB927] opacity-0 will-change-transform ${
          isProject ? '!opacity-0' : ''
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      />
    </>
  );
};
