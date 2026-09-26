import React from 'react';
import { GardenColumnData } from '../types/game';
import { FlowerRenderer } from './FlowerRenderer';

interface GardenColumnProps {
  column: GardenColumnData;
  isSelectedSource: boolean;
  selectedFlowerIndex: number | null; // which flower starts the selected sub-stack
  isHintSource?: boolean;
  hintFlowerIndex?: number | null;
  isHintTarget?: boolean;
  isHoveredDropTarget?: boolean;
  isDropValid?: boolean;
  isShaking?: boolean;
  hasBigFlower?: boolean; // Has this column grown a mature bloom (en büyük çiçek)?
  onPointerDownFlower: (colId: number, flowerIdx: number, e: React.PointerEvent) => void;
  onColumnClick: (colId: number) => void;
  compactMode?: boolean;
  draggedSubStackInfo?: { colId: number; fromIndex: number } | null;
}

export const GardenColumn: React.FC<GardenColumnProps> = ({
  column,
  isSelectedSource,
  selectedFlowerIndex,
  isHintSource = false,
  hintFlowerIndex = null,
  isHintTarget = false,
  isHoveredDropTarget = false,
  isDropValid = true,
  isShaking = false,
  onPointerDownFlower,
  onColumnClick,
  compactMode = false,
  draggedSubStackInfo = null,
  hasBigFlower = false,
}) => {
  const flowerSize = compactMode ? 46 : 54;

  // Check if this column is the one currently being dragged from
  const isBeingDragged = draggedSubStackInfo?.colId === column.id;
  const dragStartIndex = draggedSubStackInfo?.fromIndex ?? -1;

  return (
    <div
      data-col-id={column.id}
      onClick={() => onColumnClick(column.id)}
      className={`relative flex flex-col items-center cursor-pointer select-none group transition-all duration-150 ${
        isShaking ? 'animate-bounce text-red-500' : ''
      }`}
      style={{
        minWidth: compactMode ? '52px' : '66px',
        maxWidth: compactMode ? '62px' : '78px',
        touchAction: 'none',
      }}
    >
      {/* Top Garden Pergola / Wooden Arbor Hanger (Flowers hang downwards from here!) */}
      <div className="relative w-full flex flex-col items-center z-20">
        {/* Mature Bloom Badge (En Büyük Çiçek Açtı!) */}
        {hasBigFlower ? (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 rounded-full text-[10px] font-extrabold shadow-md ring-2 ring-amber-300/80 animate-pulse whitespace-nowrap">
            <span>🌸</span>
            <span>Tamam</span>
          </div>
        ) : (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] text-stone-400 opacity-60">
            🌱
          </div>
        )}

        {/* Horizontal Wooden Beam of Pergola */}
        <div
          className={`w-[110%] h-3.5 rounded-t-lg shadow-sm flex items-center justify-between px-1 border-b transition-colors ${
            hasBigFlower
              ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 border-amber-300 ring-1 ring-amber-400/50'
              : 'bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 border-amber-900/30'
          }`}
        >
          <div className="w-1 h-1.5 rounded-xs bg-amber-950/40" />
          <div className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                hasBigFlower ? 'bg-amber-200 animate-ping' : 'bg-emerald-400 opacity-80'
              }`}
            />
            <span className="w-1 h-1 rounded-full bg-emerald-300 opacity-60" />
          </div>
          <div className="w-1 h-1.5 rounded-xs bg-amber-950/40" />
        </div>

        {/* Ornate Brass/Bronze Hanging Hook */}
        <div className="w-3 h-3 border-x-2 border-b-2 border-amber-900 rounded-b-full flex items-center justify-center -mt-0.5 bg-amber-700/60 shadow-xs">
          <div className={`w-1 h-1 rounded-full ${hasBigFlower ? 'bg-amber-200' : 'bg-amber-300'}`} />
        </div>
      </div>

      {/* Downward Vine Trellis & Flower Hanging Area */}
      <div
        className={`relative flex flex-col items-center justify-start w-full rounded-2xl pt-2 pb-4 min-h-[220px] transition-all duration-200 ${
          isHoveredDropTarget
            ? isDropValid
              ? 'bg-emerald-100/70 border-2 border-emerald-500 shadow-lg ring-2 ring-emerald-400/50 scale-[1.02]'
              : 'bg-rose-100/60 border-2 border-rose-400 shadow-md ring-2 ring-rose-300/40'
            : isSelectedSource
            ? 'bg-amber-100/40 border-2 border-amber-400 shadow-md ring-2 ring-amber-300/40'
            : isHintSource
            ? 'bg-amber-50/60 border-2 border-amber-400/80 shadow-sm animate-pulse'
            : isHintTarget
            ? 'bg-emerald-50/70 border-2 border-emerald-400 shadow-sm ring-2 ring-emerald-300/50'
            : 'bg-white/40 border border-emerald-200/60 hover:bg-white/60 hover:border-emerald-300'
        }`}
      >
        {/* Continuous Central Hanging Vine with Leaves */}
        <div className="absolute inset-y-1 left-1/2 -translate-x-1/2 w-1.5 bg-emerald-700/20 rounded-full pointer-events-none" />

        {/* Decorative Ivy Leaves Along Vine */}
        <div className="absolute top-8 left-1.5 w-2.5 h-1.5 bg-emerald-600/40 rounded-full transform -rotate-30 pointer-events-none" />
        <div className="absolute top-20 right-1.5 w-2.5 h-1.5 bg-emerald-600/40 rounded-full transform rotate-30 pointer-events-none" />
        <div className="absolute top-36 left-1.5 w-2.5 h-1.5 bg-emerald-600/40 rounded-full transform -rotate-20 pointer-events-none" />
        <div className="absolute top-52 right-1.5 w-2.5 h-1.5 bg-emerald-600/40 rounded-full transform rotate-25 pointer-events-none" />

        {/* Stack of Flowers Hanging Downwards: Index 0 is Top, following flowers attach below! */}
        {column.flowers.map((flower, idx) => {
          // If this flower is part of active drag, hide or dim it in place
          const isPartOfDrag = isBeingDragged && idx >= dragStartIndex;

          // Check if this flower is part of the selected sub-stack
          const isSelectedInSubStack =
            isSelectedSource && selectedFlowerIndex !== null && idx >= selectedFlowerIndex;

          const isHintedFlower = isHintSource && hintFlowerIndex === idx;

          return (
            <div
              key={flower.id}
              data-flower-idx={idx}
              onPointerDown={(e) => {
                e.stopPropagation();
                onPointerDownFlower(column.id, idx, e);
              }}
              className={`relative z-10 transition-all duration-150 cursor-grab active:cursor-grabbing ${
                idx > 0 ? '-mt-2.5' : ''
              } ${isPartOfDrag ? 'opacity-20 scale-95' : ''}`}
              style={{ touchAction: 'none' }}
            >
              {/* Little Connecting Green Vine Stem above each flower */}
              {idx > 0 && (
                <div className="w-1 h-3 bg-emerald-600/50 mx-auto -mb-1 rounded-full pointer-events-none" />
              )}

              <FlowerRenderer
                color={flower.color}
                stage={flower.stage}
                isWild={flower.isWild}
                isFrozen={flower.isFrozen}
                isRainbow={flower.isRainbow}
                isLocked={flower.isLocked}
                isSelected={isSelectedInSubStack}
                isHinted={isHintedFlower}
                size={flowerSize}
              />
            </div>
          );
        })}

        {/* Empty Column Indicator */}
        {column.flowers.length === 0 && (
          <div className="flex flex-col items-center justify-center my-auto py-8 text-emerald-600/35 pointer-events-none">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2v20m0 0l-4-4m4 4l4-4" />
            </svg>
            <span className="text-[10px] tracking-wide font-medium mt-1">Empty Vine</span>
          </div>
        )}
      </div>

      {/* Hanging Vine Leaf Drop Terminal at bottom */}
      <div className="relative -mt-1 flex flex-col items-center pointer-events-none">
        <div className="w-2.5 h-3.5 bg-emerald-600/60 rounded-b-full shadow-xs flex items-center justify-center">
          <div className="w-1 h-1.5 bg-emerald-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};
