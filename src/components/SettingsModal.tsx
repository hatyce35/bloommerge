import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Smartphone, Trash2, X, HelpCircle, Check } from 'lucide-react';
import { UserSaveData } from '../types/game';

interface SettingsModalProps {
  settings: UserSaveData['settings'];
  onUpdateSettings: (newSettings: UserSaveData['settings']) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onResetProgress,
  onClose,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-white to-emerald-50 p-6 shadow-2xl border-2 border-emerald-200 relative text-emerald-950">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
          <h2 className="text-lg font-bold text-emerald-950 font-display">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggles */}
        <div className="space-y-3.5 my-5">
          {/* Sound FX */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 border border-emerald-100 shadow-xs">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-emerald-700" />
              ) : (
                <VolumeX className="w-5 h-5 text-stone-400" />
              )}
              <span className="text-sm font-semibold text-emerald-950">Sound Effects</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                settings.soundEnabled ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Ambient Garden Chimes */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 border border-emerald-100 shadow-xs">
            <div className="flex items-center gap-3">
              <Music className={`w-5 h-5 ${settings.musicEnabled ? 'text-emerald-700' : 'text-stone-400'}`} />
              <span className="text-sm font-semibold text-emerald-950">Garden Chimes</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, musicEnabled: !settings.musicEnabled })}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                settings.musicEnabled ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  settings.musicEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Haptic Vibration */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/70 border border-emerald-100 shadow-xs">
            <div className="flex items-center gap-3">
              <Smartphone className={`w-5 h-5 ${settings.vibrationEnabled ? 'text-emerald-700' : 'text-stone-400'}`} />
              <span className="text-sm font-semibold text-emerald-950">Vibration Feedback</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ ...settings, vibrationEnabled: !settings.vibrationEnabled })}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                settings.vibrationEnabled ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  settings.vibrationEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* How to Play Accordion */}
        <div className="mb-4">
          <button
            onClick={() => setShowHowToPlay(!showHowToPlay)}
            className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 text-emerald-800 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              How to Play Bloom Merge
            </span>
            <span className="text-xs">{showHowToPlay ? '▲' : '▼'}</span>
          </button>

          {showHowToPlay && (
            <div className="p-3 bg-white/80 rounded-xl mt-1.5 border border-emerald-100 text-xs text-stone-600 space-y-1.5 leading-relaxed">
              <p>🌸 <strong>Pick & Place:</strong> Tap the top flower in any column, then tap another column to move it.</p>
              <p>🌱 <strong>Vertical Merge:</strong> Stack 3 flowers of the same color and stage together in one column. They merge into the next growth stage!</p>
              <p>✨ <strong>Progression:</strong> Bud (🌱) → Small Flower (🌷) → Blossom (🌸) → Large Blossom (🌺) → Rare Flower (🌻) → Magical Flower (✨)!</p>
              <p>❄️ <strong>Special Flowers:</strong> Wild flowers match any color. Thaw frozen flowers by moving them or merging nearby!</p>
            </div>
          )}
        </div>

        {/* Reset Progress Section */}
        <div className="pt-2 border-t border-emerald-100">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Game Progress</span>
            </button>
          ) : (
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-center animate-fade-in">
              <p className="text-xs text-rose-900 font-semibold mb-2">
                Are you sure? This will reset all levels, stars, and discovered flowers.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetProgress();
                    setConfirmReset(false);
                    onClose();
                  }}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center justify-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Yes, Reset</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
