import React, { useState } from 'react';
import { PYQS } from '../data/pyqs';
import { CHAPTERS } from '../data/chapters';
import { PYQ } from '../types';
import { Award, Clock, CheckCircle2, XCircle, AlertTriangle, Eye, RefreshCw } from 'lucide-react';
import { MathText } from './MathText';

export const PYQBankView: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const filteredPyqs = PYQS.filter((q) => {
    if (selectedYear !== 'all' && q.year.toString() !== selectedYear) return false;
    if (selectedChapterId !== 'all' && q.chapterId !== selectedChapterId) return false;
    return true;
  });

  const handleOptionToggle = (questionId: string, optionKey: string, isMulti: boolean) => {
    setUserAnswers((prev) => {
      const current = prev[questionId] || [];
      if (isMulti) {
        if (current.includes(optionKey)) {
          return { ...prev, [questionId]: current.filter((o) => o !== optionKey) };
        } else {
          return { ...prev, [questionId]: [...current, optionKey] };
        }
      } else {
        return { ...prev, [questionId]: [optionKey] };
      }
    });
  };

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>ARCHIVE 2015 - 2025 (PAPER 1 & PAPER 2)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-barrio text-white tracking-wide">
            JEE ADVANCED PREVIOUS YEAR QUESTIONS BANK
          </h1>
          <p className="font-gowun text-neutral-400 text-sm max-w-2xl">
            Real questions from Indian Institute of Technology entrance exams with exact marking schemes, multi-select options, integer inputs, and detailed solutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-center">
            <div className="font-orbitron font-bold text-cyan-400 text-lg">{filteredPyqs.length}</div>
            <div className="font-gowun text-[11px] text-neutral-400">Questions</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
        <div className="space-y-1">
          <label className="text-[10px] font-orbitron font-bold text-neutral-400 uppercase">
            Filter Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs font-gowun text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Years (2015 - 2025)</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-orbitron font-bold text-neutral-400 uppercase">
            Filter Chapter
          </label>
          <select
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs font-gowun text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Physics Chapters</option>
            {CHAPTERS.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Question List */}
      <div className="space-y-6">
        {filteredPyqs.map((q, idx) => {
          const userAns = userAnswers[q.id] || [];
          const isSolved = userAns.length > 0;
          const isMulti = q.questionType === 'multi';
          const isRevealed = revealedSolutions[q.id];

          const targetAnswers = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];

          return (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 hover:border-neutral-700 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="badge font-barrio">
                    JEE ADV {q.year} ({q.paper})
                  </span>
                  <span className="font-mono text-xs text-cyan-400">{q.chapterTitle}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                    Type: {q.questionType}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    +{q.marks.correct} / {q.marks.incorrect}
                  </span>
                </div>
              </div>

              {/* Question Body */}
              <div className="font-gowun text-neutral-200 text-base leading-relaxed bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                <MathText text={q.questionText} />
              </div>

              {/* Multiple Choice Options */}
              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, oIdx) => {
                    const optionLetter = opt.charAt(0);
                    const isSelected = userAns.includes(optionLetter);

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionToggle(q.id, optionLetter, isMulti)}
                        className={`p-3.5 rounded-xl border font-gowun text-xs text-left transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold shadow-md'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <MathText text={opt} />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Actions & Reveal */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => toggleSolution(q.id)}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900 border border-neutral-700 hover:border-cyan-400 rounded-lg text-xs font-orbitron text-cyan-400 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {isRevealed ? 'HIDE SOLUTION' : 'REVEAL STEP-BY-STEP SOLUTION'}
                </button>

                {isSolved && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Answer Selected
                  </span>
                )}
              </div>

              {/* Revealed Solution */}
              {isRevealed && (
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3 font-gowun text-xs text-neutral-200 leading-relaxed animate-fadeIn">
                  <div className="font-orbitron font-bold text-cyan-400 text-sm">
                    CORRECT ANSWER: {targetAnswers.join(', ')}
                  </div>
                  <div className="font-mono text-xs text-neutral-300 leading-relaxed bg-black/40 p-3 rounded border border-neutral-800">
                    <MathText text={q.solution} block={true} />
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px] font-mono text-neutral-400 pt-1">
                    <span>Topics tested:</span>
                    {q.topicsTested.map((t, i) => (
                      <span key={i} className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-300">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
