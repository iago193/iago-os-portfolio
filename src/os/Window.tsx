import { useRef, type PointerEvent as RPointerEvent } from 'react'
import { APP_META } from './appMeta'
import { useWM } from './context'
import { MENUBAR_H, type WindowState } from './reducer'
import { APP_COMPONENTS } from './registry'

type Dir = 'e' | 's' | 'se'

interface DragInfo {
  startX: number
  startY: number
  winX: number
  winY: number
}

interface ResizeInfo {
  dir: Dir
  startX: number
  startY: number
  x: number
  y: number
  w: number
  h: number
}

export function Window({ win }: { win: WindowState }) {
  const { state, dispatch } = useWM()
  const meta = APP_META[win.id]
  const Content = APP_COMPONENTS[win.id]
  const active = state.activeId === win.id
  const drag = useRef<DragInfo | null>(null)
  const resize = useRef<ResizeInfo | null>(null)

  const focus = () => dispatch({ type: 'focus', id: win.id })

  const canDrag = (t: EventTarget) => {
    const el = t as HTMLElement
    return !!el.closest('.titlebar, .drag-region') && !el.closest('button, input, a, select, textarea, .traffic')
  }

  const onTitleDown = (e: RPointerEvent<HTMLElement>) => {
    focus()
    if (!canDrag(e.target) || win.maximized || e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { startX: e.clientX, startY: e.clientY, winX: win.x, winY: win.y }
  }

  const onTitleMove = (e: RPointerEvent<HTMLElement>) => {
    const d = drag.current
    if (!d) return
    const x = d.winX + (e.clientX - d.startX)
    const y = Math.max(MENUBAR_H, d.winY + (e.clientY - d.startY))
    dispatch({ type: 'move', id: win.id, x, y })
  }

  const onTitleUp = () => {
    drag.current = null
  }

  const onResizeDown = (e: RPointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
    focus()
    if (win.maximized) return
    const dir = e.currentTarget.dataset.dir as Dir
    e.currentTarget.setPointerCapture(e.pointerId)
    resize.current = { dir, startX: e.clientX, startY: e.clientY, x: win.x, y: win.y, w: win.w, h: win.h }
  }

  const onResizeMove = (e: RPointerEvent<HTMLDivElement>) => {
    const r = resize.current
    if (!r) return
    const w = r.dir === 's' ? r.w : Math.max(meta.minW, r.w + (e.clientX - r.startX))
    const h = r.dir === 'e' ? r.h : Math.max(meta.minH, r.h + (e.clientY - r.startY))
    dispatch({ type: 'resize', id: win.id, bounds: { x: r.x, y: r.y, w, h } })
  }

  const onResizeUp = () => {
    resize.current = null
  }

  const stop = (e: RPointerEvent) => e.stopPropagation()

  const className = [
    'window',
    meta.unified ? 'is-unified' : '',
    `win-${win.id}`,
    active ? 'is-active' : 'is-inactive',
    win.minimized ? 'is-minimized' : '',
    win.maximized ? 'is-maximized' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={className}
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
      aria-label={meta.title}
      aria-hidden={win.minimized}
      onPointerDown={onTitleDown}
      onPointerMove={onTitleMove}
      onPointerUp={onTitleUp}
      onPointerCancel={onTitleUp}
      onDoubleClick={(e) => {
        if (canDrag(e.target)) dispatch({ type: 'toggleMax', id: win.id })
      }}
    >
      <header className="titlebar">
        <div className="traffic">
          <button className="tl tl-close" aria-label="Fechar" onPointerDown={stop} onClick={() => dispatch({ type: 'close', id: win.id })} />
          <button className="tl tl-min" aria-label="Minimizar" onPointerDown={stop} onClick={() => dispatch({ type: 'minimize', id: win.id })} />
          <button className="tl tl-max" aria-label="Maximizar" onPointerDown={stop} onClick={() => dispatch({ type: 'toggleMax', id: win.id })} />
        </div>
        <h2 className="title">{meta.title}</h2>
      </header>

      <div className="window-body">
        <Content />
      </div>

      <div className="rz rz-e" data-dir="e" onPointerDown={onResizeDown} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} />
      <div className="rz rz-s" data-dir="s" onPointerDown={onResizeDown} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} />
      <div className="rz rz-se" data-dir="se" onPointerDown={onResizeDown} onPointerMove={onResizeMove} onPointerUp={onResizeUp} onPointerCancel={onResizeUp} />
    </section>
  )
}
