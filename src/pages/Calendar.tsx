// src/pages/Calendar.tsx
import React from 'react';
import { ChevronDown, Plus, Trash2, X, Video } from 'lucide-react';

export const Calendar = ({ 
  currentDate, setCurrentDate, events, isEventFormOpen, setIsEventFormOpen, 
  editingEventId, newEventForm, setNewEventForm, handleAddEvent, 
  handleDeleteEvent, startEditing, saveEdit, getDaysInMonth, handlePrevMonth, 
  handleNextMonth, formatLocalDate, getEventColor, globalSearch // <-- ADDED PROP
}) => {
  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/60 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-sm">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-display">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <p className="text-slate-500 font-body">Manage your deadlines and mentor sessions.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 shadow-sm">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 text-slate-600 rounded-l-lg border-r border-slate-100"><ChevronDown className="rotate-90" size={20} /></button>
            <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 font-body">Today</button>
            <button onClick={handleNextMonth} className="p-2 hover:bg-slate-50 text-slate-600 rounded-r-lg border-l border-slate-100"><ChevronDown className="-rotate-90" size={20} /></button>
          </div>
          <button onClick={() => { setNewEventForm({ title: '', time: '', date: new Date().toISOString().split('T')[0], type: 'Meeting' }); setIsEventFormOpen(true); }} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-indigo-200 transition-all font-body">
            <Plus size={18} /> Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (<div key={day} className="text-center font-bold text-slate-400 uppercase text-sm py-2 bg-white/30 rounded-lg">{day}</div>))}
        {[...Array(firstDayIndex)].map((_, i) => (<div key={`empty-${i}`} className="hidden md:block" />))}
        {days.map((day, idx) => {
          const dateStr = formatLocalDate(day);
          const isToday = dateStr === formatLocalDate(new Date());
          const dayEvents = events.filter((e) => e.date === dateStr);
          
          return (
            <div key={idx} className={`min-h-[120px] bg-white/60 backdrop-blur-md border border-white/50 rounded-xl p-3 flex flex-col gap-2 hover:shadow-md transition-shadow ${isToday ? 'ring-2 ring-indigo-400 ring-offset-2 bg-indigo-50/50' : ''}`}>
              <div className={`text-right font-bold text-sm mb-1 ${isToday ? 'text-indigo-600' : 'text-slate-400'}`}>{day.getDate()}</div>
              
              {dayEvents.map((evt) => {
                // --- SAFE GLOBAL SEARCH LOGIC FOR CALENDAR EVENTS ---
                const isSearchActive = !!globalSearch;
                const isMatch = isSearchActive && (
                  evt.title?.toLowerCase().includes(globalSearch.toLowerCase()) || 
                  evt.type?.toLowerCase().includes(globalSearch.toLowerCase())
                );
                
                // If searching, fade out non-matches and apply glow to matches
                let searchClasses = '';
                if (isSearchActive) {
                  searchClasses = isMatch 
                    ? 'search-match z-10 scale-105' 
                    : 'opacity-20 grayscale pointer-events-none';
                }

                return (
                  <button 
                    key={evt.id} 
                    onClick={() => startEditing(evt)} 
                    className={`text-left text-xs p-2 rounded-lg border transition-all hover:scale-[1.02] shadow-sm font-body relative ${getEventColor(evt.type)} ${searchClasses}`}
                  >
                    <div className="font-bold truncate">{evt.title}</div>
                    <div className="opacity-80 text-[10px]">{evt.time}</div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {isEventFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <button onClick={() => setIsEventFormOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20} /></button>
            <h3 className="text-xl font-bold mb-6 font-display">{editingEventId ? 'Edit Event' : 'Add New Event'}</h3>
            <form onSubmit={editingEventId ? saveEdit : handleAddEvent} className="space-y-4">
              <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Event Title</label><input type="text" required value={newEventForm.title} onChange={(e) => setNewEventForm({ ...newEventForm, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label><input type="date" required value={newEventForm.date} onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Time</label><input type="text" required value={newEventForm.time} onChange={(e) => setNewEventForm({ ...newEventForm, time: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2" /></div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                <select value={newEventForm.type} onChange={(e) => setNewEventForm({ ...newEventForm, type: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  <option>Meeting</option><option>Networking</option><option>Deadline</option><option>Workshop</option><option>Expert Session</option><option>Learning</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                {editingEventId && <button type="button" onClick={handleDeleteEvent} className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-bold text-sm flex items-center gap-2"><Trash2 size={16} /> Delete</button>}
                <button type="submit" className="flex-1 bg-indigo-600 text-white rounded-lg py-2 font-bold hover:bg-indigo-700">{editingEventId ? 'Save Changes' : 'Create Event'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};