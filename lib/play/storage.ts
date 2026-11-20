// Play choices in localStorage. Every access is guarded: private mode or blocked storage just means defaults.

export const PLAY_KEY = 'ashman-play'
export const TIP_KEY = 'ashman-play-tip'

export type PlayState = { k: number; f: string; v: Record<string, string> }

export function readPlay(): PlayState | null {
  try {
    const s = JSON.parse(localStorage.getItem(PLAY_KEY) || 'null')
    return s && typeof s.k === 'number' && typeof s.f === 'string' ? s : null
  } catch {
    return null
  }
}

export function writePlay(state: PlayState) {
  try { localStorage.setItem(PLAY_KEY, JSON.stringify(state)) } catch { /* storage unavailable: choices last this visit */ }
}

export function clearPlay() {
  try { localStorage.removeItem(PLAY_KEY) } catch { /* nothing stored */ }
}
