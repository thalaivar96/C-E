import React, { useState } from 'react';
import { FLASHCARDS } from '../data/chapters';
import { Layers, RotateCw, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export const FormulaFlashcards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<string[]>([]);

  const currentCard = FLASHCARDS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const toggleMastered = (id: string) => {
    setMasteredCards((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border border-neutral-800 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          <span>SPACED REPETITION FORMULA DECK</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-barrio text-white tracking-wide">
          JEE ADVANCED FORMULA FLASHCARDS
        </h1>
        <p className="font-gowun text-neutral-400 text-xs max-w-lg mx-auto">
          Tap the card to flip between conceptual question and formula derivation.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
        <span>CARD {currentIndex + 1} OF {FLASHCARDS.length}</span>
        <span>MASTERED: {masteredCards.length} / {FLASHCARDS.length}</span>
      </div>

      {/* Flashcard Box */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer min-h-[280px] p-8 rounded-3xl bg-neutral-950 border border-neutral-800 hover:border-cyan-400/50 transition-all flex flex-col justify-between shadow-2xl relative group select-none"
      >
        <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
          <span className="badge font-barrio">{currentCard.chapterTitle}</span>
          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
            <RotateCw className="w-3.5 h-3.5" />
            {isFlipped ? 'REVERSE SIDE (FORMULA)' : 'FRONT SIDE (CONCEPT)'}
          </span>
        </div>

        {/* Card Content */}
        <div className="py-8 text-center space-y-4">
          {!isFlipped ? (
            <h2 className="font-gowun text-xl sm:text-2xl text-white font-medium max-w-xl mx-auto leading-relaxed">
              {currentCard.front}
            </h2>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-neutral-900 border border-cyan-500/30 rounded-2xl font-mono text-2xl text-cyan-400 font-bold inline-block px-8">
                {currentCard.formula}
              </div>
              <p className="font-gowun text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
                {currentCard.back}
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs font-gowun text-neutral-500 pt-3 border-t border-neutral-900">
          <span>Click anywhere on card to flip</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMastered(currentCard.id);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-orbitron transition-all ${
              masteredCards.includes(currentCard.id)
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {masteredCards.includes(currentCard.id) ? 'MASTERED' : 'MARK AS MASTERED'}
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white font-orbitron text-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" /> PREVIOUS CARD
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-orbitron font-bold text-xs hover:bg-neutral-200 transition-all shadow-lg shadow-white/10"
        >
          NEXT CARD <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
