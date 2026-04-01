import React, { useState, useEffect, startTransition } from 'react';
import {
  Rocket,
  Zap,
  Users,
  Calendar as CalendarIcon,
  BookOpen,
  LayoutDashboard,
  ArrowLeft,
  Plus,
  Search,
  PlayCircle,
  FileText,
  Download,
  MoreHorizontal,
  Trash2,
  Edit2,
  X,
  Heart,
  Share2,
  Check,
  MessageCircle,
  Trophy,
  Award,
  CheckCircle2,
  Circle,
  User,
  Camera,
  Video,
  Calculator,
  Send,
  ChevronDown,
  ChevronUp,
  Info,
  DollarSign,
  Book,
  Banknote,
  Wrench,
  Bell,
  Flag,
  Eye,
  AlertTriangle,
  Clock,
  CalendarCheck,
  Timer,
  Bookmark,
  Target,
  Mail,
  Briefcase,
  Linkedin,
  Globe as GlobeIcon,
  Phone,
  LogOut,
  Sparkles,
  BrainCircuit,
  Loader2,
  Medal,
  Bot,
} from 'lucide-react';

// Gemini AI
import { GoogleGenerativeAI } from '@google/generative-ai';

// 1. Import your UI Components
import { CountUp } from './components/CountUp';
import { TiltWrapper } from './components/TiltWrapper';
import { Toast } from './components/Toast';
import { RocketDashboard } from './components/RocketDashboard';
import { HeroTitle } from './components/HeroTitle';
import { FeatureCard } from './components/FeatureCard';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Community } from './pages/Community';
import { Resources } from './pages/Resources';
import { SavedMissions } from './pages/SavedMissions';
import { Calendar } from './pages/Calendar';
import { Profile } from './pages/Profile';
import { Mentors } from './pages/Mentors';
import { About } from './pages/About';
import { LandingPage } from './pages/LandingPage';

// 2. Import your Data
import {
  BUSINESS_FIELDS,
  BUSINESS_TYPES,
  AVAILABLE_MENTOR_SLOTS,
  BLUEPRINTS,
  RESOURCES,
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

const QUIZ_LOGIC = {
  low_creative: 'print_on_demand',
  low_tech: 'nocode_agency',
  low_social: 'short_form',
  med_creative: 'clothing_brand',
  med_tech: 'saas',
  med_social: 'newsletter',
  high_creative: 'art_studio',
  high_tech: 'creative_ai',
  high_social: 'event_planning',
};

// --- Main App Component ---

export default function AccelerateApp() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [animatingTask, setAnimatingTask] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  // NEW: Track whose profile we are viewing ('me' or a specific user ID)
  const [viewingUserId, setViewingUserId] = useState('me');
  const [userLevel, setUserLevel] = useState('Beginner');
  const [selectedField, setSelectedField] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showDnaTooltip, setShowDnaTooltip] = useState(false);

  //Mentor drop down
  const [expandedMentorId, setExpandedMentorId] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlueprint, setGeneratedBlueprint] = useState(null);

  // State for user's started businesses (START EMPTY)
  const [myBusinesses, setMyBusinesses] = useState([]);

  // Saved Missions State
  const [savedMissions, setSavedMissions] = useState([]);
  const [expandedSavedMission, setExpandedSavedMission] = useState(null);

  // Calendar State
  const [events, setEvents] = useState(INITIAL_EVENTS || []);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1));
  const [newEventForm, setNewEventForm] = useState({
    title: '',
    time: '',
    date: '',
    type: 'Meeting',
  });

  // Community State
  const [communities, setCommunities] = useState(INITIAL_COMMUNITIES || []);
  const [communityUsers, setCommunityUsers] = useState(INITIAL_USERS || []);
  const [posts, setPosts] = useState(INITIAL_POSTS || []);
  const [activeCommunityId, setActiveCommunityId] = useState('all'); // 'all' or specific ID

  // Profile State
  const [userProfile, setUserProfile] = useState(INITIAL_PROFILE || {});
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState(INITIAL_PROFILE || {});

  // Mentor State
  const [mentors, setMentors] = useState(INITIAL_MENTORS || []);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedMentorForBooking, setSelectedMentorForBooking] =
    useState(null);
  const [bookingSlot, setBookingSlot] = useState(null);

  // Weekly Challenge State
  const [challengeSteps, setChallengeSteps] = useState(WEEKLY_CHALLENGE.steps);
  const [isChallengeComplete, setIsChallengeComplete] = useState(false);

  // Resource State

  // Notification State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "You earned the 'First Launch' badge!",
      time: '2m ago',
      read: false,
    },
    {
      id: 2,
      text: 'Sarah Chen replied to your post.',
      time: '1h ago',
      read: false,
    },
    {
      id: 3,
      text: 'New resource added: Legal Templates',
      time: '1d ago',
      read: true,
    },
  ]);

  // Founder DNA Quiz State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const handleQuizAnswer = (value) => {
    const currentQ = FOUNDER_QUIZ[quizStep];
    const newAnswers = { ...quizAnswers, [currentQ.id]: value };
    setQuizAnswers(newAnswers);

    if (quizStep < FOUNDER_QUIZ.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Create a flat list of all businesses
      const allTypes = Object.entries(BUSINESS_TYPES).flatMap(
        ([fieldId, businesses]) => businesses.map((b) => ({ ...b, fieldId }))
      );

      // Score them dynamically based on user answers
      const scored = allTypes.map((biz) => {
        let score = 50; // Base score
        const str = (biz.name + ' ' + biz.id).toLowerCase();

        if (
          newAnswers.budget === 'low' &&
          (str.includes('freelance') ||
            str.includes('newsletter') ||
            str.includes('service') ||
            str.includes('print'))
        )
          score += 20;
        if (
          newAnswers.budget === 'high' &&
          (str.includes('saas') ||
            str.includes('platform') ||
            str.includes('app') ||
            str.includes('ai'))
        )
          score += 20;

        if (
          newAnswers.skill === 'tech' &&
          (str.includes('app') ||
            str.includes('saas') ||
            str.includes('code') ||
            str.includes('tech'))
        )
          score += 25;
        if (
          newAnswers.skill === 'creative' &&
          (str.includes('design') ||
            str.includes('art') ||
            str.includes('brand') ||
            str.includes('clothing') ||
            str.includes('content'))
        )
          score += 25;
        if (
          newAnswers.skill === 'social' &&
          (str.includes('agency') ||
            str.includes('consulting') ||
            str.includes('marketing') ||
            str.includes('sales'))
        )
          score += 25;

        if (
          newAnswers.time === 'part' &&
          (str.includes('freelance') ||
            str.includes('content') ||
            str.includes('drop'))
        )
          score += 15;
        if (
          newAnswers.goal === 'passive' &&
          (str.includes('drop') ||
            str.includes('print') ||
            str.includes('course'))
        )
          score += 15;
        if (
          newAnswers.goal === 'scale' &&
          (str.includes('saas') || str.includes('ai') || str.includes('app'))
        )
          score += 15;

        score += str.length % 5; // Add slight tiebreaker variance

        return { ...biz, matchScore: Math.min(score + 10, 99) }; // Clamp to 99% max
      });

      // Sort by highest score and take Top 3
      const top3 = scored
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 3);
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

  // --- Helpers ---

  // Helper to format date as YYYY-MM-DD in LOCAL time, not UTC
  const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
  };

  // Helper to get realistic avatars based on seed names
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
      Felix: 'photo-1599566150163-29194dcaad36', // Default User
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
    // This tells React: "Keep the UI responsive while you load the new page!"
    startTransition(() => {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
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

  // --- AI Logic ---
  const handleGenerateBlueprint = async (promptText) => {
    if (!promptText || !promptText.trim()) return;

    setIsGenerating(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
        },
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

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const aiData = JSON.parse(responseText);

      const newId = `ai_${Date.now()}`;

      BLUEPRINTS[newId] = {
        title: `AI Blueprint: ${promptText.substring(0, 30)}...`,
        description: aiData.description,
        terms: aiData.terms,
        funding: aiData.funding,
        tools: aiData.tools,
        stages: aiData.stages,
      };

      const mockBlueprint = {
        id: newId,
        name:
          promptText.length > 20
            ? promptText.substring(0, 20) + '...'
            : promptText,
        type: newId,
        field: 'custom',
        isAiGenerated: true,
        progress: 0,
        completedTasks: [],
      };

      setMyBusinesses([...myBusinesses, mockBlueprint]);
      setActiveBusinessId(mockBlueprint.id);
      setActiveTab('dashboard');
      setIsGenerating(false);
      addToast('AI Mission Generated Successfully!', 'success');
    } catch (error) {
      console.error('AI Generation failed:', error);
      setIsGenerating(false);
      addToast('Error generating blueprint. Check the console.', 'error');
    }
  };

  // --- Business Logic ---

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
    // Trigger animation
    setAnimatingTask(taskName);
    setTimeout(() => setAnimatingTask(null), 300); // Reset after 300ms

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

  // --- Calendar Logic ---

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

  // --- Mentor Logic ---

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

  // --- Community Logic ---

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

  const handleCreatePost = (content, communityId) => {
    if (!content.trim()) return;
    const newPost = {
      id: `p_${Date.now()}`,
      authorId: 'me',
      communityId: communityId === 'all' ? 'c1' : communityId,
      content: content,
      tags: ['General'],
      likes: 0,
      comments: [],
      liked: false,
      timestamp: 'Just now',
    };
    setPosts([newPost, ...posts]);
    addToast('Post published to feed', 'success');
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
    // Remove setActiveDropdown(null) from here, Community.tsx handles it now
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
    // If we leave the active community, reset to 'all'
    if (activeCommunityId === id) {
      setActiveCommunityId('all');
    }
    const comm = communities.find((c) => c.id === id);
    addToast(
      comm.joined ? `Left ${comm.name}` : `Joined ${comm.name}`,
      'success'
    );
  };

  const toggleFollowUser = (id) => {
    setCommunityUsers(
      communityUsers.map((u) =>
        u.id === id ? { ...u, followed: !u.followed } : u
      )
    );
    const user = communityUsers.find((u) => u.id === id);
    addToast(
      user.followed ? `Unfollowed ${user.name}` : `Following ${user.name}`,
      'success'
    );
  };

  // --- Profile Logic ---

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

  // --- Resource Logic ---

  const handleMarkNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  // --- Getters ---

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

  // --- UPDATED POST FILTERING: Removed Tab Logic ---
  const getFilteredPosts = () => {
    let filtered = [...posts];

    // Only filter by specific community if one is selected
    if (activeCommunityId !== 'all') {
      filtered = filtered.filter((p) => p.communityId === activeCommunityId);
    }

    return filtered;
  };

  const filteredPosts = getFilteredPosts();
  return (
    <div className="min-h-screen font-sans text-slate-900 flex relative overflow-hidden bg-[#FDFCF6]">
      {/* STRICTLY POSITIONED AURORA BLOBS */}
      <style>{`
        @keyframes float-y {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-80px) scale(1.05); }
        }
        @keyframes float-y-reverse {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(80px) scale(1.05); }
        }
      `}</style>
      {/* Ambient Background Blobs - Optimized */}
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

      {/* Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* GATEKEEPER: Show Landing Page OR App Workspace */}
      {!hasEnteredApp ? (
        <LandingPage onEnter={() => setHasEnteredApp(true)} />
      ) : (
        <>
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={handleNav}
            onReturnHome={() => setHasEnteredApp(false)}
          />

          {/* Main Content */}
          <main className="flex-1 md:ml-64 min-h-screen relative z-10">
            {/* Header */}
            <header className="bg-white/60 backdrop-blur-xl sticky top-0 z-30 border-b border-white/50 px-6 py-4 flex items-center justify-between">
              <h1 className="text-xl font-bold text-slate-800 capitalize font-display">
                {activeTab === 'home'
                  ? 'Browse Missions'
                  : activeTab === 'saved'
                  ? 'Saved Missions'
                  : activeTab}
              </h1>

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

            {/* Dynamic Content Router */}
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
                  />
                )}
                {activeTab === 'resources' && <Resources addToast={addToast} />}
                {activeTab === 'saved' && (
                  <SavedMissions
                    savedMissions={savedMissions}
                    expandedSavedMission={expandedSavedMission}
                    setExpandedSavedMission={setExpandedSavedMission}
                    toggleSaveMission={toggleSaveMission}
                    handleStartBusiness={handleStartBusiness}
                    setActiveTab={setActiveTab}
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
                  />
                )}
                {activeTab === 'mentors' && (
                  <Mentors
                    mentors={mentors}
                    expandedMentorId={expandedMentorId}
                    setExpandedMentorId={setExpandedMentorId}
                    openBookingModal={openBookingModal}
                  />
                )}
                {activeTab === 'about' && <About />}
              </div>
            </div>
          </main>

          {/* Mobile Nav Overlay */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-white/50 p-2 flex justify-around z-30">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`p-3 rounded-xl ${
                activeTab === 'dashboard'
                  ? 'text-indigo-600 bg-indigo-50/50'
                  : 'text-slate-400'
              }`}
            >
              <LayoutDashboard size={24} />
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`p-3 rounded-xl ${
                activeTab === 'community'
                  ? 'text-indigo-600 bg-indigo-50/50'
                  : 'text-slate-400'
              }`}
            >
              <Users size={24} />
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`p-3 rounded-xl ${
                activeTab === 'home'
                  ? 'text-indigo-600 bg-indigo-50/50'
                  : 'text-slate-400'
              }`}
            >
              <Rocket size={24} />
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`p-3 rounded-xl ${
                activeTab === 'calendar'
                  ? 'text-indigo-600 bg-indigo-50/50'
                  : 'text-slate-400'
              }`}
            >
              <CalendarIcon size={24} />
            </button>
            <button
              onClick={() => handleNav('profile')}
              className={`p-3 rounded-xl ${
                activeTab === 'profile'
                  ? 'text-indigo-600 bg-indigo-50/50'
                  : 'text-slate-400'
              }`}
            >
              <User size={24} />
            </button>
          </div>

          {/* Booking Modal (Shared globally) */}
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
                  {selectedMentorForBooking.role} •{' '}
                  {selectedMentorForBooking.expertise}
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
                                bookingSlot === slot
                                  ? 'text-white'
                                  : 'text-slate-900'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <CalendarCheck
                                  size={14}
                                  className={
                                    bookingSlot === slot
                                      ? 'text-indigo-200'
                                      : 'text-indigo-600'
                                  }
                                />{' '}
                                {slot.date}
                              </span>
                            </span>
                            <span
                              className={`flex items-center gap-2 text-xs ${
                                bookingSlot === slot
                                  ? 'text-indigo-100'
                                  : 'text-slate-500'
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
