// src/pages/Saved.tsx
import React, { useState } from 'react';
import { Bookmark, Rocket, FileText, Calculator, Book, ExternalLink, FolderOpen, Play } from 'lucide-react';
import { BLUEPRINTS } from '../data/mockData';

export const Saved = ({ 
  savedMissions, 
  savedResources, 
  toggleSaveResource, 
  navigateToResource,
  handleStartBusiness,
  toggleSaveMission
}) => {
  const [activeSubTab, setActiveSubTab] = useState('missions');

  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative z-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-display flex items-center gap-3">
            <Bookmark className="text-indigo-600 fill-indigo-600" size={28} /> My Saved Content
          </h2>
          <p className="text-slate-500 font-body mt-1">
            Quick access to your bookmarked missions and resources.
          </p>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex bg-white/50 p-1 rounded-xl backdrop-blur-sm border border-slate-200/50 shadow-sm">
          <button
            onClick={() => setActiveSubTab('missions')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'missions' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Rocket size={16} /> Missions
          </button>
          <button
            onClick={() => setActiveSubTab('resources')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'resources' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <FolderOpen size={16} /> Resources
          </button>
        </div>
      </div>

      {/* --- MISSIONS TAB --- */}
      {activeSubTab === 'missions' && (
        <div className="animate-slide-up">
          {savedMissions && savedMissions.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedMissions.map((missionId) => {
                  const blueprint = BLUEPRINTS[missionId];
                  // Safety check in case a blueprint was deleted but the ID remains
                  if (!blueprint) return null;

                  return (
                    <div key={missionId} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-sm flex flex-col group hover:shadow-md hover:border-indigo-300 transition-all relative">
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                          <Rocket size={24} />
                        </div>
                        
                        <button 
                          onClick={(e) => toggleSaveMission(e, missionId)}
                          className="text-indigo-600 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
                          title="Remove Bookmark"
                        >
                          <Bookmark size={18} className="fill-current" />
                        </button>
                      </div>

                      <h4 className="font-bold text-lg text-slate-900 font-display mb-2">{blueprint.title}</h4>
                      <p className="text-sm text-slate-500 font-body mb-6 line-clamp-2">{blueprint.description}</p>
                      
                      <button 
                        onClick={() => handleStartBusiness(missionId, blueprint.field || 'custom', blueprint.title)}
                        className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-colors shadow-md group/btn"
                      >
                        Start Mission <Play size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  );
                })}
             </div>
          ) : (
            <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-dashed border-slate-300">
              <Rocket size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 font-display">No Saved Missions</h3>
              <p className="text-slate-500 font-body mt-2">Bookmark blueprints from the Browse tab to access them here.</p>
            </div>
          )}
        </div>
      )}

      {/* --- RESOURCES TAB --- */}
      {activeSubTab === 'resources' && (
        <div className="animate-slide-up">
          {savedResources && savedResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedResources.map((res) => (
                <div key={res.id} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-sm flex flex-col group hover:shadow-md hover:border-indigo-300 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${res.type === 'tool' ? 'bg-amber-100 text-amber-600' : res.type === 'lesson' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {res.type === 'tool' ? <Calculator size={20} /> : res.type === 'lesson' ? <Book size={20} /> : <FileText size={20} />}
                    </div>
                    <button 
                      onClick={() => toggleSaveResource(res)}
                      className="text-indigo-600 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
                      title="Remove Bookmark"
                    >
                      <Bookmark size={18} className="fill-current" />
                    </button>
                  </div>
                  <h4 className="font-bold text-lg text-slate-900 font-display mb-2">{res.title}</h4>
                  <p className="text-sm text-slate-500 font-body mb-6 line-clamp-2">{res.desc}</p>
                  
                  <button 
                    onClick={() => navigateToResource(res.tab)}
                    className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-xl font-bold text-sm transition-colors border border-slate-200 hover:border-indigo-200"
                  >
                    Open in Resources <ExternalLink size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-dashed border-slate-300">
              <FolderOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 font-display">Your Backpack is Empty</h3>
              <p className="text-slate-500 font-body mt-2">Click the bookmark icon on any tool, material, or lesson to save it here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};