import React, { useState, useEffect } from 'react';
import {
  X,
  GraduationCap,
  Award,
  Flame,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnatomicalStructure } from '../../types/anatomy';

interface QuizModeModalProps {
  isActive: boolean;
  onClose: () => void;
  structures: AnatomicalStructure[];
  currentQuizStructure: AnatomicalStructure | null;
  onNextQuestion: () => void;
}

export const QuizModeModal: React.FC<QuizModeModalProps> = ({
  isActive,
  onClose,
  structures,
  currentQuizStructure,
  onNextQuestion,
}) => {
  const [options, setOptions] = useState<AnatomicalStructure[]>([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Generate 4 multiple-choice options when the target structure changes
  useEffect(() => {
    if (!currentQuizStructure || structures.length === 0) return;

    // Pick 3 distractors
    const distractors = structures
      .filter((s) => s.id !== currentQuizStructure.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const allChoices = [currentQuizStructure, ...distractors].sort(
      () => 0.5 - Math.random()
    );
    setOptions(allChoices);
    setSelectedAnswerId(null);
    setIsAnswered(false);
  }, [currentQuizStructure, structures]);

  if (!isActive || !currentQuizStructure) return null;

  const handleSelectOption = (structure: AnatomicalStructure) => {
    if (isAnswered) return;

    setSelectedAnswerId(structure.id);
    setIsAnswered(true);

    const isCorrect = structure.id === currentQuizStructure.id;
    if (isCorrect) {
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);

      if (nextStreak % 3 === 0) {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    onNextQuestion();
  };

  const isCorrectChoice = selectedAnswerId === currentQuizStructure.id;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg pointer-events-none">
      <div className="glass-panel rounded-3xl p-4 md:p-5 shadow-apple-card border border-white/20 pointer-events-auto flex flex-col gap-3 animate-slide-left">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white tracking-tight block">
                Anatomy Identification Challenge
              </span>
              <span className="text-[10px] text-slate-400">
                Inspect the highlighted 3D structure and name it
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak & Score Badges */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                <Flame className="w-3 h-3" />
                <span>{streak}</span>
              </div>
              <div className="flex items-center gap-1 text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded-full border border-sky-400/20">
                <Award className="w-3 h-3" />
                <span>{score}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Exit Quiz"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="text-xs text-slate-200">
          Which anatomical structure is currently highlighted in the 3D model?
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {options.map((opt) => {
            const isSelected = selectedAnswerId === opt.id;
            const isTarget = opt.id === currentQuizStructure.id;

            let btnClasses =
              'p-2.5 rounded-2xl text-left text-xs transition-all flex flex-col justify-center border ';

            if (isAnswered) {
              if (isTarget) {
                btnClasses += 'bg-emerald-500/20 border-emerald-500 text-white font-semibold';
              } else if (isSelected && !isTarget) {
                btnClasses += 'bg-rose-500/20 border-rose-500 text-rose-200';
              } else {
                btnClasses += 'bg-white/5 border-white/5 text-slate-500 opacity-50';
              }
            } else {
              btnClasses += 'bg-white/5 hover:bg-white/10 border-white/10 text-white active:scale-98';
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={btnClasses}
              >
                <span className="font-semibold">{opt.englishName}</span>
                <span className="text-[10px] italic font-serif opacity-80">
                  {opt.latinName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Button */}
        {isAnswered && (
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs">
              {isCorrectChoice ? (
                <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Correct!</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-rose-400 font-semibold">
                  <XCircle className="w-4 h-4" />
                  <span>
                    Incorrect. It is{' '}
                    <strong className="text-white">
                      {currentQuizStructure.englishName}
                    </strong>
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold shadow-md transition-all transform active:scale-95"
            >
              <span>Next Structure</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
