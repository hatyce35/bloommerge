import React from 'react';

export const GardenBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10 bg-gradient-to-b from-sky-100/90 via-emerald-50/70 to-amber-50">
      {/* Soft Sunlight Radial Flares (Calm, Static, No Jitter) */}
      <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-0 w-80 h-80 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />

      {/* Gentle Garden Canopy Vines in top corners (Static, Elegant) */}
      <svg className="absolute -top-2 left-0 w-44 h-28 opacity-40 text-emerald-800 pointer-events-none" viewBox="0 0 160 100" fill="none">
        <path d="M 0 0 C 40 10 70 30 110 20 C 130 15 150 40 160 60" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="40" cy="18" rx="8" ry="4" transform="rotate(-30 40 18)" fill="currentColor" />
        <ellipse cx="75" cy="28" rx="7" ry="3.5" transform="rotate(25 75 28)" fill="currentColor" />
        <ellipse cx="110" cy="22" rx="9" ry="4.5" transform="rotate(-15 110 22)" fill="currentColor" />
        <ellipse cx="140" cy="45" rx="6" ry="3" transform="rotate(40 140 45)" fill="currentColor" />
      </svg>

      <svg className="absolute -top-2 right-0 w-44 h-28 opacity-40 text-emerald-800 transform scale-x-[-1] pointer-events-none" viewBox="0 0 160 100" fill="none">
        <path d="M 0 0 C 40 10 70 30 110 20 C 130 15 150 40 160 60" stroke="currentColor" strokeWidth="2.5" />
        <ellipse cx="40" cy="18" rx="8" ry="4" transform="rotate(-30 40 18)" fill="currentColor" />
        <ellipse cx="75" cy="28" rx="7" ry="3.5" transform="rotate(25 75 28)" fill="currentColor" />
        <ellipse cx="110" cy="22" rx="9" ry="4.5" transform="rotate(-15 110 22)" fill="currentColor" />
      </svg>

      {/* Subtle Botanical Leaf Accents (Static) */}
      <div className="absolute top-28 left-[10%] opacity-40 pointer-events-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5">
          <path d="M12 2C6.5 2 2 6.5 2 12c4 0 7-3 10-10z" fill="#a7f3d0" />
        </svg>
      </div>

      <div className="absolute top-40 right-[12%] opacity-35 pointer-events-none">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5">
          <path d="M12 2C6.5 2 2 6.5 2 12c4 0 7-3 10-10z" fill="#a7f3d0" />
        </svg>
      </div>

      {/* Lush Grassy Mound Horizon at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-emerald-800/15 via-emerald-600/5 to-transparent pointer-events-none" />
    </div>
  );
};
