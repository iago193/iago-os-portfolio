import { useState, type ReactNode } from 'react'
import { useWM } from './context'
import { MOD_KEY, SystemContext, type Toast } from './system'

export function SystemProvider({ children, onRestart }: { children: ReactNode; onRestart: () => void }) {
  const { state, openApp } = useWM()
  const [locked, setLocked] = useState(true)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [spotlightOpen, setSpotlightOpen] = useState(false)

  const dismissToast = (id: number) => setToasts((t) => t.filter((x) => x.id !== id))

  const notify = (t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random()
    setToasts((list) => [...list.slice(-2), { ...t, id }])
    setTimeout(() => setToasts((list) => list.filter((x) => x.id !== id)), 7000)
  }

  const unlock = () => {
    setLocked(false)
    if (state.windows.length === 0) {
      const small = window.matchMedia('(max-width: 720px)').matches
      if (!small) openApp('about')
      notify({
        title: 'Bem-vindo ao iago OS',
        body: small
          ? 'Toque nos apps para abrir. Dica: use a lupa para buscar e abra o Terminal.'
          : `Explore os apps no dock ou aperte ${MOD_KEY} + K para buscar. Dica: abra o Terminal.`,
        app: 'terminal',
      })
    }
  }

  const lock = () => {
    setSpotlightOpen(false)
    setLocked(true)
  }

  return (
    <SystemContext.Provider
      value={{ locked, unlock, lock, restart: onRestart, toasts, notify, dismissToast, spotlightOpen, setSpotlightOpen }}
    >
      {children}
    </SystemContext.Provider>
  )
}
