import React, { useState, useEffect } from 'react';
import { PYQS } from '../data/pyqs';
import { Clock, Award, CheckCircle2, AlertTriangle, Play, RotateCcw } from 'lucide-react';

export const MockTestGenerator: React.FC = () => {
  const [testActive, setTestActive] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
  const [scoreReport, setScoreReport] = useState<{ totalScore: number; correct: number; incorrect: number } | null>(null);

  const testQuestions = PYQS; // Using full PYQ suite for mock paper

  useEffect(() => {
    let timer: any;
    if (testActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && testActive) {
      finishTest();
    }
    return () => clearInterval(timer);
  }, [testActive, timeLeft]);

  const startTest = () => {
    setTestActive(true);
    setTestFinished(false);
    setTimeLeft(1800);
    setUserAnswers({});
    setScoreReport(null);
  };

  const handleSelectOption = (questionId: string, optionKey: string, isMulti: boolean) => {
    if (!testActive) return;
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

  const finishTest = () => {
    setTestActive(false);
    setTestFinished(true);

    let total = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    testQuestions.forEach((q) => {
      const uAns = userAnswers[q.id] || [];
      const targetAns = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];

      if (uAns.length === 0) return; // Unattempted

      const isExactMatch =
        uAns.length === targetAns.length && uAns.every((val) => targetAns.includes(val));

      if (isExactMatch) {
        total += q.marks.correct;
        correctCount++;
      } else {
        total += q.marks.incorrect;
        incorrectCount++;
      }
    });

    setScoreReport({ totalScore: total, correct: correctCount, incorrect: incorrectCount });
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Test Control Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>REAL EXAM CONDITIONS (+4 / -2 SCHEME)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-barrio text-white tracking-wide">
            JEE ADVANCED SIMULATED MOCK TEST PAPER
          </h1>
          <p className="font-gowun text-neutral-400 text-xs max-w-lg">
            Timed practice test evaluating speed, precision, and multi-correct marking penalties.
          </p>
        </div>

        {!testActive ? (
          <button
            onClick={startTest}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-orbitron font-bold text-sm hover:bg-neutral-200 transition-all shadow-lg shadow-white/10 shrink-0"
          >
            <Play className="w-4 h-4 text-black fill-black" />
            START 30-MIN MOCK PAPER
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="font-mono text-xl font-bold text-cyan-400 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800">
              ⏱ {formatTime(timeLeft)}
            </div>
            <button
              onClick={finishTest}
              className="px-5 py-2.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 font-orbitron font-bold text-xs hover:bg-red-500/30 transition-all shrink-0"
            >
              SUBMIT TEST
            </button>
          </div>
        )}
      </div>

      {/* Score Report Overlay */}
      {testFinished && scoreReport && (
        <div className="p-8 rounded-3xl bg-neutral-950 border border-cyan-500/40 text-center space-y-6 animate-fadeIn shadow-2xl">
          <Award className="w-12 h-12 text-cyan-400 mx-auto" />
          <h2 className="font-barrio text-3xl text-white">MOCK TEST RESULT REPORT</h2>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
              <div className="font-orbitron text-2xl font-bold text-cyan-400">
                {scoreReport.totalScore}
              </div>
              <div className="font-gowun text-xs text-neutral-400 mt-1">Total Marks</div>
            </div>

            <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
              <div className="font-orbitron text-2xl font-bold text-emerald-400">
                {scoreReport.correct}
              </div>
              <div className="font-gowun text-xs text-neutral-400 mt-1">Correct</div>
            </div>

            <div className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800">
              <div className="font-orbitron text-2xl font-bold text-red-400">
                {scoreReport.incorrect}
              </div>
              <div className="font-gowun text-xs text-neutral-400 mt-1">Incorrect</div>
            </div>
          </div>

          <button
            onClick={startTest}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-cyan-400 text-white font-orbitron text-xs transition-all"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" /> RETAKE MOCK PAPER
          </button>
        </div>
      )}

      {/* Test Questions Paper */}
      <div className="space-y-6">
        {testQuestions.map((q, idx) => {
          const userAns = userAnswers[q.id] || [];
          const isMulti = q.questionType === 'multi';

          return (
            <div key={q.id} className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <span className="font-barrio text-lg text-cyan-400">
                  QUESTION {idx + 1} ({q.chapterTitle})
                </span>
                <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-0.5 rounded border border-neutral-800">
                  Marking: +{q.marks.correct} / {q.marks.incorrect}
                </span>
              </div>

              <p className="font-gowun text-sm text-neutral-200 leading-relaxed bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
                {q.questionText}
              </p>

              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, oIdx) => {
                    const optionLetter = opt.charAt(0);
                    const isSelected = userAns.includes(optionLetter);

                    return (
                      <button
                        key={oIdx}
                        disabled={!testActive}
                        onClick={() => handleSelectOption(q.id, optionLetter, isMulti)}
                        className={`p-3.5 rounded-xl border font-gowun text-xs text-left transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold shadow-md'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
