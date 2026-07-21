import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Award,
  Layers,
  Clock,
  Compass,
  Menu,
  X,
  Atom,
  FlaskConical,
  Calculator,
  Search,
} from 'lucide-react';
import { Subject } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSubject: Subject;
  setSelectedSubject: (s: Subject) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedSubject,
  setSelectedSubject,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'chapters', label: 'CHAPTERS', icon: BookOpen },
    { id: 'simulators', label: 'SIMULATORS', icon: Compass },
    { id: 'pyqs', label: 'PYQ BANK', icon: Award },
    { id: 'formulas', label: 'FLASHCARDS', icon: Layers },
    { id: 'mock-test', label: 'MOCK TESTS', icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-40 immersive-header w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white group-hover:border-white/30 transition-colors shadow-inner shrink-0">
                <Atom className="w-5 h-5 animate-spin-slow text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-orbitron font-black text-base tracking-[0.1em] text-white group-hover:text-cyan-400 transition-colors uppercase whitespace-nowrap">
                  COFFEE<span className="text-neutral-400">&</span>ENGINEER
                </span>
                <span className="text-[9px] font-mono tracking-wider text-neutral-400 uppercase hidden sm:block whitespace-nowrap">
                  JEE ADVANCED PHYSICS
                </span>
              </div>
            </div>

            {/* Subject Selector Tabs */}
            <div className="hidden xl:flex items-center p-1 bg-neutral-900/80 border border-white/10 rounded-lg backdrop-blur-md">
              <button
                onClick={() => setSelectedSubject('physics')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-orbitron tracking-wider transition-all ${
                  selectedSubject === 'physics'
                    ? 'bg-white/10 text-white border border-white/20 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Atom className="w-3 h-3 text-cyan-400" />
                PHYSICS
              </button>
              <button
                onClick={() => setSelectedSubject('chemistry')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-orbitron tracking-wider opacity-60 hover:opacity-100 transition-all ${
                  selectedSubject === 'chemistry'
                    ? 'bg-white/10 text-white border border-white/20 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Chemistry Base launching soon"
              >
                <FlaskConical className="w-3 h-3 text-emerald-400" />
                CHEM
              </button>
              <button
                onClick={() => setSelectedSubject('maths')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-orbitron tracking-wider opacity-60 hover:opacity-100 transition-all ${
                  selectedSubject === 'maths'
                    ? 'bg-white/10 text-white border border-white/20 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Maths Base launching soon"
              >
                <Calculator className="w-3 h-3 text-blue-400" />
                MATHS
              </button>
            </div>
          </div>

          {/* Nav Items Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 overflow-x-auto scrollbar-none max-w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-[11px] xl:text-xs font-orbitron tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/20 shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-neutral-500'}`} />
                  {item.label}
                  {isActive && <div className="glow-dot ml-0.5 shrink-0" />}
                </button>
              );
            })}
          </nav>

          {/* Search Trigger & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900/90 border border-white/10 hover:border-white/20 rounded-xl text-xs text-neutral-300 hover:text-white transition-all backdrop-blur-md"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-mono text-[11px]">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-neutral-800 border border-neutral-700 rounded text-neutral-400">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg border border-white/10 shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-black/95 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-3 gap-2 pb-3 border-b border-neutral-800">
            <button
              onClick={() => {
                setSelectedSubject('physics');
                setMobileMenuOpen(false);
              }}
              className={`py-2 rounded text-center text-xs font-orbitron ${
                selectedSubject === 'physics'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-neutral-900 text-neutral-400'
              }`}
            >
              PHYSICS
            </button>
            <button
              onClick={() => {
                setSelectedSubject('chemistry');
                setMobileMenuOpen(false);
              }}
              className="py-2 rounded text-center text-xs font-orbitron bg-neutral-900 text-neutral-500"
            >
              CHEM (SOON)
            </button>
            <button
              onClick={() => {
                setSelectedSubject('maths');
                setMobileMenuOpen(false);
              }}
              className="py-2 rounded text-center text-xs font-orbitron bg-neutral-900 text-neutral-500"
            >
              MATHS (SOON)
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-orbitron tracking-wider transition-all ${
                    isActive
                      ? 'bg-neutral-800 text-cyan-400 border border-neutral-700'
                      : 'text-neutral-300 hover:bg-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
