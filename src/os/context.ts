import { createContext, useContext, type Dispatch } from 'react'
import type { AppId } from './appMeta'
import type { WMAction, WMState } from './reducer'

export interface WMContextValue {
  state: WMState
  dispatch: Dispatch<WMAction>
  /** Abre (ou traz para frente) um app, usando o tamanho atual da tela */
  openApp: (app: AppId) => void
}

export const WMContext = createContext<WMContextValue | null>(null)

export function useWM(): WMContextValue {
  const ctx = useContext(WMContext)
  if (!ctx) throw new Error('useWM precisa estar dentro de <WMProvider>')
  return ctx
}
