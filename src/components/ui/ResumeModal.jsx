import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, Linkedin, Github, ExternalLink, Briefcase, GraduationCap, Code2, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const ResumeModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#121217] text-zinc-100 rounded-3xl border border-white/20 p-6 sm:p-10 shadow-2xl z-10"
        >
          {/* Modal Header Actions */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 sticky top-0 bg-[#121217]/95 backdrop-blur-md -mt-2 -mx-2 px-2 pt-2 z-20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-curry-gold/15 text-curry-gold border border-curry-gold/30 font-bold uppercase">
                Verified Resume
              </span>
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                Nakshatra Mittal · AI/ML & Full-Stack
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  window.print();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-zinc-200 hover:text-black font-mono text-xs transition-all"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <a
                href="/Nakshatra_Mittal_Resume.pdf"
                download="Nakshatra_Mittal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-curry-gold hover:bg-white text-black font-display font-semibold text-xs transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </a>

              <button
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Paper */}
          <div className="mt-8 space-y-8 text-left font-sans">
            
            {/* Top Contact Info */}
            <div className="text-center pb-6 border-b border-white/10">
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white uppercase">
                Nakshatra Mittal
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-3 text-xs sm:text-sm font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-zinc-300">
                  <Phone className="w-3.5 h-3.5 text-curry-gold" /> +91 8527040061
                </span>
                <span>•</span>
                <a href="mailto:mittal.nakshatra17@gmail.com" className="flex items-center gap-1 text-curry-gold hover:underline">
                  <Mail className="w-3.5 h-3.5" /> mittal.nakshatra17@gmail.com
                </a>
                <span>•</span>
                <a href="https://linkedin.com/in/nakshatra-mittal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-400 hover:underline">
                  <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/nakshatra-mittal
                </a>
              </div>
              <p className="mt-3 text-sm text-zinc-300 max-w-xl mx-auto font-sans leading-relaxed">
                AI/ML Engineer and Full-Stack Developer specializing in GenAI, RAG retrieval architectures, and high-performance modern web applications.
              </p>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-curry-gold font-mono text-xs uppercase tracking-widest font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base font-bold text-white font-display">BML Munjal University</h3>
                  <div className="text-sm text-zinc-300">B.Tech in Computer Science, Specialization in Data Science</div>
                </div>
                <div className="text-xs font-mono text-zinc-400 text-left sm:text-right">
                  <div>Gurugram, Haryana</div>
                  <div className="text-curry-gold">Sep 2022 – May 2026</div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-curry-gold font-mono text-xs uppercase tracking-widest font-bold">
                <Briefcase className="w-4 h-4" />
                <span>Experience</span>
              </div>

              {/* Job 1 */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">Junior AI/ML Engineer</h3>
                    <div className="text-sm font-medium text-blue-300">Knowledge Synonyms - Digital Enterprise</div>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 text-left sm:text-right">
                    <div>Noida, Uttar Pradesh</div>
                    <div className="text-emerald-400 font-semibold">July 2026 – Present</div>
                  </div>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <li>Build AI-powered e-learning systems that transform unstructured documents into interactive training courses using LLM-driven workflows.</li>
                  <li>Develop RAG pipelines with embeddings and vector similarity search for semantic retrieval and contextual intelligence across course content.</li>
                  <li>Developed SVASU, an AI-powered authoring platform that converts PDFs and presentations into structured courses using automated extraction, LLM-driven modularization, semantic search, and AI-generated assessments.</li>
                  <li>Engineer AI services using Node.js, React, and PHP/CodeIgniter, including automated SCORM 1.2/2004 and Web course publishing.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">Full Stack Development Associate Intern</h3>
                    <div className="text-sm font-medium text-blue-300">Knowledge Synonyms - Digital Enterprise</div>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 text-left sm:text-right">
                    <div>Noida, Uttar Pradesh</div>
                    <div className="text-zinc-400">Feb 2025 – July 2026</div>
                  </div>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <li>Developed full-stack web applications across the SDLC using Angular, Node.js, Express.js, and MySQL.</li>
                  <li>Built secure REST APIs with JWT and role-based authorization, including OCR-powered expense tracking and examination management platforms.</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-curry-gold font-mono text-xs uppercase tracking-widest font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Featured Projects</span>
              </div>

              {/* DevMatch */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-white text-base">DevMatch</span>
                    <span className="text-xs font-mono text-curry-gold">| Angular, Node.js, Express.js, MySQL, Groq AI</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">June 2026</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <li>Built an AI job-matching platform aggregating listings from JSearch, Adzuna, Arbeitnow, and SerpApi with deduplication and profile-based scoring.</li>
                  <li>Developed LLM-powered resume parsing and recruiter workflows for candidate ranking, skill matching, and CSV export.</li>
                </ul>
              </div>

              {/* Examination Management */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-white text-base">Examination Management System</span>
                    <span className="text-xs font-mono text-curry-gold">| Angular, TypeScript, Node.js, Express.js, MySQL</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">Apr 2026 – May 2026</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <li>Architected a full-stack assessment platform with separate admin and student portals, JWT authentication, and role-based authorization.</li>
                  <li>Built timed assessments with question randomization, multiple question types, automated evaluation, and administrative analytics.</li>
                </ul>
              </div>

              {/* Expense Tracker */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-bold text-white text-base">Expense Tracker</span>
                    <span className="text-xs font-mono text-curry-gold">| Angular, Node.js, Express.js, MySQL, Tesseract.js, Chart.js</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">2025</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <li>Built a full-stack expense management application with CRUD operations, receipt OCR, and category-wise spending analytics.</li>
                  <li>Implemented Tesseract.js to extract expense details from uploaded receipts and Chart.js for interactive financial visualizations.</li>
                </ul>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-curry-gold font-mono text-xs uppercase tracking-widest font-bold">
                <Code2 className="w-4 h-4" />
                <span>Technical Skills</span>
              </div>
              <div className="mt-4 space-y-2 text-xs sm:text-sm font-sans">
                <div>
                  <span className="font-bold text-white font-mono">Languages: </span>
                  <span className="text-zinc-300">Python, JavaScript, TypeScript, PHP, SQL, HTML, CSS</span>
                </div>
                <div>
                  <span className="font-bold text-white font-mono">Frameworks: </span>
                  <span className="text-zinc-300">React, Angular, Node.js, Express.js, CodeIgniter 4, LangChain</span>
                </div>
                <div>
                  <span className="font-bold text-white font-mono">AI / ML: </span>
                  <span className="text-curry-gold">LLMs, RAG, Prompt Engineering, Vector Embeddings, Semantic Search, Hugging Face, Groq AI</span>
                </div>
                <div>
                  <span className="font-bold text-white font-mono">Tools: </span>
                  <span className="text-zinc-300">MySQL, MongoDB, Git, GitHub, Postman, SCORM 1.2/2004</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
