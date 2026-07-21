export type Subject = 'physics' | 'chemistry' | 'maths';

export type PhysicsUnit =
  | 'mechanics'
  | 'electrodynamics'
  | 'thermodynamics'
  | 'waves_optics'
  | 'modern_physics'
  | 'experimental';

export type QuestionType = 'single' | 'multi' | 'integer' | 'matrix' | 'paragraph';

export interface Formula {
  id: string;
  title: string;
  expression: string;
  latex?: string;
  variables: { name: string; symbol: string; unit: string }[];
  keyConcept: string;
  jeeTip?: string;
}

export interface SolvedExample {
  id: string;
  title: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  stepByStepSolution: string[];
  jeeTrap: string;
}

export interface Chapter {
  id: string;
  unit: PhysicsUnit;
  unitTitle: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  difficulty: 'Moderate' | 'Hard' | 'Extreme (Pathfinder Level)';
  estimatedStudyTime: string;
  weightagePercentage: number; // e.g. 12% in JEE Advanced
  keyTopics: string[];
  theorySections: {
    sectionTitle: string;
    content: string;
    keyTakeaway: string;
    derivation?: string;
  }[];
  formulas: Formula[];
  solvedExamples: SolvedExample[];
  interactiveSimType?: 'projectile' | 'rotation' | 'circuit' | 'optics' | 'wave_interference';
}

export interface PYQ {
  id: string;
  year: number;
  chapterId: string;
  chapterTitle: string;
  paper: 'Paper 1' | 'Paper 2';
  questionType: QuestionType;
  questionText: string;
  options?: string[];
  correctAnswer: string | string[];
  marks: { correct: number; incorrect: number };
  solution: string;
  difficulty: 'Moderate' | 'Hard' | 'Severe';
  topicsTested: string[];
}

export interface Flashcard {
  id: string;
  chapterId: string;
  chapterTitle: string;
  front: string;
  back: string;
  formula?: string;
  unit: PhysicsUnit;
}

export interface SimulationParams {
  angle: number; // Projectile angle or Ray angle
  velocity: number; // Initial velocity or Current
  mass: number;
  radius: number;
  resistance: number;
  capacitance: number;
  inductance: number;
}
