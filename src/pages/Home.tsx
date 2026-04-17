// src/pages/Home.tsx
import React, { useState } from 'react';
import { 
  Sparkles, Bot, BrainCircuit, Info, Search, 
  ArrowLeft, Bookmark, DollarSign, Rocket, X, Loader2, Check 
} from 'lucide-react';
import { HeroTitle } from '../components/HeroTitle';
import { FeatureCard } from '../components/FeatureCard';
import { BUSINESS_FIELDS, BUSINESS_TYPES } from '../data/mockData';

const FOUNDER_QUIZ = [
  {
    id: 'budget',
    question: 'What is your initial capital allocation?',
    options: [
      { label: 'Bootstrapped ($0 - $500)', value: 'low' },
      { label: 'Moderate ($500 - $2,000)', value: 'med' },
      { label: 'Funded ($2,000+)', value: 'high' },
    ],
  },
  {
    id: 'time',
    question: 'What is your weekly time availability?',
    options: [
      { label: 'Side Hustle (5-10 hours)', value: 'part' },
      { label: 'Half-Time (10-20 hours)', value: 'med' },
      { label: 'All In (30+ hours)', value: 'full' },
    ],
  },
  {
    id: 'skill',
    question: 'Which core competency describes you best?',
    options: [
      { label: 'Engineering & Logic (Code, Systems)', value: 'tech' },
      { label: 'Design & Creativity (Art, Brand)', value: 'creative' },
      { label: 'People & Strategy (Sales, Marketing)', value: 'social' },
    ],
  },
  {
    id: 'goal',
    question: 'What is your primary strategic objective?',
    options: [
      { label: 'Passive Income & Automation', value: 'passive' },
      { label: 'High Growth & Scaling', value: 'scale' },
      { label: 'Lifestyle & Independence', value: 'lifestyle' },
    ],
  },
  {
    id: 'risk',
    question: 'What is your risk tolerance?',
    options: [
      { label: 'Low (Proven, steady models)', value: 'low' },
      { label: 'Medium (Calculated risks)', value: 'med' },
      { label: 'High (Disruptive moonshots)', value: 'high' },
    ],
  },
];

export const Home = ({
  selectedField, setSelectedField,
  savedMissions, toggleSaveMission,
  handleStartBusiness, handleNav,
  isGenerating, handleGenerateBlueprint,
  isQuizOpen, setIsQuizOpen,
  quizStep, handleQuizAnswer,
  quizResult, resetQuiz,
  showDnaTooltip, setShowDnaTooltip,
  globalSearch // <-- ADDED PROP
}) => {
  // LOCAL STATE - AI Typing no longer lags the app!
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const submitAiPrompt = async () => {
    await handleGenerateBlueprint(aiPrompt);

    setIsAiModalOpen(false);
    setAiPrompt('');
  };

  // --- OMNI-SEARCH LOGIC ---
  const isSearchActive = !!globalSearch;
  const searchLower = globalSearch?.toLowerCase() || '';

  // Flatten all blueprints from all fields into one master array
  const allBlueprints = Object.entries(BUSINESS_TYPES).flatMap(([fieldId, types]) =>
    types.map(type => ({ ...type, fieldId }))
  );

  // Filter the master array by the search term
  const searchResults = isSearchActive 
    ? allBlueprints.filter(bp => 
        bp.name.toLowerCase().includes(searchLower) || 
        bp.cost.toLowerCase().includes(searchLower)
      )
    : [];

  return (
    <div className="animate-fade-in relative z-10">
      
      {/* If Search is active, hide the normal UI and show OMNI-SEARCH RESULTS */}
      {isSearchActive ? (
        <div className="max-w-6xl mx-auto animate-slide-up pb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 font-display">Search Results</h2>
            <p className="text-slate-500 font-body mt-1">Found {searchResults.length} missions matching "{globalSearch}" across all fields.</p>
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-dashed border-slate-300">
              <Search size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 font-display">No missions found</h3>
              <p className="text-slate-500 font-body">Try searching for a different industry or keyword.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((type) => {
                const isSaved = savedMissions.includes(type.id);
                const parentField = BUSINESS_FIELDS.find(f => f.id === type.fieldId);
                
                return (
                  <div key={type.id} className={`bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-xl hover:border-cyan-500/50 transition-all group flex flex-col justify-between shadow-sm hover:shadow-md relative search-match scale-[1.02]`}>
                    <button onClick={(e) => toggleSaveMission(e, type.id)} className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${isSaved ? 'text-yellow-500 bg-yellow-50' : 'text-slate-400 hover:text-yellow-500 hover:bg-yellow-50/50'}`}>
                      <Bookmark fill={isSaved ? 'currentColor' : 'none'} size={20} />
                    </button>
                    <div>
                      <div className="flex justify-between items-start mb-2 pr-8">
                        <h3 className="text-xl font-bold text-slate-900 font-display">{type.name}</h3>
                      </div>
                      <div className="mb-3">
                         <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-[10px] uppercase font-bold tracking-wider rounded">
                           {parentField?.name || type.fieldId}
                         </span>
                      </div>
                      <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
                        <DollarSign size={14} className="text-cyan-600" />
                        <span className="font-medium text-cyan-700">Est. Cost: {type.cost}</span>
                      </div>
                    </div>
                    <button onClick={() => handleStartBusiness(type.id, type.fieldId, type.name)} className="w-full py-3 bg-slate-100/50 hover:bg-slate-200/50 text-slate-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 font-body mt-auto">
                      Start Mission <Rocket size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* NORMAL BROWSE UI (Hidden during search) */
        <>
          <header className="text-center mb-12">
            <HeroTitle />
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-body leading-relaxed animate-enter" style={{ animationDelay: '0.8s' }}>
              The sky's the limit. Ambition is the fuel.
            </p>
          </header>

          {!selectedField && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              {BUSINESS_FIELDS.map((field) => (
                <FeatureCard key={field.id} icon={field.icon} title={field.name} desc={field.desc} color={field.color} onClick={() => setSelectedField(field)} />
              ))}
            </div>
          )}

          {!selectedField && (
            <div className="max-w-6xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* AI Architect Card - Amber Theme */}
                <button onClick={() => setIsAiModalOpen(true)} className="flex-1 bg-white/80 backdrop-blur-xl border border-amber-200/60 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group text-left relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="text-amber-600" size={20} />
                        <h3 className="text-lg font-bold text-slate-900 font-display">AI Architect</h3>
                      </div>
                      <p className="text-slate-600 text-sm font-body">Have a unique idea? Generate a custom blueprint.</p>
                    </div>
                    <div className="bg-amber-100 p-3 rounded-full text-amber-600 group-hover:scale-110 transition-transform"><Bot size={24} /></div>
                  </div>
                </button>

                {/* Founder DNA Card - Amber Theme */}
                <button onClick={() => setIsQuizOpen(true)} className="flex-1 bg-white/80 backdrop-blur-xl border border-amber-200/60 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group text-left relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <BrainCircuit className="text-orange-600" size={20} />
                        <h3 className="text-lg font-bold text-slate-900 font-display">Founder DNA</h3>
                        <div className="relative">
                          <div onClick={(e) => { e.stopPropagation(); setShowDnaTooltip(!showDnaTooltip); }} className="cursor-pointer text-amber-400 hover:text-orange-600 transition-colors p-1 rounded-full hover:bg-amber-50"><Info size={14} /></div>
                          {showDnaTooltip && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 cursor-auto">
                              <p>Learn where you may excel!</p>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm font-body">Take the quiz to find what business suits your strengths and resources.</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full text-orange-600 group-hover:scale-110 transition-transform"><Search size={24} /></div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {selectedField && (
            <div className="max-w-4xl mx-auto animate-slide-up pb-20">
              <button onClick={() => setSelectedField(null)} className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors px-4 py-2 rounded-lg hover:bg-white/50 backdrop-blur-sm">
                <ArrowLeft size={20} className="mr-2" /> Back to Fields
              </button>
              <div className={`bg-gradient-to-r ${selectedField.color} p-8 rounded-2xl mb-8 text-white shadow-xl bg-opacity-90 backdrop-blur-md`}>
                <h2 className="text-3xl font-bold flex items-center gap-3 font-display">
                  {(() => { const SelectedIcon = selectedField.icon; return <SelectedIcon className="w-8 h-8" />; })()} {selectedField.name}
                </h2>
                <p className="opacity-90 mt-2 font-body">{selectedField.desc}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(BUSINESS_TYPES[selectedField.id] || []).map((type) => {
                  const isSaved = savedMissions.includes(type.id);
                  return (
                    <div key={type.id} className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-xl hover:border-cyan-500/50 transition-all group flex flex-col justify-between shadow-sm hover:shadow-md relative">
                      <button onClick={(e) => toggleSaveMission(e, type.id)} className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${isSaved ? 'text-yellow-500 bg-yellow-50' : 'text-slate-400 hover:text-yellow-500 hover:bg-yellow-50/50'}`}><Bookmark fill={isSaved ? 'currentColor' : 'none'} size={20} /></button>
                      <div>
                        <div className="flex justify-between items-start mb-2 pr-8"><h3 className="text-xl font-bold text-slate-900 font-display">{type.name}</h3></div>
                        <div className="flex items-center gap-2 mb-4 text-sm text-slate-500"><DollarSign size={14} className="text-cyan-600" /><span className="font-medium text-cyan-700">Est. Cost: {type.cost}</span></div>
                      </div>
                      <button onClick={() => handleStartBusiness(type.id, selectedField.id, type.name)} className="w-full py-3 bg-slate-100/50 hover:bg-slate-200/50 text-slate-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 font-body mt-auto">Start Mission <Rocket size={16} /></button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* AI ARCHITECT MODAL (AMBER THEME)          */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20">
            <button onClick={() => setIsAiModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10"><X size={20} /></button>
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20"><BrainCircuit size={120} /></div>
              <h2 className="text-3xl font-bold font-display relative z-10 flex items-center gap-3"><Sparkles /> AI Architect</h2>
            </div>
            <div className="p-8">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="animate-spin text-amber-600 mb-4" size={48} />
                  <h3 className="text-xl font-bold text-slate-900 font-display animate-pulse">Constructing Blueprint...</h3>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700 font-body uppercase tracking-wide">Your Idea</label>
                  <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none font-body text-slate-900" placeholder="e.g. A subscription service for organic dog treats..." />
                  <div className="flex justify-end pt-4">
                    <button onClick={submitAiPrompt} disabled={!aiPrompt.trim()} className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${!aiPrompt.trim() ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-200'}`}>
                      <Bot size={20} /> Generate Blueprint
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOUNDER DNA QUIZ MODAL (AMBER THEME)      */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20">
            <button onClick={resetQuiz} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10"><X size={20} /></button>
            {!quizResult ? (
              <>
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white text-center">
                  <h2 className="text-2xl font-bold font-display">Founder DNA</h2>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 font-display text-center">{FOUNDER_QUIZ[quizStep].question}</h3>
                  <div className="space-y-3">
                    {FOUNDER_QUIZ[quizStep].options.map((opt) => (
                      <button key={opt.value} onClick={() => handleQuizAnswer(opt.value)} className="w-full p-4 border border-slate-200 rounded-xl hover:bg-amber-50 hover:border-amber-300 text-left transition-all font-body text-slate-700 font-medium hover:shadow-sm">
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"><Check size={32} /></div>
                  <h2 className="text-2xl font-bold font-display">Analysis Complete</h2>
                </div>
                <div className="p-8">
                  <p className="text-slate-500 mb-6 font-body text-sm uppercase tracking-wide text-center font-bold">Your Top 3 Recommended Paths</p>
                  <div className="space-y-4">
                    {quizResult.map((biz, index) => (
                      <div key={biz.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between group hover:border-amber-300 transition-colors shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold font-display">#{index + 1}</div>
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-slate-900 font-display">{biz.name}</h3>
                            <p className="text-xs text-slate-500 font-body">{biz.matchScore}% Match Compatibility</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            handleStartBusiness(biz.id, biz.fieldId, biz.name);
                            resetQuiz();
                          }}
                          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-md text-sm font-body flex items-center gap-2"
                        >
                          Start <Rocket size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={resetQuiz} className="w-full mt-6 py-3 text-slate-500 hover:text-slate-900 text-sm font-bold transition-colors font-body">Retake Assessment</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};