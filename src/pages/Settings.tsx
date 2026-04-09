// src/pages/Settings.tsx
import React from 'react';
import { Palette, Activity, Type } from 'lucide-react';

export const Settings = ({ accessibility, setAccessibility }) => {
  const toggleSetting = (key) => {
    setAccessibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative z-10 pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 font-display">Settings & Accessibility</h2>
        <p className="text-slate-500 font-body mt-1">Customize your Accelerate workspace.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6 font-display border-b border-slate-100 pb-4">Accessibility Preferences</h3>
        
        <div className="space-y-6">
          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><Palette size={20} /></div>
              <div>
                <h4 className="font-bold text-slate-900 font-body">High Contrast Mode</h4>
                <p className="text-sm text-slate-500 font-body">Increases border visibility and darkens text.</p>
              </div>
            </div>
            <button 
              onClick={() => toggleSetting('highContrast')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none border-2 ${accessibility.highContrast ? 'bg-slate-900 border-slate-900' : 'bg-slate-300 border-slate-300'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform border border-slate-200 shadow-sm ${accessibility.highContrast ? 'translate-x-6 !border-slate-900 !border-2' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Reduce Motion Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><Activity size={20} /></div>
              <div>
                <h4 className="font-bold text-slate-900 font-body">Reduce Motion</h4>
                <p className="text-sm text-slate-500 font-body">Disables complex animations and transitions.</p>
              </div>
            </div>
            <button 
              onClick={() => toggleSetting('reduceMotion')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none border-2 ${accessibility.reduceMotion ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-300 border-slate-300'} ${accessibility.highContrast && accessibility.reduceMotion ? '!bg-slate-900 !border-slate-900' : ''}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform border border-slate-200 shadow-sm ${accessibility.reduceMotion ? 'translate-x-6' : 'translate-x-1'} ${accessibility.highContrast ? '!border-slate-900 !border-2' : ''}`} />
            </button>
          </div>

          {/* Dyslexic Font Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><Type size={20} /></div>
              <div>
                <h4 className="font-bold text-slate-900 font-body">Dyslexia-Friendly Font</h4>
                <p className="text-sm text-slate-500 font-body">Changes all text to a highly readable serif typeface.</p>
              </div>
            </div>
            <button 
              onClick={() => toggleSetting('dyslexicFont')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none border-2 ${accessibility.dyslexicFont ? 'bg-amber-500 border-amber-500' : 'bg-slate-300 border-slate-300'} ${accessibility.highContrast && accessibility.dyslexicFont ? '!bg-slate-900 !border-slate-900' : ''}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform border border-slate-200 shadow-sm ${accessibility.dyslexicFont ? 'translate-x-6' : 'translate-x-1'} ${accessibility.highContrast ? '!border-slate-900 !border-2' : ''}`} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};