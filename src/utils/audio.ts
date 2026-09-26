// Web Audio API Sound Synthesizer for Bloom Merge

class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private musicTimer: number | null = null;
  private vibrationEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.stopAmbientMusic();
    } else {
      this.startAmbientMusic();
    }
  }

  public setVibrationEnabled(enabled: boolean) {
    this.vibrationEnabled = enabled;
  }

  public vibrate(pattern: number | number[] = 20) {
    if (!this.vibrationEnabled) return;
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
      // Ignore vibration errors
    }
  }

  public playSelect() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
      this.vibrate(10);
    } catch {
      // Audio error catch
    }
  }

  public playMove() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Gentle woody marimba tap
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.09);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
      this.vibrate(12);
    } catch {
      // Ignore
    }
  }

  public playError() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(196, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
      this.vibrate([15, 30, 15]);
    } catch {
      // Ignore
    }
  }

  public playMerge() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Cheerful sparkling arpeggio: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.15, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
      this.vibrate([25, 20, 35]);
    } catch {
      // Ignore
    }
  }

  public playBloom() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Majestic harp chord bloom with chime shimmer
      const chord = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.045);

        gain.gain.setValueAtTime(0.12, now + idx * 0.045);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + idx * 0.045 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.045);
        osc.stop(now + idx * 0.045 + 0.6);
      });
      this.vibrate([30, 20, 50]);
    } catch {
      // Ignore
    }
  }

  public playWin() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const melody = [
        { note: 523.25, time: 0 },       // C5
        { note: 659.25, time: 0.12 },    // E5
        { note: 783.99, time: 0.24 },    // G5
        { note: 1046.50, time: 0.38 },   // C6
        { note: 880.00, time: 0.52 },    // A5
        { note: 1046.50, time: 0.66 },   // C6
        { note: 1318.51, time: 0.82 },   // E6
      ];

      melody.forEach(({ note, time }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, now + time);

        gain.gain.setValueAtTime(0.18, now + time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + 0.45);
      });
      this.vibrate([40, 30, 40, 30, 80]);
    } catch {
      // Ignore
    }
  }

  public playButton() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
      this.vibrate(8);
    } catch {
      // Ignore
    }
  }

  public startAmbientMusic() {
    if (!this.musicEnabled) return;
    if (this.musicTimer !== null) return;

    // Peaceful garden pentatonic notes (F# major pentatonic / Japanese garden style)
    const scale = [277.18, 329.63, 369.99, 415.30, 493.88, 554.37, 659.25, 739.99];

    const playNextNote = () => {
      if (!this.musicEnabled) return;
      this.initContext();
      if (this.ctx) {
        try {
          const now = this.ctx.currentTime;
          const note = scale[Math.floor(Math.random() * scale.length)];
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, now);

          // Very gentle, soothing background chime
          gain.gain.setValueAtTime(0.02, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 2.5);
        } catch {
          // Ignore
        }
      }

      const nextDelay = 1800 + Math.random() * 2400; // between 1.8s and 4.2s
      this.musicTimer = window.setTimeout(playNextNote, nextDelay);
    };

    this.musicTimer = window.setTimeout(playNextNote, 1000);
  }

  public stopAmbientMusic() {
    if (this.musicTimer !== null) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const sounds = new SoundManager();
