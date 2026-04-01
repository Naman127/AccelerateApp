import React from 'react';
import { Bookmark, ChevronDown, DollarSign, Timer, Wrench, Rocket } from 'lucide-react';
import { BUSINESS_TYPES, BLUEPRINTS } from '../data/mockData';

export const SavedMissions = ({ savedMissions, expandedSavedMission, setExpandedSavedMission, toggleSaveMission, handleStartBusiness, setActiveTab }) => {
  const allTypes = Object.values(BUSINESS_TYPES).flat();
  const savedItems = allTypes.filter((t) => savedMissions.includes(t.id));

  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative z-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display">Saved Missions</h2>
      <p className="text-slate-500 mb-8 font-body">Review and explore executive summaries before you launch.</p>

      {savedItems.length === 0 ? (
        <div className="text-center p-12 bg-white/60 backdrop-blur-xl rounded-2xl border border-dashed border-slate-300 shadow-sm">
          <Bookmark size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-xl text-slate-900 mb-2 font-display">No Saved Missions</h3>
          <p className="text-slate-500 mb-6 font-body">Browse missions and click the bookmark icon to save them for later.</p>
          <button onClick={() => setActiveTab('home')} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors font-body">Browse Missions</button>
        </div>
      ) : (
        <div className="space-y-6">
          {savedItems.map((item) => {
            const blueprint = BLUEPRINTS[item.id] || BLUEPRINTS['default'];
            const isExpanded = expandedSavedMission === item.id;
            return (
              <div key={item.id} className={`bg-white/70 backdrop-blur-md border ${isExpanded ? 'border-indigo-200 ring-1 ring-indigo-200' : 'border-white/50'} rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden`}>
                <div className="p-6 cursor-pointer" onClick={() => setExpandedSavedMission(isExpanded ? null : item.id)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 font-display mb-2">{item.name}</h3>
                      <p className="text-slate-500 text-sm font-body max-w-2xl">{blueprint.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => toggleSaveMission(e, item.id)} className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-full transition-colors">
                        <Bookmark fill="currentColor" size={20} />
                      </button>
                      <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''} text-slate-400`}><ChevronDown size={20} /></div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-slate-100 animate-slide-up bg-white/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                          <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide flex items-center gap-2"><DollarSign size={14} /> Financials</h4>
                          <div className="flex justify-between text-sm mb-1"><span className="text-slate-500">Est. Cost</span><span className="font-medium text-slate-900">{item.cost}</span></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide flex items-center gap-2"><Timer size={14} /> Phase Timeline</h4>
                        <div className="space-y-0 relative">
                          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-200"></div>
                          {blueprint.stages.map((stage, i) => (
                            <div key={i} className="relative pl-6 pb-4">
                              <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-indigo-400"></div>
                              <div className="font-bold text-slate-800 text-sm">{stage.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 pt-4 border-t border-slate-200 flex justify-end">
                      <button onClick={() => {
                          let fieldId = 'other';
                          Object.keys(BUSINESS_TYPES).forEach((key) => {
                            if (BUSINESS_TYPES[key].find((t) => t.id === item.id)) fieldId = key;
                          });
                          handleStartBusiness(item.id, fieldId, item.name);
                        }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 font-body">
                        Start Mission Now <Rocket size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};