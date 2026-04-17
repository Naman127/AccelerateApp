// src/pages/Settings.tsx
import React from 'react';
import { Palette, Activity, Type, Moon, Settings as SettingsIcon } from 'lucide-react';

// Added globalSearch to the props here
export const Settings = ({ accessibility, setAccessibility, onReset, globalSearch }) => {
  const toggleSetting = (key) => {
    setAccessibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // --- SAFE GLOBAL SEARCH FILTERING ---
  const isSearchActive = !!globalSearch;
  const searchLower = globalSearch?.toLowerCase() || '';

  // Matcher functions for each specific setting block
  const matchContrast = !isSearchActive || "high contrast mode increases border visibility darkens text".includes(searchLower);
  const matchMotion = !isSearchActive || "reduce motion disables complex animations transitions".includes(searchLower);
  const matchDyslexia = !isSearchActive || "dyslexia-friendly font readable serif typeface".includes(searchLower);
  const matchDark = !isSearchActive || "dark mode low-light high-focus theme".includes(searchLower);
  const matchReset = !isSearchActive || "reset accelerate clear workspace data factory state danger zone".includes(searchLower);

  const hasAccessibilityMatches = matchContrast || matchMotion || matchDyslexia || matchDark;
  const hasAnyMatches = hasAccessibilityMatches || matchReset;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative z-10 pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 font-display">Settings & Accessibility</h2>
        <p className="text-slate-500 font-body mt-1">Customize your Accelerate workspace.</p>
      </div>

      {!hasAnyMatches ? (
        <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-dashed border-slate-300">
          <SettingsIcon size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 font-display">No settings found</h3>
          <p className="text-slate-500 font-body mt-2">No settings match "{globalSearch}".</p>
        </div>
      ) : (
        <>
          {hasAccessibilityMatches && (
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-sm mb-8 animate-slide-up">
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-display border-b border-slate-100 pb-4">Accessibility Preferences</h3>
              
              <div className="space-y-6">
                {/* High Contrast Toggle */}
                {matchContrast && (
                  <div className={`flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all ${isSearchActive ? 'search-match scale-[1.02]' : ''}`}>
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
                )}

                {/* Reduce Motion Toggle */}
                {matchMotion && (
                  <div className={`flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all ${isSearchActive ? 'search-match scale-[1.02]' : ''}`}>
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
                )}

                {/* Dyslexic Font Toggle */}
                {matchDyslexia && (
                  <div className={`flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all ${isSearchActive ? 'search-match scale-[1.02]' : ''}`}>
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
                )}

                {/* Dark Mode Toggle */}
                {matchDark && (
                  <div className={`flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all dark-override-target ${isSearchActive ? 'search-match scale-[1.02]' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-900 text-indigo-300 rounded-lg"><Moon size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-900 font-body dark-text-override">Dark Mode</h4>
                        <p className="text-sm text-slate-500 font-body dark-subtext-override">Switch to a low-light, high-focus dark theme.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleSetting('darkMode')}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none border-2 ${accessibility.darkMode ? 'bg-indigo-500 border-indigo-500' : 'bg-slate-300 border-slate-300'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${accessibility.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Danger Zone */}
          {matchReset && (
            <div className={`bg-red-50/50 border border-red-100 rounded-3xl p-8 transition-all animate-slide-up ${isSearchActive ? 'search-match scale-[1.02]' : ''}`}>
              <h3 className="text-xl font-bold text-red-900 mb-2 font-display">Reset Accelerate</h3>
              <p className="text-sm text-red-600 font-body mb-6">Clear all workspace data and reset Accelerate to its factory state.</p>
              <button 
                onClick={onReset}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-200"
              >
                Reset Workspace
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};