// src/pages/LandingPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Map, Sparkles, BrainCircuit, CheckCircle2, Rocket, 
  Circle, Check, LayoutDashboard, Bookmark, Users, BookOpen, Bot, 
  Loader2, Zap, MessageCircle, Calendar as CalendarIcon, Target, X, 
  Trophy, Activity, Smartphone, ShieldCheck, Heart, Timer, Globe, TrendingUp
} from 'lucide-react';

// --- CUSTOM HOOKS ---

const useOnScreen = (options = { threshold: 0.05 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);
  return [ref, isVisible];
};

// --- DATA FOR EXPANDED VIEWS ---
const EXPANDED_DATA = {
  blueprints: {
    title: '30+ Industry Blueprints',
    icon: Map,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
    description: "Stop guessing what to do next. We've mapped out the exact, phase-by-phase timeline to launch in over 30 different industries.",
    content: (
      <div className="mt-6 space-y-3">
        <div className="p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold">1</div>
          <div><h4 className="font-bold text-slate-800">Concept & Validation</h4><p className="text-sm text-slate-500">2 Weeks • 5 Tasks</p></div>
        </div>
        <div className="p-4 border border-slate-100 bg-white shadow-sm rounded-xl flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">2</div>
          <div><h4 className="font-bold text-slate-800">Setup & Legal</h4><p className="text-sm text-slate-500">1 Week • 3 Tasks</p></div>
        </div>
      </div>
    ),
  },
  ai: {
    title: 'AI Architect',
    icon: Sparkles,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
    description: 'Powered by Google Gemini. Describe your unique startup idea, and watch it generate a custom, perfectly structured launch blueprint in 3 seconds.',
    content: (
      <div className="mt-6 bg-slate-900 rounded-2xl p-6 border border-slate-800 text-left relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6 bg-white/10 p-3 rounded-xl">
          <Bot className="text-purple-300" size={18} />
          <p className="text-sm text-slate-200 italic">"I want to start a drone photography business."</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3"><CheckCircle2 className="text-green-400" size={16} /><div className="h-2 w-3/4 bg-slate-700 rounded-full"></div></div>
          <div className="flex items-center gap-3"><Loader2 className="text-purple-400 animate-spin" size={16} /><div className="h-2 w-2/3 bg-slate-600 rounded-full animate-pulse"></div></div>
        </div>
      </div>
    ),
  },
  dna: {
    title: 'Founder DNA',
    icon: BrainCircuit,
    color: 'text-cyan-600',
    bg: 'bg-cyan-100',
    description: 'Input your budget, time, and skills. Our algorithm matches you with the exact business model you are statistically most likely to succeed in.',
    content: (
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center"><div className="text-2xl font-black text-cyan-600 mb-1">$500</div><div className="text-xs uppercase font-bold text-slate-400">Budget</div></div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center"><div className="text-2xl font-black text-cyan-600 mb-1">Tech</div><div className="text-xs uppercase font-bold text-slate-400">Superpower</div></div>
      </div>
    ),
  },
  mentors: {
    title: 'Expert Mentors',
    icon: Users,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
    description: 'Book a 1-on-1 video session with verified student founders who have successfully launched businesses and competed at a national level.',
    content: (
      <div className="mt-6 p-4 border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-10 h-10 rounded-full object-cover shadow-sm" alt="Marcus" />
          <div><p className="font-bold text-sm text-slate-900">Marcus Chen</p><p className="text-xs text-slate-500">SaaS • $10k MRR</p></div>
        </div>
        <button className="px-4 py-2 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg hover:bg-amber-200">Book</button>
      </div>
    ),
  },
  calendar: {
    title: 'Live Calendar',
    icon: CalendarIcon,
    color: 'text-rose-600',
    bg: 'bg-rose-100',
    description: 'Keep your mission on track. A unified view of your blueprint deadlines, mentor sessions, and critical submission dates.',
    content: (<div className="mt-6 h-32 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center"><CalendarIcon size={48} className="text-rose-200" /></div>),
  },
  resources: {
    title: 'Resource Library',
    icon: BookOpen,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
    description: 'Stop reinventing the wheel. Access our vault of legal templates, financial models, pitch deck layouts, and marketing plans.',
    content: (<div className="mt-6 h-32 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center"><BookOpen size={48} className="text-emerald-200" /></div>),
  },
  analyzer: {
    title: 'Pitch Analyzer',
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
    description: 'Paste your elevator pitch and let our AI analyze it for clarity, market hook, and overall strength. Get a score out of 100 instantly.',
    content: (<div className="mt-6 h-32 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center"><Zap size={48} className="text-amber-200" /></div>),
  },
  community: {
    title: 'Founder Community',
    icon: MessageCircle,
    color: 'text-slate-600',
    bg: 'bg-slate-100',
    description: 'Entrepreneurship is lonely. Join a network of ambitious student founders to share wins, ask for feedback, and find co-founders.',
    content: (<div className="mt-6 h-32 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center"><MessageCircle size={48} className="text-slate-200" /></div>),
  },
  lessons: {
    title: 'Mini-Lessons',
    icon: Target,
    color: 'text-fuchsia-600',
    bg: 'bg-fuchsia-100',
    description: "Learn essential startup theory in 5 minutes. Flash-card style lessons on everything from 'The Mom Test' to 'LLC Formation'.",
    content: (<div className="mt-6 h-32 bg-fuchsia-50 border border-fuchsia-100 rounded-xl flex items-center justify-center"><Target size={48} className="text-fuchsia-200" /></div>),
  },
  scale: {
    title: 'Built for Scale',
    icon: Rocket,
    color: 'text-rose-600',
    bg: 'bg-rose-100',
    description: 'Whether you are a solo hacker in your bedroom or managing 50 different student teams, Accelerate handles it seamlessly.',
    content: (<div className="mt-6 h-32 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center"><Rocket size={48} className="text-rose-200" /></div>),
  },
  tracking: {
    title: 'Task Tracking',
    icon: CheckCircle2,
    color: 'text-green-600',
    bg: 'bg-green-100',
    description: 'Never lose momentum. Our granular checklist system ensures you always know the micro-steps required to finish the macro-phase.',
    content: (<div className="mt-6 h-32 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center"><CheckCircle2 size={48} className="text-green-200" /></div>),
  },
  gamified: {
    title: 'Quantified Progression',
    icon: Trophy,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    description: 'An intuitive progress bar that always keeps you up-to-date on the status of your venture.',
    content: (
      <div className="mt-6 flex gap-4">
        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-yellow-400"><Trophy className="text-yellow-500" /></div>
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center"><Trophy className="text-slate-300" /></div>
      </div>
    ),
  },
  analytics: {
    title: 'Mission Telemetry',
    icon: Activity,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    description: "Track your startup's velocity. Visual progress bars and completion metrics keep you fully aware of your momentum.",
    content: (
      <div className="mt-6 space-y-3">
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[65%]"></div></div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[40%]"></div></div>
      </div>
    ),
  },
  mobile: {
    title: 'Work Anywhere',
    icon: Smartphone,
    color: 'text-slate-600',
    bg: 'bg-slate-200',
    description: 'Fully responsive architecture. Review your business blueprints on your laptop at home, or check off tasks on your phone between classes.',
    content: (<div className="mt-6 h-32 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center"><Smartphone size={48} className="text-slate-300" /></div>),
  },
  security: {
    title: 'Secure Architecture',
    icon: ShieldCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100',
    description: 'Your intellectual property is yours. Built with modern, secure frameworks so your billion-dollar ideas remain strictly confidential.',
    content: (<div className="mt-6 h-32 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center"><ShieldCheck size={48} className="text-emerald-200" /></div>),
  },
  intelligence: { 
    title: 'Market Intelligence',
    icon: Globe,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    description: 'Access real-time industry trends, competitor analysis, and market gap detection tools to validate your idea before writing a single line of code.',
    content: (<div className="mt-6 h-32 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center"><Globe size={48} className="text-blue-200" /></div>),
  },
  uptime: {
    title: 'Zero Latency',
    icon: Timer,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
    description: 'Built for speed. Our modern React stack ensures instantaneous page loads and seamless transitions, no matter how large the project.',
    content: (<div className="mt-6 h-32 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center"><Timer size={48} className="text-indigo-200" /></div>),
  },
};

// --- COMPONENTS ---

const PuzzlePiece = ({ id, className, delay, tx, ty, rot, isVisible, onClick, children, icon: Icon, glassColor = 'from-white/40 to-white/10' }) => {
  const style = isVisible
    ? { transform: 'translate3d(0px, 0px, 0px) rotate(0deg) scale(1)', opacity: 1, transitionDelay: delay, willChange: 'transform, opacity' }
    : { transform: `translate3d(${tx}px, ${ty}px, 0px) rotate(${rot}deg) scale(0.8)`, opacity: 0, transitionDelay: '0s', willChange: 'transform, opacity' };

  return (
    <div
      onClick={() => onClick(id)}
      style={style}
      className={`relative overflow-hidden bg-gradient-to-br ${glassColor} border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 cursor-pointer transition duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group ${className}`}
    >
      {Icon && <Icon className="absolute -bottom-8 -right-8 text-slate-900 opacity-[0.03] group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none will-change-transform" size={180} />}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="relative z-10 h-full flex flex-col p-6 pointer-events-none">{children}</div>
    </div>
  );
};

const TYPING_WORDS = [
  'Art & Design', 'Content', 'Food & Beverage', 
  'Services', 'E-Commerce', 'Technology', 'Ambition'
];

const IsolatedTypewriter = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentWord = TYPING_WORDS[currentWordIndex];
    if (!isDeleting && currentText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
    } else {
      const typeSpeed = isDeleting ? 30 : 80;
      timeout = setTimeout(() => {
        setCurrentText(currentWord.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }, typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 inline-block text-center whitespace-nowrap text-4xl sm:text-6xl lg:text-8xl font-black font-display tracking-tight">
      {currentText}
    </span>
  );
};

export const LandingPage = ({ onEnter }) => {
  const [heroRef, isHeroVisible] = useOnScreen({ threshold: 0.1 });
  const [gridRef, isGridVisible] = useOnScreen({ threshold: 0.05 });
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (expandedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [expandedId]);

  const activeData = expandedId ? EXPANDED_DATA[expandedId] : null;

  return (
    <div className="relative w-full h-full overflow-y-auto custom-scrollbar overflow-x-hidden bg-[#FDFCF6]">
      <style>{`
        .ai-line { height: 8px; background: #cbd5e1; border-radius: 4px; animation: loadSkeleton 2s infinite ease-in-out alternate; }
        .ai-line-1 { width: 85%; } .ai-line-2 { width: 65%; animation-delay: 0.2s; } 
        @keyframes loadSkeleton { 0% { opacity: 0.3; } 100% { opacity: 1; } }
        
        /* Artifact Animations */
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(3deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(12px) rotate(-4deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-10px) scale(1.05); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(5deg); } }

        /* --- NEW AURORA BLOB ANIMATIONS --- */
        @keyframes aurora-radiate-1 {
          0% { transform: translate(-5%, -5%) scale(1); opacity: 0.4; }
          50% { transform: translate(2%, 2%) scale(1.4); opacity: 0.7; }
          100% { transform: translate(-5%, -5%) scale(1); opacity: 0.4; }
        }
        @keyframes aurora-radiate-2 {
          0% { transform: translate(5%, -5%) scale(1.2); opacity: 0.3; }
          50% { transform: translate(-2%, 5%) scale(0.9); opacity: 0.6; }
          100% { transform: translate(5%, -5%) scale(1.2); opacity: 0.3; }
        }
        @keyframes aurora-radiate-3 {
          0% { transform: translate(0%, 5%) scale(0.9); opacity: 0.3; }
          50% { transform: translate(0%, -5%) scale(1.5); opacity: 0.7; }
          100% { transform: translate(0%, 5%) scale(0.9); opacity: 0.3; }
        }
      `}</style>

      {/* --- FULL-BLEED RADIATING BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Giant Indigo Core (Top Left Radiance) */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[120vw] h-[120vh] bg-indigo-600/20 rounded-full blur-[150px] mix-blend-multiply"
          style={{ animation: 'aurora-radiate-1 15s ease-in-out infinite' }}
        ></div>
        
        {/* Soft Amber Glow (Top Right Radiance) */}
        <div 
          className="absolute top-[5%] -right-[20%] w-[120vw] h-[120vh] bg-amber-300/25 rounded-full blur-[150px] mix-blend-multiply"
          style={{ animation: 'aurora-radiate-2 18s ease-in-out infinite' }}
        ></div>

        {/* Deep Blue/Indigo Anchor (Bottom Radiance to support the puzzle grid) */}
        <div 
          className="absolute -bottom-[30%] left-[5%] w-[150vw] h-[120vh] bg-blue-600/15 rounded-full blur-[150px] mix-blend-multiply"
          style={{ animation: 'aurora-radiate-3 22s ease-in-out infinite' }}
        ></div>
      </div>

      {/* --- REDESIGNED CONCEPT 3 HERO SECTION --- */}
      <div
        ref={heroRef}
        className={`max-w-[100rem] mx-auto px-6 sm:px-16 pt-24 pb-20 min-h-[90vh] flex flex-col items-center justify-center relative transition-all duration-1000 z-10 ${
          isHeroVisible ? 'opacity-100 blur-none' : 'opacity-0 blur-lg'
        } ${expandedId ? 'opacity-20 blur-xl pointer-events-none' : ''}`}
      >

        {/* MAIN TEXT ANCHOR */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="flex flex-col items-center justify-center mb-8 w-full">
            <span className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black text-slate-900 font-display leading-tight tracking-tight drop-shadow-sm mb-4 sm:mb-6">
              Accelerate your
            </span>
            
            {/* The Typewriter "Pill" Cage */}
            <div className="h-20 sm:h-28 lg:h-36 w-[450px] sm:w-[730px] lg:w-[1010px] bg-white/60 backdrop-blur-xl border-2 border-white/80 rounded-full shadow-[0_20px_50px_rgba(79,70,229,0.15)] flex items-center justify-center relative overflow-hidden transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10"></div>
              <div className="relative z-10 flex items-center justify-center w-full">
                 <IsolatedTypewriter />
                 <span className="typewriter-cursor h-10 sm:h-16 lg:h-20 ml-2 sm:ml-3 inline-block align-middle w-1 sm:w-2 bg-slate-900 animate-pulse rounded-full"></span>
              </div>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-slate-600 font-body max-w-2xl mb-12 leading-relaxed bg-white/40 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-white/50 shadow-sm">
            Stop analyzing. Start building. Accelerate provides structured,
            industry-specific blueprints that guide student founders from
            concept to their first customer.
          </p>

          <button
            onClick={onEnter}
            className="bg-slate-900 hover:bg-indigo-600 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg shadow-2xl shadow-slate-900/20 hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 font-body group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            Enter Workspace{' '}
            <ArrowRight className="group-hover:translate-x-1.5 transition-transform relative z-10" />
          </button>
        </div>
      </div>

      {/* --- FOCUS-SHIFT MODAL OVERLAY --- */}
      {expandedId && activeData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-md cursor-pointer"
            onClick={() => setExpandedId(null)}
          />
          <div className="relative bg-white/95 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl w-full max-w-2xl animate-in zoom-in-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <button
              onClick={() => setExpandedId(null)}
              className="absolute top-6 right-6 p-2 bg-slate-100 text-slate-500 hover:text-slate-900 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${activeData.bg} ${activeData.color}`}
            >
              {React.createElement(activeData.icon, { size: 32 })}
            </div>
            <h2 className="text-4xl font-black text-slate-900 font-display tracking-tight mb-4">
              {activeData.title}
            </h2>
            <p className="text-lg text-slate-600 font-body leading-relaxed">
              {activeData.description}
            </p>
            {activeData.content}
            <button
              onClick={onEnter}
              className="w-full mt-8 py-4 bg-slate-900 text-white rounded-xl font-bold font-body hover:bg-indigo-600 transition-colors shadow-lg"
            >
              Try it in Workspace
            </button>
          </div>
        </div>
      )}

      {/* --- MASSIVE 17-PIECE FLYING PUZZLE GRID --- */}
      <div
        className={`max-w-[90rem] mx-auto px-6 sm:px-16 lg:px-24 pb-32 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10 pl-4 md:pl-16 ${
          expandedId
            ? 'scale-[0.97] opacity-40 blur-sm pointer-events-none'
            : 'scale-100 opacity-100'
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-16 font-display">
          Everything you need to launch.
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-5 relative"
        >
          {/* ROW 1: Blueprints, AI (tall), DNA */}
          <PuzzlePiece
            id="blueprints"
            icon={Map}
            onClick={setExpandedId}
            className="sm:col-span-2"
            glassColor="from-indigo-100/30 to-white/10"
            delay="0s"
            tx={-150}
            ty={-150}
            rot={-10}
            isVisible={isGridVisible}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Map size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  30+ Blueprints
                </h3>
                <p className="text-slate-600 font-body text-sm mt-1">
                  Phase-by-phase roadmaps for any industry.
                </p>
              </div>
            </div>
          </PuzzlePiece>

          <PuzzlePiece
            id="ai"
            icon={Sparkles}
            onClick={setExpandedId}
            className="row-span-2"
            glassColor="from-purple-100/40 to-white/10"
            delay="0.2s"
            tx={0}
            ty={-200}
            rot={15}
            isVisible={isGridVisible}
          >
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold font-display mb-2 text-slate-900">
              AI Architect
            </h3>
            <p className="text-slate-500 font-body text-xs mb-4">
              Gemini-powered custom plans.
            </p>
            <div className="mt-auto bg-white/40 border border-white/60 p-3 rounded-xl flex items-center gap-2 shadow-sm">
              <Loader2
                className="animate-spin text-purple-500 flex-shrink-0"
                size={14}
              />
              <div className="flex-1 space-y-1.5">
                <div className="ai-line ai-line-1 bg-slate-300"></div>
                <div className="ai-line ai-line-2 bg-slate-200"></div>
              </div>
            </div>
          </PuzzlePiece>

          <PuzzlePiece
            id="dna"
            icon={BrainCircuit}
            onClick={setExpandedId}
            className=""
            glassColor="from-cyan-100/30 to-white/10"
            delay="0.4s"
            tx={150}
            ty={-100}
            rot={20}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-xl flex items-center justify-center mb-3">
              <BrainCircuit size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Founder DNA
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Find your perfect match.
            </p>
          </PuzzlePiece>

          {/* ROW 2: Mentors, Calendar, Resources (AI spans here) */}
          <PuzzlePiece
            id="mentors"
            icon={Users}
            onClick={setExpandedId}
            className=""
            glassColor="from-amber-100/30 to-white/10"
            delay="0.1s"
            tx={-250}
            ty={0}
            rot={-15}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-3">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Expert Mentors
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Book 1-on-1 advice.
            </p>
          </PuzzlePiece>

          <PuzzlePiece
            id="calendar"
            icon={CalendarIcon}
            onClick={setExpandedId}
            className=""
            glassColor="from-rose-100/30 to-white/10"
            delay="0.3s"
            tx={-100}
            ty={50}
            rot={5}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-3">
              <CalendarIcon size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Live Calendar
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Track deadlines.
            </p>
          </PuzzlePiece>

          <PuzzlePiece
            id="resources"
            icon={BookOpen}
            onClick={setExpandedId}
            className=""
            glassColor="from-emerald-100/30 to-white/10"
            delay="0.5s"
            tx={250}
            ty={50}
            rot={-5}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
              <BookOpen size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Resources
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Docs, templates, tools.
            </p>
          </PuzzlePiece>

          {/* ROW 3: Analyzer (2x1), Community (1x2), Lessons */}
          <PuzzlePiece
            id="analyzer"
            icon={Zap}
            onClick={setExpandedId}
            className="sm:col-span-2"
            glassColor="from-yellow-100/30 to-white/10"
            delay="0.2s"
            tx={-200}
            ty={150}
            rot={10}
            isVisible={isGridVisible}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Pitch Analyzer
                </h3>
                <p className="text-slate-600 font-body text-sm mt-1">
                  Paste your elevator pitch and get instant AI feedback on how
                  to improve it.
                </p>
              </div>
            </div>
          </PuzzlePiece>

          <PuzzlePiece
            id="community"
            icon={MessageCircle}
            onClick={setExpandedId}
            className="row-span-2"
            glassColor="from-slate-300/30 to-white/10"
            delay="0.4s"
            tx={50}
            ty={200}
            rot={-10}
            isVisible={isGridVisible}
          >
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle size={24} />
            </div>
            <h3 className="text-xl font-bold font-display mb-2 text-slate-900">
              Community
            </h3>
            <p className="text-slate-500 font-body text-xs mb-4">
              Network with other founders.
            </p>
            <div className="mt-auto space-y-2">
              <div className="bg-white/40 border border-white/50 p-2 rounded-lg text-[10px] text-slate-600 flex items-center gap-2 shadow-sm">
                <div className="w-4 h-4 rounded-full bg-indigo-400"></div> "Just
                launched my MVP!"
              </div>
              <div className="bg-white/40 border border-white/50 p-2 rounded-lg text-[10px] text-slate-600 flex items-center gap-2 shadow-sm">
                <div className="w-4 h-4 rounded-full bg-cyan-400"></div>{' '}
                "Looking for a tech co-founder."
              </div>
            </div>
          </PuzzlePiece>

          <PuzzlePiece
            id="lessons"
            icon={Target}
            onClick={setExpandedId}
            className=""
            glassColor="from-fuchsia-100/30 to-white/10"
            delay="0.6s"
            tx={200}
            ty={150}
            rot={15}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center mb-3">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Mini-Lessons
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Learn startup theory.
            </p>
          </PuzzlePiece>

          {/* ROW 4: Scale (2x1), Tracking (Community spans here) */}
          <PuzzlePiece
            id="scale"
            icon={Rocket}
            onClick={setExpandedId}
            className="sm:col-span-2"
            glassColor="from-rose-100/30 to-white/10"
            delay="0.3s"
            tx={-150}
            ty={250}
            rot={-15}
            isVisible={isGridVisible}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Rocket size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Built for Scale
                </h3>
                <p className="text-slate-600 font-body text-sm mt-1">
                  Designed for solo students and massive chapters alike.
                </p>
              </div>
            </div>
          </PuzzlePiece>

          <PuzzlePiece
            id="tracking"
            icon={CheckCircle2}
            onClick={setExpandedId}
            className=""
            glassColor="from-green-100/30 to-white/10"
            delay="0.5s"
            tx={150}
            ty={250}
            rot={20}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Task Tracking
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Never lose momentum.
            </p>
          </PuzzlePiece>

          {/* ROW 5: NEW PIECES - Gamified(2x1), Analytics(1), Mobile(1) */}
          <PuzzlePiece
            id="gamified"
            icon={Trophy}
            onClick={setExpandedId}
            className="sm:col-span-2"
            glassColor="from-yellow-100/30 to-white/10"
            delay="0.4s"
            tx={-200}
            ty={300}
            rot={-10}
            isVisible={isGridVisible}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Trophy size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Quantified Progression
                </h3>
                <p className="text-slate-600 font-body text-sm mt-1">
                  Earn achievement badges for launching.
                </p>
              </div>
            </div>
          </PuzzlePiece>

          <PuzzlePiece
            id="analytics"
            icon={Activity}
            onClick={setExpandedId}
            className=""
            glassColor="from-blue-100/30 to-white/10"
            delay="0.6s"
            tx={50}
            ty={350}
            rot={15}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3">
              <Activity size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Telemetry
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Live progress data.
            </p>
          </PuzzlePiece>

          <PuzzlePiece
            id="mobile"
            icon={Smartphone}
            onClick={setExpandedId}
            className=""
            glassColor="from-slate-200/40 to-white/10"
            delay="0.5s"
            tx={250}
            ty={300}
            rot={-20}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center mb-3">
              <Smartphone size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Work Anywhere
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Fully responsive UI.
            </p>
          </PuzzlePiece>

          {/* ROW 6: NEW PIECES - Security(1), Match(2x1), Uptime(1) */}
          <PuzzlePiece
            id="security"
            icon={ShieldCheck}
            onClick={setExpandedId}
            className=""
            glassColor="from-emerald-100/30 to-white/10"
            delay="0.7s"
            tx={-250}
            ty={400}
            rot={20}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Security First
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Your IP stays private.
            </p>
          </PuzzlePiece>

          <PuzzlePiece
            id="intelligence"
            icon={Globe}
            onClick={setExpandedId}
            className="sm:col-span-2"
            glassColor="from-blue-100/30 to-white/10"
            delay="0.6s"
            tx={100}
            ty={450}
            rot={-15}
            isVisible={isGridVisible}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Market Intelligence
                </h3>
                <p className="text-slate-600 font-body text-sm mt-1">
                  Validate your idea with real-time industry trends and competitor data.
                </p>
              </div>
            </div>
          </PuzzlePiece>

          <PuzzlePiece
            id="uptime"
            icon={Timer}
            onClick={setExpandedId}
            className=""
            glassColor="from-indigo-100/30 to-white/10"
            delay="0.8s"
            tx={300}
            ty={400}
            rot={10}
            isVisible={isGridVisible}
          >
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
              <Timer size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Zero Latency
            </h3>
            <p className="text-slate-500 font-body text-xs mt-1">
              Instant page loads.
            </p>
          </PuzzlePiece>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-10 text-slate-500 font-body text-sm border-t border-slate-200/50 bg-white/30 backdrop-blur-md relative z-10">
        <p className="font-bold">Built by Naman M, Shifa B, Vinitha N</p>
      </footer>
    </div>
  );
};