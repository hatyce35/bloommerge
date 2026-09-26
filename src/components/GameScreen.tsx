import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RotateCcw,
  Lightbulb,
  Undo2,
  ArrowLeft,
  Star,
  Sparkles,
  Hand,
  PlusCircle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { LevelConfig, GardenColumnData, UserSaveData, FlowerItem, FlowerColor } from '../types/game';
import { GardenColumn } from './GardenColumn';
import { FlowerRenderer } from './FlowerRenderer';
import {
  isValidSubStackMove,
  checkAndPerformMerge,
  unlockLockedFlowers,
  checkLevelGoalsMet,
  findBestHintMove,
} from '../utils/puzzleEngine';
import { sounds } from '../utils/audio';
import { FLOWER_FAMILIES } from '../data/flowerFamilies';

interface DragState {
  sourceColId: number;
  fromIndex: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
  flowers: FlowerItem[];
}

interface GameScreenProps {
  level: LevelConfig;
  saveData: UserSaveData;
  onLevelComplete: (moves: number, stars: number) => void;
  onBackToMenu: () => void;
  onUseHint: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  level,
  saveData,
  onLevelComplete,
  onBackToMenu,
  onUseHint,
}) => {
  // Initialize columns from level config (hanging downwards: index 0 is top)
  const [columns, setColumns] = useState<GardenColumnData[]>(() => {
    return level.columns.map((col, idx) => ({
      id: idx,
      capacity: 99, // No capacity limit
      flowers: col.initialFlowers.map((fl, fIdx) => ({
        id: `init_${level.id}_${idx}_${fIdx}_${Math.random()}`,
        color: fl.color,
        stage: fl.stage,
        isWild: fl.isWild,
        isFrozen: fl.isFrozen,
        isRainbow: fl.isRainbow,
        isLocked: fl.isLocked,
      })),
    }));
  });

  const [selectedState, setSelectedState] = useState<{
    colId: number;
    fromIndex: number;
  } | null>(null);

  const [dragState, setDragState] = useState<DragState | null>(null);
  const [hoveredColId, setHoveredColId] = useState<number | null>(null);
  const [isDropValid, setIsDropValid] = useState<boolean>(true);

  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState<GardenColumnData[][]>([]);
  const [shakingColId, setShakingColId] = useState<number | null>(null);
  const [hintMove, setHintMove] = useState<{
    fromColIdx: number;
    fromFlowerIdx: number;
    toColIdx: number;
  } | null>(null);
  const [createdHistory, setCreatedHistory] = useState<{ color: string; stage: number }[]>([]);
  const [isProcessingMerge, setIsProcessingMerge] = useState(false);
  const [lastMergedInfo, setLastMergedInfo] = useState<{ color: string; stage: number } | null>(null);

  // Target bloom stage for "en büyük çiçek" in this level (default 3: Blossom 🌸)
  const targetBloomStage = level.targetBloomStage || 3;

  // Total flowers on board
  const allFlowersOnBoard = columns.flatMap((c) => c.flowers);
  const totalFlowersCount = allFlowersOnBoard.length;
  const largestFlowersCount = allFlowersOnBoard.filter((fl) => fl.stage >= targetBloomStage).length;

  // 1. "Bütün çiçekler en büyük olana kadar devam etsin":
  // There must be flowers on the board, and ALL remaining flowers must be at least targetBloomStage!
  const allFlowersAreLargest =
    totalFlowersCount > 0 && largestFlowersCount === totalFlowersCount;

  // 2. "ve en üstte aynı türden renkli en büyük Çiçekler olunca":
  // In each non-empty column:
  // - The top flower is a largest flower (stage >= targetBloomStage)
  // - All flowers in the column are of the same color as the top flower
  // - All flowers in the column are largest flowers
  const isColPureAndLargest = useCallback(
    (col: GardenColumnData) => {
      if (col.flowers.length === 0) return false;
      const topFlower = col.flowers[0];
      const isTopLargest = topFlower.stage >= targetBloomStage;
      const isAllSameColor = col.flowers.every(
        (fl) => fl.color === topFlower.color || fl.isWild || fl.isRainbow
      );
      const isAllLargest = col.flowers.every((fl) => fl.stage >= targetBloomStage);
      return isTopLargest && isAllSameColor && isAllLargest;
    },
    [targetBloomStage]
  );

  const nonEmptyColumns = columns.filter((c) => c.flowers.length > 0);
  const allColumnsPureAndLargest =
    nonEmptyColumns.length > 0 && nonEmptyColumns.every(isColPureAndLargest);

  // 3. All flower families present in this level have their largest flower
  const requiredColors: FlowerColor[] = Array.from(
    new Set(level.columns.flatMap((c) => c.initialFlowers.map((f) => f.color)))
  );
  const bloomedColors = new Set(
    allFlowersOnBoard.filter((fl) => fl.stage >= targetBloomStage).map((fl) => fl.color)
  );
  const allRequiredColorsBloomed = requiredColors.every((c) => bloomedColors.has(c));

  // The round completes when:
  // - All flowers have reached the largest stage
  // - In every column with flowers, the top flower is a largest flower of that color, and all flowers in the column match and are largest
  // - All flower families for this level have bloomed!
  const isRoundComplete =
    allFlowersAreLargest && allColumnsPureAndLargest && allRequiredColorsBloomed;

  // Compute stars based on current moves
  const currentStars =
    moves <= level.starThresholds.threeStars
      ? 3
      : moves <= level.starThresholds.twoStars
      ? 2
      : 1;

  // When round completes, play celebratory fanfare and transition to next level!
  const hasWonRef = useRef(false);
  useEffect(() => {
    hasWonRef.current = false;
  }, [level.id]);

  useEffect(() => {
    if (isRoundComplete && !hasWonRef.current && !isProcessingMerge) {
      hasWonRef.current = true;
      sounds.playWin();
      const timer = setTimeout(() => {
        onLevelComplete(moves, currentStars);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isRoundComplete, isProcessingMerge, moves, currentStars, onLevelComplete]);

  // Restart level
  const handleRestart = useCallback(() => {
    sounds.playButton();
    setColumns(
      level.columns.map((col, idx) => ({
        id: idx,
        capacity: 99,
        flowers: col.initialFlowers.map((fl, fIdx) => ({
          id: `init_${level.id}_${idx}_${fIdx}_${Math.random()}`,
          color: fl.color,
          stage: fl.stage,
          isWild: fl.isWild,
          isFrozen: fl.isFrozen,
          isRainbow: fl.isRainbow,
          isLocked: fl.isLocked,
        })),
      }))
    );
    setSelectedState(null);
    setDragState(null);
    setMoves(0);
    setHistory([]);
    setHintMove(null);
    setCreatedHistory([]);
    hasWonRef.current = false;
  }, [level]);

  // Undo move
  const handleUndo = useCallback(() => {
    if (history.length === 0 || isProcessingMerge) return;
    sounds.playMove();
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setColumns(previous);
    setSelectedState(null);
    setDragState(null);
    setMoves((m) => Math.max(0, m - 1));
    setHintMove(null);
  }, [history, isProcessingMerge]);

  // Request Hint
  const handleHint = useCallback(() => {
    if (saveData.hintsRemaining <= 0) return;
    const foundHint = findBestHintMove(columns);
    if (foundHint) {
      sounds.playSelect();
      setHintMove(foundHint);
      onUseHint();
      setTimeout(() => {
        setHintMove(null);
      }, 4000);
    } else {
      sounds.playError();
    }
  }, [columns, saveData.hintsRemaining, onUseHint]);

  // Add more flower seeds (Tohum Ekle) so player can keep growing and merging flowers!
  const handleAddMoreFlowers = useCallback(() => {
    sounds.playBloom();

    // Determine colors to spawn: prioritize current level's colors
    const levelColors: FlowerColor[] = Array.from(
      new Set(level.columns.flatMap((c) => c.initialFlowers.map((f) => f.color)))
    );

    const availableColors: FlowerColor[] =
      levelColors.length >= 2
        ? levelColors
        : ['pink', 'blue', 'yellow', 'purple', 'orange', 'red'];

    // Pick 2 colors to spawn as seeds
    const pickedColor1 = availableColors[Math.floor(Math.random() * availableColors.length)];
    const remaining = availableColors.filter((c) => c !== pickedColor1);
    const pickedColor2 =
      remaining.length > 0
        ? remaining[Math.floor(Math.random() * remaining.length)]
        : availableColors[0];

    // Spawn 3 seeds of color 1 and 3 seeds of color 2 (Stage 1 Tohumlar!)
    const newFlowersToDistribute: FlowerItem[] = [
      {
        id: `seed_${Date.now()}_1`,
        color: pickedColor1,
        stage: 1, // 🌱 Seed
      },
      {
        id: `seed_${Date.now()}_2`,
        color: pickedColor1,
        stage: 1,
      },
      {
        id: `seed_${Date.now()}_3`,
        color: pickedColor1,
        stage: 1,
      },
      {
        id: `seed_${Date.now()}_4`,
        color: pickedColor2,
        stage: 1,
      },
      {
        id: `seed_${Date.now()}_5`,
        color: pickedColor2,
        stage: 1,
      },
      {
        id: `seed_${Date.now()}_6`,
        color: pickedColor2,
        stage: 1,
      },
    ];

    setColumns((prevCols) => {
      const nextCols = prevCols.map((c) => ({ ...c, flowers: [...c.flowers] }));
      newFlowersToDistribute.forEach((flower, idx) => {
        const colIdx = idx % nextCols.length;
        nextCols[colIdx].flowers.push(flower);
      });
      return nextCols;
    });

    setLastMergedInfo({
      color: pickedColor1,
      stage: 1,
    });
    setTimeout(() => setLastMergedInfo(null), 2500);
  }, [level]);

  // Process Merges with cascading support in a downward column
  const runMergeCheck = useCallback(async (targetColId: number) => {
    setIsProcessingMerge(true);

    setColumns((currentCols) => {
      const colIndex = currentCols.findIndex((c) => c.id === targetColId);
      if (colIndex === -1) return currentCols;

      let targetCol = currentCols[colIndex];
      let didAnyMerge = false;
      let lastColor: string | undefined;
      let lastStage: number | undefined;

      // Cascading merge loop: keeps merging if new matches form!
      while (true) {
        const { updatedFlowers, didMerge, mergedColor, newStage } =
          checkAndPerformMerge(targetCol);
        if (!didMerge) break;

        didAnyMerge = true;
        lastColor = mergedColor;
        lastStage = newStage;

        targetCol = {
          ...targetCol,
          flowers: updatedFlowers,
        };
      }

      if (didAnyMerge) {
        sounds.playMerge();
        if (lastStage && lastStage >= 3) {
          sounds.playBloom();
        }

        if (lastColor && lastStage) {
          setCreatedHistory((prev) => [...prev, { color: lastColor!, stage: lastStage! }]);
          setLastMergedInfo({ color: lastColor, stage: lastStage });
          setTimeout(() => setLastMergedInfo(null), 2200);
        }

        let newCols = currentCols.map((c, idx) =>
          idx === colIndex ? targetCol : c
        );

        // Unlock any locked flowers board-wide on merge!
        newCols = unlockLockedFlowers(newCols);
        return newCols;
      }

      return currentCols;
    });

    setIsProcessingMerge(false);
  }, []);

  // Execute Sub-Stack Move from source to destination
  const executeSubStackMove = useCallback(
    (fromColId: number, fromIndex: number, toColId: number) => {
      const fromCol = columns.find((c) => c.id === fromColId);
      const toCol = columns.find((c) => c.id === toColId);

      if (!fromCol || !toCol) return false;

      const validation = isValidSubStackMove(fromCol, fromIndex, toCol);
      if (!validation.valid) {
        sounds.playError();
        setShakingColId(fromColId);
        setTimeout(() => setShakingColId(null), 400);
        return false;
      }

      // Valid move!
      sounds.playMove();

      // Save state to history for undo
      setHistory((prev) => [...prev, columns.map((c) => ({ ...c, flowers: [...c.flowers] }))]);

      const movingSubStack = fromCol.flowers.slice(fromIndex).map((fl) => ({
        ...fl,
        isFrozen: false, // moving thaws frozen flowers
      }));

      setColumns((prevCols) =>
        prevCols.map((c) => {
          if (c.id === fromColId) {
            return {
              ...c,
              flowers: c.flowers.slice(0, fromIndex),
            };
          }
          if (c.id === toColId) {
            return {
              ...c,
              flowers: [...c.flowers, ...movingSubStack],
            };
          }
          return c;
        })
      );

      setMoves((m) => m + 1);
      setSelectedState(null);

      // Check for downward vertical merges in destination
      setTimeout(() => {
        runMergeCheck(toColId);
      }, 150);

      return true;
    },
    [columns, runMergeCheck]
  );

  // Pointer Down on any flower (starts drag or prepares tap)
  const handlePointerDownFlower = (colId: number, flowerIdx: number, e: React.PointerEvent) => {
    if (isProcessingMerge) return;

    if (hintMove) setHintMove(null);

    const sourceCol = columns.find((c) => c.id === colId);
    if (!sourceCol) return;

    const movingFlower = sourceCol.flowers[flowerIdx];
    if (movingFlower.isLocked) {
      sounds.playError();
      setShakingColId(colId);
      setTimeout(() => setShakingColId(null), 400);
      return;
    }

    const subStack = sourceCol.flowers.slice(flowerIdx);

    setDragState({
      sourceColId: colId,
      fromIndex: flowerIdx,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
      isDragging: false,
      flowers: subStack,
    });
  };

  // Window Pointer Move and Pointer Up effects
  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const isDraggingNow = dragState.isDragging || dist > 6;

      // Identify hovered column element under pointer
      const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
      const colEl = elementUnder?.closest('[data-col-id]') as HTMLElement | null;
      let targetId: number | null = null;
      let valid = false;

      if (colEl) {
        const idStr = colEl.getAttribute('data-col-id');
        if (idStr !== null) {
          targetId = parseInt(idStr, 10);
          const fromCol = columns.find((c) => c.id === dragState.sourceColId);
          const toCol = columns.find((c) => c.id === targetId);
          if (fromCol && toCol) {
            valid = isValidSubStackMove(fromCol, dragState.fromIndex, toCol).valid;
          }
        }
      }

      setHoveredColId(targetId);
      setIsDropValid(valid);

      setDragState((prev) =>
        prev
          ? {
              ...prev,
              currentX: e.clientX,
              currentY: e.clientY,
              isDragging: isDraggingNow,
            }
          : null
      );
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!dragState) return;

      if (dragState.isDragging) {
        // User dragged and released
        const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
        const colEl = elementUnder?.closest('[data-col-id]') as HTMLElement | null;

        if (colEl) {
          const idStr = colEl.getAttribute('data-col-id');
          if (idStr !== null) {
            const targetColId = parseInt(idStr, 10);
            if (targetColId !== dragState.sourceColId) {
              executeSubStackMove(dragState.sourceColId, dragState.fromIndex, targetColId);
            }
          }
        }
      } else {
        // User just tapped (not dragged)
        if (selectedState !== null) {
          if (selectedState.colId !== dragState.sourceColId) {
            executeSubStackMove(selectedState.colId, selectedState.fromIndex, dragState.sourceColId);
          } else {
            // Tapped same column again -> deselect
            sounds.playSelect();
            setSelectedState(null);
          }
        } else {
          // Select this sub-stack
          sounds.playSelect();
          setSelectedState({
            colId: dragState.sourceColId,
            fromIndex: dragState.fromIndex,
          });
        }
      }

      setDragState(null);
      setHoveredColId(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [dragState, columns, selectedState, executeSubStackMove]);

  // Click on a column body / vine
  const handleColumnClick = (colId: number) => {
    if (isProcessingMerge) return;

    if (selectedState !== null) {
      if (selectedState.colId !== colId) {
        executeSubStackMove(selectedState.colId, selectedState.fromIndex, colId);
      } else {
        sounds.playSelect();
        setSelectedState(null);
      }
    }
  };

  const isCompact = columns.length >= 5;

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-3 py-3 select-none text-emerald-950 justify-between">
      {/* Top HUD: Navigation, Level Number, Moves, Stars */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToMenu}
            className="p-2 rounded-xl bg-white/70 hover:bg-white text-emerald-900 border border-emerald-200/80 shadow-xs transition-all cursor-pointer"
            title="Menu"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700" />
          </button>

          <div className="flex flex-col items-center">
            <span className="text-sm font-extrabold text-emerald-950 font-display">
              Level {level.id}
            </span>
            <span className="text-[11px] text-emerald-800/80 font-medium">{level.title}</span>
          </div>

          {/* Moves & Star Counter */}
          <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/75 border border-emerald-200/80 shadow-xs">
            <div className="flex items-center">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${
                    s <= currentStars ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-950 tabular-nums">{moves}</span>
          </div>
        </div>

        {/* Level Goals Bar: All flowers must become largest, and sorted by color at top of columns */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-xs rounded-2xl py-1.5 px-3 border border-emerald-100 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">🌸</span>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-emerald-950 leading-tight flex items-center gap-1">
                Hedef: Bütün Çiçekleri En Büyük Yap & Eşle
                {isRoundComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />}
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold">
                {largestFlowersCount} / {totalFlowersCount} En Büyük Çiçek ·{' '}
                {allFlowersAreLargest ? 'Hepsi Büyük! Renkleri diz' : 'Büyütmeye devam et'}
              </span>
            </div>
          </div>

          {/* Color Family Bloom Status Chips */}
          <div className="flex items-center gap-1">
            {requiredColors.map((color) => {
              const hasColorBloomed = bloomedColors.has(color);
              const fam = FLOWER_FAMILIES[color];
              return (
                <div
                  key={color}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg border text-[10px] font-extrabold transition-all ${
                    hasColorBloomed
                      ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-xs scale-105 ring-1 ring-amber-300/60'
                      : 'bg-white/80 border-emerald-200/60 text-stone-400'
                  }`}
                  title={`${fam.familyName}: ${hasColorBloomed ? 'Büyük Çiçek Açtı' : 'Büyütülüyor'}`}
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: fam.themeColor }}
                  />
                  <span>{hasColorBloomed ? '🌸' : '🌱'}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating toast notification when a flower merges */}
        {lastMergedInfo && (
          <div className="self-center bg-white/95 border border-amber-300 shadow-md rounded-full px-3 py-1 flex items-center gap-2 text-xs font-bold text-emerald-950 animate-bounce">
            <FlowerRenderer
              color={lastMergedInfo.color as FlowerColor}
              stage={lastMergedInfo.stage as FlowerItem['stage']}
              size={22}
            />
            <span>
              {FLOWER_FAMILIES[lastMergedInfo.color as FlowerColor]?.stageNames[
                lastMergedInfo.stage as FlowerItem['stage']
              ] || 'Yeni Çiçek'}{' '}
              Oluştu! ✨
            </span>
          </div>
        )}
      </div>

      {/* Main Playing Area: Hanging Downward Garden Columns */}
      <div className="flex-1 flex items-start justify-center my-auto py-2 w-full overflow-y-auto no-scrollbar">
        <div
          className={`flex items-start justify-center w-full ${
            columns.length === 3
              ? 'gap-5'
              : columns.length === 4
              ? 'gap-3.5'
              : columns.length === 5
              ? 'gap-2.5'
              : 'gap-1.5'
          }`}
        >
          {columns.map((col, idx) => (
            <GardenColumn
              key={col.id}
              column={col}
              isSelectedSource={selectedState?.colId === col.id}
              selectedFlowerIndex={selectedState?.colId === col.id ? selectedState.fromIndex : null}
              isHintSource={hintMove?.fromColIdx === idx}
              hintFlowerIndex={hintMove?.fromColIdx === idx ? hintMove.fromFlowerIdx : null}
              isHintTarget={hintMove?.toColIdx === idx}
              isHoveredDropTarget={hoveredColId === col.id && dragState?.sourceColId !== col.id}
              isDropValid={isDropValid}
              isShaking={shakingColId === col.id}
              hasBigFlower={isColPureAndLargest(col)}
              onPointerDownFlower={handlePointerDownFlower}
              onColumnClick={handleColumnClick}
              compactMode={isCompact}
              draggedSubStackInfo={
                dragState?.isDragging
                  ? { colId: dragState.sourceColId, fromIndex: dragState.fromIndex }
                  : null
              }
            />
          ))}
        </div>
      </div>

      {/* Floating Dragging Follower Sub-Stack (Follows Finger/Mouse) */}
      {dragState && dragState.isDragging && (
        <div
          className="fixed pointer-events-none z-50 flex flex-col items-center drop-shadow-2xl"
          style={{
            left: `${dragState.currentX - 28}px`,
            top: `${dragState.currentY - 28}px`,
            transform: 'scale(1.08)',
          }}
        >
          {/* Golden floating ground aura */}
          <div className="absolute inset-0 bg-amber-300/40 rounded-full blur-md" />

          {dragState.flowers.map((fl, fIdx) => (
            <div key={fl.id || fIdx} className={`relative z-10 ${fIdx > 0 ? '-mt-2.5' : ''}`}>
              {fIdx > 0 && (
                <div className="w-1 h-3 bg-emerald-600/70 mx-auto -mb-1 rounded-full pointer-events-none" />
              )}
              <FlowerRenderer
                color={fl.color}
                stage={fl.stage}
                isWild={fl.isWild}
                isFrozen={fl.isFrozen}
                isRainbow={fl.isRainbow}
                isLocked={fl.isLocked}
                isSelected={true}
                size={isCompact ? 46 : 54}
              />
            </div>
          ))}
        </div>
      )}

      {/* Bottom Controls Bar: Add Seeds, Restart, Undo, Hint */}
      <div className="w-full flex items-center justify-between gap-2 pt-2">
        {/* Add More Seeds / Tohum Ekle Button */}
        <button
          onClick={handleAddMoreFlowers}
          className="flex-1 py-3 px-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1 transition-all cursor-pointer"
          title="Bahçeye yeni tohumlar ekle"
        >
          <PlusCircle className="w-4 h-4 text-emerald-200" />
          <span>+ Tohum Ekle</span>
        </button>

        {/* Restart Button */}
        <button
          onClick={handleRestart}
          className="p-3 rounded-2xl bg-white/75 hover:bg-white active:scale-95 border border-emerald-200 text-emerald-900 font-semibold text-xs shadow-xs flex items-center justify-center transition-all cursor-pointer"
          title="Restart Level"
        >
          <RotateCcw className="w-4 h-4 text-emerald-700" />
        </button>

        {/* Undo Button */}
        <button
          onClick={handleUndo}
          disabled={history.length === 0}
          className={`p-3 rounded-2xl border font-semibold text-xs shadow-xs flex items-center justify-center transition-all cursor-pointer ${
            history.length === 0
              ? 'bg-stone-100/60 border-stone-200 text-stone-400 cursor-not-allowed opacity-50'
              : 'bg-white/75 hover:bg-white active:scale-95 border-emerald-200 text-emerald-900'
          }`}
          title="Undo last move"
        >
          <Undo2 className="w-4 h-4 text-emerald-700" />
        </button>

        {/* Hint Button */}
        <button
          onClick={handleHint}
          disabled={saveData.hintsRemaining <= 0}
          className={`flex-1 py-3 px-2 rounded-2xl border font-semibold text-xs shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
            saveData.hintsRemaining <= 0
              ? 'bg-stone-100/60 border-stone-200 text-stone-400 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 border-amber-300 text-amber-950 active:scale-95'
          }`}
          title="Use Hint"
        >
          <Lightbulb className="w-4 h-4 text-amber-700 fill-amber-300" />
          <span>İpucu</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400/50 font-bold tabular-nums">
            {saveData.hintsRemaining}
          </span>
        </button>
      </div>
    </div>
  );
};
