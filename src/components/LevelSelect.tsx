import React, { useRef, useEffect } from 'react';
import { Star, Lock, ArrowLeft, Compass } from 'lucide-react';
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
  const currentLevelRef = useRef<HTMLButtonElement | null>(null);

  // Compute total stars
  const totalStars = Object.values(saveData.levels).reduce((acc, curr) => acc + (curr?.stars || 0), 0);
  const maxPossibleStars = LEVELS.length * 3;

  // Auto-scroll to current level on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLevelRef.current) {
        currentLevelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const CHAPTER_NAMES = [
    'Filiz Bahçesi',
    'Kelebek Vadisi',
    'Amber Terası',
    'Nilüfer Göleti',
    'Güneş Bahçesi',
    'Mor Salkım Köşkü',
    'Zümrüt Labirent',
    'Kristal Çardak',
    'Lavanta Yaylası',
    'Orkide Sarayı',
    'Büyülü Çiçeklik',
    'Şafak Vadisi',
    'Mercan Serası',
    'Altın Çardak',
    'Gökkuşağı Çayırı',
    'Masal Koruluğu',
    'Sonsuzluk Bahçesi',
    'Efsunlu Vaha',
    'Cennet Çiçekliği',
    'Usta Bahçıvan Zirvesi',
  ];

  // Group all 200 levels into chapters of 10 levels
  const chapters = Array.from({ length: Math.ceil(LEVELS.length / 10) }).map((_, cIdx) => {
    const startLvl = cIdx * 10 + 1;
    const endLvl = Math.min(LEVELS.length, (cIdx + 1) * 10);
    const chapterLevels = LEVELS.slice(cIdx * 10, (cIdx + 1) * 10);
    return {
      title: CHAPTER_NAMES[cIdx] || `Bahar Bahçesi ${cIdx + 1}`,
      subtitle: `Seviye ${startLvl}–${endLvl}`,
      levels: chapterLevels,
    };
  });

  const handleScrollToCurrent = () => {
    if (currentLevelRef.current) {
      currentLevelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-4 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 border-b border-emerald-900/10 mb-3">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/70 hover:bg-white text-emerald-900 font-medium text-xs shadow-xs border border-emerald-200/80 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700" />
          <span>Menü</span>
        </button>

        <h1 className="text-base font-extrabold text-emerald-950 font-display">
          Bahçe Haritası (200 Seviye)
        </h1>

        {/* Stars pill */}
        <div className="flex items-center gap-1 py-1 px-2.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span className="tabular-nums">{totalStars} / {maxPossibleStars}</span>
        </div>
      </div>

      {/* Quick Jump Bar */}
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-emerald-100 mb-3">
        <span className="text-[11px] font-bold text-emerald-900">
          Mevcut: Seviye {saveData.currentLevel} / 200
        </span>
        <button
          onClick={handleScrollToCurrent}
          className="flex items-center gap-1 py-1 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold shadow-xs transition-colors cursor-pointer"
        >
          <Compass className="w-3 h-3" />
          <span>Seviyeme Git</span>
        </button>
      </div>

      {/* Scrolling Level Grid */}
      <div className="flex-1 overflow-y-auto pr-1 pb-8 space-y-5">
        {chapters.map((chapter, cIdx) => (
          <div key={cIdx} className="bg-white/50 backdrop-blur-xs rounded-2xl p-4 border border-emerald-100 shadow-xs">
            <div className="flex items-baseline justify-between mb-3 px-1">
              <h2 className="text-sm font-bold text-emerald-900">{chapter.title}</h2>
              <span className="text-[11px] text-emerald-700/70 font-semibold">{chapter.subtitle}</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {chapter.levels.map((lvl) => {
                const record = saveData.levels[lvl.id];
                const isCompleted = record?.completed;
                const stars = record?.stars || 0;
                const isUnlocked = lvl.id === 1 || !!saveData.levels[lvl.id - 1]?.completed;
                const isCurrent = lvl.id === saveData.currentLevel;

                return (
                  <button
                    key={lvl.id}
                    ref={isCurrent ? currentLevelRef : undefined}
                    disabled={!isUnlocked}
                    onClick={() => onSelectLevel(lvl.id)}
                    className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                      !isUnlocked
                        ? 'bg-stone-200/60 border border-stone-300 text-stone-400 cursor-not-allowed opacity-60'
                        : isCurrent
                        ? 'bg-gradient-to-b from-amber-200 to-amber-300 border-2 border-amber-500 text-amber-950 shadow-md ring-2 ring-amber-300/60 scale-105'
                        : isCompleted
                        ? 'bg-gradient-to-b from-emerald-100 to-teal-100 border border-emerald-300 text-emerald-900 shadow-xs hover:scale-105'
                        : 'bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-xs hover:scale-105'
                    }`}
                  >
                    {!isUnlocked ? (
                      <Lock className="w-3.5 h-3.5 text-stone-400" />
                    ) : (
                      <>
                        <span className="text-xs font-black leading-none mb-0.5 tabular-nums">
                          {lvl.id}
                        </span>

                        {/* Stars preview */}
                        {isCompleted && (
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {[1, 2, 3].map((s) => (
                              <Star
                                key={s}
                                className={`w-2 h-2 ${
                                  s <= stars
                                    ? 'fill-amber-400 text-amber-500'
                                    : 'text-stone-300'
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {isCurrent && !isCompleted && (
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping mt-0.5" />
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
