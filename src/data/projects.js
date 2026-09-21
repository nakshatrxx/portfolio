export const projectsData = [
  {
    id: "svasu",
    index: "01",
    title: "SVASU",
    subtitle: "AI-Powered E-Learning Authoring & SCORM Publishing Platform",
    category: "Professional Work",
    categoryType: "professional",
    company: "Knowledge Synonyms - Digital Enterprise",
    role: "Junior AI/ML Engineer",
    timeline: "July 2026 – Present",
    tagline: "Transforms unstructured PDFs and presentations into interactive, pedagogically structured training courses using LLM-driven workflows and RAG retrieval.",
    isFlagship: true,
    badges: ["Enterprise AI", "RAG & Vector Search", "SCORM 1.2/2004", "Production"],
    tech: ["React", "Node.js", "PHP CodeIgniter", "LangChain", "Vector Embeddings", "Semantic Search", "LLMs", "SCORM 1.2/2004"],
    overview: "SVASU is an enterprise-grade AI e-learning authoring platform built at Knowledge Synonyms that automates the transition from raw enterprise documentation (PDFs, PPTXs) to engaging, modular SCORM-compliant courses with contextual assessments and semantic search.",
    problem: "Traditional corporate training creation takes weeks of instructional design effort to manually extract key concepts from legacy slide decks and dense documentation, structure modular lessons, write assessments, and package them for LMS compliance (SCORM).",
    solution: "Architected an end-to-end multi-stage pipeline that ingests complex documents, segments and embeds content with vector similarity indexes, prompts LLMs for instructional course modularization and quiz generation, and automatically outputs production-ready Web and SCORM 1.2/2004 interactive courses.",
    stats: [
      { label: "Course Generation Speed", value: "85% Faster" },
      { label: "Standard Compliance", value: "SCORM 1.2 & 2004" },
      { label: "Pipeline", value: "End-to-End RAG" }
    ]
  },
  {
    id: "devmatch",
    index: "02",
    title: "DevMatch",
    subtitle: "AI-Powered Multi-Platform Job Aggregator & Resume Matcher",
    category: "Personal Project",
    categoryType: "personal",
    timeline: "2025 – 2026",
    tagline: "Aggregates engineering jobs from across the web, parses candidate resumes with Groq LLMs, and calculates contextual skill alignment scores.",
    badges: ["AI / Groq LLM", "Angular", "Multi-Source Aggregation", "Resume Parser"],
    tech: ["Angular", "Node.js", "Express.js", "MySQL", "Groq AI", "LLMs", "REST APIs", "TailwindCSS"],
    overview: "DevMatch solves the fragmented tech hiring landscape by consolidating listings from multiple job APIs into a unified deduplicated feed, coupled with an AI candidate-job matching engine.",
    problem: "Job seekers spend hours parsing through disparate platforms, struggling to understand which roles realistically match their current skill profile or identify exact missing competencies.",
    solution: "Engineered a full-stack platform that continuously aggregates and deduplicates job feeds, extracts deep technical skills from uploaded resumes via Groq AI LLM endpoints, and provides recruiter workflows with candidate ranking and CSV exports.",
    stats: [
      { label: "Job Sources Aggregated", value: "4+ APIs" },
      { label: "Inference Engine", value: "Groq LLM" },
      { label: "Match Analysis", value: "Sub-second" }
    ]
  },
  {
    id: "exam-management",
    index: "03",
    title: "Examination Management System",
    subtitle: "High-Security Assessment Engine & Real-Time Analytics",
    category: "Personal Project",
    categoryType: "personal",
    timeline: "2025",
    tagline: "Full-stack evaluation engine featuring timed examinations, question randomization algorithms, RBAC security, and administrative analytics.",
    badges: ["Full Stack", "Angular", "JWT / RBAC", "MySQL"],
    tech: ["Angular", "TypeScript", "Node.js", "Express.js", "MySQL", "JWT", "Chart.js"],
    overview: "A robust academic evaluation portal built with separate secure student and administrator dashboards, enforcing strict anti-cheat timing and automated scoring.",
    problem: "Educational institutions require secure, randomized test environments that prevent question leaking, enforce strict countdown limits, and generate immediate administrative reports.",
    solution: "Designed a multi-role web platform with JWT authentication, role-based access control, real-time exam timers, question shuffling algorithms, automated multi-question type grading, and granular score distributions.",
    stats: [
      { label: "Security", value: "JWT + RBAC" },
      { label: "Grading", value: "100% Automated" },
      { label: "Architecture", value: "Angular + Node" }
    ]
  },
  {
    id: "expense-tracker",
    index: "04",
    title: "Expense Tracker & Receipt OCR",
    subtitle: "Smart Financial Analytics with Computer Vision Extraction",
    category: "Personal Project",
    categoryType: "personal",
    timeline: "2025",
    tagline: "Personal finance platform equipped with client-side OCR parsing to automatically extract transaction totals, vendor names, and timestamps.",
    badges: ["Computer Vision", "Tesseract.js", "Chart.js", "Full Stack"],
    tech: ["Angular", "Node.js", "Express.js", "MySQL", "Tesseract.js", "Chart.js"],
    overview: "Eliminates tedious manual expense logging by combining browser-based optical character recognition (OCR) with financial categorization and interactive analytics dashboards.",
    problem: "Manual entry of paper receipts and digital invoices leads to neglected financial tracking and inaccurate categorization.",
    solution: "Integrated Tesseract.js OCR to parse uploaded receipt images directly in the browser, extract amounts and dates using regex pattern heuristics, and visualize month-over-month spending across dynamic categories.",
    stats: [
      { label: "OCR Engine", value: "Tesseract.js" },
      { label: "Data Analytics", value: "Chart.js" },
      { label: "Architecture", value: "REST API" }
    ]
  },
  {
    id: "freelance-client-work",
    index: "05",
    title: "Freelance & Production Web Development",
    subtitle: "High-Performance Client Platforms & Customized Digital Experiences",
    category: "Client & Freelance Work",
    categoryType: "freelance",
    timeline: "May 2025 – Present",
    tagline: "Delivering responsive corporate websites, bespoke WordPress themes, WooCommerce integrations, and modern client-facing applications.",
    badges: ["Production Web", "WordPress & WooCommerce", "Responsive UI", "Client Delivery"],
    tech: ["WordPress", "PHP", "JavaScript", "WooCommerce", "HTML5 / CSS3", "SEO & Optimization"],
    overview: "Independent freelance web development for commercial clients, translating bespoke brand aesthetics into responsive, conversion-focused digital experiences.",
    problem: "Clients need high-touch brand experiences with custom design fidelity that go far beyond off-the-shelf templates, requiring custom CSS, smooth animations, and optimized load times.",
    solution: "Architected customized web solutions for clients including Magnificence (luxury gifting brand platform built with WooCommerce and tailored animations) and Vani Commercials (responsive enterprise portal).",
    stats: [
      { label: "Live Clients", value: "Magnificence + Vani" },
      { label: "Focus", value: "Design & Performance" },
      { label: "Status", value: "Active Freelance" }
    ]
  }
];
