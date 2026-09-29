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
  sizeVariant?: 'small' | 'medium' | 'large';
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
  sizeVariant = 'medium',
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

    // Stage 1: 🌱 Tohum (Screenshot exact style: pointed teardrop with bright green calyx at bottom)
    if (stage === 1) {
      const scale = sizeVariant === 'small' ? 0.85 : sizeVariant === 'large' ? 1.15 : 1.0;
      const trans = sizeVariant === 'small' ? 'translate(4.5, 4.5)' : sizeVariant === 'large' ? 'translate(-3.8, -3.8)' : '';

      return (
        <g transform={`scale(${scale}) ${trans}`}>
          {/* Calyx Leaves at base of the teardrop */}
          <path d="M 21 36 C 15 37 14 43 21 42 Z" fill="#16a34a" stroke="#15803d" strokeWidth="0.8" />
          <path d="M 31 36 C 37 37 38 43 31 42 Z" fill="#15803d" stroke="#166534" strokeWidth="0.8" />
          <path d="M 22 39 C 24 43 28 43 30 39 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="0.8" />
          {/* Teardrop Seed Body pointing UP (Screenshot exact shape) */}
          <path
            d="M 26 9 C 20.5 18 17 26 17 31 C 17 37 21 41 26 41 C 31 41 35 37 35 31 C 35 26 31.5 18 26 9 Z"
            fill={family.themeColor}
            stroke={family.borderColor}
            strokeWidth="1.6"
          />
          {/* Inner soft secondary gradient ellipse */}
          <ellipse cx="26" cy="30" rx="5.8" ry="7.5" fill={family.secondaryColor} opacity="0.75" />
          {/* Glossy specular highlight curve on upper left of teardrop */}
          <path
            d="M 25 14 C 21 20 20 25 20 30 C 20 32 21 33 22 33 C 23 33 23 32 23 30 C 23 26 24 21 25 16 Z"
            fill="#ffffff"
            opacity="0.85"
          />
        </g>
      );
    }

    // Stage 2: 🌷 Çiçek 1 (Screenshot exact designs: Pink oval gem bud, Blue bell cup, Orange lily star, Purple orchid, Yellow daisy)
    if (stage === 2) {
      if (color === 'pink') {
        // Pink Gem Oval Bud (Screenshot col 1 row 1, col 5 row 2)
        return (
          <g>
            <ellipse cx="26" cy="25" rx="10.5" ry="14" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1.8" />
            <ellipse cx="26" cy="25" rx="7.5" ry="10.5" fill={family.secondaryColor} opacity="0.9" />
            <ellipse cx="26" cy="25" rx="4.5" ry="7" fill="#ffffff" opacity="0.45" />
            <ellipse cx="22.5" cy="20" rx="2" ry="4" fill="#ffffff" opacity="0.9" transform="rotate(-15 22.5 20)" />
          </g>
        );
      }

      if (color === 'blue') {
        // Blue Bell Bud (Screenshot col 1 row 2, col 2 row 1)
        return (
          <g>
            <path
              d="M 26 12 C 18 12 16 23 16 32 C 19.5 30 22.5 32 26 30 C 29.5 32 32.5 30 36 32 C 36 23 34 12 26 12 Z"
              fill={family.themeColor}
              stroke={family.borderColor}
              strokeWidth="1.6"
            />
            <path
              d="M 26 15 C 20 15 19 23 19 28 C 21 27 24 28 26 27 C 28 28 31 27 33 28 C 33 23 32 15 26 15 Z"
              fill={family.secondaryColor}
              opacity="0.8"
            />
            <circle cx="23" cy="20" r="1.8" fill="#ffffff" opacity="0.9" />
          </g>
        );
      }

      if (color === 'orange') {
        // Orange Star/Lily Bud (Screenshot col 5 row 1)
        return (
          <g>
            <path
              d="M 26 8 C 22 17 22 31 26 39 C 30 31 30 17 26 8 Z"
              fill={family.themeColor}
              stroke={family.borderColor}
              strokeWidth="1.5"
            />
            <path
              d="M 24 24 C 16 16 15 24 23 35 Z"
              fill={family.themeColor}
              stroke={family.borderColor}
              strokeWidth="1.3"
            />
            <path
              d="M 28 24 C 36 16 37 24 29 35 Z"
              fill={family.themeColor}
              stroke={family.borderColor}
              strokeWidth="1.3"
            />
            <circle cx="26" cy="27" r="2.8" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
          </g>
        );
      }

      if (color === 'purple') {
        // Purple 3-Petal Orchid (Screenshot col 3 row 2, col 4 row 1)
        return (
          <g>
            <ellipse cx="26" cy="18" rx="6.5" ry="9" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1.5" />
            <ellipse cx="19" cy="27" rx="8" ry="6" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1.5" transform="rotate(-20 19 27)" />
            <ellipse cx="33" cy="27" rx="8" ry="6" fill={family.themeColor} stroke={family.borderColor} strokeWidth="1.5" transform="rotate(20 33 27)" />
            <circle cx="26" cy="26" r="4.5" fill="#f5d0fe" />
            <circle cx="26" cy="26" r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
          </g>
        );
      }

      if (color === 'yellow') {
        // Yellow 8-Petal Daisy (Screenshot col 2 row 2, col 3 row 1)
        return (
          <g>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
              <ellipse
                key={'yell-' + ang}
                cx="26"
                cy="16"
                rx="4.8"
                ry="7.5"
                fill={family.themeColor}
                stroke={family.borderColor}
                strokeWidth="1.2"
                transform={`rotate(${ang} 26 26)`}
              />
            ))}
            <circle cx="26" cy="26" r="6" fill="#b45309" stroke="#78350f" strokeWidth="1" />
            <circle cx="26" cy="26" r="4" fill="#d97706" />
            <circle cx="24.5" cy="24.5" r="1.2" fill="#fef08a" opacity="0.9" />
          </g>
        );
      }

      // Default fallback (e.g. red)
      return (
        <g>
          <path d="M 23 37 C 24 41 28 41 29 37 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="0.8" />
          {[0, 90, 180, 270].map((ang) => (
            <ellipse
              key={'pet-' + ang}
              cx="26"
              cy="16"
              rx="5.5"
              ry="8.5"
              fill={family.themeColor}
              stroke={family.borderColor}
              strokeWidth="1.1"
              transform={`rotate(${ang} 26 26)`}
            />
          ))}
          <circle cx="26" cy="26" r="4.8" fill={family.secondaryColor} stroke={family.borderColor} strokeWidth="0.8" />
          <circle cx="26" cy="26" r="2.8" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.9" />
        </g>
      );
    }

    // Stage 3: 🌸 Çiçek 2 (Orta Çiçek - 6 yapraklı açmış çiçek)
    if (stage === 3) {
      return (
        <g>
          {/* 6 spreading petals */}
          {[0, 60, 120, 180, 240, 300].map((ang) => (
            <ellipse
              key={'mid-' + ang}
              cx="26"
              cy="16"
              rx="5.5"
              ry="8.5"
              fill={family.themeColor}
              stroke={family.borderColor}
              strokeWidth="1"
              transform={`rotate(${ang} 26 26)`}
            />
          ))}
          {/* Inner petal highlights */}
          {[30, 90, 150, 210, 270, 330].map((ang) => (
            <ellipse
              key={'inner-mid-' + ang}
              cx="26"
              cy="20"
              rx="3.5"
              ry="5"
              fill={family.secondaryColor}
              opacity="0.8"
              transform={`rotate(${ang} 26 26)`}
            />
          ))}
          <circle cx="26" cy="26" r="5.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="26" cy="26" r="2.8" fill="#ea580c" />
          <circle cx="24.5" cy="24.5" r="1" fill="#ffffff" />
        </g>
      );
    }

    // Stage 4: 🌺 Çiçek 3 (Büyük Çiçek - 8 geniş taç yapraklı büyük çiçek)
    if (stage === 4) {
      return (
        <g>
          {/* 8 large spreading petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
            <path
              key={'large-' + ang}
              d="M 26 26 C 19 15 21 8 26 9 C 31 8 33 15 26 26 Z"
              fill={family.themeColor}
              stroke={family.borderColor}
              strokeWidth="1"
              transform={`rotate(${ang} 26 26)`}
            />
          ))}
          {/* 8 inner radiating petals */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((ang) => (
            <ellipse
              key={'inner-large-' + ang}
              cx="26"
              cy="18"
              rx="4"
              ry="6.5"
              fill={family.secondaryColor}
              stroke={family.borderColor}
              strokeWidth="0.8"
              transform={`rotate(${ang} 26 26)`}
            />
          ))}
          <circle cx="26" cy="26" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="26" cy="26" r="3.2" fill="#ea580c" />
          <circle cx="24.5" cy="24.5" r="1.1" fill="#ffffff" />
        </g>
      );
    }

    // Stage 5 & 6: ✨ En Son Büyük Çiçek (Görseldeki 8+8 taç yapraklı, ortası sarı halkalı ve turuncu gözlü nihai çiçek)
    return (
      <g>
        {/* Back petal layer (8 wide petals at 45 deg) */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
          <ellipse
            key={'final-back-' + ang}
            cx="26"
            cy="14"
            rx="6.5"
            ry="9.5"
            fill={family.themeColor}
            stroke={family.borderColor}
            strokeWidth="0.9"
            transform={`rotate(${ang} 26 26)`}
          />
        ))}
        {/* Front inner swirl petal layer (8 petals at 22.5 deg offset) */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((ang) => (
          <ellipse
            key={'final-front-' + ang}
            cx="26"
            cy="18"
            rx="5.2"
            ry="7.5"
            fill={family.secondaryColor}
            stroke={family.borderColor}
            strokeWidth="0.8"
            transform={`rotate(${ang} 26 26)`}
          />
        ))}
        {/* Golden yellow outer core */}
        <circle cx="26" cy="26" r="6.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
        {/* Vibrant warm orange inner eye */}
        <circle cx="26" cy="26" r="3.5" fill="#ea580c" />
        {/* Specular white reflection shine */}
        <circle cx="24" cy="24" r="1.2" fill="#ffffff" />
        <circle cx="28" cy="25" r="0.7" fill="#ffffff" opacity="0.8" />
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
        className="w-full h-full drop-shadow-md filter select-none pointer-events-none"
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
