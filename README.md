# Human Body Atlas · 3D Interactive Anatomy Explorer

An interactive 3D anatomy explorer built for medical students, healthcare professionals, and biology educators. Designed with React, Three.js (`@react-three/fiber` + `@react-three/drei`), Tailwind CSS, and a dark, minimal Apple-style UI optimized for both desktop and iPad touchscreens.

---

## Key Features

### 1. Full-Body Viewer
- **Dynamic Structure Count**: "Visible structures: N / Total" live counter in the top-left badge.
- **Floating Pill Control Bar**:
  - Quick anatomical view presets with smooth camera transitions: **Front**, **Back**, **Side**, and **Perspective**.
  - **Male / Female Archetype Toggle**: Smoothly switches pelvic and shoulder anatomical proportions.
  - **"Spread structures apart" Slider** (Assembled to Disassemble, 0% to 100%):
    - Smooth cubic bezier interpolation (`useFrame`).
    - At 0%: Anatomical assembly of human structures.
    - At >0% to 100%: Structures glide into an organized 3D explosion grid categorized by anatomical system (Skeletal, Muscular, Visceral/Organs, Nervous, Vascular) with floating column markers.

### 2. Structure Detail View
- **Ghosting / Semi-Transparent Body Context**: Tapping any structure (in the body or grid) highlights it in solid system color while transitioning all other structures into semi-transparent holographic silhouettes (`opacity: 0.14`).
- **3D Floating Billboards**: Direct HTML label anchored in 3D space above the structure showing its English name, Latin name (*Nomina Anatomica*), and side badge (e.g. `R`, `L`, `Midline`).
- **Slide-in Inspector Panel (Apple Glassmorphism)**:
  - System breadcrumbs (`System > Region > Structure`).
  - Standardized terminology codes (e.g., `TA98: A04.4.01.002`).
  - Detailed anatomical specifications: Origin (*Origo*), Insertion (*Insertio*), Innervation (*Nervus*), Vascular supply (*Arteria*), and Action.
  - High-yield USMLE / Clinical examination pearls.
  - Collapsible "About this system" card.
  - "Back to browsing" and "Back to whole body" buttons.

### 3. Organ Explorer (Isolated High-Detail Mode)
- Isolated 3D models with physiological animations:
  - **Heart (*Cor*)**: Lub-dub dual-pulse heartbeat simulation (~70 bpm), ascending aorta arch with branch takeoffs, pulmonary trunk, left ventricle, right atrium, and LAD coronary artery.
  - **Brain (*Encephalon*)**: Bilateral cerebral hemispheres, cerebellum, and brainstem/pons.
  - **Lungs (*Pulmones*)**: Rhythmic breathing motion, trachea, right/left lobes, and cardiac notch.
  - **Liver (*Hepar*)**: Dominant right lobe, left lobe, gallbladder, and falciform ligament.
  - **Kidneys (*Renes*)**: Bilateral bean-shaped kidneys, renal cortex/pyramids, renal arteries, and descending ureters.
- **Interactive Landmark Hotspot Pins**:
  - Pulsing 3D pins placed on critical anatomical landmarks.
  - Tapping a pin reveals a callout line, description, and high-yield clinical pearl.
- Dedicated header with current date, "Human Body Atlas", subtitle "Biology · Simulation", and "Back to Body" navigation.

### 4. Extra Medical Learning Tools
- **Live Search (`⌘K` or Search Icon)**: Instant fuzzy search across Latin names, English names, systems, and regions.
- **Anatomical System Visibility Filters**: Multi-layer toggles for Skeletal, Muscular, Visceral, Nervous, and Vascular systems with counts and quick "Show All / Hide All".
- **Ask AI Medical Assistant**:
  - Deep-dive anatomical tutor explaining topography, biomechanics, neurovascular bundles, and differential diagnoses.
  - Generates 5 USMLE-style clinical quiz questions with instant feedback and rationale.
  - Optional API key input for custom OpenAI / Gemini LLM queries.
- **Interactive Quiz Challenge Mode**:
  - Highlights a random structure in the 3D model.
  - Multiple choice quiz with streak counter, scoring, instant visual feedback, and celebratory confetti!

---

## iPad & Touchscreen Optimization

- **Single-finger Drag**: 360° orbital rotation around the model.
- **Pinch or Scroll**: Smooth zooming with min/max distance constraints to prevent clipping.
- **Two-finger Drag**: Screen-space camera panning.
- **Apple Glassmorphism UI**: Uses `backdrop-filter: blur(28px)`, system SF font hierarchy, and 44px minimum touch targets to adhere to iOS Human Interface Guidelines.
- **Touch Action**: `touch-none` canvas wrapper prevents elastic web bounce and mobile pull-to-refresh interference.

---

## Project Structure

```
human-body-atlas/
├── public/
│   └── data/
│       └── anatomyData.json          # Standalone exportable anatomy JSON dataset
├── src/
│   ├── types/
│   │   └── anatomy.ts                # TypeScript interfaces for structures, organs, quiz
│   ├── data/
│   │   ├── anatomyData.ts            # 20+ anatomical structures with Latin & English metadata
│   │   ├── anatomyData.json          # Raw JSON representation
│   │   └── organData.ts              # Detailed organ hotspot and clinical landmark data
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Scene.tsx             # Three.js Canvas, studio lighting, OrbitControls & camera controller
│   │   │   ├── FullBodyModel.tsx     # Animated structures + spread disassembly grid + column headers
│   │   │   ├── StructureMesh.tsx     # Procedural 3D anatomical geometries & materials
│   │   │   ├── StructureLabel.tsx    # 3D floating HTML billboard tags with Latin names
│   │   │   ├── OrganModel.tsx        # High-fidelity isolated organ models with pulsation animations
│   │   │   ├── HotspotPin.tsx        # 3D glowing pins & interactive callout cards
│   │   │   └── GLBModelLoader.tsx    # Production Draco GLB loader for Z-Anatomy / BodyParts3D
│   │   └── ui/
│   │       ├── Header.tsx            # Apple header with date, title, counter & shortcuts
│   │       ├── PillControlBar.tsx    # Bottom floating pill with views, gender toggle & spread slider
│   │       ├── DetailInspector.tsx   # Slide-in right panel with terminology, origins & actions
│   │       ├── OrganExplorerBar.tsx  # Organ switcher pill selector
│   │       ├── OrganSelectionModal.tsx# Organ grid selection dialog
│   │       ├── SearchBar.tsx         # Cmd+K search modal with instant navigation
│   │       ├── SystemFilterModal.tsx # System visibility layers
│   │       ├── AskAIModal.tsx        # Medical AI tutor + 5-question clinical quiz
│   │       └── QuizModeModal.tsx     # 3D structure identification game mode
│   ├── App.tsx                       # Master application orchestration
│   ├── main.tsx                      # React root mount
│   └── index.css                     # Dark Apple styling, glassmorphism, slider styling
├── index.html                        # iPad viewport-fit=cover & mobile web app shell
├── tailwind.config.js                # Custom anatomy colors, fonts, shadows, and animations
├── vite.config.ts                    # Optimized vendor chunking (Three, Drei, Lucide)
└── package.json
```

---

## Steps to Run Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) version 18 or newer (v20+ recommended).
- `npm` (bundled with Node.js) or `pnpm` / `yarn`.

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser (or your iPad's Safari on the same local Wi-Fi).

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## How to Plug in the Full Z-Anatomy or BodyParts3D Dataset (2,000+ Meshes)

The codebase has been designed from day one to scale seamlessly from this 20-structure MVP up to the full 2,000+ mesh open anatomical datasets:

### 1. Source Open Anatomy Data
- **Z-Anatomy** ([z-anatomy.com](https://www.z-anatomy.com/)): Full open human anatomy (CC BY-SA 4.0), organized into individual meshes with Latin Nomina Anatomica.
- **BodyParts3D / Anatomography** ([lifesciencedb.jp/bp3d/](https://lifesciencedb.jp/bp3d/)): Polygon data based on whole-body MRI, available in OBJ/GLTF format with FMA (Foundational Model of Anatomy) IDs.

### 2. Compress with Draco Compression
To optimize 2,000+ meshes for mobile / iPad:
```bash
npx gltf-pipeline -i full-body-anatomy.gltf -o public/models/z-anatomy.glb -d
```
This reduces a 300MB anatomical GLTF down to ~25MB using Draco geometry compression.

### 3. Connect to the Included `GLBModelLoader`
In [src/components/canvas/GLBModelLoader.tsx](file:///Users/aamir/Desktop/Gemini/antigravity/src/components/canvas/GLBModelLoader.tsx):
```tsx
import { GLBModelLoader } from './components/canvas/GLBModelLoader';

<GLBModelLoader
  url="/models/z-anatomy.glb"
  structuresMap={structuresMap}
  selectedStructureId={selectedStructure?.id || null}
  onSelectStructure={handleSelectStructure}
  disassembleProgress={disassembleProgress}
/>
```
The loader automatically extracts the `mesh.name` matching your JSON database, attaches raycasting events, applies ghosting/highlight materials, and binds directly to the sliding inspector!

---

## License
Open medical education application. Built with open standards for students and educators worldwide.
