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
  globalSearch
}) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const submitAiPrompt = async () => {
    // Await the 11-second timer from App.tsx without closing the modal
    await handleGenerateBlueprint(aiPrompt);
    setIsSuccess(true);
  };

  const handleCloseAiModal = () => {
    setIsAiModalOpen(false);
    setAiPrompt('');
    setIsSuccess(false); 
  };

  const handleNavigateToDashboard = () => {
    handleCloseAiModal();
    handleNav('dashboard');
  };

  const isSearchActive = !!globalSearch;
  const searchLower = globalSearch?.toLowerCase() || '';

  const allBlueprints = Object.entries(BUSINESS_TYPES).flatMap(([fieldId, types]) =>
    types.map(type => ({ ...type, fieldId }))
  );

  const searchResults = isSearchActive 
    ? allBlueprints.filter(bp => 
        bp.name.toLowerCase().includes(searchLower) || 
        bp.cost.toLowerCase().includes(searchLower)
      )
    : [];

  return (
    <div className="animate-fade-in relative z-10">
      
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
                  <div key={type.id} className={`bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-xl hover:border-cyan-500/50 transition-all duration-300 ease-out group flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 relative search-match`}>
                    <button 
                      onClick={(e) => toggleSaveMission(e, type.id)} 
                      className={`absolute top-4 right-4 p-2 rounded-full transition-transform active:scale-90 z-10 ${isSaved ? 'text-yellow-500 bg-yellow-50' : 'text-slate-400 hover:text-yellow-500 hover:bg-yellow-50/50'}`}
                    >
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
                    <button 
                      onClick={() => handleStartBusiness(type.id, type.fieldId, type.name)} 
                      className="w-full py-3 bg-slate-100/50 hover:bg-slate-200/50 text-slate-900 rounded-lg font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 font-body mt-auto group/btn"
                    >
                      Start Mission <Rocket size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
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
                <button 
                  onClick={() => setIsAiModalOpen(true)} 
                  className="flex-1 bg-white/80 backdrop-blur-xl border border-amber-200/60 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out group text-left relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="text-amber-600" size={20} />
                        <h3 className="text-lg font-bold text-slate-900 font-display">AI Architect</h3>
                      </div>
                      <p className="text-slate-600 text-sm font-body">Have a unique idea? Generate a custom blueprint.</p>
                    </div>
                    <div className="bg-amber-100 p-3 rounded-full text-amber-600 group-hover:scale-110 transition-transform duration-300"><Bot size={24} /></div>
                  </div>
                </button>

                <button 
                  onClick={() => setIsQuizOpen(true)} 
                  className="flex-1 bg-white/80 backdrop-blur-xl border border-amber-200/60 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out group text-left relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <BrainCircuit className="text-orange-600" size={20} />
                        <h3 className="text-lg font-bold text-slate-900 font-display">Founder DNA</h3>
                        <div className="relative">
                          <div onClick={(e) => { e.stopPropagation(); setShowDnaTooltip(!showDnaTooltip); }} className="cursor-pointer text-amber-400 hover:text-orange-600 transition-colors p-1 rounded-full hover:bg-amber-50 active:scale-90"><Info size={14} /></div>
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
                    <div className="bg-orange-100 p-3 rounded-full text-orange-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"><Search size={24} /></div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {selectedField && (
            <div className="max-w-4xl mx-auto animate-slide-up pb-20">
              <button onClick={() => setSelectedField(null)} className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-all active:scale-95 px-4 py-2 rounded-lg hover:bg-white/50 backdrop-blur-sm">
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
                    <div key={type.id} className="bg-white/70 backdrop-blur-md border border-white/40 p-6 rounded-xl hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group flex flex-col justify-between shadow-sm relative">
                      <button onClick={(e) => toggleSaveMission(e, type.id)} className={`absolute top-4 right-4 p-2 rounded-full transition-transform active:scale-90 ${isSaved ? 'text-yellow-500 bg-yellow-50' : 'text-slate-400 hover:text-yellow-500 hover:bg-yellow-50/50'}`}><Bookmark fill={isSaved ? 'currentColor' : 'none'} size={20} /></button>
                      <div>
                        <div className="flex justify-between items-start mb-2 pr-8"><h3 className="text-xl font-bold text-slate-900 font-display">{type.name}</h3></div>
                        <div className="flex items-center gap-2 mb-4 text-sm text-slate-500"><DollarSign size={14} className="text-cyan-600" /><span className="font-medium text-cyan-700">Est. Cost: {type.cost}</span></div>
                      </div>
                      <button 
                        onClick={() => handleStartBusiness(type.id, selectedField.id, type.name)} 
                        className="w-full py-3 bg-slate-100/50 hover:bg-slate-200/50 text-slate-900 rounded-lg font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 font-body group/btn"
                      >
                        Start Mission <Rocket size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* AI ARCHITECT MODAL */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20">
            
            <button 
              onClick={handleCloseAiModal} 
              className="absolute top-4 right-4 text-white hover:text-slate-200 z-50 transition-transform active:scale-90"
            >
              <X size={20} />
            </button>
            
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20"><BrainCircuit size={120} /></div>
              <h2 className="text-3xl font-bold font-display relative z-10 flex items-center gap-3"><Sparkles /> AI Architect</h2>
            </div>
            
            <div className="relative min-h-[300px] flex flex-col justify-center bg-white">
              
              {/* STATE 1: INPUT FORM */}
              {!isGenerating && !isSuccess && (
                <div className="p-8 space-y-6 animate-in fade-in">
                  <p className="text-slate-600 font-body text-base">
                    Describe your unique business concept. Our intelligent architect will construct a custom, step-by-step roadmap specifically for your idea.
                  </p>
                  
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. A subscription service delivering eco-friendly pet toys..."
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl font-body text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none shadow-sm"
                  />
                  
                  <button
                    onClick={submitAiPrompt}
                    disabled={!aiPrompt.trim()}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 font-display shadow-lg shadow-orange-500/20 text-lg"
                  >
                    Generate Blueprint <Sparkles size={20} />
                  </button>
                </div>
              )}

              {/* STATE 2: LOADING ANIMATION */}
              {isGenerating && (
                <div className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden bg-white rounded-b-2xl">
                  
                  {/* Faded Amber and Purple Aurora Background */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div 
                      className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-amber-400/20 rounded-full filter blur-[80px] animate-pulse" 
                      style={{ animationDuration: '4s' }}
                    ></div>
                    <div 
                      className="absolute -bottom-[20%] -right-[10%] w-[100%] h-[100%] bg-purple-500/15 rounded-full filter blur-[80px] animate-pulse" 
                      style={{ animationDuration: '6s', animationDelay: '1s' }}
                    ></div>
                  </div>

                  {/* Foreground Loading Content */}
                  <div className="relative z-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                    <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin duration-1000"></div>
                      <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-pulse"></div>
                      <Sparkles className="text-amber-600 animate-pulse" size={36} />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 font-display mb-3 tracking-tight">
                      Architecting Blueprint
                    </h3>
                    <p className="text-sm text-slate-600 font-body leading-relaxed max-w-[280px]">
                      Synthesizing market variables and formatting your structural roadmap...
                    </p>
                  </div>
                </div>
              )}
              
              {/* STATE 3: SUCCESS SCREEN */}
              {/* STATE 3: SUCCESS SCREEN */}
              {!isGenerating && isSuccess && (
                <div className="p-10 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Upgraded Checkmark with subtle pulse */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping duration-1000"></div>
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center relative z-10 shadow-sm border-4 border-white">
                      <Check size={40} strokeWidth={3} />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-slate-900 font-display mb-3 tracking-tight">
                    Blueprint Ready!
                  </h3>
                  <p className="text-slate-600 font-body mb-8 max-w-sm leading-relaxed">
                    Your custom structural roadmap has been successfully configured and added to your active operations.
                  </p>
                  
                  {/* Changed to font-body for a cleaner, modern UI look */}
                  <button 
                    onClick={handleNavigateToDashboard} 
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 font-body shadow-lg shadow-slate-900/20 text-lg"
                  >
                    Go to Mission Dashboard <ArrowLeft className="rotate-180" size={20} />
                  </button>
                  
                  <button 
                    onClick={handleCloseAiModal} 
                    className="w-full mt-3 py-3 text-slate-500 hover:text-slate-800 font-bold transition-all active:scale-95 font-body text-sm rounded-lg hover:bg-slate-50"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOUNDER DNA QUIZ MODAL */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20">
            <button onClick={resetQuiz} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10 transition-transform active:scale-90"><X size={20} /></button>
            {!quizResult ? (
              <>
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-white text-center">
                  <h2 className="text-2xl font-bold font-display">Founder DNA</h2>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 font-display text-center">{FOUNDER_QUIZ[quizStep].question}</h3>
                  <div className="space-y-3">
                    {FOUNDER_QUIZ[quizStep].options.map((opt) => (
                      <button 
                        key={opt.value} 
                        onClick={() => handleQuizAnswer(opt.value)} 
                        className="w-full p-4 border border-slate-200 rounded-xl hover:bg-amber-50 hover:border-amber-400 active:scale-[0.98] text-left transition-all duration-200 font-body text-slate-700 font-medium hover:shadow-md"
                      >
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
                      <div key={biz.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between group hover:border-amber-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold font-display group-hover:scale-110 transition-transform">#{index + 1}</div>
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
                          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-amber-600 active:scale-95 transition-all shadow-md text-sm font-body flex items-center gap-2 group/start"
                        >
                          Start <Rocket size={14} className="group-hover/start:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={resetQuiz} className="w-full mt-6 py-3 text-slate-500 hover:text-slate-900 text-sm font-bold transition-all active:scale-95 font-body">Retake Assessment</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};