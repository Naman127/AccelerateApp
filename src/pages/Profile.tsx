// src/pages/Profile.tsx
import React from 'react';
import { ArrowLeft, Camera, Edit2, User, Mail, Linkedin, Globe as GlobeIcon, Phone, Award, Rocket, CheckCircle2 } from 'lucide-react';
import { CountUp } from '../components/CountUp';

export const Profile = ({ viewingUserId, userProfile, communityUsers, isEditingProfile, setIsEditingProfile, tempProfile, setTempProfile, handleAvatarChange, saveProfile, startEditingProfile, setActiveTab, getAvatar, myBusinesses, isChallengeComplete }) => {
  const isOwnProfile = viewingUserId === 'me';
  let displayProfile = userProfile;
  
  if (!isOwnProfile) {
    const otherUser = communityUsers.find((u) => u.id === viewingUserId);
    if (otherUser) {
      const handle = otherUser.name.toLowerCase().replace(/\s+/g, '.');
      
      displayProfile = {
        name: otherUser.name, 
        role: otherUser.role, 
        avatarSeed: otherUser.avatar,
        headline: `${otherUser.role} | Accelerate Member`, 
        bio: `${otherUser.name} is an active member of the Accelerate community, currently building their next big venture and sharing insights on startup growth.`,
        badges: [
          { id: 'fake_badge_1', name: 'Community Builder', icon: Award, color: 'text-yellow-600 bg-yellow-100' }
        ], 
        contact: { 
          email: `${handle}@accelerate.network`, 
          linkedin: `linkedin.com/in/${handle}`, 
          website: `www.${handle}.dev`, 
          // Generates a consistent but fake phone number
          phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`
        },
      };
    }
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in relative z-10">
      {!isOwnProfile && (
        <button onClick={() => setActiveTab('community')} className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors px-4 py-2 rounded-lg hover:bg-white/50 backdrop-blur-sm">
          <ArrowLeft size={20} className="mr-2" /> Back to Community
        </button>
      )}

      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-sm mb-6 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg">
            <img src={getAvatar(isEditingProfile ? tempProfile.avatarSeed : displayProfile.avatarSeed)} alt="Profile" className="w-full h-full object-cover" />
          </div>
          {isOwnProfile && isEditingProfile && (
            <button onClick={handleAvatarChange} className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md text-slate-600 hover:text-indigo-600 transition-colors">
              <Camera size={16} />
            </button>
          )}
        </div>

        <div className="flex-1 text-center md:text-left w-full">
          {isOwnProfile && isEditingProfile ? (
            <div className="space-y-4 w-full max-w-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" value={tempProfile.name} onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })} className="w-full text-xl font-bold bg-white/50 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900" placeholder="Name" />
                <input type="text" value={tempProfile.role} onChange={(e) => setTempProfile({ ...tempProfile, role: e.target.value })} className="w-full text-sm text-slate-700 bg-white/50 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Role" />
              </div>
              <input type="text" value={tempProfile.headline} onChange={(e) => setTempProfile({ ...tempProfile, headline: e.target.value })} className="w-full text-sm text-slate-700 bg-white/50 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Headline" />
              <textarea value={tempProfile.bio} onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })} className="w-full text-sm text-slate-600 bg-white/50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24" placeholder="Bio" />
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 font-display mb-1">{displayProfile.name}</h2>
              <p className="text-indigo-600 font-medium mb-3 font-body flex items-center justify-center md:justify-start gap-2">{displayProfile.role} <span className="w-1 h-1 bg-slate-300 rounded-full"></span> {displayProfile.headline || 'Aspiring Founder'}</p>
              <p className="text-slate-600 text-sm max-w-2xl font-body leading-relaxed">{displayProfile.bio}</p>
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          {isOwnProfile && (isEditingProfile ? (
            <div className="flex gap-2">
              <button onClick={() => setIsEditingProfile(false)} className="px-4 py-2 bg-white text-slate-600 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 font-body transition-colors">Cancel</button>
              <button onClick={saveProfile} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-indigo-700 font-body transition-colors">Save Profile</button>
            </div>
          ) : (
            <button onClick={startEditingProfile} className="px-4 py-2 bg-white text-slate-700 rounded-lg text-sm font-bold shadow-sm border border-slate-200 hover:bg-slate-50 flex items-center gap-2 font-body transition-colors">
              <Edit2 size={16} /> Edit Profile
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-5 shadow-sm text-center">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2"><Rocket size={20} /></div>
              <div className="text-2xl font-bold text-slate-900 font-display"><CountUp end={isOwnProfile ? myBusinesses.length : 2} /></div>
              <div className="text-xs text-slate-500 uppercase tracking-wide font-body font-semibold">Ventures</div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-5 shadow-sm text-center">
              <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2"><Award size={20} /></div>
              <div className="text-2xl font-bold text-slate-900 font-display"><CountUp end={displayProfile.badges.length} /></div>
              <div className="text-xs text-slate-500 uppercase tracking-wide font-body font-semibold">Badges</div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-5 shadow-sm text-center">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2"><CheckCircle2 size={20} /></div>
              <div className="text-2xl font-bold text-slate-900 font-display"><CountUp end={isOwnProfile && isChallengeComplete ? 1 : 0} /></div>
              <div className="text-xs text-slate-500 uppercase tracking-wide font-body font-semibold">Wins</div>
            </div>
          </div>

          {/* MISSING CONTACT INFO RESTORED */}
          <div className={`bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-6 shadow-sm transition-all ${isEditingProfile ? 'ring-2 ring-indigo-500/20 bg-white/80' : ''}`}>
            <h3 className="font-bold text-slate-900 mb-4 font-display flex items-center gap-2">
              <User size={20} className={isEditingProfile ? 'text-indigo-600' : 'text-slate-400'} />
              {isEditingProfile ? 'Editing Contact Info' : 'Contact Information'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-slate-100">
                <div className="p-2 bg-slate-100 text-slate-600 rounded-full"><Mail size={16} /></div>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs text-slate-400 font-body uppercase tracking-wider">Email</span>
                  {isOwnProfile && isEditingProfile ? (
                    <input type="text" value={tempProfile.contact?.email || ''} onChange={(e) => setTempProfile({ ...tempProfile, contact: { ...tempProfile.contact, email: e.target.value } })} className="w-full text-sm font-medium bg-white border border-indigo-200 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500" />
                  ) : (
                    <span className="text-sm font-medium text-slate-900 font-body truncate block">{displayProfile.contact?.email || 'N/A'}</span>
                  )}
                </div>
              </div>
              {/* LinkedIn */}
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-slate-100">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Linkedin size={16} /></div>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs text-slate-400 font-body uppercase tracking-wider">LinkedIn</span>
                  {isOwnProfile && isEditingProfile ? (
                    <input type="text" value={tempProfile.contact?.linkedin || ''} onChange={(e) => setTempProfile({ ...tempProfile, contact: { ...tempProfile.contact, linkedin: e.target.value } })} className="w-full text-sm font-medium bg-white border border-indigo-200 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500" />
                  ) : (
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline font-body truncate block">{displayProfile.contact?.linkedin || 'N/A'}</a>
                  )}
                </div>
              </div>
              {/* Website */}
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-slate-100">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-full"><GlobeIcon size={16} /></div>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs text-slate-400 font-body uppercase tracking-wider">Website</span>
                  {isOwnProfile && isEditingProfile ? (
                    <input type="text" value={tempProfile.contact?.website || ''} onChange={(e) => setTempProfile({ ...tempProfile, contact: { ...tempProfile.contact, website: e.target.value } })} className="w-full text-sm font-medium bg-white border border-indigo-200 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500" />
                  ) : (
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:underline font-body truncate block">{displayProfile.contact?.website || 'N/A'}</a>
                  )}
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-slate-100">
                <div className="p-2 bg-green-100 text-green-600 rounded-full"><Phone size={16} /></div>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs text-slate-400 font-body uppercase tracking-wider">Phone</span>
                  {isOwnProfile && isEditingProfile ? (
                    <input type="text" value={tempProfile.contact?.phone || ''} onChange={(e) => setTempProfile({ ...tempProfile, contact: { ...tempProfile.contact, phone: e.target.value } })} className="w-full text-sm font-medium bg-white border border-indigo-200 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500" />
                  ) : (
                    <span className="text-sm font-medium text-slate-900 font-body truncate block">{displayProfile.contact?.phone || 'N/A'}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl p-6 shadow-sm h-full">
            <h3 className="font-bold text-slate-900 mb-4 font-display flex items-center justify-between">
              Badges
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-body">{displayProfile.badges.length}</span>
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {displayProfile.badges.map((badge) => (
                <div key={badge.id} className="bg-white p-3 rounded-xl flex items-center gap-3 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className={`w-10 h-10 rounded-full ${badge.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <badge.icon size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-800 font-body block">{badge.name}</span>
                    <span className="text-xs text-slate-400 font-body">Earned Nov 2025</span>
                  </div>
                </div>
              ))}
              {[1, 2, 3].map((i) => (
                <div key={`locked-${i}`} className="bg-slate-50 p-3 rounded-xl flex items-center gap-3 border border-dashed border-slate-200 opacity-60">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0"><Award size={18} className="text-slate-400" /></div>
                  <span className="text-xs font-medium text-slate-400 font-body">Locked Badge</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};