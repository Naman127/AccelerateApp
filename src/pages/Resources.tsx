// src/pages/Resources.tsx
import React, { useState } from 'react';
import {
  Search,
  PlayCircle,
  Calculator,
  FileText,
  Download,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Book,
  ArrowLeft,
  Loader2,
  TrendingUp,
  ShieldAlert,
  Zap,
  ChevronRight
} from 'lucide-react';
import { RESOURCES } from '../data/mockData';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const Resources = ({ addToast }) => {
  const [resourceTab, setResourceTab] = useState('tools');
  const [resourceSearch, setResourceSearch] = useState('');

  // AI Pitch Analyzer State
  const [pitchText, setPitchText] = useState('');
  const [pitchFeedback, setPitchFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Interactive Tools Navigation State
  const [activeTool, setActiveTool] = useState(null);

  // LTV/CAC Health Check State
  const [ltvData, setLtvData] = useState({ aov: 50, frequency: 4, lifespan: 2, cac: 40 });
  const calculatedLTV = ltvData.aov * ltvData.frequency * ltvData.lifespan;
  const ratio = ltvData.cac > 0 ? (calculatedLTV / ltvData.cac).toFixed(1) : 0;
  
  const getHealthStatus = () => {
    if (ratio >= 3) return { text: 'Excellent Health', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (ratio >= 1.5) return { text: 'Sustainable', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { text: 'Critical Risk', color: 'text-rose-500', bg: 'bg-rose-500/10' };
  };

  // ADVANCED Break-Even Calculator State
  const [beData, setBeData] = useState({ 
    rent: 1200, 
    salaries: 3000, 
    software: 150, 
    marketing: 400,
    price: 50, 
    cost: 15 
  });
  
  const totalFixedCosts = beData.rent + beData.salaries + beData.software + beData.marketing;
  const contributionMargin = beData.price - beData.cost;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(totalFixedCosts / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * beData.price;

  // Mini Lesson State
  const [activeLesson, setActiveLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const MINI_LESSONS = [
    { id: 1, title: 'The 4 Ps of Marketing', slides: [{ title: 'Product', content: 'What are you selling? Define features, benefits, and USP.' }, { title: 'Price', content: 'What is the value? Consider pricing strategies.' }, { title: 'Place', content: 'Where can customers buy it?' }, { title: 'Promotion', content: 'How will they know? Ads, social media, PR.' }] },
    { id: 2, title: 'Startup Funding 101', slides: [{ title: 'Bootstrapping', content: 'Self-funding. Keep 100% equity but grow slower.' }, { title: 'Friends & Family', content: 'Early capital from personal network.' }, { title: 'Angel Investors', content: 'High-net-worth individuals investing own money.' }, { title: 'Venture Capital', content: 'Institutional money for high-growth scaling.' }] },
    { id: 3, title: 'Customer Discovery', slides: [{ title: 'The Mom Test', content: "Don't ask 'Is this a good idea?' Ask about past behaviors." }, { title: 'Identify Pain', content: 'Find a frequent, painful, and urgent problem.' }, { title: 'Validation', content: 'Get commitment before building.' }] },
    { id: 4, title: 'Legal Basics for Founders', slides: [{ title: 'Sole Proprietorship', content: 'Easiest to start, personally liable.' }, { title: 'LLC', content: 'Protects personal assets from business risks.' }, { title: 'C-Corp', content: 'Standard for venture-backed startups.' }, { title: 'IP Protection', content: 'Trademarks, Patents, Copyrights.' }] },
    { id: 5, title: 'Building an MVP', slides: [{ title: 'Minimum Viable Product', content: 'Simplest version that solves the core problem.' }, { title: 'Feature Creep', content: 'Focus on one thing and do it well.' }, { title: 'No-Code Tools', content: 'Use Bubble or Webflow to build without code.' }, { title: 'Iterate', content: 'Launch fast, get feedback, improve.' }] },
    { id: 6, title: 'Growth Hacking', slides: [{ title: 'Product-Led Growth', content: 'Product itself drives adoption.' }, { title: 'Viral Loops', content: 'Features that encourage inviting others.' }, { title: 'SEO', content: 'Getting traffic from Google for free.' }, { title: 'Content Marketing', content: 'Valuable blogs or videos to attract customers.' }] },
    { id: 7, title: 'Financial Modeling', slides: [{ title: 'Burn Rate', content: 'Money spent per month.' }, { title: 'Runway', content: 'Months you can survive before running out of cash.' }, { title: 'CAC', content: 'Customer Acquisition Cost.' }, { title: 'LTV', content: 'Lifetime Value of a customer.' }] },
    { id: 8, title: 'Pitching to Investors', slides: [{ title: 'The Problem', content: 'Start with a relatable, painful problem.' }, { title: 'The Solution', content: 'Show your product and how it solves the pain.' }, { title: 'The Market', content: 'How big is the opportunity? TAM, SAM, SOM.' }, { title: 'The Ask', content: 'How much money do you need?' }] },
    { id: 9, title: 'Team Building', slides: [{ title: 'Co-Founders', content: 'Look for complementary skills.' }, { title: 'Culture', content: 'Hire for attitude, train for skill.' }, { title: 'Equity', content: 'Use vesting schedules to protect the company.' }] },
    { id: 10, title: 'Productivity Systems', slides: [{ title: 'Deep Work', content: 'Focus on one hard task for 2-4 hours.' }, { title: 'Time Blocking', content: 'Schedule day in blocks for specific tasks.' }, { title: 'The 2-Minute Rule', content: 'If < 2 mins, do it immediately.' }] },
    { id: 11, title: 'Sales Psychology', slides: [{ title: 'Reciprocity', content: 'Give value first before asking for a sale.' }, { title: 'Scarcity', content: 'Limited time/availability increases desire.' }, { title: 'Social Proof', content: 'People follow the crowd. Show testimonials.' }] },
    { id: 12, title: 'Design Thinking', slides: [{ title: 'Empathize', content: 'Understand user needs and feelings.' }, { title: 'Define', content: 'Clearly articulate the problem.' }, { title: 'Ideate', content: 'Brainstorm many possible solutions.' }, { title: 'Prototype', content: 'Build rough versions to test ideas.' }] }
  ];

  const categories = [...new Set(RESOURCES.map((r) => r.category))];
  const filteredResources = RESOURCES.filter(
    (res) =>
      (res.title || '').toLowerCase().includes(resourceSearch.toLowerCase()) ||
      (res.category || '').toLowerCase().includes(resourceSearch.toLowerCase()) ||
      (res.author || '').toLowerCase().includes(resourceSearch.toLowerCase())
  );

  const handleDownloadResource = (title) => {
    addToast(`Downloading ${title}...`, 'info');
    setTimeout(() => {
      addToast('Download Complete!', 'success');
    }, 1500);
  };

  const analyzePitch = async () => {
    if (!pitchText.trim()) return;
    setIsAnalyzing(true);
    setPitchFeedback(null);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { responseMimeType: 'application/json' },
      });

      const prompt = `
        You are an expert Silicon Valley VC and startup pitch coach.
        Analyze this elevator pitch: "${pitchText}".
        You must return a pure JSON object strictly following this structure:
        {
          "score": 85, // A realistic score out of 100
          "tips": [
            "Tip 1 on what is missing or weak",
            "Tip 2 on how to improve clarity",
            "Tip 3 on market validation or hook"
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      let responseText = result.response.text();
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const aiData = JSON.parse(responseText);

      setPitchFeedback(aiData);
      setIsAnalyzing(false);
      addToast('Pitch analyzed successfully!', 'success');
    } catch (error) {
      console.error('AI Analysis failed:', error);
      setIsAnalyzing(false);
      addToast('Error analyzing pitch. Check your API key or try again.', 'error');
    }
  };

  const INTERACTIVE_TOOLS = [
    {
      id: 'ltvcac',
      title: 'Unit Economics Health Check',
      desc: 'Audit your startup\'s sustainability by comparing Customer Lifetime Value (LTV) to Acquisition Cost (CAC).',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      border: 'hover:border-emerald-300'
    },
    {
      id: 'breakeven',
      title: 'Advanced Break-Even Calculator',
      desc: 'Determine exact sales targets required to cover detailed fixed costs and variable unit expenses.',
      icon: Calculator,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      border: 'hover:border-amber-300'
    },
    {
      id: 'pitch',
      title: 'Pitch Deck Analyzer',
      desc: 'Get instant, Gemini AI-driven feedback on your elevator pitch structure, market hook, and clarity.',
      icon: Sparkles,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100',
      border: 'hover:border-indigo-300'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative z-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">
            Resource Library
          </h2>
          <p className="text-slate-500 font-body">
            Tools to speed up your execution.
          </p>
        </div>

        <div className="flex bg-white/50 p-1 rounded-xl backdrop-blur-sm border border-slate-200/50">
          <button
            onClick={() => { setResourceTab('materials'); setActiveTool(null); setActiveLesson(null); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              resourceTab === 'materials' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Materials
          </button>
          <button
            onClick={() => { setResourceTab('tools'); setActiveLesson(null); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              resourceTab === 'tools' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Tools
          </button>
          <button
            onClick={() => { setResourceTab('lessons'); setActiveTool(null); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              resourceTab === 'lessons' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Mini-Lessons
          </button>
        </div>
      </div>

      {/* --- MATERIALS TAB --- */}
      {resourceTab === 'materials' && (
        <div className="space-y-10 animate-slide-up">
          <div className="relative w-full mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search templates, docs, videos..."
              value={resourceSearch}
              onChange={(e) => setResourceSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>
          {categories.map((category) => {
            const categoryResources = filteredResources?.filter((res) => res.category === category);
            if (categoryResources.length === 0) return null;
            return (
              <div key={category}>
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-display flex items-center gap-2 px-1">
                  <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryResources.map((res) => (
                    <div
                      key={res.id}
                      className="bg-white/70 backdrop-blur-md border border-white/50 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group cursor-pointer"
                      onClick={() => handleDownloadResource(res.title)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${res.type === 'video' ? 'bg-red-100 text-red-600' : res.type === 'tool' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                          {res.type === 'video' ? <PlayCircle size={20} /> : res.type === 'tool' ? <Calculator size={20} /> : <FileText size={20} />}
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">{res.format || res.type}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1 font-display line-clamp-1">{res.title}</h3>
                      <p className="text-sm text-slate-500 mb-4 font-body">{res.author}</p>
                      <div className="flex items-center justify-between text-xs font-medium text-indigo-600 mt-auto pt-4 border-t border-slate-100/50">
                        <span>{res.duration || 'Downloadable'}</span>
                        <span className="flex items-center gap-1 group-hover:underline"><Download size={14} /> Get Access</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- INTERACTIVE TOOLS TAB --- */}
      {resourceTab === 'tools' && (
        <div className="animate-slide-up">
          {!activeTool ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INTERACTIVE_TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-left group ${tool.border}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${tool.bg} ${tool.color}`}>
                    <tool.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">
                    {tool.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-body mb-6 leading-relaxed">
                    {tool.desc}
                  </p>
                  <div className={`flex items-center gap-2 font-bold text-sm transition-all ${tool.color} group-hover:gap-3`}>
                    Open Tool <ChevronRight size={16} />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <button
                onClick={() => setActiveTool(null)}
                className="mb-6 flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium font-body"
              >
                <ArrowLeft size={18} className="mr-2" /> Back to Tools
              </button>

              {/* ACTIVE TOOL: LTV / CAC */}
              {activeTool === 'ltvcac' && (
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl animate-in zoom-in-95">
                  <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                    <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl"><TrendingUp size={32} /></div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 font-display">Unit Economics Health Check</h3>
                      <p className="text-sm text-slate-500 font-body mt-1">LTV : CAC Ratio</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
                    <div className="space-y-2">
                      <label className="font-bold text-slate-700 uppercase tracking-wide text-xs">Avg. Order Value ($)</label>
                      <input type="number" value={ltvData.aov} onChange={(e) => setLtvData({...ltvData, aov: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-slate-700 uppercase tracking-wide text-xs">Annual Purchase Frequency</label>
                      <input type="number" value={ltvData.frequency} onChange={(e) => setLtvData({...ltvData, frequency: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-slate-700 uppercase tracking-wide text-xs">Customer Lifespan (Years)</label>
                      <input type="number" value={ltvData.lifespan} onChange={(e) => setLtvData({...ltvData, lifespan: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-bold text-slate-700 uppercase tracking-wide text-xs">Acquisition Cost - CAC ($)</label>
                      <input type="number" value={ltvData.cac} onChange={(e) => setLtvData({...ltvData, cac: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                    </div>
                  </div>

                  <div className={`rounded-2xl p-8 text-center transition-all border ${getHealthStatus().bg} border-${getHealthStatus().color.split('-')[1]}-200`}>
                    <div className="text-xs font-black uppercase text-slate-600 tracking-[0.2em] mb-2">Growth Index Ratio</div>
                    <div className={`text-6xl font-black font-display mb-3 ${getHealthStatus().color}`}>{ratio}:1</div>
                    <div className={`text-base font-bold flex items-center justify-center gap-2 ${getHealthStatus().color}`}>
                      <ShieldAlert size={18} /> {getHealthStatus().text}
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIVE TOOL: BREAK-EVEN */}
              {activeTool === 'breakeven' && (
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl animate-in zoom-in-95">
                  <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                    <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl"><Calculator size={32} /></div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 font-display">Advanced Break-Even Tool</h3>
                      <p className="text-sm text-slate-500 font-body mt-1">Calculate exact targets to cover operational costs.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Fixed Costs Column */}
                    <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h4 className="font-bold text-slate-800 font-display border-b border-slate-200 pb-2 mb-4">Monthly Fixed Costs</h4>
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Rent & Utilities ($)</label>
                        <input type="number" value={beData.rent} onChange={(e) => setBeData({...beData, rent: Number(e.target.value)})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Salaries ($)</label>
                        <input type="number" value={beData.salaries} onChange={(e) => setBeData({...beData, salaries: Number(e.target.value)})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Software / Tools ($)</label>
                        <input type="number" value={beData.software} onChange={(e) => setBeData({...beData, software: Number(e.target.value)})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">Marketing Budget ($)</label>
                        <input type="number" value={beData.marketing} onChange={(e) => setBeData({...beData, marketing: Number(e.target.value)})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div className="pt-2 flex justify-between items-center text-slate-700">
                        <span className="font-bold text-sm">Total Fixed:</span>
                        <span className="font-black text-lg">${totalFixedCosts.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Unit Economics Column */}
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                        <h4 className="font-bold text-slate-800 font-display border-b border-slate-200 pb-2 mb-4">Unit Economics</h4>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Selling Price per Unit ($)</label>
                            <input type="number" value={beData.price} onChange={(e) => setBeData({...beData, price: Number(e.target.value)})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Variable Cost per Unit ($)</label>
                            <input type="number" value={beData.cost} onChange={(e) => setBeData({...beData, cost: Number(e.target.value)})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
                          </div>
                        </div>
                      </div>

                      {/* Results Box */}
                      <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/20">
                        <h4 className="font-bold uppercase tracking-wider text-xs text-amber-100 mb-4">Break-Even Point</h4>
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-amber-50 font-medium text-sm">Required Units:</span>
                          <span className="text-4xl font-black font-display leading-none">{breakEvenUnits.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-end border-t border-amber-400/50 pt-2 mt-2">
                          <span className="text-amber-50 font-medium text-sm">Required Revenue:</span>
                          <span className="text-2xl font-bold font-display leading-none">${breakEvenRevenue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIVE TOOL: PITCH ANALYZER */}
              {activeTool === 'pitch' && (
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-xl animate-in zoom-in-95">
                  <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                    <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl"><Sparkles size={32} /></div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 font-display">Pitch Deck Analyzer</h3>
                      <p className="text-sm text-slate-500 font-body mt-1">Instant Gemini AI feedback.</p>
                    </div>
                  </div>

                  <textarea
                    value={pitchText}
                    onChange={(e) => setPitchText(e.target.value)}
                    className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-body text-slate-900 mb-6 shadow-inner text-base leading-relaxed"
                    placeholder="e.g. We help remote teams collaborate better by providing a virtual office space that integrates with Slack..."
                  />

                  <button
                    onClick={analyzePitch}
                    disabled={isAnalyzing || !pitchText.trim()}
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:shadow-xl transition-all disabled:opacity-70 flex justify-center items-center gap-2 text-lg font-body"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 size={24} className="animate-spin" /> Analyzing Pitch Structure...
                      </>
                    ) : (
                      'Analyze Market Readiness'
                    )}
                  </button>

                  {pitchFeedback && (
                    <div className="mt-8 border-t border-slate-200 pt-8 animate-in slide-in-from-bottom-4">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-slate-500 font-bold uppercase tracking-wider text-sm">Readiness Score</span>
                        <span className={`text-4xl font-black font-display ${pitchFeedback.score > 70 ? 'text-emerald-600' : pitchFeedback.score > 40 ? 'text-amber-500' : 'text-rose-500'}`}>
                          {pitchFeedback.score}/100
                        </span>
                      </div>
                      <div className="space-y-3">
                        {pitchFeedback.tips?.length > 0 ? (
                          pitchFeedback.tips.map((tip, i) => (
                            <div key={i} className="flex gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                              <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                              <span className="font-body">{tip}</span>
                            </div>
                          ))
                        ) : (
                          <div className="flex gap-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-emerald-800 leading-relaxed">
                            <CheckCircle2 className="flex-shrink-0 mt-0.5" size={18} />
                            <span className="font-body font-medium">Great pitch! You covered the problem, solution, and audience clearly.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* --- MINI-LESSONS TAB --- */}
      {resourceTab === 'lessons' && (
        <div className="animate-slide-up">
          {!activeLesson ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MINI_LESSONS.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    setCurrentSlide(0);
                  }}
                  className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Book size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-body">
                    {lesson.slides.length} Cards • 5 Min
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setActiveLesson(null)}
                className="mb-6 flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" /> Back to Lessons
              </button>
              <div className="bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden min-h-[400px] flex flex-col relative">
                <div className="p-8 flex-1 flex flex-col justify-center items-center text-center relative z-10">
                  <span className="text-indigo-500 font-bold tracking-widest uppercase text-xs mb-4">
                    Card {currentSlide + 1} of {activeLesson.slides.length}
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 mb-6 font-display">
                    {activeLesson.slides[currentSlide].title}
                  </h2>
                  <p className="text-lg text-slate-600 font-body leading-relaxed max-w-lg">
                    {activeLesson.slides[currentSlide].content}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
                  <button
                    disabled={currentSlide === 0}
                    onClick={() => setCurrentSlide((c) => c - 1)}
                    className="px-4 py-2 rounded-lg font-bold text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    Prev
                  </button>
                  <div className="flex gap-1">
                    {activeLesson.slides.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i === currentSlide ? 'bg-indigo-600' : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    disabled={currentSlide === activeLesson.slides.length - 1}
                    onClick={() => setCurrentSlide((c) => c + 1)}
                    className="px-4 py-2 rounded-lg font-bold text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};