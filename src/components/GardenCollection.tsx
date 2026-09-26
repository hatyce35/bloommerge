import React, { useState } from 'react';
import { ArrowLeft, Sparkles, BookOpen, Lock } from 'lucide-react';
import { FLOWER_FAMILIES, FlowerMeta } from '../data/flowerFamilies';
import { FlowerColor, FlowerStage, UserSaveData } from '../types/game';
import { FlowerRenderer } from './FlowerRenderer';

interface GardenCollectionProps {
  saveData: UserSaveData;
  onBackToMenu: () => void;
}

export const GardenCollection: React.FC<GardenCollectionProps> = ({
  saveData,
  onBackToMenu,
}) => {
  const [selectedColor, setSelectedColor] = useState<FlowerColor>('pink');
  const [inspectedFlower, setInspectedFlower] = useState<{
    color: FlowerColor;
    stage: FlowerStage;
  } | null>(null);

  const currentFamily: FlowerMeta = FLOWER_FAMILIES[selectedColor];
  const stages: FlowerStage[] = [1, 2, 3, 4, 5, 6];

  // Count total discovered flowers across all families
  const allCombinations: string[] = [];
  (['pink', 'blue', 'yellow', 'purple', 'orange', 'red'] as FlowerColor[]).forEach((col) => {
    stages.forEach((st) => {
      allCombinations.push(`${col}_${st}`);
    });
  });

  const discoveredCount = allCombinations.filter((key) => saveData.unlockedFlowers[key]).length;

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto px-4 py-4 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 border-b border-emerald-900/10 mb-3">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/70 hover:bg-white text-emerald-900 font-medium text-xs shadow-xs border border-emerald-200/80 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700" />
          <span>Menu</span>
        </button>

        <h1 className="text-lg font-bold text-emerald-950 font-display">
          Garden Herbarium
        </h1>

        <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
          <span className="tabular-nums">{discoveredCount} / {allCombinations.length}</span>
        </div>
      </div>

      {/* Flower Family Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 pb-2 no-scrollbar">
        {(['pink', 'blue', 'yellow', 'purple', 'orange', 'red'] as FlowerColor[]).map((col) => {
          const fam = FLOWER_FAMILIES[col];
          const isSelected = selectedColor === col;
          return (
            <button
              key={col}
              onClick={() => setSelectedColor(col)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-emerald-900 text-white shadow-sm ring-2 ring-emerald-600/30'
                  : 'bg-white/70 hover:bg-white text-emerald-900/80 border border-emerald-200/60'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: fam.themeColor }}
              />
              <span>{fam.familyName.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Family Lore Banner */}
      <div className="bg-white/60 backdrop-blur-xs rounded-2xl p-3 border border-emerald-100 shadow-xs my-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-emerald-950">{currentFamily.familyName}</h2>
          <span className="text-[11px] italic text-emerald-700/80">{currentFamily.botanicalName}</span>
        </div>
        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
          {currentFamily.lore}
        </p>
      </div>

      {/* Stages Grid (1 to 6) */}
      <div className="flex-1 overflow-y-auto pr-1 pb-6 grid grid-cols-2 gap-3 mt-1">
        {stages.map((st) => {
          const unlockKey = `${selectedColor}_${st}`;
          const isUnlocked = !!saveData.unlockedFlowers[unlockKey];
          const stageName = currentFamily.stageNames[st];

          return (
            <div
              key={st}
              onClick={() => isUnlocked && setInspectedFlower({ color: selectedColor, stage: st })}
              className={`rounded-2xl p-3 border transition-all flex flex-col items-center justify-between text-center relative ${
                isUnlocked
                  ? 'bg-white/80 border-emerald-200/90 shadow-sm hover:shadow-md cursor-pointer hover:border-emerald-300 group'
                  : 'bg-stone-100/60 border-stone-200/80 opacity-60'
              }`}
            >
              {/* Stage Badge */}
              <div className="w-full flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  Stage {st}
                </span>
                {isUnlocked ? (
                  <Sparkles className="w-3 h-3 text-amber-500 opacity-60 group-hover:opacity-100" />
                ) : (
                  <Lock className="w-3 h-3 text-stone-400" />
                )}
              </div>

              {/* Flower Visual */}
              <div className="my-2 h-16 flex items-center justify-center">
                {isUnlocked ? (
                  <FlowerRenderer
                    color={selectedColor}
                    stage={st}
                    size={58}
                    className="group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-400">
                    <Lock className="w-5 h-5 text-stone-300" />
                  </div>
                )}
              </div>

              {/* Title & Discovery Info */}
              <div className="w-full mt-1">
                <h3 className="text-xs font-bold text-emerald-950 truncate">
                  {isUnlocked ? stageName : 'Undiscovered'}
                </h3>
                <span className="text-[10px] text-stone-500 block mt-0.5">
                  {isUnlocked ? 'Discovered in garden' : 'Merge in higher levels'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flower Inspection Modal */}
      {inspectedFlower && (
        <div
          onClick={() => setInspectedFlower(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs rounded-3xl bg-gradient-to-b from-white to-emerald-50 p-6 shadow-2xl border-2 border-emerald-200 text-center relative"
          >
            <div className="relative my-3 p-6 rounded-full bg-emerald-50 shadow-inner flex items-center justify-center mx-auto w-32 h-32">
              <FlowerRenderer
                color={inspectedFlower.color}
                stage={inspectedFlower.stage}
                size={84}
                className="animate-gentle-sway drop-shadow-md"
              />
            </div>

            <h3 className="text-lg font-bold text-emerald-950 font-display mt-2">
              {FLOWER_FAMILIES[inspectedFlower.color].stageNames[inspectedFlower.stage]}
            </h3>
            <p className="text-xs italic text-emerald-700/80 mb-2">
              {FLOWER_FAMILIES[inspectedFlower.color].botanicalName} · Stage {inspectedFlower.stage}
            </p>
            <p className="text-xs text-stone-600 leading-relaxed px-2">
              {FLOWER_FAMILIES[inspectedFlower.color].lore}
            </p>

            <button
              onClick={() => setInspectedFlower(null)}
              className="mt-5 w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
