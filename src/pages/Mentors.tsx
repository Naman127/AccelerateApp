import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const Mentors = ({ mentors, expandedMentorId, setExpandedMentorId, openBookingModal }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500 relative z-10">
    {mentors?.map((mentor) => {
      const isExpanded = expandedMentorId === mentor.id;
      return (
        <div key={mentor.id} className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="w-24 h-24 rounded-full mb-4 p-1 bg-white shadow-md relative z-10">
            <img src={mentor.imageUrl} alt={mentor.name} className="w-full h-full rounded-full object-cover" />
            {mentor.available && <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>}
          </div>
          <h3 className="font-bold text-slate-900 text-lg font-display relative z-10">{mentor.name}</h3>
          <p className="text-indigo-600 text-sm font-medium mb-1 font-body relative z-10">{mentor.role}</p>
          <p className="text-slate-500 text-sm mb-4 font-body relative z-10">Expert in {mentor.expertise}</p>
          <button onClick={() => setExpandedMentorId(isExpanded ? null : mentor.id)} className="text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1 text-xs font-body transition-colors relative z-10">
            {isExpanded ? 'Hide Details' : 'View Expertise'} {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {isExpanded && <div className="mb-4 bg-slate-50 p-3 rounded-lg text-xs text-slate-600 font-body animate-slide-up text-left w-full border border-slate-100 relative z-10">{mentor.description}</div>}
          <button onClick={() => openBookingModal(mentor)} disabled={!mentor.available} className={`w-full py-2 rounded-lg font-medium text-sm transition-colors font-body mt-auto relative z-10 ${mentor.available ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
            {mentor.available ? 'Book Session' : 'Fully Booked'}
          </button>
        </div>
      );
    })}
  </div>
);