import React from 'react';
import { X, CheckSquare, Square, Eye, EyeOff } from 'lucide-react';
import { BodySystem } from '../../types/anatomy';
import { SYSTEM_COLORS, SYSTEM_NAMES } from '../../data/anatomyData';

interface SystemFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibleSystems: Record<BodySystem, boolean>;
  onToggleSystem: (system: BodySystem) => void;
  onSetAllSystems: (visible: boolean) => void;
  counts: Record<BodySystem, number>;
}

export const SystemFilterModal: React.FC<SystemFilterModalProps> = ({
  isOpen,
  onClose,
  visibleSystems,
  onToggleSystem,
  onSetAllSystems,
  counts,
}) => {
  if (!isOpen) return null;

  const systems: BodySystem[] = [
    'skeletal',
    'muscular',
    'visceral',
    'nervous',
    'vascular',
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-md rounded-3xl p-5 md:p-6 shadow-apple-card border border-white/15 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Anatomical Systems
            </h3>
            <p className="text-xs text-slate-400">
              Toggle visibility layers in the 3D model
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* System List */}
        <div className="py-4 space-y-2">
          {systems.map((sys) => {
            const isVisible = visibleSystems[sys];
            const info = SYSTEM_NAMES[sys];
            const color = SYSTEM_COLORS[sys];
            const count = counts[sys] || 0;

            return (
              <div
                key={sys}
                onClick={() => onToggleSystem(sys)}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors group select-none"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <span className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors block">
                      {info.en}
                    </span>
                    <span className="text-[10px] text-slate-400 italic font-serif block">
                      {info.la}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded-full bg-white/5">
                    {count} items
                  </span>
                  <div className={`p-1.5 rounded-lg ${isVisible ? 'text-sky-400 bg-sky-500/10' : 'text-slate-500'}`}>
                    {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Bulk Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <button
            onClick={() => onSetAllSystems(true)}
            className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
          >
            Show All
          </button>
          <button
            onClick={() => onSetAllSystems(false)}
            className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-medium transition-colors"
          >
            Hide All
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold shadow-md transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
