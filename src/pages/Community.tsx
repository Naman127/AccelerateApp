// src/pages/Community.tsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Users, LogOut, Plus, Trophy, Clock, Check, Heart, MessageCircle, 
  Share2, MoreHorizontal, Flag, Eye, Trash2, Send, X, AlertCircle, Sparkles
} from 'lucide-react';
import { WEEKLY_CHALLENGE } from '../data/mockData';

export const Community = ({
  communities,
  activeCommunityId,
  setActiveCommunityId,
  toggleJoinCommunity,
  challengeSteps,
  toggleChallengeStep,
  filteredPosts,
  getAuthor,
  getAvatar,
  getCommunity,
  setViewingUserId,
  setActiveTab,
  handleDropdownAction,
  handleAddComment,
  toggleLikePost,
  handleSharePost,
  handleCreatePost
}) => {
  // LOCAL STATE
  const [newPostContent, setNewPostContent] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentText, setCommentText] = useState('');
  
  const [selectedCommunitiesForPost, setSelectedCommunitiesForPost] = useState([]);
  const [postError, setPostError] = useState('');

  // --- IDEA 3 ANIMATION STATE (SWEEP -> RIPPLE -> FINISHED) ---
  const isChallengeDone = challengeSteps.every(step => step.done);
  const prevChallengeDone = useRef(isChallengeDone);
  const [animationPhase, setAnimationPhase] = useState('idle');

  // React to challenge completion with synchronized timings
  useEffect(() => {
    if (!prevChallengeDone.current && isChallengeDone) {
      // Step 1: Start the 0.5s Scanner Sweep & flip the theme to Green
      setAnimationPhase('sweeping');
      
      // Step 2: Exactly 500ms later, the sweep ends and the ripple begins
      setTimeout(() => {
        setAnimationPhase('rippling');
      }, 500);

      // Step 3: 1 second after the ripple starts, collapse the banner entirely
      setTimeout(() => {
        setAnimationPhase('finished');
      }, 1500); 
    }
    prevChallengeDone.current = isChallengeDone;
  }, [isChallengeDone]);

  // Lock background scrolling when a modal is open
  useEffect(() => {
    if (isPostModalOpen || showWarning) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isPostModalOpen, showWarning]);

  const handleNewPostClick = () => {
    if (activeCommunityId === 'all') {
      setShowWarning(true);
    } else {
      openPostModal();
    }
  };

  const openPostModal = () => {
    setSelectedCommunitiesForPost(activeCommunityId === 'all' ? [] : [activeCommunityId]);
    setPostError('');
    setIsPostModalOpen(true);
  };

  const toggleCommunityForPost = (commId) => {
    if (selectedCommunitiesForPost.includes(commId)) {
      setSelectedCommunitiesForPost(prev => prev.filter(id => id !== commId));
    } else {
      setSelectedCommunitiesForPost(prev => [...prev, commId]);
    }
    setPostError(''); 
  };

  const submitPost = () => {
    if (selectedCommunitiesForPost.length === 0) {
      setPostError('Please select at least one community before posting.');
      return;
    }
    if (!newPostContent.trim()) {
      setPostError('Your post cannot be empty.');
      return;
    }
    handleCreatePost(newPostContent, selectedCommunitiesForPost);
    setNewPostContent('');
    setSelectedCommunitiesForPost([]);
    setIsPostModalOpen(false);
  };

  const submitComment = (postId) => {
    handleAddComment(postId, commentText);
    setCommentText('');
    setActiveCommentId(null);
  };

  const executeDropdown = (action, postId) => {
    handleDropdownAction(action, postId);
    setActiveDropdown(null);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* --- REFINED IDEA 3 CSS ANIMATIONS --- */}
      <style>{`
        /* The 0-100% Scanner Light Beam */
        @keyframes scannerSweep {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        
        /* The Expanding Radial Blur */
        @keyframes rippleBlurOut {
          0% { transform: scale(0.5); opacity: 1; filter: blur(0px); }
          100% { transform: scale(2); opacity: 0; filter: blur(15px); }
        }

        /* Fade out the text behind the ripple */
        @keyframes fadeTextOut {
          0% { opacity: 1; filter: blur(0px); }
          100% { opacity: 0; filter: blur(8px); }
        }

        .animate-scanner-beam {
          position: absolute;
          top: 0; bottom: 0;
          width: 150px;
          margin-left: -75px; /* Centers the beam on the left edge */
          transform: skewX(-20deg);
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.9), transparent);
          /* Tuned exactly to 0.5s */
          animation: scannerSweep 0.5s ease-in-out forwards;
          z-index: 50;
          pointer-events: none;
        }

        .animate-ripple-blur {
          position: absolute;
          top: 50%; left: 50%;
          width: 150%; aspect-ratio: 1 / 1;
          margin-top: -75%; margin-left: -75%;
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(52, 211, 153, 0.2) 40%, transparent 70%);
          border-radius: 50%;
          animation: rippleBlurOut 1s ease-out forwards;
          z-index: 40;
          pointer-events: none;
        }

        .fade-behind-ripple {
          animation: fadeTextOut 0.8s ease-out forwards;
        }
      `}</style>
      
      {/* --- LEFT SIDEBAR --- */}
      <div className="hidden lg:block lg:col-span-3 space-y-6">
        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-5 shadow-sm max-h-[50vh] flex flex-col">
          <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2 font-display flex-shrink-0">
            <Users size={18} className="text-indigo-600" /> My Communities
          </h3>
          <div className="space-y-1 overflow-y-auto pr-2 custom-scrollbar">
            {communities.filter((c) => c.joined).map((c) => (
              <div key={c.id} className="group flex items-center justify-between w-full rounded-lg hover:bg-white/50 transition-colors pr-2">
                <button onClick={() => setActiveCommunityId(c.id)} className={`flex-1 text-left px-3 py-2 text-sm font-medium flex items-center gap-2 font-body ${activeCommunityId === c.id ? 'bg-indigo-50 text-indigo-700 rounded-lg' : 'text-slate-600'}`}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.color.split(' ')[1]}`}></span>
                  <span className="truncate">{c.name}</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleJoinCommunity(c.id); }} className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 transition-all" title="Leave Community">
                  <LogOut size={14} />
                </button>
              </div>
            ))}
            {communities.filter((c) => c.joined).length === 0 && (
              <p className="text-xs text-slate-400 italic px-2">You haven't joined any communities yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-5 shadow-sm max-h-[40vh] flex flex-col">
          <h3 className="text-slate-900 font-bold mb-4 font-display flex-shrink-0">Discover</h3>
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {communities.filter((c) => !c.joined).map((c) => (
              <div key={c.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className={`w-8 h-8 rounded-lg ${c.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>{c.name[0]}</span>
                  <div className="text-xs truncate">
                    <div className="font-bold text-slate-900 truncate">{c.name}</div>
                    <div className="text-slate-500">{c.members} members</div>
                  </div>
                </div>
                <button onClick={() => toggleJoinCommunity(c.id)} className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition-colors flex-shrink-0"><Plus size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CENTER FEED --- */}
      <div className="lg:col-span-9">
        <div className="flex items-center justify-between mb-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 font-display">Community Feed</h2>
          
          <button onClick={handleNewPostClick} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-indigo-100 font-body text-sm transition-all hover:-translate-y-0.5">
            <Plus size={16} /> New Post
          </button>
        </div>

        {/* --- WEEKLY CHALLENGE BANNER --- */}
        <div 
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden origin-top max-w-3xl ${
            animationPhase === 'finished' 
              ? 'max-h-0 opacity-0 mb-0 scale-y-90 pointer-events-none' 
              : 'max-h-[600px] mb-8 scale-y-100'
          }`}
        >
          <div className={`rounded-2xl p-6 text-white relative overflow-hidden transition-colors duration-500 shadow-xl
            ${animationPhase !== 'idle' 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-600/30' 
              : 'bg-gradient-to-r from-amber-600 to-orange-700 shadow-orange-700/20'
            }`}
          >
            
            {/* Inject Tuned CSS Animation Elements */}
            {animationPhase === 'sweeping' && <div className="animate-scanner-beam" />}
            {animationPhase === 'rippling' && <div className="animate-ripple-blur" />}

            {/* Background Icon */}
            <div className={`absolute top-0 right-0 p-8 transform translate-x-1/4 -translate-y-1/4 transition-all duration-700
              ${animationPhase !== 'idle' ? 'opacity-20 scale-125 rotate-12 text-emerald-100' : 'opacity-10 scale-100 group-hover:scale-110'}
            `}>
              {animationPhase !== 'idle' ? <Sparkles size={140} /> : <Trophy size={140} />}
            </div>

            {/* Main Content Area */}
            <div className={`relative z-10 ${animationPhase === 'rippling' ? 'fade-behind-ripple' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                  {animationPhase !== 'idle' ? 'Mission Success' : 'Weekly Challenge'}
                </span>
                {animationPhase === 'idle' && (
                  <span className="text-amber-100 text-xs flex items-center gap-1 font-bold animate-pulse"><Clock size={12} /> {WEEKLY_CHALLENGE.deadline}</span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-2 font-display">
                {animationPhase !== 'idle' ? 'Challenge Completed!' : WEEKLY_CHALLENGE.title}
              </h3>
              
              <p className={`mb-6 max-w-xl text-sm font-body leading-relaxed ${animationPhase !== 'idle' ? 'text-emerald-50' : 'text-amber-50'}`}>
                {animationPhase !== 'idle' 
                  ? 'Excellent work. Your progress has been logged and your profile has been updated.' 
                  : WEEKLY_CHALLENGE.description
                }
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 max-w-lg">
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${animationPhase !== 'idle' ? 'text-emerald-200' : 'text-amber-200'}`}>
                  Your Progress
                </h4>
                <div className="space-y-3">
                  {challengeSteps.map((step) => (
                    <button key={step.id} onClick={() => toggleChallengeStep(step.id)} className="flex items-center gap-3 w-full text-left group/step">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 
                        ${step.done && animationPhase !== 'idle' ? 'bg-white border-white text-emerald-600 scale-110' : 
                          step.done ? 'bg-white border-white text-orange-600 scale-110' : 
                          'border-white/40 group-hover/step:border-white/60'}`}
                      >
                        {step.done && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className={`text-sm transition-opacity ${step.done ? 'text-white line-through opacity-80' : 'text-white'}`}>{step.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- POSTS CONTAINER --- */}
        <div className="space-y-6 max-w-3xl">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const author = getAuthor(post.authorId);
              const community = getCommunity(post.communityId);

              return (
                <div key={post.id} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => { setViewingUserId(post.authorId); setActiveTab('profile'); }} className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden hover:ring-2 hover:ring-indigo-400 transition-all">
                        <img src={getAvatar(author.avatar)} alt={author.name} className="w-full h-full object-cover" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setViewingUserId(post.authorId); setActiveTab('profile'); }} className="font-bold text-slate-900 font-body hover:text-indigo-600 hover:underline text-left">
                            {author.name}
                          </button>
                          <span className="text-xs text-slate-400 font-body">• {post.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500">{author.role}</span>
                          {community && <span className={`px-1.5 py-0.5 rounded ${community.color} font-medium`}>{community.name}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <button onClick={() => setActiveDropdown(activeDropdown === post.id ? null : post.id)} className="text-slate-400 hover:text-slate-600 p-1">
                        <MoreHorizontal size={20} />
                      </button>
                      {activeDropdown === post.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-100 py-1 z-20 animate-in fade-in zoom-in-95 origin-top-right">
                          <button onClick={() => executeDropdown('report', post.id)} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"><Flag size={14} /> Report</button>
                          <button onClick={() => executeDropdown('mute', post.id)} className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"><Eye size={14} /> Mute</button>
                          {post.authorId === 'me' && <button onClick={() => executeDropdown('delete', post.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"><Trash2 size={14} /> Delete</button>}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-800 mb-4 leading-relaxed font-body">{post.content}</p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {post.tags.map((tag) => <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">#{tag}</span>)}
                    </div>
                  )}

                  {post.comments && post.comments.length > 0 && (
                    <div className="bg-slate-50/50 rounded-lg p-3 mb-4 space-y-3 border border-slate-100/50">
                      {post.comments.map((comment) => {
                        const cAuthor = getAuthor(comment.authorId);
                        return (
                          <div key={comment.id} className="flex gap-2 items-start">
                            <button onClick={() => { setViewingUserId(comment.authorId); setActiveTab('profile'); }} className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 hover:ring-2 hover:ring-indigo-400 transition-all">
                              <img src={getAvatar(cAuthor.avatar)} alt={cAuthor.name} className="w-full h-full object-cover" />
                            </button>
                            <div className="flex-1">
                              <div className="bg-white p-2 rounded-r-lg rounded-bl-lg border border-slate-100 shadow-sm inline-block">
                                <span className="font-bold text-xs text-slate-900 block cursor-pointer hover:text-indigo-600" onClick={() => { setViewingUserId(comment.authorId); setActiveTab('profile'); }}>{cAuthor.name}</span>
                                <span className="text-sm text-slate-700">{comment.text}</span>
                              </div>
                              <div className="text-[10px] text-slate-400 mt-1 ml-1">{comment.timestamp}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeCommentId === post.id && (
                    <div className="flex gap-2 mb-4 animate-in fade-in slide-in-from-top-2">
                      <input type="text" placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" onKeyDown={(e) => e.key === 'Enter' && submitComment(post.id)} />
                      <button onClick={() => submitComment(post.id)} className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"><Send size={16} /></button>
                    </div>
                  )}

                  <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                    <button onClick={() => toggleLikePost(post.id)} className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.liked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'}`}><Heart size={18} className={post.liked ? 'fill-current' : ''} />{post.likes}</button>
                    <button onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"><MessageCircle size={18} />{post.comments ? post.comments.length : 0}</button>
                    <button onClick={() => handleSharePost(post.id)} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors ml-auto"><Share2 size={18} /></button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white/60 backdrop-blur-xl rounded-xl border border-dashed border-slate-300 max-w-3xl">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300"><Users size={32} /></div>
              <h3 className="text-lg font-bold text-slate-700 mb-2 font-display">No posts yet</h3>
              <p className="text-slate-500 text-sm mb-4 font-body">Be the first to share something with the community!</p>
            </div>
          )}
        </div>
      </div>

      {/* --- WARNING MODAL: NO COMMUNITY SELECTED (PORTALED) --- */}
      {showWarning && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-8 relative text-center border border-white/20">
            <button onClick={() => setShowWarning(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20} /></button>
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 font-display text-slate-900">Select a Community</h3>
            <p className="text-slate-500 font-body mb-6 text-sm">Please select a specific community from the sidebar before creating a post!</p>
            <button onClick={() => setShowWarning(false)} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors font-body w-full shadow-md">Got it</button>
          </div>
        </div>,
        document.body
      )}

      {/* --- NEW POST MODAL WITH MULTI-SELECT (PORTALED) --- */}
      {isPostModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 relative flex flex-col max-h-[90vh]">
            <button onClick={() => setIsPostModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20} /></button>
            <h3 className="text-xl font-bold mb-4 font-display">Create New Post</h3>
            
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide font-body">Post to Communities:</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar p-1">
                {communities.filter(c => c.joined).map(c => {
                  const isSelected = selectedCommunitiesForPost.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleCommunityForPost(c.id)}
                      className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all border flex items-center gap-2 font-body ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${c.color.split(' ')[1]}`}></span>
                      {c.name}
                      {isSelected && <Check size={14} strokeWidth={3} className="text-indigo-600" />}
                    </button>
                  );
                })}
                {communities.filter(c => c.joined).length === 0 && (
                  <p className="text-sm text-slate-500 italic">You must join a community first.</p>
                )}
              </div>
              {postError && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium font-body animate-in slide-in-from-top-1">
                  <AlertCircle size={14}/> {postError}
                </p>
              )}
            </div>

            <textarea 
              value={newPostContent} 
              onChange={(e) => { setNewPostContent(e.target.value); setPostError(''); }} 
              placeholder="What's on your mind?" 
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none font-body"
            ></textarea>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                {['General', 'Question', 'Milestone'].map((tag) => <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded cursor-pointer hover:bg-slate-200">#{tag}</span>)}
              </div>
              <button onClick={submitPost} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors font-body">Post</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};