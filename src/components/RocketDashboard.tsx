// src/components/RocketDashboard.tsx
import React from 'react';
import { Rocket, Zap } from 'lucide-react';
import { CountUp } from './CountUp';

export const RocketDashboard = ({ activeBusiness }) => {
  const progress = activeBusiness ? activeBusiness.progress : 0;
  const milestones = [0, 25, 50, 75, 100];
  const labels = ['Start', 'Phase 1', 'Phase 2', 'Phase 3', 'Success'];

  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 mb-8 shadow-2xl shadow-indigo-500/10 transition-all duration-500 group cursor-default">
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-white/50 to-purple-50/30 opacity-50 rounded-2xl overflow-hidden pointer-events-none"></div>

      <div className="relative z-30">
        {' '}
        {/* Lifted z-index above the holographic sheen */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 font-display tracking-tight drop-shadow-sm">
              Mission Control
            </h2>
            <p className="text-slate-500 font-body">
              {activeBusiness
                ? `Tracking: ${activeBusiness.name}`
                : 'No active mission selected.'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-violet-600 font-display filter drop-shadow-sm">
              <CountUp end={progress} duration={1200} />%
            </span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mt-1 font-body">
              Orbit Complete
            </span>
          </div>
        </div>
        <div className="relative mt-16 mb-4 px-1">
          {/* Progress Bar Track */}
          <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute h-full bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full animate-shimmer" />
            </div>
          </div>

          {/* Milestones (Dots) */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-0">
            {milestones.map((m) => (
              <div
                key={m}
                className={`absolute w-5 h-5 rounded-full border-4 transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 z-10 box-content
                    ${
                      progress >= m
                        ? 'bg-indigo-600 border-indigo-100 shadow-[0_0_15px_rgba(99,102,241,0.6)]'
                        : 'bg-white border-slate-100 shadow-sm'
                    }
                  `}
                style={{ left: `${m}%` }}
              />
            ))}
            {/* Rocket Icon */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-20"
              style={{ left: `${progress}%`, top: '-42px' }}
            >
              <div className="relative group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-30 rounded-full animate-pulse"></div>
                <Rocket
                  className={`relative w-12 h-12 text-indigo-600 transform rotate-45 drop-shadow-xl ${
                    progress === 100 ? 'animate-bounce' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Labels Row */}
          <div className="relative w-full mt-12 h-6 px-1">
            {labels.map((label, idx) => {
              let positionStyle = {
                left: `${milestones[idx]}%`,
                transform: 'translateX(-50%)',
              };
              if (idx === 0)
                positionStyle = { left: '0%', transform: 'translateX(0)' };
              else if (idx === labels.length - 1)
                positionStyle = {
                  left: '100%',
                  transform: 'translateX(-100%)',
                };

              return (
                <span
                  key={idx}
                  className={`absolute top-0 text-[8px] xs:text-[9px] sm:text-[10px] uppercase font-black font-body whitespace-nowrap transition-colors duration-500 tracking-tight sm:tracking-widest ${
                    progress >= milestones[idx]
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 opacity-60'
                  }`}
                  style={{
                    left: positionStyle.left,
                    transform: positionStyle.transform,
                  }}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};