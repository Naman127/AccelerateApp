// src/pages/Saved.tsx
import React, { useState } from 'react';
import { 
  Bookmark, Rocket, FileText, Calculator, Book, 
  ExternalLink, FolderOpen, Play, ChevronDown, 
  ChevronUp, Layers, CheckSquare, Clock 
} from 'lucide-react';
import { BLUEPRINTS } from '../data/mockData';

export const Saved = ({ 
  savedMissions, 
  savedResources, 
  toggleSaveResource, 
  navigateToResource,
  handleStartBusiness,
  toggleSaveMission,
  globalSearch // <-- ADDED PROP
}) => {
  const [activeSubTab, setActiveSubTab] = useState('missions');
  const [expandedMissionId, setExpandedMissionId] = useState(null); // <-- NEW STATE FOR QUICK VIEW

  // --- SAFE GLOBAL SEARCH FILTERING ---
  const searchLower = globalSearch?.toLowerCase() || '';

  const displayMissions = savedMissions.filter(id => {
    const bp = BLUEPRINTS[id];
    if (!bp) return false;
    if (!globalSearch) return true;
    return bp.title.toLowerCase().includes(searchLower) || bp.description.toLowerCase().includes(searchLower);
  });

  const displayResources = savedResources.filter(res => {
    if (!globalSearch) return true;
    return res.title.toLowerCase().includes(searchLower) || res.desc.toLowerCase().includes(searchLower);
  });

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
            onClick={() => { setActiveSubTab('missions'); setExpandedMissionId(null); }}
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
          {displayMissions.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayMissions.map((missionId) => {
                  const blueprint = BLUEPRINTS[missionId];
                  const isExpanded = expandedMissionId === missionId;
                  
                  // Calculate quick-view stats dynamically
                  const totalPhases = blueprint.stages?.length || 0;
                  const totalTasks = blueprint.stages?.reduce((acc, stage) => acc + (stage.tasks?.length || 0), 0) || 0;
                  // Grab the first phase's duration as a rough estimate, or default to "Variable"
                  const estTime = blueprint.stages?.[0]?.duration ? `~${blueprint.stages[0].duration} / Phase` : 'Variable';

                  return (
                    <div key={missionId} className={`bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-sm flex flex-col group hover:shadow-md hover:border-indigo-300 transition-all relative ${globalSearch ? 'search-match scale-[1.02]' : ''}`}>
                      
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
                      
                      {/* Description toggles line-clamp based on expanded state */}
                      <p className={`text-sm text-slate-500 font-body mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {blueprint.description}
                      </p>

                      {/* --- THE NEW QUICK VIEW DETAILS --- */}
                      {isExpanded && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4 animate-in slide-in-from-top-2 space-y-3 text-sm">
                          <div className="flex justify-between items-center text-slate-700 border-b border-slate-200/50 pb-2">
                            <span className="font-bold flex items-center gap-2 font-body text-xs uppercase tracking-wider text-slate-500"><Layers size={14} className="text-indigo-500"/> Total Phases</span>
                            <span className="font-bold font-mono">{totalPhases}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-700 border-b border-slate-200/50 pb-2">
                            <span className="font-bold flex items-center gap-2 font-body text-xs uppercase tracking-wider text-slate-500"><CheckSquare size={14} className="text-emerald-500"/> Action Items</span>
                            <span className="font-bold font-mono">{totalTasks}</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-700">
                            <span className="font-bold flex items-center gap-2 font-body text-xs uppercase tracking-wider text-slate-500"><Clock size={14} className="text-amber-500"/> Est. Pace</span>
                            <span className="font-bold font-mono text-xs">{estTime}</span>
                          </div>
                        </div>
                      )}

                      <button 
                        onClick={() => setExpandedMissionId(isExpanded ? null : missionId)}
                        className="mx-auto flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors mb-4 mt-auto"
                      >
                        {isExpanded ? 'Hide Details' : 'Quick View'} 
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      
                      <button 
                        onClick={() => handleStartBusiness(missionId, blueprint.field || 'custom', blueprint.title)}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-colors shadow-md group/btn"
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
              <h3 className="text-xl font-bold text-slate-700 font-display">No Missions Found</h3>
              <p className="text-slate-500 font-body mt-2">
                {globalSearch ? "No saved missions match your search query." : "Bookmark blueprints from the Browse tab to access them here."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* --- RESOURCES TAB --- */}
      {activeSubTab === 'resources' && (
        <div className="animate-slide-up">
          {displayResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayResources.map((res) => (
                <div key={res.id} className={`bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-sm flex flex-col group hover:shadow-md hover:border-indigo-300 transition-all ${globalSearch ? 'search-match scale-[1.02]' : ''}`}>
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
              <h3 className="text-xl font-bold text-slate-700 font-display">No Resources Found</h3>
              <p className="text-slate-500 font-body mt-2">
                {globalSearch ? "No saved resources match your search query." : "Click the bookmark icon on any tool, material, or lesson to save it here."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};