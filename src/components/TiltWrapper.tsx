import React, { useRef, useState } from 'react';

export const TiltWrapper = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    // Normalize mouse position (0 to 1)
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Update gradient position
    setBgPos({ x: x * 100, y: y * 100 });

    // Calculate rotation (Max 10 degrees)
    const tiltX = (0.5 - y) * 10; 
    const tiltY = (x - 0.5) * 10; 

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
    setBgPos({ x: 50, y: 50 }); // Reset light to center
  };

  return (
    <div
      ref={ref}
      className={`${className} relative`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ ...transformStyle, transformStyle: 'preserve-3d' }}
    >
      {children}
      
      {/* Holographic Overlay Layer */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${bgPos.x}% ${bgPos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          mixBlendMode: 'overlay',
          zIndex: 20
        }}
      />
    </div>
  );
};