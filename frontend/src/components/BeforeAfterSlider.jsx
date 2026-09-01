import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Sliders } from 'lucide-react';

export const BeforeAfterSlider = ({
  originalImage,
  enhancedImage,
  aspectRatio = 'aspect-square',
  className = ''
}) => {
  const { t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const afterImg = enhancedImage || originalImage;

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      className={`relative select-none overflow-hidden rounded-2xl border border-terracotta-200 shadow-md cursor-ew-resize bg-gray-100 ${aspectRatio} ${className}`}
    >
      {/* Enhanced Image (Base background) */}
      <img
        src={afterImg}
        alt="Enhanced Craft"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none filter saturate-110 contrast-105"
      />

      {/* Original Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={originalImage}
          alt="Original Craft"
          className="absolute inset-0 w-full h-full object-cover filter grayscale-[15%] brightness-90 max-w-none"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        />
      </div>

      {/* Vertical Dividing Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-terracotta-600 shadow-xl flex items-center justify-center text-terracotta-700">
          <Sliders className="w-4 h-4" />
        </div>
      </div>

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 z-30 pointer-events-none">
        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
          {t('before')}
        </span>
      </div>

      <div className="absolute top-3 right-3 z-30 pointer-events-none flex items-center gap-1">
        <span className="bg-emerald-700/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-300/40 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-sandalwood-300" />
          {t('after')}
        </span>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none z-30">
        <span className="bg-black/40 backdrop-blur-sm text-white/90 text-[10px] font-medium px-3 py-0.5 rounded-full">
          ⇄ Drag slider to compare
        </span>
      </div>
    </div>
  );
};
