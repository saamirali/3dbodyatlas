import React from 'react';
import {
  Search,
  Filter,
  GraduationCap,
  Layers,
  Sparkles,
  ArrowLeft,
  Activity,
} from 'lucide-react';
import { OrganData } from '../../types/anatomy';

interface HeaderProps {
  mode: 'body' | 'organ';
  visibleCount: number;
  totalCount: number;
  activeOrgan: OrganData | null;
  onBackToBody: () => void;
  onOpenSearch: () => void;
  onOpenFilter: () => void;
  onToggleQuiz: () => void;
  isQuizActive: boolean;
  onSwitchMode: (mode: 'body' | 'organ') => void;
  onOpenOrgansModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  visibleCount,
  totalCount,
  activeOrgan,
  onBackToBody,
  onOpenSearch,
  onOpenFilter,
  onToggleQuiz,
  isQuizActive,
  onSwitchMode,
  onOpenOrgansModal,
}) => {
  // Format current date e.g. "OCTOBER 24, 2026"
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date()).toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-3 md:p-4 pointer-events-none flex items-center justify-between">
      {/* Left side: Brand + Date + Dynamic Counter */}
      <div className="flex flex-col gap-1 pointer-events-auto">
        <div className="flex items-center gap-2">
          {mode === 'organ' ? (
            <button
              onClick={onBackToBody}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill hover:bg-white/10 text-sky-400 hover:text-white transition-all transform active:scale-95 text-xs font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Body</span>
            </button>
          ) : (
            <span className="text-[10px] tracking-widest text-slate-400 font-mono font-medium">
              {formattedDate}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2.5">
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-white drop-shadow-md">
            Human Body Atlas
          </h1>
          <span className="text-xs text-sky-400/90 font-medium hidden sm:inline">
            Biology · Simulation
          </span>
        </div>

        {/* Visible structures: N counter in top-left */}
        {mode === 'body' && (
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-300">
                Visible structures: <strong className="text-white font-semibold">{visibleCount}</strong>
                <span className="text-slate-500 text-[10px]">/{totalCount}</span>
              </span>
            </div>
          </div>
        )}

        {/* Active Organ Badge in Organ Mode */}
        {mode === 'organ' && activeOrgan && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-medium font-serif italic">
              {activeOrgan.englishName} ({activeOrgan.latinName})
            </span>
          </div>
        )}
      </div>

      {/* Right side: Action controls */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Organ Explorer Toggle */}
        <button
          onClick={() => {
            if (mode === 'body') {
              onSwitchMode('organ');
            } else {
              onOpenOrgansModal();
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all transform active:scale-95 ${
            mode === 'organ'
              ? 'bg-sky-500 text-white shadow-glow-accent'
              : 'glass-pill hover:bg-white/10 text-slate-200'
          }`}
          title="Isolated Organ Explorer"
        >
          <Activity className="w-3.5 h-3.5" />
          <span className="hidden md:inline">
            {mode === 'organ' ? 'Change Organ' : 'Organs'}
          </span>
        </button>

        {/* System Filter Toggle (Body Mode) */}
        {mode === 'body' && (
          <button
            onClick={onOpenFilter}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill hover:bg-white/10 text-slate-200 transition-all transform active:scale-95 text-xs font-medium"
            title="Filter anatomical systems"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Systems</span>
          </button>
        )}

        {/* Search Button (Cmd+K) */}
        {mode === 'body' && (
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill hover:bg-white/10 text-slate-200 transition-all transform active:scale-95 text-xs font-medium"
            title="Search structures (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden lg:inline text-[9px] px-1 rounded bg-white/10 text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>
        )}

        {/* Quiz Mode Toggle */}
        <button
          onClick={onToggleQuiz}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all transform active:scale-95 ${
            isQuizActive
              ? 'bg-emerald-500 text-white shadow-lg'
              : 'glass-pill hover:bg-white/10 text-slate-200'
          }`}
          title="Test your anatomy knowledge"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quiz</span>
        </button>
      </div>
    </header>
  );
};
