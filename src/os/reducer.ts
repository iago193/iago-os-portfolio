import { APP_META, type AppId } from './appMeta'

export const MENUBAR_H = 28
export const DOCK_H = 96

export interface Bounds {
  x: number
  y: number
  w: number
  h: number
}

export interface WindowState extends Bounds {
  id: AppId
  z: number
  minimized: boolean
  maximized: boolean
  /** Tamanho/posição antes de maximizar */
  restore?: Bounds
}

export interface WMState {
  windows: WindowState[]
  nextZ: number
  activeId: AppId | null
}

export type WMAction =
  | { type: 'open'; app: AppId; vw: number; vh: number }
  | { type: 'close'; id: AppId }
  | { type: 'focus'; id: AppId }
  | { type: 'minimize'; id: AppId }
  | { type: 'toggleMax'; id: AppId }
  | { type: 'move'; id: AppId; x: number; y: number }
  | { type: 'resize'; id: AppId; bounds: Bounds }

export const initialState: WMState = { windows: [], nextZ: 1, activeId: null }

function topVisible(windows: WindowState[]): AppId | null {
  const visible = windows.filter((w) => !w.minimized)
  if (visible.length === 0) return null
  return visible.reduce((a, b) => (a.z > b.z ? a : b)).id
}

export function reducer(state: WMState, action: WMAction): WMState {
  switch (action.type) {
    case 'open': {
      const existing = state.windows.find((w) => w.id === action.app)
      if (existing) {
        return {
          ...state,
          nextZ: state.nextZ + 1,
          activeId: action.app,
          windows: state.windows.map((w) =>
            w.id === action.app ? { ...w, minimized: false, z: state.nextZ } : w,
          ),
        }
      }
      const meta = APP_META[action.app]
      const w = Math.min(meta.defaultW, action.vw - 24)
      const h = Math.min(meta.defaultH, action.vh - MENUBAR_H - DOCK_H)
      const cascade = (state.windows.length % 6) * 28
      const x = Math.max(8, Math.round((action.vw - w) / 2) + cascade - 60)
      const y = Math.max(MENUBAR_H + 8, Math.round((action.vh - h - DOCK_H) / 2) + cascade - 20)
      const win: WindowState = { id: action.app, x, y, w, h, z: state.nextZ, minimized: false, maximized: false }
      return { windows: [...state.windows, win], nextZ: state.nextZ + 1, activeId: action.app }
    }
    case 'close': {
      const windows = state.windows.filter((w) => w.id !== action.id)
      return { ...state, windows, activeId: state.activeId === action.id ? topVisible(windows) : state.activeId }
    }
    case 'focus': {
      if (state.activeId === action.id) return state
      return {
        ...state,
        nextZ: state.nextZ + 1,
        activeId: action.id,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, z: state.nextZ } : w)),
      }
    }
    case 'minimize': {
      const windows = state.windows.map((w) => (w.id === action.id ? { ...w, minimized: true } : w))
      return { ...state, windows, activeId: state.activeId === action.id ? topVisible(windows) : state.activeId }
    }
    case 'toggleMax':
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w
          if (w.maximized) return { ...w, ...(w.restore ?? {}), maximized: false, restore: undefined }
          return { ...w, maximized: true, restore: { x: w.x, y: w.y, w: w.w, h: w.h } }
        }),
      }
    case 'move':
      return {
        ...state,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, x: action.x, y: action.y } : w)),
      }
    case 'resize':
      return {
        ...state,
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, ...action.bounds } : w)),
      }
  }
}
