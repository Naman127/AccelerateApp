// src/pages/About.tsx
import React from 'react';
import { Target, Info, Search } from 'lucide-react';

export const About = ({ globalSearch }) => {
  // --- SAFE GLOBAL SEARCH FILTERING ---
  const isSearchActive = !!globalSearch;
  const searchLower = globalSearch?.toLowerCase() || '';

  // 1. Mission Matcher
  const missionText = "Accelerate was founded on a simple belief: entrepreneurship is a skill that can be taught. Too often, great ideas die because founders repeat the same mistakes others have made before them or get lost in the \"how\" rather than the \"what\". Our mission is to educate aspiring founders about the principles of entrepreneurship through a blend of classroom-style theory and real-world experience in launching a startup.";
  const matchMission = !isSearchActive || missionText.toLowerCase().includes(searchLower) || "our mission".includes(searchLower);

  // 2. How It Works Matcher
  const STEPS = [
    { num: '1', title: 'Choose a Path', desc: 'Select your industry and business model from our curated list of viable startup ideas.', color: 'indigo' },
    { num: '2', title: 'Follow the Blueprint', desc: 'Execute step-by-step tasks, from legal registration to your first sale.', color: 'purple' },
    { num: '3', title: 'Launch & Scale', desc: 'Use our tools and community to grow your customer base and secure funding.', color: 'cyan' }
  ];
  const matchedSteps = isSearchActive 
    ? STEPS.filter(s => s.title.toLowerCase().includes(searchLower) || s.desc.toLowerCase().includes(searchLower)) 
    : STEPS;
  const matchHowItWorksSection = !isSearchActive || "how it works".includes(searchLower) || matchedSteps.length > 0;

  // 3. FAQ Matcher
  const FAQS = [
    { q: 'Is Accelerate free to use?', a: 'Yes! All of our blueprints and other learning features are free to use.' },
    { q: 'Does Accelerate guarantee success?', a: 'No. While guaranteeing success is impossible, we mitigate the risks involved with launching a startup by equipping founders with the knowledge, skills, and path to succeed.' },
    { q: 'How are the blueprints created?', a: 'We work with industry experts and successful founders to reverse-engineer their path to success.' },
    { q: 'Do you help entrepreneurs get funding?', a: 'We curate a list of active grants, loans, and VC firms relevant to your specific industry.' },
  ];
  const matchedFaqs = isSearchActive 
    ? FAQS.filter(f => f.q.toLowerCase().includes(searchLower) || f.a.toLowerCase().includes(searchLower)) 
    : FAQS;
  const matchFaqSection = !isSearchActive || "frequently asked questions".includes(searchLower) || "faq".includes(searchLower) || matchedFaqs.length > 0;

  // Global Empty State Check
  const hasAnyMatch = matchMission || matchHowItWorksSection || matchFaqSection;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in relative z-10 pb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 font-display mb-4">About Accelerate</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-body">
          Building a business shouldn't be a mystery. We provide the map; you drive the rocket.
        </p>
      </div>

      {!hasAnyMatch ? (
        <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 animate-slide-up">
          <Search size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 font-display">No results found</h3>
          <p className="text-slate-500 font-body mt-2">We couldn't find anything matching "{globalSearch}" on the About page.</p>
        </div>
      ) : (
        <>
          {matchMission && (
            <div className={`bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-sm mb-12 transition-all animate-slide-up ${isSearchActive ? 'search-match scale-[1.02]' : ''}`}>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display flex items-center gap-2">
                <Target className="text-red-500" /> Our Mission
              </h3>
              <p className="text-slate-700 leading-relaxed font-body">
                {missionText}
              </p>
            </div>
          )}

          {matchHowItWorksSection && (
            <div className="mb-12 animate-slide-up">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display text-center">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchedSteps.map((step, i) => (
                  <div key={i} className={`bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-6 text-center shadow-sm transition-all ${isSearchActive ? 'search-match scale-[1.05] z-10' : ''}`}>
                    <div className={`w-12 h-12 bg-${step.color}-100 text-${step.color}-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl font-display`}>
                      {step.num}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2 font-display">{step.title}</h4>
                    <p className="text-sm text-slate-600 font-body">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchFaqSection && (
            <div className={`bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-sm animate-slide-up transition-all`}>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display flex items-center gap-2">
                <Info className="text-blue-500" /> Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {matchedFaqs.map((faq, i) => (
                  <div key={i} className={`border-b border-slate-200 pb-4 last:border-0 last:pb-0 transition-all rounded-lg ${isSearchActive ? 'search-match p-4 bg-white/50 scale-[1.01] border-transparent' : ''}`}>
                    <h4 className="font-bold text-slate-900 mb-1 font-body">{faq.q}</h4>
                    <p className="text-sm text-slate-600 font-body">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};