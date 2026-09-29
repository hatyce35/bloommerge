import { FlowerItem, GardenColumnData, LevelGoal } from '../types/game';

// Check if a move from source (starting at fromIndex) to destination is valid
// Supports moving any flower along with all flowers below it (sub-stack)
// No capacity limit ("bir sayı sınırı olmasın")
export function isValidSubStackMove(
  fromCol: GardenColumnData,
  fromIndex: number,
  toCol: GardenColumnData
): { valid: boolean; reason?: string } {
  if (fromCol.id === toCol.id) {
    return { valid: false, reason: 'Same column' };
  }

  if (fromIndex < 0 || fromIndex >= fromCol.flowers.length) {
    return { valid: false, reason: 'Invalid flower index' };
  }

  const movingFlower = fromCol.flowers[fromIndex];

  if (movingFlower.isLocked) {
    return { valid: false, reason: 'Flower is locked by ivy padlock' };
  }

  // Any flowers in the sub-stack that are locked cannot be moved
  const subStack = fromCol.flowers.slice(fromIndex);
  if (subStack.some((fl) => fl.isLocked)) {
    return { valid: false, reason: 'Contains a locked flower' };
  }

  // If destination column is empty, any flower can be placed there
  if (toCol.flowers.length === 0) {
    return { valid: true };
  }

  // Destination bottom flower (since flowers stack downwards from top to bottom)
  const bottomDest = toCol.flowers[toCol.flowers.length - 1];

  // Wild or Rainbow flower logic
  if (movingFlower.isWild || movingFlower.isRainbow || bottomDest.isWild || bottomDest.isRainbow) {
    return { valid: true };
  }

  // Same color matching family
  if (movingFlower.color === bottomDest.color) {
    return { valid: true };
  }

  return { valid: false, reason: 'Different flower families' };
}

// Backwards compatibility for single top move
export function isValidMove(
  fromCol: GardenColumnData,
  toCol: GardenColumnData
): { valid: boolean; reason?: string } {
  if (fromCol.flowers.length === 0) return { valid: false };
  return isValidSubStackMove(fromCol, fromCol.flowers.length - 1, toCol);
}

// Check for 3-stack vertical merges in a column (downward stacking)
// Returns the updated flowers array and number of merges triggered
export function checkAndPerformMerge(
  column: GardenColumnData
): { updatedFlowers: FlowerItem[]; didMerge: boolean; mergedColor?: string; newStage?: number } {
  const flowers = [...column.flowers];
  if (flowers.length < 3) {
    return { updatedFlowers: flowers, didMerge: false };
  }

  // Look for 3 consecutive matching flowers of the same color in the downward column
  for (let i = 0; i <= flowers.length - 3; i++) {
    const f1 = flowers[i];
    const f2 = flowers[i + 1];
    const f3 = flowers[i + 2];

    // Stage 5+ flowers are already fully mature, crowning blooms - they do not merge further
    if (f1.stage >= 5 || f2.stage >= 5 || f3.stage >= 5) {
      continue;
    }

    const colorsMatch =
      (f1.color === f2.color || f1.isWild || f2.isWild || f1.isRainbow || f2.isRainbow) &&
      (f2.color === f3.color || f2.isWild || f3.isWild || f2.isRainbow || f3.isRainbow);

    if (colorsMatch) {
      // Determine resulting color (prioritize non-wild color)
      const targetColor = (!f1.isWild && !f1.isRainbow ? f1.color : (!f2.isWild ? f2.color : f3.color));

      // Sequential growth: Tohum (1) -> Çiçek 1 (2) -> Çiçek 2 (3) -> Çiçek 3 (4) -> En Son Büyük Çiçek (5)
      const maxStage = Math.max(f1.stage, f2.stage, f3.stage);
      const nextStage = Math.min(5, maxStage + 1) as FlowerItem['stage'];

      const mergedFlower: FlowerItem = {
        id: `merged_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        color: targetColor,
        stage: nextStage,
        isFrozen: false,
        isLocked: false,
      };

      // Replace the 3 flowers with the merged flower at index i
      const newFlowers = [...flowers.slice(0, i), mergedFlower, ...flowers.slice(i + 3)];
      return {
        updatedFlowers: newFlowers,
        didMerge: true,
        mergedColor: targetColor,
        newStage: nextStage,
      };
    }
  }

  return { updatedFlowers: flowers, didMerge: false };
}

// Determine if a flower is the FINAL LARGEST FLOWER (Stage 5)
export function isFinalLargeFlower(flower: FlowerItem): boolean {
  return flower.stage >= 5;
}

// Unlock all locked flowers on the board when any merge occurs
export function unlockLockedFlowers(columns: GardenColumnData[]): GardenColumnData[] {
  return columns.map((col) => ({
    ...col,
    flowers: col.flowers.map((fl) => (fl.isLocked ? { ...fl, isLocked: false } : fl)),
  }));
}

// Check if current goals are met
export function checkLevelGoalsMet(
  columns: GardenColumnData[],
  goals: LevelGoal[],
  createdHistory: { color: string; stage: number }[]
): { completed: boolean; progress: { target: LevelGoal; current: number }[] } {
  const progress = goals.map((goal) => {
    let count = 0;

    // Check board
    columns.forEach((col) => {
      col.flowers.forEach((fl) => {
        if (fl.stage >= goal.stage) {
          if (!goal.color || fl.color === goal.color) {
            count++;
          }
        }
      });
    });

    return {
      target: goal,
      current: Math.min(goal.targetCount, count),
    };
  });

  const completed = progress.every((p) => p.current >= p.target.targetCount);
  return { completed, progress };
}

// Intelligent Hint Finder (supports sub-stacks and downward stacking)
export function findBestHintMove(
  columns: GardenColumnData[]
): { fromColIdx: number; fromFlowerIdx: number; toColIdx: number } | null {
  // 1. Look for a sub-stack move that immediately triggers a 3-stack merge
  for (let fromIdx = 0; fromIdx < columns.length; fromIdx++) {
    const fromCol = columns[fromIdx];
    if (fromCol.flowers.length === 0) continue;

    for (let fIdx = 0; fIdx < fromCol.flowers.length; fIdx++) {
      const movingFlower = fromCol.flowers[fIdx];
      if (movingFlower.isLocked) continue;

      for (let toIdx = 0; toIdx < columns.length; toIdx++) {
        if (fromIdx === toIdx) continue;
        const toCol = columns[toIdx];

        if (isValidSubStackMove(fromCol, fIdx, toCol).valid) {
          const subStack = fromCol.flowers.slice(fIdx);
          const testCol: GardenColumnData = {
            ...toCol,
            flowers: [...toCol.flowers, ...subStack],
          };
          const { didMerge } = checkAndPerformMerge(testCol);
          if (didMerge) {
            return { fromColIdx: fromIdx, fromFlowerIdx: fIdx, toColIdx: toIdx };
          }
        }
      }
    }
  }

  // 2. Look for a move that pairs flowers of the same color/stage together
  for (let fromIdx = 0; fromIdx < columns.length; fromIdx++) {
    const fromCol = columns[fromIdx];
    if (fromCol.flowers.length === 0) continue;

    for (let fIdx = 0; fIdx < fromCol.flowers.length; fIdx++) {
      const movingFlower = fromCol.flowers[fIdx];
      if (movingFlower.isLocked) continue;

      for (let toIdx = 0; toIdx < columns.length; toIdx++) {
        if (fromIdx === toIdx) continue;
        const toCol = columns[toIdx];

        if (toCol.flowers.length > 0 && isValidSubStackMove(fromCol, fIdx, toCol).valid) {
          const bottomTo = toCol.flowers[toCol.flowers.length - 1];
          if (movingFlower.color === bottomTo.color && movingFlower.stage === bottomTo.stage) {
            return { fromColIdx: fromIdx, fromFlowerIdx: fIdx, toColIdx: toIdx };
          }
        }
      }
    }
  }

  // 3. Fallback: Move to an empty column to unlock buried flowers
  for (let fromIdx = 0; fromIdx < columns.length; fromIdx++) {
    const fromCol = columns[fromIdx];
    if (fromCol.flowers.length <= 1) continue;

    for (let fIdx = 1; fIdx < fromCol.flowers.length; fIdx++) {
      const movingFlower = fromCol.flowers[fIdx];
      if (movingFlower.isLocked) continue;

      for (let toIdx = 0; toIdx < columns.length; toIdx++) {
        if (fromIdx === toIdx) continue;
        const toCol = columns[toIdx];
        if (isValidSubStackMove(fromCol, fIdx, toCol).valid) {
          return { fromColIdx: fromIdx, fromFlowerIdx: fIdx, toColIdx: toIdx };
        }
      }
    }
  }

  // 4. Any valid bottom move
  for (let fromIdx = 0; fromIdx < columns.length; fromIdx++) {
    const fromCol = columns[fromIdx];
    if (fromCol.flowers.length === 0) continue;
    const lastIdx = fromCol.flowers.length - 1;
    for (let toIdx = 0; toIdx < columns.length; toIdx++) {
      if (fromIdx === toIdx) continue;
      const toCol = columns[toIdx];
      if (isValidSubStackMove(fromCol, lastIdx, toCol).valid) {
        return { fromColIdx: fromIdx, fromFlowerIdx: lastIdx, toColIdx: toIdx };
      }
    }
  }

  return null;
}
