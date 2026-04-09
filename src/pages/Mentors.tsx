// src/pages/Mentors.tsx
import React from 'react';
import { ChevronDown, ChevronUp, Calendar, Star, Briefcase } from 'lucide-react';

export const Mentors = ({ 
  mentors, 
  expandedMentorId, 
  setExpandedMentorId, 
  openBookingModal,
  accessibility 
}) => {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative z-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">
            Expert Mentors
          </h2>
          <p className="text-slate-500 font-body">
            Book 1-on-1 advice with proven industry leaders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => {
          const isExpanded = expandedMentorId === mentor.id;
          
          return (
            <div key={mentor.id} className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col text-center group">
              
              {/* FIXED: Removed getAvatar so it uses the original images again! */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name} 
                  className="w-full h-full rounded-full object-cover shadow-sm border-2 border-white group-hover:scale-105 transition-transform" 
                />
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm"></div>
              </div>
              
              {/* Info */}
              <h3 className="text-lg font-black text-slate-900 font-display uppercase tracking-wider">{mentor.name}</h3>
              <p className="text-sm font-bold text-indigo-600 font-body mb-1">{mentor.role}</p>
              <p className="text-xs text-slate-500 font-medium font-body mb-4">{mentor.expertise}</p>
              
              {/* Expanded Details */}
              {isExpanded && (
                 <div className="text-left bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 animate-in slide-in-from-top-2 text-sm">
                   <p className="text-slate-600 mb-3 font-body leading-relaxed">{mentor.bio || 'Experienced founder and investor dedicated to helping the next generation of startups scale.'}</p>
                   <div className="space-y-2">
                     <div className="flex items-center gap-2 text-slate-700 font-medium font-body"><Briefcase size={14} className="text-indigo-500"/> {mentor.experience || '10+ Years Experience'}</div>
                     <div className="flex items-center gap-2 text-slate-700 font-medium font-body"><Star size={14} className="text-amber-500"/> {mentor.rating || '4.9/5 Average Rating'}</div>
                   </div>
                 </div>
              )}
              
              <button 
                onClick={() => setExpandedMentorId(isExpanded ? null : mentor.id)}
                className="mx-auto flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors mb-4"
              >
                {isExpanded ? 'Hide Details' : 'View Expertise'} 
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {/* High Contrast / Transparent Buttons */}
              <div className="mt-auto pt-2">
                {mentor.available !== false ? (
                  <button 
                    onClick={() => openBookingModal(mentor)}
                    className={
                      accessibility?.highContrast 
                        ? "w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                        : "w-full py-3 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-xl font-bold text-sm transition-colors border border-slate-200 hover:border-indigo-200 flex items-center justify-center gap-2"
                    }
                  >
                    <Calendar size={16} /> Book Session
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full py-3 bg-slate-50 text-slate-400 rounded-xl font-bold text-sm cursor-not-allowed border border-slate-200 shadow-inner"
                  >
                    Fully Booked
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};