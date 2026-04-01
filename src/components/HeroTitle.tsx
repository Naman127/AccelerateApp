// src/components/HeroTitle.tsx
import React from 'react';
import { Rocket } from 'lucide-react';

export const HeroTitle = () => {
  const title = 'ACCELERATE';

  return (
    <div className="flex items-center justify-center gap-4 mb-6 pt-10">
      {/* 1. The Rocket (Logo) */}
      <div
        className="relative"
        style={{
          animation:
            'rocket-land 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        }}
      >
        <Rocket
          size={56}
          className="text-indigo-600 fill-indigo-600/10 drop-shadow-2xl"
          strokeWidth={1.5}
        />

        {/* Temporary Engine Exhaust Effect */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3 bg-orange-400 blur-md rounded-full"
          style={{ animation: 'exhaust-flicker 0.8s ease-out forwards' }}
        ></div>
      </div>

      {/* 2. The Text Reveal */}
      <h1 className="flex text-5xl md:text-7xl font-black tracking-tight font-display drop-shadow-md overflow-hidden pb-1">
        {title.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-800"
            style={{
              animation: `letter-enter 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9) forwards`,
              animationDelay: `${0.2 + i * 0.05}s`,
              opacity: 0,
              transform: 'translateY(120%)',
              textShadow: '0 4px 12px rgba(0,0,0,0.1)', // Added stronger shadow for contrast against aurora
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};