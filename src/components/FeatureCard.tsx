import React from 'react';

export const FeatureCard = ({ icon: Icon, title, desc, onClick, color }) => (
  <div
    onClick={onClick}
    className="group relative p-8 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl text-left shadow-xl shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 cursor-pointer transition-all duration-300"
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${color} transition-opacity duration-500 rounded-2xl`}></div>
    <div className="relative z-30 transform transition-transform duration-500">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20 text-white transform group-hover:scale-110 transition-all duration-500`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display tracking-tight">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed font-body opacity-90">{desc}</p>
    </div>
  </div>
);