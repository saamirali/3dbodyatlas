import React from 'react';
import { X, Activity, Brain, Wind, Shield, Droplet, ChevronRight } from 'lucide-react';
import { OrganData } from '../../types/anatomy';
import { ORGAN_DATA_MAP } from '../../data/organData';

interface OrganSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrgan: OrganData;
  onSelectOrgan: (organ: OrganData) => void;
}

export const OrganSelectionModal: React.FC<OrganSelectionModalProps> = ({
  isOpen,
  onClose,
  activeOrgan,
  onSelectOrgan,
}) => {
  if (!isOpen) return null;

  const organs = Object.values(ORGAN_DATA_MAP);

  const getIcon = (id: string) => {
    switch (id) {
      case 'heart':
        return <Activity className="w-5 h-5 text-rose-400" />;
      case 'brain':
        return <Brain className="w-5 h-5 text-pink-400" />;
      case 'lungs':
        return <Wind className="w-5 h-5 text-sky-400" />;
      case 'liver':
        return <Shield className="w-5 h-5 text-amber-400" />;
      case 'kidneys':
        return <Droplet className="w-5 h-5 text-yellow-400" />;
      default:
        return <Activity className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-xl rounded-3xl p-5 md:p-6 shadow-apple-card border border-white/20 animate-slide-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Organ Explorer
            </h3>
            <p className="text-xs text-slate-400">
              Select an isolated 3D organ with anatomical landmark hotspots
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Organ Grid */}
        <div className="py-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {organs.map((organ) => {
            const isSelected = activeOrgan.id === organ.id;

            return (
              <button
                key={organ.id}
                onClick={() => {
                  onSelectOrgan(organ);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between border ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400/50 shadow-glow-accent'
                    : 'bg-white/5 hover:bg-white/10 border-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    {getIcon(organ.id)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {organ.englishName}
                      </span>
                      <span className="text-xs font-serif italic text-sky-400">
                        {organ.latinName}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {organ.overview}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {organ.hotspots.length} hotspots
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
