import { StationId } from '../data/types';

/**
 * Lightweight zero-asset procedural Web Audio API sound engine for M2Labo ICHIGO®.
 * Produces tactile industrial UI cues, QR scan chimes, cold-chain transit ambience,
 * rider dispatch tones, POD confirmations, and exception pings with automatic cleanup.
 */
class IchigoSoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;
  private unlocked = false;
  private masterGain: GainNode | null = null;

  // Gentle ambient layer (filtered cold-room / transit hum while playing)
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientActive = false;

  private ensureContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      try {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.28;
        this.masterGain.connect(this.ctx.destination);
      } catch {
        return null;
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public unlock(): void {
    this.unlocked = true;
    const ctx = this.ensureContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): void {
    this.enabled = next;
    if (!next) {
      this.stopAmbient();
    } else {
      this.unlock();
      if (this.ambientActive) {
        this.startAmbient();
      }
      this.playUiClick();
    }
  }

  private playTone(
    freqStart: number,
    freqEnd: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.22,
    delay = 0
  ): void {
    if (!this.enabled || !this.unlocked) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, now);
      if (freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + duration);
      }

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + Math.min(0.018, duration * 0.25));
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    } catch {
      // Ignore audio scheduling errors in restricted contexts
    }
  }

  public playUiClick(): void {
    this.playTone(540, 680, 0.065, 'triangle', 0.16);
  }

  public playCameraSwitch(): void {
    this.playTone(320, 480, 0.09, 'sine', 0.18, 0);
    this.playTone(480, 640, 0.11, 'sine', 0.14, 0.055);
  }

  public playFlowToggle(): void {
    this.playTone(420, 560, 0.08, 'triangle', 0.16, 0);
    this.playTone(620, 740, 0.09, 'sine', 0.12, 0.05);
  }

  public playQrScan(): void {
    // Crisp barcode / QR terminal double-beep
    this.playTone(1180, 1180, 0.055, 'sine', 0.16, 0);
    this.playTone(1560, 1560, 0.075, 'sine', 0.18, 0.07);
  }

  public playTruckTransit(): void {
    // Subtle deep mechanical diesel/reefer swell
    this.playTone(95, 130, 0.28, 'sawtooth', 0.07, 0);
    this.playTone(140, 115, 0.22, 'triangle', 0.08, 0.1);
  }

  public playRiderDispatch(): void {
    // Light electric two-wheeler zip cue
    this.playTone(260, 520, 0.18, 'triangle', 0.13, 0);
    this.playTone(520, 660, 0.12, 'sine', 0.11, 0.1);
  }

  public playDeliveryPodChime(): void {
    // Pleasant 3-note digital Proof-of-Delivery confirmation chord
    this.playTone(523.25, 523.25, 0.14, 'sine', 0.16, 0);
    this.playTone(659.25, 659.25, 0.14, 'sine', 0.16, 0.08);
    this.playTone(783.99, 783.99, 0.24, 'sine', 0.18, 0.16);
  }

  public playReverseLoopCue(): void {
    // Distinct warm descending-ascending return-loop tone
    this.playTone(600, 440, 0.12, 'triangle', 0.14, 0);
    this.playTone(440, 540, 0.16, 'sine', 0.14, 0.11);
  }

  public playWarningPing(): void {
    this.playTone(480, 380, 0.11, 'square', 0.09, 0);
    this.playTone(380, 320, 0.14, 'square', 0.08, 0.12);
  }

  public playStageCue(stationId: StationId, isReverseLoop?: boolean): void {
    if (isReverseLoop) {
      this.playReverseLoopCue();
      return;
    }
    switch (stationId) {
      case 'ST-01':
      case 'ST-03':
        this.playQrScan();
        break;
      case 'ST-02':
        this.playTruckTransit();
        break;
      case 'ST-04':
        this.playFlowToggle();
        break;
      case 'ST-05':
        this.playRiderDispatch();
        break;
      case 'ST-06':
        this.playDeliveryPodChime();
        break;
      case 'ST-07':
        this.playReverseLoopCue();
        break;
      case 'ST-08':
        this.playDeliveryPodChime();
        break;
    }
  }

  public setJourneyAmbient(playing: boolean): void {
    this.ambientActive = playing;
    if (playing && this.enabled && this.unlocked) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
  }

  private startAmbient(): void {
    if (this.ambientOsc || !this.enabled || !this.unlocked) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    try {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = 68;
      filter.type = 'lowpass';
      filter.frequency.value = 140;

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start();

      this.ambientOsc = osc;
      this.ambientGain = gain;
    } catch {
      // Ignore
    }
  }

  private stopAmbient(): void {
    if (!this.ambientOsc || !this.ambientGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ambientOsc;
      const gain = this.ambientGain;
      this.ambientOsc = null;
      this.ambientGain = null;

      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      osc.stop(now + 0.28);
    } catch {
      this.ambientOsc = null;
      this.ambientGain = null;
    }
  }
}

export const soundEngine = new IchigoSoundEngine();
