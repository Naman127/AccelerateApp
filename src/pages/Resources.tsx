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
} from 'lucide-react';
import { RESOURCES } from '../data/mockData';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const Resources = ({ addToast }) => {
  const [resourceTab, setResourceTab] = useState('materials');
  const [resourceSearch, setResourceSearch] = useState('');

  // AI Pitch Analyzer State
  const [pitchText, setPitchText] = useState('');
  const [pitchFeedback, setPitchFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mini Lesson State
  const [activeLesson, setActiveLesson] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const MINI_LESSONS = [
    {
      id: 1,
      title: 'The 4 Ps of Marketing',
      slides: [
        {
          title: 'Product',
          content: 'What are you selling? Define features, benefits, and USP.',
        },
        {
          title: 'Price',
          content: 'What is the value? Consider pricing strategies.',
        },
        { title: 'Place', content: 'Where can customers buy it?' },
        {
          title: 'Promotion',
          content: 'How will they know? Ads, social media, PR.',
        },
      ],
    },
    {
      id: 2,
      title: 'Startup Funding 101',
      slides: [
        {
          title: 'Bootstrapping',
          content: 'Self-funding. Keep 100% equity but grow slower.',
        },
        {
          title: 'Friends & Family',
          content: 'Early capital from personal network.',
        },
        {
          title: 'Angel Investors',
          content: 'High-net-worth individuals investing own money.',
        },
        {
          title: 'Venture Capital',
          content: 'Institutional money for high-growth scaling.',
        },
      ],
    },
    {
      id: 3,
      title: 'Customer Discovery',
      slides: [
        {
          title: 'The Mom Test',
          content: "Don't ask 'Is this a good idea?' Ask about past behaviors.",
        },
        {
          title: 'Identify Pain',
          content: 'Find a frequent, painful, and urgent problem.',
        },
        { title: 'Validation', content: 'Get commitment before building.' },
      ],
    },
    {
      id: 4,
      title: 'Legal Basics for Founders',
      slides: [
        {
          title: 'Sole Proprietorship',
          content: 'Easiest to start, personally liable.',
        },
        {
          title: 'LLC',
          content: 'Protects personal assets from business risks.',
        },
        { title: 'C-Corp', content: 'Standard for venture-backed startups.' },
        { title: 'IP Protection', content: 'Trademarks, Patents, Copyrights.' },
      ],
    },
    {
      id: 5,
      title: 'Building an MVP',
      slides: [
        {
          title: 'Minimum Viable Product',
          content: 'Simplest version that solves the core problem.',
        },
        {
          title: 'Feature Creep',
          content: 'Focus on one thing and do it well.',
        },
        {
          title: 'No-Code Tools',
          content: 'Use Bubble or Webflow to build without code.',
        },
        { title: 'Iterate', content: 'Launch fast, get feedback, improve.' },
      ],
    },
    {
      id: 6,
      title: 'Growth Hacking',
      slides: [
        {
          title: 'Product-Led Growth',
          content: 'Product itself drives adoption.',
        },
        {
          title: 'Viral Loops',
          content: 'Features that encourage inviting others.',
        },
        { title: 'SEO', content: 'Getting traffic from Google for free.' },
        {
          title: 'Content Marketing',
          content: 'Valuable blogs or videos to attract customers.',
        },
      ],
    },
    {
      id: 7,
      title: 'Financial Modeling',
      slides: [
        { title: 'Burn Rate', content: 'Money spent per month.' },
        {
          title: 'Runway',
          content: 'Months you can survive before running out of cash.',
        },
        { title: 'CAC', content: 'Customer Acquisition Cost.' },
        { title: 'LTV', content: 'Lifetime Value of a customer.' },
      ],
    },
    {
      id: 8,
      title: 'Pitching to Investors',
      slides: [
        {
          title: 'The Problem',
          content: 'Start with a relatable, painful problem.',
        },
        {
          title: 'The Solution',
          content: 'Show your product and how it solves the pain.',
        },
        {
          title: 'The Market',
          content: 'How big is the opportunity? TAM, SAM, SOM.',
        },
        { title: 'The Ask', content: 'How much money do you need?' },
      ],
    },
    {
      id: 9,
      title: 'Team Building',
      slides: [
        { title: 'Co-Founders', content: 'Look for complementary skills.' },
        { title: 'Culture', content: 'Hire for attitude, train for skill.' },
        {
          title: 'Equity',
          content: 'Use vesting schedules to protect the company.',
        },
      ],
    },
    {
      id: 10,
      title: 'Productivity Systems',
      slides: [
        {
          title: 'Deep Work',
          content: 'Focus on one hard task for 2-4 hours.',
        },
        {
          title: 'Time Blocking',
          content: 'Schedule day in blocks for specific tasks.',
        },
        {
          title: 'The 2-Minute Rule',
          content: 'If < 2 mins, do it immediately.',
        },
      ],
    },
    {
      id: 11,
      title: 'Sales Psychology',
      slides: [
        {
          title: 'Reciprocity',
          content: 'Give value first before asking for a sale.',
        },
        {
          title: 'Scarcity',
          content: 'Limited time/availability increases desire.',
        },
        {
          title: 'Social Proof',
          content: 'People follow the crowd. Show testimonials.',
        },
      ],
    },
    {
      id: 12,
      title: 'Design Thinking',
      slides: [
        { title: 'Empathize', content: 'Understand user needs and feelings.' },
        { title: 'Define', content: 'Clearly articulate the problem.' },
        { title: 'Ideate', content: 'Brainstorm many possible solutions.' },
        { title: 'Prototype', content: 'Build rough versions to test ideas.' },
      ],
    },
  ];

  const categories = [...new Set(RESOURCES.map((r) => r.category))];
  const filteredResources = RESOURCES.filter(
    (res) =>
      (res.title || '').toLowerCase().includes(resourceSearch.toLowerCase()) ||
      (res.category || '')
        .toLowerCase()
        .includes(resourceSearch.toLowerCase()) ||
      (res.author || '').toLowerCase().includes(resourceSearch.toLowerCase())
  );

  const handleDownloadResource = (title) => {
    addToast(`Downloading ${title}...`, 'info');
    setTimeout(() => {
      addToast('Download Complete!', 'success');
    }, 1500);
  };

  // REAL AI CALL
  const analyzePitch = async () => {
    if (!pitchText.trim()) return;
    setIsAnalyzing(true);
    setPitchFeedback(null);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
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
      const responseText = result.response.text();
      const aiData = JSON.parse(responseText);

      setPitchFeedback(aiData);
      setIsAnalyzing(false);
      addToast('Pitch analyzed successfully!', 'success');
    } catch (error) {
      console.error('AI Analysis failed:', error);
      setIsAnalyzing(false);
      addToast(
        'Error analyzing pitch. Check your API key or try again.',
        'error'
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative z-10">
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
            onClick={() => setResourceTab('materials')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              resourceTab === 'materials'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Materials
          </button>
          <button
            onClick={() => setResourceTab('analyzer')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              resourceTab === 'analyzer'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Pitch Analyzer
          </button>
          <button
            onClick={() => setResourceTab('lessons')}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              resourceTab === 'lessons'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Mini-Lessons
          </button>
        </div>
      </div>

      {resourceTab === 'materials' && (
        <div className="space-y-10 animate-slide-up">
          <div className="relative w-full mb-8">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search templates, docs, videos..."
              value={resourceSearch}
              onChange={(e) => setResourceSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>
          {categories.map((category) => {
            const categoryResources = filteredResources?.filter(
              (res) => res.category === category
            );
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
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            res.type === 'video'
                              ? 'bg-red-100 text-red-600'
                              : res.type === 'tool'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-green-100 text-green-600'
                          }`}
                        >
                          {res.type === 'video' ? (
                            <PlayCircle size={20} />
                          ) : res.type === 'tool' ? (
                            <Calculator size={20} />
                          ) : (
                            <FileText size={20} />
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">
                          {res.format || res.type}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1 font-display line-clamp-1">
                        {res.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-4 font-body">
                        {res.author}
                      </p>
                      <div className="flex items-center justify-between text-xs font-medium text-indigo-600 mt-auto pt-4 border-t border-slate-100/50">
                        <span>{res.duration || 'Downloadable'}</span>
                        <span className="flex items-center gap-1 group-hover:underline">
                          <Download size={14} /> Get Access
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {resourceTab === 'analyzer' && (
        <div className="max-w-3xl mx-auto animate-slide-up">
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Pitch Deck Analyzer
                </h3>
                <p className="text-slate-500 font-body text-sm">
                  Paste your elevator pitch below for instant AI feedback.
                </p>
              </div>
            </div>
            <textarea
              value={pitchText}
              onChange={(e) => setPitchText(e.target.value)}
              className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none font-body text-slate-900 mb-4"
              placeholder="e.g. We help remote teams collaborate better by providing a virtual office space that integrates with Slack..."
            />

            <button
              onClick={analyzePitch}
              disabled={isAnalyzing || !pitchText.trim()}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Analyzing...
                </>
              ) : (
                'Analyze My Pitch'
              )}
            </button>

            {pitchFeedback && (
              <div className="mt-8 border-t border-slate-200 pt-6 animate-enter">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">
                    Score
                  </span>
                  <span
                    className={`text-2xl font-black font-display ${
                      pitchFeedback.score > 70
                        ? 'text-green-600'
                        : pitchFeedback.score > 40
                        ? 'text-amber-500'
                        : 'text-rose-500'
                    }`}
                  >
                    {pitchFeedback.score}/100
                  </span>
                </div>
                <div className="space-y-3">
                  {pitchFeedback.tips?.length > 0 ? (
                    pitchFeedback.tips.map((tip, i) => (
                      <div
                        key={i}
                        className="flex gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-600"
                      >
                        <AlertTriangle
                          className="text-amber-500 flex-shrink-0"
                          size={16}
                        />
                        {tip}
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-3 bg-green-50 p-3 rounded-lg border border-green-100 text-sm text-green-700">
                      <CheckCircle2 className="flex-shrink-0" size={16} />
                      Great pitch! You covered the problem, solution, and
                      audience clearly.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
