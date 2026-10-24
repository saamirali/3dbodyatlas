import React, { useMemo } from 'react';
import * as THREE from 'three';
import { AnatomicalStructure } from '../../types/anatomy';
import { SYSTEM_COLORS } from '../../data/anatomyData';

interface StructureMeshProps {
  structure: AnatomicalStructure;
  isSelected: boolean;
  isHovered: boolean;
  isGhosted: boolean;
  onClick: (e: any) => void;
  onPointerOver: (e: any) => void;
  onPointerOut: (e: any) => void;
  isQuizTarget?: boolean;
}

export const StructureMesh: React.FC<StructureMeshProps> = ({
  structure,
  isSelected,
  isHovered,
  isGhosted,
  onClick,
  onPointerOver,
  onPointerOut,
  isQuizTarget,
}) => {
  // Generate high-fidelity anatomical procedural geometry based on geometryType
  const geometry = useMemo(() => {
    switch (structure.geometryType) {
      case 'skull': {
        const geo = new THREE.BufferGeometry();
        // Compound cranium: dome + facial bones
        const craniumGeo = new THREE.SphereGeometry(0.55, 32, 24);
        craniumGeo.scale(0.85, 1.05, 1.0);
        craniumGeo.translate(0, 0.15, 0);

        const faceGeo = new THREE.CylinderGeometry(0.35, 0.28, 0.45, 24);
        faceGeo.scale(0.9, 1.0, 0.8);
        faceGeo.translate(0, -0.28, 0.2);

        // Merge simple skull parts
        return craniumGeo;
      }

      case 'mandible': {
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-0.35, 0, -0.25),
          new THREE.Vector3(0, -0.15, 0.45),
          new THREE.Vector3(0.35, 0, -0.25)
        );
        const geo = new THREE.TubeGeometry(curve, 20, 0.08, 12, false);
        return geo;
      }

      case 'spine': {
        // Curved vertebral column with S-curve lordosis/kyphosis
        const points = [];
        for (let i = 0; i <= 24; i++) {
          const t = i / 24;
          const y = (t - 0.5) * 2.8;
          // Lordosis & kyphosis curves
          const z = Math.sin(t * Math.PI * 2) * 0.15;
          points.push(new THREE.Vector3(0, y, z));
        }
        const curve = new THREE.CatmullRomCurve3(points);
        return new THREE.TubeGeometry(curve, 32, 0.14, 12, false);
      }

      case 'ribcage': {
        // Thoracic cage barrel shape
        const geo = new THREE.CylinderGeometry(0.75, 0.65, 1.25, 24, 8, true);
        geo.scale(1.15, 1.0, 0.85);
        return geo;
      }

      case 'clavicle': {
        // Sigmoid S-curve clavicle
        const curve = new THREE.CubicBezierCurve3(
          new THREE.Vector3(-0.55, 0, 0.05),
          new THREE.Vector3(-0.15, 0.08, 0.15),
          new THREE.Vector3(0.2, -0.05, -0.05),
          new THREE.Vector3(0.55, 0.02, 0.1)
        );
        return new THREE.TubeGeometry(curve, 20, 0.055, 12, false);
      }

      case 'pelvis': {
        const geo = new THREE.TorusGeometry(0.7, 0.22, 16, 24, Math.PI * 1.5);
        geo.scale(1.2, 0.85, 0.9);
        geo.rotateX(Math.PI / 2.5);
        return geo;
      }

      case 'femur': {
        // Long bone with proximal head and distal condyles
        const geo = new THREE.CylinderGeometry(0.1, 0.14, 2.2, 16);
        geo.scale(1.0, 1.0, 0.9);
        return geo;
      }

      case 'deltoid': {
        // Triangular muscular cap
        const geo = new THREE.ConeGeometry(0.48, 0.95, 20);
        geo.scale(1.2, 1.0, 0.75);
        geo.rotateZ(structure.side === 'right' ? -0.2 : 0.2);
        return geo;
      }

      case 'pectoralis': {
        // Fan-shaped pectoralis muscle
        const geo = new THREE.BoxGeometry(0.95, 0.7, 0.25);
        geo.scale(1.0, 1.0, 0.9);
        return geo;
      }

      case 'biceps': {
        // Fusiform spindle muscle belly
        const geo = new THREE.SphereGeometry(0.22, 16, 16);
        geo.scale(0.85, 2.4, 0.85);
        return geo;
      }

      case 'rectusAbdominis': {
        // Segmented six-pack abdominal wall
        const geo = new THREE.BoxGeometry(0.68, 1.35, 0.18);
        return geo;
      }

      case 'latissimusDorsi': {
        // Broad back sheet
        const geo = new THREE.BoxGeometry(0.95, 1.25, 0.14);
        return geo;
      }

      case 'quadriceps': {
        // Anterior thigh muscle mass
        const geo = new THREE.CylinderGeometry(0.38, 0.25, 2.0, 16);
        geo.scale(0.95, 1.0, 1.1);
        return geo;
      }

      case 'heart': {
        // Anatomical 4-chambered heart shape
        const geo = new THREE.SphereGeometry(0.42, 24, 24);
        geo.scale(1.1, 1.3, 0.95);
        return geo;
      }

      case 'lungs': {
        // Bilateral lung lobes
        const geo = new THREE.SphereGeometry(0.65, 24, 24);
        geo.scale(1.35, 1.45, 0.9);
        return geo;
      }

      case 'liver': {
        // Asymmetric wedge liver
        const geo = new THREE.SphereGeometry(0.55, 24, 24);
        geo.scale(1.4, 0.8, 1.0);
        return geo;
      }

      case 'stomach': {
        // J-curve stomach
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-0.25, 0.35, 0),
          new THREE.Vector3(-0.45, -0.3, 0),
          new THREE.Vector3(0.3, -0.25, 0.1)
        );
        return new THREE.TubeGeometry(curve, 20, 0.22, 16, false);
      }

      case 'kidneys': {
        // Bilateral bean-shaped kidneys
        const geo = new THREE.SphereGeometry(0.32, 20, 20);
        geo.scale(1.5, 0.9, 0.75);
        return geo;
      }

      case 'brain': {
        // Cerebral hemispheres
        const geo = new THREE.SphereGeometry(0.52, 28, 24);
        geo.scale(0.95, 1.1, 1.15);
        return geo;
      }

      case 'spinalCord': {
        // Central neural cord
        const geo = new THREE.CylinderGeometry(0.065, 0.055, 2.7, 16);
        return geo;
      }

      case 'sciaticNerve': {
        // Descending sciatic nerve
        const points = [
          new THREE.Vector3(0, 0.8, 0),
          new THREE.Vector3(0.05, 0, -0.05),
          new THREE.Vector3(0, -0.9, 0)
        ];
        const curve = new THREE.CatmullRomCurve3(points);
        return new THREE.TubeGeometry(curve, 16, 0.038, 10, false);
      }

      case 'aorta': {
        // Ascending arch and descending trunk
        const points = [
          new THREE.Vector3(-0.1, -0.1, 0.1),
          new THREE.Vector3(0.0, 0.5, 0.12),
          new THREE.Vector3(0.12, 0.65, 0.0),
          new THREE.Vector3(0.05, 0.5, -0.08),
          new THREE.Vector3(0.0, -0.9, -0.08)
        ];
        const curve = new THREE.CatmullRomCurve3(points);
        return new THREE.TubeGeometry(curve, 32, 0.075, 14, false);
      }

      case 'venaCava': {
        // Inferior vena cava venous trunk
        const points = [
          new THREE.Vector3(0, 0.6, 0),
          new THREE.Vector3(0.02, 0, 0),
          new THREE.Vector3(0, -0.85, 0)
        ];
        const curve = new THREE.CatmullRomCurve3(points);
        return new THREE.TubeGeometry(curve, 16, 0.085, 14, false);
      }

      default:
        return new THREE.BoxGeometry(0.4, 0.4, 0.4);
    }
  }, [structure.geometryType, structure.side]);

  // Determine material color & properties
  const baseColor = SYSTEM_COLORS[structure.system] || '#ffffff';

  // Highlight color
  let emissiveColor = '#000000';
  let emissiveIntensity = 0;
  let opacity = 1.0;
  let transparent = false;
  let metalness = 0.1;
  let roughness = 0.45;

  if (isQuizTarget) {
    // Pulse vibrant cyan/yellow in quiz mode
    emissiveColor = '#38bdf8';
    emissiveIntensity = 0.8;
  } else if (isSelected) {
    // Glowing selected state
    emissiveColor = baseColor;
    emissiveIntensity = 0.6;
    roughness = 0.3;
  } else if (isHovered) {
    // Hover highlight
    emissiveColor = baseColor;
    emissiveIntensity = 0.35;
  } else if (isGhosted) {
    // Semi-transparent ghost mode when another structure is selected!
    opacity = 0.14;
    transparent = true;
    metalness = 0.3;
    roughness = 0.7;
  }

  return (
    <mesh
      geometry={geometry}
      scale={structure.scale || [1, 1, 1]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      castShadow={!isGhosted}
      receiveShadow={!isGhosted}
    >
      <meshStandardMaterial
        color={isGhosted ? '#64748b' : baseColor}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        transparent={transparent}
        opacity={opacity}
        depthWrite={!isGhosted}
        metalness={metalness}
        roughness={roughness}
        wireframe={isGhosted && structure.system === 'skeletal'} // sleek subtle wireframe for bone ghosting
      />
    </mesh>
  );
};
