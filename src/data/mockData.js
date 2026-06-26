import { 
  Monitor, Palette, Video, Utensils, Briefcase, ShoppingBag, 
  MessageCircle, Rocket, Medal 
} from 'lucide-react';

// --- Mock Data & Constants ---
const BUSINESS_FIELDS = [
  { id: 'tech', name: 'Technology', icon: Monitor, color: 'from-indigo-500 to-purple-500', desc: 'SaaS, Apps, and AI solutions.' },
  { id: 'art', name: 'Art & Design', icon: Palette, color: 'from-purple-500 to-violet-500', desc: 'Freelance, Studios, and Agencies.' },
  { id: 'content', name: 'Content Creation', icon: Video, color: 'from-violet-600 to-indigo-600', desc: 'Streaming, Blogging, and Media.' },
  { id: 'food', name: 'Food & Beverage', icon: Utensils, color: 'from-indigo-500 to-violet-500', desc: 'Catering, Trucks, and Cafes.' },
  { id: 'services', name: 'Services', icon: Briefcase, color: 'from-indigo-500 to-violet-500', desc: 'Consulting, Cleaning, and Care.' },
  { id: 'ecom', name: 'E-Commerce', icon: ShoppingBag, color: 'from-purple-600 to-indigo-500', desc: 'Dropshipping, DTC, and Retail.' },
];

const BUSINESS_TYPES = {
  tech: [
    { id: 'creative_ai', name: 'Creative AI Platform', cost: '$2k - $15k' },
    { id: 'saas', name: 'SaaS Platform', cost: '$2k - $10k+' },
    { id: 'mobile_app', name: 'Mobile Application', cost: '$500 - $5k' },
    { id: 'web_dev', name: 'Web Dev Agency', cost: '$0 - $200' },
    { id: 'nocode_agency', name: 'No-Code Automation', cost: '$0 - $500' },
    { id: 'cyber_security', name: 'Cybersecurity Audit', cost: '$500 - $2k' }
  ],
  art: [
    { id: 'graphic_design', name: 'Freelance Design', cost: '$0 - $500' },
    { id: 'art_studio', name: 'Digital Art Studio', cost: '$1k - $5k' },
    { id: 'clothing_brand', name: 'Streetwear Brand', cost: '$500 - $3k' },
    { id: 'photography', name: 'Photography Biz', cost: '$2k - $10k' },
    { id: 'interior_design', name: 'Virtual Interior Design', cost: '$500 - $2k' },
    { id: 'tattoo_studio', name: 'Tattoo Studio', cost: '$10k - $30k' }
  ],
  content: [
    { id: 'youtube', name: 'YouTube Channel', cost: '$100 - $1k' },
    { id: 'newsletter', name: 'Paid Newsletter', cost: '$0 - $100' },
    { id: 'podcast', name: 'Niche Podcast', cost: '$300 - $1k' },
    { id: 'short_form', name: 'TikTok/Reels Agency', cost: '$0 - $200' },
    { id: 'course_creator', name: 'Digital Course', cost: '$100 - $1k' },
    { id: 'streamer', name: 'Live Streamer', cost: '$1k - $5k' }
  ],
  food: [
    { id: 'food_truck', name: 'Gourmet Food Truck', cost: '$30k - $100k' },
    { id: 'meal_prep', name: 'Meal Prep Service', cost: '$2k - $10k' },
    { id: 'coffee_cart', name: 'Pop-up Coffee Cart', cost: '$5k - $15k' },
    { id: 'ghost_kitchen', name: 'Ghost Kitchen', cost: '$10k - $50k' },
    { id: 'catering', name: 'Event Catering', cost: '$5k - $20k' },
    { id: 'micro_bakery', name: 'Cottage Bakery', cost: '$500 - $3k' }
  ],
  services: [
    { id: 'cleaning', name: 'Eco-Cleaning Service', cost: '$500 - $2k' },
    { id: 'tutoring', name: 'Online Tutoring', cost: '$0 - $100' },
    { id: 'consulting', name: 'Management Consulting', cost: '$0 - $500' },
    { id: 'event_planning', name: 'Event Planning', cost: '$1k - $5k' },
    { id: 'non_profit', name: 'Community Non-Profit', cost: '$500 - $2k' },
    { id: 'pet_sitting', name: 'Pet Care Agency', cost: '$0 - $200' }
  ],
  ecom: [
    { id: 'dropshipping', name: 'Niche Dropshipping', cost: '$200 - $1k' },
    { id: 'handmade', name: 'Handmade Goods (Etsy)', cost: '$100 - $500' },
    { id: 'subscription', name: 'Subscription Box', cost: '$1k - $5k' },
    { id: 'print_on_demand', name: 'Print on Demand', cost: '$0 - $200' },
    { id: 'digital_products', name: 'Digital Templates', cost: '$0 - $100' },
    { id: 'reselling', name: 'Vintage Reselling', cost: '$200 - $1k' }
  ]
};

const AVAILABLE_MENTOR_SLOTS = [
  { date: '2026-07-08', time: '10:00 AM' },
  { date: '2026-07-19', time: '2:30 PM' },
  { date: '2026-07-21', time: '11:00 AM' },
  { date: '2026-07-23', time: '4:00 PM' }
];

const BLUEPRINTS = {
  // --- TECH ---
  creative_ai: {
    headerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
    title: 'Creative AI Platform',
    description: 'Build generative tools for artists and creators.',
    terms: [
      { term: 'Inference', def: 'The process of a trained model generating outputs (images/text) based on inputs.' },
      { term: 'Latent Space', def: 'A mathematical space where similar data points are closer together.' },
      { term: 'Fine-tuning', def: 'Taking a pre-trained model and training it further on a specific dataset.' }
    ],
    funding: [
      { title: 'NVIDIA Inception', type: 'Grant', amount: 'Hardware', desc: 'Support for AI startups.' },
      { title: 'AWS Activate', type: 'Credits', amount: '$100k', desc: 'Cloud credits for computing power.' },
      { title: 'VC Seed Round', type: 'Equity', amount: '$1M+', desc: 'Venture capital for high-growth tech.' }
    ],
    tools: [
      { name: 'Hugging Face', desc: 'Model Repository', link: 'huggingface.co' },
      { name: 'Replicate', desc: 'AI API Hosting', link: 'replicate.com' },
      { name: 'Pinecone', desc: 'Vector Database', link: 'pinecone.io' },
      { name: 'LangChain', desc: 'LLM Framework', link: 'langchain.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Research & Feasibility',
        duration: '2-4 Weeks',
        tasks: [
          { title: 'Select base models', detail: 'Evaluate Stable Diffusion, Llama, or Whisper based on your goal.' }, 
          { title: 'Feasibility study', detail: 'Calculate inference costs. Can you afford to run this at scale?' },
          { title: 'Prototype UI', detail: 'Build a quick Gradio or Streamlit app to test the concept.' }
        ] 
      },
      { 
        name: 'Phase 2: Core Development',
        duration: '2-3 Months',
        tasks: [
          { title: 'Backend API Setup', detail: 'Set up Python (FastAPI) wrapper around your models.' }, 
          { title: 'Vector DB Implementation', detail: 'Implement RAG (Retrieval Augmented Generation) if dealing with text.' },
          { title: 'Frontend React App', detail: 'Create a slick React interface. AI needs to feel magical.' }
        ] 
      },
      { 
        name: 'Phase 3: Infrastructure',
        duration: '1 Month',
        tasks: [
          { title: 'GPU Autoscaling', detail: 'Ensure you only pay for GPUs when users are active (use serverless).' }, 
          { title: 'Queue System', detail: 'Handle traffic spikes without crashing using Redis or Celery.' },
          { title: 'Secure Storage', detail: 'Set up S3 buckets to store generated assets securely.' }
        ] 
      },
      { 
        name: 'Phase 4: Launch & Scale',
        duration: 'Ongoing',
        tasks: [
          { title: 'Closed Beta Test', detail: 'Invite 100 power users (artists/writers) to stress test.' }, 
          { title: 'Showcase Gallery', detail: 'Build a page showing the best outputs to inspire new users.' },
          { title: 'Public Launch', detail: 'Post on "Show HN" (Hacker News) and Product Hunt.' }
        ] 
      }
    ]
  },
  saas: {
    headerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    title: 'SaaS Platform Launch',
    description: 'Build and scale a software-as-a-service business.',
    terms: [
      { term: 'MRR', def: 'Monthly Recurring Revenue. The holy grail metric for subscription businesses.' },
      { term: 'Churn', def: 'The percentage of customers who cancel their subscription in a given period.' },
      { term: 'CAC', def: 'Customer Acquisition Cost. How much you spend on marketing to get one new user.' }
    ],
    funding: [
      { title: 'AWS Activate', type: 'Credits', amount: '$100k', desc: 'Server credits for startups.' },
      { title: 'Y Combinator', type: 'Accelerator', amount: '$500k', desc: 'Premier tech accelerator program.' },
      { title: 'MicroAcquire', type: 'Marketplace', amount: 'Exit', desc: 'Platform to sell small SaaS projects.' }
    ],
    tools: [
      { name: 'Stripe', desc: 'Payment Processing', link: 'stripe.com' },
      { name: 'Vercel', desc: 'Hosting & Deployment', link: 'vercel.com' },
      { name: 'Supabase', desc: 'Database & Auth', link: 'supabase.com' },
      { name: 'Linear', desc: 'Project Management', link: 'linear.app' }
    ],
    stages: [
      { 
        name: 'Phase 1: Validation',
        duration: '1-3 Weeks',
        tasks: [
          { title: 'Problem Interviews', detail: 'Conduct 5-10 interviews. Ask: "What is the hardest part about [problem]?"' }, 
          { title: 'Landing Page Test', detail: 'Build a simple Carrd site explaining the solution. Collect emails.' },
          { title: 'Define MVP Features', detail: 'List all features. Cut 80%. Keep only the core pain-killer.' }
        ] 
      },
      { 
        name: 'Phase 2: Foundation',
        duration: '1 Week',
        tasks: [
          { title: 'Legal Registration', detail: 'Use Stripe Atlas or local gov to register LLC/Corp.' }, 
          { title: 'Banking Setup', detail: 'Separate finances immediately. Mercury or Brex are popular.' },
          { title: 'Tech Stack Init', detail: 'Initialize repo with Next.js, Tailwind, and Supabase.' }
        ] 
      },
      { 
        name: 'Phase 3: Building MVP',
        duration: '2-4 Months',
        tasks: [
          { title: 'Core Functionality', detail: 'Code the main feature that solves the user problem.' }, 
          { title: 'Stripe Integration', detail: 'Set up subscription plans and webhook listeners.' },
          { title: 'User Onboarding', detail: 'Create a smooth flow from Sign Up to "Aha!" moment.' }
        ] 
      },
      { 
        name: 'Phase 4: Growth',
        duration: '1-2 Months',
        tasks: [
          { title: 'Beta Onboarding', detail: 'Manually onboard first 50 users. Fix bugs instantly.' }, 
          { title: 'Product Hunt Launch', detail: 'Prepare assets. Post at 12:01am PST. Engage comments.' },
          { title: 'Cold Outreach', detail: 'Send 100 personalized emails to potential B2B buyers.' }
        ] 
      }
    ]
  },
  mobile_app: {
    headerImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
    title: 'Mobile App Development',
    description: 'Create a consumer-facing mobile application.',
    terms: [
      { term: 'UI/UX', def: 'User Interface / User Experience. How it looks vs. how it feels to use.' },
      { term: 'Native', def: 'Apps built specifically for iOS (Swift) or Android (Kotlin) for max performance.' },
      { term: 'Hybrid', def: 'Apps built with one codebase (React Native/Flutter) that run on both platforms.' }
    ],
    funding: [
      { title: 'App Store Foundations', type: 'Grant', amount: 'Support', desc: 'Apple program for underrepresented founders.' },
      { title: 'AngelList', type: 'Investors', amount: 'Var.', desc: 'Connect with angel investors for seed rounds.' }
    ],
    tools: [
      { name: 'Expo', desc: 'React Native Framework', link: 'expo.dev' },
      { name: 'RevenueCat', desc: 'Subscription Infrastructure', link: 'revenuecat.com' },
      { name: 'Figma', desc: 'Interface Design', link: 'figma.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Concept & Design', 
        duration: '3 Weeks', 
        tasks: [
          { title: 'User Flow Mapping', detail: 'Draw screens on paper. How does user get from A to B?' }, 
          { title: 'Competitor Research', detail: 'Download top 5 apps in niche. Note what they lack.' },
          { title: 'High-Fidelity UI', detail: 'Design screens in Figma. Focus on "Thumb Zone" usability.' }
        ] 
      },
      { 
        name: 'Phase 2: Development', 
        duration: '2-4 Months', 
        tasks: [
          { title: 'Environment Setup', detail: 'Initialize Expo (React Native) project.' }, 
          { title: 'Core Logic Build', detail: 'Code the main functionality (MVP only).' },
          { title: 'Database Sync', detail: 'Connect local state to cloud DB (Firebase/Supabase).' }
        ] 
      },
      { 
        name: 'Phase 3: Polish', 
        duration: '3 Weeks', 
        tasks: [
          { title: 'Beta Testing', detail: 'Use TestFlight (iOS) to distribute to 20 testers.' }, 
          { title: 'Monetization', detail: 'Integrate RevenueCat for In-App Purchases.' },
          { title: 'Performance Tuning', detail: 'Reduce app size and optimize list rendering.' }
        ] 
      },
      { 
        name: 'Phase 4: Store Release', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'ASO Keywords', detail: 'Research keywords for App Store title/description.' }, 
          { title: 'Store Screenshots', detail: 'Design promotional graphics for the listing.' },
          { title: 'Submission', detail: 'Submit to Apple App Store and Google Play Console.' }
        ] 
      }
    ]
  },
  web_dev: {
    headerImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1000&q=80",
    title: 'Web Dev Agency',
    description: 'Start a high-end web design & development shop.',
    terms: [
      { term: 'Retainer', def: 'A recurring monthly fee paid by clients for ongoing maintenance.' },
      { term: 'Scope Creep', def: 'When client requests exceed the original agreement.' },
      { term: 'CMS', def: 'Content Management System (e.g. WordPress, Sanity).' }
    ],
    funding: [],
    tools: [
      { name: 'Webflow', desc: 'Visual Builder', link: 'webflow.com' },
      { name: 'Figma', desc: 'Design Tool', link: 'figma.com' },
      { name: 'Upwork', desc: 'Lead Gen', link: 'upwork.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Portfolio', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Niche Selection', detail: 'Pick a vertical (e.g. Dentists, Real Estate, SaaS).' },
          { title: 'Build 3 Sample Sites', detail: 'Create high-quality demos for your niche.' },
          { title: 'Agency Website', detail: 'Build your own site. It must be perfect.' }
        ] 
      },
      { 
        name: 'Phase 2: Outreach', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Google Maps Scraping', detail: 'Find local businesses with bad websites.' },
          { title: 'Cold Email Campaign', detail: 'Send video audits (Loom) to 50 prospects.' },
          { title: 'Freelance Profiles', detail: 'Optimize Upwork/Fiverr profiles for search.' }
        ] 
      },
      { 
        name: 'Phase 3: Operations', 
        duration: '1 Month', 
        tasks: [
          { title: 'Contract Templates', detail: 'Draft standard Service Agreements and SOWs.' },
          { title: 'Invoicing Setup', detail: 'Set up Stripe or Wave to accept payments.' },
          { title: 'Project Management', detail: 'Set up Trello/Notion board for client projects.' }
        ] 
      },
      { 
        name: 'Phase 4: Scaling', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Hire Contractors', detail: 'Find a reliable developer to outsource coding.' },
          { title: 'Retainer Upsell', detail: 'Pitch monthly maintenance packages to past clients.' },
          { title: 'Case Studies', detail: 'Turn successful projects into detailed PDFs.' }
        ] 
      }
    ]
  },
  nocode_agency: {
    headerImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    title: 'No-Code Automation Agency',
    description: 'Build software for clients without writing code.',
    terms: [
      { term: 'Workflow', def: 'A sequence of automated processes.' },
      { term: 'API', def: 'How different software talks to each other.' },
      { term: 'Middleware', def: 'Software that acts as a bridge (e.g. Zapier).' }
    ],
    funding: [],
    tools: [
      { name: 'Bubble', desc: 'App Builder', link: 'bubble.io' },
      { name: 'Zapier', desc: 'Automation', link: 'zapier.com' },
      { name: 'Airtable', desc: 'Database', link: 'airtable.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Skill Acquisition', 
        duration: '2-4 Weeks', 
        tasks: [
          { title: 'Master One Tool', detail: 'Become an expert in Bubble or Webflow first.' }, 
          { title: 'Build Clone Apps', detail: 'Recreate Airbnb or Uber to prove skills.' },
          { title: 'Portfolio Site', detail: 'Showcase your clone projects.' }
        ] 
      },
      { 
        name: 'Phase 2: Outreach', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Niche Identification', detail: 'Target realtors, dentists, or HR depts.' }, 
          { title: 'Cold DM', detail: 'Message founders offering to automate a specific task.' },
          { title: 'Free Audit', detail: 'Offer to review their current manual processes.' }
        ] 
      },
      { 
        name: 'Phase 3: Execution', 
        duration: 'Per Project', 
        tasks: [
          { title: 'Scope Definition', detail: 'Clearly define what you will build.' }, 
          { title: 'Development', detail: 'Connect APIs and build the interface.' },
          { title: 'Handoff', detail: 'Record loom videos training the client.' }
        ] 
      },
      { 
        name: 'Phase 4: Scaling', 
        duration: '6 Months', 
        tasks: [
          { title: 'Templates', detail: 'Sell your most common builds as templates.' }, 
          { title: 'Monthly Support', detail: 'Charge for bug fixes and updates.' },
          { title: 'Hire Devs', detail: 'Outsource the building, focus on sales.' }
        ] 
      }
    ]
  },
  cyber_security: {
    headerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
    title: 'Cybersecurity Audit Firm',
    description: 'Protect small businesses from digital threats.',
    terms: [
      { term: 'Pen Testing', def: 'Penetration Testing. Simulating an attack to find weakness.' },
      { term: 'Phishing', def: 'Fraudulent emails inducing individuals to reveal personal info.' },
      { term: 'Compliance', def: 'Adhering to laws like HIPAA or GDPR.' }
    ],
    funding: [
       { title: 'Tech Grant', type: 'Grant', amount: '$10k', desc: 'Cybersecurity infrastructure grants.' }
    ],
    tools: [
      { name: 'Kali Linux', desc: 'OS', link: 'kali.org' },
      { name: 'Nessus', desc: 'Scanner', link: 'tenable.com' },
      { name: 'Vanta', desc: 'Compliance', link: 'vanta.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Certification', 
        duration: '1-3 Months', 
        tasks: [
          { title: 'Get Certified', detail: 'CompTIA Security+ or CEH is essential for trust.' }, 
          { title: 'Legal Setup', detail: 'High liability. Get professional indemnity insurance.' },
          { title: 'Lab Setup', detail: 'Build a secure home lab to practice.' }
        ] 
      },
      { 
        name: 'Phase 2: Service Design', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Audit Packages', detail: 'Define "Basic Scan" vs "Full Pen Test".' }, 
          { title: 'Report Templates', detail: 'Create easy-to-read PDF summaries for non-tech clients.' },
          { title: 'Pricing', detail: 'Flat fee per device or per employee?' }
        ] 
      },
      { 
        name: 'Phase 3: Acquisition', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Local Partnerships', detail: 'Partner with MSPs (Managed Service Providers).' }, 
          { title: 'Lunch & Learns', detail: 'Teach staff at local firms about password safety.' },
          { title: 'LinkedIn Authority', detail: 'Post about recent hacks and how to prevent them.' }
        ] 
      },
      { 
        name: 'Phase 4: Operations', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Running Audits', detail: 'Execute scans and manual testing.' }, 
          { title: 'Remediation', detail: 'Fix the issues you found (Upsell).' },
          { title: 'Quarterly Reviews', detail: 'Sell recurring check-ups.' }
        ] 
      }
    ]
  },

  // --- ART ---
  graphic_design: {
    headerImage: "https://images.unsplash.com/photo-1626785774573-4b799312c95d?auto=format&fit=crop&w=1000&q=80",
    title: 'Freelance Design Business',
    description: 'Monetize your visual creativity.',
    terms: [
      { term: 'Vector', def: 'Images made of paths (SVG) that scale infinitely without pixelation.' },
      { term: 'Deliverables', def: 'The final files sent to the client (PNG, AI, PDF).' },
      { term: 'Licensing', def: 'Rights to use the design (Commercial vs Personal).' }
    ],
    funding: [],
    tools: [
      { name: 'Adobe CC', desc: 'Industry Standard', link: 'adobe.com' },
      { name: 'Dribbble', desc: 'Portfolio', link: 'dribbble.com' },
      { name: 'Gumroad', desc: 'Asset Sales', link: 'gumroad.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Portfolio', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Curate Best Work', detail: 'Select 5-8 strongest pieces. Quality > Quantity.' },
          { title: 'Behance Profile', detail: 'Upload detailed case studies of your process.' },
          { title: 'Rate Card', detail: 'Determine your hourly and project-based pricing.' }
        ] 
      },
      { 
        name: 'Phase 2: Client Acquisition', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Social Media', detail: 'Post daily on Instagram/Twitter/LinkedIn.' },
          { title: 'Network Outreach', detail: 'Tell friends/family you are open for work.' },
          { title: 'Job Boards', detail: 'Apply to gigs on WeWorkRemotely or specialized boards.' }
        ] 
      },
      { 
        name: 'Phase 3: Process', 
        duration: '1 Week', 
        tasks: [
          { title: 'Client Onboarding', detail: 'Create a questionnaire to understand client needs.' },
          { title: 'Asset Library', detail: 'Organize fonts, mockups, and textures.' },
          { title: 'Contract Setup', detail: 'Never start work without a signed contract.' }
        ] 
      },
      { 
        name: 'Phase 4: Expansion', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Digital Products', detail: 'Sell templates or icon sets on Gumroad.' },
          { title: 'Newsletter', detail: 'Start a design tips newsletter to build authority.' },
          { title: 'Agency Partnerships', detail: 'Partner with dev agencies to be their design arm.' }
        ] 
      }
    ]
  },
  art_studio: {
    headerImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80",
    title: 'Digital Art Studio',
    description: 'A boutique studio for high-end digital illustration.',
    terms: [
      { term: 'NFT', def: 'Non-Fungible Token. Digital ownership on blockchain.' },
      { term: 'Commission', def: 'Custom art piece requested by a client.' },
      { term: 'IP', def: 'Intellectual Property. Who owns the character?' }
    ],
    funding: [
       { title: 'Arts Grants', type: 'Grant', amount: 'Var.', desc: 'Local arts council funding.' }
    ],
    tools: [
      { name: 'Procreate', desc: 'iPad Illustration', link: 'procreate.com' },
      { name: 'Blender', desc: '3D Modeling', link: 'blender.org' }
    ],
    stages: [
      { 
        name: 'Phase 1: Identity', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Style Guide', detail: 'Define the unique visual style of the studio.' },
          { title: 'Website Launch', detail: 'Minimalist site focusing entirely on the art.' },
          { title: 'Social Handles', detail: 'Secure matching handles across all platforms.' }
        ] 
      },
      { 
        name: 'Phase 2: Production', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Daily Creation', detail: 'Commit to creating one piece per day/week.' },
          { title: 'Time-Lapse', detail: 'Record process videos for TikTok/Reels.' },
          { title: 'Community', detail: 'Engage with other artists. Comment and share.' }
        ] 
      },
      { 
        name: 'Phase 3: Monetization', 
        duration: '1 Month', 
        tasks: [
          { title: 'Print Shop', detail: 'Set up Inprnt or Redbubble for physical prints.' },
          { title: 'Commission Sheet', detail: 'Publicize prices for custom work.' },
          { title: 'Patreon', detail: 'Offer source files/tutorials to subscribers.' }
        ] 
      },
      { 
        name: 'Phase 4: Exhibitions', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Virtual Gallery', detail: 'Host a show in a Metaverse space or custom site.' },
          { title: 'Collabs', detail: 'Work with musicians for cover art.' },
          { title: 'Merch Drop', detail: 'Limited edition apparel run.' }
        ] 
      }
    ]
  },
  clothing_brand: {
    headerImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80",
    title: 'Streetwear Brand',
    description: 'Launch a direct-to-consumer fashion label.',
    terms: [
      { term: 'GSM', def: 'Grams per Square Meter. Fabric weight/quality.' },
      { term: 'Tech Pack', def: 'Blueprint for the factory explaining how to make the garment.' },
      { term: 'MOQ', def: 'Minimum Order Quantity required by a manufacturer.' }
    ],
    funding: [
      { title: 'Shopify Capital', type: 'Loan', amount: 'Var.', desc: 'Available after sales history.' }
    ],
    tools: [
      { name: 'Shopify', desc: 'Storefront', link: 'shopify.com' },
      { name: 'Alibaba', desc: 'Sourcing', link: 'alibaba.com' },
      { name: 'Placeit', desc: 'Mockups', link: 'placeit.net' }
    ],
    stages: [
      { 
        name: 'Phase 1: Design & Brand', 
        duration: '3 Weeks', 
        tasks: [
          { title: 'Brand Story', detail: 'What does the brand stand for? Who is it for?' },
          { title: 'Logo & Assets', detail: 'Design logo, tags, and packaging art.' },
          { title: 'First Collection', detail: 'Design 3 core pieces (e.g. Tee, Hoodie, Cap).' }
        ] 
      },
      { 
        name: 'Phase 2: Sourcing', 
        duration: '1-2 Months', 
        tasks: [
          { title: 'Order Samples', detail: 'Get samples from 3 different blanks suppliers.' },
          { title: 'Quality Check', detail: 'Wash test and wear test the samples.' },
          { title: 'Place Stock Order', detail: 'Order small qty (15-20) of each size.' }
        ] 
      },
      { 
        name: 'Phase 3: Digital Store', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Product Photography', detail: 'High quality lifestyle shots, not just flat lays.' },
          { title: 'Shopify Setup', detail: 'Customize theme, set up shipping zones.' },
          { title: 'SMS/Email Setup', detail: 'Configure Klaviyo for abandoned cart flows.' }
        ] 
      },
      { 
        name: 'Phase 4: Drop Day', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Influencer Seeding', detail: 'Send free gear to micro-influencers.' },
          { title: 'TikTok Teasers', detail: 'Post "behind the brand" content daily.' },
          { title: 'Launch', detail: 'Open store at set time. create urgency.' }
        ] 
      }
    ]
  },
  photography: {
    headerImage: "https://images.unsplash.com/photo-1554048612-387768052bf7?auto=format&fit=crop&w=1000&q=80",
    title: 'Photography Business',
    description: 'Professional photography for events or brands.',
    terms: [
      { term: 'Raw', def: 'Uncompressed image file format.' },
      { term: 'Golden Hour', def: 'First/last hour of sunlight.' },
      { term: 'Shot List', def: 'Checklist of photos client wants.' }
    ],
    funding: [],
    tools: [
      { name: 'Lightroom', desc: 'Editing', link: 'adobe.com' },
      { name: 'Pixieset', desc: 'Gallery Delivery', link: 'pixieset.com' },
      { name: 'HoneyBook', desc: 'CRM', link: 'honeybook.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Gear & Portfolio', 
        duration: '1 Month', 
        tasks: [
          { title: 'Gear Acquisition', detail: 'Body, 35mm lens, 85mm lens, Flash.' }, 
          { title: 'Free Shoots', detail: 'Do 5 free shoots to build portfolio.' },
          { title: 'Website', detail: 'Visual-first website with high-res gallery.' }
        ] 
      },
      { 
        name: 'Phase 2: Marketing', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Instagram', detail: 'Tag vendors and locations in every post.' }, 
          { title: 'SEO', detail: 'Rank for "Photographer in [City]".' },
          { title: 'Networking', detail: 'Meet wedding planners and venue coordinators.' }
        ] 
      },
      { 
        name: 'Phase 3: Booking', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Contract', detail: 'Protect against cancellations and usage rights.' }, 
          { title: 'Invoicing', detail: 'Take 50% retainer to hold the date.' },
          { title: 'Pre-Shoot Consult', detail: 'Discuss mood board and timeline.' }
        ] 
      },
      { 
        name: 'Phase 4: Delivery', 
        duration: 'Per Project', 
        tasks: [
          { title: 'Culling', detail: 'Select the best photos.' }, 
          { title: 'Editing', detail: 'Color correct and retouch.' },
          { title: 'Gallery Send', detail: 'Deliver via Pixieset or Pic-Time.' }
        ] 
      }
    ]
  },
  interior_design: {
    headerImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
    title: 'Virtual Interior Design',
    description: 'Design spaces remotely for clients.',
    terms: [
      { term: 'Mood Board', def: 'Collage of ideas to set the tone.' },
      { term: 'Floor Plan', def: 'Scale diagram of the room.' },
      { term: 'Sourcing List', def: 'Links to buy the recommended furniture.' }
    ],
    funding: [],
    tools: [
      { name: 'SketchUp', desc: '3D Modeling', link: 'sketchup.com' },
      { name: 'Canva', desc: 'Mood Boards', link: 'canva.com' },
      { name: 'Pinterest', desc: 'Inspiration', link: 'pinterest.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Setup', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Niche', detail: 'E-Design for nurseries? Offices? Airbnbs?' }, 
          { title: 'Packages', detail: 'Define "Room Refresh" vs "Full Redesign".' },
          { title: 'Questionnaire', detail: 'Form to ask budget, style, and room dimensions.' }
        ] 
      },
      { 
        name: 'Phase 2: Portfolio', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Renderings', detail: 'Create 3D renders of imaginary rooms.' }, 
          { title: 'Before/After', detail: 'Style a corner of your own home.' },
          { title: 'Social Proof', detail: 'Get testimonials even from free work.' }
        ] 
      },
      { 
        name: 'Phase 3: Client Work', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Consultation', detail: 'Zoom call to see the space.' }, 
          { title: 'Concept Phase', detail: 'Deliver 2 mood board options.' },
          { title: 'Final Design', detail: 'Provide layout and shopping list.' }
        ] 
      },
      { 
        name: 'Phase 4: Marketing', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Pinterest', detail: 'Pin your designs with "Shop the Look" tags.' }, 
          { title: 'Realtors', detail: 'Partner with agents to stage virtual listings.' },
          { title: 'Blog', detail: 'Write about "Top 5 Paint Colors for 2026".' }
        ] 
      }
    ]
  },
  tattoo_studio: {
    headerImage: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1000&q=80",
    title: 'Tattoo Studio',
    description: 'Open a physical space for body art.',
    terms: [
      { term: 'Flash', def: 'Pre-drawn designs available for walk-ins.' },
      { term: 'Stencil', def: 'Transfer paper used to guide the tattoo.' },
      { term: 'Autoclave', def: 'Machine used to sterilize equipment.' }
    ],
    funding: [
       { title: 'Small Business Loan', type: 'Loan', amount: '$50k', desc: 'For buildout and rent.' }
    ],
    tools: [
      { name: 'Square Appointments', desc: 'Booking', link: 'squareup.com' },
      { name: 'Procreate', desc: 'Design', link: 'procreate.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Apprenticeship', 
        duration: '1-2 Years', 
        tasks: [
          { title: 'Find Mentor', detail: 'Work under an established artist.' }, 
          { title: 'Hygiene Cert', detail: 'Bloodborne Pathogens training.' },
          { title: 'Build Portfolio', detail: 'Document every piece on Instagram.' }
        ] 
      },
      { 
        name: 'Phase 2: Location', 
        duration: '3 Months', 
        tasks: [
          { title: 'Lease', detail: 'Find a space with good foot traffic.' }, 
          { title: 'Health Dept', detail: 'Pass rigorous sanitation inspection.' },
          { title: 'Buildout', detail: 'Washable floors, sinks in stations, lighting.' }
        ] 
      },
      { 
        name: 'Phase 3: Staffing', 
        duration: '1 Month', 
        tasks: [
          { title: 'Hire Artists', detail: 'Rent chairs or hire on commission.' }, 
          { title: 'Guest Spots', detail: 'Invite famous artists for short residencies.' },
          { title: 'Shop Manager', detail: 'Hire someone to handle bookings/front desk.' }
        ] 
      },
      { 
        name: 'Phase 4: Launch', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Flash Day', detail: 'Discounted pre-drawn designs to open.' }, 
          { title: 'Merch', detail: 'Sell shop tees and prints.' },
          { title: 'Conventions', detail: 'Booth at tattoo expos for exposure.' }
        ] 
      }
    ]
  },

  // --- CONTENT ---
  youtube: {
    headerImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80",
    title: 'YouTube Channel',
    description: 'Build an audience and revenue through video.',
    terms: [
      { term: 'CTR', def: 'Click-Through Rate. % of people who click your thumbnail.' },
      { term: 'RPM', def: 'Revenue Per Mille. How much you earn per 1,000 views.' },
      { term: 'Retention', def: 'How long viewers keep watching your video.' }
    ],
    funding: [],
    tools: [
      { name: 'DaVinci Resolve', desc: 'Editing', link: 'blackmagicdesign.com' },
      { name: 'TubeBuddy', desc: 'SEO & Stats', link: 'tubebuddy.com' },
      { name: 'Canva', desc: 'Thumbnails', link: 'canva.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Strategy', 
        duration: '1 Week', 
        tasks: [
          { title: 'Niche Down', detail: 'Be specific. "Minecraft Redstone Tutorials", not just "Gaming".' },
          { title: 'Avatar Definition', detail: 'Who is watching? What value do they get?' },
          { title: 'Channel Branding', detail: 'Create Banner, Logo, and Intro hook.' }
        ] 
      },
      { 
        name: 'Phase 2: Production', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Scripting', detail: 'Write script first. Focus on the first 30 seconds.' },
          { title: 'Filming/Recording', detail: 'Good audio is more important than 4K video.' },
          { title: 'Editing', detail: 'Cut silence. Add b-roll to keep attention.' }
        ] 
      },
      { 
        name: 'Phase 3: Packaging', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Thumbnail Design', detail: 'Make 3 versions. Needs high contrast.' },
          { title: 'Title Optimization', detail: 'Use keywords but keep it intriguing.' },
          { title: 'Publishing', detail: 'Post at consistent times. Reply to comments immediately.' }
        ] 
      },
      { 
        name: 'Phase 4: Monetization', 
        duration: 'Milestone', 
        tasks: [
          { title: 'Partner Program', detail: 'Reach 1k subs & 4k watch hours to turn on ads.' },
          { title: 'Affiliate Links', detail: 'Add Amazon/Software links to description.' },
          { title: 'Sponsorships', detail: 'Create a media kit to pitch to brands.' }
        ] 
      }
    ]
  },
  newsletter: {
    headerImage: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=1000&q=80",
    title: 'Paid Newsletter',
    description: 'Monetize your expertise via email subscriptions.',
    terms: [
      { term: 'Substack', def: 'Popular platform for publishing newsletters.' },
      { term: 'Lead Magnet', def: 'Free value given in exchange for an email address.' },
      { term: 'Open Rate', def: 'Percentage of subscribers who open your email.' }
    ],
    funding: [],
    tools: [
      { name: 'Beehiiv', desc: 'Newsletter Platform', link: 'beehiiv.com' },
      { name: 'Typefully', desc: 'Twitter Growth', link: 'typefully.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Concept', 
        duration: '1 Week', 
        tasks: [
          { title: 'Topic Selection', detail: 'Find the intersection of your expertise and market demand.' },
          { title: 'Name & Branding', detail: 'Catchy name and clean logo.' },
          { title: 'Platform Setup', detail: 'Set up Beehiiv or Substack account.' }
        ] 
      },
      { 
        name: 'Phase 2: Content Bank', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Write 5 Issues', detail: 'Have a backlog so you never miss a schedule.' },
          { title: 'Create Lead Magnet', detail: 'PDF Checklist or Guide to attract signups.' },
          { title: 'Landing Page', detail: 'Simple page focused on the "Subscribe" button.' }
        ] 
      },
      { 
        name: 'Phase 3: Distribution', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Twitter Threads', detail: 'Summarize issues into threads. Link in bio.' },
          { title: 'LinkedIn Posts', detail: 'Post snippets. Engage with industry leaders.' },
          { title: 'Cross-Promotion', detail: 'Swap shoutouts with other newsletter writers.' }
        ] 
      },
      { 
        name: 'Phase 4: Revenue', 
        duration: 'Milestone', 
        tasks: [
          { title: 'Launch Paid Tier', detail: 'Once at 1k free subs, offer premium content.' },
          { title: 'Sponsorships', detail: 'Sell ad space in your free version.' },
          { title: 'Digital Product', detail: 'Sell a course or ebook to your list.' }
        ] 
      }
    ]
  },
  podcast: {
    headerImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80",
    title: 'Niche Podcast',
    description: 'Start an audio show for a specific industry.',
    terms: [
      { term: 'RSS Feed', def: 'The file that distributes your episodes to Spotify/Apple.' },
      { term: 'Show Notes', def: 'Written summary and links for each episode.' },
      { term: 'Dynamic Insertion', def: 'Placing ads into old episodes automatically.' }
    ],
    funding: [],
    tools: [
      { name: 'Riverside.fm', desc: 'Remote Recording', link: 'riverside.fm' },
      { name: 'Descript', desc: 'Audio Editing', link: 'descript.com' },
      { name: 'Transistor', desc: 'Hosting', link: 'transistor.fm' }
    ],
    stages: [
      { 
        name: 'Phase 1: Pre-Production', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Format Decision', detail: 'Interview vs Solo vs Co-hosted.' },
          { title: 'Cover Art', detail: 'Must look good at small sizes.' },
          { title: 'Intro/Outro', detail: 'Source royalty-free music or hire a composer.' }
        ] 
      },
      { 
        name: 'Phase 2: Recording', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Book Guests', detail: 'Use Calendly. Send prep sheets beforehand.' },
          { title: 'Record Trailer', detail: '2 min teaser explaining the show.' },
          { title: 'Batch Record', detail: 'Record 3-5 episodes before launching.' }
        ] 
      },
      { 
        name: 'Phase 3: Launch', 
        duration: '1 Week', 
        tasks: [
          { title: 'Submit to Directories', detail: 'Apple, Spotify, Google, Amazon.' },
          { title: 'Launch Week', detail: 'Release 3 episodes at once to boost ranking.' },
          { title: 'Social Clips', detail: 'Create vertical video clips for TikTok/Reels.' }
        ] 
      },
      { 
        name: 'Phase 4: Growth', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Guest Promotion', detail: 'Provide guests with assets to share.' },
          { title: 'SEO Blog', detail: 'Post transcripts on your website.' },
          { title: 'Newsletter', detail: 'Notify listeners of new episodes.' }
        ] 
      }
    ]
  },
  short_form: {
    headerImage: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1000&q=80",
    title: 'TikTok/Reels Agency',
    description: 'Produce viral short-form video for brands.',
    terms: [
      { term: 'Hook', def: 'The first 3 seconds that grab attention.' },
      { term: 'CTA', def: 'Call to Action. What the viewer should do next.' },
      { term: 'UGC', def: 'User Generated Content. Authentic looking ads.' }
    ],
    funding: [],
    tools: [
      { name: 'CapCut', desc: 'Editing', link: 'capcut.com' },
      { name: 'Trello', desc: 'Content Calendar', link: 'trello.com' },
      { name: 'Slack', desc: 'Client Comms', link: 'slack.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Skill Building', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Study Trends', detail: 'Spend hours analyzing what goes viral.' }, 
          { title: 'Practice', detail: 'Edit 10 videos for a fake brand.' },
          { title: 'Portfolio', detail: 'Create a Google Drive folder of your best work.' }
        ] 
      },
      { 
        name: 'Phase 2: Outreach', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Prospecting', detail: 'Find brands with bad TikTok presence.' }, 
          { title: 'Free Samples', detail: 'Send one free edited video to show value.' },
          { title: 'Retainer Pitch', detail: 'Offer 4 videos/month package.' }
        ] 
      },
      { 
        name: 'Phase 3: Production', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Scripting', detail: 'Send scripts to client for approval.' }, 
          { title: 'Editing', detail: 'Add captions, trending audio, and cuts.' },
          { title: 'Posting', detail: 'Manage the upload and captions.' }
        ] 
      },
      { 
        name: 'Phase 4: Scaling', 
        duration: '6 Months', 
        tasks: [
          { title: 'Hire Editors', detail: 'Outsource the editing to free up time.' }, 
          { title: 'Strategy', detail: 'Charge for monthly analytics reports.' },
          { title: 'Creator Network', detail: 'Build roster of actors for UGC.' }
        ] 
      }
    ]
  },
  course_creator: {
    headerImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1000&q=80",
    title: 'Digital Course Business',
    description: 'Package your knowledge into a scalable product.',
    terms: [
      { term: 'Curriculum', def: 'The structured outline of your lessons.' },
      { term: 'LMS', def: 'Learning Management System. Where the course lives.' },
      { term: 'Launch', def: 'A specific period of open cart sales.' }
    ],
    funding: [],
    tools: [
      { name: 'Teachable', desc: 'Course Hosting', link: 'teachable.com' },
      { name: 'Loom', desc: 'Recording', link: 'loom.com' },
      { name: 'ConvertKit', desc: 'Email Marketing', link: 'convertkit.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Validation', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Topic Selection', detail: 'Solve a specific, expensive problem.' }, 
          { title: 'Pre-Sell', detail: 'Sell "Beta Access" before recording.' },
          { title: 'Outline', detail: 'Map out modules and lessons.' }
        ] 
      },
      { 
        name: 'Phase 2: Creation', 
        duration: '1 Month', 
        tasks: [
          { title: 'Recording', detail: 'Record screenshare or headshot videos.' }, 
          { title: 'Resources', detail: 'Create worksheets and PDFs.' },
          { title: 'Upload', detail: 'Set up course in Teachable/Kajabi.' }
        ] 
      },
      { 
        name: 'Phase 3: Marketing', 
        duration: '1 Month', 
        tasks: [
          { title: 'Webinar', detail: 'Create a free training that pitches the course.' }, 
          { title: 'Email Sequence', detail: 'Write a 5-day launch sequence.' },
          { title: 'Affiliates', detail: 'Recruit partners to sell for a commission.' }
        ] 
      },
      { 
        name: 'Phase 4: Management', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Community', detail: 'Manage the student Facebook/Discord group.' }, 
          { title: 'Updates', detail: 'Refresh content as industry changes.' },
          { title: 'Evergreen', detail: 'Set up ads to sell automatically.' }
        ] 
      }
    ]
  },
  streamer: {
    headerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    title: 'Live Streamer',
    description: 'Build a community through live broadcasting.',
    terms: [
      { term: 'Overlay', def: 'Graphics displayed on top of your video feed.' },
      { term: 'Bitrate', def: 'Quality of data transfer. Higher = better video.' },
      { term: 'Emotes', def: 'Custom chat emojis for subscribers.' }
    ],
    funding: [],
    tools: [
      { name: 'OBS Studio', desc: 'Broadcasting', link: 'obsproject.com' },
      { name: 'Twitch', desc: 'Platform', link: 'twitch.tv' },
      { name: 'StreamElements', desc: 'Alerts', link: 'streamelements.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Tech Setup', 
        duration: '1 Week', 
        tasks: [
          { title: 'Hardware', detail: 'PC, Mic, Camera, Lighting, Green Screen.' }, 
          { title: 'OBS Config', detail: 'Set up scenes (Just Chatting, Gaming, BRB).' },
          { title: 'Alerts', detail: 'Customize notifications for follows/subs.' }
        ] 
      },
      { 
        name: 'Phase 2: Brand', 
        duration: '1 Week', 
        tasks: [
          { title: 'Theme', detail: 'Cozy? High Energy? Competitive?' }, 
          { title: 'Graphics', detail: 'Panels, offline screen, and profile pic.' },
          { title: 'Schedule', detail: 'Commit to specific days/times. Consistency is key.' }
        ] 
      },
      { 
        name: 'Phase 3: Growth', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Networking', detail: 'Raid other streamers. Be active in chats.' }, 
          { title: 'TikTok', detail: 'Post clips of stream highlights daily.' },
          { title: 'Discord', detail: 'Build a server for your community to hang out.' }
        ] 
      },
      { 
        name: 'Phase 4: Monetization', 
        duration: 'Milestone', 
        tasks: [
          { title: 'Affiliate', detail: 'Reach requirements to unlock subs/bits.' }, 
          { title: 'Sponsors', detail: 'Accept game keys or product placements.' },
          { title: 'Merch', detail: 'Launch simple apparel line.' }
        ] 
      }
    ]
  },

  // --- FOOD ---
  food_truck: {
    headerImage: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=1000&q=80",
    title: 'Gourmet Food Truck',
    description: 'Launch a mobile culinary experience.',
    terms: [
      { term: 'COGS', def: 'Cost of Goods Sold. The direct cost of ingredients used to make the food.' },
      { term: 'Commissary Kitchen', def: 'A licensed commercial kitchen where food trucks must prep their food by law.' },
      { term: 'POS', def: 'Point of Sale. The system used to take payments (e.g., Square, Toast).' }
    ],
    funding: [
      { title: 'SBA 7(a) Loan', type: 'Loan', amount: '$50k+', desc: 'Government-backed loans for small businesses.' },
      { title: 'Kiva', type: 'Microloan', amount: '$15k', desc: 'Crowdfunded loans with 0% interest.' },
      { title: 'Food Truck Grants', type: 'Grant', amount: '$10k', desc: 'Various local city initiatives.' }
    ],
    tools: [
      { name: 'Square POS', desc: 'Payments & Orders', link: 'squareup.com' },
      { name: 'Roaming Hunger', desc: 'Booking Platform', link: 'roaminghunger.com' },
      { name: 'Canva', desc: 'Menu Design', link: 'canva.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Concept & Menu', 
        duration: '1 Month', 
        tasks: [
          { title: 'Menu Development', detail: 'Keep it simple (3-5 items). High margin, easy prep.' }, 
          { title: 'Cost Analysis', detail: 'Calculate COGS. Aim for 25-30% food cost.' },
          { title: 'Branding', detail: 'Name, Logo, and Truck Wrap design.' }
        ] 
      },
      { 
        name: 'Phase 2: Logistics & Legal', 
        duration: '2-3 Months', 
        tasks: [
          { title: 'Acquire Truck', detail: 'Buy used to save costs. Inspect mechanics thoroughly.' }, 
          { title: 'Permitting', detail: 'Get Business License, Health Permit, and Fire Inspection.' },
          { title: 'Commissary Agreement', detail: 'Sign lease with a local commissary kitchen.' }
        ] 
      },
      { 
        name: 'Phase 3: Outfitting', 
        duration: '1 Month', 
        tasks: [
          { title: 'Equipment Install', detail: 'Install griddle, fridge, fryer, and generator.' }, 
          { title: 'POS Setup', detail: 'Set up Square for payments and inventory tracking.' },
          { title: 'Wrap Application', detail: 'Apply vinyl wrap for branding visibility.' }
        ] 
      },
      { 
        name: 'Phase 4: Launch', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Soft Opening', detail: 'Invite friends/family for a dry run.' }, 
          { title: 'Location Scouting', detail: 'Secure spots at breweries, office parks, or events.' },
          { title: 'Social Media', detail: 'Post daily schedule/location on Instagram.' }
        ] 
      }
    ]
  },
  meal_prep: {
    headerImage: "https://images.unsplash.com/photo-1543353071-873f1753ade2?auto=format&fit=crop&w=1000&q=80",
    title: 'Healthy Meal Prep Service',
    description: 'Subscription-based meal delivery for locals.',
    terms: [
      { term: 'Macros', def: 'Macronutrients (Carbs, Fats, Proteins). Critical data for fitness-focused clients.' },
      { term: 'Shelf Life', def: 'How long the food stays fresh. Dictates your delivery schedule.' },
      { term: 'Batch Cooking', def: 'Preparing large quantities of food at once to save time.' }
    ],
    funding: [
        { title: 'Local Food Grants', type: 'Grant', amount: '$5k', desc: 'Support for local food systems.' }
    ],
    tools: [
        { name: 'Castiron', desc: 'Food Business Software', link: 'castiron.me' },
        { name: 'MyFitnessPal', desc: 'Nutrition Calc', link: 'myfitnesspal.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Planning', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Niche Definition', detail: 'Keto, Vegan, Bodybuilding, or Seniors?' }, 
          { title: 'Menu Design', detail: 'Create a rotating 4-week menu.' },
          { title: 'Sourcing', detail: 'Find wholesale suppliers (Costco/Restaurant Depot).' }
        ] 
      },
      { 
        name: 'Phase 2: Kitchen Setup', 
        duration: '1 Month', 
        tasks: [
          { title: 'Legal', detail: 'Rent Commissary Kitchen and get Food Handler Card.' }, 
          { title: 'Packaging', detail: 'Source microwave-safe, eco-friendly containers.' },
          { title: 'Insurance', detail: 'Get liability insurance.' }
        ] 
      },
      { 
        name: 'Phase 3: Sales Setup', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Ordering Site', detail: 'Set up Shopify or Castiron for weekly orders.' }, 
          { title: 'Photography', detail: 'Take appetizing photos of sample meals.' },
          { title: 'Beta Testers', detail: 'Provide free week to 5 people in exchange for reviews.' }
        ] 
      },
      { 
        name: 'Phase 4: Operations', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Cook Day', detail: 'Execute batch cooking (usually Sundays).' }, 
          { title: 'Delivery Logistics', detail: 'Hire driver or map efficient route.' },
          { title: 'Retention', detail: 'Email weekly menu reminders to customers.' }
        ] 
      }
    ]
  },
  coffee_cart: {
    headerImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80",
    title: 'Pop-up Coffee Cart',
    description: 'Mobile espresso bar for events and markets.',
    terms: [
      { term: 'Pulling a Shot', def: 'The process of making espresso.' },
      { term: 'Dialing In', def: 'Adjusting grinder settings for the perfect extraction.' },
      { term: 'Events', def: 'Weddings/Corporate - highest margin work.' }
    ],
    funding: [],
    tools: [
      { name: 'La Marzocco', desc: 'Espresso Machines', link: 'lamarzocco.com' },
      { name: 'Square', desc: 'Payments', link: 'squareup.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Gear Acquisition', 
        duration: '1-2 Months', 
        tasks: [
          { title: 'Machine & Grinder', detail: 'The heart of the business. Don\'t skimp here.' }, 
          { title: 'Cart Build', detail: 'Custom wood cart with plumbing/water tanks hidden.' },
          { title: 'Power Source', detail: 'Ensure you have correct voltage/amps or a generator.' }
        ] 
      },
      { 
        name: 'Phase 2: Product', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Roaster Partnership', detail: 'Partner with a local roaster for wholesale beans.' }, 
          { title: 'Menu Training', detail: 'Perfect your latte art and workflow speed.' },
          { title: 'Signature Drink', detail: 'Create one unique drink to stand out.' }
        ] 
      },
      { 
        name: 'Phase 3: Marketing', 
        duration: '1 Month', 
        tasks: [
          { title: 'Instagram', detail: 'Aesthetic photos are crucial for coffee.' }, 
          { title: 'Wedding Sites', detail: 'List on The Knot or Zola for event bookings.' },
          { title: 'Samples', detail: 'Do a free pop-up at a local business to build hype.' }
        ] 
      },
      { 
        name: 'Phase 4: Launch', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Market Stall', detail: 'Secure a regular spot at a Farmer\'s Market.' }, 
          { title: 'Event Booking', detail: 'Focus on high-ticket weddings and corporate mornings.' },
          { title: 'Merch', detail: 'Sell beans and mugs for extra revenue.' }
        ] 
      }
    ]
  },
  ghost_kitchen: {
    headerImage: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=1000&q=80",
    title: 'Ghost Kitchen',
    description: 'Delivery-only restaurant with no dining room.',
    terms: [
      { term: 'Aggregator', def: 'Apps like UberEats, DoorDash, GrubHub.' },
      { term: 'Virtual Brand', def: 'A restaurant concept that exists only online.' },
      { term: 'Tablet Hell', def: 'Managing multiple tablets for different delivery apps.' }
    ],
    funding: [
       { title: 'Kitchen Fund', type: 'Loan', amount: '$50k', desc: 'Equipment financing.' }
    ],
    tools: [
      { name: 'Otter', desc: 'Order Aggregator', link: 'tryotter.com' },
      { name: 'CloudKitchens', desc: 'Space Rental', link: 'cloudkitchens.com' },
      { name: 'MarketMan', desc: 'Inventory', link: 'marketman.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Concept', 
        duration: '1 Month', 
        tasks: [
          { title: 'Market Gap', detail: 'What food is missing in delivery radius?' }, 
          { title: 'Menu Eng', detail: 'Food must travel well. No soggy fries.' },
          { title: 'Multiple Brands', detail: 'Run a Wings brand and a Burger brand from one kitchen.' }
        ] 
      },
      { 
        name: 'Phase 2: Location', 
        duration: '1-2 Months', 
        tasks: [
          { title: 'Lease Space', detail: 'Rent a cheap industrial space or "CloudKitchen" pod.' }, 
          { title: 'Permits', detail: 'Health department inspection.' },
          { title: 'Equipment', detail: 'High volume fryers and assembly lines.' }
        ] 
      },
      { 
        name: 'Phase 3: Tech Stack', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'App Signup', detail: 'Register with DoorDash, UberEats, etc.' }, 
          { title: 'Photography', detail: 'Professional food photos are 90% of sales.' },
          { title: 'Integration', detail: 'Set up Otter to merge all orders to one printer.' }
        ] 
      },
      { 
        name: 'Phase 4: Launch', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Promotions', detail: 'Run "BOGO" offers in apps to get initial rank.' }, 
          { title: 'Operations', detail: 'Focus on speed. <5 min prep time.' },
          { title: 'Reviews', detail: 'Include notes asking for 5 stars.' }
        ] 
      }
    ]
  },
  catering: {
    headerImage: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80",
    title: 'Event Catering',
    description: 'Food service for weddings and corporate events.',
    terms: [
      { term: 'Chafing Dish', def: 'Metal pans used to keep food warm.' },
      { term: 'Headcount', def: 'Number of guests to feed.' },
      { term: 'Tasting', def: 'Pre-event meeting where clients try the food.' }
    ],
    funding: [],
    tools: [
      { name: 'Total Party Planner', desc: 'Catering Software', link: 'totalpartyplanner.com' },
      { name: 'Costco', desc: 'Supplies', link: 'costco.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Menu & Pricing', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Menu Design', detail: 'Buffet vs Plated options.' }, 
          { title: 'Pricing Model', detail: 'Per head pricing. Factor in staff/labor.' },
          { title: 'Tasting Menu', detail: 'Create a sample menu for sales meetings.' }
        ] 
      },
      { 
        name: 'Phase 2: Legal & Kitchen', 
        duration: '1 Month', 
        tasks: [
          { title: 'Commissary', detail: 'Rent shared kitchen time for prep.' }, 
          { title: 'Vehicle', detail: 'Van for transporting food/equipment.' },
          { title: 'Insurance', detail: 'Liability and Liquor Liability if serving.' }
        ] 
      },
      { 
        name: 'Phase 3: Sales', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Venues', detail: 'Bring free lunch to venue managers.' }, 
          { title: 'The Knot', detail: 'Create listing for weddings.' },
          { title: 'Corporate', detail: 'Email office managers about lunch options.' }
        ] 
      },
      { 
        name: 'Phase 4: Operations', 
        duration: 'Per Event', 
        tasks: [
          { title: 'Staffing', detail: 'Hire servers and bartenders per gig.' }, 
          { title: 'Prep', detail: '2 days of cooking before event.' },
          { title: 'Load In', detail: 'Transport and setup at venue.' }
        ] 
      }
    ]
  },
  micro_bakery: {
    headerImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    title: 'Cottage Bakery',
    description: 'Home-based bakery selling artisanal goods.',
    terms: [
      { term: 'Cottage Food Law', def: 'Laws allowing sale of homemade low-risk foods.' },
      { term: 'Starter', def: 'Fermented flour/water for sourdough.' },
      { term: 'Proofing', def: 'Letting dough rise.' }
    ],
    funding: [],
    tools: [
      { name: 'Hotplate', desc: 'Bakery Orders', link: 'hotplate.com' },
      { name: 'Instagram', desc: 'Marketing', link: 'instagram.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Legal Check', 
        duration: '1 Week', 
        tasks: [
          { title: 'Cottage Laws', detail: 'Verify what you can bake at home (usually no custard/meat).' }, 
          { title: 'Labeling', detail: 'Design labels with required allergen info.' },
          { title: 'Permit', detail: 'Apply for home kitchen permit if required.' }
        ] 
      },
      { 
        name: 'Phase 2: Product', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'R&D', detail: 'Perfect your sourdough or cookie recipe.' }, 
          { title: 'Packaging', detail: 'Eco-friendly boxes and twine.' },
          { title: 'Pricing', detail: 'Don\'t underprice. Factor in electricity/time.' }
        ] 
      },
      { 
        name: 'Phase 3: Launch', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Drops', detail: 'Announce "Pre-orders open" on Monday for Friday pickup.' }, 
          { title: 'Photos', detail: 'High quality crumb shots.' },
          { title: 'Subscribers', detail: 'Launch a "Bread Club" subscription.' }
        ] 
      },
      { 
        name: 'Phase 4: Growth', 
        duration: '6 Months', 
        tasks: [
          { title: 'Farmer\'s Market', detail: 'Apply for a booth.' }, 
          { title: 'Wholesale', detail: 'Sell pastries to local coffee shops.' },
          { title: 'Oven Upgrade', detail: 'Buy a Rofco or commercial deck oven.' }
        ] 
      }
    ]
  },

  // --- SERVICES ---
  cleaning: {
    headerImage: "https://images.unsplash.com/photo-1581578731117-104f8a7d4a9a?auto=format&fit=crop&w=1000&q=80",
    title: 'Eco-Cleaning Service',
    description: 'Start a sustainable residential cleaning service.',
    terms: [
      { term: 'Bonded & Insured', def: 'Protection against theft or damage. Essential for client trust.' },
      { term: 'Deep Clean', def: 'A more thorough, expensive service usually done for first-time clients.' },
      { term: 'Recurring', def: 'Clients who book weekly or bi-weekly. The backbone of your revenue.' }
    ],
    funding: [
      { title: 'Equipment Financing', type: 'Loan', amount: '$5k', desc: 'Loans specifically for buying expensive gear.' }
    ],
    tools: [
      { name: 'Jobber', desc: 'Scheduling & CRM', link: 'getjobber.com' },
      { name: 'Nextdoor', desc: 'Local Marketing', link: 'nextdoor.com' },
      { name: 'Thumbtack', desc: 'Lead Generation', link: 'thumbtack.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Setup', 
        duration: '1-2 Weeks', 
        tasks: [
          { title: 'Business Registration', detail: 'Register LLC and get Tax ID.' }, 
          { title: 'Supply Acquisition', detail: 'Purchase eco-friendly chemicals, HEPA vacuums, and microfiber cloths.' },
          { title: 'Insurance', detail: 'Purchase general liability and bonding.' }
        ] 
      },
      { 
        name: 'Phase 2: Branding', 
        duration: '1 Week', 
        tasks: [
          { title: 'Website', detail: 'Simple booking page with "Get a Quote" form.' }, 
          { title: 'Google Business', detail: 'Claim profile. Verify address to show up in Maps.' },
          { title: 'Uniforms', detail: 'Branded polo shirts build trust instantly.' }
        ] 
      },
      { 
        name: 'Phase 3: Launch Marketing', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Nextdoor Ads', detail: 'Run local ads targeting specific neighborhoods.' }, 
          { title: 'Flyer Distribution', detail: 'Door hangers in high-income areas.' },
          { title: 'First 5 Clients', detail: 'Offer discount in exchange for Google Reviews.' }
        ] 
      },
      { 
        name: 'Phase 4: Operations', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Software Setup', detail: 'Use Jobber for scheduling and auto-invoicing.' }, 
          { title: 'Hiring', detail: 'Hire first employee once you are fully booked.' },
          { title: 'Quality Control', detail: 'Implement checklists for every clean.' }
        ] 
      }
    ]
  },
  tutoring: {
    headerImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80",
    title: 'Online Tutoring Platform',
    description: 'Scale your expertise into a teaching business.',
    terms: [
      { term: 'Pedagogy', def: 'The method and practice of teaching.' },
      { term: 'LMS', def: 'Learning Management System. Software to deliver educational courses.' },
      { term: 'Asynchronous', def: 'Learning that does not happen at the same time (e.g., pre-recorded videos).' }
    ],
    funding: [],
    tools: [
        { name: 'TutorBird', desc: 'Tutor Management', link: 'tutorbird.com' },
        { name: 'Zoom', desc: 'Video Calls', link: 'zoom.us' }
    ],
    stages: [
      { 
        name: 'Phase 1: Curriculum', 
        duration: '1-2 Weeks', 
        tasks: [
          { title: 'Subject Definition', detail: 'Pick high-demand subjects (e.g. SAT Math, Coding).' }, 
          { title: 'Lesson Planning', detail: 'Create standard slide decks and worksheets.' },
          { title: 'Tech Setup', detail: 'Test camera, mic, and drawing tablet.' }
        ] 
      },
      { 
        name: 'Phase 2: Business Setup', 
        duration: '1 Week', 
        tasks: [
          { title: 'Scheduling Tool', detail: 'Set up Calendly or TutorBird for bookings.' }, 
          { title: 'Payment Processing', detail: 'Set up Stripe links for packages (not just single hours).' },
          { title: 'Policies', detail: 'Draft cancellation and refund policy.' }
        ] 
      },
      { 
        name: 'Phase 3: Acquisition', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Local Outreach', detail: 'Contact local PTA groups and libraries.' }, 
          { title: 'Content Marketing', detail: 'Post "How To" clips on TikTok/Shorts.' },
          { title: 'Free Workshops', detail: 'Host a free Zoom webinar to demonstrate value.' }
        ] 
      },
      { 
        name: 'Phase 4: Scaling', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Group Sessions', detail: 'Launch small group classes to increase hourly rate.' }, 
          { title: 'Hire Tutors', detail: 'Bring on subcontractors for subjects you don\'t teach.' },
          { title: 'Record Courses', detail: 'Create passive income via recorded lessons.' }
        ] 
      }
    ]
  },
  consulting: {
    headerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
    title: 'Management Consulting',
    description: 'Solve complex problems for businesses.',
    terms: [
      { term: 'Billable Hours', def: 'Hours worked that can be charged to the client.' },
      { term: 'Deliverables', def: 'Tangible outputs (reports, presentations) promised to client.' },
      { term: 'Scope', def: 'Defined boundaries of the project.' }
    ],
    funding: [],
    tools: [
      { name: 'LinkedIn Sales Nav', desc: 'Lead Gen', link: 'linkedin.com' },
      { name: 'PowerPoint', desc: 'Decks', link: 'office.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Positioning', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Define Expertise', detail: 'Are you Ops, HR, Strategy, or Tech?' }, 
          { title: 'LinkedIn Profile', detail: 'Optimize profile to look like an authority, not a job seeker.' },
          { title: 'Offer Creation', detail: 'Package your service (e.g. "90 Day Turnaround").' }
        ] 
      },
      { 
        name: 'Phase 2: Outreach', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Warm Market', detail: 'Email past colleagues and bosses.' }, 
          { title: 'Networking', detail: 'Attend industry chambers of commerce events.' },
          { title: 'Content', detail: 'Write white papers or case studies on LinkedIn.' }
        ] 
      },
      { 
        name: 'Phase 3: Sales', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Discovery Calls', detail: 'Diagnose the problem before pitching.' }, 
          { title: 'Proposal Writing', detail: 'Create custom proposals outlining ROI.' },
          { title: 'Closing', detail: 'Sign contracts and collect deposit.' }
        ] 
      },
      { 
        name: 'Phase 4: Delivery', 
        duration: 'Project-based', 
        tasks: [
          { title: 'Onboarding', detail: 'Kickoff meeting and data collection.' }, 
          { title: 'Analysis', detail: 'Deep dive into client problems.' },
          { title: 'Final Presentation', detail: 'Present findings and roadmap.' }
        ] 
      }
    ]
  },
  event_planning: {
    headerImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
    title: 'Event Planning Agency',
    description: 'Organize memorable experiences for clients.',
    terms: [
      { term: 'RFP', def: 'Request for Proposal. Soliciting bids from vendors.' },
      { term: 'BEO', def: 'Banquet Event Order. Document outlining food/drink details.' },
      { term: 'Run of Show', def: 'Minute-by-minute schedule of the event.' }
    ],
    funding: [
      { title: 'Small Business Grant', type: 'Grant', amount: '$5k', desc: 'FedEx Small Business Grant Contest.' }
    ],
    tools: [
      { name: 'HoneyBook', desc: 'Client Management', link: 'honeybook.com' },
      { name: 'Pinterest', desc: 'Inspiration Boards', link: 'pinterest.com' },
      { name: 'Canva', desc: 'Proposal Design', link: 'canva.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Brand & Niche', 
        duration: '1 Month', 
        tasks: [
          { title: 'Niche Selection', detail: 'Weddings, Corporate, or Parties?' }, 
          { title: 'Portfolio Build', detail: 'Plan styled shoots to build a portfolio without clients.' },
          { title: 'Vendor List', detail: 'Meet florists, caterers, and DJs.' }
        ] 
      },
      { 
        name: 'Phase 2: Marketing', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Website', detail: 'Showcase your portfolio heavily.' }, 
          { title: 'Venue Relationships', detail: 'Get on the "Preferred Vendor" lists of local venues.' },
          { title: 'Social Media', detail: 'Instagram and Pinterest are key drivers.' }
        ] 
      },
      { 
        name: 'Phase 3: Sales', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Consultations', detail: 'Free initial meet to assess fit.' }, 
          { title: 'Proposals', detail: 'Send beautiful digital brochures.' },
          { title: 'Contracts', detail: 'Secure non-refundable deposit.' }
        ] 
      },
      { 
        name: 'Phase 4: Execution', 
        duration: 'Per Event', 
        tasks: [
          { title: 'Planning', detail: 'Timeline creation and vendor coordination.' }, 
          { title: 'Day-Of Coordination', detail: 'Manage the event on-site.' },
          { title: 'Post-Event', detail: 'Send thank yous and ask for reviews.' }
        ] 
      }
    ]
  },
  non_profit: {
    headerImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80",
    title: 'Community Non-Profit',
    description: 'Start a 501(c)(3) to make a social impact.',
    terms: [
      { term: '501(c)(3)', def: 'The specific IRS tax code for charitable organizations.' },
      { term: 'Bylaws', def: 'The internal rules that govern how the non-profit is run.' },
      { term: 'Grant Writing', def: 'The practice of completing applications for funding from institutions.' }
    ],
    funding: [
      { title: 'Google Ad Grants', type: 'Grant', amount: '$10k/mo', desc: 'Free advertising for non-profits.' }
    ],
    tools: [
      { name: 'Donorbox', desc: 'Donation Forms', link: 'donorbox.org' },
      { name: 'TechSoup', desc: 'Software Discounts', link: 'techsoup.org' }
    ],
    stages: [
      { 
        name: 'Phase 1: Foundation', 
        duration: '1-2 Months', 
        tasks: [
          { title: 'Mission Statement', detail: 'Clearly define who you help and how.' }, 
          { title: 'Board of Directors', detail: 'Recruit at least 3 unrelated members.' },
          { title: 'Bylaws', detail: 'Draft the operating rules.' }
        ] 
      },
      { 
        name: 'Phase 2: Legal Status', 
        duration: '2-6 Months', 
        tasks: [
          { title: 'Incorporation', detail: 'File Articles of Incorporation with your state.' }, 
          { title: 'EIN', detail: 'Get Employer Identification Number.' },
          { title: '501(c)(3) Status', detail: 'File Form 1023 with the IRS.' }
        ] 
      },
      { 
        name: 'Phase 3: Fundraising', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Donation Page', detail: 'Set up online giving portal.' }, 
          { title: 'Launch Event', detail: 'Host a fundraiser to kickstart capital.' },
          { title: 'Grant Research', detail: 'Look for local foundations aligned with your mission.' }
        ] 
      },
      { 
        name: 'Phase 4: Programs', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Pilot Program', detail: 'Run your first initiative.' }, 
          { title: 'Impact Measurement', detail: 'Collect data to prove your success to donors.' },
          { title: 'Volunteer Mgmt', detail: 'Recruit and train volunteers.' }
        ] 
      }
    ]
  },
  pet_sitting: {
    headerImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80",
    title: 'Pet Care Agency',
    description: 'Professional pet sitting and dog walking.',
    terms: [
      { term: 'Meet & Greet', def: 'Initial meeting with client and pet to assess compatibility.' },
      { term: 'Service Area', def: 'The geographic radius you are willing to travel to.' },
      { term: 'Lockbox', def: 'Secure box for client keys.' }
    ],
    funding: [],
    tools: [
      { name: 'Time To Pet', desc: 'Pet Sitter Software', link: 'timetopet.com' },
      { name: 'Rover', desc: 'Marketplace', link: 'rover.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Setup', 
        duration: '1 Week', 
        tasks: [
          { title: 'Service Menu', detail: 'Define rates for walks, drop-ins, and overnights.' }, 
          { title: 'Legal', detail: 'Get specific Pet Sitter Insurance (PCI).' },
          { title: 'Software', detail: 'Set up portal for client booking.' }
        ] 
      },
      { 
        name: 'Phase 2: Marketing', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Vet Outreach', detail: 'Leave flyers at local vet clinics.' }, 
          { title: 'Google Business', detail: 'Get reviews to rank for "Dog Walker near me".' },
          { title: 'Nextdoor', detail: 'Post in local neighborhood groups.' }
        ] 
      },
      { 
        name: 'Phase 3: Operations', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Intake Process', detail: 'Create forms for vet info and pet habits.' }, 
          { title: 'Key Management', detail: 'Establish secure system for holding keys.' },
          { title: 'First Clients', detail: 'Over-deliver with photos and report cards.' }
        ] 
      },
      { 
        name: 'Phase 4: Growth', 
        duration: '6 Months+', 
        tasks: [
          { title: 'Hiring', detail: 'Hire staff to cover more area.' }, 
          { title: 'Upsells', detail: 'Add services like Grooming or Wedding Chaperone.' },
          { title: 'Merch', detail: 'Branded bandanas for the dogs.' }
        ] 
      }
    ]
  },

  // --- E-COMMERCE ---
  dropshipping: {
    headerImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1000&q=80",
    title: 'Niche Dropshipping Store',
    description: 'Sell products without holding inventory.',
    terms: [
      { term: '3PL', def: 'Third-Party Logistics. Outsourcing ecommerce logistics processes.' },
      { term: 'Markup', def: 'The difference between the cost of a good and its selling price.' },
      { term: 'AOV', def: 'Average Order Value. The average amount spent each time a customer places an order.' }
    ],
    funding: [
      { title: 'Clearco', type: 'Revenue Share', amount: 'Var.', desc: 'Funding for marketing spend based on revenue.' },
      { title: 'Shopify Capital', type: 'Loan', amount: 'Var.', desc: 'Loans directly from the platform.' }
    ],
    tools: [
      { name: 'Shopify', desc: 'E-commerce Platform', link: 'shopify.com' },
      { name: 'DSers', desc: 'Order Fulfillment', link: 'dsers.com' },
      { name: 'Canva', desc: 'Ad Creatives', link: 'canva.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Research', 
        duration: '1-2 Weeks', 
        tasks: [
          { title: 'Product Hunt', detail: 'Find a "Winning Product" (Problem solver or Wow factor).' }, 
          { title: 'Supplier Vet', detail: 'Check shipping times and reliability on AliExpress/CJ.' },
          { title: 'Competitor Spy', detail: 'Analyze ads of others selling similar items.' }
        ] 
      },
      { 
        name: 'Phase 2: Store Build', 
        duration: '3-5 Days', 
        tasks: [
          { title: 'Shopify Setup', detail: 'Pick a clean, fast theme. Add policies.' }, 
          { title: 'Copywriting', detail: 'Focus on benefits, not features.' },
          { title: 'Apps', detail: 'Install review importer and email marketing app.' }
        ] 
      },
      { 
        name: 'Phase 3: Creative', 
        duration: '1 Week', 
        tasks: [
          { title: 'Order Sample', detail: 'Film your own content. Don\'t steal.' }, 
          { title: 'Ad Creation', detail: 'Edit 3-5 UGC style videos for TikTok.' },
          { title: 'Offer Design', detail: 'Create "Buy 1 Get 1" or bundles to boost AOV.' }
        ] 
      },
      { 
        name: 'Phase 4: Scale', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Testing Ads', detail: 'Run TikTok/FB ads at $50/day.' }, 
          { title: 'Optimization', detail: 'Kill bad ads, scale good ones.' },
          { title: 'Fulfillment', detail: 'Ensure orders are processing automatically.' }
        ] 
      }
    ]
  },
  handmade: {
    headerImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=80",
    title: 'Handmade Goods Shop',
    description: 'Sell your unique crafts to a global audience.',
    terms: [
      { term: 'Bespoke', def: 'Made for a particular customer or user.' },
      { term: 'Lead Time', def: 'The latency between the initiation and completion of a production process.' },
      { term: 'SEO', def: 'Search Engine Optimization. Critical for getting found on Etsy.' }
    ],
    funding: [
        { title: 'Etsy Fund', type: 'Grant', amount: 'Var.', desc: 'Various initiatives by Etsy.' }
    ],
    tools: [
        { name: 'Etsy', desc: 'Marketplace', link: 'etsy.com' },
        { name: 'Marmalead', desc: 'Etsy SEO', link: 'marmalead.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Production', 
        duration: 'Varies', 
        tasks: [
          { title: 'Product Dev', detail: 'Perfect your prototype.' }, 
          { title: 'Batching', detail: 'Make 10-20 items inventory.' },
          { title: 'Pricing', detail: 'Calculate material + labor + profit.' }
        ] 
      },
      { 
        name: 'Phase 2: Listing', 
        duration: '1 Week', 
        tasks: [
          { title: 'Photography', detail: 'Natural light, multiple angles.' }, 
          { title: 'SEO Titles', detail: 'Use long-tail keywords in title and tags.' },
          { title: 'Shop Branding', detail: 'Create Banner, Logo, and About section.' }
        ] 
      },
      { 
        name: 'Phase 3: Logistics', 
        duration: '1 Week', 
        tasks: [
          { title: 'Shipping Profile', detail: 'Set up calculated shipping.' }, 
          { title: 'Packaging', detail: 'Create unboxing experience (branded notes/tissue).' },
          { title: 'Supplies', detail: 'Bulk buy mailers and labels.' }
        ] 
      },
      { 
        name: 'Phase 4: Marketing', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Etsy Ads', detail: 'Run low budget ads ($1/day).' }, 
          { title: 'Social Media', detail: 'Post "Process Videos" on Reels/TikTok.' },
          { title: 'Email List', detail: 'Put a QR code in packages to signup form.' }
        ] 
      }
    ]
  },
  subscription: {
    headerImage: "https://images.unsplash.com/photo-1628149455678-16f37bc392f4?auto=format&fit=crop&w=1000&q=80",
    title: 'Subscription Box',
    description: 'Curated monthly boxes delivered to doorsteps.',
    terms: [
      { term: 'Kitting', def: 'The process of assembling individual items into a ready-to-ship set.' },
      { term: 'Procurement', def: 'Sourcing products for the box.' },
      { term: 'Churn Rate', def: 'The annual percentage rate at which customers stop subscribing.' }
    ],
    funding: [],
    tools: [
      { name: 'Cratejoy', desc: 'Sub Box Platform', link: 'cratejoy.com' },
      { name: 'Pirate Ship', desc: 'Cheap Shipping', link: 'pirateship.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Concept', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Theme Selection', detail: 'Must be specific (e.g. "Tea for Witches").' }, 
          { title: 'Box Modeling', detail: 'Determine box size and weight for shipping costs.' },
          { title: 'Prototype', detail: 'Assemble a sample box for photos.' }
        ] 
      },
      { 
        name: 'Phase 2: Pre-Launch', 
        duration: '1 Month', 
        tasks: [
          { title: 'Landing Page', detail: 'Capture emails before buying inventory.' }, 
          { title: 'Sourcing', detail: 'Contact vendors for wholesale pricing.' },
          { title: 'Pre-Sales', detail: 'Sell the first month before buying product.' }
        ] 
      },
      { 
        name: 'Phase 3: Operations', 
        duration: 'Monthly', 
        tasks: [
          { title: 'Ordering', detail: 'Place orders based on subscriber count.' }, 
          { title: 'Packing Party', detail: 'Assemble all boxes (Kitting).' },
          { title: 'Shipping', detail: 'Print batch labels and drop off.' }
        ] 
      },
      { 
        name: 'Phase 4: Growth', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Unboxing Videos', detail: 'Send free boxes to YouTubers.' }, 
          { title: 'Referral Program', detail: 'Give free boxes for referring friends.' },
          { title: 'Community', detail: 'Create a private group for subscribers.' }
        ] 
      }
    ]
  },
  print_on_demand: {
    headerImage: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=1000&q=80",
    title: 'Print on Demand',
    description: 'Sell custom designs on apparel/mugs with zero inventory.',
    terms: [
      { term: 'POD', def: 'Print on Demand.' },
      { term: 'Mockup', def: 'Digital image showing your design on a shirt.' },
      { term: 'Royalty', def: 'Profit margin after paying print costs.' }
    ],
    funding: [],
    tools: [
      { name: 'Printful', desc: 'Fulfillment', link: 'printful.com' },
      { name: 'Etsy', desc: 'Marketplace', link: 'etsy.com' },
      { name: 'Placeit', desc: 'Mockups', link: 'placeit.net' }
    ],
    stages: [
      { 
        name: 'Phase 1: Niche & Design', 
        duration: '1 Week', 
        tasks: [
          { title: 'Niche', detail: 'Specific hobbies (e.g. Gardening for Dads).' }, 
          { title: 'Design', detail: 'Use Canva or hire Fiverr designers.' },
          { title: 'Files', detail: 'Export high-res transparent PNGs.' }
        ] 
      },
      { 
        name: 'Phase 2: Setup', 
        duration: '3 Days', 
        tasks: [
          { title: 'Printful', detail: 'Create account and sync with Etsy/Shopify.' }, 
          { title: 'Product Select', detail: 'Choose high quality blanks (Bella+Canvas).' },
          { title: 'Samples', detail: 'Order samples to check print quality.' }
        ] 
      },
      { 
        name: 'Phase 3: Listing', 
        duration: '1 Week', 
        tasks: [
          { title: 'Mockups', detail: 'Create lifestyle images of people wearing the gear.' }, 
          { title: 'SEO', detail: 'Keywords in titles and description.' },
          { title: 'Publish', detail: 'Launch 10-20 listings at once.' }
        ] 
      },
      { 
        name: 'Phase 4: Scale', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Ads', detail: 'Run Etsy Ads on best sellers.' }, 
          { title: 'More Designs', detail: 'Consistency is key. 1 new design a day.' },
          { title: 'New Products', detail: 'Expand to hats, mugs, or wall art.' }
        ] 
      }
    ]
  },
  digital_products: {
    headerImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&q=80",
    title: 'Digital Products',
    description: 'Sell downloadable templates and files.',
    terms: [
      { term: 'Passive Income', def: 'Earning money with minimal daily effort after setup.' },
      { term: 'PLR', def: 'Private Label Rights. Buying rights to resell content.' },
      { term: 'Conversion', def: 'Turning a visitor into a buyer.' }
    ],
    funding: [],
    tools: [
      { name: 'Notion', desc: 'Template Creation', link: 'notion.so' },
      { name: 'Gumroad', desc: 'Sales Platform', link: 'gumroad.com' },
      { name: 'Canva', desc: 'Design', link: 'canva.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Creation', 
        duration: '1 Week', 
        tasks: [
          { title: 'Identify Need', detail: 'What organizer/tracker do people need?' }, 
          { title: 'Build Product', detail: 'Create Notion template, Excel sheet, or PDF planner.' },
          { title: 'Instructions', detail: 'Write a clear "How to use" guide.' }
        ] 
      },
      { 
        name: 'Phase 2: Storefront', 
        duration: '1 Day', 
        tasks: [
          { title: 'Gumroad', detail: 'Set up product page.' }, 
          { title: 'Visuals', detail: 'Create attractive cover images.' },
          { title: 'Pricing', detail: 'Usually $5-$50 range.' }
        ] 
      },
      { 
        name: 'Phase 3: Launch', 
        duration: '1 Week', 
        tasks: [
          { title: 'Product Hunt', detail: 'Launch your template.' }, 
          { title: 'Twitter/X', detail: 'Give away free copies for Retweets.' },
          { title: 'Reddit', detail: 'Post in relevant subreddits (be helpful, not spammy).' }
        ] 
      },
      { 
        name: 'Phase 4: Optimization', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Bundles', detail: 'Combine products for higher AOV.' }, 
          { title: 'Email Flow', detail: 'Upsell customers on your next product.' },
          { title: 'Affiliates', detail: 'Enable Gumroad affiliates to sell for you.' }
        ] 
      }
    ]
  },
  reselling: {
    headerImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=80",
    title: 'Vintage Reselling',
    description: 'Flip thrifted finds for profit.',
    terms: [
      { term: 'BOLO', def: 'Be On Lookout. Items to watch for.' },
      { term: 'Comps', def: 'Comparable sales. What did this item actually sell for?' },
      { term: 'Death Pile', def: 'Unlisted inventory piling up.' }
    ],
    funding: [
       { title: 'Inventory Cash', type: 'Self', amount: '$100', desc: 'Start small at garage sales.' }
    ],
    tools: [
      { name: 'eBay', desc: 'Marketplace', link: 'ebay.com' },
      { name: 'Depop', desc: 'Fashion Market', link: 'depop.com' },
      { name: 'Google Lens', desc: 'Identification', link: 'google.com' }
    ],
    stages: [
      { 
        name: 'Phase 1: Sourcing', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Thrift Stores', detail: 'Visit Goodwill/Savers regularly.' }, 
          { title: 'Garage Sales', detail: 'Early Saturday mornings offer best prices.' },
          { title: 'Research', detail: 'Check "Sold Listings" on eBay while in store.' }
        ] 
      },
      { 
        name: 'Phase 2: Prep', 
        duration: 'Weekly', 
        tasks: [
          { title: 'Cleaning', detail: 'Wash clothes, clean shoes.' }, 
          { title: 'Photography', detail: 'Clean white background, natural light.' },
          { title: 'Measurements', detail: 'List pit-to-pit and length.' }
        ] 
      },
      { 
        name: 'Phase 3: Listing', 
        duration: 'Daily', 
        tasks: [
          { title: 'Cross-Post', detail: 'List on eBay, Poshmark, and Depop.' }, 
          { title: 'Description', detail: 'Note all flaws honest.' },
          { title: 'Pricing', detail: 'Price competitively based on comps.' }
        ] 
      },
      { 
        name: 'Phase 4: Shipping', 
        duration: 'Daily', 
        tasks: [
          { title: 'Supplies', detail: 'Buy polymailers in bulk.' }, 
          { title: 'Speed', detail: 'Ship within 24 hours for top rated status.' },
          { title: 'Inventory Mgmt', detail: 'Bin system to find items quickly.' }
        ] 
      }
    ]
  },

  // --- DEFAULT ---
  default: {
    headerImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    title: 'General Business Roadmap',
    description: 'Standard procedure for starting a new venture.',
    terms: [
      { term: 'ROI', def: 'Return on Investment.' },
      { term: 'B2B', def: 'Business to Business.' },
      { term: 'B2C', def: 'Business to Consumer.' }
    ],
    funding: [
      { title: 'Friends & Family', type: 'Investment', amount: 'Var.', desc: 'The most common first round of funding.' },
      { title: 'SBA Loans', type: 'Loan', amount: 'Var.', desc: 'Standard small business loans.' }
    ],
    tools: [
      { name: 'Google Workspace', desc: 'Email & Docs', link: 'workspace.google.com' },
      { name: 'Quickbooks', desc: 'Accounting', link: 'quickbooks.intuit.com' },
      { name: 'Notion', desc: 'Organization', link: 'notion.so' }
    ],
    stages: [
      { 
        name: 'Phase 1: Planning', 
        duration: '2 Weeks', 
        tasks: [
          { title: 'Market Research', detail: 'Analyze competitors and demand.' }, 
          { title: 'Business Plan', detail: 'Draft a 1-page lean canvas.' },
          { title: 'Financial Model', detail: 'Estimate startup costs and break-even point.' }
        ] 
      },
      { 
        name: 'Phase 2: Legal', 
        duration: '1-2 Weeks', 
        tasks: [
          { title: 'Entity Formation', detail: 'Register LLC or Sole Prop.' }, 
          { title: 'Tax ID', detail: 'Get your EIN from the IRS.' },
          { title: 'Banking', detail: 'Open a business bank account.' }
        ] 
      },
      { 
        name: 'Phase 3: Product', 
        duration: '1-3 Months', 
        tasks: [
          { title: 'MVP', detail: 'Build the Minimum Viable Product.' }, 
          { title: 'Testing', detail: 'Get feedback from early users.' },
          { title: 'Refinement', detail: 'Iterate based on feedback.' }
        ] 
      },
      { 
        name: 'Phase 4: Launch', 
        duration: 'Ongoing', 
        tasks: [
          { title: 'Marketing', detail: 'Turn on acquisition channels.' }, 
          { title: 'Sales', detail: 'Close first 10 customers.' },
          { title: 'Review', detail: 'Analyze first month metrics.' }
        ] 
      }
    ]
  }
};

const RESOURCES = [
  // Strategy
  { id: 1, type: 'video', title: 'Validating your Idea', author: 'Sarah J.', duration: '15 min', category: 'Strategy' },
  { id: 13, type: 'tool', title: 'Pricing Strategy Simulator', author: 'Sales Team', format: 'XLSX', category: 'Strategy' },
  { id: 14, type: 'template', title: 'Lean Canvas Model', author: 'Techstars', format: 'PDF', category: 'Strategy' },
  { id: 15, type: 'video', title: 'Blue Ocean Strategy', author: 'Prof. Kim', duration: '20 min', category: 'Strategy' },
  { id: 16, type: 'tool', title: 'SWOT Analysis Builder', author: 'Consulting Corps', format: 'Tool', category: 'Strategy' },
  { id: 17, type: 'template', title: 'OKRs for Startups', author: 'Google Ventures', format: 'DOCX', category: 'Strategy' },

  // Fundraising
  { id: 2, type: 'template', title: 'Pitch Deck Template', author: 'Accelerate Team', format: 'PPTX', category: 'Fundraising' },
  { id: 9, type: 'video', title: 'Understanding VCs', author: 'Elena Boyd', duration: '30 min', category: 'Fundraising' },
  { id: 18, type: 'tool', title: 'Grant Database Access', author: 'GovFind', format: 'Link', category: 'Fundraising' },
  { id: 19, type: 'template', title: 'Investor Email Scripts', author: 'Y Combinator', format: 'DOCX', category: 'Fundraising' },
  { id: 20, type: 'video', title: 'Crowdfunding 101', author: 'Kickstarter', duration: '45 min', category: 'Fundraising' },
  { id: 21, type: 'tool', title: 'Cap Table Calculator', author: 'Carta', format: 'XLSX', category: 'Fundraising' },

  // Finance
  { id: 3, type: 'tool', title: 'Cashflow Calculator', author: 'Finance Dept', format: 'XLSX', category: 'Finance' },
  { id: 12, type: 'template', title: 'Invoice Template', author: 'Finance Dept', format: 'PDF', category: 'Finance' },
  { id: 22, type: 'template', title: 'P&L Statement', author: 'Score.org', format: 'XLSX', category: 'Finance' },
  { id: 23, type: 'video', title: 'Taxes for Founders', author: 'IRS Expert', duration: '60 min', category: 'Finance' },
  { id: 24, type: 'tool', title: 'Burn Rate Tracker', author: 'StartupGrind', format: 'Sheet', category: 'Finance' },
  { id: 25, type: 'template', title: 'Expense Policy', author: 'HR Dept', format: 'DOCX', category: 'Finance' },

  // Marketing
  { id: 4, type: 'video', title: 'Marketing 101', author: 'Mike R.', duration: '45 min', category: 'Marketing' },
  { id: 6, type: 'tool', title: 'SEO Keyword Planner', author: 'Growth Team', format: 'Tool', category: 'Marketing' },
  { id: 8, type: 'template', title: 'Social Media Calendar', author: 'Creative Studio', format: 'SHEETS', category: 'Marketing' },
  { id: 26, type: 'template', title: 'Email Drip Campaign', author: 'Mailchimp', format: 'PDF', category: 'Marketing' },
  { id: 27, type: 'video', title: 'TikTok for Business', author: 'Creator Fund', duration: '12 min', category: 'Marketing' },
  { id: 28, type: 'tool', title: 'Headline Analyzer', author: 'CoSchedule', format: 'Web', category: 'Marketing' },
  { id: 29, type: 'template', title: 'Influencer Contract', author: 'Legal Team', format: 'DOCX', category: 'Marketing' },
  { id: 30, type: 'video', title: 'Building a Personal Brand', author: 'Gary V.', duration: '30 min', category: 'Marketing' },

  // Legal
  { id: 5, type: 'template', title: 'Non-Disclosure Agreement', author: 'Legal Eagle', format: 'DOCX', category: 'Legal' },
  { id: 31, type: 'template', title: 'Co-Founder Agreement', author: 'Clerky', format: 'DOCX', category: 'Legal' },
  { id: 32, type: 'template', title: 'Privacy Policy', author: 'Termly', format: 'HTML', category: 'Legal' },
  { id: 33, type: 'video', title: 'IP Protection Basics', author: 'Patent Office', duration: '25 min', category: 'Legal' },
  { id: 34, type: 'template', title: 'Independent Contractor Agreement', author: 'LegalZoom', format: 'DOCX', category: 'Legal' },

  // HR & Team
  { id: 7, type: 'video', title: 'Hiring Your First Employee', author: 'People Ops', duration: '22 min', category: 'HR' },
  { id: 35, type: 'template', title: 'Offer Letter', author: 'SHRM', format: 'DOCX', category: 'HR' },
  { id: 36, type: 'tool', title: 'Equity Split Calculator', author: 'Slicing Pie', format: 'Web', category: 'HR' },
  { id: 37, type: 'template', title: 'Employee Handbook', author: 'Workplace', format: 'PDF', category: 'HR' },
  { id: 38, type: 'video', title: 'Managing Remote Teams', author: 'GitLab', duration: '40 min', category: 'HR' },

  // Product & Design
  { id: 10, type: 'template', title: 'Product Roadmap', author: 'Tech Leads', format: 'FIGMA', category: 'Product' },
  { id: 39, type: 'template', title: 'User Persona Card', author: 'UX Lab', format: 'FIGMA', category: 'Product' },
  { id: 40, type: 'video', title: 'Figma for Non-Designers', author: 'DesignCourse', duration: '55 min', category: 'Product' },
  { id: 41, type: 'tool', title: 'Wireframe Kit', author: 'Balsamiq', format: 'Zip', category: 'Product' },
  { id: 42, type: 'template', title: 'PRD (Product Req. Doc)', author: 'Product Hunt', format: 'Notion', category: 'Product' },
  
  // Wellness
  { id: 11, type: 'video', title: 'Founder Mental Health', author: 'Dr. S. Lee', duration: '18 min', category: 'Wellness' },
  { id: 43, type: 'audio', title: 'Morning Meditation', author: 'Headspace', duration: '10 min', category: 'Wellness' },
  { id: 44, type: 'template', title: 'Weekly Habit Tracker', author: 'Atomic Habits', format: 'PDF', category: 'Wellness' },
  { id: 45, type: 'video', title: 'Avoiding Burnout', author: 'TED Talks', duration: '15 min', category: 'Wellness' },

  // Operations & Tech
  { id: 46, type: 'template', title: 'SOP Template', author: 'Process St', format: 'DOCX', category: 'Operations' },
  { id: 47, type: 'tool', title: 'Inventory Tracker', author: 'Shopify', format: 'SHEETS', category: 'Operations' },
  { id: 48, type: 'video', title: 'No-Code Crash Course', author: 'Bubble', duration: '90 min', category: 'Tech' },
  { id: 49, type: 'template', title: 'Cybersecurity Checklist', author: 'CISA', format: 'PDF', category: 'Tech' },
];

const INITIAL_COMMUNITIES = [
  { id: 'c1', name: 'SaaS Founders', members: 1240, joined: true, desc: 'For software builders.', color: 'text-blue-600 bg-blue-100' },
  { id: 'c2', name: 'Creative Minds', members: 850, joined: true, desc: 'Designers & artists.', color: 'text-purple-600 bg-purple-100' },
  { id: 'c3', name: 'E-Com Masters', members: 2100, joined: false, desc: 'DTC & retail strategies.', color: 'text-pink-600 bg-pink-100' },
  { id: 'c4', name: 'Green Tech', members: 430, joined: false, desc: 'Sustainable innovation.', color: 'text-emerald-600 bg-emerald-100' },
  { id: 'c5', name: 'Marketing Wizards', members: 3200, joined: false, desc: 'Growth hacks & SEO.', color: 'text-orange-600 bg-orange-100' },
  { id: 'c6', name: 'Hardware Hackers', members: 150, joined: false, desc: 'Physical product dev.', color: 'text-red-600 bg-red-100' },
  { id: 'c7', name: 'AI Pioneers', members: 5600, joined: false, desc: 'LLMs and GenAI tools.', color: 'text-indigo-600 bg-indigo-100' },
  { id: 'c8', name: 'No-Code Builders', members: 980, joined: true, desc: 'Build without code.', color: 'text-cyan-600 bg-cyan-100' },
  { id: 'c9', name: 'Student Hustle', members: 4500, joined: true, desc: 'Balancing school & biz.', color: 'text-yellow-600 bg-yellow-100' },
  { id: 'c10', name: 'FinTech Future', members: 620, joined: false, desc: 'Finance technology.', color: 'text-teal-600 bg-teal-100' },
  { id: 'c11', name: 'BioHacking', members: 300, joined: false, desc: 'Health & performance.', color: 'text-lime-600 bg-lime-100' },
  { id: 'c12', name: 'Legal Eagles', members: 120, joined: false, desc: 'IP and startup law.', color: 'text-slate-600 bg-slate-200' },
  { id: 'c13', name: 'Content Creators', members: 8900, joined: false, desc: 'YouTube, TikTok, etc.', color: 'text-rose-600 bg-rose-100' },
  { id: 'c14', name: 'Real Estate Gen Z', members: 400, joined: false, desc: 'PropTech and investing.', color: 'text-sky-600 bg-sky-100' },
  { id: 'c15', name: 'Crypto Corner', members: 1500, joined: false, desc: 'Web3 and Blockchain.', color: 'text-violet-600 bg-violet-100' },
];

const INITIAL_USERS = [
  { id: 'u1', name: 'Alex Rivera', role: 'Building SaaS', avatar: 'Alex', followed: false },
  { id: 'u2', name: 'Sarah Chen', role: 'Digital Artist', avatar: 'Sarah', followed: true },
  { id: 'u3', name: 'Marcus J.', role: 'Food Tech', avatar: 'Marcus', followed: false },
  { id: 'u4', name: 'Elena Boyd', role: 'VC Investor', avatar: 'Elena', followed: false },
  { id: 'u5', name: 'Dr. Lee', role: 'Wellness Coach', avatar: 'Lee', followed: true },
  { id: 'u6', name: 'Raj Patel', role: 'E-Com Expert', avatar: 'Raj', followed: false },
  { id: 'u7', name: 'Jordan Lee', role: 'No-Code Pro', avatar: 'Jordan', followed: true },
  { id: 'u8', name: 'Casey N.', role: 'Vlogger', avatar: 'Casey', followed: false },
  { id: 'u9', name: 'Maya P.', role: 'Sustainable Fashion', avatar: 'Maya', followed: true },
  { id: 'u10', name: 'Liam Grant', role: 'PropTech Founder', avatar: 'Liam', followed: false },
  { id: 'u11', name: 'Sophia Rossi', role: 'SEO Specialist', avatar: 'Sophia', followed: false },
  { id: 'u12', name: 'Noah Kim', role: 'Student Investor', avatar: 'Noah', followed: true },
  { id: 'u13', name: 'Olivia Vance', role: 'Legal Consultant', avatar: 'Olivia', followed: false },
  { id: 'u14', name: 'Ethan Hunt', role: 'Biohacker', avatar: 'Ethan', followed: false },
  { id: 'u15', name: 'Isabella Chen', role: 'Product Manager', avatar: 'Isabella', followed: false },
  { id: 'u16', name: 'Devon Lewis', role: 'App Developer', avatar: 'Devon', followed: false },
  { id: 'u17', name: 'Nina G.', role: 'Brand Strategist', avatar: 'Nina', followed: true },
  { id: 'u18', name: 'Tariq Al-Fayed', role: 'FinTech Founder', avatar: 'Tariq', followed: false },
  { id: 'u19', name: 'Chloe Deck', role: 'Pitch Coach', avatar: 'Chloe', followed: false },
  { id: 'u20', name: 'Max Power', role: 'Fitness Trainer', avatar: 'Max', followed: false },
];

const INITIAL_POSTS = [
  { 
    id: 'p0',
    authorId: 'me',
    communityId: 'c1',
    content: "Just joined Accelerate! Excited to start building my SaaS idea. Any tips for a newbie?",
    tags: ['Intro', 'Newbie'],
    likes: 3,
    comments: [],
    liked: false,
    timestamp: 'Just now'
  },
  { 
    id: 'p1', 
    authorId: 'u1', 
    communityId: 'c1', 
    content: "Just hit my first 10 customers using the cold email templates from the resource library! Highly recommend modifying the subject lines to be more personal.", 
    tags: ['Wins', 'Marketing'], 
    likes: 24, 
    comments: [
      { id: 'cm1', authorId: 'u2', text: 'Congrats! Which template specifically?', timestamp: '1h ago' },
      { id: 'cm2', authorId: 'u1', text: 'The "B2B Outreach" one in the Marketing folder.', timestamp: '45m ago' }
    ], 
    liked: false, 
    timestamp: '2h ago'
  },
  { 
    id: 'p2', 
    authorId: 'u2', 
    communityId: 'c2', 
    content: "Does anyone have recommendations for copyright lawyers familiar with NFT scaling? I'm at the Legal stage of the roadmap and feeling stuck.", 
    tags: ['Legal', 'Help Needed'], 
    likes: 8, 
    comments: [
      { id: 'cm3', authorId: 'u4', text: 'I can introduce you to a firm we use. DM me.', timestamp: '30m ago' }
    ], 
    liked: true, 
    timestamp: '4h ago'
  },
  {
    id: 'p3',
    authorId: 'u7',
    communityId: 'c8',
    content: "Unpopular opinion: You don't need a technical co-founder. I built my entire MVP using Bubble and Zapier in 3 weekends. Stop waiting, start building.",
    tags: ['NoCode', 'MVP', 'Motivation'],
    likes: 156,
    comments: [
       { id: 'cm4', authorId: 'u16', text: 'As a dev, I actually agree. Validate first, code later.', timestamp: '10m ago' }
    ],
    liked: false,
    timestamp: '5h ago'
  },
  {
    id: 'p4',
    authorId: 'u9',
    communityId: 'c4',
    content: "Sourcing eco-friendly packaging is a nightmare. Has anyone used NoIssue? Is the custom branding worth the extra cost?",
    tags: ['Sustainability', 'Packaging', 'Advice'],
    likes: 12,
    comments: [],
    liked: false,
    timestamp: '6h ago'
  },
  {
    id: 'p5',
    authorId: 'u12',
    communityId: 'c9',
    content: "Finals week + Product Launch week = ☠️. Shoutout to all the student founders grinding right now. We got this.",
    tags: ['StudentLife', 'Grind'],
    likes: 89,
    comments: [
        { id: 'cm5', authorId: 'me', text: 'Good luck! Prioritize sleep though.', timestamp: 'Just now' }
    ],
    liked: true,
    timestamp: '8h ago'
  },
  {
    id: 'p6',
    authorId: 'u11',
    communityId: 'c5',
    content: "Updated the 'SEO Keyword Planner' tool in the resources tab. It now supports long-tail question analysis. Check it out!",
    tags: ['Resources', 'SEO', 'Update'],
    likes: 45,
    comments: [],
    liked: false,
    timestamp: '12h ago'
  },
  {
    id: 'p7',
    authorId: 'u4',
    communityId: 'c1',
    content: "Seeing a lot of pitch decks lately that ignore the 'Competition' slide. Investors know you aren't the only one. Be honest about who else is in the space.",
    tags: ['VC', 'PitchTips', 'Funding'],
    likes: 210,
    comments: [],
    liked: false,
    timestamp: '1d ago'
  },
  {
    id: 'p8',
    authorId: 'u13',
    communityId: 'c12',
    content: "Reminder: If you have a co-founder, SIGN A VESTING AGREEMENT. I just helped a startup where one founder quit after 2 months but kept 50% equity. Don't be them.",
    tags: ['Legal', 'StartupLessons'],
    likes: 340,
    comments: [],
    liked: true,
    timestamp: '1d ago'
  },
  {
    id: 'p9',
    authorId: 'u8',
    communityId: 'c13',
    content: "Just hit 10k subs on YouTube! The strategy? Consistency. One video every Tuesday for 8 months. No viral hits, just steady growth.",
    tags: ['YouTube', 'Milestone', 'Growth'],
    likes: 56,
    comments: [],
    liked: false,
    timestamp: '2d ago'
  },
  {
    id: 'p10',
    authorId: 'u18',
    communityId: 'c10',
    content: "Stripe Atlas vs Clerky for incorporation? Building a fintech app so regulatory compliance is key.",
    tags: ['FinTech', 'Legal', 'Question'],
    likes: 14,
    comments: [
        { id: 'cm6', authorId: 'u13', text: 'For fintech, consult a lawyer. Atlas is great for standard SaaS, but you have banking regs to worry about.', timestamp: '1d ago' }
    ],
    liked: false,
    timestamp: '2d ago'
  },
  {
    id: 'p11',
    authorId: 'u7',
    communityId: 'c7',
    content: "Just integrated the OpenAI API into my no-code app. The latency is a bit high though. Anyone using LangChain to cache responses?",
    tags: ['AI', 'TechHelp'],
    likes: 22,
    comments: [],
    liked: false,
    timestamp: '3d ago'
  },
  {
    id: 'p12',
    authorId: 'u3',
    communityId: 'c6',
    content: "3D printing the prototype for my smart-coffee-scale today! If it fits, I'm ordering the PCB next week.",
    tags: ['Hardware', 'Prototype', 'Excited'],
    likes: 67,
    comments: [],
    liked: true,
    timestamp: '3d ago'
  }
];

const WEEKLY_CHALLENGE = {
  title: "The First Dollar",
  description: "Share the story of how you earned your very first dollar in business. Inspire others and reflect on your journey.",
  reward: "Early Adopter Badge",
  deadline: "2 Days Left",
  participants: 432,
  steps: [
    { id: 1, text: "Write your story (min 100 words)", done: false },
    { id: 2, text: "Post in 'General' or your Community", done: false },
    { id: 3, text: "Reply to 2 other founders", done: false }
  ]
};

const INITIAL_EVENTS = [
  { id: 1, title: 'Founder Meetup: Tech', date: '2026-07-16', time: '4:00 PM', type: 'Networking' },
  { id: 2, title: 'Legal Q&A with Lawyer', date: '2026-07-18', time: '2:00 PM', type: 'Expert Session' },
  { id: 3, title: 'Pitch Practice', date: '2026-07-20', time: '11:00 AM', type: 'Workshop' },
  { id: 4, title: 'MVP Demo Day', date: '2026-07-22', time: '1:00 PM', type: 'Deadline' },
  { id: 5, title: 'Marketing Webinar', date: '2026-07-24', time: '9:00 AM', type: 'Learning' }
];

const INITIAL_MENTORS = [
  { id: 1, name: "David Cohen", role: "ex-YCombinator", expertise: "Fundraising", available: true, description: "David helps early-stage founders navigate the complex world of Seed and Series A funding.", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80" },
  { id: 2, name: "Jessica Liu", role: "VP Marketing @ Stripe", expertise: "Growth", available: false, description: "Specializing in B2B SaaS growth and reducing customer acquisition costs.", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80" },
  { id: 3, name: "Sam Altman", role: "Angel Investor", expertise: "Strategy", available: true, description: "Focuses on high-level business strategy and pivoting.", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80" },
  { id: 4, name: "Sarah Friar", role: "CFO @ NextDoor", expertise: "Finance", available: true, description: "Expert in financial modeling and cash flow management.", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80" },
  { id: 5, name: "Garry Tan", role: "President @ YC", expertise: "Product", available: false, description: "Garry advises on product design and building technical teams.", imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80" },
  { id: 6, name: "Emily Chang", role: "Brand Consultant", expertise: "Branding", available: true, description: "Helps startups find their voice and visual identity.", imageUrl: "https://images.unsplash.com/photo-1598550874175-4d71156852fd?auto=format&fit=crop&w=256&q=80" },
  { id: 7, name: "Michael Seibel", role: "Partner @ YC", expertise: "MVP Development", available: true, description: "Expert in ruthless prioritization for building MVPs.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80" },
  { id: 8, name: "Kat Cole", role: "COO @ Athletic Greens", expertise: "Operations", available: true, description: "Streamlining operations and supply chain logistics.", imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=256&q=80" },
  { id: 9, name: "Naval Ravikant", role: "Founder @ AngelList", expertise: "Philosophy", available: false, description: "Advises on long-term wealth creation and leverage.", imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80" },
  { id: 10, name: "Arlan Hamilton", role: "Founder @ Backstage", expertise: "Inclusion", available: true, description: "Specializes in funding strategies for diverse founders.", imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=256&q=80" },
  { id: 11, name: "Alexis Ohanian", role: "Founder @ Seven Seven Six", expertise: "Community", available: true, description: "The expert on building engaged communities.", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80" },
  { id: 12, name: "Tim Ferriss", role: "Author & Investor", expertise: "Productivity", available: false, description: "Optimization of personal and business workflows.", imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80" }
];

const INITIAL_PROFILE = {
  name: "Student User",
  role: "Entrepreneur",
  headline: "Aspiring Founder",
  bio: "Computer Science student at State University. Building AI tools for accessibility. Passionate about ethical tech and sustainable scaling.",
  avatarSeed: "Maya",
  badges: [
    { id: 'b1', name: 'First Launch', icon: Rocket, color: 'text-cyan-600 bg-cyan-100' },
    { id: 'b2', name: 'Community Voice', icon: MessageCircle, color: 'text-purple-600 bg-purple-100' }
  ],
  contact: {
    email: "student@example.com",
    linkedin: "linkedin.com/in/student",
    website: "studentfolio.com",
    phone: "+1 (555) 000-0000"
  }
};


export {
  BUSINESS_FIELDS, BUSINESS_TYPES, AVAILABLE_MENTOR_SLOTS, BLUEPRINTS,
  RESOURCES, INITIAL_COMMUNITIES, INITIAL_USERS, INITIAL_POSTS,
  WEEKLY_CHALLENGE, INITIAL_EVENTS, INITIAL_MENTORS, INITIAL_PROFILE
};