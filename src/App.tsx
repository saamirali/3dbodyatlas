import React, { useState, useMemo, useCallback } from 'react';
import {
  AnatomicalStructure,
  BodySystem,
  OrganData,
  OrganHotspot,
  ViewPreset,
} from './types/anatomy';
import { ANATOMICAL_STRUCTURES } from './data/anatomyData';
import { ORGAN_DATA_MAP } from './data/organData';
import { Scene } from './components/canvas/Scene';
import { Header } from './components/ui/Header';
import { PillControlBar } from './components/ui/PillControlBar';
import { DetailInspector } from './components/ui/DetailInspector';
import { OrganExplorerBar } from './components/ui/OrganExplorerBar';
import { OrganSelectionModal } from './components/ui/OrganSelectionModal';
import { SearchBar } from './components/ui/SearchBar';
import { SystemFilterModal } from './components/ui/SystemFilterModal';
import { AskAIModal } from './components/ui/AskAIModal';
import { QuizModeModal } from './components/ui/QuizModeModal';

export const App: React.FC = () => {
  // Mode state: 'body' or 'organ'
  const [mode, setMode] = useState<'body' | 'organ'>('body');

  // Full-body state
  const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [disassembleProgress, setDisassembleProgress] = useState(0); // 0 (assembled) to 1 (disassembled grid)
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [viewPreset, setViewPreset] = useState<ViewPreset>('perspective');

  // System filters
  const [visibleSystems, setVisibleSystems] = useState<Record<BodySystem, boolean>>({
    skeletal: true,
    muscular: true,
    visceral: true,
    nervous: true,
    vascular: true,
  });

  // Organ explorer state
  const [activeOrgan, setActiveOrgan] = useState<OrganData>(ORGAN_DATA_MAP.heart);
  const [activeHotspot, setActiveHotspot] = useState<OrganHotspot | null>(null);
  const [isOrgansModalOpen, setIsOrgansModalOpen] = useState(false);

  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizTargetStructure, setQuizTargetStructure] = useState<AnatomicalStructure | null>(null);

  // Active pool of structures
  const structures = ANATOMICAL_STRUCTURES;

  // Active visible structures count
  const visibleCount = useMemo(() => {
    return structures.filter(
      (s) => visibleSystems[s.system] && (s.sex === undefined || s.sex === 'both' || s.sex === gender)
    ).length;
  }, [structures, visibleSystems, gender]);

  // System counts
  const systemCounts = useMemo(() => {
    const counts: Record<BodySystem, number> = {
      skeletal: 0,
      muscular: 0,
      visceral: 0,
      nervous: 0,
      vascular: 0,
    };
    structures.forEach((s) => {
      counts[s.system]++;
    });
    return counts;
  }, [structures]);

  // Handle selecting a structure (in body or grid)
  const handleSelectStructure = useCallback((structure: AnatomicalStructure) => {
    setSelectedStructure(structure);
    setIsInspectorOpen(true);
    // Smoothly bring the body back together if user tapped while spread apart
    setDisassembleProgress(0);
  }, []);

  // Back to whole body action
  const handleBackToBody = useCallback(() => {
    if (mode === 'organ') {
      setMode('body');
      setActiveHotspot(null);
    }
    setSelectedStructure(null);
    setIsInspectorOpen(false);
    setDisassembleProgress(0);
  }, [mode]);

  // Toggle Quiz Mode
  const handleToggleQuiz = useCallback(() => {
    if (isQuizActive) {
      setIsQuizActive(false);
      setQuizTargetStructure(null);
    } else {
      setIsQuizActive(true);
      // Pick random structure from currently visible
      const pool = structures.filter((s) => visibleSystems[s.system]);
      const random = pool[Math.floor(Math.random() * pool.length)] || structures[0];
      setQuizTargetStructure(random);
      // Close inspector if open
      setSelectedStructure(null);
      setIsInspectorOpen(false);
    }
  }, [isQuizActive, structures, visibleSystems]);

  // Next Quiz question
  const handleNextQuizQuestion = useCallback(() => {
    const pool = structures.filter(
      (s) => visibleSystems[s.system] && s.id !== quizTargetStructure?.id
    );
    const random = pool[Math.floor(Math.random() * pool.length)] || structures[0];
    setQuizTargetStructure(random);
  }, [structures, visibleSystems, quizTargetStructure]);

  // Reset Camera View
  const handleResetCamera = useCallback(() => {
    setViewPreset('perspective');
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a0c] text-white font-sans select-none touch-none">
      {/* Apple Minimal Header */}
      <Header
        mode={mode}
        visibleCount={visibleCount}
        totalCount={structures.length}
        activeOrgan={activeOrgan}
        onBackToBody={handleBackToBody}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFilter={() => setIsFilterOpen(true)}
        onToggleQuiz={handleToggleQuiz}
        isQuizActive={isQuizActive}
        onSwitchMode={(newMode) => {
          setMode(newMode);
          if (newMode === 'organ') {
            setSelectedStructure(null);
            setIsInspectorOpen(false);
          }
        }}
        onOpenOrgansModal={() => setIsOrgansModalOpen(true)}
      />

      {/* 3D WebGL Canvas Viewport */}
      <main className="w-full h-full absolute inset-0 z-0">
        <Scene
          mode={mode}
          structures={structures}
          selectedStructure={selectedStructure}
          onSelectStructure={handleSelectStructure}
          disassembleProgress={disassembleProgress}
          gender={gender}
          visibleSystems={visibleSystems}
          activeOrgan={activeOrgan}
          activeHotspot={activeHotspot}
          onSelectHotspot={(hotspot) => {
            setActiveHotspot((prev) => (prev?.id === hotspot.id ? null : hotspot));
          }}
          viewPreset={viewPreset}
          onOpenDetails={() => setIsInspectorOpen(true)}
          quizTargetId={isQuizActive ? quizTargetStructure?.id : null}
        />
      </main>

      {/* Full-Body Viewer Controls: Floating Pill Bar */}
      {mode === 'body' && (
        <PillControlBar
          viewPreset={viewPreset}
          onSelectViewPreset={setViewPreset}
          gender={gender}
          onToggleGender={() => setGender((g) => (g === 'male' ? 'female' : 'male'))}
          disassembleProgress={disassembleProgress}
          onChangeDisassembleProgress={setDisassembleProgress}
          onResetCamera={handleResetCamera}
        />
      )}

      {/* Organ Explorer Controls: Organ Switcher Bar */}
      {mode === 'organ' && (
        <OrganExplorerBar
          activeOrgan={activeOrgan}
          onSelectOrgan={(organ) => {
            setActiveOrgan(organ);
            setActiveHotspot(null);
          }}
        />
      )}

      {/* Right-Side Structure Detail Inspector Panel */}
      {selectedStructure && (
        <DetailInspector
          structure={selectedStructure}
          isOpen={isInspectorOpen}
          onClose={() => setIsInspectorOpen(false)}
          onBackToBody={handleBackToBody}
          onAskAI={() => setIsAIOpen(true)}
        />
      )}

      {/* Search Modal (Cmd+K) */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        structures={structures}
        onSelectStructure={handleSelectStructure}
      />

      {/* System Filter Modal */}
      <SystemFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        visibleSystems={visibleSystems}
        onToggleSystem={(sys) =>
          setVisibleSystems((prev) => ({ ...prev, [sys]: !prev[sys] }))
        }
        onSetAllSystems={(visible) =>
          setVisibleSystems({
            skeletal: visible,
            muscular: visible,
            visceral: visible,
            nervous: visible,
            vascular: visible,
          })
        }
        counts={systemCounts}
      />

      {/* Organ Selection Modal */}
      <OrganSelectionModal
        isOpen={isOrgansModalOpen}
        onClose={() => setIsOrgansModalOpen(false)}
        activeOrgan={activeOrgan}
        onSelectOrgan={(organ) => {
          setActiveOrgan(organ);
          setActiveHotspot(null);
          setMode('organ');
        }}
      />

      {/* Ask AI Medical Assistant Modal */}
      {selectedStructure && (
        <AskAIModal
          structure={selectedStructure}
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
        />
      )}

      {/* Quiz Mode Modal */}
      <QuizModeModal
        isActive={isQuizActive}
        onClose={() => {
          setIsQuizActive(false);
          setQuizTargetStructure(null);
        }}
        structures={structures}
        currentQuizStructure={quizTargetStructure}
        onNextQuestion={handleNextQuizQuestion}
      />
    </div>
  );
};

export default App;
