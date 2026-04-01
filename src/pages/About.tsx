import React from 'react';
import { Target, Info } from 'lucide-react';

export const About = () => (
  <div className="max-w-4xl mx-auto animate-fade-in relative z-10">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-slate-900 font-display mb-4">About Accelerate</h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto font-body">
        Building a business shouldn't be a mystery. We provide the map; you drive the rocket.
      </p>
    </div>

    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-sm mb-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display flex items-center gap-2">
        <Target className="text-red-500" /> Our Mission
      </h3>
      <p className="text-slate-700 leading-relaxed font-body">
        Accelerate was founded on a simple belief: entrepreneurship is a skill that can be taught. 
        Too often, great ideas die because founders repeat the same mistakes others have made before them or get lost in the "how" rather than the "what". 
        Our mission is to educate aspiring founders about the principles of entrepreneurship through a blend of classroom-style theory and real-world experience in launching a startup.
      </p>
    </div>

    <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display text-center">How It Works</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl font-display">1</div>
        <h4 className="font-bold text-slate-900 mb-2 font-display">Choose a Path</h4>
        <p className="text-sm text-slate-600 font-body">Select your industry and business model from our curated list of viable startup ideas.</p>
      </div>
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl font-display">2</div>
        <h4 className="font-bold text-slate-900 mb-2 font-display">Follow the Blueprint</h4>
        <p className="text-sm text-slate-600 font-body">Execute step-by-step tasks, from legal registration to your first sale.</p>
      </div>
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl font-display">3</div>
        <h4 className="font-bold text-slate-900 mb-2 font-display">Launch & Scale</h4>
        <p className="text-sm text-slate-600 font-body">Use our tools and community to grow your customer base and secure funding.</p>
      </div>
    </div>

    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-sm">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display flex items-center gap-2">
        <Info className="text-blue-500" /> Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {[
          { q: 'Is Accelerate free to use?', a: 'Yes! All of our blueprints and other learning features are free to use.' },
          { q: 'Does Accelerate guarantee success?', a: 'No. While guaranteeing success is impossible, we mitigate the risks involved with launching a startup by equipping founders with the knowledge, skills, and path to succeed.' },
          { q: 'How are the blueprints created?', a: 'We work with industry experts and successful founders to reverse-engineer their path to success.' },
          { q: 'Do you help entrepreneurs get funding?', a: 'We curate a list of active grants, loans, and VC firms relevant to your specific industry.' },
        ].map((faq, i) => (
          <div key={i} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
            <h4 className="font-bold text-slate-900 mb-1 font-body">{faq.q}</h4>
            <p className="text-sm text-slate-600 font-body">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);