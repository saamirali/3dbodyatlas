import React from 'react';
import { Html } from '@react-three/drei';
import { OrganHotspot } from '../../types/anatomy';

interface HotspotPinProps {
  hotspot: OrganHotspot;
  isActive: boolean;
  onClick: () => void;
}

export const HotspotPin: React.FC<HotspotPinProps> = ({ hotspot, isActive, onClick }) => {
  const pinColor = hotspot.color || '#38bdf8';

  return (
    <group position={hotspot.position}>
      {/* 3D Glowing Sphere Anchor */}
      <mesh onClick={(e) => { e.stopPropagation(); onClick(); }}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial
          color={pinColor}
          emissive={pinColor}
          emissiveIntensity={isActive ? 1.0 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* HTML Marker with callout line when active */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={6}
        style={{
          pointerEvents: 'auto',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="relative flex items-center justify-center select-none">
          {/* Pulsing Target Ring */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="group relative flex items-center justify-center w-7 h-7 rounded-full focus:outline-none"
            title={`${hotspot.name} (${hotspot.latinName})`}
          >
            {/* Outer expanding ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none"
              style={{ backgroundColor: pinColor }}
            />
            {/* Solid core pill */}
            <span
              className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-lg transition-transform duration-200 ${
                isActive ? 'scale-125' : 'group-hover:scale-110'
              }`}
              style={{ backgroundColor: pinColor }}
            />
          </button>

          {/* Interactive Callout Card (shown when tapped) */}
          {isActive && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72 p-3.5 rounded-2xl bg-[#121218]/95 backdrop-blur-2xl border border-white/20 text-white shadow-2xl z-50 pointer-events-auto animate-slide-left">
              {/* Pointer beak arrow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#121218]/95 border-r border-b border-white/20 transform rotate-45" />

              <div className="relative z-10 flex flex-col gap-1.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs tracking-tight text-white flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: pinColor }}
                    />
                    {hotspot.name}
                  </span>
                  <span className="text-[10px] text-sky-400 font-mono italic">
                    {hotspot.latinName}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-snug">
                  {hotspot.description}
                </p>

                {hotspot.clinicalPearl && (
                  <div className="mt-1.5 pt-1.5 border-t border-white/10 flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                      Clinical Landmark
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight">
                      {hotspot.clinicalPearl}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};
