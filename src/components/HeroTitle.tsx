// src/components/HeroTitle.tsx
import React from 'react';
import { Rocket } from 'lucide-react';

export const HeroTitle = () => {
  const title = 'ACCELERATE';

  return (
    // 1. Reduced the mobile gap to gap-2 and added px-4 to prevent edge-touching
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 pt-10 px-4">
      
      {/* 2. Added flex-shrink-0 so the rocket never gets squished */}
      <div
        className="relative flex-shrink-0"
        style={{
          animation:
            'rocket-land 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
      >
        {/* 3. Replaced fixed size={56} with responsive Tailwind sizing classes */}
        <Rocket
          className="w-10 h-10 sm:w-14 sm:h-14 text-indigo-600 fill-indigo-600/10 drop-shadow-2xl"
          strokeWidth={1.5}
        />

        <div
          className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-2 sm:w-3 bg-orange-400 blur-md rounded-full"
          style={{ animation: 'exhaust-flicker 0.8s ease-out forwards' }}
        ></div>
      </div>

      {/* 4. Shifted mobile text size down to text-3xl, scaling up to text-7xl on desktop */}
      <h1 className="flex text-3xl sm:text-5xl md:text-7xl font-black tracking-tight font-display drop-shadow-md overflow-hidden pb-1 motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transform-none">
        {title.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-800"
            style={{
              animation: `letter-enter 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9) forwards`,
              animationDelay: `${0.2 + i * 0.05}s`,
              opacity: 0,
              transform: 'translateY(120%)',
              textShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};