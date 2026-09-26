import React, { useMemo } from 'react';

export const GardenBackground: React.FC = () => {
  // Generate random drifting petal seeds
  const floatingPetals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.5 + (i % 3) * 5) % 96}%`,
      delay: `${(i * 1.3) % 9}s`,
      duration: `${10 + (i % 5) * 2.5}s`,
      size: 10 + (i % 4) * 4,
      rotation: `${(i * 47) % 360}deg`,
      color: ['#fbcfe8', '#bae6fd', '#fef08a', '#f3e8ff', '#fed7aa'][i % 5],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-gradient-to-b from-sky-100 via-emerald-50/70 to-amber-50">
      {/* Soft Sunlight Radial Flare */}
      <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-amber-200/35 blur-3xl" />
      <div className="absolute top-12 right-0 w-80 h-80 rounded-full bg-emerald-200/25 blur-3xl" />

      {/* Gentle Garden Canopy Vines in corners */}
      <svg className="absolute -top-2 left-0 w-44 h-28 opacity-40 text-emerald-700" viewBox="0 0 160 100" fill="none">
        <path d="M 0 0 C 40 10 70 30 110 20 C 130 15 150 40 160 60" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="40" cy="18" rx="8" ry="4" transform="rotate(-30 40 18)" fill="currentColor" />
        <ellipse cx="75" cy="28" rx="7" ry="3.5" transform="rotate(25 75 28)" fill="currentColor" />
        <ellipse cx="110" cy="22" rx="9" ry="4.5" transform="rotate(-15 110 22)" fill="currentColor" />
        <ellipse cx="140" cy="45" rx="6" ry="3" transform="rotate(40 140 45)" fill="currentColor" />
      </svg>

      <svg className="absolute -top-2 right-0 w-44 h-28 opacity-40 text-emerald-700 transform scale-x-[-1]" viewBox="0 0 160 100" fill="none">
        <path d="M 0 0 C 40 10 70 30 110 20 C 130 15 150 40 160 60" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="40" cy="18" rx="8" ry="4" transform="rotate(-30 40 18)" fill="currentColor" />
        <ellipse cx="75" cy="28" rx="7" ry="3.5" transform="rotate(25 75 28)" fill="currentColor" />
        <ellipse cx="110" cy="22" rx="9" ry="4.5" transform="rotate(-15 110 22)" fill="currentColor" />
      </svg>

      {/* Fluttering Butterflies */}
      <div className="absolute top-28 left-[12%] animate-pulse duration-1000 opacity-60">
        <svg width="22" height="20" viewBox="0 0 24 24" fill="none">
          <ellipse cx="8" cy="8" rx="7" ry="5" fill="#f472b6" opacity="0.8" />
          <ellipse cx="16" cy="8" rx="7" ry="5" fill="#f472b6" opacity="0.8" />
          <ellipse cx="9" cy="15" rx="5" ry="4" fill="#fb7185" opacity="0.7" />
          <ellipse cx="15" cy="15" rx="5" ry="4" fill="#fb7185" opacity="0.7" />
          <line x1="12" y1="4" x2="12" y2="18" stroke="#831843" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="absolute top-44 right-[16%] animate-bounce duration-[4000ms] opacity-50">
        <svg width="20" height="18" viewBox="0 0 24 24" fill="none">
          <ellipse cx="8" cy="8" rx="7" ry="5" fill="#38bdf8" opacity="0.8" />
          <ellipse cx="16" cy="8" rx="7" ry="5" fill="#38bdf8" opacity="0.8" />
          <ellipse cx="9" cy="15" rx="5" ry="4" fill="#60a5fa" opacity="0.7" />
          <ellipse cx="15" cy="15" rx="5" ry="4" fill="#60a5fa" opacity="0.7" />
          <line x1="12" y1="4" x2="12" y2="18" stroke="#0369a1" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Floating Gentle Petal Particles drifting upward */}
      {floatingPetals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -bottom-6 animate-float-petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `rotate(${petal.rotation})`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.4}
            viewBox="0 0 16 22"
            fill="none"
            style={{ opacity: 0.55 }}
          >
            <path
              d="M 8 0 C 14 6 15 16 8 22 C 1 16 2 6 8 0 Z"
              fill={petal.color}
            />
          </svg>
        </div>
      ))}

      {/* Lush Grassy Mound & Soil Horizon at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-emerald-800/20 via-emerald-600/10 to-transparent pointer-events-none" />
    </div>
  );
};
