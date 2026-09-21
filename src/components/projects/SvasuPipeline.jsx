import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Cpu, Network, HelpCircle, PackageCheck, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

export const SvasuPipeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "ingest",
      num: "01",
      name: "Document Ingestion",
      icon: FileText,
      tech: "PDF / PPTX / OCR Parser",
      headline: "Multi-Format Enterprise Ingestion",
      desc: "Raw PDFs, slide decks, and SOPs are parsed, stripping layout noise, extracting tabular data, and converting unstructured visuals into machine-readable text structures.",
      output: "Standardized Clean Markdown Chunks"
    },
    {
      id: "embed",
      num: "02",
      name: "Vector Embeddings",
      icon: Network,
      tech: "High-Dimension Similarity Index",
      headline: "Semantic Coordinate Mapping",
      desc: "Generates high-dimensional vector embeddings of the chunked text to build dense indexes for sub-second contextual recall and hierarchical relation trees.",
      output: "Vector Similarity Knowledge Graph"
    },
    {
      id: "modular",
      num: "03",
      name: "LLM Modularization",
      icon: Cpu,
      tech: "LangChain + Prompt Orchestration",
      headline: "Pedagogical Course Structuring",
      desc: "LLMs analyze key cognitive checkpoints to restructure raw enterprise manuals into bite-sized micro-modules, learning objectives, flashcards, and summary highlights.",
      output: "Hierarchical Lesson Schema (JSON)"
    },
    {
      id: "rag",
      num: "04",
      name: "RAG & Assessment Gen",
      icon: HelpCircle,
      tech: "Grounded Retrieval & QA",
      headline: "Hallucination-Free Quiz Generation",
      desc: "Retrieval-Augmented Generation dynamically queries the vector space to craft Bloom's taxonomy quizzes, scenario-based MCQs, and feedback rubrics grounded strictly in source truth.",
      output: "Interactive Assessment Engine"
    },
    {
      id: "scorm",
      num: "05",
      name: "SCORM Packaging",
      icon: PackageCheck,
      tech: "SCORM 1.2 / 2004 & Web Exporter",
      headline: "Automated LMS Standards Packaging",
      desc: "Automatically writes `imsmanifest.xml`, runtime CMI API wrappers, and bundles the interactive React course player into fully certified SCORM 1.2 and 2004 packages.",
      output: "Production SCORM .ZIP Package"
    }
  ];

  return (
    <div className="w-full rounded-2xl glass-panel p-5 sm:p-7 border border-white/10 my-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-curry-gold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Architecture Flow</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
            SVASU End-to-End AI Pipeline
          </h4>
        </div>
        <div className="text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 self-start sm:self-center">
          Step {activeStep + 1} of {steps.length}: <span className="text-curry-gold font-medium">{steps[activeStep].name}</span>
        </div>
      </div>

      {/* Step Buttons Pipeline Flow */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => {
                sounds.playClick();
                setActiveStep(idx);
              }}
              className={`relative p-3 rounded-xl text-left transition-all duration-200 border ${
                isActive
                  ? 'bg-curry-gold/15 border-curry-gold text-white shadow-lg shadow-curry-gold/10'
                  : 'bg-white/[0.02] border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-curry-gold text-black font-bold' : 'bg-white/10 text-zinc-400'}`}>
                  {step.num}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-curry-gold' : 'text-zinc-500'}`} />
              </div>
              <div className="text-xs font-bold font-display leading-tight truncate">{step.name}</div>
              <div className="text-[10px] font-mono text-zinc-500 truncate mt-0.5">{step.tech.split('/')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Step Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-4 sm:p-6 rounded-xl bg-black/40 border border-white/10 flex flex-col md:flex-row gap-5 items-start justify-between"
        >
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-curry-gold/20 text-curry-gold border border-curry-gold/30">
                {steps[activeStep].tech}
              </span>
            </div>
            <h5 className="text-base sm:text-lg font-bold font-display text-white">
              {steps[activeStep].headline}
            </h5>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              {steps[activeStep].desc}
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0 md:border-l md:border-white/10 md:pl-6 space-y-2">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Pipeline Output</div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{steps[activeStep].output}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
