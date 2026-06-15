let audioCtx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    audioCtx = new AudioContext()
  }
  return audioCtx
}

export function resumeAudio(): void {
  getCtx()?.resume()
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.08,
  startFreq?: number,
): void {
  const ctx = getCtx()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(startFreq ?? freq, ctx.currentTime)
  if (startFreq) {
    osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + duration * 0.6)
  }
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + duration)
}

export function playPlaceSound(): void {
  tone(520, 0.12, 'sine', 0.07)
  setTimeout(() => tone(780, 0.1, 'sine', 0.05), 60)
}

export function playDeleteSound(): void {
  tone(300, 0.15, 'triangle', 0.06, 450)
}

export function playRotateSound(): void {
  tone(600, 0.08, 'sine', 0.04)
}

export function playQuestCompleteSound(): void {
  const notes = [523, 659, 784, 1047]
  notes.forEach((n, i) => setTimeout(() => tone(n, 0.2, 'sine', 0.07), i * 120))
}

export function playSeagullSound(): void {
  const ctx = getCtx()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(900, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.25)
  osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.5)
  gain.gain.setValueAtTime(0.015, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.55)
}

let waveNode: OscillatorNode | null = null
let waveGain: GainNode | null = null

export function startWaveAmbience(): void {
  const ctx = getCtx()
  if (!ctx || waveNode) return

  const bufferSize = ctx.sampleRate * 2
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  noise.loop = true

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 400

  waveGain = ctx.createGain()
  waveGain.gain.value = 0.012

  noise.connect(filter)
  filter.connect(waveGain)
  waveGain.connect(ctx.destination)
  noise.start()
  waveNode = noise as unknown as OscillatorNode
}

export function stopWaveAmbience(): void {
  if (waveGain) {
    waveGain.gain.exponentialRampToValueAtTime(0.001, getCtx()!.currentTime + 0.5)
  }
  waveNode = null
  waveGain = null
}

export function setWaveVolume(dayFactor: number): void {
  if (waveGain) {
    waveGain.gain.value = 0.008 + dayFactor * 0.008
  }
}
