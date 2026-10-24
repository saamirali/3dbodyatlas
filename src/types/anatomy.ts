export type BodySystem = 'skeletal' | 'muscular' | 'visceral' | 'nervous' | 'vascular';

export type AnatomicalSide = 'left' | 'right' | 'midline';

export interface AnatomicalStructure {
  id: string;
  latinName: string;
  englishName: string;
  system: BodySystem;
  region: string;
  side: AnatomicalSide;
  description: string;
  terminologyCode?: string;
  anatomicalDetails?: {
    origin?: string;
    insertion?: string;
    innervation?: string;
    bloodSupply?: string;
    action?: string;
    systemOverview?: string;
  };
  clinicalRelevance: string;
  position: [number, number, number]; // Anatomical assembled coordinates [x, y, z]
  disassembledPosition: [number, number, number]; // Grid disassembled coordinates [x, y, z]
  rotation?: [number, number, number];
  scale?: [number, number, number];
  geometryType:
    | 'skull'
    | 'mandible'
    | 'spine'
    | 'ribcage'
    | 'clavicle'
    | 'pelvis'
    | 'femur'
    | 'humerus'
    | 'pectoralis'
    | 'deltoid'
    | 'biceps'
    | 'rectusAbdominis'
    | 'latissimusDorsi'
    | 'quadriceps'
    | 'heart'
    | 'lungs'
    | 'liver'
    | 'stomach'
    | 'kidneys'
    | 'brain'
    | 'spinalCord'
    | 'sciaticNerve'
    | 'aorta'
    | 'venaCava';
  sex?: 'both' | 'male' | 'female';
}

export interface OrganHotspot {
  id: string;
  name: string;
  latinName: string;
  position: [number, number, number];
  description: string;
  clinicalPearl: string;
  color?: string;
}

export interface OrganSubPart {
  id: string;
  name: string;
  latinName: string;
  color: string;
  geometryType: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export interface OrganData {
  id: string;
  englishName: string;
  latinName: string;
  iconName: string;
  system: BodySystem;
  systemName: string;
  overview: string;
  physiology: string;
  clinicalSignificance: string;
  metrics: {
    weight?: string;
    perfusion?: string;
    vitalFunction: string;
  };
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  hotspots: OrganHotspot[];
  parts?: OrganSubPart[];
}

export type ViewPreset = 'front' | 'back' | 'side' | 'perspective';

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  clinicalContext?: string;
}
