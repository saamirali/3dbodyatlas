import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Layers } from 'lucide-react';
import { AnatomicalStructure } from '../../types/anatomy';
import { SYSTEM_COLORS } from '../../data/anatomyData';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  structures: AnatomicalStructure[];
  onSelectStructure: (structure: AnatomicalStructure) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  onClose,
  structures,
  onSelectStructure,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();
  const results = normalizedQuery
    ? structures.filter(
        (s) =>
          s.englishName.toLowerCase().includes(normalizedQuery) ||
          s.latinName.toLowerCase().includes(normalizedQuery) ||
          s.region.toLowerCase().includes(normalizedQuery) ||
          s.system.toLowerCase().includes(normalizedQuery)
      )
    : structures.slice(0, 8); // show popular recent structures initially

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center p-4 pt-20"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-lg rounded-3xl p-4 shadow-apple-card border border-white/15 overflow-hidden animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative flex items-center mb-3">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by English or Latin name (e.g. Deltoid, Cor, Femur)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No anatomical structures found matching "{query}"
            </div>
          ) : (
            results.map((structure) => {
              const color = SYSTEM_COLORS[structure.system] || '#38bdf8';
              return (
                <button
                  key={structure.id}
                  onClick={() => {
                    onSelectStructure(structure);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors">
                        {structure.englishName}
                      </div>
                      <div className="text-[11px] font-serif italic text-slate-400">
                        {structure.latinName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 font-mono">
                      {structure.region}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
          <span>{results.length} structures available</span>
          <span className="font-mono">ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
