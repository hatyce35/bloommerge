import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, ArrowRight, Grid } from 'lucide-react';
import { FlowerRenderer } from './FlowerRenderer';
import { FlowerColor, FlowerStage } from '../types/game';

interface LevelCompleteModalProps {
  levelNumber: number;
  moves: number;
  bestMoves: number;
  stars: number;
  targetFlower: { color: FlowerColor; stage: FlowerStage };
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onGoToLevels: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  levelNumber,
  moves,
  bestMoves,
  stars,
  targetFlower,
  hasNextLevel,
  onNextLevel,
  onReplay,
  onGoToLevels,
}) => {
  // Fire gentle floral petal confetti
  useEffect(() => {
    // Flower petal pastel confetti
    const colors = ['#f472b6', '#38bdf8', '#fbbf24', '#c084fc', '#fb923c', '#4ade80'];

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 200,
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-amber-50 to-emerald-50 p-6 shadow-2xl border-2 border-emerald-200/80 text-center overflow-hidden">
        {/* Soft Background Sun Halo */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-amber-300/30 blur-2xl pointer-events-none" />

        {/* Floating Celebration Header */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Blooming Centerpiece */}
          <div className="relative my-2 p-3 rounded-full bg-white/70 shadow-inner border border-emerald-100 flex items-center justify-center">
            <div className="animate-spin duration-[16000ms] absolute inset-0 rounded-full border border-dashed border-amber-300 opacity-60" />
            <FlowerRenderer
              color={targetFlower.color}
              stage={targetFlower.stage}
              size={68}
              className="animate-bounce duration-1000"
            />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-emerald-950 mt-2 font-display">
            BÖLÜM TAMAMLANDI! 🌸
          </h2>
          <p className="text-xs font-semibold text-emerald-700 mt-0.5">
            Tüm Sütunlarda Büyük Çiçekler Açtı! (Seviye {levelNumber})
          </p>

          {/* Stars Awarded */}
          <div className="flex items-center justify-center gap-3 my-4">
            {[1, 2, 3].map((starNum) => {
              const isEarned = starNum <= stars;
              return (
                <div
                  key={starNum}
                  className={`transition-all duration-500 transform ${
                    isEarned
                      ? 'scale-110 drop-shadow-[0_4px_10px_rgba(251,191,36,0.6)]'
                      : 'scale-90 opacity-30 grayscale'
                  }`}
                  style={{ transitionDelay: `${starNum * 150}ms` }}
                >
                  <Star
                    className={`w-9 h-9 ${
                      isEarned
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-stone-400'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Moves Comparison Card */}
          <div className="w-full bg-white/70 rounded-2xl p-3 border border-emerald-100/80 flex items-center justify-around my-2 shadow-xs">
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-medium text-stone-500">Moves Used</span>
              <span className="text-lg font-bold text-emerald-900 tabular-nums">{moves}</span>
            </div>
            <div className="h-6 w-px bg-emerald-200" />
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-medium text-stone-500">Best Moves</span>
              <span className="text-lg font-bold text-amber-700 tabular-nums">
                {bestMoves === 0 ? moves : Math.min(moves, bestMoves)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-2 mt-4">
            {hasNextLevel && (
              <button
                onClick={onNextLevel}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Sonraki Seviye (Farklı Tohumlar)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={onReplay}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tekrar Oyna</span>
              </button>

              <button
                onClick={onGoToLevels}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Grid className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bölümler</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
