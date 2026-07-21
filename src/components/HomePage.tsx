import React from 'react';
import { HeroHeader } from './HeroHeader';
import { BookOpen, Compass, Award, Layers, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Chapter } from '../types';
import { CHAPTERS } from '../data/chapters';

interface HomePageProps {
  onNavigateToTab: (tab: string) => void;
  onSelectChapter: (chapter: Chapter) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateToTab,
  onSelectChapter,
  onOpenSearch,
}) => {
  const features = [
    {
      id: 'chapters',
      title: 'Pathfinder & Irodov Physics Theory',
      subtitle: '6 CORE UNITS & DERIVATIONS',
      description: 'Step-by-step calculus derivations, vector mechanics, edge-case analysis, and solved Pathfinder level problems.',
      icon: BookOpen,
      badge: 'CORE THEORY',
      accentColor: 'border-cyan-500/30 text-cyan-400',
      btnText: 'EXPLORE CHAPTERS',
    },
    {
      id: 'simulators',
      title: 'Interactive 2D Physics Canvas',
      subtitle: '60 FPS CANVAS SIMULATIONS',
      description: 'Tweak physical parameters live: moment of inertia, LCR resonance, focal length, ray diagrams, and projectile trajectories.',
      icon: Compass,
      badge: 'LIVE SIMS',
      accentColor: 'border-blue-500/30 text-blue-400',
      btnText: 'LAUNCH SIMULATORS',
    },
    {
      id: 'pyqs',
      title: 'JEE Advanced PYQ Archive',
      subtitle: '2015 – 2025 PAPER 1 & PAPER 2',
      description: 'Real exam archive with integer type, single choice, and multi-correct questions with exact marking schemes & revealed solutions.',
      icon: Award,
      badge: '10+ YRS ARCHIVE',
      accentColor: 'border-amber-500/30 text-amber-400',
      btnText: 'PRACTICE PYQS',
    },
    {
      id: 'formulas',
      title: 'Spaced Repetition Flashcard Deck',
      subtitle: 'ACTIVE RECALL & FORMULA MEMORY',
      description: 'Flip cards for instant concept checking, key variable definitions, units, and JEE Advanced trap warnings.',
      icon: Layers,
      badge: 'FLASHCARDS',
      accentColor: 'border-emerald-500/30 text-emerald-400',
      btnText: 'OPEN DECK',
    },
    {
      id: 'mock-test',
      title: 'Real Conditions Mock Test Engine',
      subtitle: 'TIMED 30-MIN PAPERS (+4 / -2 SCHEME)',
      description: 'Simulate high-pressure exam environments with countdown timers, marking penalties, and instant performance scorecards.',
      icon: Clock,
      badge: 'EXAM ENGINE',
      accentColor: 'border-purple-500/30 text-purple-400',
      btnText: 'START MOCK PAPER',
    },
  ];

  return (
    <div className="space-y-16 pb-8 animate-fadeIn">
      {/* Top Hero Header Block */}
      <HeroHeader
        onOpenMenu={onOpenSearch}
        onNavigateToTab={onNavigateToTab}
      />

      {/* Main Features Grid Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-neutral-800/80 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PLATFORM FEATURES & LEARNING TOOLS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-barrio text-white">
              ENGINEERED FOR JEE ADVANCED EXCELLENCE
            </h2>
          </div>
          <p className="font-gowun text-neutral-400 text-xs max-w-md">
            Select any feature below to dive directly into rigorous preparation tools.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => onNavigateToTab(feat.id)}
                className="group cursor-pointer p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all" />

                <div className="space-y-4 z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:border-cyan-400/40 transition-colors">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-900 border ${feat.accentColor}`}>
                      {feat.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 block">
                      {feat.subtitle}
                    </span>
                    <h3 className="font-barrio text-xl text-white group-hover:text-cyan-300 transition-colors">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="font-gowun text-xs text-neutral-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-neutral-900 flex items-center justify-between z-10">
                  <span className="text-xs font-orbitron font-bold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    {feat.btnText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Core Chapters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
          <div>
            <h2 className="section-title uppercase">POPULAR PHYSICS CHAPTERS</h2>
            <p className="font-gowun text-xs text-neutral-400 pl-3">
              Direct access to top weighted JEE Advanced modules.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('chapters')}
            className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-cyan-400 rounded-xl text-xs font-orbitron text-cyan-400 transition-all"
          >
            VIEW ALL CHAPTERS <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTERS.slice(0, 3).map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => onSelectChapter(chapter)}
              className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-cyan-400/50 cursor-pointer transition-all duration-300 space-y-4 group shadow-lg"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-cyan-400 font-medium">{chapter.unitTitle}</span>
                <span className="text-[11px] bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                  {chapter.estimatedStudyTime}
                </span>
              </div>

              <h3 className="font-barrio text-xl text-white group-hover:text-cyan-300 transition-colors">
                {chapter.title}
              </h3>

              <p className="font-gowun text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {chapter.description}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-neutral-900">
                <span className="badge font-barrio">{chapter.badge}</span>
                <span className="text-xs font-orbitron text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  STUDY NOW <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preparation Highlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="space-y-2 lg:col-span-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              RIGOROUS EXAM PREPARATION
            </span>
            <h3 className="font-barrio text-2xl sm:text-3xl text-white">
              READY TO TEST YOUR CONCEPTUAL ACCURACY?
            </h3>
            <p className="font-gowun text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              Take timed 30-minute mock papers designed strictly according to recent JEE Advanced Paper 1 and Paper 2 patterns with real scoring rules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end justify-center">
            <button
              onClick={() => onNavigateToTab('mock-test')}
              className="px-6 py-3 bg-white text-black font-orbitron font-bold text-xs rounded-xl hover:bg-neutral-200 transition-all shadow-lg text-center"
            >
              TAKE 30-MIN MOCK TEST
            </button>
            <button
              onClick={() => onNavigateToTab('formulas')}
              className="px-6 py-3 bg-neutral-900 border border-neutral-700 hover:border-cyan-400 text-cyan-400 font-orbitron font-semibold text-xs rounded-xl transition-all text-center"
            >
              REVISE FORMULA CARDS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
