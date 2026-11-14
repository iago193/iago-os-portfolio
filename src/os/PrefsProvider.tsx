import { useEffect, useState, type ReactNode } from 'react'
import { PrefsContext, type Prefs, type Theme } from './prefs'

const KEY = 'iago-os-prefs'
const DEFAULTS: Prefs = { theme: 'dark', wallpaper: 'aurora', brightness: 100 }

function load(): Prefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    /* localStorage indisponível: usa o padrão */
  }
  return DEFAULTS
}

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(load)

  useEffect(() => {
    document.documentElement.dataset.theme = prefs.theme
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs))
    } catch {
      /* ignora */
    }
  }, [prefs])

  const setTheme = (theme: Theme) => setPrefs((p) => ({ ...p, theme }))
  const toggleTheme = () => setPrefs((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' }))
  const setWallpaper = (wallpaper: string) => setPrefs((p) => ({ ...p, wallpaper }))
  const setBrightness = (brightness: number) => setPrefs((p) => ({ ...p, brightness }))

  return (
    <PrefsContext.Provider value={{ ...prefs, setTheme, toggleTheme, setWallpaper, setBrightness }}>
      {children}
    </PrefsContext.Provider>
  )
}
