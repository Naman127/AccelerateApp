// src/pages/Settings.tsx
import React from 'react';
import { Settings as SettingsIcon, Eye, Type, ZapOff, Shield, Bell } from 'lucide-react';

export const Settings = ({ accessibility, setAccessibility, addToast }) => {
  const toggleSetting = (key) => {
    const newState = !accessibility[key];
    setAccessibility({ ...accessibility, [key]: newState });
    
    if (newState) {
      addToast(`${key.replace(/([A-Z])/g, ' $1').trim()} Enabled`, 'success');
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative z-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 font-display flex items-center gap-3">
          <SettingsIcon className="text-indigo-600" size={32} /> Platform Settings
        </h2>
        <p className="text-slate-500 mt-2 font-body">Manage your account preferences and accessibility features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accessibility Panel */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 font-display mb-6 flex items-center gap-2">
            <Eye className="text-indigo-600" size={20} /> Accessibility
          </h3>
          
          <div className="space-y-6">
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800 font-body">High Contrast Mode</h4>
                <p className="text-sm text-slate-500 font-body mt-1">Increases screen contrast for better readability.</p>
              </div>
              <button 
                onClick={() => toggleSetting('highContrast')}
                className={`w-14 h-7 rounded-full transition-colors relative ${accessibility.highContrast ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${accessibility.highContrast ? 'translate-x-8' : 'translate-x-1'}`}></div>
              </button>
            </div>

            <hr className="border-slate-100" />

            {/* Reduce Motion Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <ZapOff size={16} className="text-slate-600" />
                  <h4 className="font-bold text-slate-800 font-body">Reduce Motion</h4>
                </div>
                <p className="text-sm text-slate-500 font-body mt-1">Disables background animations and transitions.</p>
              </div>
              <button 
                onClick={() => toggleSetting('reduceMotion')}
                className={`w-14 h-7 rounded-full transition-colors relative ${accessibility.reduceMotion ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${accessibility.reduceMotion ? 'translate-x-8' : 'translate-x-1'}`}></div>
              </button>
            </div>
            
            <hr className="border-slate-100" />

            {/* Dyslexia Font Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Type size={16} className="text-slate-600" />
                  <h4 className="font-bold text-slate-800 font-body">Dyslexia-Friendly Font</h4>
                </div>
                <p className="text-sm text-slate-500 font-body mt-1">Changes all text to a heavier, more readable typeface.</p>
              </div>
              <button 
                onClick={() => toggleSetting('dyslexicFont')}
                className={`w-14 h-7 rounded-full transition-colors relative ${accessibility.dyslexicFont ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${accessibility.dyslexicFont ? 'translate-x-8' : 'translate-x-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder for future settings like Security/Account */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm opacity-60">
            <h3 className="text-xl font-bold text-slate-900 font-display mb-4 flex items-center gap-2">
              <Shield className="text-slate-600" size={20} /> Privacy & Security
            </h3>
            <p className="text-sm text-slate-500 font-body mb-4">Manage your password, 2FA, and data sharing preferences.</p>
            <button className="px-4 py-2 bg-slate-100 text-slate-400 rounded-lg font-bold cursor-not-allowed">Manage Account</button>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm opacity-60">
            <h3 className="text-xl font-bold text-slate-900 font-display mb-4 flex items-center gap-2">
              <Bell className="text-slate-600" size={20} /> Notifications
            </h3>
            <p className="text-sm text-slate-500 font-body mb-4">Control email digests and push notifications.</p>
            <button className="px-4 py-2 bg-slate-100 text-slate-400 rounded-lg font-bold cursor-not-allowed">Configure Alerts</button>
          </div>
        </div>
      </div>
    </div>
  );
};