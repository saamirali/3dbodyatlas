import React from 'react';
import {
  Compass,
  RotateCcw,
  User,
  Users,
  Grid,
  Maximize2,
} from 'lucide-react';
import { ViewPreset } from '../../types/anatomy';

interface PillControlBarProps {
  viewPreset: ViewPreset;
  onSelectViewPreset: (preset: ViewPreset) => void;
  gender: 'male' | 'female';
  onToggleGender: () => void;
  disassembleProgress: number; // 0 to 1
  onChangeDisassembleProgress: (value: number) => void;
  onResetCamera: () => void;
}

export const PillControlBar: React.FC<PillControlBarProps> = ({
  viewPreset,
  onSelectViewPreset,
  gender,
  onToggleGender,
  disassembleProgress,
  onChangeDisassembleProgress,
  onResetCamera,
}) => {
  const percent = Math.round(disassembleProgress * 100);

  const presets: { id: ViewPreset; label: string }[] = [
    { id: 'front', label: 'Front' },
    { id: 'back', label: 'Back' },
    { id: 'side', label: 'Side' },
    { id: 'perspective', label: 'Perspective' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl pointer-events-none">
      <div className="glass-pill rounded-full p-2 md:p-2.5 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xl">
        {/* Left: View Buttons (Front, Back, Side, Perspective) */}
        <div className="flex items-center gap-1 w-full sm:w-auto justify-center">
          {presets.map((p) => {
            const isActive = viewPreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectViewPreset(p.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 transform active:scale-95 ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {p.label}
              </button>
            );
          })}

          <div className="w-[1px] h-4 bg-white/15 mx-1 hidden sm:block" />

          {/* Reset / Center Camera */}
          <button
            onClick={onResetCamera}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Assembled to Disassemble Slider ("Spread structures apart") */}
        <div className="flex items-center gap-2.5 w-full sm:w-64 px-2">
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between text-[10px] text-slate-300 mb-1">
              <span className="font-medium flex items-center gap-1">
                <Grid className="w-3 h-3 text-sky-400" />
                Spread structures apart
              </span>
              <span className="font-mono text-sky-400 font-semibold">{percent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={disassembleProgress}
              onChange={(e) => onChangeDisassembleProgress(parseFloat(e.target.value))}
              className="w-full cursor-pointer accent-sky-400"
              title="Assembled to Disassemble slider"
            />
          </div>
        </div>

        {/* Right: Male / Female Toggle */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onToggleGender}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-all transform active:scale-95"
            title="Toggle anatomical archetype"
          >
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span className="capitalize">{gender}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
