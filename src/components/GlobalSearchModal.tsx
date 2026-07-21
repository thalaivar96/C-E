import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Layers, Award, Sparkles, ArrowRight } from 'lucide-react';
import { CHAPTERS, FLASHCARDS } from '../data/chapters';
import { PYQS } from '../data/pyqs';
import { Chapter } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapter: Chapter) => void;
  onNavigateToTab: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  onNavigateToTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredChapters = CHAPTERS.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.keyTopics.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFormulas = FLASHCARDS.filter(
    (f) =>
      f.front.toLowerCase().includes(query.toLowerCase()) ||
      f.chapterTitle.toLowerCase().includes(query.toLowerCase()) ||
      (f.formula && f.formula.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredPyqs = PYQS.filter(
    (p) =>
      p.questionText.toLowerCase().includes(query.toLowerCase()) ||
      p.chapterTitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search JEE Advanced chapters, formulas, torque, Gauss law, optics..."
            className="w-full bg-transparent text-sm font-gowun text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Chapter Results */}
          {filteredChapters.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-orbitron font-bold text-cyan-400 uppercase tracking-widest">
                PHYSICS CHAPTERS ({filteredChapters.length})
              </span>
              <div className="space-y-1">
                {filteredChapters.map((ch) => (
                  <div
                    key={ch.id}
                    onClick={() => {
                      onSelectChapter(ch);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="space-y-0.5">
                      <div className="font-barrio text-base text-white group-hover:text-cyan-400 transition-colors">
                        {ch.title}
                      </div>
                      <div className="font-gowun text-xs text-neutral-400">{ch.unitTitle} • {ch.badge}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formula Results */}
          {filteredFormulas.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-orbitron font-bold text-cyan-400 uppercase tracking-widest">
                FORMULA FLASHCARDS ({filteredFormulas.length})
              </span>
              <div className="space-y-1">
                {filteredFormulas.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => {
                      onNavigateToTab('formulas');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="space-y-1">
                      <div className="font-gowun text-xs text-neutral-200">{f.front}</div>
                      {f.formula && (
                        <div className="font-mono text-xs text-cyan-400 bg-black/40 px-2 py-0.5 rounded inline-block">
                          {f.formula}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PYQs Results */}
          {filteredPyqs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-orbitron font-bold text-cyan-400 uppercase tracking-widest">
                JEE ADVANCED PYQS ({filteredPyqs.length})
              </span>
              <div className="space-y-1">
                {filteredPyqs.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onNavigateToTab('pyqs');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-cyan-500/40 cursor-pointer space-y-1 group transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-400">JEE ADV {p.year}</span>
                      <span className="text-neutral-500">{p.chapterTitle}</span>
                    </div>
                    <div className="font-gowun text-xs text-neutral-300 line-clamp-2">
                      {p.questionText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredChapters.length === 0 && filteredFormulas.length === 0 && filteredPyqs.length === 0 && (
            <div className="text-center py-8 text-neutral-500 font-gowun text-sm">
              No matching physics chapters or formulas found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
