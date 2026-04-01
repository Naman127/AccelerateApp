import React from 'react';
import { 
  Rocket, LayoutDashboard, Users, BookOpen, 
  Calendar as CalendarIcon, Briefcase, Info, Bookmark 
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-body ${
      active
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
        : 'text-slate-600 hover:bg-slate-50/50 hover:text-indigo-600'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

export const Sidebar = ({ activeTab, setActiveTab, onReturnHome }) => {
  return (
    <aside className="w-64 bg-white/60 backdrop-blur-xl border-r border-white/50 fixed h-full hidden md:flex flex-col p-4 z-20">
      
      {/* Clickable Logo Section */}
      <div 
        onClick={onReturnHome}
        className="flex items-center gap-2 px-2 mb-8 mt-2 cursor-pointer group"
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
          <Rocket size={20} fill="currentColor" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900 font-display group-hover:text-indigo-600 transition-colors">
          Accelerate
        </span>
      </div>

      <nav className="space-y-1 flex-1">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <SidebarItem icon={Rocket} label="Browse" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <SidebarItem icon={Bookmark} label="Saved Missions" active={activeTab === 'saved'} onClick={() => setActiveTab('saved')} />
        <SidebarItem icon={Users} label="Community" active={activeTab === 'community'} onClick={() => setActiveTab('community')} />
        <SidebarItem icon={BookOpen} label="Resources" active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} />
        <SidebarItem icon={CalendarIcon} label="Calendar" active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} />
        <SidebarItem icon={Briefcase} label="Mentors" active={activeTab === 'mentors'} onClick={() => setActiveTab('mentors')} />
      </nav>

      <div className="border-t border-slate-200/50 pt-4 mt-auto space-y-1">
        <SidebarItem icon={Info} label="About Us" active={activeTab === 'about'} onClick={() => setActiveTab('about')} />
      </div>
    </aside>
  );
};