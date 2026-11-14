import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light'

export interface Prefs {
  theme: Theme
  wallpaper: string
  /** 40–100 */
  brightness: number
}

export interface PrefsContextValue extends Prefs {
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  setWallpaper: (id: string) => void
  setBrightness: (n: number) => void
}

export const PrefsContext = createContext<PrefsContextValue | null>(null)

export function usePrefs(): PrefsContextValue {
  const ctx = useContext(PrefsContext)
  if (!ctx) throw new Error('usePrefs precisa estar dentro de <PrefsProvider>')
  return ctx
}
