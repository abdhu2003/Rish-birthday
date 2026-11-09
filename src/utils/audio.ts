// Web Audio API anime-inspired procedural soundtrack & sound effects

class AudioController {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private volume = 0.65;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play custom audio file if provided, otherwise fallback to procedural anime theme
  public startMusic(audioSrc?: string, fallbackSynth = true) {
    if (typeof window === "undefined") return;
    this.initCtx();

    if (audioSrc && audioSrc.length > 0) {
      if (!this.audioEl) {
        this.audioEl = new Audio(audioSrc);
        this.audioEl.loop = true;
        this.audioEl.volume = this.volume;
      }
      this.audioEl.play().catch(() => {
        // Fallback to synth if custom audio file fails to load (e.g. 404)
        if (fallbackSynth) {
          this.startShinobiSynth();
        }
      });
      this.isPlaying = true;
      return;
    }

    if (fallbackSynth) {
      this.startShinobiSynth();
    }
  }

  public stopMusic() {
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
  }

  public toggleMusic(audioSrc?: string, fallbackSynth = true): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic(audioSrc, fallbackSynth);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Beautiful anime-inspired Japanese pentatonic & birthday melody arpeggios
  private startShinobiSynth() {
    this.initCtx();
    if (!this.ctx) return;
    this.isPlaying = true;

    // Nostalgic Insen / Hirajoshi pentatonic mixed with sweet celebratory notes
    // D4, Eb4, G4, A4, C5, D5, E5, F5, G5, A5
    const melodyNotes = [
      293.66, 329.63, 349.23, 440.0, 523.25, 440.0, // Floating opening
      392.0, 349.23, 293.66, 329.63, 440.0, 392.0, // Flute melody
      523.25, 587.33, 659.25, 587.33, 523.25, 440.0, // Celebratory ascent
      392.0, 440.0, 523.25, 587.33, 659.25, 523.25  // Will of Fire climax
    ];

    let noteIndex = 0;
    const playNext = () => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = melodyNotes[noteIndex % melodyNotes.length];
      
      // Warm bamboo flute / koto character
      this.playShakuhachiTone(freq, 1.4);

      // Add a shimmering chime sparkle on key beats
      if (noteIndex % 2 === 0) {
        setTimeout(() => {
          if (this.isPlaying) this.playChime(freq * 1.5, 0.9, 0.06);
        }, 180);
      }

      noteIndex++;
    };

    playNext();
    this.timerId = window.setInterval(playNext, 600);
  }

  // Shakuhachi / Flute style synthesizer tone with gentle breath vibrato
  public playShakuhachiTone(freq: number, duration = 1.3) {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sine with subtle triangle harmonic for rich wooden flute feel
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle pitch bend / vibrato
      osc.frequency.linearRampToValueAtTime(freq * 1.01, this.ctx.currentTime + 0.3);
      osc.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + 0.6);

      // Soft envelope (gentle attack, breath swell, smooth release)
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  // Soft celesta / chime tone
  public playChime(freq: number, duration = 1.2, gainFactor = 0.14) {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainFactor, this.ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  // Sound effect: Heartbeat deep warm thump
  public playHeartbeatSound() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(80, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);

      setTimeout(() => {
        if (!this.ctx) return;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(70, this.ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.2);

        gain2.gain.setValueAtTime(0.18, this.ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc2.start();
        osc2.stop(this.ctx.currentTime + 0.23);
      }, 180);
    } catch {}
  }

  // Sound effect: Chakra surge / whoosh
  public playChakraSurgeSound() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.42);
    } catch {}
  }

  // Sound effect: Sharingan sound effect (hypnotic ring)
  public playSharinganSound() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const freqs = [440, 880, 1320];
      freqs.forEach((f, i) => {
        setTimeout(() => {
          this.playChime(f, 0.7, 0.12);
        }, i * 90);
      });
    } catch {}
  }

  // Sound effect: Sparkles
  public playSparkleSound() {
    this.initCtx();
    if (!this.ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.playChime(f, 0.6, 0.1);
      }, i * 50);
    });
  }

  // Sound effect: Candle blow whoosh
  public playBlowSound() {
    this.initCtx();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {}
  }
}

export const audioController = new AudioController();
