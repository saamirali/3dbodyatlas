import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  AnatomicalStructure,
  BodySystem,
  CameraState,
  OrganData,
  OrganHotspot,
  ViewPreset,
} from '../../types/anatomy';
import { FullBodyModel } from './FullBodyModel';
import { OrganModel } from './OrganModel';

interface SceneProps {
  mode: 'body' | 'organ';
  structures: AnatomicalStructure[];
  selectedStructure: AnatomicalStructure | null;
  onSelectStructure: (structure: AnatomicalStructure) => void;
  disassembleProgress: number;
  gender: 'male' | 'female';
  visibleSystems: Record<BodySystem, boolean>;
  activeOrgan: OrganData | null;
  activeHotspot: OrganHotspot | null;
  onSelectHotspot: (hotspot: OrganHotspot) => void;
  viewPreset: ViewPreset;
  onOpenDetails: () => void;
  quizTargetId?: string | null;
}

// Preset camera positions
const VIEW_PRESETS: Record<ViewPreset, CameraState> = {
  front: { position: [0, 1.2, 7.8], target: [0, 1.0, 0] },
  back: { position: [0, 1.2, -7.8], target: [0, 1.0, 0] },
  side: { position: [7.8, 1.2, 0], target: [0, 1.0, 0] },
  perspective: { position: [4.8, 2.8, 6.2], target: [0, 0.8, 0] },
};

// Smooth Camera Controller with frame-based damping
const CameraController: React.FC<{
  mode: 'body' | 'organ';
  viewPreset: ViewPreset;
  activeOrgan: OrganData | null;
  selectedStructure: AnatomicalStructure | null;
  disassembleProgress: number;
  controlsRef: React.RefObject<OrbitControlsImpl>;
}> = ({
  mode,
  viewPreset,
  activeOrgan,
  selectedStructure,
  disassembleProgress,
  controlsRef,
}) => {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(4.8, 2.8, 6.2));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.8, 0));

  // Update target coordinates when preset, mode, or organ changes
  useEffect(() => {
    if (mode === 'organ' && activeOrgan) {
      targetCamPos.current.set(...activeOrgan.cameraPosition);
      targetLookAt.current.set(...activeOrgan.cameraTarget);
    } else if (mode === 'body') {
      if (disassembleProgress > 0.4) {
        // Disassembled grid: widen view to frame all columns (-6 to +6)
        targetCamPos.current.set(0, 2.0, 13.5);
        targetLookAt.current.set(0, 0.5, 0);
      } else {
        const preset = VIEW_PRESETS[viewPreset] || VIEW_PRESETS.perspective;
        targetCamPos.current.set(...preset.position);
        targetLookAt.current.set(...preset.target);
      }
    }
  }, [mode, viewPreset, activeOrgan, disassembleProgress]);

  // Smoothly glide camera and controls target every frame
  useFrame((_, delta) => {
    // Damp position
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.current.x, 4.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.current.y, 4.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.current.z, 4.5, delta);

    if (controlsRef.current) {
      controlsRef.current.target.x = THREE.MathUtils.damp(controlsRef.current.target.x, targetLookAt.current.x, 4.5, delta);
      controlsRef.current.target.y = THREE.MathUtils.damp(controlsRef.current.target.y, targetLookAt.current.y, 4.5, delta);
      controlsRef.current.target.z = THREE.MathUtils.damp(controlsRef.current.target.z, targetLookAt.current.z, 4.5, delta);
      controlsRef.current.update();
    }
  });

  return null;
};

export const Scene: React.FC<SceneProps> = ({
  mode,
  structures,
  selectedStructure,
  onSelectStructure,
  disassembleProgress,
  gender,
  visibleSystems,
  activeOrgan,
  activeHotspot,
  onSelectHotspot,
  viewPreset,
  onOpenDetails,
  quizTargetId,
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing touch-none select-none">
      <Canvas
        camera={{ position: [4.8, 2.8, 6.2], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        {/* Apple-style Studio Lighting */}
        <color attach="background" args={['#0a0a0c']} />
        <ambientLight intensity={0.65} />
        
        {/* Key Light */}
        <directionalLight
          position={[6, 8, 8]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Fill Rim Light */}
        <directionalLight position={[-6, 4, -6]} intensity={0.5} color="#93c5fd" />
        <directionalLight position={[0, -6, 2]} intensity={0.25} color="#ffffff" />

        {/* Camera Smooth Controller */}
        <CameraController
          mode={mode}
          viewPreset={viewPreset}
          activeOrgan={activeOrgan}
          selectedStructure={selectedStructure}
          disassembleProgress={disassembleProgress}
          controlsRef={controlsRef}
        />

        {/* Touch & Desktop Controls: 1 finger rotate, 2 finger pan, pinch zoom */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
          panSpeed={0.8}
          rotateSpeed={0.7}
          zoomSpeed={0.9}
          minDistance={1.8}
          maxDistance={22}
          screenSpacePanning={true}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN,
          }}
        />

        {/* Content based on Mode */}
        {mode === 'body' ? (
          <FullBodyModel
            structures={structures}
            selectedStructure={selectedStructure}
            onSelectStructure={onSelectStructure}
            disassembleProgress={disassembleProgress}
            gender={gender}
            visibleSystems={visibleSystems}
            onOpenDetails={onOpenDetails}
            quizTargetId={quizTargetId}
          />
        ) : (
          activeOrgan && (
            <OrganModel
              organ={activeOrgan}
              activeHotspotId={activeHotspot?.id || null}
              onSelectHotspot={onSelectHotspot}
            />
          )
        )}

        {/* Subtle Ambient Ground Shadow */}
        <ContactShadows
          position={[0, -4.8, 0]}
          opacity={0.35}
          scale={16}
          blur={2.4}
          far={6}
        />
      </Canvas>
    </div>
  );
};
