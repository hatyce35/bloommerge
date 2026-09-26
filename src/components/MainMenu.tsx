import React from 'react';
import { Play, Grid, BookOpen, Settings, Star, Sparkles } from 'lucide-react';
import { UserSaveData } from '../types/game';
import { FlowerRenderer } from './FlowerRenderer';
import { LEVELS } from '../data/levels';

interface MainMenuProps {
  saveData: UserSaveData;
  onPlay: () => void;
  onOpenLevels: () => void;
  onOpenGarden: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  saveData,
  onPlay,
  onOpenLevels,
  onOpenGarden,
  onOpenSettings,
}) => {
  const totalStars = Object.values(saveData.levels).reduce((acc, curr) => acc + (curr?.stars || 0), 0);
  const discoveredCount = Object.keys(saveData.unlockedFlowers).length;

  return (
    <div className="flex flex-col items-center justify-between h-full w-full max-w-sm mx-auto px-6 py-8 select-none text-emerald-950">
      {/* Top Bar with Settings quick-action */}
      <div className="w-full flex items-center justify-end">
        <button
          onClick={onOpenSettings}
          className="p-2.5 rounded-full bg-white/70 hover:bg-white border border-emerald-200/80 shadow-xs text-emerald-800 transition-all cursor-pointer"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Brand & Logo Area */}
      <div className="flex flex-col items-center text-center my-auto">
        {/* Animated Floral Emblem */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-100 via-pink-100 to-sky-100 shadow-xl border-4 border-white/90 flex items-center justify-center animate-gentle-sway">
            <FlowerRenderer
              color="pink"
              stage={4}
              size={78}
            />
          </div>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-6 h-6 text-amber-500 animate-bounce duration-1000" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-emerald-950 font-display">
          Bloom Merge
        </h1>
        <p className="text-xs font-medium text-emerald-700 mt-1 max-w-[240px]">
          Sort flowers vertically, merge petals, and grow your magical garden.
        </p>

        {/* Player Progress Snapshot Card */}
        <div className="w-full mt-6 bg-white/75 backdrop-blur-xs rounded-2xl p-3.5 border border-emerald-100/90 shadow-xs flex items-center justify-around">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-medium text-stone-500">Current</span>
            <span className="text-sm font-bold text-emerald-900 tabular-nums">Level {saveData.currentLevel}</span>
          </div>
          <div className="h-7 w-px bg-emerald-100" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-medium text-stone-500">Stars</span>
            <span className="text-sm font-bold text-amber-700 flex items-center gap-1 tabular-nums">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              {totalStars}
            </span>
          </div>
          <div className="h-7 w-px bg-emerald-100" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-medium text-stone-500">Herbarium</span>
            <span className="text-sm font-bold text-teal-800 tabular-nums">{discoveredCount} / 36</span>
          </div>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="w-full flex flex-col gap-3 mt-auto pt-4">
        {/* Play Button */}
        <button
          onClick={onPlay}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white font-bold text-base shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>Play Level {saveData.currentLevel}</span>
        </button>

        {/* Secondary Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onOpenLevels}
            className="py-3 px-4 rounded-xl bg-white/80 hover:bg-white active:scale-98 border border-emerald-200/90 text-emerald-900 font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Grid className="w-4 h-4 text-emerald-700" />
            <span>Levels ({LEVELS.length})</span>
          </button>

          <button
            onClick={onOpenGarden}
            className="py-3 px-4 rounded-xl bg-white/80 hover:bg-white active:scale-98 border border-emerald-200/90 text-emerald-900 font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Garden</span>
          </button>
        </div>
      </div>
    </div>
  );
};
