// src/pages/Calendar.tsx
import React from 'react';
import { ChevronDown, Plus, Trash2, X } from 'lucide-react';

export const Calendar = ({ 
  currentDate, setCurrentDate, events, isEventFormOpen, setIsEventFormOpen, 
  editingEventId, newEventForm, setNewEventForm, handleAddEvent, 
  handleDeleteEvent, startEditing, saveEdit, getDaysInMonth, handlePrevMonth, 
  handleNextMonth, formatLocalDate, getEventColor, globalSearch 
}) => {
  // SAFEGUARD: Ensure currentDate is a valid Date object before pulling methods
  const safeDate = (currentDate instanceof Date && !isNaN(currentDate.getTime())) ? currentDate : new Date();
  
  const days = getDaysInMonth(safeDate.getFullYear(), safeDate.getMonth());
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const firstDayIndex = new Date(safeDate.getFullYear(), safeDate.getMonth(), 1).getDay();

  const todayStr = formatLocalDate(new Date());

  // SAFEGUARD: Ensure events is always an array to prevent .filter() crashes
  const safeEvents = Array.isArray(events) ? events : [];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative z-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-sm">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-display tracking-tight">
            {monthNames[safeDate.getMonth()]} {safeDate.getFullYear()}
          </h2>
          <p className="text-slate-500 font-body">Manage your deadlines and mentor sessions.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 shadow-sm">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 text-slate-600 rounded-l-lg border-r border-slate-100 active:scale-95 transition-transform"><ChevronDown className="rotate-90" size={20} /></button>
            <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 font-body active:scale-95 transition-transform">Today</button>
            <button onClick={handleNextMonth} className="p-2 hover:bg-slate-50 text-slate-600 rounded-r-lg border-l border-slate-100 active:scale-95 transition-transform"><ChevronDown className="-rotate-90" size={20} /></button>
          </div>
          <button onClick={() => { setNewEventForm({ title: '', time: '', date: todayStr, type: 'Meeting' }); setIsEventFormOpen(true); }} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-indigo-200 transition-all duration-200 font-body">
            <Plus size={18} /> Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-bold text-slate-400 uppercase text-xs tracking-wider py-2 bg-white/40 backdrop-blur-sm rounded-lg">
            {day}
          </div>
        ))}
        {[...Array(firstDayIndex)].map((_, i) => (<div key={`empty-${i}`} className="hidden md:block" />))}
        
        {days.map((day, idx) => {
          const dateStr = formatLocalDate(day);
          const isToday = dateStr === todayStr;
          const isPastDay = dateStr < todayStr;
          
          // SAFEGUARD: Ensure event exists before checking its date
          const dayEvents = safeEvents.filter((e) => e && e.date === dateStr);
          
          return (
            <div key={idx} className={`min-h-[120px] bg-white/60 backdrop-blur-md border border-white/50 rounded-xl p-3 flex flex-col gap-2 transition-all duration-300 ${isToday ? 'ring-2 ring-indigo-400 ring-offset-2 bg-indigo-50/50 shadow-md scale-[1.02]' : 'hover:shadow-md'}`}>
              <div className={`text-right font-bold text-sm mb-1 font-display ${isToday ? 'text-indigo-600' : isPastDay ? 'text-slate-300' : 'text-slate-500'}`}>
                {day.getDate()}
              </div>
              
              {dayEvents.map((evt, i) => {
                // SAFEGUARD: Strict fallback strings to prevent .includes() TypeError
                const isSearchActive = !!globalSearch;
                const searchLower = (globalSearch || '').toLowerCase();
                const safeTitle = (evt.title || '').toLowerCase();
                const safeType = (evt.type || '').toLowerCase();
                
                const isMatch = isSearchActive && (safeTitle.includes(searchLower) || safeType.includes(searchLower));
                const isPastEvent = (evt.date || '') < todayStr;
                
                let stateClasses = '';
                if (isSearchActive) {
                  stateClasses = isMatch 
                    ? 'search-match z-10 scale-105 shadow-md' 
                    : 'opacity-20 grayscale pointer-events-none';
                } else if (isPastEvent) {
                  stateClasses = 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0';
                } else {
                  stateClasses = 'hover:-translate-y-[2px] shadow-sm hover:shadow-md';
                }

                // SAFEGUARD: Ensure getEventColor receives a string even if type is missing
                const eventColorClass = typeof getEventColor === 'function' ? getEventColor(evt.type || 'Meeting') : 'bg-slate-100 text-slate-700 border-slate-200';

                return (
                  <button 
                    key={evt.id || `evt-${idx}-${i}`} 
                    onClick={() => startEditing(evt)} 
                    className={`text-left text-xs p-2 rounded-lg border transition-all duration-300 font-body relative group ${eventColorClass} ${stateClasses}`}
                  >
                    <div className={`font-bold truncate ${isPastEvent && !isSearchActive ? 'line-through decoration-slate-400/50' : ''}`}>
                      {evt.title || 'Untitled Event'}
                    </div>
                    <div className="opacity-80 text-[10px] mt-0.5">{evt.time || 'TBD'}</div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {isEventFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative border border-white/20">
            <button onClick={() => setIsEventFormOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 active:scale-90 transition-transform"><X size={20} /></button>
            <h3 className="text-2xl font-bold mb-6 font-display text-slate-900">{editingEventId ? 'Edit Event' : 'Add New Event'}</h3>
            <form onSubmit={editingEventId ? saveEdit : handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 font-body">Event Title</label>
                <input type="text" required value={newEventForm.title} onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow font-body font-medium" placeholder="e.g., Investor Pitch" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 font-body">Date</label>
                  <input type="date" required value={newEventForm.date} onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow font-body font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 font-body">Time</label>
                  <input type="text" required value={newEventForm.time} onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow font-body font-medium" placeholder="e.g., 2:00 PM" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 font-body">Type</label>
                <select value={newEventForm.type} onChange={(e) => setNewEventForm({ ...newEventForm, type: e.target.value })} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow font-body font-medium cursor-pointer">
                  <option>Meeting</option><option>Networking</option><option>Deadline</option><option>Workshop</option><option>Expert Session</option><option>Learning</option>
                </select>
              </div>
              <div className="flex gap-3 pt-6">
                {editingEventId && (
                  <button type="button" onClick={handleDeleteEvent} className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-bold text-sm flex items-center gap-2 active:scale-95 transition-all font-body">
                    <Trash2 size={16} /> Delete
                  </button>
                )}
                <button type="submit" className="flex-1 bg-indigo-600 text-white rounded-lg py-2.5 font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 font-body">
                  {editingEventId ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};