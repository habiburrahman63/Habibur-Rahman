import { Project, SkillItem, ServiceItem, ProcessStep, TestimonialItem, TeamMember, DeveloperStat } from '../types/portfolio';

/**
 * Display-sized, compressed JPEGs served from `public/images`.
 * The full-resolution originals remain untouched in `src/assets/images` as the
 * source of truth, but shipping them cost ~3.3 MB of the initial page weight
 * (the portrait alone was 1.3 MB for an image rendered at ~330 px).
 *
 * Resized/re-encoded at: portrait 700 px wide (q82), project shots 1200 px
 * wide (q80) — still ≥2× the rendered CSS size on retina displays.
 */
const IMAGE_BASE = `${import.meta.env.BASE_URL}images/`;

const portraitImg = `${IMAGE_BASE}portrait.jpg`;
const socialSpaceImg = `${IMAGE_BASE}project-social-space.jpg`;
const ecommerceImg = `${IMAGE_BASE}project-ecommerce.jpg`;
const apiDashboardImg = `${IMAGE_BASE}project-api-dashboard.jpg`;

/**
 * TaskFlow Pro had no artwork of its own and was pointing at the Social Space
 * screenshot, so the same image was shown for two different projects. This
 * inline SVG banner is generated instead: it is unique to that project, costs
 * no extra network request, and stays crisp at any size.
 */
const taskflowImg = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="TaskFlow Pro Kanban board interface">
    <rect width="1200" height="675" fill="#0B0F19"/>
    <rect x="0" y="0" width="1200" height="64" fill="#111827"/>
    <circle cx="40" cy="32" r="7" fill="#34d399"/>
    <text x="62" y="40" font-family="Segoe UI, sans-serif" font-size="22" font-weight="700" fill="#F1F5F9">TaskFlow Pro</text>
    <text x="1090" y="40" font-family="Segoe UI, sans-serif" font-size="17" fill="#64748B" text-anchor="end">Sprint 24</text>
    <g>
      <rect x="40" y="100" width="250" height="535" rx="14" fill="#0F172A" stroke="#1E293B"/>
      <text x="60" y="136" font-family="Segoe UI, sans-serif" font-size="17" font-weight="600" fill="#94A3B8">Backlog</text>
      <rect x="56" y="160" width="218" height="86" rx="10" fill="#111827" stroke="#1E293B"/>
      <text x="72" y="192" font-family="Segoe UI, sans-serif" font-size="16" fill="#E2E8F0">Refactor auth flow</text>
      <text x="72" y="222" font-family="Segoe UI, sans-serif" font-size="13" fill="#F59E0B">High</text>
      <rect x="56" y="258" width="218" height="86" rx="10" fill="#111827" stroke="#1E293B"/>
      <text x="72" y="290" font-family="Segoe UI, sans-serif" font-size="16" fill="#E2E8F0">Add API caching</text>
      <text x="72" y="320" font-family="Segoe UI, sans-serif" font-size="13" fill="#64748B">Normal</text>
      <rect x="56" y="356" width="218" height="86" rx="10" fill="#111827" stroke="#1E293B"/>
      <text x="72" y="388" font-family="Segoe UI, sans-serif" font-size="16" fill="#E2E8F0">Update docs</text>
      <text x="72" y="418" font-family="Segoe UI, sans-serif" font-size="13" fill="#64748B">Low</text>
    </g>
    <g>
      <rect x="316" y="100" width="250" height="535" rx="14" fill="#0F172A" stroke="#34d399" stroke-opacity="0.45"/>
      <text x="336" y="136" font-family="Segoe UI, sans-serif" font-size="17" font-weight="600" fill="#34D399">In Progress</text>
      <rect x="332" y="160" width="218" height="100" rx="10" fill="#0B1A16" stroke="#34d399" stroke-opacity="0.5"/>
      <text x="348" y="194" font-family="Segoe UI, sans-serif" font-size="16" fill="#ECFDF5">Kanban board</text>
      <text x="348" y="222" font-family="Segoe UI, sans-serif" font-size="16" fill="#ECFDF5">drag &amp; drop</text>
      <text x="348" y="246" font-family="Segoe UI, sans-serif" font-size="13" fill="#34D399">Urgent</text>
    </g>
    <g>
      <rect x="592" y="100" width="250" height="535" rx="14" fill="#0F172A" stroke="#1E293B"/>
      <text x="612" y="136" font-family="Segoe UI, sans-serif" font-size="17" font-weight="600" fill="#94A3B8">Code Review</text>
      <rect x="608" y="160" width="218" height="86" rx="10" fill="#111827" stroke="#1E293B"/>
      <text x="624" y="194" font-family="Segoe UI, sans-serif" font-size="16" fill="#E2E8F0">REST sync API</text>
      <text x="624" y="222" font-family="Segoe UI, sans-serif" font-size="13" fill="#38BDF8">2 reviewers</text>
      <rect x="608" y="258" width="218" height="86" rx="10" fill="#111827" stroke="#1E293B"/>
      <text x="624" y="292" font-family="Segoe UI, sans-serif" font-size="16" fill="#E2E8F0">Sprint report</text>
      <text x="624" y="320" font-family="Segoe UI, sans-serif" font-size="13" fill="#64748B">Normal</text>
    </g>
    <g>
      <rect x="868" y="100" width="250" height="535" rx="14" fill="#0F172A" stroke="#1E293B"/>
      <text x="888" y="136" font-family="Segoe UI, sans-serif" font-size="17" font-weight="600" fill="#94A3B8">Done</text>
      <rect x="884" y="160" width="218" height="86" rx="10" fill="#0F1F16" stroke="#34d399" stroke-opacity="0.3"/>
      <text x="900" y="194" font-family="Segoe UI, sans-serif" font-size="16" fill="#A7F3D0">Design tokens</text>
      <text x="900" y="222" font-family="Segoe UI, sans-serif" font-size="13" fill="#34D399">Shipped</text>
      <rect x="884" y="258" width="218" height="86" rx="10" fill="#0F1F16" stroke="#34d399" stroke-opacity="0.3"/>
      <text x="900" y="292" font-family="Segoe UI, sans-serif" font-size="16" fill="#A7F3D0">Optimistic UI</text>
      <text x="900" y="320" font-family="Segoe UI, sans-serif" font-size="13" fill="#34D399">Shipped</text>
    </g>
  </svg>`,
)}`;

export const PERSONAL_INFO = {
  name: 'Habibur Rahman',
  title: 'Full-Stack Developer (MERN)',
  subtitle: 'Full-Stack Web Engineer & Creative Developer',
  avatar: portraitImg,
  email: 'habib.bd.dev@gmail.com',
  /* Stored as digits for the tel: href and as a display string so the
     human-readable format can change (e.g. +880 1752-652462) without
     touching every component that shows it. */
  phone: '01752652462',
  phoneDisplay: '+880 1752-652462',
  phoneHref: 'tel:+8801752652462',
  github: 'https://github.com/habiburrahman63',
  linkedin: 'https://www.linkedin.com/in/habibur-rahman-793127420/?isSelfProfile=true',
  location: 'Remote · Worldwide Available',
  availability: 'Open for Freelance & Full-Stack Engineering Roles',
  tagline: 'I build modern, scalable, high-performance web applications with the MERN stack, combining clean engineering with polished user experiences.',
  bio: `I am a dedicated MERN Stack Developer driven by the craft of building fast, resilient, and visually captivating web applications. With deep proficiency across React.js, Node.js, Express.js, and MongoDB, I bridge the gap between pixel-perfect, accessible user interfaces and robust, scalable backend systems.

 Whether architecting RESTful APIs with JWT authentication and granular role-based access control, optimizing complex database aggregation pipelines, or engineering fluid client-side states with React and Tailwind CSS, I focus on clean code, testability, and measurable performance.`,
  principles: [
    {
      title: 'Architectural Integrity',
      description: 'Adhering to strict MVC patterns, modular component hierarchies, and maintainable data contracts.'
    },
    {
      title: 'Performance-First Engineering',
      description: 'Sub-second API response times, lean bundle sizes, and seamless 60fps UI micro-interactions.'
    },
    {
      title: 'Defense-in-Depth Security',
      description: 'Input sanitization, CORS policies, bcrypt hashing, JWT token rotation, and rate-limiting.'
    },
    {
      title: 'User-Centric Craftsmanship',
      description: 'Zero-slop interface design, responsive layouts across any screen width, and WCAG AA accessibility.'
    }
  ]
};

export const DEVELOPER_STATS: DeveloperStat[] = [
  {
    value: '18+',
    label: 'Projects Completed',
    context: 'Full-stack MERN apps, responsive SPAs, and REST APIs'
  },
  {
    value: '4',
    label: 'Core MERN Pillars',
    context: 'MongoDB · Express.js · React.js · Node.js'
  },
  {
    value: '100%',
    label: 'Clean Architecture',
    context: 'MVC backend patterns, modular hooks, and atomic UI'
  },
  {
    value: '<150ms',
    label: 'API Response Target',
    context: 'Optimized MongoDB queries and efficient middleware'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'social-space',
    title: 'Social Space',
    subtitle: 'Modern Full-Stack Social Networking Platform',
    category: 'Full-Stack MERN',
    description: 'A comprehensive social media platform engineered with the MERN stack. Features end-to-end user authentication, interactive newsfeeds, post creation with Cloudinary image hosting, likes, nested comments, real-time friend requests, and notification feeds.',
    image: socialSpaceImg,
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'JWT Auth', 'Tailwind CSS'],
    githubUrl: 'https://github.com/habiburrahman63/social-space',
    liveUrl: 'https://the-social-space.vercel.app',
    featured: true,
    metrics: [
      { label: 'Feed Queries', value: 'Indexed & Paginated' },
      { label: 'Asset Storage', value: 'Cloudinary CDN' },
      { label: 'Security', value: 'JWT & Bcrypt' }
    ],
    caseStudy: {
      overview: 'Social Space is an end-to-end social networking application built from the ground up to handle user engagement, media uploads, interactive feeds, and secure profile management.',
      problem: 'Social applications frequently suffer from database bottlenecks when querying friends and nested comments, messy state management on the client, and vulnerable media upload endpoints.',
      solution: 'Designed an MVC backend in Express with MongoDB aggregation pipelines for paginated feed delivery. Built an authenticated React frontend with optimistic UI updates for likes and comments, combined with direct-to-cloud signed media uploads via Cloudinary.',
      architecture: [
        'React 18 Single Page Application with dynamic routing and memoized components',
        'Express REST API layer implementing modular controllers, validators, and custom auth middleware',
        'MongoDB document store with Mongoose schemas, compound indexes for feed sorting, and cascading reference cleanups',
        'Cloudinary integration for automatic media compression and responsive image delivery'
      ],
      technologies: {
        frontend: ['React 18', 'Tailwind CSS', 'Lucide React', 'Context API', 'Vite'],
        backend: ['Node.js', 'Express.js', 'JWT (jsonwebtoken)', 'Bcrypt.js', 'Multer'],
        database: ['MongoDB', 'Mongoose ODM', 'MongoDB Atlas'],
        devops: ['Vercel (Frontend)', 'Render (API Service)', 'Git / GitHub']
      },
      features: [
        'Secure user registration and login with bcrypt password hashing and HTTP-only JWT cookies',
        'Personalized profile customization with avatar upload, bio, and social links',
        'Interactive post creation with image attachments, formatted text, and privacy controls',
        'Real-time like and unlike toggling with optimistic UI updates',
        'Nested commenting system with timestamps and author attribution',
        'Friend request lifecycle: send, accept, decline, and unfriend',
        'Paginated infinite feed with skeleton loaders for smooth browsing'
      ],
      challenges: [
        {
          challenge: 'High latency when populating mutual friends and nested comments on deep comment trees.',
          resolution: 'Refactored Mongoose `.populate()` calls into structured `$lookup` and `$project` aggregation pipelines with compound indexes on `{ user: 1, createdAt: -1 }`, cutting response times by over 60%.'
        },
        {
          challenge: 'Unintended UI flickering during optimistic like increments when server latency fluctuated.',
          resolution: 'Implemented an optimistic state reconciler in React that rolls back state only on server error responses with non-intrusive toast feedback.'
        }
      ],
      outcomes: [
        'Delivered a fully responsive social experience working seamlessly across mobile and desktop',
        'Maintained sub-180ms response times on paginated feed queries',
        'Zero security vulnerabilities: strictly sanitized inputs against NoSQL injection and XSS'
      ]
    }
  },
  {
    id: 'aura-commerce',
    title: 'Aura Commerce',
    subtitle: 'High-Performance MERN E-Commerce Engine',
    category: 'Full-Stack MERN',
    description: 'An enterprise-grade e-commerce application featuring dynamic catalog filtering by category, price, and rating, full shopping cart persistence, coupon engine, order lifecycle tracking, and a comprehensive administrative dashboard for inventory management.',
    image: ecommerceImg,
    tags: ['React.js', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'Admin Dashboard', 'Stripe Ready'],
    githubUrl: 'https://github.com/habiburrahman63/aura-commerce',
    liveUrl: 'https://aura-commerce-mern.vercel.app',
    featured: true,
    metrics: [
      { label: 'Catalog Search', value: 'Multi-Facet Filtering' },
      { label: 'Cart Management', value: 'Persistent Redux State' },
      { label: 'Admin Suite', value: 'RBAC Protected' }
    ],
    caseStudy: {
      overview: 'Aura Commerce is a full-stack digital storefront engineered for speed, conversions, and robust product inventory administration.',
      problem: 'Standard e-commerce templates often face cart state desynchronization, slow catalog filtering across numerous product attributes, and lack proper role-based separation between shoppers and store managers.',
      solution: 'Created a normalized Redux Toolkit state for the client-side cart with LocalStorage backup. On the backend, engineered a multi-facet search endpoint using MongoDB regex and price range filters, wrapped with admin-only JWT middleware.',
      architecture: [
        'React frontend with Redux Toolkit for centralized cart and filter states',
        'Express REST API with specialized routes for public products, customer orders, and admin CRUD',
        'Mongoose models for Product, Order, User, and Review with schema-level validation',
        'Role-Based Access Control (RBAC) middleware verifying user roles before processing administrative actions'
      ],
      technologies: {
        frontend: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'React Router DOM'],
        backend: ['Node.js', 'Express.js', 'Express Validator', 'JWT'],
        database: ['MongoDB', 'Mongoose schemas with indexes on price and category'],
        devops: ['Vercel', 'Render', 'Postman Automated Test Suite']
      },
      features: [
        'Faceted product catalog with real-time text search, price slider, and category chips',
        'Dynamic cart drawer with quantity increments, stock availability checks, and price summary',
        'Admin inventory console: create, edit, upload product photos, and adjust stock',
        'Order placement flow with delivery address validation and order status progression',
        'Customer dashboard displaying historical receipts and shipment progress',
        'Customer rating and review submission with automated average calculation'
      ],
      challenges: [
        {
          challenge: 'Preventing race conditions where multiple users checkout the last available inventory item.',
          resolution: 'Implemented atomic Mongoose operations using `$inc: { countInStock: -qty }` with condition `{ countInStock: { $gte: qty } }` ensuring stock never drops below zero.'
        },
        {
          challenge: 'Heavy re-renders when changing product filters in large catalogs.',
          resolution: 'Debounced search inputs by 300ms and utilized memoized selectors in Redux Toolkit, preserving smooth 60fps scroll.'
        }
      ],
      outcomes: [
        'Full transactional flow tested with Postman suites across 35 API endpoints',
        'Flawless responsive UI optimized for one-thumb mobile shopping',
        'Complete administrative independence without requiring direct database modifications'
      ]
    }
  },
  {
    id: 'devpulse-console',
    title: 'DevPulse API Console',
    subtitle: 'REST API & MongoDB Health Monitoring Suite',
    category: 'APIs & Backend',
    description: 'A developer-centric administrative dashboard designed for real-time monitoring of backend REST endpoints, MongoDB connection health, JWT token inspection, and simulated HTTP request throughput with latency analytics.',
    image: apiDashboardImg,
    tags: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'JWT Inspector', 'Chart Analytics'],
    githubUrl: 'https://github.com/habiburrahman63/devpulse-console',
    liveUrl: 'https://dev-pulse-api-i1ae.vercel.app',
    featured: true,
    metrics: [
      { label: 'Latency Tracking', value: 'Real-Time Endpoint Stats' },
      { label: 'Auth Inspector', value: 'JWT Payload Decoder' },
      { label: 'Query Profiler', value: 'MongoDB Index Auditor' }
    ],
    caseStudy: {
      overview: 'DevPulse is a specialized developer console built to give full-stack teams instant visibility into backend latency, database query times, and authentication status.',
      problem: 'Debugging API performance bottlenecks and token expiration issues during full-stack development is cumbersome without dedicated telemetry or heavy third-party SaaS installations.',
      solution: 'Constructed a lightweight Express telemetry middleware that logs request execution times and error codes, presenting them on a dark slate React analytics dashboard.',
      architecture: [
        'Custom Express timing middleware capturing request delta timestamps',
        'MongoDB system statistics reader calculating collection document counts and storage usage',
        'Interactive client dashboard built with React and SVG charts for latency visualization',
        'Client-side JWT parser and validator verifying expiration timestamps without leaking keys'
      ],
      technologies: {
        frontend: ['React.js', 'Tailwind CSS', 'Lucide React', 'Custom SVG Sparklines'],
        backend: ['Node.js', 'Express.js', 'Performance Timing API'],
        database: ['MongoDB Native Driver stats', 'Mongoose connection status'],
        devops: ['Vercel', 'Render', 'cURL automation']
      },
      features: [
        'Endpoint latency sparklines showing real-time response time trends',
        'JWT token breakdown tool: decodes claims, header algorithms, and remaining lifetime',
        'Database connection inspector showing pool size, ping latency, and collection volumes',
        'Interactive API sandbox for firing test GET/POST requests with header injection',
        'HTTP status distribution visualizer (2xx, 4xx, 5xx breakdown)'
      ],
      challenges: [
        {
          challenge: 'Monitoring middleware overhead slowing down production request execution.',
          resolution: 'Calculated execution diffs using `process.hrtime.bigint()` in non-blocking event loops, reducing logger overhead to less than 0.8ms per request.'
        }
      ],
      outcomes: [
        'Accelerated local debugging cycles for MERN microservices',
        'Clean, accessible developer tool with zero external bloat'
      ]
    }
  },
  {
    id: 'taskflow-pro',
    title: 'TaskFlow Pro',
    subtitle: 'Agile Kanban & Sprint Workflow Manager',
    category: 'Frontend & UI',
    description: 'A collaborative project management application featuring drag-and-drop Kanban workflow boards, task priority categorization, sprint timeline overviews, and member assignments with clean, responsive dark-mode ergonomics.',
    image: taskflowImg,
    tags: ['React.js', 'Tailwind CSS', 'Drag & Drop', 'State Management', 'REST API'],
    githubUrl: 'https://github.com/habiburrahman63/taskflow-pro',
    liveUrl: 'https://taskflow-pro.vercel.app',
    featured: false,
    metrics: [
      { label: 'Interaction', value: 'Drag-and-Drop Kanban' },
      { label: 'Organization', value: 'Sprints & Labels' },
      { label: 'Sync', value: 'Optimistic Local Cache' }
    ],
    caseStudy: {
      overview: 'TaskFlow Pro provides engineering and product teams with an intuitive, distraction-free environment to organize sprints, manage backlogs, and track task progression.',
      problem: 'Most modern project management tools are burdened with feature bloat, high latency, and confusing navigation.',
      solution: 'Crafted a hyper-responsive React SPA with immediate drag-and-drop column transfers, persistent local caching, and a RESTful Express synchronization backend.',
      architecture: [
        'React frontend with custom drag-and-drop event handlers and keyboard shortcuts',
        'Express REST API for persistent board synchronization and member assignment',
        'MongoDB schema modeling with parent-child board, column, and card relationships'
      ],
      technologies: {
        frontend: ['React.js', 'Tailwind CSS', 'Lucide React', 'HTML5 Drag & Drop API'],
        backend: ['Node.js', 'Express.js', 'Mongoose'],
        database: ['MongoDB Atlas'],
        devops: ['Vercel', 'GitHub Actions']
      },
      features: [
        'Multi-column Kanban boards (Backlog, In Progress, Code Review, Done)',
        'Fluid drag-and-drop card movements between swimlanes',
        'Custom labels, priority tags (Urgent, High, Normal, Low), and due dates',
        'Fast keyword search and tag filtering across cards',
        'Activity history trail tracking recent card updates'
      ],
      challenges: [
        {
          challenge: 'Maintaining card ordering indices when shifting items between columns.',
          resolution: 'Implemented fractional positional indexing so moving a card between two items assigns a mid-point index, eliminating the need to update all sibling records in the database.'
        }
      ],
      outcomes: [
        'Instantaneous UI response with zero perceived drag lag',
        'Fully keyboard accessible with arrow keys and shortcut triggers'
      ]
    }
  }
];

export const SKILLS: SkillItem[] = [
  // Frontend
  {
    name: 'React.js',
    level: 'Advanced',
    category: 'Frontend',
    description: 'Component architecture, custom hooks, context, memoization, lifecycle optimization, and SSR/CSR paradigms.',
    codeSnippet: {
      filename: 'useDebounceFetch.ts',
      language: 'typescript',
      code: `import { useState, useEffect } from 'react';

export function useDebounceFetch<T>(query: string, delay = 300) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
        const json = await res.json();
        setData(json);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [query, delay]);

  return { data, loading };
}`
    }
  },
  {
    name: 'Next.js',
    level: 'Advanced',
    category: 'Frontend',
    description: 'App Router architecture, Server-Side Rendering (SSR), Static Site Generation (SSG), Server Actions, API routes, and optimized image/font pipelines.',
    codeSnippet: {
      filename: 'app/api/products/route.ts',
      language: 'typescript',
      code: `import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';

  // High-performance cached server-side data fetching
  const response = await fetch(\`https://api.internal/catalog?cat=\${category}\`, {
    next: { revalidate: 3600 } // Incremental Static Regeneration (ISR)
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 });
  }

  const data = await response.json();
  return NextResponse.json({ success: true, count: data.length, data });
}`
    }
  },
  {
    name: 'JavaScript (ES6+)',
    level: 'Advanced',
    category: 'Frontend',
    description: 'Async/await, closures, promises, prototypes, event loops, DOM manipulation, and modern syntax features.',
    codeSnippet: {
      filename: 'eventLoopBatcher.js',
      language: 'javascript',
      code: `// High-performance asynchronous task queue
export class TaskQueue {
  constructor(concurrency = 4) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  push(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.next();
    });
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const { task, resolve, reject } = this.queue.shift();
      this.running++;
      Promise.resolve(task())
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this.next();
        });
    }
  }
}`
    }
  },
  {
    name: 'Tailwind CSS',
    level: 'Advanced',
    category: 'Frontend',
    description: 'Utility-first styling, design tokens, responsive breakpoints, custom theme configurations, and zero runtime overhead.',
    codeSnippet: {
      filename: 'theme.config.css',
      language: 'css',
      code: `@import "tailwindcss";

@layer utilities {
  .surface-card {
    background-color: rgb(15 23 42 / 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgb(51 65 85 / 0.4);
    border-radius: 1rem;
    transition: border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
}`
    }
  },
  {
    name: 'Redux Toolkit',
    level: 'Proficient',
    category: 'Frontend',
    description: 'Centralized state management, createSlice, createAsyncThunk, normalized state trees, and selector memoization.',
    codeSnippet: {
      filename: 'cartSlice.js',
      language: 'javascript',
      code: `import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalAmount: 0 },
  reducers: {
    addItem(state, action) {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    }
  }
});
export const { addItem } = cartSlice.actions;`
    }
  },
  {
    name: 'React Router',
    level: 'Advanced',
    category: 'Frontend',
    description: 'Client-side routing, protected routes, route loaders, dynamic URL parameters, and nested layouts.'
  },
  {
    name: 'HTML5 & CSS3',
    level: 'Advanced',
    category: 'Frontend',
    description: 'Semantic markup, accessible heading hierarchies, Flexbox, Grid, CSS custom properties, and animations.'
  },

  // Backend
  {
    name: 'Node.js',
    level: 'Advanced',
    category: 'Backend',
    description: 'Event-driven server architecture, streams, buffer management, filesystem manipulation, and non-blocking I/O.',
    codeSnippet: {
      filename: 'server.js',
      language: 'javascript',
      code: `import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '10kb' })); // Guard against memory overload

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});`
    }
  },
  {
    name: 'Express.js',
    level: 'Advanced',
    category: 'Backend',
    description: 'MVC routing structure, custom middleware chains, error handling protocols, and request validation pipelines.'
  },
  {
    name: 'RESTful API Design',
    level: 'Advanced',
    category: 'Backend',
    description: 'Idempotency, resource-based URL routing, standardized HTTP status codes, pagination, and API documentation.',
    codeSnippet: {
      filename: 'productController.js',
      language: 'javascript',
      code: `// Standardized paginated REST endpoint
export const getProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 12);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Product.find({ isPublished: true }).skip(skip).limit(limit).lean(),
      Product.countDocuments({ isPublished: true })
    ]);

    res.json({
      success: true,
      data: items,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) {
    next(error);
  }
};`
    }
  },
  {
    name: 'JWT & Authentication',
    level: 'Advanced',
    category: 'Backend',
    description: 'Stateless session tokens, refresh token rotation, bcrypt password hashing, and role-based access control (RBAC).',
    codeSnippet: {
      filename: 'authMiddleware.js',
      language: 'javascript',
      code: `import jwt from 'jsonwebtoken';

export const verifyAuth = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
      }
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};`
    }
  },
  {
    name: 'API Security & Middleware',
    level: 'Proficient',
    category: 'Backend',
    description: 'Helmet headers, rate limiting (express-rate-limit), CORS configuration, data sanitization, and global error boundaries.'
  },

  // Database
  {
    name: 'MongoDB',
    level: 'Advanced',
    category: 'Database',
    description: 'Document schema design, compound indexing, capped collections, transaction management, and Atlas cluster operations.',
    codeSnippet: {
      filename: 'aggregateFeed.js',
      language: 'javascript',
      code: `// High efficiency MongoDB aggregation pipeline
export const getAggregatedFeed = async (userId) => {
  return Post.aggregate([
    { $match: { isArchived: false } },
    { $sort: { createdAt: -1 } },
    { $limit: 20 },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDetails'
      }
    },
    { $unwind: '$authorDetails' },
    {
      $project: {
        title: 1,
        content: 1,
        createdAt: 1,
        likesCount: { $size: '$likes' },
        hasLiked: { $in: [userId, '$likes'] },
        'authorDetails.name': 1,
        'authorDetails.avatar': 1
      }
    }
  ]);
};`
    }
  },
  {
    name: 'Mongoose ODM',
    level: 'Advanced',
    category: 'Database',
    description: 'Schema typing, pre/post middleware hooks, virtual getters, validation constraints, and population optimization.'
  },

  // Tools & DevOps
  {
    name: 'Git & GitHub',
    level: 'Advanced',
    category: 'Tools & DevOps',
    description: 'Branching workflows, semantic commits, PR code reviews, conflict resolution, and GitHub Actions CI pipelines.'
  },
  {
    name: 'Postman',
    level: 'Advanced',
    category: 'Tools & DevOps',
    description: 'API endpoint validation, automated collection testing, environment variables, and pre-request scripts.'
  },
  {
    name: 'Vercel & Render',
    level: 'Advanced',
    category: 'Tools & DevOps',
    description: 'Production deployments, custom environment configuration, continuous delivery triggers, and web server logs.'
  },
  {
    name: 'Cloudinary & Firebase',
    level: 'Proficient',
    category: 'Tools & DevOps',
    description: 'Cloud asset management, automated image transformations, storage buckets, and third-party SDK integration.'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'full-stack',
    title: 'Full-Stack Web Development',
    description: 'End-to-end production web application engineering using MongoDB, Express, React, and Node.js. Designed for high concurrency, responsive usability, and clean modular maintenance.',
    deliverables: [
      'Complete React SPA with intuitive navigation & state handling',
      'Robust Node/Express REST API with complete CRUD capabilities',
      'Normalized MongoDB data modeling with optimized query indexing',
      'Fully automated production deployment pipeline on Vercel/Render'
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    timeline: '2 – 4 Weeks'
  },
  {
    id: 'frontend',
    title: 'Modern Frontend Architecture',
    description: 'Translating designs into responsive, high-performance, accessible React applications. Focused on zero layout shifts, fluid micro-animations, and fast page load times.',
    deliverables: [
      'Component-driven design systems with reusable atomic elements',
      'Mobile-first responsive layouts across mobile, tablet, and desktop',
      'State management architecture with Redux Toolkit or React Context',
      'Cross-browser compatibility and WCAG AA accessibility compliance'
    ],
    techStack: ['React.js', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Lucide'],
    timeline: '1 – 2 Weeks'
  },
  {
    id: 'backend-apis',
    title: 'Scalable REST API Development',
    description: 'Architecting secure, well-documented backend microservices and RESTful endpoints with Node.js and Express.js, protected by enterprise authentication.',
    deliverables: [
      'Stateless authentication using JWT with refresh token cycles',
      'Granular Role-Based Access Control (RBAC) middlewares',
      'Data validation, sanitization, and error handling layers',
      'Comprehensive Postman collections and OpenAPI documentation'
    ],
    techStack: ['Node.js', 'Express.js', 'JWT', 'Bcrypt', 'Postman'],
    timeline: '1 – 3 Weeks'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform Engineering',
    description: 'Building custom storefront experiences with product catalog management, multi-faceted filtering, shopping carts, checkout logic, and back-office dashboards.',
    deliverables: [
      'Dynamic product showcase with fast search and category filtering',
      'Persistent shopping cart with stock availability reconciliation',
      'Admin control panel for order lifecycle and product editing',
      'Secure payment gateway integration readiness'
    ],
    techStack: ['MERN Stack', 'Redux Toolkit', 'Cloudinary', 'Tailwind CSS'],
    timeline: '3 – 5 Weeks'
  },
  {
    id: 'admin-dashboards',
    title: 'Custom Admin Dashboards & CMS',
    description: 'Data-rich internal tools, management consoles, and content management systems providing real-time analytics, user moderation, and inventory oversight.',
    deliverables: [
      'Interactive data tables with sorting, filtering, and CSV exports',
      'Visual metrics and charts for business performance monitoring',
      'User role management and permission matrix enforcement',
      'Audit logs and system activity tracking'
    ],
    techStack: ['React.js', 'Express.js', 'MongoDB', 'Chart UI'],
    timeline: '2 – 3 Weeks'
  },
  {
    id: 'optimization',
    title: 'Performance, Security & Code Audit',
    description: 'Refactoring existing MERN codebases to improve response times, eliminate NoSQL injection risks, reduce bundle weight, and fix layout regressions.',
    deliverables: [
      'Database query profiler audit and compound index recommendations',
      'Frontend bundle size minimization and dynamic code splitting',
      'Security posture hardening (Helmet, CORS, rate-limiting)',
      'Clean code refactor to adhere to strict MVC and DRY principles'
    ],
    techStack: ['Node.js', 'Mongoose', 'Vite Analyzer', 'Security Audits'],
    timeline: '1 – 2 Weeks'
  }
];

export const WORK_PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Scope',
    summary: 'Aligning on business goals, user personas, technical prerequisites, and milestone roadmaps.',
    details: [
      'Requirements gathering & technical constraint analysis',
      'User journey mapping & key feature prioritization',
      'Selection of appropriate architectural patterns and libraries'
    ]
  },
  {
    step: '02',
    title: 'Architecture & Schemas',
    summary: 'Designing the data foundation, API contracts, and component tree before writing code.',
    details: [
      'MongoDB Mongoose schema definitions with indexes and relationship mappings',
      'REST API route endpoints and request/response payload specifications',
      'Component hierarchy and global state architecture planning'
    ]
  },
  {
    step: '03',
    title: 'UI/UX & Design Systems',
    summary: 'Crafting responsive, clean, and intuitive interfaces with strong visual hierarchy.',
    details: [
      'Tailwind CSS tokens, typography, and dark/light color schemes',
      'Micro-interaction and transition specifications',
      'Mobile-first responsive layout planning'
    ]
  },
  {
    step: '04',
    title: 'Full-Stack Development',
    summary: 'Writing clean, modular, and maintainable frontend and backend code in iterative sprints.',
    details: [
      'Express routing, controllers, and authentication middlewares',
      'React component development with strict typing and reusable hooks',
      'Database integration with indexing and data validation'
    ]
  },
  {
    step: '05',
    title: 'Testing & Quality Assurance',
    summary: 'Rigorous validation across edge cases, network delays, and security vectors.',
    details: [
      'Postman API endpoint testing across positive and negative paths',
      'Cross-browser and multi-device responsive testing',
      'Security checks: XSS, input sanitization, and CORS verification'
    ]
  },
  {
    step: '06',
    title: 'Optimization & Polish',
    summary: 'Squeezing maximum performance from the client bundle and database queries.',
    details: [
      'Bundle size reduction, lazy loading, and asset compression',
      'MongoDB query optimization and aggregation tuning',
      'Accessibility review ensuring keyboard accessibility and contrast compliance'
    ]
  },
  {
    step: '07',
    title: 'Production Deployment',
    summary: 'Setting up continuous deployment with seamless environment configuration.',
    details: [
      'Frontend hosting on Vercel with CDN caching',
      'Backend provisioning on Render with environment variable isolation',
      'Custom domain configuration and SSL verification'
    ]
  },
  {
    step: '08',
    title: 'Handover & Support',
    summary: 'Providing clean documentation, repository transfer, and post-launch maintenance.',
    details: [
      'Detailed README documentation with local setup and API guides',
      'Walkthrough of admin features and database controls',
      'Ongoing support and scalable feature expansion'
    ]
  }
];

const TEAM_IMAGE_BASE = `${IMAGE_BASE}team/`;

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Tarak Rahman',
    role: 'MERN Stack Developer',
    username: 'Tarak95',
    githubUrl: 'https://github.com/Tarak95',
    avatar: `${TEAM_IMAGE_BASE}Tarak95.jpg`,
    avatarFallback: 'https://avatars.githubusercontent.com/u/217224715?v=4',
    bio: 'CSE Student & developer passionate about turning ideas into real-world web applications.',
    tags: ['MERN Stack', 'React.js', 'Node.js', 'MongoDB']
  },
  {
    id: 'team-2',
    name: 'Foyjur Rahman',
    role: 'Frontend & MERN Developer',
    username: 'jisaunodb',
    githubUrl: 'https://github.com/jisaunodb',
    avatar: `${TEAM_IMAGE_BASE}jisaunodb.jpg`,
    avatarFallback: 'https://avatars.githubusercontent.com/u/153702863?v=4',
    bio: 'Building clean, responsive user interfaces with modern React, JavaScript, and Node.js.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Node.js']
  },
  {
    id: 'team-3',
    name: 'Shahzahan Siraj',
    role: 'Full-Stack Developer',
    username: 'shahzahandev',
    githubUrl: 'https://github.com/shahzahandev',
    avatar: `${TEAM_IMAGE_BASE}shahzahandev.jpg`,
    avatarFallback: 'https://avatars.githubusercontent.com/u/217482826?v=4',
    bio: 'Committed developer focused on scalable backend architectures and full-stack solutions.',
    tags: ['Full-Stack', 'Express.js', 'REST APIs', 'MongoDB']
  },
  {
    id: 'team-4',
    name: 'Foysal Ahmed',
    role: 'Front-End Developer',
    username: 'FoysalAhmedDev',
    githubUrl: 'https://github.com/FoysalAhmedDev',
    avatar: `${TEAM_IMAGE_BASE}FoysalAhmedDev.jpg`,
    avatarFallback: 'https://avatars.githubusercontent.com/u/222110602?v=4',
    bio: 'Expert in building responsive, user-focused web interfaces with modern JavaScript & React.',
    tags: ['Front-End', 'React', 'JavaScript', 'UI/UX']
  },
  {
    id: 'team-5',
    name: 'Syed Rafsun Iyajdani Siyam',
    role: 'Frontend Developer',
    username: 'devrafsun10',
    githubUrl: 'https://github.com/devrafsun10',
    avatar: `${TEAM_IMAGE_BASE}devrafsun10.jpg`,
    avatarFallback: 'https://avatars.githubusercontent.com/u/216926137?v=4',
    bio: 'Tech enthusiast engineering slick frontend components and exploring MERN stack mastery.',
    tags: ['Frontend', 'React.js', 'Tailwind', 'JavaScript']
  },
  {
    id: 'team-6',
    name: 'Md. Shofiul Islam',
    role: 'MERN Stack Developer',
    username: 'shofiulislamdev',
    githubUrl: 'https://github.com/shofiulislamdev',
    avatar: `${TEAM_IMAGE_BASE}shofiulislamdev.jpg`,
    avatarFallback: 'https://avatars.githubusercontent.com/u/217026049?v=4',
    bio: 'Computer engineer delivering scalable web solutions, clean RESTful APIs, and responsive UIs.',
    tags: ['MERN Stack', 'TypeScript', 'Node.js', 'React']
  },
  {
    id: 'team-7',
    name: 'Ashraf Shahin',
    role: 'Digital Growth & Tech Lead',
    username: 'ashrafshahin',
    githubUrl: 'https://github.com/ashrafshahin',
    avatar: `${TEAM_IMAGE_BASE}ashrafshahin.jpg`,
    avatarFallback: 'https://avatars.githubusercontent.com/u/60262848?v=4',
    bio: 'Combining business insight with technical depth to drive operational efficiency and digital growth.',
    tags: ['Architecture', 'Digital Growth', 'Web Systems']
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Tariq Al-Mansoor',
    role: 'Founder & Product Lead',
    company: 'NextGen Digital',
    relation: 'Client Collaboration',
    content: 'Habibur developed our MERN stack platform with surgical precision. Not only was the frontend exceptionally smooth and responsive, but his backend architecture with JWT auth and MongoDB queries handled our traffic spikes effortlessly. A consummate professional.',
    avatarInitials: 'TM'
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    role: 'Technical Project Lead',
    company: 'Apex Software Studio',
    relation: 'Team Collaboration',
    content: 'Working with Habibur on full-stack web applications has been a pleasure. His understanding of MVC architecture, clean component separation, and attention to detail in Tailwind CSS styling elevated the entire product quality. Delivered ahead of schedule.',
    avatarInitials: 'SJ'
  },
  {
    id: 'test-3',
    name: 'Rafiqul Islam',
    role: 'Senior Engineering Consultant',
    company: 'CloudSphere Solutions',
    relation: 'Code Review & Mentorship',
    content: 'Habibur writes code like an engineer with twice his years. His REST APIs are idiomatic, his database aggregation pipelines are thoroughly optimized, and he cares deeply about clean UI/UX without relying on generic templates.',
    avatarInitials: 'RI'
  }
];

export const RESUME_DATA = {
  name: 'Habibur Rahman',
  role: 'MERN Stack Developer · AI-Powered Web Applications',
  email: 'habib.bd.dev@gmail.com',
  phone: '01752652462',
  phoneDisplay: '+880 1752-652462',
  phoneHref: 'tel:+8801752652462',
  github: 'https://github.com/habiburrahman63',
  githubDisplay: 'github.com/habiburrahman63',
  linkedin: 'https://www.linkedin.com/in/habibur-rahman-793127420',
  linkedinDisplay: 'linkedin.com/in/habibur-rahman-793127420',
  portfolio: 'https://habibur-rahman-lovat.vercel.app',
  portfolioDisplay: 'habibur-rahman-lovat.vercel.app',
  location: 'Remote · Worldwide',
  summary:
    'MERN stack developer who has delivered 15+ full-stack web applications for international clients, from secure Node.js/Express REST APIs to accessible, mobile-first React interfaces. Optimizes MongoDB data models and aggregation pipelines (up to 55% lower query latency) and secures APIs with JWT, bcrypt and role-based authorization. Uses AI-assisted development, prompt engineering and LLM API integration to ship faster while holding to production standards for code quality, security and testing. Seeking remote full-stack or frontend roles.',
  technicalSkills: [
    {
      category: 'Frontend',
      skills: 'React.js, Redux Toolkit, React Router, Tailwind CSS, Framer Motion, WCAG AA accessibility'
    },
    {
      category: 'Backend',
      skills: 'Node.js, Express.js, RESTful API design, JWT authentication, bcrypt, authorization middleware (RBAC)'
    },
    {
      category: 'Database',
      skills: 'MongoDB, Mongoose, aggregation pipelines, indexing, query optimization'
    },
    {
      category: 'Integrations',
      skills: 'Cloudinary, payment gateways, social authentication (OAuth)'
    },
    {
      category: 'DevOps',
      skills: 'CI/CD automation, Vercel (frontend), Render (backend)'
    },
    {
      category: 'AI & Automation',
      skills: 'AI-assisted development, prompt engineering, LLM API integration, workflow automation'
    }
  ],
  experience: [
    {
      role: 'Full-Stack MERN Developer (Freelance)',
      period: '2023 – Present',
      company: 'Independent client engagements',
      subtext: 'International clients',
      points: [
        'Designed, built and deployed 15+ full-stack web applications and React single-page apps for international clients.',
        'Built secure REST APIs with JWT authentication, bcrypt password hashing and custom role-based authorization middleware.',
        'Reduced backend query latency by up to 55% by tuning MongoDB aggregation pipelines and indexes.',
        'Delivered mobile-first interfaces with Tailwind CSS and Framer Motion that meet WCAG AA accessibility standards.',
        'Applied AI-assisted development (scaffolding, debugging, documentation, query and security review) and integrated LLM APIs for features such as chatbots, content generation and smart search, reviewing all output before release.'
      ]
    },
    {
      role: 'Frontend & API Engineer',
      period: '2022 – 2023',
      company: 'Web application projects',
      subtext: '',
      points: [
        'Built dynamic single-page applications with React, Redux Toolkit and React Router.',
        'Integrated third-party services including Cloudinary image transformations, payment gateways and social login.',
        'Automated CI/CD workflows, deploying frontends to Vercel and backends to Render.'
      ]
    }
  ],
  education: [
    {
      degree: 'Diploma in Computer Science & Engineering',
      institution: 'Sirajganj Institute of Technology (SIT)',
      period: 'Graduated with Honors',
      details: 'Coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Web Technologies'
    }
  ],
  certifications: [
    'Full-Stack Web Development with MERN & Next.js Specialization',
    'Modern React & Redux Toolkit Architecture Certification',
    'Node.js, Express & MongoDB Production Backend Mastery',
    'Advanced REST API Design & Security Standards'
  ]
};
