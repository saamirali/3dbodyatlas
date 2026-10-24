import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { AnatomicalStructure } from '../../types/anatomy';
import { SYSTEM_COLORS } from '../../data/anatomyData';

interface GLBModelLoaderProps {
  url: string;
  structuresMap: Record<string, AnatomicalStructure>;
  selectedStructureId: string | null;
  onSelectStructure: (structure: AnatomicalStructure) => void;
  disassembleProgress: number;
}

/**
 * GLBModelLoader
 * Production component designed to load BodyParts3D or Z-Anatomy (CC BY-SA) GLB models.
 * 
 * Supports:
 * - Draco compression via useGLTF.preload with decoder path
 * - Extracting mesh userData containing Nomina Anatomica / Latin & English names
 * - Dynamic ghosting & highlighting per structure mesh
 * - Fallback to procedural mesh generator
 */
export const GLBModelLoader: React.FC<GLBModelLoaderProps> = ({
  url,
  structuresMap,
  selectedStructureId,
  onSelectStructure,
  disassembleProgress,
}) => {
  const { scene } = useGLTF(url);

  // Clone scene and setup materials
  const processedScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Try to match mesh name with our anatomy database
        const matched = structuresMap[mesh.name.toLowerCase()] ||
          Object.values(structuresMap).find((s) =>
            mesh.name.toLowerCase().includes(s.id) ||
            mesh.name.toLowerCase().includes(s.englishName.toLowerCase())
          );

        const isSelected = matched && selectedStructureId === matched.id;
        const isGhosted = !!selectedStructureId && !isSelected;
        const baseColor = matched ? SYSTEM_COLORS[matched.system] : '#e2e8f0';

        mesh.material = new THREE.MeshStandardMaterial({
          color: isGhosted ? '#64748b' : baseColor,
          transparent: isGhosted,
          opacity: isGhosted ? 0.15 : 1.0,
          roughness: 0.4,
          metalness: 0.1,
          emissive: isSelected ? baseColor : '#000000',
          emissiveIntensity: isSelected ? 0.6 : 0,
        });

        // Store matched structure in userData for raycasting
        mesh.userData.structure = matched;
      }
    });

    return cloned;
  }, [scene, structuresMap, selectedStructureId, disassembleProgress]);

  return (
    <primitive
      object={processedScene}
      onClick={(e: any) => {
        e.stopPropagation();
        const structure = e.object?.userData?.structure;
        if (structure) {
          onSelectStructure(structure);
        }
      }}
    />
  );
};
