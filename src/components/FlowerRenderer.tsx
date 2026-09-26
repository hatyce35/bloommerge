import React from 'react';
import { FlowerColor, FlowerStage } from '../types/game';
import { FLOWER_FAMILIES } from '../data/flowerFamilies';

interface FlowerRendererProps {
  color: FlowerColor;
  stage: FlowerStage;
  isWild?: boolean;
  isFrozen?: boolean;
  isRainbow?: boolean;
  isLocked?: boolean;
  isSelected?: boolean;
  isHinted?: boolean;
  isMerging?: boolean;
  className?: string;
  size?: number; // default 52
}

export const FlowerRenderer: React.FC<FlowerRendererProps> = ({
  color,
  stage,
  isWild = false,
  isFrozen = false,
  isRainbow = false,
  isLocked = false,
  isSelected = false,
  isHinted = false,
  isMerging = false,
  className = '',
  size = 52,
}) => {
  const family = FLOWER_FAMILIES[color] || FLOWER_FAMILIES.pink;

  // Render specific petal geometry for each color family
  const renderPetals = () => {
    // If Wild flower, rainbow swirl
    if (isWild) {
      return (
        <g>
          <circle cx="26" cy="26" r="18" fill="url(#wildGrad)" />
          <path
            d="M 26 10 C 34 10 38 20 26 26 C 14 32 18 42 26 42 C 34 42 38 32 26 26"
            stroke="#ffffff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="26" cy="26" r="5" fill="#fef08a" stroke="#ffffff" strokeWidth="1.5" />
        </g>
      );
    }

    if (stage === 1) {
      // Stage 1: 🌱 Bud
      return (
        <g>
          {/* Calyx & Stem base */}
          <path
            d="M 23 38 C 24 44 28 44 29 38 C 29 35 23 35 23 38 Z"
            fill="#4ade80"
            stroke="#16a34a"
            strokeWidth="1"
          />
          <path
            d="M 21 34 C 17 38 18 44 26 43 C 24 38 23 35 21 34 Z"
            fill="#22c55e"
          />
          <path
            d="M 31 34 C 35 38 34 44 26 43 C 28 38 29 35 31 34 Z"
            fill="#16a34a"
          />
          {/* Swelling Colored Bud Tip */}
          <path
            d="M 26 12 C 18 20 18 32 26 34 C 34 32 34 20 26 12 Z"
            fill={family.themeColor}
            stroke={family.borderColor}
            strokeWidth="1.5"
          />
          <path
            d="M 26 15 C 22 22 23 29 26 31 C 29 29 30 22 26 15 Z"
            fill={family.secondaryColor}
            opacity="0.8"
          />
          {/* Tiny highlight */}
          <circle cx="24" cy="20" r="1.5" fill="#ffffff" opacity="0.7" />
        </g>
      );
    }

    if (stage === 2) {
      // Stage 2: 🌷 Small Flower / Sprout (Distinct family bud beginning to open)
      switch (color) {
        case 'pink': // Lotus bud opening
          return (
            <g>
              <ellipse cx="26" cy="30" rx="9" ry="12" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1.2" />
              <path d="M 18 32 C 18 20 25 18 26 28" fill={family.secondaryColor} stroke={family.borderColor} strokeWidth="1" />
              <path d="M 34 32 C 34 20 27 18 26 28" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1" />
              <ellipse cx="26" cy="27" rx="4" ry="7" fill={family.secondaryColor} />
              <circle cx="26" cy="26" r="2" fill="#fef08a" />
            </g>
          );
        case 'blue': // Bellflower sprout
          return (
            <g>
              <path d="M 20 36 C 18 24 23 18 26 18 C 29 18 34 24 32 36 Z" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1.2" />
              <path d="M 20 36 Q 26 31 32 36" fill={family.secondaryColor} stroke={family.borderColor} strokeWidth="1" />
              <path d="M 23 22 Q 26 32 29 22" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
            </g>
          );
        case 'yellow': // Sunflower shoot
          return (
            <g>
              <circle cx="26" cy="26" r="8" fill="#78350f" stroke="#b45309" strokeWidth="1" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                <ellipse
                  key={ang}
                  cx="26"
                  cy="17"
                  rx="3.5"
                  ry="5"
                  fill={family.themeColor}
                  stroke={family.borderColor}
                  strokeWidth="0.8"
                  transform={`rotate(${ang} 26 26)`}
                />
              ))}
              <circle cx="26" cy="26" r="5" fill="#92400e" />
            </g>
          );
        case 'purple': // Orchid shoot
          return (
            <g>
              <ellipse cx="26" cy="22" rx="5" ry="9" fill={family.secondaryColor} stroke={family.borderColor} strokeWidth="1" />
              <ellipse cx="20" cy="28" rx="6" ry="7" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1" />
              <ellipse cx="32" cy="28" rx="6" ry="7" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1" />
              <circle cx="26" cy="27" r="2.5" fill="#fef08a" />
            </g>
          );
        case 'orange': // Lily shoot
          return (
            <g>
              <path d="M 26 14 C 21 22 20 32 26 36 C 32 32 31 22 26 14 Z" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1.2" />
              <path d="M 17 22 C 22 25 24 33 26 36" stroke={family.borderColor} strokeWidth="1.2" fill="none" />
              <path d="M 35 22 C 30 25 28 33 26 36" stroke={family.borderColor} strokeWidth="1.2" fill="none" />
              <circle cx="26" cy="25" r="2.5" fill="#fed7aa" />
            </g>
          );
        case 'red': // Rosebud
        default:
          return (
            <g>
              <circle cx="26" cy="26" r="9" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1.2" />
              <path d="M 20 26 C 20 20 32 20 32 26 C 32 31 24 31 24 26" fill="none" stroke="#b91c1c" strokeWidth="1.5" />
              <path d="M 26 22 C 24 22 23 27 26 27 C 28 27 28 24 26 24" fill="none" stroke="#fca5a5" strokeWidth="1.2" />
            </g>
          );
      }
    }

    // Stage 3: 🌸 Blossom (Signature Full Bloom)
    if (stage === 3) {
      switch (color) {
        case 'pink': // Sakura / Lotus Blossom
          return (
            <g>
              {[0, 72, 144, 216, 288].map((ang) => (
                <path
                  key={ang}
                  d="M 26 26 C 21 16 23 8 26 11 C 29 8 31 16 26 26 Z"
                  fill={family.themeColor}
                  stroke={family.borderColor}
                  strokeWidth="1"
                  transform={`rotate(${ang} 26 26)`}
                />
              ))}
              <circle cx="26" cy="26" r="5" fill={family.secondaryColor} stroke={family.borderColor} strokeWidth="1" />
              <circle cx="26" cy="26" r="2.5" fill="#fef08a" />
            </g>
          );
        case 'blue': // Campanula Star Cluster
          return (
            <g>
              {[0, 60, 120, 180, 240, 300].map((ang) => (
                <path
                  key={ang}
                  d="M 26 26 C 22 17 23 10 26 10 C 29 10 30 17 26 26 Z"
                  fill={family.themeColor}
                  stroke={family.borderColor}
                  strokeWidth="1"
                  transform={`rotate(${ang} 26 26)`}
                />
              ))}
              <polygon points="26,19 28,24 33,26 28,28 26,33 24,28 19,26 24,24" fill="#bae6fd" />
              <circle cx="26" cy="26" r="3" fill="#ffffff" />
            </g>
          );
        case 'yellow': // Golden Helianthus
          return (
            <g>
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang) => (
                <polygon
                  key={ang}
                  points="26,9 28,19 26,23 24,19"
                  fill={family.themeColor}
                  stroke={family.borderColor}
                  strokeWidth="0.8"
                  transform={`rotate(${ang} 26 26)`}
                />
              ))}
              <circle cx="26" cy="26" r="7" fill="#78350f" stroke="#b45309" strokeWidth="1.2" />
              <circle cx="26" cy="26" r="4" fill="#92400e" />
              <circle cx="26" cy="26" r="2" fill="#d97706" />
            </g>
          );
        case 'purple': // Royal Orchid
          return (
            <g>
              {/* Dorsal sepal */}
              <ellipse cx="26" cy="16" rx="6" ry="9" fill={family.secondaryColor} stroke={family.borderColor} strokeWidth="1" />
              {/* Lateral spreading petals */}
              <ellipse cx="14" cy="26" rx="9" ry="6" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1" transform="rotate(-15 14 26)" />
              <ellipse cx="38" cy="26" rx="9" ry="6" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1" transform="rotate(15 38 26)" />
              {/* Lower lip */}
              <path d="M 21 28 C 21 37 31 37 31 28 Z" fill="#7e22ce" stroke="#581c87" strokeWidth="1.2" />
              <circle cx="26" cy="27" r="2.5" fill="#fef08a" />
            </g>
          );
        case 'orange': // Sunset Lily
          return (
            <g>
              {[0, 60, 120, 180, 240, 300].map((ang) => (
                <path
                  key={ang}
                  d="M 26 26 C 22 15 24 7 26 7 C 28 7 30 15 26 26 Z"
                  fill={family.themeColor}
                  stroke={family.borderColor}
                  strokeWidth="1"
                  transform={`rotate(${ang} 26 26)`}
                />
              ))}
              {/* Speckles */}
              {[45, 135, 225, 315].map((ang) => (
                <circle key={ang} cx="26" cy="18" r="0.9" fill="#7c2d12" transform={`rotate(${ang} 26 26)`} />
              ))}
              <circle cx="26" cy="26" r="3.5" fill="#fef08a" stroke="#ea580c" strokeWidth="1" />
            </g>
          );
        case 'red': // Crimson Camellia
        default:
          return (
            <g>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                <ellipse
                  key={ang}
                  cx="26"
                  cy="17"
                  rx="6"
                  ry="8"
                  fill={family.themeColor}
                  stroke={family.borderColor}
                  strokeWidth="0.8"
                  transform={`rotate(${ang} 26 26)`}
                />
              ))}
              <circle cx="26" cy="26" r="7" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1" />
              <path d="M 23 26 C 23 23 29 23 29 26 C 29 28 25 28 25 26" fill="none" stroke="#fecaca" strokeWidth="1.2" />
              <circle cx="26" cy="26" r="2" fill="#fef08a" />
            </g>
          );
      }
    }

    // Stage 4: 🌺 Large Blossom (Multi-layered lush bloom)
    if (stage === 4) {
      return (
        <g>
          {/* Back petal layer */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
            <ellipse
              key={'back-' + ang}
              cx="26"
              cy="14"
              rx="6"
              ry="9"
              fill={family.themeColor}
              stroke={family.borderColor}
              strokeWidth="0.8"
              opacity="0.85"
              transform={`rotate(${ang} 26 26)`}
            />
          ))}
          {/* Front inner petal layer */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((ang) => (
            <ellipse
              key={'front-' + ang}
              cx="26"
              cy="18"
              rx="5"
              ry="7"
              fill={family.secondaryColor}
              stroke={family.borderColor}
              strokeWidth="0.8"
              transform={`rotate(${ang} 26 26)`}
            />
          ))}
          {/* Core */}
          <circle cx="26" cy="26" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="26" cy="26" r="3" fill="#ea580c" />
          {/* Shimmer dots */}
          <circle cx="23" cy="23" r="1.2" fill="#ffffff" />
          <circle cx="29" cy="24" r="1" fill="#ffffff" />
        </g>
      );
    }

    // Stage 5: 🌻 Rare Flower (Crowned golden ornate petals, sparkling aura)
    if (stage === 5) {
      return (
        <g>
          {/* Golden radiance aura */}
          <circle cx="26" cy="26" r="22" fill="#fef08a" opacity="0.25" />
          {/* Crown ray petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang) => (
            <polygon
              key={'rare-' + ang}
              points="26,6 28,17 26,21 24,17"
              fill="#fbbf24"
              stroke="#b45309"
              strokeWidth="0.8"
              transform={`rotate(${ang} 26 26)`}
            />
          ))}
          {/* Primary Petals */}
          {[15, 75, 135, 195, 255, 315].map((ang) => (
            <path
              key={'inner-' + ang}
              d="M 26 26 C 20 16 23 10 26 10 C 29 10 32 16 26 26 Z"
              fill={family.themeColor}
              stroke={family.borderColor}
              strokeWidth="1.2"
              transform={`rotate(${ang} 26 26)`}
            />
          ))}
          <circle cx="26" cy="26" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.2" />
          <polygon points="26,22 27.5,25 30,26 27.5,27 26,30 24.5,27 22,26 24.5,25" fill="#ffffff" />
        </g>
      );
    }

    // Stage 6: ✨ Magical Flower (Celestial Mythical Bloom)
    return (
      <g>
        {/* Celestial Star Halo */}
        <circle cx="26" cy="26" r="23" fill="url(#magicalGlow)" opacity="0.4" />
        {/* 16 prismatic radiating petals */}
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((ang, i) => (
          <path
            key={'magic-' + ang}
            d="M 26 26 C 23 14 24 5 26 5 C 28 5 29 14 26 26 Z"
            fill={i % 2 === 0 ? family.themeColor : family.secondaryColor}
            stroke="#ffffff"
            strokeWidth="0.8"
            transform={`rotate(${ang} 26 26)`}
          />
        ))}
        {/* Glowing jewel core */}
        <circle cx="26" cy="26" r="8" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="26" cy="26" r="5" fill="#fef08a" />
        {/* 4-point Diamond Star */}
        <polygon points="26,17 28.5,24 35,26 28.5,28 26,35 23.5,28 17,26 23.5,24" fill="#6366f1" />
        <circle cx="26" cy="26" r="2" fill="#ffffff" />
      </g>
    );
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-200 select-none ${
        isSelected ? '-translate-y-2.5 scale-110 drop-shadow-[0_8px_16px_rgba(251,191,36,0.65)]' : ''
      } ${isHinted ? 'ring-4 ring-amber-300 ring-offset-2 ring-offset-emerald-900 rounded-full animate-pulse' : ''} ${
        isMerging ? 'scale-125 duration-150' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm filter"
      >
        <defs>
          <radialGradient id="wildGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f472b6" />
            <stop offset="70%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </radialGradient>
          <radialGradient id="magicalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="iceGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Selected flower divine floor aura */}
        {isSelected && (
          <circle cx="26" cy="46" r="16" fill="#fde047" opacity="0.35" filter="blur(3px)" />
        )}

        {/* Petals layer */}
        {renderPetals()}

        {/* Frozen Overlay */}
        {isFrozen && (
          <g>
            <rect x="5" y="5" width="42" height="42" rx="10" fill="url(#iceGrad)" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Ice Crack Pattern */}
            <path d="M 12 14 L 22 26 L 36 20 M 22 26 L 28 38" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="37" cy="13" r="2.5" fill="#ffffff" opacity="0.8" />
            <text x="26" y="32" fontSize="12" textAnchor="middle" fill="#0369a1" fontWeight="bold">❄️</text>
          </g>
        )}

        {/* Locked Flower Overlay */}
        {isLocked && (
          <g>
            {/* Vine wraps */}
            <path
              d="M 10 32 Q 26 18 42 32 M 12 20 Q 26 34 40 20"
              stroke="#15803d"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Little leaf */}
            <path d="M 22 19 C 18 15 20 11 26 14 Z" fill="#22c55e" />
            {/* Padlock */}
            <rect x="20" y="24" width="12" height="10" rx="2.5" fill="#eab308" stroke="#a16207" strokeWidth="1" />
            <path d="M 23 24 V 20 C 23 18 29 18 29 20 V 24" stroke="#a16207" strokeWidth="1.5" fill="none" />
            <circle cx="26" cy="28" r="1" fill="#713f12" />
          </g>
        )}

        {/* Rainbow Flower Shimmer Marker */}
        {isRainbow && (
          <circle cx="26" cy="26" r="24" stroke="url(#wildGrad)" strokeWidth="2" strokeDasharray="3 3" fill="none" />
        )}
      </svg>
    </div>
  );
};
