import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ChevronRight,
  BookOpen,
  Activity,
  Heart,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Eye,
  Info,
} from 'lucide-react';
import { AnatomicalStructure } from '../../types/anatomy';
import { SYSTEM_COLORS, SYSTEM_NAMES } from '../../data/anatomyData';

interface DetailInspectorProps {
  structure: AnatomicalStructure;
  isOpen: boolean;
  onClose: () => void;
  onBackToBody: () => void;
  onAskAI: () => void;
}

export const DetailInspector: React.FC<DetailInspectorProps> = ({
  structure,
  isOpen,
  onClose,
  onBackToBody,
  onAskAI,
}) => {
  const [isSystemOpen, setIsSystemOpen] = useState(false);

  if (!isOpen) return null;

  const systemInfo = SYSTEM_NAMES[structure.system] || {
    en: structure.system,
    la: '',
    description: '',
  };
  const systemColor = SYSTEM_COLORS[structure.system] || '#38bdf8';
  const sideLabel = structure.side === 'right' ? 'Right (Dexter)' : structure.side === 'left' ? 'Left (Sinister)' : 'Midline (Medianus)';

  return (
    <aside className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] md:w-[460px] p-3 md:p-4 pointer-events-none flex flex-col justify-end sm:justify-start">
      <div className="glass-panel w-full h-[88vh] sm:h-full rounded-3xl p-5 md:p-6 pointer-events-auto flex flex-col shadow-apple-card animate-slide-left overflow-hidden border border-white/15">
        {/* Top Header / Navigation */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            {/* Breadcrumb e.g. Muscles > Thorax */}
            <span
              className="font-medium cursor-pointer hover:underline"
              style={{ color: systemColor }}
            >
              {systemInfo.en}
            </span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-300 font-medium">{structure.region}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-1 my-3 space-y-4">
          {/* Main Title & Latin Nomenclature */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: systemColor }}
              />
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                {sideLabel}
              </span>
              {structure.terminologyCode && (
                <span className="text-[10px] font-mono text-slate-500 ml-auto">
                  {structure.terminologyCode}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
              {structure.englishName}
            </h2>
            <p className="text-sm italic font-serif text-sky-400/90 mt-0.5">
              {structure.latinName}
            </p>
          </div>

          {/* Short Description */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-slate-300 text-xs leading-relaxed">
            {structure.description}
          </div>

          {/* Anatomical Details Grid (Origin, Insertion, Innervation, Action) */}
          {structure.anatomicalDetails && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                Anatomical Specifications
              </h3>

              <div className="grid grid-cols-1 gap-2 text-xs">
                {structure.anatomicalDetails.origin && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="font-semibold text-slate-400 text-[11px] block">
                      Origin (Origo)
                    </span>
                    <span className="text-slate-200 mt-0.5 block leading-normal">
                      {structure.anatomicalDetails.origin}
                    </span>
                  </div>
                )}

                {structure.anatomicalDetails.insertion && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="font-semibold text-slate-400 text-[11px] block">
                      Insertion (Insertio)
                    </span>
                    <span className="text-slate-200 mt-0.5 block leading-normal">
                      {structure.anatomicalDetails.insertion}
                    </span>
                  </div>
                )}

                {structure.anatomicalDetails.innervation && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="font-semibold text-sky-400 text-[11px] block">
                      Innervation (Nervus)
                    </span>
                    <span className="text-slate-200 mt-0.5 block leading-normal">
                      {structure.anatomicalDetails.innervation}
                    </span>
                  </div>
                )}

                {structure.anatomicalDetails.bloodSupply && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="font-semibold text-rose-400 text-[11px] block">
                      Vascular Supply (Arteria)
                    </span>
                    <span className="text-slate-200 mt-0.5 block leading-normal">
                      {structure.anatomicalDetails.bloodSupply}
                    </span>
                  </div>
                )}

                {structure.anatomicalDetails.action && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="font-semibold text-emerald-400 text-[11px] block">
                      Action / Biomechanical Function
                    </span>
                    <span className="text-slate-200 mt-0.5 block leading-normal">
                      {structure.anatomicalDetails.action}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* High-yield Clinical Relevance */}
          {structure.clinicalRelevance && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
              <span className="font-bold text-amber-300 uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                Clinical Pearls & Pathology
              </span>
              <p className="text-amber-100/90 leading-relaxed">
                {structure.clinicalRelevance}
              </p>
            </div>
          )}

          {/* "About this system" Section */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <button
              onClick={() => setIsSystemOpen(!isSystemOpen)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: systemColor }}
                />
                <span className="text-xs font-semibold text-white">
                  About this system ({systemInfo.en})
                </span>
              </div>
              {isSystemOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {isSystemOpen && (
              <div className="p-3.5 pt-0 text-xs text-slate-300 space-y-1.5 border-t border-white/5">
                <p className="text-[11px] text-sky-400 font-serif italic">
                  {systemInfo.la}
                </p>
                <p className="leading-relaxed">
                  {systemInfo.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions: "Back to browsing", "Back to whole body", "Ask AI" */}
        <div className="pt-3 border-t border-white/10 flex flex-col gap-2 shrink-0">
          {/* Ask AI Button */}
          <button
            onClick={onAskAI}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-xs shadow-glow-accent transition-all transform active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Medical Assistant</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onClose}
              className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors"
            >
              Back to browsing
            </button>
            <button
              onClick={onBackToBody}
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to whole body
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
