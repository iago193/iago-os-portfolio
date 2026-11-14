import { createContext, useContext } from 'react'
import type { AppId } from './appMeta'

export interface Toast {
  id: number
  title: string
  body: string
  /** App que abre ao clicar na notificação */
  app?: AppId
}

export interface SystemContextValue {
  locked: boolean
  unlock: () => void
  lock: () => void
  /** Volta para a tela de bloqueio com todas as janelas fechadas */
  restart: () => void
  toasts: Toast[]
  notify: (t: Omit<Toast, 'id'>) => void
  dismissToast: (id: number) => void
  spotlightOpen: boolean
  setSpotlightOpen: (v: boolean) => void
}

export const SystemContext = createContext<SystemContextValue | null>(null)

export function useSystem(): SystemContextValue {
  const ctx = useContext(SystemContext)
  if (!ctx) throw new Error('useSystem precisa estar dentro de <SystemProvider>')
  return ctx
}

/** Atalho do teclado exibido nas dicas (⌘ no Mac, Ctrl no resto). */
export const MOD_KEY = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl'
