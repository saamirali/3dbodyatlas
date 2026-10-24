import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  GraduationCap,
  Activity,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Key,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnatomicalStructure, QuizQuestion } from '../../types/anatomy';

interface AskAIModalProps {
  structure: AnatomicalStructure;
  isOpen: boolean;
  onClose: () => void;
}

export const AskAIModal: React.FC<AskAIModalProps> = ({
  structure,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'explanation' | 'quiz'>('explanation');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);

  if (!isOpen) return null;

  // Generate 5 high-yield USMLE medical quiz questions dynamically tailored to the structure
  const quizQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: `Which of the following describes the primary anatomical innervation or relations of ${structure.englishName} (${structure.latinName})?`,
      options: [
        structure.anatomicalDetails?.innervation || 'Spinal segmental ventral rami',
        'Pudendal nerve (S2-S4)',
        'Greater petrosal nerve',
        'Phrenic nerve (C3-C5)',
      ],
      correctIndex: 0,
      explanation: `${structure.englishName} is innervated by ${
        structure.anatomicalDetails?.innervation || 'its specific regional somatic nerve plexus'
      }.`,
    },
    {
      id: 'q2',
      question: `In clinical pathology, which complication or physical sign is most classically tied to ${structure.englishName}?`,
      options: [
        'Auscultation of a Graham Steell diastolic murmur',
        structure.clinicalRelevance,
        'Positive Chvostek sign of hypocalcemia',
        'Bilateral optic atrophy secondary to ethambutol',
      ],
      correctIndex: 1,
      explanation: `Clinical pearls: ${structure.clinicalRelevance}`,
    },
    {
      id: 'q3',
      question: `What primary physiological or biomechanical action is governed by ${structure.englishName}?`,
      options: [
        structure.anatomicalDetails?.action || 'Visceral homeostasis and containment',
        'Selective calcium resorption in distal convoluted tubules',
        'Ciliary escalator clearance of particulate mucus',
        'Hepatic production of coagulation factors II, VII, IX, and X',
      ],
      correctIndex: 0,
      explanation: `Biomechanical role: ${structure.anatomicalDetails?.action || structure.description}`,
    },
    {
      id: 'q4',
      question: `To which primary anatomical system and embryonic origin is ${structure.englishName} classified?`,
      options: [
        'Neural crest exclusively',
        `Belongs to the ${structure.system.toUpperCase()} system, situated within the ${structure.region} region`,
        'Endodermal pouch IV derivative',
        'Metanephric diverticulum',
      ],
      correctIndex: 1,
      explanation: `${structure.englishName} is situated in the ${structure.region} region as part of the ${structure.system} system.`,
    },
    {
      id: 'q5',
      question: `Which arterial vasculature primarily perfuses ${structure.englishName}?`,
      options: [
        'Anterior spinal artery branches',
        'Internal thoracic (mammary) branch',
        structure.anatomicalDetails?.bloodSupply || 'Regional segmental arterial vessels',
        'Splenic artery pan-branches',
      ],
      correctIndex: 2,
      explanation: `Vascular supply: ${structure.anatomicalDetails?.bloodSupply || 'Regional systemic arterial conduits'}.`,
    },
  ];

  const handleSelectOption = (qIndex: number, optIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
    // Check score
    let score = 0;
    quizQuestions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) score++;
    });
    if (score >= 4) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = quizQuestions.reduce(
    (acc, q, i) => (selectedAnswers[i] === q.correctIndex ? acc + 1 : acc),
    0
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-2xl max-h-[90vh] rounded-3xl p-5 md:p-6 shadow-apple-card border border-white/20 flex flex-col overflow-hidden animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-glow-accent">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
                  AI Medical Tutor
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  Medical Knowledge Engine
                </span>
              </div>
              <p className="text-xs text-slate-300 italic font-serif">
                {structure.englishName} · {structure.latinName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center gap-2 my-3 shrink-0">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'explanation'
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Comprehensive Explanation
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'quiz'
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            5-Question Medical Quiz ({answeredCount}/5)
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
          {activeTab === 'explanation' ? (
            <div className="space-y-4">
              {/* Section 1: Overview & Topography */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block">
                  1. Anatomical Architecture & Topography
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {structure.description} In the human body, it occupies the{' '}
                  <strong className="text-white">{structure.region}</strong> region within the{' '}
                  <strong className="text-white">{structure.system}</strong> system (Side:{' '}
                  {structure.side}).
                </p>
              </div>

              {/* Section 2: Physiological Mechanism */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                  2. Physiological & Biomechanical Function
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {structure.anatomicalDetails?.action ||
                    'Contributes to structural stability, organ protection, or visceral metabolic coordination.'}
                </p>
                {structure.anatomicalDetails?.origin && (
                  <p className="text-slate-300 text-[11px] mt-1 pt-1 border-t border-white/5">
                    <strong>Kinematic Anchor:</strong> Anchors from {structure.anatomicalDetails.origin} to {structure.anatomicalDetails.insertion}.
                  </p>
                )}
              </div>

              {/* Section 3: Clinical Relevance & High-Yield USMLE Pearls */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  3. Clinical Relevance & High-Yield Examination Pearls
                </span>
                <p className="text-amber-100/90 leading-relaxed">
                  {structure.clinicalRelevance}
                </p>
              </div>

              {/* Section 4: Neurovascular Bundles */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block">
                  4. Neurovascular Bundle Summary
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white/5">
                    <span className="text-slate-400 block font-medium">Nerve Supply:</span>
                    <span className="text-slate-200">{structure.anatomicalDetails?.innervation || 'Regional somatic/autonomic fibers'}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5">
                    <span className="text-slate-400 block font-medium">Arterial Supply:</span>
                    <span className="text-slate-200">{structure.anatomicalDetails?.bloodSupply || 'Segmental arterial collateral network'}</span>
                  </div>
                </div>
              </div>

              {/* Optional Custom API Key accordion */}
              <div className="pt-2">
                <button
                  onClick={() => setIsApiKeyOpen(!isApiKeyOpen)}
                  className="text-[11px] text-slate-500 hover:text-slate-400 flex items-center gap-1 font-mono"
                >
                  <Key className="w-3 h-3" />
                  <span>Configure custom LLM API Key (optional)</span>
                  <ChevronRight className={`w-3 h-3 transform transition-transform ${isApiKeyOpen ? 'rotate-90' : ''}`} />
                </button>

                {isApiKeyOpen && (
                  <div className="mt-2 p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <label className="text-[10px] text-slate-400 block">
                      Enter OpenAI or Gemini API Key to enable custom prompt queries:
                    </label>
                    <input
                      type="password"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {quizQuestions.map((q, qIndex) => {
                const userChoice = selectedAnswers[qIndex];
                const isAnswered = userChoice !== undefined;

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {qIndex + 1}
                      </span>
                      <p className="font-semibold text-slate-100 text-xs leading-normal">
                        {q.question}
                      </p>
                    </div>

                    <div className="space-y-1.5 pl-7">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = userChoice === optIndex;
                        const isCorrect = q.correctIndex === optIndex;

                        let btnClasses =
                          'w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between ';

                        if (showResults) {
                          if (isCorrect) {
                            btnClasses += 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 font-semibold';
                          } else if (isSelected && !isCorrect) {
                            btnClasses += 'bg-rose-500/20 text-rose-200 border border-rose-500/40';
                          } else {
                            btnClasses += 'bg-white/5 text-slate-400 border border-white/5 opacity-60';
                          }
                        } else {
                          if (isSelected) {
                            btnClasses += 'bg-sky-500 text-white font-medium shadow-md';
                          } else {
                            btnClasses += 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5';
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            disabled={showResults}
                            onClick={() => handleSelectOption(qIndex, optIndex)}
                            className={btnClasses}
                          >
                            <span>{opt}</span>
                            {showResults && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                            )}
                            {showResults && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="pl-7 pt-2 text-[11px] text-slate-300 border-t border-white/5">
                        <strong className="text-sky-400 font-medium">Rationale: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Quiz Footer / Actions */}
              <div className="pt-2 flex items-center justify-between">
                {showResults ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        Your Score: <strong className="text-sky-400">{score}</strong> / 5
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({Math.round((score / 5) * 100)}%)
                      </span>
                    </div>

                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Try Again
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={answeredCount < 5}
                    onClick={handleFinishQuiz}
                    className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all ${
                      answeredCount === 5
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg'
                        : 'bg-white/5 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answers ({answeredCount}/5 Completed)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
