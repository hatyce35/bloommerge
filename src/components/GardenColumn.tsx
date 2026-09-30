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
  flowerSize?: number;
  columnWidth?: number;
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
  flowerSize = 64,
  columnWidth = 78,
  draggedSubStackInfo = null,
  hasBigFlower = false,
}) => {
  // Check if this column is the one currently being dragged from
  const isBeingDragged = draggedSubStackInfo?.colId === column.id;
  const dragStartIndex = draggedSubStackInfo?.fromIndex ?? -1;

  return (
    <div
      data-col-id={column.id}
      onClick={() => onColumnClick(column.id)}
      className={`relative flex flex-col items-center cursor-pointer select-none ${
        isShaking ? 'ring-2 ring-rose-400' : ''
      }`}
      style={{
        width: `${columnWidth}px`,
        minWidth: `${columnWidth}px`,
        maxWidth: `${columnWidth}px`,
        flexShrink: 0,
        touchAction: 'none',
      }}
    >
      {/* Top Garden Pergola / Wooden Arbor Hanger (Flowers hang downwards from here!) */}
      <div className="relative w-full flex flex-col items-center z-20">
        {/* Mature Bloom Badge (En Büyük Çiçek Açtı!) */}
        {hasBigFlower ? (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-950 rounded-full text-[11px] font-black shadow-md ring-1 ring-amber-400/90 whitespace-nowrap">
            <span>🌸</span>
            <span>Açtı</span>
          </div>
        ) : (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[12px] text-stone-400 opacity-60">
            🌱
          </div>
        )}

        {/* Rounded Wooden Hanger Tab with Brass Button (Screenshot exact style) */}
        <div className="w-5 h-4.5 rounded-b-md bg-[#b45309] border-x border-b border-[#78350f] shadow-xs flex items-center justify-center -mt-0.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#fde047] border border-[#ca8a04] shadow-xs" />
        </div>
      </div>

      {/* Downward Vine Trellis & Flower Hanging Area (Dynamically lengthens as flowers are added) */}
      <div
        className={`relative flex flex-col items-center justify-start w-full rounded-3xl pt-2 pb-2 min-h-[220px] h-auto transition-all duration-200 ${
          isHoveredDropTarget
            ? isDropValid
              ? 'bg-[#d1fae5]/95 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-400/50'
              : 'bg-rose-100/90 border-2 border-rose-400 shadow-sm ring-2 ring-rose-300/40'
            : isSelectedSource
            ? 'bg-amber-100/80 border-2 border-amber-400 shadow-sm ring-2 ring-amber-300/50'
            : isHintSource
            ? 'bg-amber-50/90 border-2 border-amber-400 shadow-xs'
            : isHintTarget
            ? 'bg-[#d1fae5]/95 border-2 border-emerald-400 shadow-xs ring-1 ring-emerald-300/50'
            : 'bg-[#e8f7f2]/90 border border-[#99f6e4]/60 shadow-2xs'
        }`}
      >
        {/* Continuous Central Hanging Dashed Vine (Lengthens with the branch) */}
        <div className="absolute inset-y-3 left-1/2 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-[#14b8a6]/45 pointer-events-none" />

        {/* Decorative Ivy Leaves Along Vine */}
        <div className="absolute top-10 left-1 w-2.5 h-1.5 bg-[#10b981]/40 rounded-full transform -rotate-45 pointer-events-none" />
        <div className="absolute top-24 right-1 w-2.5 h-1.5 bg-[#10b981]/40 rounded-full transform rotate-45 pointer-events-none" />
        <div className="absolute top-44 left-1 w-2.5 h-1.5 bg-[#10b981]/40 rounded-full transform -rotate-30 pointer-events-none" />
        <div className="absolute top-60 right-1 w-2.5 h-1.5 bg-[#10b981]/40 rounded-full transform rotate-30 pointer-events-none" />
        <div className="absolute top-76 left-1 w-2.5 h-1.5 bg-[#10b981]/40 rounded-full transform -rotate-45 pointer-events-none" />
        <div className="absolute top-96 right-1 w-2.5 h-1.5 bg-[#10b981]/40 rounded-full transform rotate-45 pointer-events-none" />

        {/* Stack of Flowers Hanging Downwards */}
        {column.flowers.map((flower, idx) => {
          const isPartOfDrag = isBeingDragged && idx >= dragStartIndex;
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
              className={`relative z-10 cursor-grab active:cursor-grabbing ${
                idx > 0 ? '-mt-5' : ''
              } ${isPartOfDrag ? 'opacity-20' : ''}`}
              style={{ touchAction: 'none' }}
            >
              {/* Little Connecting Green Vine Stem above each flower */}
              {idx > 0 && (
                <div className="w-1 h-1.5 bg-emerald-600/60 mx-auto -mb-0.5 rounded-full pointer-events-none" />
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
                sizeVariant={flower.sizeVariant}
              />
            </div>
          );
        })}

        {/* Empty Column Indicator */}
        {column.flowers.length === 0 && (
          <div className="flex flex-col items-center justify-center my-auto py-12 text-emerald-600/40 pointer-events-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20m0 0l-4-4m4 4l4-4" />
            </svg>
            <span className="text-[11px] tracking-wide font-semibold mt-1">Boş Dal</span>
          </div>
        )}

        {/* Bottom Rounded U-Loop Anchor (Screenshot exact design) */}
        <div className="mt-auto mb-1 w-4.5 h-5.5 border-[2.5px] border-[#0d9488]/80 rounded-b-full bg-[#ccfbf1]/60 shadow-2xs flex items-center justify-center pointer-events-none shrink-0" />
      </div>
    </div>
  );
};
