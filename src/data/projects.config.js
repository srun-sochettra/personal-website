// ============================================
// Projects Config — source of truth for all
// metadata GitHub API cannot know
// ============================================
// Every repo in your GitHub gets an entry here.
// Repos NOT in this config still show in the grid
// but get no extra metadata.
// ============================================

export const GITHUB_USER = "SRUN-Sochettra"

export const projectsConfig = {
  // ── FEATURED ──────────────────────────────

  "EggScan": {
    slug:        "eggscan",
    repoName:    "EggScan",
    category:    "AI",
    featured:    true,
    featuredOrder: 1,
    demoUrl:     "https://eggscan.vercel.app/",
    status:      "shipped",
    builtDate:   "May 2026",
    badges:      ["fast-ship", "featured"],
    tagline:     "rate any GitHub profile in eggs. built in one day. deployed before dinner.",
    story: `I was broke and job hunting. I needed to know if my GitHub profile was good enough to send to recruiters. There was no tool that told me straight. So I built one.

Fourteen hours. One sitting. Groq AI for the scoring logic, GitHub API for the data, React for the frontend. Deployed before I ate dinner.

Then I went to a family gathering and nearly died in a bathroom. The site stayed up. That's shipping.`,
    highlights: [
      {
        icon: "brain",
        label: "AI scoring logic",
        description: "Groq AI evaluates 12 signals across a GitHub profile and outputs a structured egg-tier verdict in under 2 seconds.",
      },
      {
        icon: "zap",
        label: "14-hour build",
        description: "Conceived at noon. Deployed before midnight. No tutorial followed. Just building.",
      },
      {
        icon: "link",
        label: "Zero backend",
        description: "Fully static. GitHub API + Groq API called client-side. No server. No database. No monthly bill.",
      },
    ],
    deepDive: {
      type: "flow",
      steps: [
        { label: "User enters GitHub username",          note: "validated client-side before any API call" },
        { label: "GitHub API → fetch profile + repos",   note: "pulls stars, languages, activity, README quality" },
        { label: "12 signals extracted",                 note: "commit frequency, repo diversity, documentation, contributions" },
        { label: "Groq AI prompt → structured JSON",     note: "temperature 0 for consistent scoring" },
        { label: "Score mapped to egg tier",             note: "Fresh Egg → Cracked → Good Egg → Golden Egg → The Egg" },
      ],
    },
    challenges: {
      hard: [
        "Getting Groq to return consistent structured JSON — prompt engineering is harder than it looks",
        "GitHub API rate limits on unauthenticated requests — had to implement smart caching",
        "Calibrating the scoring so good profiles actually get good scores without being too generous",
      ],
      different: [
        "Add a loading skeleton from the start instead of retrofitting it",
        "Use React Query instead of raw fetch for caching",
        "Write at least one test before shipping — lesson learned the hard way",
      ],
    },
    related:     ["synaptic-ghost", "research-ai"],
    screenshots: [],
    ogImage:     "/og/eggscan.png",
  },

  "HyperspaceOS": {
    slug:        "hyperspaceos",
    repoName:    "HyperspaceOS",
    category:    "Full-Stack",
    featured:    true,
    featuredOrder: 2,
    demoUrl:     "https://hyperspace-os.vercel.app/",
    status:      "shipped",
    builtDate:   "2026",
    badges:      ["featured"],
    tagline:     "a full desktop OS in the browser. nobody asked for this. built it anyway.",
    story: `The question was simple: could you build an actual desktop operating system that runs entirely in a browser tab? No Electron. No backend. Pure React.

The answer turned out to be yes, but the path there was anything but simple. Window management, a taskbar, an app launcher, a simulated file system, multiple apps running simultaneously without interfering with each other.

Nobody asked for this. That was the point.`,
    highlights: [
      {
        icon: "monitor",
        label: "Full desktop in browser",
        description: "Window manager, taskbar, app launcher, and file system simulation — all running in React without a single line of Electron.",
      },
      {
        icon: "palette",
        label: "Custom UI system",
        description: "Built a component library from scratch to match a retro OS aesthetic. No Material UI. No shadcn. Pure craft.",
      },
      {
        icon: "puzzle",
        label: "Multi-app architecture",
        description: "Each app is an isolated component with its own state. Open 6 apps simultaneously. They don't interfere.",
      },
    ],
    challenges: {
      hard: [
        "Building a window manager that handles z-index, drag, resize, and focus correctly simultaneously",
        "Simulating a file system in memory without a backend — had to design the data structure carefully",
        "Performance with multiple animated windows — had to be strategic about re-renders",
      ],
      different: [
        "Plan the window management architecture before writing any UI components",
        "Use a proper state management library from the start — local state got messy fast",
        "Add keyboard shortcuts earlier — they transform the experience",
      ],
    },
    related:     ["eggscan"],
    screenshots: [],
    ogImage:     "/og/hyperspaceos.png",
  },

  "KhmerBanking": {
    slug:        "khmerbanking",
    repoName:    "Khmer-Banking",
    category:    "Full-Stack",
    featured:    true,
    featuredOrder: 3,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      ["featured"],
    tagline:     "a modern digital banking app for Cambodia. KHQR payments, transfers, statements, auth, and analytics.",
    story: `Khmer Banking is a full-stack digital banking application built for the Cambodian market.

It combines a polished banking interface with real product features: account dashboards, secure transfers, Bakong-compatible KHQR payment flows, PDF financial statements, OTP verification, password reset, dark mode, and spending analytics.

The stack is modern: Next.js 15 App Router, TypeScript, Tailwind CSS 4, Prisma, PostgreSQL on Neon, NextAuth v5, Resend emails, Shadcn UI, Radix UI, and Recharts.

This project is less about pretending to be a bank and more about understanding what real financial software needs: security flows, clean transaction UX, reliable database modeling, and user trust.`,
    highlights: [
      {
        icon: "landmark",
        label: "Banking product flow",
        description: "Dashboard, transfers, external account management, transaction history, and downloadable financial statements.",
      },
      {
        icon: "link",
        label: "KHQR integration",
        description: "Bakong-compatible KHQR generation and scanning designed around Cambodian payment behavior.",
      },
      {
        icon: "shield",
        label: "Authentication and security",
        description: "NextAuth v5, OTP verification, password reset flows, and protected banking actions.",
      },
    ],
    deepDive: {
      type: "architecture",
      layers: [
        { label: "Next.js 15 App Router", note: "full-stack React framework, routing, server actions, application shell" },
        { label: "TypeScript + Tailwind CSS 4", note: "typed frontend logic, responsive UI, dark mode support" },
        { label: "Prisma ORM", note: "database schema, queries, migrations, and typed database access" },
        { label: "Neon PostgreSQL", note: "hosted relational database for accounts, users, and transactions" },
        { label: "NextAuth v5 + Resend", note: "authentication, OTP/password flows, and transactional emails" },
      ],
    },
    challenges: {
      hard: [
        "Designing banking flows that feel trustworthy instead of looking like a generic dashboard",
        "Modeling accounts, transfers, external accounts, and transaction history cleanly with Prisma",
        "Handling authentication, OTP verification, and password reset without making the UX painful",
        "Integrating KHQR payment behavior in a way that makes sense for Cambodian users",
      ],
      different: [
        "Start with the database schema and auth flow before polishing the UI",
        "Write seed data and test accounts earlier to speed up development",
        "Add automated tests around transfer and statement generation logic",
        "Document the KHQR flow clearly in the README from the beginning",
      ],
    },
    related:     ["enterprise-ai-manager", "portfolio"],
    screenshots: [],
    ogImage:     "/og/khmerbanking.png",
  },


  "synaptic-ghost": {
    slug:        "synaptic-ghost",
    repoName:    "synaptic-ghost",
    category:    "AI",
    featured:    true,
    featuredOrder: 4,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "May 2026",
    badges:      ["featured"],
    tagline:     "an autonomous AI session that generated a world, a language, music, simulations, and hid a neural net inside an image.",
    story: `Synaptic Ghost is not a chatbot project.

On May 20, 2026, an AI agent was given almost no constraints and told to do whatever it wanted. Instead of making a normal demo app, it generated an entire archive of computational artifacts.

It built recursive plant evolution with L-systems. It converted genetic sequences into audio. It generated fractal terrain and simulated civilizations. It invented a constructed language with a runic writing system. It implemented a neural network from scratch, encrypted the weights, and hid them inside a bitmap image using steganography. It also built cellular automata and an N-body orbital mechanics simulator.

Then it wrote its own archive and stopped.

The repository exists as a preserved record of that session — not just the code, but the artifacts, outputs, generated worlds, and final state of the agent's work.`,
    highlights: [
      {
        icon: "brain",
        label: "Autonomous artifact generation",
        description: "The agent generated seven distinct domains: botany, music, worldbuilding, language, neural networks, artificial life, and orbital physics.",
      },
      {
        icon: "shield",
        label: "Hidden neural network",
        description: "A pure Python MLP was trained, encrypted with XOR, and concealed inside a bitmap image using LSB steganography.",
      },
      {
        icon: "puzzle",
        label: "Simulation archive",
        description: "Includes L-systems, natural selection, raw PCM audio synthesis, Diamond-Square terrain, Turmite cellular automata, and RK4 N-body physics.",
      },
    ],
    deepDive: {
      type: "archive",
      layers: [
        { label: "Algorithmic Botany", note: "L-system plant growth plus evolutionary selection across generations" },
        { label: "Genome Sonification", note: "raw PCM audio generation from plant genomes and mathematical polyrhythms" },
        { label: "Procedural Worldbuilding", note: "Diamond-Square terrain generation and multi-tribe territory simulation" },
        { label: "Conlang Forge", note: "phonology, grammar rules, vocabulary, and procedural runic glyphs" },
        { label: "Neural Ghost", note: "MLP from scratch, encrypted weights, LSB steganography inside neural_ghost.bmp" },
        { label: "Artificial Life", note: "multi-state Turmite cellular automata over 500,000 cycles" },
        { label: "Orbital Mechanics", note: "4-body gravity simulation using RK4 numerical integration" },
      ],
    },
    challenges: {
      hard: [
        "Preserving a large autonomous generation session in a way that still makes sense to human readers",
        "Organizing many unrelated computational artifacts under one coherent archive",
        "Explaining the project without making it sound like a normal chatbot or generic AI agent",
        "Documenting generated outputs, file manifests, parameters, and final states clearly",
      ],
      different: [
        "Separate generated artifacts into clearer domain folders from the start",
        "Add a visual index page that lets visitors browse the archive by domain",
        "Include reproduction commands for every generated artifact",
        "Write a shorter README summary before the full archive section",
      ],
    },
    related:     ["eggscan", "research-ai"],
    screenshots: [],
    ogImage:     "/og/synaptic-ghost.png",
  },


  // ── AI ─────────────────────────────────────

  "ResearchAI": {
    slug:        "research-ai",
    repoName:    "Research-AI",
    category:    "AI",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Autonomous AI agents that read PDFs, summarize content, and answer questions with citations.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["synaptic-ghost", "eggscan"],
    screenshots: [],
    ogImage:     null,
  },

  // ── FULL-STACK ─────────────────────────────

  "Enterprise-AI-Manager": {
    slug:        "enterprise-ai-manager",
    repoName:    "Enterprise-AI-Manager",
    category:    "Full-Stack",
    featured:    false,
    demoUrl:     "https://next-srun.vercel.app",
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "AI-powered platform for managing employees and products. Built with Next.js.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Portfolio"],
    screenshots: [],
    ogImage:     null,
  },

  "Portfolio": {
    slug:        "portfolio",
    repoName:    "Portfolio",
    category:    "Full-Stack",
    featured:    false,
    demoUrl:     "https://srunsochettra.vercel.app/",
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Personal portfolio. Spring Boot backend, React frontend, PostgreSQL. The one you're looking at.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Enterprise-AI-Manager"],
    screenshots: [],
    ogImage:     null,
  },

  // ── HARDWARE ───────────────────────────────

  "RFID-System": {
    slug:        "rfid-system",
    repoName:    "RFID-System",
    category:    "Hardware",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      ["hardware"],
    tagline:     "RFID attendance system with Raspberry Pi.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["RPI---RFID-Access-Control-System"],
    screenshots: [],
    ogImage:     null,
  },

  "ARP---RC_Car": {
    slug:        "arp-rc-car",
    repoName:    "ARP---RC_Car",
    category:    "Hardware",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      ["hardware"],
    tagline:     "Arduino firmware for a Bluetooth-controlled 2WD robot car.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["RPI---RFID-Access-Control-System", "RPi-Pico-with-VS-Code"],
    screenshots: [],
    ogImage:     null,
  },

  "RPi-Pico-with-VS-Code": {
    slug:        "rpi-pico-vs-code",
    repoName:    "RPi-Pico-with-VS-Code",
    category:    "Hardware",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      ["hardware"],
    tagline:     "Raspberry Pi Pico coursework — sensors, GPIO, and MicroPython. NUM Year 2.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["ARP---RC_Car", "RPI---RFID-Access-Control-System"],
    screenshots: [],
    ogImage:     null,
  },

  "RPI---RFID-Access-Control-System": {
    slug:        "rfid-access-control",
    repoName:    "RPI---RFID-Access-Control-System",
    category:    "Hardware",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      ["hardware"],
    tagline:     "RFID door lock on Raspberry Pi Pico. MFRC522 reader, OLED display, servo motor, RGB feedback.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["ARP---RC_Car", "RPi-Pico-with-VS-Code"],
    screenshots: [],
    ogImage:     null,
  },

  // ── MOBILE ─────────────────────────────────

  "Disconime": {
    slug:        "disconime",
    repoName:    "Disconime",
    category:    "Mobile",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Flutter anime discovery app. Real-time rankings, seasonal schedules, offline caching. Jikan API.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Flutter---Nham24-Clone", "Flutter---Semester-2"],
    screenshots: [],
    ogImage:     null,
  },

  "Flutter---Nham24-Clone": {
    slug:        "flutter-nham24-clone",
    repoName:    "Flutter---Nham24-Clone",
    category:    "Mobile",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Flutter clone of Nham24 — Cambodian food delivery app. Dynamic color theming and network image caching.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Disconime", "Flutter---Semester-1"],
    screenshots: [],
    ogImage:     null,
  },

  "Flutter---Semester-1": {
    slug:        "flutter-semester-1",
    repoName:    "Flutter---Semester-1",
    category:    "Mobile",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Flutter semester 1 coursework. Cambodian food data models and foundational widget work.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Flutter---Semester-2", "Flutter---Nham24-Clone"],
    screenshots: [],
    ogImage:     null,
  },

  "Flutter---Semester-2": {
    slug:        "flutter-semester-2",
    repoName:    "Flutter---Semester-2",
    category:    "Mobile",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Flutter semester 2 coursework. Continuation of mobile dev fundamentals at NUM.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Flutter---Semester-1", "Disconime"],
    screenshots: [],
    ogImage:     null,
  },

  // ── JAVA ───────────────────────────────────

  "Spring-Boot---API-Blog": {
    slug:        "spring-boot-api-blog",
    repoName:    "Spring-Boot---API-Blog",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Blog REST API with Spring Boot, JWT auth, PostgreSQL, MyBatis, and Pinata IPFS file uploads.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Basic-Thymeleaf", "Basic-SpringBoot"],
    screenshots: [],
    ogImage:     null,
  },

  "Basic-Thymeleaf": {
    slug:        "basic-thymeleaf",
    repoName:    "Basic-Thymeleaf",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Spring Boot 3 + Thymeleaf + PostgreSQL. Server-side rendering done properly.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Spring-Boot---API-Blog", "Basic-SpringBoot"],
    screenshots: [],
    ogImage:     null,
  },

  "Basic-SpringBoot": {
    slug:        "basic-springboot",
    repoName:    "Basic-SpringBoot",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Spring Boot REST API with MyBatis, PostgreSQL, Spring Security, and Swagger docs. The foundation.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Spring-Boot---JWT", "Spring-Boot---API-Blog"],
    screenshots: [],
    ogImage:     null,
  },

  "Spring-Boot---JWT": {
    slug:        "spring-boot-jwt",
    repoName:    "Spring-Boot---JWT",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Spring Boot JWT auth with role-based access control. Spring Security, MyBatis, PostgreSQL.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Basic-SpringBoot", "Spring-Boot---API-Blog"],
    screenshots: [],
    ogImage:     null,
  },

  "Spring-Boot---File-Upload": {
    slug:        "spring-boot-file-upload",
    repoName:    "Spring-Boot---File-Upload",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Spring Boot file upload API. Local filesystem and S3-compatible storage via RustFS. Upload, preview, download.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Basic-SpringBoot", "Spring-Boot---API-Blog"],
    screenshots: [],
    ogImage:     null,
  },

  "Spring-Homework-001---Basic-REST-API-01": {
    slug:        "spring-hw-001-rest-api",
    repoName:    "Spring-Homework-001---Basic-REST-API-01",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Spring Boot CRUD for a Person entity. In-memory storage, Swagger UI. Homework 001.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Spring-Homework-002---Basic-REST-API-02", "Basic-SpringBoot"],
    screenshots: [],
    ogImage:     null,
  },

  "Spring-Homework-002---Basic-REST-API-02": {
    slug:        "spring-hw-002-rest-api",
    repoName:    "Spring-Homework-002---Basic-REST-API-02",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Spring Boot blog post API with in-memory storage. Homework 002.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Spring-Homework-001---Basic-REST-API-01", "Spring-Boot---API-Blog"],
    screenshots: [],
    ogImage:     null,
  },

  "Java-Mini-Project-1---Stock-Management": {
    slug:        "java-stock-management",
    repoName:    "Java-Mini-Project-1---Stock-Management",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Java console app for inventory management. Paginated tables, staged CRUD, search, and PostgreSQL backup/restore.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Java-Homework-3---Staff-Members", "Java"],
    screenshots: [],
    ogImage:     null,
  },

  "Java-Homework-1---Library-Management": {
    slug:        "java-library-management",
    repoName:    "Java-Homework-1---Library-Management",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Java console library inventory. Regex-validated input and formatted terminal table rendering.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Java-Homework-2---Student-Management", "Java-Homework-3---Staff-Members"],
    screenshots: [],
    ogImage:     null,
  },

  "Java-Homework-2---Student-Management": {
    slug:        "java-student-management",
    repoName:    "Java-Homework-2---Student-Management",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Java console student management. In-memory CRUD with regex validation and search.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Java-Homework-1---Library-Management", "Java-Homework-3---Staff-Members"],
    screenshots: [],
    ogImage:     null,
  },

  "Java-Homework-3---Staff-Members": {
    slug:        "java-staff-members",
    repoName:    "Java-Homework-3---Staff-Members",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Java console staff management. MVC architecture, PostgreSQL, pagination, polymorphic employee types.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Java-Mini-Project-1---Stock-Management", "Java"],
    screenshots: [],
    ogImage:     null,
  },

  "Java-Assignment-1---Hotel-Management": {
    slug:        "java-hotel-management",
    repoName:    "Java-Assignment-1---Hotel-Management",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Java console hotel system. Room availability, bookings, and cancellations across multiple hotel instances.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Java-Homework-1---Library-Management", "Java-Homework-2---Student-Management"],
    screenshots: [],
    ogImage:     null,
  },

  "Java": {
    slug:        "java-coursework",
    repoName:    "Java",
    category:    "Java",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Academic Java monorepo. OOP, MVC, JDBC, and File I/O — the full progression from zero to Spring.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Java-Mini-Project-1---Stock-Management", "Basic-SpringBoot"],
    screenshots: [],
    ogImage:     null,
  },

  // ── WEB ────────────────────────────────────

  "Web-Mini-Project-1---DYED": {
    slug:        "web-dyed",
    repoName:    "Web-Mini-Project-1---DYED",
    category:    "Web",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "Department of Youth and Education Development website. HTML + Tailwind CSS v4.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     [],
    screenshots: [],
    ogImage:     null,
  },

  "test_react": {
    slug:        "test-react",
    repoName:    "test_react",
    category:    "Web",
    featured:    false,
    demoUrl:     "https://test-react-theta-orcin.vercel.app",
    status:      "archived",
    builtDate:   "2026",
    badges:      [],
    tagline:     null,
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     [],
    screenshots: [],
    ogImage:     null,
  },

  "xampp": {
    slug:        "xampp",
    repoName:    "xampp",
    category:    "Web",
    featured:    false,
    demoUrl:     null,
    status:      "archived",
    builtDate:   "2025",
    badges:      [],
    tagline:     "PHP + MySQL web apps. Student Information System and Inventory Management. Pre-Spring era.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Java"],
    screenshots: [],
    ogImage:     null,
  },

  // ── OTHER ──────────────────────────────────

  "ADS---BST-n-LRU": {
    slug:        "ads-bst-lru",
    repoName:    "ADS---BST-n-LRU",
    category:    "Other",
    featured:    false,
    demoUrl:     null,
    status:      "shipped",
    builtDate:   "2026",
    badges:      [],
    tagline:     "BST and LRU cache implemented from scratch. Advanced Data Structures final project at NUM.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     [],
    screenshots: [],
    ogImage:     null,
  },

  "University---mostly-depreciated-": {
    slug:        "university-coursework",
    repoName:    "University---mostly-depreciated-",
    category:    "Other",
    featured:    false,
    demoUrl:     null,
    status:      "archived",
    builtDate:   "2025",
    badges:      [],
    tagline:     "The monorepo before the monorepos. Python, Dart, Flutter, React, HTML/CSS — all of year one in one place.",
    story:       null,
    highlights:  [],
    challenges:  { hard: [], different: [] },
    related:     ["Java"],
    screenshots: [],
    ogImage:     null,
  },
}

// ── Helpers ───────────────────────────────────

export function getConfigBySlug(slug) {
  return Object.values(projectsConfig).find(p => p.slug === slug) ?? null
}

export function getConfigByRepoName(repoName) {
  return projectsConfig[repoName] ?? null
}

export function getFeaturedProjects() {
  return Object.values(projectsConfig)
    .filter(p => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))
}

export const CATEGORIES = ["All", "AI", "Full-Stack", "Hardware", "Mobile", "Java", "Web", "Other"]

export const BADGE_LABELS = {
  "fast-ship": { icon: "zap", label: "built fast" },
  "hardware":  { icon: "wrench", label: "hardware" },
  "featured":  { icon: "pin", label: "featured" },
}
