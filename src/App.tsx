import { useEffect, useState, type MouseEvent } from 'react'
import { DesktopIcons } from './os/DesktopIcons'
import { useWM } from './os/context'
import { Dock } from './os/Dock'
import { LockScreen } from './os/LockScreen'
import { MenuBar } from './os/MenuBar'
import { MenuList, type MenuItem } from './os/Menu'
import { PrefsProvider } from './os/PrefsProvider'
import { usePrefs } from './os/prefs'
import { Spotlight } from './os/Spotlight'
import { SystemProvider } from './os/SystemProvider'
import { useSystem } from './os/system'
import { Toasts } from './os/Toasts'
import type { AppId } from './os/appMeta'
import { getWallpaper } from './os/wallpapers'
import { Window } from './os/Window'
import { WMProvider } from './os/WMProvider'

interface Point {
  x: number
  y: number
}

function Desktop() {
  const { state, openApp } = useWM()
  const { locked, spotlightOpen, setSpotlightOpen, lock } = useSystem()
  const { wallpaper, brightness, toggleTheme, theme } = usePrefs()
  const [ctx, setCtx] = useState<Point | null>(null)
  const [selected, setSelected] = useState<AppId | null>(null)

  // Ctrl/⌘ + K abre a busca
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSpotlightOpen(!spotlightOpen && !locked)
      } else if (e.key === 'Escape') {
        setCtx(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [spotlightOpen, locked, setSpotlightOpen])

  const onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.window, .menubar, .dock-wrap, .lock, .sp-overlay')) return
    e.preventDefault()
    setCtx({ x: Math.min(e.clientX, window.innerWidth - 240), y: Math.min(e.clientY, window.innerHeight - 260) })
  }

  const ctxItems: MenuItem[] = [
    { label: 'Abrir Projetos', onClick: () => openApp('projects') },
    { label: 'Abrir Terminal', onClick: () => openApp('terminal') },
    { separator: true },
    { label: 'Alterar plano de fundo…', onClick: () => openApp('settings') },
    { label: theme === 'dark' ? 'Usar aparência clara' : 'Usar aparência escura', onClick: toggleTheme },
    { separator: true },
    { label: 'Buscar…', onClick: () => setSpotlightOpen(true) },
    { label: 'Bloquear tela', onClick: lock },
  ]

  return (
    <div
      className="desktop"
      style={{ background: getWallpaper(wallpaper).background }}
      onContextMenu={onContextMenu}
      onPointerDown={(e) => {
        if (!(e.target as HTMLElement).closest('.desktop-icon')) setSelected(null)
      }}
    >
      <MenuBar />
      <DesktopIcons selected={selected} onSelect={setSelected} />
      {state.windows.map((w) => (
        <Window key={w.id} win={w} />
      ))}
      <Dock />
      <Toasts />

      {ctx && (
        <>
          <div
            className="ctx-overlay"
            onPointerDown={() => setCtx(null)}
            onContextMenu={(e) => {
              e.preventDefault()
              setCtx(null)
            }}
          />
          <div className="ctx" style={{ left: ctx.x, top: ctx.y }}>
            <MenuList items={ctxItems} onDone={() => setCtx(null)} />
          </div>
        </>
      )}

      {spotlightOpen && !locked && <Spotlight />}
      {locked && <LockScreen />}
      <div className="dim" style={{ opacity: (100 - brightness) / 100 }} />
    </div>
  )
}

function Shell({ onRestart }: { onRestart: () => void }) {
  return (
    <WMProvider>
      <SystemProvider onRestart={onRestart}>
        <Desktop />
      </SystemProvider>
    </WMProvider>
  )
}

export default function App() {
  const [session, setSession] = useState(0)
  return (
    <PrefsProvider>
      <Shell key={session} onRestart={() => setSession((s) => s + 1)} />
    </PrefsProvider>
  )
}
