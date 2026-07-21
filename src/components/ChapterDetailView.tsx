import React, { useState, useEffect } from 'react';
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
  Maximize2,
  Minimize2,
  Type,
  X,
  Eye,
} from 'lucide-react';
import { PhysicsSimulator } from './PhysicsSimulator';
import { MathText } from './MathText';

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
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');

  // Handle Escape key to exit focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode]);

  // Prevent background scroll when focus mode is active
  useEffect(() => {
    if (isFocusMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFocusMode]);

  const handleCopyFormula = (expression: string, id: string) => {
    navigator.clipboard.writeText(expression);
    setCopiedFormulaId(id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  // Font size multiplier classes
  const fontClasses = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xlarge: 'text-xl leading-loose',
  }[fontSize];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Back Button & Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-xs font-orbitron text-neutral-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            BACK TO ALL CHAPTERS
          </button>

          {/* Focus Reading Mode Trigger Button */}
          <button
            onClick={() => setIsFocusMode(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neutral-900 to-black hover:from-neutral-800 hover:to-neutral-900 border border-cyan-500/40 text-cyan-400 hover:text-cyan-300 rounded-xl text-xs font-orbitron font-semibold tracking-wider transition-all shadow-md group cursor-pointer"
            title="Enter distraction-free full-screen reading mode"
          >
            <Maximize2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>FOCUS READING MODE</span>
          </button>
        </div>

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
            <div className="font-gowun text-neutral-300 text-base leading-relaxed">
              <MathText text={chapter.description} />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-mono text-neutral-400">High-yield topics:</span>
              {chapter.keyTopics.map((topic, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-xs font-gowun text-neutral-300"
                >
                  ✓ <MathText text={topic} />
                </span>
              ))}
            </div>
          </div>

          {chapter.theorySections.map((sec, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <h3 className="font-barrio text-2xl text-cyan-400">{sec.sectionTitle}</h3>

              <div className="font-gowun text-neutral-300 leading-relaxed text-base space-y-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                <MathText text={sec.content} />
              </div>

              {sec.derivation && (
                <div className="p-4 rounded-xl bg-neutral-900 border border-cyan-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    RIGOROUS CALCULUS DERIVATION
                  </div>
                  <div className="font-mono text-xs text-neutral-300 leading-relaxed">
                    <MathText text={sec.derivation} block={true} />
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200">
                <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-orbitron font-bold text-xs text-cyan-400 uppercase">Key Takeaway</span>
                  <div className="font-gowun text-sm text-neutral-200">
                    <MathText text={sec.keyTakeaway} />
                  </div>
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
                  <MathText text={form.expression} block={true} />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-orbitron text-neutral-400">VARIABLES:</span>
                  <div className="grid grid-cols-1 gap-1 text-xs font-gowun text-neutral-300">
                    {form.variables.map((v, i) => (
                      <div key={i} className="flex justify-between border-b border-neutral-900 pb-0.5">
                        <span className="font-mono text-cyan-300/80">
                          <MathText text={v.symbol} /> ({v.name})
                        </span>
                        <span className="font-mono text-neutral-400">{v.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="font-gowun text-xs text-neutral-400 bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800">
                  <strong className="text-neutral-300 font-orbitron">Concept:</strong> <MathText text={form.keyConcept} />
                </div>
              </div>

              {form.jeeTip && (
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs font-gowun text-cyan-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>JEE Tip:</strong> <MathText text={form.jeeTip} /></span>
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
                <MathText text={ex.question} />
              </div>

              {ex.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ex.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl font-gowun text-xs text-neutral-300"
                    >
                      <MathText text={opt} />
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
                      <MathText text={step} />
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
                  <div className="font-gowun text-sm text-neutral-300">
                    <MathText text={ex.jeeTrap} />
                  </div>
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

      {/* FULL-SCREEN FOCUS READING MODE OVERLAY */}
      {isFocusMode && (
        <div className="fixed inset-0 z-50 bg-black/98 text-neutral-100 flex flex-col overflow-hidden animate-fadeIn backdrop-blur-2xl">
          {/* Top Distraction-Free Sticky Navigation Header */}
          <header className="px-4 sm:px-8 py-3 bg-neutral-950/95 border-b border-neutral-800 flex items-center justify-between gap-4 backdrop-blur-md shrink-0">
            {/* Left: Chapter & Focus Indicator */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                FOCUS MODE
              </span>
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-orbitron font-bold text-white tracking-wider truncate max-w-xs sm:max-w-md">
                  {chapter.title}
                </span>
                <span className="text-[10px] font-mono text-neutral-400 truncate">
                  {chapter.unitTitle} • {chapter.badge}
                </span>
              </div>
            </div>

            {/* Center: Sub-tab selectors */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-orbitron">
              <button
                onClick={() => setActiveSubTab('theory')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'theory'
                    ? 'bg-neutral-800 text-cyan-400 border border-cyan-500/30 shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">THEORY</span>
              </button>

              <button
                onClick={() => setActiveSubTab('formulas')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'formulas'
                    ? 'bg-neutral-800 text-cyan-400 border border-cyan-500/30 shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">FORMULAS</span>
              </button>

              <button
                onClick={() => setActiveSubTab('examples')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeSubTab === 'examples'
                    ? 'bg-neutral-800 text-cyan-400 border border-cyan-500/30 shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">EXAMPLES</span>
              </button>
            </div>

            {/* Right Controls: Font size toggles & Exit */}
            <div className="flex items-center gap-2">
              {/* Font Size Adjuster */}
              <div className="hidden sm:flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    fontSize === 'normal' ? 'bg-neutral-800 text-cyan-400 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Normal Text Size"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                    fontSize === 'large' ? 'bg-neutral-800 text-cyan-400 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Large Text Size"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-1 rounded text-sm font-mono transition-colors ${
                    fontSize === 'xlarge' ? 'bg-neutral-800 text-cyan-400 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Extra Large Text Size"
                >
                  A++
                </button>
              </div>

              {/* Exit Focus Mode Button */}
              <button
                onClick={() => setIsFocusMode(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-cyan-500/50 text-neutral-300 hover:text-cyan-400 rounded-xl text-xs font-orbitron transition-all"
                title="Exit Focus Reading Mode (Esc)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">EXIT FOCUS</span>
                <span className="text-[10px] text-neutral-500 font-mono hidden lg:inline">(Esc)</span>
              </button>
            </div>
          </header>

          {/* Scrollable Focus Content Canvas */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-10">
            <div className="max-w-4xl mx-auto space-y-10">
              {/* Focus Banner */}
              <div className="border-b border-neutral-800 pb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>{chapter.badge}</span>
                  <span>•</span>
                  <span>{chapter.unitTitle}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-barrio text-white tracking-wide">
                  {chapter.title}
                </h1>
                <p className="font-gowun text-neutral-400 text-base leading-relaxed">
                  {chapter.subtitle}
                </p>
              </div>

              {/* Render Content dynamically based on active subtab inside Focus Mode */}
              {activeSubTab === 'theory' && (
                <div className="space-y-10">
                  <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-4">
                    <h2 className="section-title text-cyan-400">CHAPTER OVERVIEW</h2>
                    <div className={`font-gowun text-neutral-200 ${fontClasses}`}>
                      <MathText text={chapter.description} />
                    </div>
                  </div>

                  {chapter.theorySections.map((sec, idx) => (
                    <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
                      <h3 className="font-barrio text-2xl sm:text-3xl text-cyan-400 border-b border-neutral-900 pb-3">
                        {sec.sectionTitle}
                      </h3>

                      <div className={`font-gowun text-neutral-200 ${fontClasses} space-y-4`}>
                        <MathText text={sec.content} />
                      </div>

                      {sec.derivation && (
                        <div className="p-5 rounded-2xl bg-neutral-900/80 border border-cyan-500/30 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400 font-bold tracking-wider">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            RIGOROUS CALCULUS DERIVATION
                          </div>
                          <div className="font-mono text-sm text-neutral-200 leading-relaxed overflow-x-auto">
                            <MathText text={sec.derivation} block={true} />
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3 p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200">
                        <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="font-orbitron font-bold text-xs text-cyan-400 uppercase tracking-wider">
                            Key Takeaway
                          </span>
                          <div className={`font-gowun text-neutral-200 ${fontClasses}`}>
                            <MathText text={sec.keyTakeaway} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSubTab === 'formulas' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {chapter.formulas.map((form) => (
                    <div
                      key={form.id}
                      className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <h3 className="font-barrio text-xl text-white">{form.title}</h3>
                        <button
                          onClick={() => handleCopyFormula(form.expression, form.id)}
                          className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-all text-xs flex items-center gap-1 font-mono"
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

                      <div className="p-4 bg-neutral-900 border border-cyan-500/40 rounded-xl font-mono text-xl font-bold text-cyan-400 text-center tracking-wider">
                        <MathText text={form.expression} block={true} />
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs font-orbitron text-neutral-400">VARIABLES:</span>
                        <div className="grid grid-cols-1 gap-1 text-sm font-gowun text-neutral-300">
                          {form.variables.map((v, i) => (
                            <div key={i} className="flex justify-between border-b border-neutral-900 pb-0.5">
                              <span className="font-mono text-cyan-300/90">
                                <MathText text={v.symbol} /> ({v.name})
                              </span>
                              <span className="font-mono text-neutral-400">{v.unit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="font-gowun text-sm text-neutral-300 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800">
                        <strong className="text-neutral-200 font-orbitron">Concept:</strong> <MathText text={form.keyConcept} />
                      </div>

                      {form.jeeTip && (
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-sm font-gowun text-cyan-300 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span><strong>JEE Tip:</strong> <MathText text={form.jeeTip} /></span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeSubTab === 'examples' && (
                <div className="space-y-8">
                  {chapter.solvedExamples.map((ex, idx) => (
                    <div key={ex.id} className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                        <span className="font-barrio text-2xl text-cyan-400">
                          EXAMPLE {idx + 1}: {ex.title}
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 uppercase">
                          {ex.type}
                        </span>
                      </div>

                      <div className={`font-gowun text-neutral-200 ${fontClasses} bg-neutral-900/60 p-5 rounded-xl border border-neutral-800`}>
                        <MathText text={ex.question} />
                      </div>

                      {ex.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {ex.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className="p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl font-gowun text-sm text-neutral-200"
                            >
                              <MathText text={opt} />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-orbitron font-bold text-xs text-cyan-400">
                            STEP-BY-STEP MATHEMATICAL SOLUTION
                          </span>
                          <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                            Correct: {Array.isArray(ex.correctAnswer) ? ex.correctAnswer.join(', ') : ex.correctAnswer}
                          </span>
                        </div>

                        <ol className="list-decimal list-inside space-y-3 font-gowun text-base text-neutral-200">
                          {ex.stepByStepSolution.map((step, sIdx) => (
                            <li key={sIdx} className="leading-relaxed bg-black/50 p-3 rounded-lg border border-neutral-900">
                              <MathText text={step} />
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="font-orbitron font-bold text-xs text-red-400 uppercase">
                            COMMON JEE ADVANCED TRAP
                          </span>
                          <div className={`font-gowun ${fontClasses} text-neutral-200`}>
                            <MathText text={ex.jeeTrap} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Return Control in Focus Mode */}
              <div className="pt-8 text-center">
                <button
                  onClick={() => setIsFocusMode(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white rounded-xl text-xs font-orbitron tracking-wider transition-all shadow-lg"
                >
                  <Minimize2 className="w-4 h-4 text-cyan-400" />
                  RETURN TO STANDARD VIEW
                </button>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};
