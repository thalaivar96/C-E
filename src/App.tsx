import React, { useState } from 'react'; 
import { Subject, Chapter } from './types';
import { CHAPTERS, PHYSICS_UNITS } from './data/chapters';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ChapterCard } from './components/ChapterCard';
import { ChapterDetailView } from './components/ChapterDetailView';
import { PhysicsSimulator } from './components/PhysicsSimulator';
import { PYQBankView } from './components/PYQBankView';
import { FormulaFlashcards } from './components/FormulaFlashcards';
import { MockTestGenerator } from './components/MockTestGenerator';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Atom, Compass, FlaskConical, Calculator } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('physics');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setActiveTab('chapters');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col font-orbitron antialiased overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedChapter(null);
        }}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Container Content */}
      <main className="flex-1 pb-16">
        {/* VIEW 0: DEDICATED HOME PAGE WITH PLATFORM FEATURES */}
        {activeTab === 'home' && (
          <HomePage
            onNavigateToTab={(tab) => {
              setActiveTab(tab);
              setSelectedChapter(null);
            }}
            onSelectChapter={handleSelectChapter}
            onOpenSearch={() => setSearchModalOpen(true)}
          />
        )}

        {/* VIEW 1: CHAPTERS & CORE CURRICULUM */}
        {activeTab === 'chapters' && !selectedChapter && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fadeIn">
            {/* Subject Warning / Info Notice */}
            {selectedSubject !== 'physics' && (
              <div className="p-6 rounded-2xl bg-neutral-950 border border-cyan-500/30 flex items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  {selectedSubject === 'chemistry' ? (
                    <FlaskConical className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <Calculator className="w-8 h-8 text-blue-400" />
                  )}
                  <div>
                    <h3 className="font-barrio text-xl text-white">
                      {selectedSubject === 'chemistry' ? 'JEE ADVANCED CHEMISTRY BASE' : 'JEE ADVANCED MATHEMATICS BASE'}
                    </h3>
                    <p className="font-gowun text-xs text-neutral-400">
                      Chemistry and Mathematics deep content modules are under construction for the upcoming 2027 edition. Exploring Physics base below.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSubject('physics')}
                  className="px-4 py-2 bg-neutral-900 border border-neutral-700 hover:border-cyan-400 rounded-xl text-xs font-orbitron text-cyan-400 shrink-0 transition-all"
                >
                  RETURN TO PHYSICS
                </button>
              </div>
            )}

            {/* Units & Horizontal Scrolling Chapter Posts */}
            {PHYSICS_UNITS.map((unit) => {
              const unitChapters = CHAPTERS.filter((c) => c.unit === unit.id);
              if (unitChapters.length === 0) return null;

              return (
                <section key={unit.id} className="space-y-4">
                  <div className="flex items-end justify-between border-b border-neutral-800/80 pb-3">
                    <div>
                      <h2 className="section-title">{unit.name.toUpperCase()}</h2>
                      <p className="font-gowun text-xs text-neutral-400 pl-3">
                        {unit.description}
                      </p>
                    </div>

                    <span className="text-xs font-mono text-neutral-500">
                      {unitChapters.length} {unitChapters.length === 1 ? 'CHAPTER' : 'CHAPTERS'}
                    </span>
                  </div>

                  {/* Horizontal Scroll Posts Container */}
                  <div className="posts-scroll">
                    {unitChapters.map((ch) => (
                      <ChapterCard
                        key={ch.id}
                        chapter={ch}
                        onSelect={handleSelectChapter}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* VIEW: CHAPTER DETAIL VIEW */}
        {activeTab === 'chapters' && selectedChapter && (
          <ChapterDetailView
            chapter={selectedChapter}
            onBack={() => setSelectedChapter(null)}
          />
        )}

        {/* VIEW 2: INTERACTIVE SIMULATORS */}
        {activeTab === 'simulators' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border border-neutral-800 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                <Compass className="w-3.5 h-3.5" />
                <span>INTERACTIVE 2D PHYSICS CANVAS ENGINES</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-barrio text-white">
                PHYSICS CANVAS SIMULATIONS
              </h1>
              <p className="font-gowun text-neutral-400 text-xs max-w-2xl">
                Visualize physical laws in real time. Tweak incline angles, radii, inductance, capacitance, and focal lengths to observe exact trajectories and resonance peaks.
              </p>
            </div>

            <div className="space-y-12">
              <PhysicsSimulator simType="rotation" />
              <PhysicsSimulator simType="circuit" />
              <PhysicsSimulator simType="optics" />
              <PhysicsSimulator simType="projectile" />
            </div>
          </div>
        )}

        {/* VIEW 3: PYQ BANK */}
        {activeTab === 'pyqs' && <PYQBankView />}

        {/* VIEW 4: FLASHCARDS */}
        {activeTab === 'formulas' && <FormulaFlashcards />}

        {/* VIEW 5: MOCK TESTS */}
        {activeTab === 'mock-test' && <MockTestGenerator />}
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectChapter={(ch) => {
          setSelectedChapter(ch);
          setActiveTab('chapters');
        }}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          setSelectedChapter(null);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="font-orbitron font-bold text-cyan-400 text-lg tracking-wider flex items-center justify-center md:justify-start gap-2">
              <Atom className="w-5 h-5 text-cyan-400" />
              COFFEE&ENGINEER
            </div>
            <p className="font-gowun text-xs text-neutral-500 max-w-md">
              Highly advanced preparatory base for Indian Institute of Technology JEE Advanced Physics, Chemistry, and Mathematics.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400">
            <span>© 2026 COFFEE&ENGINEER</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => setActiveTab('home')}>
              HOME
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => setActiveTab('chapters')}>
              PHYSICS CORE
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => setActiveTab('pyqs')}>
              PYQS
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => setActiveTab('formulas')}>
              FLASHCARDS
            </span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => setActiveTab('simulators')}>
              SIMULATORS
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
