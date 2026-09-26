import React, { useState, useEffect, useCallback } from 'react';
import { ViewState, UserSaveData, FlowerColor, FlowerStage } from './types/game';
import { loadSaveData, saveGameData, resetGameProgress } from './utils/storage';
import { LEVELS } from './data/levels';
import { sounds } from './utils/audio';
import { GardenBackground } from './components/GardenBackground';
import { MainMenu } from './components/MainMenu';
import { GameScreen } from './components/GameScreen';
import { LevelSelect } from './components/LevelSelect';
import { GardenCollection } from './components/GardenCollection';
import { SettingsModal } from './components/SettingsModal';
import { LevelCompleteModal } from './components/LevelCompleteModal';

export default function App() {
  const [saveData, setSaveData] = useState<UserSaveData>(() => loadSaveData());
  const [currentView, setCurrentView] = useState<ViewState>('menu');
  const [activeLevelId, setActiveLevelId] = useState<number>(saveData.currentLevel);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [completedModalData, setCompletedModalData] = useState<{
    levelNumber: number;
    moves: number;
    bestMoves: number;
    stars: number;
    targetFlower: { color: FlowerColor; stage: FlowerStage };
  } | null>(null);

  // Sync sound settings on initial load and update
  useEffect(() => {
    sounds.setSoundEnabled(saveData.settings.soundEnabled);
    sounds.setMusicEnabled(saveData.settings.musicEnabled);
    sounds.setVibrationEnabled(saveData.settings.vibrationEnabled);
  }, [saveData.settings]);

  // Persist save data on state updates
  useEffect(() => {
    saveGameData(saveData);
  }, [saveData]);

  // First interaction starts audio context & ambient music if enabled
  useEffect(() => {
    const handleFirstTouch = () => {
      if (saveData.settings.musicEnabled) {
        sounds.startAmbientMusic();
      }
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('keydown', handleFirstTouch);
    };

    window.addEventListener('pointerdown', handleFirstTouch);
    window.addEventListener('keydown', handleFirstTouch);
    return () => {
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('keydown', handleFirstTouch);
    };
  }, [saveData.settings.musicEnabled]);

  // Play button click from main menu
  const handlePlayLevel = useCallback((lvlId?: number) => {
    sounds.playButton();
    const targetId = lvlId || saveData.currentLevel;
    setActiveLevelId(targetId);
    setCurrentView('playing');
  }, [saveData.currentLevel]);

  // On Level Completed handler
  const handleLevelComplete = useCallback((moves: number, stars: number) => {
    const activeLevel = LEVELS.find((l) => l.id === activeLevelId) || LEVELS[0];
    const prevRecord = saveData.levels[activeLevelId];
    const bestMoves = prevRecord?.bestMoves && prevRecord.bestMoves > 0
      ? Math.min(prevRecord.bestMoves, moves)
      : moves;
    const bestStars = Math.max(prevRecord?.stars || 0, stars);

    // Identify discovered flowers from level goals and board
    const newUnlocked = { ...saveData.unlockedFlowers };
    activeLevel.goals.forEach((g) => {
      const col = g.color || 'pink';
      for (let st = 1; st <= g.stage; st++) {
        newUnlocked[`${col}_${st}`] = true;
      }
    });

    const nextLevelNum = Math.min(LEVELS.length, activeLevelId + 1);

    const updatedData: UserSaveData = {
      ...saveData,
      currentLevel: activeLevelId >= saveData.currentLevel ? nextLevelNum : saveData.currentLevel,
      levels: {
        ...saveData.levels,
        [activeLevelId]: {
          completed: true,
          stars: bestStars,
          bestMoves: bestMoves,
        },
      },
      unlockedFlowers: newUnlocked,
      // Reward an extra hint every 3 levels completed!
      hintsRemaining: activeLevelId % 3 === 0 ? saveData.hintsRemaining + 1 : saveData.hintsRemaining,
    };

    setSaveData(updatedData);

    const targetGoal = activeLevel.goals[0];
    setCompletedModalData({
      levelNumber: activeLevelId,
      moves,
      bestMoves,
      stars,
      targetFlower: {
        color: targetGoal?.color || 'pink',
        stage: targetGoal?.stage || 3,
      },
    });
  }, [activeLevelId, saveData]);

  // Next level action
  const handleNextLevel = useCallback(() => {
    sounds.playButton();
    setCompletedModalData(null);
    if (activeLevelId < LEVELS.length) {
      setActiveLevelId((prev) => prev + 1);
      setCurrentView('playing');
    } else {
      setCurrentView('levels');
    }
  }, [activeLevelId]);

  // Replay level action
  const handleReplayLevel = useCallback(() => {
    sounds.playButton();
    setCompletedModalData(null);
    setCurrentView('playing');
  }, []);

  // Update Settings
  const handleUpdateSettings = useCallback((newSettings: UserSaveData['settings']) => {
    setSaveData((prev) => ({
      ...prev,
      settings: newSettings,
    }));
  }, []);

  // Reset Progress
  const handleResetProgress = useCallback(() => {
    sounds.playButton();
    const fresh = resetGameProgress();
    setSaveData(fresh);
    setActiveLevelId(1);
    setCurrentView('menu');
  }, []);

  // Use a hint
  const handleUseHint = useCallback(() => {
    setSaveData((prev) => ({
      ...prev,
      hintsRemaining: Math.max(0, prev.hintsRemaining - 1),
    }));
  }, []);

  const activeLevelConfig = LEVELS.find((l) => l.id === activeLevelId) || LEVELS[0];

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden font-sans">
      {/* Garden Scenery Background */}
      <GardenBackground />

      {/* Main Responsive Mobile Viewport Frame */}
      <div className="relative w-full h-[100dvh] max-w-md mx-auto flex flex-col justify-between overflow-hidden shadow-2xl">
        {currentView === 'menu' && (
          <MainMenu
            saveData={saveData}
            onPlay={() => handlePlayLevel()}
            onOpenLevels={() => {
              sounds.playButton();
              setCurrentView('levels');
            }}
            onOpenGarden={() => {
              sounds.playButton();
              setCurrentView('garden');
            }}
            onOpenSettings={() => {
              sounds.playButton();
              setShowSettings(true);
            }}
          />
        )}

        {currentView === 'playing' && (
          <GameScreen
            key={`game_screen_${activeLevelId}_${completedModalData ? 'done' : 'active'}`}
            level={activeLevelConfig}
            saveData={saveData}
            onLevelComplete={handleLevelComplete}
            onBackToMenu={() => {
              sounds.playButton();
              setCurrentView('menu');
            }}
            onUseHint={handleUseHint}
          />
        )}

        {currentView === 'levels' && (
          <LevelSelect
            saveData={saveData}
            onSelectLevel={(lvlId) => {
              handlePlayLevel(lvlId);
            }}
            onBackToMenu={() => {
              sounds.playButton();
              setCurrentView('menu');
            }}
          />
        )}

        {currentView === 'garden' && (
          <GardenCollection
            saveData={saveData}
            onBackToMenu={() => {
              sounds.playButton();
              setCurrentView('menu');
            }}
          />
        )}

        {/* Level Complete Victory Celebration Modal */}
        {completedModalData && (
          <LevelCompleteModal
            levelNumber={completedModalData.levelNumber}
            moves={completedModalData.moves}
            bestMoves={completedModalData.bestMoves}
            stars={completedModalData.stars}
            targetFlower={completedModalData.targetFlower}
            hasNextLevel={activeLevelId < LEVELS.length}
            onNextLevel={handleNextLevel}
            onReplay={handleReplayLevel}
            onGoToLevels={() => {
              sounds.playButton();
              setCompletedModalData(null);
              setCurrentView('levels');
            }}
          />
        )}

        {/* Settings Modal */}
        {showSettings && (
          <SettingsModal
            settings={saveData.settings}
            onUpdateSettings={handleUpdateSettings}
            onResetProgress={handleResetProgress}
            onClose={() => {
              sounds.playButton();
              setShowSettings(false);
            }}
          />
        )}
      </div>
    </main>
  );
}
