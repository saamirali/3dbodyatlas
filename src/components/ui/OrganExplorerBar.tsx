import React from 'react';
import {
  Activity,
  Brain,
  Wind,
  Shield,
  Droplet,
  CheckCircle2,
} from 'lucide-react';
import { OrganData } from '../../types/anatomy';
import { ORGAN_DATA_MAP } from '../../data/organData';

interface OrganExplorerBarProps {
  activeOrgan: OrganData;
  onSelectOrgan: (organ: OrganData) => void;
}

export const OrganExplorerBar: React.FC<OrganExplorerBarProps> = ({
  activeOrgan,
  onSelectOrgan,
}) => {
  const organs = Object.values(ORGAN_DATA_MAP);

  const getIcon = (id: string) => {
    switch (id) {
      case 'heart':
        return <Activity className="w-3.5 h-3.5" />;
      case 'brain':
        return <Brain className="w-3.5 h-3.5" />;
      case 'lungs':
        return <Wind className="w-3.5 h-3.5" />;
      case 'liver':
        return <Shield className="w-3.5 h-3.5" />;
      case 'kidneys':
        return <Droplet className="w-3.5 h-3.5" />;
      default:
        return <Activity className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-xl pointer-events-none">
      <div className="glass-pill rounded-full p-2 pointer-events-auto flex items-center justify-between gap-1 shadow-2xl overflow-x-auto">
        {organs.map((organ) => {
          const isSelected = activeOrgan.id === organ.id;
          return (
            <button
              key={organ.id}
              onClick={() => onSelectOrgan(organ)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                isSelected
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-sky-400'}>
                {getIcon(organ.id)}
              </span>
              <div className="flex flex-col text-left">
                <span className="font-semibold leading-none">{organ.englishName}</span>
                <span className="text-[10px] opacity-80 italic font-serif leading-none mt-0.5">
                  {organ.latinName}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
