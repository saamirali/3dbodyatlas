import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrganData, OrganHotspot } from '../../types/anatomy';
import { HotspotPin } from './HotspotPin';

interface OrganModelProps {
  organ: OrganData;
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: OrganHotspot) => void;
}

export const OrganModel: React.FC<OrganModelProps> = ({
  organ,
  activeHotspotId,
  onSelectHotspot,
}) => {
  const modelRef = useRef<THREE.Group>(null);
  const heartMeshRef = useRef<THREE.Group>(null);
  const lungsMeshRef = useRef<THREE.Group>(null);

  // Rhythmic animation (heartbeat / lung breathing)
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Heart pulsation: lub-dub physiological double pulse
    if (heartMeshRef.current && organ.id === 'heart') {
      const beatCycle = time * 4.2; // ~70 beats per minute
      const pulse =
        Math.pow(Math.sin(beatCycle), 12) * 0.07 +
        Math.pow(Math.sin(beatCycle - 0.4), 16) * 0.04;
      const s = 1 + pulse;
      heartMeshRef.current.scale.set(s, s * 1.02, s);
    }

    // Lungs breathing gentle expansion
    if (lungsMeshRef.current && organ.id === 'lungs') {
      const breath = 1 + Math.sin(time * 1.6) * 0.045;
      lungsMeshRef.current.scale.set(breath, breath * 1.03, breath);
    }
  });

  return (
    <group ref={modelRef}>
      {/* 3D Model Rendering based on organ id */}
      {organ.id === 'heart' && (
        <group ref={heartMeshRef}>
          {/* Main Ventricular Body */}
          <mesh position={[0, -0.2, 0]} rotation={[0.2, 0.1, -0.2]} castShadow receiveShadow>
            <coneGeometry args={[1.15, 2.0, 32]} />
            <meshStandardMaterial
              color="#b91c1c"
              roughness={0.35}
              metalness={0.15}
            />
          </mesh>

          {/* Left Ventricle Prominence */}
          <mesh position={[-0.4, -0.3, 0.2]} castShadow>
            <sphereGeometry args={[0.85, 24, 24]} />
            <meshStandardMaterial color="#991b1b" roughness={0.4} metalness={0.1} />
          </mesh>

          {/* Right Atrium */}
          <mesh position={[0.7, 0.4, 0.1]} castShadow>
            <sphereGeometry args={[0.65, 20, 20]} />
            <meshStandardMaterial color="#1e40af" roughness={0.45} metalness={0.1} />
          </mesh>

          {/* Ascending Aorta Arch */}
          <mesh position={[0.1, 1.0, 0]} rotation={[0, 0, -0.35]} castShadow>
            <torusGeometry args={[0.65, 0.22, 16, 32, Math.PI * 0.85]} />
            <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.2} />
          </mesh>

          {/* Brachiocephalic branch takeoffs */}
          <group position={[0.1, 1.55, 0]}>
            <mesh position={[-0.2, 0.15, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.4, 12]} />
              <meshStandardMaterial color="#dc2626" />
            </mesh>
            <mesh position={[0.0, 0.2, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.45, 12]} />
              <meshStandardMaterial color="#dc2626" />
            </mesh>
            <mesh position={[0.2, 0.18, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.42, 12]} />
              <meshStandardMaterial color="#dc2626" />
            </mesh>
          </group>

          {/* Pulmonary Trunk */}
          <mesh position={[-0.25, 0.8, 0.35]} rotation={[0.4, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.25, 0.9, 16]} />
            <meshStandardMaterial color="#2563eb" roughness={0.35} metalness={0.15} />
          </mesh>

          {/* Anterior Interventricular Sulcus / LAD artery groove */}
          <mesh position={[-0.1, -0.1, 0.7]} rotation={[0, 0, -0.35]}>
            <cylinderGeometry args={[0.045, 0.025, 1.4, 12]} />
            <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.4} />
          </mesh>
        </group>
      )}

      {organ.id === 'brain' && (
        <group>
          {/* Left Hemisphere */}
          <mesh position={[-0.55, 0.2, 0]} castShadow receiveShadow>
            <sphereGeometry args={[1.05, 32, 28]} />
            <meshStandardMaterial
              color="#f472b6"
              roughness={0.55}
              metalness={0.05}
            />
          </mesh>

          {/* Right Hemisphere */}
          <mesh position={[0.55, 0.2, 0]} castShadow receiveShadow>
            <sphereGeometry args={[1.05, 32, 28]} />
            <meshStandardMaterial
              color="#ec4899"
              roughness={0.55}
              metalness={0.05}
            />
          </mesh>

          {/* Cerebellum */}
          <mesh position={[0, -0.85, -0.75]} castShadow>
            <sphereGeometry args={[0.75, 24, 20]} />
            <meshStandardMaterial color="#a855f7" roughness={0.65} metalness={0.1} />
          </mesh>

          {/* Brainstem / Pons */}
          <mesh position={[0, -0.95, 0.1]} rotation={[0.25, 0, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.22, 1.1, 20]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.5} metalness={0.1} />
          </mesh>
        </group>
      )}

      {organ.id === 'lungs' && (
        <group ref={lungsMeshRef}>
          {/* Central Trachea */}
          <mesh position={[0, 1.4, 0.1]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 1.2, 24]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.2} />
          </mesh>

          {/* Right Lung (3 lobes) */}
          <group position={[0.9, 0, 0]}>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[1.1, 28, 24]} />
              <meshStandardMaterial color="#fb7185" roughness={0.6} metalness={0.05} />
            </mesh>
          </group>

          {/* Left Lung (2 lobes with cardiac notch) */}
          <group position={[-0.9, -0.05, 0]}>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[1.0, 28, 24]} />
              <meshStandardMaterial color="#f43f5e" roughness={0.6} metalness={0.05} />
            </mesh>
            {/* Cardiac notch visual hollow */}
            <mesh position={[0.65, -0.25, 0.35]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial color="#0a0a0c" opacity={0.0} transparent />
            </mesh>
          </group>
        </group>
      )}

      {organ.id === 'liver' && (
        <group>
          {/* Massive Right Lobe */}
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, -0.2]} castShadow receiveShadow>
            <sphereGeometry args={[1.35, 32, 28]} />
            <meshStandardMaterial color="#b45309" roughness={0.45} metalness={0.1} />
          </mesh>

          {/* Tapered Left Lobe */}
          <mesh position={[-0.85, -0.15, 0.1]} rotation={[0, 0, 0.15]} castShadow>
            <coneGeometry args={[0.95, 1.6, 24]} />
            <meshStandardMaterial color="#d97706" roughness={0.45} metalness={0.1} />
          </mesh>

          {/* Gallbladder */}
          <mesh position={[0.35, -0.75, 0.65]} rotation={[0.4, 0, -0.2]} castShadow>
            <sphereGeometry args={[0.32, 16, 16]} />
            <meshStandardMaterial
              color="#15803d"
              roughness={0.25}
              metalness={0.2}
              emissive="#166534"
              emissiveIntensity={0.2}
            />
          </mesh>

          {/* Falciform Ligament Line */}
          <mesh position={[-0.05, 0.45, 0.8]}>
            <boxGeometry args={[0.06, 1.2, 0.2]} />
            <meshStandardMaterial color="#fef08a" opacity={0.7} transparent />
          </mesh>
        </group>
      )}

      {organ.id === 'kidneys' && (
        <group>
          {/* Right Kidney */}
          <group position={[1.05, 0.1, 0]}>
            <mesh rotation={[0.15, 0, -0.2]} castShadow receiveShadow>
              <sphereGeometry args={[0.75, 24, 24]} />
              <meshStandardMaterial color="#991b1b" roughness={0.4} metalness={0.15} />
            </mesh>
            {/* Ureter */}
            <mesh position={[-0.35, -0.85, 0.05]} rotation={[0, 0, -0.15]}>
              <cylinderGeometry args={[0.06, 0.05, 1.2, 12]} />
              <meshStandardMaterial color="#facc15" roughness={0.3} metalness={0.1} />
            </mesh>
          </group>

          {/* Left Kidney (positioned slightly higher than right kidney) */}
          <group position={[-1.05, 0.4, 0]}>
            <mesh rotation={[-0.15, 0, 0.2]} castShadow receiveShadow>
              <sphereGeometry args={[0.78, 24, 24]} />
              <meshStandardMaterial color="#b91c1c" roughness={0.4} metalness={0.15} />
            </mesh>
            {/* Ureter */}
            <mesh position={[0.35, -0.95, 0.05]} rotation={[0, 0, 0.15]}>
              <cylinderGeometry args={[0.06, 0.05, 1.4, 12]} />
              <meshStandardMaterial color="#facc15" roughness={0.3} metalness={0.1} />
            </mesh>
          </group>
        </group>
      )}

      {/* Interactive Landmark Hotspot Pins */}
      {organ.hotspots.map((hotspot) => (
        <HotspotPin
          key={hotspot.id}
          hotspot={hotspot}
          isActive={activeHotspotId === hotspot.id}
          onClick={() => onSelectHotspot(hotspot)}
        />
      ))}
    </group>
  );
};
