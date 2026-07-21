import React, { useState } from 'react';
import { Chapter, SolvedExample } from '../types';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  HelpCircle,
  Sparkles,
  Compass,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
} from 'lucide-react';
import { PhysicsSimulator } from './PhysicsSimulator';

interface ChapterDetailViewProps {
  chapter: Chapter;
  onBack: () => void;
}

export const ChapterDetailView: React.FC<ChapterDetailViewProps> = ({
  chapter,
  onBack,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'theory' | 'formulas' | 'examples' | 'simulator'>('theory');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  const handleCopyFormula = (expression: string, id: string) => {
    navigator.clipboard.writeText(expression);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Back Button & Header */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-xs font-orbitron text-neutral-300 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          BACK TO ALL CHAPTERS
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border border-neutral-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge font-barrio">{chapter.badge}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
                {chapter.unitTitle}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
                Difficulty: {chapter.difficulty}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-barrio text-white tracking-wide">
              {chapter.title}
            </h1>
            <p className="font-gowun text-neutral-400 text-sm sm:text-base max-w-3xl">
              {chapter.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Chapter Sub-Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-neutral-950 border border-neutral-800 rounded-xl scrollbar-none">
        <button
          onClick={() => setActiveSubTab('theory')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-orbitron tracking-wider whitespace-nowrap transition-all ${
            activeSubTab === 'theory'
              ? 'bg-neutral-800 text-cyan-400 border border-neutral-700 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          THEORY & DERIVATIONS
        </button>

        <button
          onClick={() => setActiveSubTab('formulas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-orbitron tracking-wider whitespace-nowrap transition-all ${
            activeSubTab === 'formulas'
              ? 'bg-neutral-800 text-cyan-400 border border-neutral-700 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          KEY FORMULAS ({chapter.formulas.length})
        </button>

        <button
          onClick={() => setActiveSubTab('examples')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-orbitron tracking-wider whitespace-nowrap transition-all ${
            activeSubTab === 'examples'
              ? 'bg-neutral-800 text-cyan-400 border border-neutral-700 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          SOLVED EXAMPLES ({chapter.solvedExamples.length})
        </button>

        <button
          onClick={() => setActiveSubTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-orbitron tracking-wider whitespace-nowrap transition-all ${
            activeSubTab === 'simulator'
              ? 'bg-neutral-800 text-cyan-400 border border-neutral-700 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          INTERACTIVE SIMULATOR
        </button>
      </div>

      {/* SUB-TAB CONTENT: THEORY */}
      {activeSubTab === 'theory' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
            <h2 className="section-title">CHAPTER OVERVIEW</h2>
            <p className="font-gowun text-neutral-300 text-base leading-relaxed">
              {chapter.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono text-neutral-400">High-yield topics:</span>
              {chapter.keyTopics.map((topic, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-xs font-gowun text-neutral-300"
                >
                  ✓ {topic}
                </span>
              ))}
            </div>
          </div>

          {chapter.theorySections.map((sec, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <h3 className="font-barrio text-2xl text-cyan-400">{sec.sectionTitle}</h3>

              <div className="font-gowun text-neutral-300 whitespace-pre-line leading-relaxed text-base space-y-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 font-mono text-sm">
                {sec.content}
              </div>

              {sec.derivation && (
                <div className="p-4 rounded-xl bg-neutral-900 border border-cyan-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    RIGOROUS CALCULUS DERIVATION
                  </div>
                  <pre className="font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
                    {sec.derivation}
                  </pre>
                </div>
              )}

              <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200">
                <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-orbitron font-bold text-xs text-cyan-400 uppercase">Key Takeaway</span>
                  <p className="font-gowun text-sm text-neutral-200">{sec.keyTakeaway}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB CONTENT: FORMULAS */}
      {activeSubTab === 'formulas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapter.formulas.map((form) => (
            <div
              key={form.id}
              className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-barrio text-lg text-white">{form.title}</h3>
                  <button
                    onClick={() => handleCopyFormula(form.expression, form.id)}
                    className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-all text-xs flex items-center gap-1 font-mono"
                    title="Copy Formula"
                  >
                    {copiedFormulaId === form.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-neutral-900 border border-cyan-500/30 rounded-xl font-mono text-lg font-bold text-cyan-400 text-center tracking-wider">
                  {form.expression}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-orbitron text-neutral-400">VARIABLES:</span>
                  <div className="grid grid-cols-1 gap-1 text-xs font-gowun text-neutral-300">
                    {form.variables.map((v, i) => (
                      <div key={i} className="flex justify-between border-b border-neutral-900 pb-0.5">
                        <span className="font-mono text-cyan-300/80">{v.symbol} ({v.name})</span>
                        <span className="font-mono text-neutral-400">{v.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="font-gowun text-xs text-neutral-400 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                  <strong className="text-neutral-300 font-orbitron">Concept:</strong> {form.keyConcept}
                </p>
              </div>

              {form.jeeTip && (
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs font-gowun text-cyan-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>JEE Tip:</strong> {form.jeeTip}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB CONTENT: SOLVED EXAMPLES */}
      {activeSubTab === 'examples' && (
        <div className="space-y-6">
          {chapter.solvedExamples.map((ex, idx) => (
            <div key={ex.id} className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                <span className="font-barrio text-xl text-cyan-400">
                  EXAMPLE {idx + 1}: {ex.title}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 uppercase">
                  Type: {ex.type}
                </span>
              </div>

              <div className="font-gowun text-neutral-200 text-base leading-relaxed bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                {ex.question}
              </div>

              {ex.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ex.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl font-gowun text-xs text-neutral-300"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-orbitron font-bold text-xs text-cyan-400">
                    STEP-BY-STEP MATHEMATICAL SOLUTION
                  </span>
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Correct Answer: {Array.isArray(ex.correctAnswer) ? ex.correctAnswer.join(', ') : ex.correctAnswer}
                  </span>
                </div>

                <ol className="list-decimal list-inside space-y-2 font-gowun text-sm text-neutral-300">
                  {ex.stepByStepSolution.map((step, sIdx) => (
                    <li key={sIdx} className="leading-relaxed bg-black/40 p-2 rounded border border-neutral-900">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-orbitron font-bold text-xs text-red-400 uppercase">
                    COMMON JEE ADVANCED TRAP
                  </span>
                  <p className="font-gowun text-sm text-neutral-300">{ex.jeeTrap}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB CONTENT: INTERACTIVE SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-gowun text-neutral-300 flex items-center justify-between">
            <span>Interactive 2D Physics Engine for {chapter.title}</span>
            <span className="font-mono text-cyan-400">Canvas 60 FPS</span>
          </div>
          <PhysicsSimulator simType={chapter.interactiveSimType || 'rotation'} />
        </div>
      )}
    </div>
  );
};
