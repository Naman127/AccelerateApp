// src/pages/Settings.tsx
import React from 'react';
import { Palette, Activity, Type, Moon, Settings as SettingsIcon } from 'lucide-react';

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
        <h2 className="text-3xl font-bold text-slate-900 font-display">Workspace Settings</h2>
        <p className="text-slate-500 font-body">Customize your Accelerate environment and preferences.</p>
      </div>

      {!hasAnyMatches ? (
        <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 animate-slide-up">
          <SettingsIcon size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 font-display">No settings found</h3>
          <p className="text-slate-500 font-body mt-2">We couldn't find anything matching "{globalSearch}".</p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Accessibility & Display Container */}
          {hasAccessibilityMatches && (
            <div className={`bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 md:p-8 shadow-sm transition-all animate-slide-up`}>
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-display border-b border-slate-200/60 pb-4">Accessibility & Display</h3>
              <div className="space-y-6">
                
                {/* HIGH CONTRAST */}
                {matchContrast && (
                  <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isSearchActive ? 'search-match scale-[1.02] bg-white' : 'hover:bg-slate-50/50'}`}>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0"><Palette size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-900 font-body">High Contrast Mode</h4>
                        <p className="text-sm text-slate-500 font-body max-w-sm">Increases border visibility and darkens text for better readability.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleSetting('highContrast')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        accessibility.highContrast 
                          ? 'bg-indigo-600 border-indigo-600' 
                          : 'bg-slate-200/80 border-slate-300 dark:bg-slate-800 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow ring-0 transition duration-200 ease-in-out mt-[2px] ${
                        accessibility.highContrast ? 'translate-x-5 bg-white' : 'translate-x-0.5 bg-white dark:bg-slate-300'
                      }`} />
                    </button>
                  </div>
                )}

                {/* REDUCE MOTION */}
                {matchMotion && (
                  <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isSearchActive ? 'search-match scale-[1.02] bg-white' : 'hover:bg-slate-50/50'}`}>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0"><Activity size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-900 font-body">Reduce Motion</h4>
                        <p className="text-sm text-slate-500 font-body max-w-sm">Disables complex animations and transitions throughout the app.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleSetting('reduceMotion')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        accessibility.reduceMotion 
                          ? 'bg-indigo-600 border-indigo-600' 
                          : 'bg-slate-200/80 border-slate-300 dark:bg-slate-800 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow ring-0 transition duration-200 ease-in-out mt-[2px] ${
                        accessibility.reduceMotion ? 'translate-x-5 bg-white' : 'translate-x-0.5 bg-white dark:bg-slate-300'
                      }`} />
                    </button>
                  </div>
                )}

                {/* DYSLEXIA FONT */}
                {matchDyslexia && (
                  <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isSearchActive ? 'search-match scale-[1.02] bg-white' : 'hover:bg-slate-50/50'}`}>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0"><Type size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-900 font-body">Dyslexia-Friendly Font</h4>
                        <p className="text-sm text-slate-500 font-body max-w-sm">Switches the interface to a highly readable serif typeface with better letter spacing.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleSetting('dyslexicFont')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        accessibility.dyslexicFont 
                          ? 'bg-indigo-600 border-indigo-600' 
                          : 'bg-slate-200/80 border-slate-300 dark:bg-slate-800 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow ring-0 transition duration-200 ease-in-out mt-[2px] ${
                        accessibility.dyslexicFont ? 'translate-x-5 bg-white' : 'translate-x-0.5 bg-white dark:bg-slate-300'
                      }`} />
                    </button>
                  </div>
                )}

                {/* DARK MODE */}
                {matchDark && (
                  <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${isSearchActive ? 'search-match scale-[1.02] bg-white' : 'hover:bg-slate-50/50'}`}>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0"><Moon size={20} /></div>
                      <div>
                        <h4 className="font-bold text-slate-900 font-body">Dark Mode</h4>
                        <p className="text-sm text-slate-500 font-body max-w-sm">Swaps to a low-light, high-focus theme. Perfect for late-night building.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleSetting('darkMode')}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        accessibility.darkMode 
                          ? 'bg-indigo-600 border-indigo-600' 
                          : 'bg-slate-200/80 border-slate-300 dark:bg-slate-800 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full shadow ring-0 transition duration-200 ease-in-out mt-[2px] ${
                        accessibility.darkMode ? 'translate-x-5 bg-white' : 'translate-x-0.5 bg-white dark:bg-slate-300'
                      }`} />
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
        </div>
      )}
    </div>
  );
};