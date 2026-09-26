import { UserSaveData } from '../types/game';

const SAVE_KEY = 'bloom_merge_save_v1';

export const DEFAULT_SAVE_DATA: UserSaveData = {
  currentLevel: 1,
  levels: {
    1: { completed: false, stars: 0, bestMoves: 0 }
  },
  unlockedFlowers: {
    'pink_1': true,
    'blue_1': true,
  },
  hintsRemaining: 5,
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    vibrationEnabled: true,
  }
};

export function loadSaveData(): UserSaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return DEFAULT_SAVE_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SAVE_DATA,
      ...parsed,
      levels: { ...DEFAULT_SAVE_DATA.levels, ...(parsed.levels || {}) },
      unlockedFlowers: { ...DEFAULT_SAVE_DATA.unlockedFlowers, ...(parsed.unlockedFlowers || {}) },
      settings: { ...DEFAULT_SAVE_DATA.settings, ...(parsed.settings || {}) },
    };
  } catch {
    return DEFAULT_SAVE_DATA;
  }
}

export function saveGameData(data: UserSaveData) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export function resetGameProgress(): UserSaveData {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // Ignore
  }
  return DEFAULT_SAVE_DATA;
}
