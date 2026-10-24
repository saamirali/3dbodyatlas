import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AnatomicalStructure, BodySystem } from '../../types/anatomy';
import { StructureMesh } from './StructureMesh';
import { StructureLabel } from './StructureLabel';

interface FullBodyModelProps {
  structures: AnatomicalStructure[];
  selectedStructure: AnatomicalStructure | null;
  onSelectStructure: (structure: AnatomicalStructure) => void;
  disassembleProgress: number; // 0 (assembled) to 1 (fully disassembled grid)
  gender: 'male' | 'female';
  visibleSystems: Record<BodySystem, boolean>;
  onOpenDetails: () => void;
  quizTargetId?: string | null;
}

// Single animated structure wrapper
const AnimatedStructureItem: React.FC<{
  structure: AnatomicalStructure;
  isSelected: boolean;
  isHovered: boolean;
  isGhosted: boolean;
  disassembleProgress: number;
  gender: 'male' | 'female';
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
  onOpenDetails: () => void;
  isQuizTarget?: boolean;
}> = ({
  structure,
  isSelected,
  isHovered,
  isGhosted,
  disassembleProgress,
  gender,
  onSelect,
  onHover,
  onOpenDetails,
  isQuizTarget,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Eased cubic interpolation
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Cubic bezier easeInOut
    const t = disassembleProgress;
    const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Compute anatomical position with subtle gender adjustments
    let [ax, ay, az] = structure.position;
    if (gender === 'female') {
      if (structure.id === 'pelvis') {
        ax *= 1.08;
      } else if (structure.system === 'muscular' && (structure.id.includes('deltoid') || structure.id.includes('pectoralis'))) {
        ax *= 0.94;
      }
    }

    const [gx, gy, gz] = structure.disassembledPosition;

    // Target position based on eased slider
    const targetX = THREE.MathUtils.lerp(ax, gx, easedT);
    const targetY = THREE.MathUtils.lerp(ay, gy, easedT);
    const targetZ = THREE.MathUtils.lerp(az, gz, easedT);

    // Smoothly damp towards target position
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 10, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 10, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 10, delta);

    // Smoothly damp rotation (turn forward in grid)
    const [rx, ry, rz] = structure.rotation || [0, 0, 0];
    const targetRy = THREE.MathUtils.lerp(ry, 0, easedT);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRy, 8, delta);
  });

  return (
    <group
      ref={groupRef}
      position={structure.position}
      rotation={structure.rotation || [0, 0, 0]}
    >
      <StructureMesh
        structure={structure}
        isSelected={isSelected}
        isHovered={isHovered}
        isGhosted={isGhosted}
        isQuizTarget={isQuizTarget}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={() => {
          onHover(false);
        }}
      />

      {/* Floating 3D label on selected structure */}
      {isSelected && (
        <StructureLabel
          structure={structure}
          onOpenDetails={onOpenDetails}
        />
      )}
    </group>
  );
};

export const FullBodyModel: React.FC<FullBodyModelProps> = ({
  structures,
  selectedStructure,
  onSelectStructure,
  disassembleProgress,
  gender,
  visibleSystems,
  onOpenDetails,
  quizTargetId,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Filter structures based on visible system toggles
  const activeStructures = structures.filter(
    (s) => visibleSystems[s.system] && (s.sex === undefined || s.sex === 'both' || s.sex === gender)
  );

  const hasSelection = !!selectedStructure;

  return (
    <group>
      {/* Disassembled System Column Headers (visible when spread slider > 20%) */}
      {disassembleProgress > 0.25 && (
        <group position={[0, 5.8, 0]}>
          {[
            { label: 'SKELETAL', x: -6, color: '#e2e8f0', count: activeStructures.filter(s => s.system === 'skeletal').length },
            { label: 'MUSCULAR', x: -3, color: '#f43f5e', count: activeStructures.filter(s => s.system === 'muscular').length },
            { label: 'ORGANS', x: 0, color: '#f59e0b', count: activeStructures.filter(s => s.system === 'visceral').length },
            { label: 'NERVES', x: 3, color: '#38bdf8', count: activeStructures.filter(s => s.system === 'nervous').length },
            { label: 'VESSELS', x: 6, color: '#ef4444', count: activeStructures.filter(s => s.system === 'vascular').length },
          ].map((col) => (
            <Html
              key={col.label}
              position={[col.x, 0, 0]}
              center
              distanceFactor={11}
              style={{
                opacity: Math.min(1, (disassembleProgress - 0.25) * 2),
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none',
              }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase border backdrop-blur-md shadow-lg"
                  style={{
                    color: col.color,
                    borderColor: `${col.color}40`,
                    backgroundColor: 'rgba(15, 15, 20, 0.75)',
                  }}
                >
                  {col.label}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">
                  {col.count} structures
                </span>
              </div>
            </Html>
          ))}
        </group>
      )}

      {/* Render all active structures */}
      {activeStructures.map((structure) => {
        const isSelected = selectedStructure?.id === structure.id;
        const isHovered = hoveredId === structure.id;
        // When any structure is selected, all others become ghosted semi-transparent!
        const isGhosted = hasSelection && !isSelected;
        const isQuizTarget = quizTargetId === structure.id;

        return (
          <AnimatedStructureItem
            key={structure.id}
            structure={structure}
            isSelected={isSelected}
            isHovered={isHovered}
            isGhosted={isGhosted}
            disassembleProgress={disassembleProgress}
            gender={gender}
            onSelect={() => onSelectStructure(structure)}
            onHover={(hovered) => setHoveredId(hovered ? structure.id : null)}
            onOpenDetails={onOpenDetails}
            isQuizTarget={isQuizTarget}
          />
        );
      })}
    </group>
  );
};
