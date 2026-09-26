import React from 'react';
import { Star, Lock, ArrowLeft } from 'lucide-react';
import { LEVELS } from '../data/levels';
import { UserSaveData } from '../types/game';

interface LevelSelectProps {
  saveData: UserSaveData;
  onSelectLevel: (levelId: number) => void;
  onBackToMenu: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  saveData,
  onSelectLevel,
  onBackToMenu,
}) => {
  // Compute total stars
  const totalStars = Object.values(saveData.levels).reduce((acc, curr) => acc + (curr?.stars || 0), 0);
  const maxPossibleStars = LEVELS.length * 3;

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-4 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 border-b border-emerald-900/10 mb-4">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/70 hover:bg-white text-emerald-900 font-medium text-xs shadow-xs border border-emerald-200/80 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700" />
          <span>Menu</span>
        </button>

        <h1 className="text-lg font-bold text-emerald-950 font-display">
          Garden Map
        </h1>

        {/* Stars pill */}
        <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span className="tabular-nums">{totalStars} / {maxPossibleStars}</span>
        </div>
      </div>

      {/* Scrolling Level Grid */}
      <div className="flex-1 overflow-y-auto pr-1 pb-8 space-y-6">
        {/* Chapters */}
        {[
          { title: 'The Sprout Meadow', levels: LEVELS.slice(0, 10), subtitle: 'Levels 1–10' },
          { title: 'The Amber Terrace', levels: LEVELS.slice(10, 20), subtitle: 'Levels 11–20' },
          { title: 'The Enchanted Arbor', levels: LEVELS.slice(20, 30), subtitle: 'Levels 21–30' },
        ].map((chapter, cIdx) => (
          <div key={cIdx} className="bg-white/50 backdrop-blur-xs rounded-2xl p-4 border border-emerald-100 shadow-xs">
            <div className="flex items-baseline justify-between mb-3 px-1">
              <h2 className="text-sm font-bold text-emerald-900">{chapter.title}</h2>
              <span className="text-[11px] text-emerald-700/70 font-medium">{chapter.subtitle}</span>
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {chapter.levels.map((lvl) => {
                const record = saveData.levels[lvl.id];
                const isCompleted = record?.completed;
                const stars = record?.stars || 0;
                // Level is unlocked if it's level 1, or previous level is completed
                const isUnlocked = lvl.id === 1 || !!saveData.levels[lvl.id - 1]?.completed;
                const isCurrent = lvl.id === saveData.currentLevel;

                return (
                  <button
                    key={lvl.id}
                    disabled={!isUnlocked}
                    onClick={() => onSelectLevel(lvl.id)}
                    className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                      !isUnlocked
                        ? 'bg-stone-200/60 border border-stone-300 text-stone-400 cursor-not-allowed opacity-60'
                        : isCurrent
                        ? 'bg-gradient-to-b from-amber-200 to-amber-300 border-2 border-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300/60 scale-105'
                        : isCompleted
                        ? 'bg-gradient-to-b from-emerald-100 to-teal-100 border border-emerald-300 text-emerald-900 shadow-xs hover:scale-105'
                        : 'bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-xs hover:scale-105'
                    }`}
                  >
                    {!isUnlocked ? (
                      <Lock className="w-4 h-4 text-stone-400" />
                    ) : (
                      <>
                        <span className="text-sm font-bold leading-none mb-1 tabular-nums">
                          {lvl.id}
                        </span>

                        {/* Stars preview */}
                        {isCompleted && (
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                className={`w-2.5 h-2.5 ${
                                  s <= stars
                                    ? 'fill-amber-400 text-amber-500'
                                    : 'text-stone-300'
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {isCurrent && !isCompleted && (
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
