export type FlowerColor = 'pink' | 'blue' | 'yellow' | 'purple' | 'orange' | 'red';

export type FlowerStage = 1 | 2 | 3 | 4 | 5 | 6;
// Stage 1: 🌱 Bud
// Stage 2: 🌷 Small Flower
// Stage 3: 🌸 Blossom
// Stage 4: 🌺 Large Blossom
// Stage 5: 🌻 Rare Flower
// Stage 6: ✨ Magical Flower

export interface FlowerItem {
  id: string;
  color: FlowerColor;
  stage: FlowerStage;
  isWild?: boolean;       // Can match any color once
  isFrozen?: boolean;     // Encased in ice, must thaw
  isRainbow?: boolean;    // Adapts to color needed
  isLocked?: boolean;     // Locked with vine until an objective is met
}

export interface GardenColumnData {
  id: number;
  capacity: number;
  flowers: FlowerItem[];
}

export interface LevelGoal {
  color?: FlowerColor;
  stage: FlowerStage;
  targetCount: number;
  currentCount?: number;
  isRainbowOrAny?: boolean;
}

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  columns: {
    capacity: number;
    initialFlowers: {
      color: FlowerColor;
      stage: FlowerStage;
      isWild?: boolean;
      isFrozen?: boolean;
      isRainbow?: boolean;
      isLocked?: boolean;
    }[];
  }[];
  goals: LevelGoal[];
  targetBloomStage?: FlowerStage; // Stage needed in each column for level completion (default 3: Blossom)
  starThresholds: {
    threeStars: number; // max moves for 3 stars
    twoStars: number;   // max moves for 2 stars
  };
  tutorialTip?: string;
  specialFeatureIntroduced?: string;
}

export interface LevelSaveRecord {
  completed: boolean;
  stars: number;
  bestMoves: number;
}

export interface UserSaveData {
  currentLevel: number;
  levels: Record<number, LevelSaveRecord>;
  unlockedFlowers: Record<string, boolean>; // key: `${color}_${stage}`
  hintsRemaining: number;
  settings: {
    soundEnabled: boolean;
    musicEnabled: boolean;
    vibrationEnabled: boolean;
  };
}

export type ViewState = 'menu' | 'playing' | 'levels' | 'garden' | 'settings';
