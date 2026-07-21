import React, { useState, useEffect } from 'react';
import { BookOpen, Trophy, Terminal, Flame, Layers, Compass } from 'lucide-react';

interface HeroHeaderProps {
  onOpenMenu: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ onOpenMenu, onNavigateToTab }) => {
  const [isRainbow, setIsRainbow] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'COFFEE&ENGINEER';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Signature User Hero Banner Block */}
      <div className="hero-block shadow-2xl relative overflow-hidden group">
        <div className="flex items-center gap-3 z-10">
          <span
            id="typed-text"
            onClick={() => setIsRainbow(!isRainbow)}
            className={`font-orbitron font-extrabold text-2xl sm:text-3xl tracking-widest cursor-pointer select-none transition-all ${
              isRainbow ? 'rainbow-text drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'text-neutral-300 hover:text-white'
            }`}
            title="Click to toggle signature rainbow mode!"
          >
            {typedText}
            <span className="animate-pulse text-cyan-400">|</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono bg-neutral-900/80 border border-neutral-700 px-2 py-0.5 rounded text-neutral-400">
            JEE ADVANCED 2026/27
          </span>
        </div>

        {/* User Menu Button */}
        <button
          onClick={onOpenMenu}
          className="menu-button z-10"
          type="button"
          aria-label="Open menu"
        >
          <span className="hidden sm:inline">MENU</span>
          <span className="menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Hero Welcome Subtext & Features */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-mono">
            <Flame className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>Pathfinder & Irodov Standard Physics Prep</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-black tracking-tight text-white leading-tight">
            DEEP CONCEPTUAL BASE FOR <span className="text-cyan-400">JEE ADVANCED PHYSICS</span>
          </h1>

          <p className="font-gowun text-neutral-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Rigorous mathematical theory, step-by-step calculus derivations, interactive 2D physics simulations, real JEE Advanced PYQ bank (2015-2025), and formula decks.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigateToTab('chapters')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-orbitron font-bold text-sm hover:bg-neutral-200 transition-all shadow-lg shadow-white/10"
            >
              <BookOpen className="w-4 h-4 text-black" />
              EXPLORE CHAPTERS
            </button>
            <button
              onClick={() => onNavigateToTab('pyqs')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white font-orbitron font-semibold text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-all backdrop-blur-md"
            >
              <Trophy className="w-4 h-4 text-cyan-400" />
              PRACTICE PYQS
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-white/20 transition-all backdrop-blur-md">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono text-neutral-400 tracking-wider">CORE</span>
            </div>
            <div className="font-orbitron text-2xl font-bold text-white">6 Units</div>
            <div className="font-gowun text-xs text-neutral-400 mt-0.5">High-Yield Physics</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-white/20 transition-all backdrop-blur-md">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <Trophy className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono text-neutral-400 tracking-wider">ARCHIVE</span>
            </div>
            <div className="font-orbitron text-2xl font-bold text-white">10+ Yrs</div>
            <div className="font-gowun text-xs text-neutral-400 mt-0.5">JEE Adv PYQs</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-white/20 transition-all backdrop-blur-md">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono text-neutral-400 tracking-wider">DECK</span>
            </div>
            <div className="font-orbitron text-2xl font-bold text-white">Flashcards</div>
            <div className="font-gowun text-xs text-neutral-400 mt-0.5">Spaced Repetition</div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-white/20 transition-all backdrop-blur-md">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono text-neutral-400 tracking-wider">SIMS</span>
            </div>
            <div className="font-orbitron text-2xl font-bold text-white">Live 2D</div>
            <div className="font-gowun text-xs text-neutral-400 mt-0.5">Physics Canvas</div>
          </div>
        </div>
      </div>
    </section>
  );
};
