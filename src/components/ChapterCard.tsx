import React from 'react';
import { Chapter } from '../types';
import { ArrowRight, Clock } from 'lucide-react';

interface ChapterCardProps {
  chapter: Chapter;
  onSelect: (chapter: Chapter) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(chapter)}
      className="post-card cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
          <span className="font-mono text-cyan-400/90 font-medium">{chapter.unitTitle}</span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-neutral-400">
            <Clock className="w-3 h-3 text-neutral-400" />
            {chapter.estimatedStudyTime}
          </span>
        </div>

        <h3 className="font-barrio text-xl text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
          {chapter.title}
        </h3>

        <p className="font-gowun text-sm text-neutral-400 mt-2 line-clamp-3">
          {chapter.description}
        </p>

        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap gap-1.5">
          {chapter.keyTopics.slice(0, 2).map((topic, idx) => (
            <span
              key={idx}
              className="text-[10px] font-gowun bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400 truncate max-w-[240px]"
            >
              • {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="badge font-barrio">
          {chapter.badge}
        </span>

        <button className="flex items-center gap-1 text-xs font-orbitron text-cyan-400 group-hover:translate-x-1 transition-transform">
          STUDY <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
