import React, { useState, startTransition } from 'react';
import { Settings } from './pages/Settings';
import {
  Rocket,
  Users,
  Calendar as CalendarIcon,
  LayoutDashboard,
  X,
  Check,
  CheckCircle2,
  User,
  Bell,
  Clock,
  CalendarCheck,
  Medal,
  Search
} from 'lucide-react';

import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Import your UI Components
import { Toast } from './components/Toast';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Community } from './pages/Community';
import { Resources } from './pages/Resources';
// CHANGED: Assuming you renamed SavedMissions.tsx to Saved.tsx as discussed!
import { Saved } from './pages/Saved'; 
import { Calendar } from './pages/Calendar';
import { Profile } from './pages/Profile';
import { Mentors } from './pages/Mentors';
import { About } from './pages/About';
import { LandingPage } from './pages/LandingPage';

// 2. Import your Data
import {
  BUSINESS_TYPES,
  AVAILABLE_MENTOR_SLOTS,
  BLUEPRINTS,
  INITIAL_COMMUNITIES,
  INITIAL_USERS,
  INITIAL_POSTS,
  WEEKLY_CHALLENGE,
  INITIAL_EVENTS,
  INITIAL_MENTORS,
  INITIAL_PROFILE,
} from './data/mockData';

const FOUNDER_QUIZ = [
  {
    id: 'budget',
    question: 'What is your initial capital allocation?',
    options: [
      { label: 'Bootstrapped ($0 - $500)', value: 'low' },
      { label: 'Moderate ($500 - $2,000)', value: 'med' },
      { label: 'Funded ($2,000+)', value: 'high' },
    ],
  },
  {
    id: 'time',
    question: 'What is your weekly time availability?',
    options: [
      { label: 'Side Hustle (5-10 hours)', value: 'part' },
      { label: 'Half-Time (10-20 hours)', value: 'med' },
      { label: 'All In (30+ hours)', value: 'full' },
    ],
  },
  {
    id: 'skill',
    question: 'Which core competency describes you best?',
    options: [
      { label: 'Engineering & Logic (Code, Systems)', value: 'tech' },
      { label: 'Design & Creativity (Art, Brand)', value: 'creative' },
      { label: 'People & Strategy (Sales, Marketing)', value: 'social' },
    ],
  },
  {
    id: 'goal',
    question: 'What is your primary strategic objective?',
    options: [
      { label: 'Passive Income & Automation', value: 'passive' },
      { label: 'High Growth & Scaling', value: 'scale' },
      { label: 'Lifestyle & Independence', value: 'lifestyle' },
    ],
  },
  {
    id: 'risk',
    question: 'What is your risk tolerance?',
    options: [
      { label: 'Low (Proven, steady models)', value: 'low' },
      { label: 'Medium (Calculated risks)', value: 'med' },
      { label: 'High (Disruptive moonshots)', value: 'high' },
    ],
  },
];

// --- Main App Component ---

export default function AccelerateApp() {
  const [accessibility, setAccessibility] = useState(() => {
    const saved = localStorage.getItem('acc_accessibility');
    return saved ? JSON.parse(saved) : {
      highContrast: false,
      reduceMotion: false,
      dyslexicFont: false,
      darkMode: false
    };
  });
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [globalSearch, setGlobalSearch] = useState('');
  const [viewingUserId, setViewingUserId] = useState('me');
  const [selectedField, setSelectedField] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showDnaTooltip, setShowDnaTooltip] = useState(false);

  const [expandedMentorId, setExpandedMentorId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [myBusinesses, setMyBusinesses] = useState(() => {
    const saved = localStorage.getItem('acc_my_businesses');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedMissions, setSavedMissions] = useState(() => {
    const saved = localStorage.getItem('acc_saved_missions');
    return saved ? JSON.parse(saved) : [];
  });

  const [expandedSavedMission, setExpandedSavedMission] = useState(null);

  const [events, setEvents] = useState([
    // --- EARLY TO MID JUNE ---
    { id: 'j1', title: 'Team Sync', date: '2026-06-02', time: '10:00 AM', type: 'Meeting' },
    { id: 'j2', title: 'MVP Wireframes Due', date: '2026-06-05', time: '11:59 PM', type: 'Deadline' },
    { id: 'j3', title: 'Local Founder Mixer', date: '2026-06-08', time: '6:00 PM', type: 'Networking' },
    { id: 'j4', title: 'Intro to React', date: '2026-06-10', time: '1:00 PM', type: 'Learning' },
    { id: 'j5', title: 'Marketing Strategy', date: '2026-06-10', time: '4:00 PM', type: 'Workshop' }, 
    { id: 'j6', title: 'Q&A with Angel Investor', date: '2026-06-15', time: '2:00 PM', type: 'Expert Session' },
    { id: 'j7', title: 'Logo Design Review', date: '2026-06-18', time: '11:00 AM', type: 'Workshop' },
    { id: 'j8', title: 'FBLA Nationals Prep', date: '2026-06-22', time: '3:00 PM', type: 'Meeting' },
    { id: 'j9', title: 'Financial Modeling', date: '2026-06-25', time: '10:00 AM', type: 'Learning' },
    { id: 'j10', title: 'Beta Testing Closes', date: '2026-06-27', time: '5:00 PM', type: 'Deadline' },
  
    // --- NLC PRESENTATION WEEK (THE "LIVE" EVENTS) ---
    { id: 'n1', title: 'NLC Opening Session Networking', date: '2026-06-29', time: '4:00 PM', type: 'Networking' },
    { id: 'n2', title: 'Legal Q&A with Startup Lawyer', date: '2026-06-30', time: '2:00 PM', type: 'Expert Session' },
    { id: 'n3', title: 'Last-Minute Pitch Polish', date: '2026-06-30', time: '5:00 PM', type: 'Workshop' }, 
    { id: 'n4', title: 'Live Pitch Practice', date: '2026-07-01', time: '11:00 AM', type: 'Workshop' },
    { id: 'n5', title: 'Founders Lunch', date: '2026-07-01', time: '12:30 PM', type: 'Networking' }, 
    { id: 'n6', title: 'FBLA Awards Ceremony', date: '2026-07-02', time: '6:00 PM', type: 'Networking' },
    
    // --- POST-NLC & JULY ---
    { id: 'jl1', title: 'Post-NLC Debrief', date: '2026-07-05', time: '10:00 AM', type: 'Meeting' },
    { id: 'jl2', title: 'App Architecture', date: '2026-07-08', time: '2:00 PM', type: 'Learning' },
    { id: 'jl3', title: 'Social Media Ads', date: '2026-07-10', time: '1:00 PM', type: 'Workshop' },
    { id: 'jl3s', title: 'Roadmap Discussion', date: '2026-07-10', time: '4:00 PM', type: 'Meeting'},
    { id: 'jl4', title: 'Cap Table Basics', date: '2026-07-12', time: '11:00 AM', type: 'Expert Session' },
    { id: 'jl5', title: 'Weekly Check-in', date: '2026-07-12', time: '3:00 PM', type: 'Meeting' }, 
    { id: 'jl6', title: 'Group Study Session', date: '2026-07-14', time: '5:00 PM', type: 'Learning' }, 
    { id: 'jl7', title: 'UX/UI Feedback Loop', date: '2026-07-14', time: '1:00 PM', type: 'Workshop' },
    
    // --- LATE JULY ---
    { id: 'jl8', title: 'SEO Optimization', date: '2026-07-17', time: '10:00 AM', type: 'Learning' },
    { id: 'jl9', title: 'How to Hire', date: '2026-07-20', time: '2:00 PM', type: 'Expert Session' },
    { id: 'jl10', title: 'MVP Public Launch', date: '2026-07-22', time: '8:00 AM', type: 'Deadline' },
    { id: 'jl11', title: 'Angel Investor Mixer', date: '2026-07-22', time: '7:00 PM', type: 'Networking' }, 
    { id: 'jl12', title: 'Growth Hacking', date: '2026-07-25', time: '11:00 AM', type: 'Workshop' },
    { id: 'jl13', title: 'Scaling Operations', date: '2026-07-28', time: '1:00 PM', type: 'Learning' },
    { id: 'jl14', title: 'Board Meeting', date: '2026-07-28', time: '4:00 PM', type: 'Meeting' }, 
    { id: 'jl15', title: 'July Monthly Review', date: '2026-07-31', time: '3:00 PM', type: 'Meeting' }
  ]);

  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    time: '',
    date: '',
    type: 'Meeting',
  });

  const [communities, setCommunities] = useState(INITIAL_COMMUNITIES || []);
  const [communityUsers, setCommunityUsers] = useState(INITIAL_USERS || []);
  const [posts, setPosts] = useState(INITIAL_POSTS || []);
  const [activeCommunityId, setActiveCommunityId] = useState('all');

  const [savedResources, setSavedResources] = useState(() => {
    const saved = localStorage.getItem('acc_saved_resources');
    return saved ? JSON.parse(saved) : [];
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('acc_user_profile');
    if (saved) {
      const parsedProfile = JSON.parse(saved);
      
      if (parsedProfile.badges) {
        parsedProfile.badges = parsedProfile.badges.map(badge => {
          let IconComponent = Medal; // Default fallback
          
          if (badge.name === 'First Launch') IconComponent = Rocket;
          if (badge.name === 'Verified') IconComponent = CheckCircle2;
          if (badge.name === 'Early Adopter') IconComponent = Medal;
          
          return { ...badge, icon: IconComponent };
        });
      }
      return parsedProfile;
    }
    return INITIAL_PROFILE || {};
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(INITIAL_PROFILE || {});

  const [mentors, setMentors] = useState(INITIAL_MENTORS || []);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState(null);
  const [bookingSlot, setBookingSlot] = useState(null);

  const [challengeSteps, setChallengeSteps] = useState(WEEKLY_CHALLENGE.steps);
  const [isChallengeComplete, setIsChallengeComplete] = useState(false);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "You earned the 'First Launch' badge!", time: '2m ago', read: false },
    { id: 2, text: 'Sarah Chen replied to your post.', time: '1h ago', read: false },
    { id: 3, text: 'New resource added: Legal Templates', time: '1d ago', read: true },
  ]);

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  // --- DATA PERSISTENCE ENGINE ---
  // Syncs app state to localStorage whenever key data changes
  React.useEffect(() => {
    localStorage.setItem('acc_accessibility', JSON.stringify(accessibility));
  }, [accessibility]);

  React.useEffect(() => {
    localStorage.setItem('acc_my_businesses', JSON.stringify(myBusinesses));
  }, [myBusinesses]);

  React.useEffect(() => {
    localStorage.setItem('acc_saved_missions', JSON.stringify(savedMissions));
  }, [savedMissions]);

  React.useEffect(() => {
    localStorage.setItem('acc_saved_resources', JSON.stringify(savedResources));
  }, [savedResources]);

  React.useEffect(() => {
    localStorage.setItem('acc_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const resetApp = () => {
    if (window.confirm("Are you sure? This will delete all your missions and profile data.")) {
      localStorage.clear();
      window.location.reload(); // Refresh to reset all states to defaults
    }
  };

  const handleQuizAnswer = (value) => {
    const currentQ = FOUNDER_QUIZ[quizStep];
    const newAnswers = { ...quizAnswers, [currentQ.id]: value };
    setQuizAnswers(newAnswers);

    if (quizStep < FOUNDER_QUIZ.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const allTypes = Object.entries(BUSINESS_TYPES).flatMap(
        ([fieldId, businesses]) => businesses.map((b) => ({ ...b, fieldId }))
      );

      const scored = allTypes.map((biz) => {
        let score = 50; 
        const str = (biz.name + ' ' + biz.id).toLowerCase();

        if (newAnswers.budget === 'low' && (str.includes('freelance') || str.includes('newsletter') || str.includes('service') || str.includes('print'))) score += 20;
        if (newAnswers.budget === 'high' && (str.includes('saas') || str.includes('platform') || str.includes('app') || str.includes('ai'))) score += 20;
        if (newAnswers.skill === 'tech' && (str.includes('app') || str.includes('saas') || str.includes('code') || str.includes('tech'))) score += 25;
        if (newAnswers.skill === 'creative' && (str.includes('design') || str.includes('art') || str.includes('brand') || str.includes('clothing') || str.includes('content'))) score += 25;
        if (newAnswers.skill === 'social' && (str.includes('agency') || str.includes('consulting') || str.includes('marketing') || str.includes('sales'))) score += 25;
        if (newAnswers.time === 'part' && (str.includes('freelance') || str.includes('content') || str.includes('drop'))) score += 15;
        if (newAnswers.goal === 'passive' && (str.includes('drop') || str.includes('print') || str.includes('course'))) score += 15;
        if (newAnswers.goal === 'scale' && (str.includes('saas') || str.includes('ai') || str.includes('app'))) score += 15;

        score += str.length % 5; 

        return { ...biz, matchScore: Math.min(score + 10, 99) }; 
      });

      const top3 = scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
      setQuizResult(top3);
    }
  };

  const resetQuiz = () => {
    setIsQuizOpen(false);
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResult(null);
  };

  const [activeBusinessId, setActiveBusinessId] = useState(null);
  const activeBiz = myBusinesses.find((b) => b.id === activeBusinessId);

  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addToast = (message, type = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
  };

  const getAvatar = (seed) => {
    if (seed && seed.startsWith('http')) return seed;
    const avatarMap = {
      Alex: 'photo-1500648767791-00dcc994a43e',
      Sarah: 'photo-1494790108377-be9c29b29330',
      Marcus: 'photo-1507003211169-0a1dd7228f2d',
      Elena: 'photo-1438761681033-6461ffad8d80',
      Lee: 'photo-1472099645785-5658abf4ff4e',
      Raj: 'photo-1506794778202-cad84cf45f1d',
      Jordan: 'photo-1539571696357-5a69c17a67c6',
      Casey: 'photo-1517841905240-472988babdf9',
      Maya: 'photo-1534528741775-53994a69daeb',
      Liam: 'photo-1500917293891-ef795e70e1f6',
      Sophia: 'photo-1524504388940-b1a1728306b0',
      Noah: 'photo-1504257432389-52343af06ae3',
      Felix: 'photo-1599566150163-29194dcaad36', 
      Olivia: 'photo-1580489944761-15a19d654956',
      Ethan: 'photo-1522075469751-3a6694fb2f61',
      Isabella: 'photo-1544005313-94ddf0286df2',
      Devon: 'photo-1519345182560-3f2917c472ef',
      Nina: 'photo-1487412720507-e7ab37603c6f',
      Tariq: 'photo-1506794778202-cad84cf45f1d',
      Chloe: 'photo-1548142813-c348350df52b',
      Max: 'photo-1570295999919-56ceb5ecca61',
    };
    const id = avatarMap[seed] || 'photo-1511367461989-f85a21fda167';
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=150&q=80`;
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((t) => t.id !== id));
  };

  const handleNav = (tabId) => {
    startTransition(() => {
      if (tabId === 'profile') setViewingUserId('me');
      setActiveTab(tabId);
      setGlobalSearch(''); 
      
      const mainContainer = document.getElementById('main-scroll-container');
      if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // Function to add or remove a resource from the backpack
  const toggleSaveResource = (resourceObj) => {
    setSavedResources((prev) => {
      const isAlreadySaved = prev.some((r) => r.id === resourceObj.id);
      if (isAlreadySaved) {
        // If it's already saved, remove it
        return prev.filter((r) => r.id !== resourceObj.id);
      } else {
        // If it's not saved, add it to the list
        return [...prev, resourceObj];
      }
    });
  };

  // Helper to jump straight to a resource tab from the Saved page
  const navigateToResource = (subTabName) => {
    setActiveTab('resources');
  };

  const toggleSaveMission = (e, typeId) => {
    e.stopPropagation();
    if (savedMissions.includes(typeId)) {
      setSavedMissions(savedMissions.filter((id) => id !== typeId));
      addToast('Removed from saved missions', 'info');
    } else {
      setSavedMissions([...savedMissions, typeId]);
      addToast('Mission saved for later', 'success');
    }
  };
  const handleGenerateBlueprint = async (promptText) => {
    if (!promptText || !promptText.trim()) return false;

    setIsGenerating(true);

    // 1. THE 11-SECOND PRESENTATION TIMER
    // This guarantees your loading animation plays for exactly 11 seconds.
    const minWaitTime = new Promise((resolve) => setTimeout(resolve, 11000));

    // 2. THE 4x3 FALLBACK LOGIC
    const generateFallback = () => {
      return {
        description: "A comprehensive, scalable architecture designed for enterprise-grade execution.",
        isAiGenerated: true,
        terms: [
          { term: "ICP", def: "Ideal Customer Profile. The perfect demographic for your solution." },
          { term: "CAC", def: "Customer Acquisition Cost. Total marketing spend to acquire one user." },
          { term: "Telemetry", def: "Automated data collection from remote points to track performance." }
        ],
        funding: [
          { title: "Pre-Seed Angel Round", type: "Equity", amount: "$50k - $250k", desc: "Initial capital to build the core architecture." }
        ],
        tools: [
          { name: "Vercel", desc: "Production Infrastructure", link: "vercel.com" },
          { name: "PostHog", desc: "Product Analytics", link: "posthog.com" }
        ],
        stages: [
          {
            name: "Phase 1: Validation & Research",
            duration: "2 Weeks",
            tasks: [
              { title: "Define Ideal Customer Profile (ICP)", detail: "Map the exact demographics, pain points, and budget of your target user." },
              { title: "Competitor Matrix Analysis", detail: "Identify 3 direct competitors and map their feature deficiencies." },
              { title: "Waitlist Infrastructure", detail: "Deploy a high-conversion landing page to capture early-adopter emails." }
            ]
          },
          {
            name: "Phase 2: Minimum Viable Architecture",
            duration: "1 Month",
            tasks: [
              { title: "Core Feature Isolation", detail: "Use the Pareto Principle to isolate the 20% of features that deliver 80% of the value." },
              { title: "High-Fidelity Prototyping", detail: "Establish your design system and construct user flows in Figma." },
              { title: "Tech Stack Initialization", detail: "Configure your repository, strict type-checking via TSX, and global state management." }
            ]
          },
          {
            name: "Phase 3: Go-to-Market Strategy",
            duration: "3 Weeks",
            tasks: [
              { title: "Content Distribution Pipeline", detail: "Establish an automated calendar for social media and organic SEO growth." },
              { title: "Cold Outreach Sequencing", detail: "Draft automated email workflows targeting B2B leads." },
              { title: "Beta Cohort Onboarding", detail: "Manually onboard your first 50 users to ensure a frictionless experience." }
            ]
          },
          {
            name: "Phase 4: Optimization & Scaling",
            duration: "Ongoing",
            tasks: [
              { title: "Telemetry Integration", detail: "Implement analytics tracking to monitor user retention and drop-off points." },
              { title: "Qualitative Feedback Loops", detail: "Schedule 1-on-1 interviews with power users to guide the next development sprint." },
              { title: "Iterative Release Cycle", detail: "Establish a CI/CD pipeline for deploying bug fixes and structural upgrades rapidly." }
            ]
          }
        ]
      };
    };

    let finalBlueprintData = null;

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: { responseMimeType: 'application/json' },
      });

      const prompt = `
        You are an expert startup advisor. Create a practical, step-by-step business blueprint for: "${promptText}".
        You must return a valid JSON object matching this exact structure:
        {
          "description": "A 1-sentence description of the business.",
          "terms": [
            { "term": "Industry Term 1", "def": "Definition" },
            { "term": "Industry Term 2", "def": "Definition" }
          ],
          "funding": [
            { "title": "Grant/Loan Name", "type": "Grant/Loan", "amount": "$X", "desc": "Brief description" }
          ],
          "tools": [
            { "name": "Software Tool", "desc": "What it does", "link": "example.com" }
          ],
          "stages": [
            {
              "name": "Phase 1: Concept",
              "duration": "2 Weeks",
              "tasks": [
                { "title": "Task 1", "detail": "Specific action item" },
                { "title": "Task 2", "detail": "Specific action item" }
              ]
            },
            {
              "name": "Phase 2: Setup",
              "duration": "1 Month",
              "tasks": [
                 { "title": "Task 1", "detail": "Specific action item" }
              ]
            },
            {
              "name": "Phase 3: Building",
              "duration": "1 Month",
              "tasks": [
                 { "title": "Task 1", "detail": "Specific action item" }
              ]
            },
            {
              "name": "Phase 4: Launch",
              "duration": "Ongoing",
              "tasks": [
                 { "title": "Task 1", "detail": "Specific action item" }
              ]
            }
          ]
        }
      `;

      // 3. WAIT FOR BOTH THE API *AND* THE 11 SECONDS TO FINISH
      const [result] = await Promise.all([
        model.generateContent(prompt),
        minWaitTime
      ]);

      const responseText = result.response.text();
      finalBlueprintData = JSON.parse(responseText);
      
    } catch (error) {
      console.warn('API call failed. Waiting for presentation timer to finish before applying fallback...');
      
      // If it fails instantly, STILL wait the 11 seconds
      await minWaitTime;
      finalBlueprintData = generateFallback();
    }

    // 4. APPLY THE DATA TO STATE
    const newId = `ai_${Date.now()}`;

    BLUEPRINTS[newId] = {
      title: `AI Blueprint: ${promptText.substring(0, 30)}...`,
      description: finalBlueprintData.description,
      terms: finalBlueprintData.terms,
      funding: finalBlueprintData.funding,
      tools: finalBlueprintData.tools,
      stages: finalBlueprintData.stages,
    };

    const mockBlueprint = {
      id: newId,
      name: promptText.length > 20 ? promptText.substring(0, 20) + '...' : promptText,
      type: newId,
      field: 'custom',
      isAiGenerated: true,
      progress: 0,
      completedTasks: [],
    };

    setMyBusinesses((prev) => [...prev, mockBlueprint]);
    setActiveBusinessId(mockBlueprint.id);
    
    // CRITICAL: We DO NOT call setActiveTab('dashboard') here anymore!
    setIsGenerating(false);
    return true; // Signals Home.tsx to show the Success screen
  };

  const handleStartBusiness = (typeId, fieldId, name) => {
    const newBiz = {
      id: `biz_${Date.now()}`,
      name: name || 'New Venture',
      type: typeId,
      field: fieldId,
      progress: 0,
      completedTasks: [],
    };
    setMyBusinesses([...myBusinesses, newBiz]);
    setActiveBusinessId(newBiz.id);
    setActiveTab('dashboard');
    addToast('New mission initialized!', 'success');
  };

  const handleRenameBusiness = (e, id, currentName) => {
    e.stopPropagation();
    const newName = window.prompt('Rename your mission:', currentName);
    if (newName && newName.trim() !== '') {
      setMyBusinesses(
        myBusinesses.map((b) => (b.id === id ? { ...b, name: newName } : b))
      );
      addToast('Mission renamed successfully', 'success');
    }
  };

  const handleDeleteBusiness = (e, id) => {
    e.stopPropagation();
    const updatedBusinesses = myBusinesses.filter((b) => b.id !== id);
    setMyBusinesses(updatedBusinesses);
    if (id === activeBusinessId) {
      setActiveBusinessId(
        updatedBusinesses.length > 0 ? updatedBusinesses[0].id : null
      );
    }
    addToast('Mission archived.', 'info');
  };

  const toggleTask = (taskName) => {
    if (!activeBiz) return;

    const isCompleted = activeBiz.completedTasks.includes(taskName);
    let newCompleted = [];
    if (isCompleted) {
      newCompleted = activeBiz.completedTasks.filter((t) => t !== taskName);
    } else {
      newCompleted = [...activeBiz.completedTasks, taskName];
    }

    const blueprint = BLUEPRINTS[activeBiz.type] || BLUEPRINTS['default'];

    let totalTasks = 0;
    blueprint.stages.forEach((stage) => {
      totalTasks += stage.tasks.length;
    });

    const newProgress = Math.round((newCompleted.length / totalTasks) * 100);

    const updatedBiz = {
      ...activeBiz,
      completedTasks: newCompleted,
      progress: newProgress,
    };
    setMyBusinesses(
      myBusinesses.map((b) => (b.id === activeBiz.id ? updatedBiz : b))
    );
  };

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'Networking':
        return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'Expert Session':
        return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'Workshop':
        return 'bg-orange-100 border-orange-300 text-orange-700';
      case 'Deadline':
        return 'bg-red-100 border-red-300 text-red-700';
      case 'Learning':
        return 'bg-green-100 border-green-300 text-green-700';
      default:
        return 'bg-slate-100 border-slate-300 text-slate-700';
    }
  };

  const handleAddEvent = (e) => {
    if (e) e.preventDefault();
    if (!newEventForm.title) return;

    const newEvent = {
      id: Date.now(),
      title: newEventForm.title,
      date: newEventForm.date || formatLocalDate(new Date()),
      time: newEventForm.time,
      type: newEventForm.type || 'Meeting',
    };

    setEvents([...events, newEvent]);
    setNewEventForm({ title: '', time: '', date: '', type: 'Meeting' });
    setIsEventFormOpen(false);
    addToast('Event added to calendar', 'success');
  };

  const handleDeleteEvent = () => {
    if (!editingEventId) return;
    setEvents(events.filter((evt) => evt.id !== editingEventId));
    setIsEventFormOpen(false);
    setEditingEventId(null);
    addToast('Event removed', 'info');
  };

  const startEditing = (evt) => {
    setEditingEventId(evt.id);
    setNewEventForm({
      title: evt.title,
      time: evt.time,
      date: evt.date,
      type: evt.type,
    });
    setIsEventFormOpen(true);
  };

  const saveEdit = (e) => {
    if (e) e.preventDefault();
    const updatedEvents = events.map((evt) => {
      if (evt.id === editingEventId) {
        return { ...evt, ...newEventForm };
      }
      return evt;
    });
    setEvents(updatedEvents);
    setEditingEventId(null);
    setNewEventForm({ title: '', time: '', date: '', type: 'Meeting' });
    setIsEventFormOpen(false);
    addToast('Event updated successfully', 'success');
  };

  const openBookingModal = (mentor) => {
    setSelectedMentorForBooking(mentor);
    setIsBookingModalOpen(true);
    setBookingSlot(null);
  };

  const handleConfirmBooking = () => {
    if (!selectedMentorForBooking || !bookingSlot) return;

    const slot = AVAILABLE_MENTOR_SLOTS.find((s) => s === bookingSlot);
    if (!slot) return;

    const newEvent = {
      id: Date.now(),
      title: `Mentorship: ${selectedMentorForBooking.name}`,
      date: slot.date,
      time: slot.time,
      type: 'Expert Session',
    };

    setEvents([...events, newEvent]);
    setMentors(
      mentors.map((m) =>
        m.id === selectedMentorForBooking.id ? { ...m, available: false } : m
      )
    );
    setIsBookingModalOpen(false);
    addToast(
      `Session booked with ${selectedMentorForBooking.name}!`,
      'success'
    );
  };

  const toggleLikePost = (id) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  const handleCreatePost = (content, communityIds) => {
    if (!content.trim()) return;

    // Normalize to an array (handles both the new multi-select and any old single-select code)
    const ids = Array.isArray(communityIds) ? communityIds : [communityIds === 'all' ? 'c1' : communityIds];

    // Map through the array to create a distinct post object for each community
    const newPosts = ids.map(commId => ({
      id: `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      authorId: 'me',
      communityId: commId,
      content: content,
      tags: ['General'],
      likes: 0,
      comments: [],
      liked: false,
      timestamp: 'Just now',
    }));

    // Do ONE safe state update with all the new posts at the same time
    setPosts(prevPosts => [...newPosts, ...prevPosts]);
    
    // Dynamic toast message based on how many communities they selected
    addToast(`Successfully published to ${ids.length} communit${ids.length === 1 ? 'y' : 'ies'}!`, 'success');
  };

  const handleAddComment = (postId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: `cm_${Date.now()}`,
      authorId: 'me',
      text: text,
      timestamp: 'Just now',
    };
    setPosts(
      posts.map((p) =>
        p.id === postId
          ? { ...p, comments: [...(p.comments || []), newComment] }
          : p
      )
    );
  };

  const handleDropdownAction = (action, postId) => {
    if (action === 'report') addToast('Post flagged for review.', 'info');
    if (action === 'mute') addToast('User muted.', 'info');
    if (action === 'delete') {
      setPosts(posts.filter((p) => p.id !== postId));
      addToast('Post deleted.', 'info');
    }
  };

  const handleSharePost = (id) => {
    addToast('Link copied to clipboard!', 'success');
  };

  const toggleChallengeStep = (id) => {
    const newSteps = challengeSteps.map((s) =>
      s.id === id ? { ...s, done: !s.done } : s
    );
    setChallengeSteps(newSteps);
    if (newSteps.every((s) => s.done) && !isChallengeComplete) {
      setIsChallengeComplete(true);
      const newBadge = {
        id: 'b_challenge_1',
        name: 'Early Adopter',
        icon: Medal,
        color: 'text-yellow-400 bg-yellow-900/30',
      };
      if (!userProfile.badges.find((b) => b.name === 'Early Adopter')) {
        setUserProfile({
          ...userProfile,
          badges: [...userProfile.badges, newBadge],
        });
      }
      addToast('Challenge Complete! Badge Earned.', 'success');
    }
  };

  const toggleJoinCommunity = (id) => {
    setCommunities(
      communities.map((c) =>
        c.id === id
          ? {
              ...c,
              joined: !c.joined,
              members: c.joined ? c.members - 1 : c.members + 1,
            }
          : c
      )
    );
    if (activeCommunityId === id) {
      setActiveCommunityId('all');
    }
    const comm = communities.find((c) => c.id === id);
    addToast(
      comm.joined ? `Left ${comm.name}` : `Joined ${comm.name}`,
      'success'
    );
  };

  const startEditingProfile = () => {
    setTempProfile({ ...userProfile });
    setIsEditingProfile(true);
  };

  const saveProfile = () => {
    setUserProfile({ ...tempProfile });
    setIsEditingProfile(false);
    addToast('Profile updated successfully', 'success');
  };

  

  const handleAvatarChange = () => {
    const newUrl = window.prompt(
      'Enter an image URL for your new profile picture (e.g., a link from Imgur or Unsplash):'
    );
    if (newUrl && newUrl.trim() !== '') {
      setTempProfile({ ...tempProfile, avatarSeed: newUrl });
    }
  };

  const handleMarkNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  const getAuthor = (id) => {
    if (id === 'me') {
      return {
        name: userProfile?.name || 'Me',
        role: 'Entrepreneur',
        avatar: userProfile?.avatarSeed || 'Felix',
        followed: false,
      };
    }
    return (
      communityUsers.find((u) => u.id === id) || {
        name: 'Unknown',
        role: 'Member',
        avatar: 'Unknown',
      }
    );
  };

  const getCommunity = (id) => communities.find((c) => c.id === id);

  const getFilteredPosts = () => {
    let filtered = [...posts];
    if (activeCommunityId !== 'all') {
      filtered = filtered.filter((p) => p.communityId === activeCommunityId);
    }
    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className={`h-screen text-slate-900 flex relative overflow-hidden bg-[#FDFCF6] transition-all duration-500
      ${accessibility.highContrast ? 'contrast-125 saturate-150' : ''} 
      ${accessibility.reduceMotion ? '[&_*]:!transition-none [&_*]:!animate-none' : ''}
      ${accessibility.dyslexicFont ? 'font-serif tracking-wide' : 'font-sans'}
    `}>
      <style>{`
        @keyframes search-match-pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(99,102,241,1), 0 0 20px rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 0 2px rgba(129,140,248,1), 0 0 35px rgba(129,140,248,0.7); }
        }
        .search-match {
          animation: search-match-pulse 2s infinite alternate !important;
          border-color: rgba(99,102,241,0.8) !important;
          transform: translateY(-2px) scale(1.01);
          transition: transform 0.3s ease;
          z-index: 10;
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-80px) scale(1.05); }
        }
        @keyframes float-y-reverse {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(80px) scale(1.05); }
        }

        /* --- GLOBAL HIGH CONTRAST OVERRIDES --- */
        ${accessibility.highContrast ? `
          /* 1. Convert all glassmorphism cards to solid, high-contrast blocks */
          .backdrop-blur-xl, .backdrop-blur-md, .bg-white\\/60, .bg-white\\/70, .bg-white\\/80 {
            background-color: #ffffff !important;
            backdrop-filter: none !important;
            border: 2px solid #0f172a !important; /* Thick dark slate border */
            box-shadow: 4px 4px 0px rgba(15, 23, 26, 0.1) !important; /* Crisp edge shadow */
          }
          
          /* 2. Darken all secondary gray text for WCAG compliance */
          .text-slate-400, .text-slate-500, .text-slate-600 {
            color: #1e293b !important; 
            font-weight: 600 !important;
          }

          /* 3. Make subtle borders much darker */
          .border-slate-100, .border-slate-200, .border-white\\/50, .border-white\\/40 {
            border-color: #94a3b8 !important;
          }
        ` : ''}
        /* --- PREMIUM MIDNIGHT DARK MODE OVERRIDES --- */
        ${accessibility.darkMode ? `
          /* 1. Deep Slate Backgrounds */
          body, .bg-\\[\\#FDFCF6\\] { 
            background-color: #020617 !important; /* slate-950 */
          }
          
          /* 2. Convert White Glass to Dark Frosted Glass */
          .bg-white\\/40, .bg-white\\/60, .bg-white\\/70, .bg-white\\/80, .bg-white\\/90, .bg-white {
            background-color: rgba(15, 23, 42, 0.6) !important; 
            border-color: rgba(51, 65, 85, 0.5) !important; 
            color: #f8fafc !important;
          }

          /* 3. Refine Base Grays (Prevent the muddy look) */
          .bg-slate-50, .bg-slate-100, .bg-slate-200 {
            background-color: rgba(30, 41, 59, 0.4) !important; 
            border-color: rgba(51, 65, 85, 0.5) !important; 
          }

          /* --- THE SPECIFIC UI FIXES --- */

          /* FIX 1: Hero Title on Browse Page */
          /* Converts the dark text gradient to a glowing silver/white */
          .from-slate-900.to-slate-800 {
            background-image: linear-gradient(to bottom, #ffffff, #94a3b8) !important;
          }

          /* FIX 2 & 3: Sidebar Hovers & Subtab Switchers */
          /* Replaces muddy gray hovers with a subtle, glowing indigo */
          .hover\\:bg-slate-50\\/50:hover, .hover\\:bg-slate-50:hover, .hover\\:bg-slate-100:hover, .hover\\:bg-white\\/50:hover {
            background-color: rgba(99, 102, 241, 0.15) !important;
            color: #a5b4fc !important;
          }

          /* FIX 4: Mission Control Dashboard Background */
          /* Converts the light holographic sheen into a deep space gradient */
          .from-indigo-50\\/30 {
            background-image: linear-gradient(to bottom right, rgba(79, 70, 229, 0.15), rgba(2, 6, 23, 0.8), rgba(168, 85, 247, 0.15)) !important;
          }

          /* FIX 5: Blueprint Steps & Active Indicators */
          /* Makes completed tasks and active blocks pop with neon indigo */
          .bg-indigo-50 {
            background-color: rgba(79, 70, 229, 0.1) !important;
            border-color: rgba(79, 70, 229, 0.3) !important;
          }
          .bg-indigo-100 {
            background-color: rgba(79, 70, 229, 0.2) !important;
          }

          /* --- TEXT VISIBILITY TUNING --- */
          
          /* General text inversions */
          .text-slate-900, .text-slate-800, .text-slate-700 { 
            color: #f8fafc !important; 
          }
          .text-slate-600, .text-slate-500, .text-slate-400 { 
            color: #cbd5e1 !important; /* Lightened from 400 for better contrast */
          }
          
          /* Force active active tabs and highlights to be bright pastel indigo */
          .text-indigo-700, .text-indigo-800, .text-indigo-900 {
            color: #a5b4fc !important;
          }

          /* The Magic: Make the Background Auroras Glow */
          .mix-blend-multiply {
            mix-blend-mode: screen !important;
            opacity: 0.15 !important; 
          }
        ` : ''}     
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-[60%] h-[60%] rounded-full blur-3xl opacity-[0.15] animate-blob"
          style={{
            backgroundColor: '#fbbf24',
            bottom: '-15%',
            right: '-5%',
            animation: 'aurora-3 25s infinite alternate',
          }}
        ></div>
        <div
          className="absolute w-[60%] h-[60%] rounded-full blur-3xl opacity-[0.15] animate-blob"
          style={{
            backgroundColor: '#c084fc',
            bottom: '-20%',
            left: '10%',
            animation: 'aurora-2 22s infinite alternate',
          }}
        ></div>
        <div
          className="absolute w-[60%] h-[60%] rounded-full blur-3xl opacity-[0.15] animate-blob"
          style={{
            backgroundColor: '#818cf8',
            top: '-10%',
            right: '-20%',
            animation: 'aurora-4 25s infinite alternate',
          }}
        ></div>
        <div
          className="absolute w-[70%] h-[70%] rounded-full blur-3xl opacity-[0.15] animate-blob"
          style={{
            backgroundColor: '#a78bfa',
            top: '-20%',
            left: '-10%',
            animation: 'aurora-1 20s infinite alternate',
          }}
        ></div>
      </div>

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {!hasEnteredApp ? (
        <LandingPage onEnter={() => setHasEnteredApp(true)} />
      ) : (
        <>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={handleNav}
            onReturnHome={() => setHasEnteredApp(false)}
          />

          <main id="main-scroll-container" className="flex-1 md:ml-64 h-screen overflow-y-auto relative z-10 pb-20 md:pb-0">
            <header className="bg-white/60 backdrop-blur-xl sticky top-0 z-30 border-b border-white/50 px-6 py-4 flex items-center justify-between">
              {/* --- DYNAMIC GLOBAL SEARCH BAR --- */}
              <div className="flex-1 max-w-lg relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'home' ? 'browse' : activeTab}...`}
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full bg-slate-100/50 hover:bg-slate-100 focus:bg-white border border-slate-200/50 focus:border-indigo-500 text-slate-900 rounded-full py-2.5 pl-11 pr-10 shadow-sm focus:shadow-md transition-all outline-none font-body text-sm"
                />
                {globalSearch && (
                  <button 
                    onClick={() => setGlobalSearch('')} 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2 text-slate-500 hover:bg-white/50 rounded-full transition-colors"
                  >
                    <Bell size={20} />
                    {notifications.some((n) => !n.read) && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                    )}
                  </button>

                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-xl border border-white/60 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 origin-top-right">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-900 font-display">
                          Notifications
                        </h3>
                        <button
                          onClick={handleMarkNotificationsRead}
                          className="text-xs text-indigo-600 hover:underline font-body"
                        >
                          Mark all read
                        </button>
                      </div>
                      <div className="space-y-3">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`flex items-start gap-3 p-2 rounded-lg ${
                              n.read ? 'opacity-60' : 'bg-white/50'
                            }`}
                          >
                            <div
                              className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                                n.read ? 'bg-slate-300' : 'bg-indigo-500'
                              }`}
                            ></div>
                            <div>
                              <p className="text-sm text-slate-800 font-body leading-tight">
                                {n.text}
                              </p>
                              <span className="text-xs text-slate-400 font-body">
                                {n.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => handleNav('profile')}
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-slate-900 font-body">
                      {userProfile.name}
                    </p>
                    <p className="text-xs text-cyan-600 font-body">
                      {userProfile.role}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm transition-all ${
                      activeTab === 'profile' ? 'ring-2 ring-indigo-300' : ''
                    }`}
                  >
                    <img
                      src={getAvatar(userProfile.avatarSeed)}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </header>

            <div className="p-6">
              <div key={activeTab} className="animate-enter">
                {activeTab === 'home' && (
                  <Home
                    selectedField={selectedField}
                    setSelectedField={setSelectedField}
                    savedMissions={savedMissions}
                    toggleSaveMission={toggleSaveMission}
                    handleStartBusiness={handleStartBusiness}
                    handleNav={handleNav}
                    isGenerating={isGenerating}
                    handleGenerateBlueprint={handleGenerateBlueprint}
                    isQuizOpen={isQuizOpen}
                    setIsQuizOpen={setIsQuizOpen}
                    quizStep={quizStep}
                    handleQuizAnswer={handleQuizAnswer}
                    quizResult={quizResult}
                    resetQuiz={resetQuiz}
                    showDnaTooltip={showDnaTooltip}
                    setShowDnaTooltip={setShowDnaTooltip}
                    globalSearch={globalSearch}
                  />
                )}
                {activeTab === 'dashboard' && (
                  <Dashboard
                    activeBiz={activeBiz}
                    activeBusinessId={activeBusinessId}
                    myBusinesses={myBusinesses}
                    setActiveBusinessId={setActiveBusinessId}
                    handleRenameBusiness={handleRenameBusiness}
                    handleDeleteBusiness={handleDeleteBusiness}
                    toggleTask={toggleTask}
                    expandedTask={expandedTask}
                    setExpandedTask={setExpandedTask}
                    events={events}
                    handleNav={handleNav}
                    globalSearch={globalSearch}
                  />
                )}
                {activeTab === 'community' && (
                  <Community
                    communities={communities}
                    activeCommunityId={activeCommunityId}
                    setActiveCommunityId={setActiveCommunityId}
                    toggleJoinCommunity={toggleJoinCommunity}
                    challengeSteps={challengeSteps}
                    toggleChallengeStep={toggleChallengeStep}
                    filteredPosts={filteredPosts}
                    getAuthor={getAuthor}
                    getAvatar={getAvatar}
                    getCommunity={getCommunity}
                    setViewingUserId={setViewingUserId}
                    setActiveTab={setActiveTab}
                    handleDropdownAction={handleDropdownAction}
                    handleAddComment={handleAddComment}
                    toggleLikePost={toggleLikePost}
                    handleSharePost={handleSharePost}
                    handleCreatePost={handleCreatePost}
                    globalSearch={globalSearch}
                  />
                )}
                
                {/* CHANGED: Passing the 3 new props down to Resources */}
                {activeTab === 'resources' && (
                  <Resources 
                    addToast={addToast} 
                    savedResources={savedResources} 
                    toggleSaveResource={toggleSaveResource} 
                    globalSearch={globalSearch}
                  />
                )}

                {activeTab === 'saved' && (
                  <Saved
                    savedMissions={savedMissions}
                    savedResources={savedResources}
                    toggleSaveResource={toggleSaveResource}
                    navigateToResource={navigateToResource}
                    // Passing these props in case your Saved component needs to interact with missions
                    handleStartBusiness={handleStartBusiness}
                    setActiveTab={setActiveTab}
                    toggleSaveMission={toggleSaveMission}
                    expandedSavedMission={expandedSavedMission}
                    setExpandedSavedMission={setExpandedSavedMission}
                    globalSearch={globalSearch}
                  />
                )}
                
                {activeTab === 'calendar' && (
                  <Calendar
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    events={events}
                    setEvents={setEvents}
                    isEventFormOpen={isEventFormOpen}
                    setIsEventFormOpen={setIsEventFormOpen}
                    editingEventId={editingEventId}
                    setEditingEventId={setEditingEventId}
                    newEventForm={newEventForm}
                    setNewEventForm={setNewEventForm}
                    handleAddEvent={handleAddEvent}
                    handleDeleteEvent={handleDeleteEvent}
                    startEditing={startEditing}
                    saveEdit={saveEdit}
                    getDaysInMonth={getDaysInMonth}
                    handlePrevMonth={handlePrevMonth}
                    handleNextMonth={handleNextMonth}
                    formatLocalDate={formatLocalDate}
                    getEventColor={getEventColor}
                    globalSearch={globalSearch}
                  />
                )}
                {activeTab === 'profile' && (
                  <Profile
                    viewingUserId={viewingUserId}
                    userProfile={userProfile}
                    communityUsers={communityUsers}
                    isEditingProfile={isEditingProfile}
                    setIsEditingProfile={setIsEditingProfile}
                    tempProfile={tempProfile}
                    setTempProfile={setTempProfile}
                    handleAvatarChange={handleAvatarChange}
                    saveProfile={saveProfile}
                    startEditingProfile={startEditingProfile}
                    setActiveTab={setActiveTab}
                    getAvatar={getAvatar}
                    myBusinesses={myBusinesses}
                    isChallengeComplete={isChallengeComplete}
                    globalSearch={globalSearch}
                  />
                )}
                {activeTab === 'mentors' && (
                  <Mentors
                    mentors={mentors}
                    expandedMentorId={expandedMentorId}
                    setExpandedMentorId={setExpandedMentorId}
                    openBookingModal={openBookingModal}               
                    accessibility={accessibility}
                    globalSearch={globalSearch}
                  />
                )}
                {activeTab === 'settings' && (
                  <Settings 
                    accessibility={accessibility} 
                    setAccessibility={setAccessibility} 
                    addToast={addToast}
                    onReset={resetApp} 
                    globalSearch={globalSearch}
                  />
                )}
                {activeTab === 'about' && (
                  <About 
                    globalSearch={globalSearch}
                  />
                )}
              </div>
            </div>
          </main>

          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/50 p-2 flex justify-around z-30">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`p-3 rounded-xl ${
                activeTab === 'dashboard' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400'
              }`}
            >
              <LayoutDashboard size={24} />
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`p-3 rounded-xl ${
                activeTab === 'community' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400'
              }`}
            >
              <Users size={24} />
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`p-3 rounded-xl ${
                activeTab === 'home' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400'
              }`}
            >
              <Rocket size={24} />
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`p-3 rounded-xl ${
                activeTab === 'calendar' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400'
              }`}
            >
              <CalendarIcon size={24} />
            </button>
            <button
              onClick={() => handleNav('profile')}
              className={`p-3 rounded-xl ${
                activeTab === 'profile' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400'
              }`}
            >
              <User size={24} />
            </button>
          </div>

          {isBookingModalOpen && selectedMentorForBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in zoom-in">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl w-full max-w-lg shadow-2xl p-6 relative border border-white/50">
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
                <h2 className="text-xl font-bold text-slate-900 mb-1 font-display">
                  Book Session with {selectedMentorForBooking.name}
                </h2>
                <p className="text-slate-500 text-sm mb-6 font-body">
                  {selectedMentorForBooking.role} • {selectedMentorForBooking.expertise}
                </p>
                <div className="space-y-4 mb-8">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-body">
                    Select Available Slot
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {AVAILABLE_MENTOR_SLOTS?.map((slot) => (
                      <button
                        key={slot.date + slot.time}
                        onClick={() => setBookingSlot(slot)}
                        className={`p-3 rounded-xl border text-left transition-all font-body relative overflow-hidden ${
                          bookingSlot === slot
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                            : 'border-slate-200/50 hover:border-indigo-300 bg-white/50 hover:bg-white/80'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <span
                              className={`font-bold text-sm mb-1 ${
                                bookingSlot === slot ? 'text-white' : 'text-slate-900'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <CalendarCheck
                                  size={14}
                                  className={bookingSlot === slot ? 'text-indigo-200' : 'text-indigo-600'}
                                />{' '}
                                {slot.date}
                              </span>
                            </span>
                            <span
                              className={`flex items-center gap-2 text-xs ${
                                bookingSlot === slot ? 'text-indigo-100' : 'text-slate-500'
                              }`}
                            >
                              <Clock size={12} /> {slot.time}
                            </span>
                          </div>
                          {bookingSlot === slot && (
                            <div className="bg-white/20 p-1 rounded-full">
                              <Check size={16} />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100/50">
                  <button
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-4 py-2 text-slate-500 hover:text-slate-900 text-sm font-medium font-body"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    disabled={!bookingSlot}
                    className={`px-6 py-2 rounded-lg text-white text-sm font-bold transition-colors font-body ${
                      bookingSlot
                        ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                        : 'bg-slate-300 cursor-not-allowed'
                    }`}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}