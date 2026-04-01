// src/pages/Dashboard.tsx
import React from 'react';
import { 
  Zap, Timer, CheckCircle2, Circle, ChevronUp, ChevronDown, 
  Info, Book, Banknote, Wrench, Rocket, Plus, Edit2, Trash2, 
  Calendar as CalendarIcon, Video, Sparkles 
} from 'lucide-react';
import { RocketDashboard } from '../components/RocketDashboard';
import { BLUEPRINTS } from '../data/mockData';

export const Dashboard = ({
  activeBiz,
  activeBusinessId, // <-- ADD THIS LINE
  myBusinesses,
  setActiveBusinessId,
  handleRenameBusiness,
  handleDeleteBusiness,
  toggleTask,
  expandedTask,
  setExpandedTask,
  events,
  handleNav
}) => {
  const blueprint = activeBiz
    ? BLUEPRINTS[activeBiz.type] || BLUEPRINTS['default']
    : null;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative z-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <RocketDashboard activeBusiness={activeBiz} />
          {activeBiz ? (
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl overflow-hidden shadow-sm">
              {/* HERO IMAGE HEADER */}
              {blueprint?.headerImage && (
                <div className="w-full h-48 relative">
                  <img
                    src={blueprint.headerImage}
                    alt={blueprint.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-display">
                        <Zap className="text-yellow-400" size={24} />{' '}
                        {blueprint.title}
                      </h2>
                      <p className="text-slate-200 text-sm font-body opacity-90">
                        Mission Blueprint
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* If no image, show standard header */}
              {!blueprint?.headerImage && (
                <div className="p-6 border-b border-slate-200/60 flex justify-between items-center bg-slate-50/30">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-display">
                      <Zap className="text-yellow-500" size={20} /> Mission
                      Blueprint
                    </h2>
                    <p className="text-slate-500 text-sm mt-1 font-body">
                      {blueprint?.title}
                    </p>
                  </div>
                </div>
              )}

              <div className="p-6">
                {blueprint?.stages?.map((stage, idx) => (
                  <div key={idx} className="mb-8 last:mb-0 relative">
                    <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-slate-200/60 -z-0"></div>

                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-cyan-700 flex items-center gap-2 bg-transparent inline-block pr-4 z-10 relative font-display tracking-tight">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-cyan-700 flex items-center justify-center text-xs border border-slate-300 font-body">
                          {idx + 1}
                        </span>
                        {stage.name}
                      </h3>
                      {stage.duration && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-50/50 border border-cyan-100 rounded-full text-xs font-medium text-cyan-700 font-body">
                          <Timer size={12} />
                          {stage.duration}
                        </div>
                      )}
                    </div>
                    <div className="space-y-3 pl-8">
                      {stage.tasks?.map((task) => {
                        const taskTitle =
                          typeof task === 'string' ? task : task.title;
                        const taskDetail =
                          typeof task === 'object'
                            ? task.detail
                            : 'Use our AI assistant to get specific tips for this step.';
                        const isDone =
                          activeBiz.completedTasks.includes(taskTitle);
                        const isExpanded = expandedTask === taskTitle;

                        return (
                          <div key={taskTitle} className="relative group">
                            <div
                              className={`w-full text-left p-3 rounded-lg border transition-all backdrop-blur-sm
                                  ${
                                    isDone
                                      ? 'bg-green-50/60 border-green-200/60'
                                      : 'bg-white/40 border-slate-200/60 hover:border-slate-300 hover:bg-white/60'
                                  }`}
                            >
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => toggleTask(taskTitle)}
                                  className="flex items-center flex-1"
                                >
                                  <div
                                    className={`mr-4 transition-colors ${
                                      isDone
                                        ? 'text-green-600'
                                        : 'text-slate-400 group-hover:text-slate-600'
                                    }`}
                                  >
                                    {isDone ? (
                                      <CheckCircle2 size={22} />
                                    ) : (
                                      <Circle size={22} />
                                    )}
                                  </div>
                                  <span
                                    className={`${
                                      isDone
                                        ? 'text-slate-400 line-through'
                                        : 'text-slate-800'
                                    } font-body`}
                                  >
                                    {taskTitle}
                                  </span>
                                </button>

                                <button
                                  onClick={() =>
                                    setExpandedTask(
                                      isExpanded ? null : taskTitle
                                    )
                                  }
                                  className="p-1 text-slate-400 hover:text-cyan-600 transition-colors"
                                >
                                  {isExpanded ? (
                                    <ChevronUp size={18} />
                                  ) : (
                                    <ChevronDown size={18} />
                                  )}
                                </button>
                              </div>

                              {isExpanded && (
                                <div className="mt-3 ml-10 pt-3 border-t border-slate-100 text-sm text-slate-600 animate-slide-up font-body">
                                  <div className="flex gap-2 items-start">
                                    <Info
                                      size={16}
                                      className="mt-0.5 text-cyan-500 flex-shrink-0"
                                    />
                                    <p>{taskDetail}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
                {blueprint?.terms && (
                  <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/60 h-full backdrop-blur-sm">
                    <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2 font-display">
                      <Book size={20} className="text-cyan-600" /> Industry
                      Vocabulary
                    </h3>
                    <div className="space-y-3">
                      {blueprint.terms.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-white/60 p-3 rounded-lg border border-slate-200/50 hover:border-slate-300 transition-colors shadow-sm"
                        >
                          <span className="text-cyan-700 font-bold block mb-1 text-xs uppercase tracking-wide font-body">
                            {item.term}
                          </span>
                          <span className="text-slate-600 text-xs leading-relaxed font-body">
                            {item.def}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-6">
                  {blueprint?.funding && (
                    <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/60 flex-1 backdrop-blur-sm">
                      <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2 font-display">
                        <Banknote size={20} className="text-green-600" />{' '}
                        Funding & Grants
                      </h3>
                      <div className="space-y-3">
                        {blueprint.funding.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-between bg-white/60 p-3 rounded-lg border border-slate-200/50 shadow-sm"
                          >
                            <div>
                              <span className="text-slate-900 font-medium text-sm block font-body">
                                {item.title}
                              </span>
                              <span className="text-slate-500 text-xs font-body">
                                {item.desc}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="block text-green-600 font-bold text-xs font-body">
                                {item.amount}
                              </span>
                              <span className="text-slate-400 text-[10px] uppercase font-body">
                                {item.type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {blueprint?.tools && (
                    <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/60 flex-1 backdrop-blur-sm">
                      <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2 font-display">
                        <Wrench size={20} className="text-orange-500" />{' '}
                        Recommended Stack
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {blueprint.tools.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-white/60 p-3 rounded-lg border border-slate-200/50 shadow-sm flex flex-col"
                          >
                            <span className="text-slate-900 font-medium text-sm font-body">
                              {item.name}
                            </span>
                            <span className="text-slate-500 text-xs mb-2 font-body">
                              {item.desc}
                            </span>
                            <a
                              href={`https://${item.link}`}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-auto text-xs text-cyan-600 hover:underline font-body"
                            >
                              Visit Site &rarr;
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-12 bg-white/60 backdrop-blur-xl rounded-2xl border border-dashed border-slate-300 shadow-sm">
              <Rocket size={48} className="mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl text-slate-900 mb-2 font-display">
                No Active Missions
              </h3>
              <p className="text-slate-500 mb-6 font-body">
                Start a new adventure to track your progress.
              </p>
              <button
                onClick={() => handleNav('home')}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors font-body"
              >
                Browse Fields
              </button>
            </div>
          )}
        </div>

        <div className="w-full md:w-80 space-y-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-5 shadow-sm">
            <h3 className="text-slate-900 font-bold mb-4 flex items-center justify-between font-display">
              My Fleet{' '}
              <button
                onClick={() => handleNav('home')}
                className="text-cyan-600 hover:text-cyan-700"
              >
                <Plus size={18} />
              </button>
            </h3>
            <div className="space-y-3">
              {myBusinesses.length > 0 ? (
                myBusinesses.map((biz) => (
                  <button
                    key={biz.id}
                    onClick={() => setActiveBusinessId(biz.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group/item backdrop-blur-sm 
                        ${
                          activeBusinessId === biz.id
                            ? 'bg-gradient-to-r from-indigo-50/90 to-white/50 border-indigo-200 border-l-4 border-l-indigo-500 shadow-lg shadow-indigo-500/10'
                            : 'bg-white/40 border-slate-200/50 hover:bg-white/80 hover:border-slate-300 hover:shadow-md'
                        }`}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div
                        className={`font-bold mb-1 truncate font-display ${
                          activeBusinessId === biz.id
                            ? 'text-indigo-900'
                            : 'text-slate-700'
                        }`}
                      >
                        {biz.name}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500 font-body mb-2">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wide font-bold">
                          {biz.field === 'custom' ? 'Custom' : biz.field}
                        </span>
                        <span className="font-mono">{biz.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            activeBusinessId === biz.id
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                              : 'bg-slate-400'
                          }`}
                          style={{ width: `${biz.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity transform translate-x-2 group-hover/item:translate-x-0 duration-200">
                      <div
                        onClick={(e) =>
                          handleRenameBusiness(e, biz.id, biz.name)
                        }
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all"
                        title="Rename Mission"
                      >
                        <Edit2 size={14} />
                      </div>
                      <div
                        onClick={(e) => handleDeleteBusiness(e, biz.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                        title="Archive Mission"
                      >
                        <Trash2 size={14} />
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                  <p className="text-sm text-slate-400 font-body">
                    No active missions.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-5 shadow-sm">
            <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2 font-display">
              <CalendarIcon size={18} className="text-purple-600" /> Upcoming
              Events
            </h3>
            <div className="space-y-4">
              {events.slice(0, 4).map((evt) => (
                <div
                  key={evt.id}
                  className="flex gap-3 border-l-2 border-purple-500/30 pl-3"
                >
                  <div>
                    <div className="text-slate-900 text-sm font-medium font-body">
                      {evt.title}
                    </div>
                    <div className="text-slate-500 text-xs font-body mb-1">
                      {evt.time} • {evt.type}
                    </div>
                    <a
                      href="https://meet.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <Video size={10} /> Join Meeting
                    </a>
                  </div>
                </div>
              ))}
              {events.length === 0 && (
                <p className="text-slate-500 text-sm italic font-body">
                  No upcoming events.
                </p>
              )}
            </div>
            <button
              onClick={() => handleNav('calendar')}
              className="w-full mt-4 text-sm text-center text-slate-500 hover:text-slate-900 py-2 border border-slate-200/50 rounded-lg hover:bg-white/50 transition-colors font-body"
            >
              View Calendar
            </button>
          </div>

          {/* AI DISCLAIMER - SIDEBAR LOCATION */}
          {activeBiz?.isAiGenerated && (
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-indigo-600" size={18} />
                <h4 className="text-sm font-bold text-indigo-900 font-display">
                  AI Architect Mode
                </h4>
              </div>
              <p className="text-xs text-indigo-800 font-body leading-relaxed opacity-90">
                This blueprint was generated by the AI Architect. While
                tailored to your prompt, we recommend verifying specific
                financial and legal steps with a human expert in your region.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};