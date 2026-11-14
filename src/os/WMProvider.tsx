import { useReducer, type ReactNode } from 'react'
import type { AppId } from './appMeta'
import { WMContext } from './context'
import { initialState, reducer } from './reducer'

export function WMProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openApp = (app: AppId) => {
    dispatch({ type: 'open', app, vw: window.innerWidth, vh: window.innerHeight })
  }

  return <WMContext.Provider value={{ state, dispatch, openApp }}>{children}</WMContext.Provider>
}
