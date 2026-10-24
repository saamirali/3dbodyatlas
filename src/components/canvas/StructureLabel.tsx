import React from 'react';
import { Html } from '@react-three/drei';
import { Info, ArrowRight } from 'lucide-react';
import { AnatomicalStructure } from '../../types/anatomy';

interface StructureLabelProps {
  structure: AnatomicalStructure;
  onOpenDetails: () => void;
}

export const StructureLabel: React.FC<StructureLabelProps> = ({ structure, onOpenDetails }) => {
  // Format side badge: "R", "L", or "Midline"
  const sideBadge = structure.side === 'right' ? 'R' : structure.side === 'left' ? 'L' : 'Midline';

  return (
    <Html
      position={[0, 0.45, 0]}
      center
      distanceFactor={9}
      zIndexRange={[100, 0]}
      style={{
        pointerEvents: 'auto',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetails();
        }}
        className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#121218]/90 hover:bg-[#1a1a24] backdrop-blur-xl border border-white/20 text-white shadow-2xl cursor-pointer select-none transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        {/* Info Icon */}
        <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
          <Info className="w-3 h-3" />
        </div>

        {/* Text Container */}
        <div className="flex flex-col text-left whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xs tracking-tight text-slate-100">
              {structure.englishName}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium">
              {sideBadge}
            </span>
          </div>
          <span className="italic text-[10px] text-sky-300/80 font-serif tracking-wide">
            {structure.latinName}
          </span>
        </div>

        {/* Action arrow */}
        <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-all">
          <ArrowRight className="w-2.5 h-2.5" />
        </div>
      </div>
    </Html>
  );
};
