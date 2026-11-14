import { useState } from 'react'
import { APP_META, APP_ORDER, type AppId } from './appMeta'
import { useWM } from './context'
import { AppIcon, TrashIcon } from './Icons'
import { useSystem } from './system'

export function Dock() {
  const { state, openApp } = useWM()
  const { notify } = useSystem()
  const [bouncing, setBouncing] = useState<AppId | null>(null)

  const launch = (id: AppId) => {
    if (!state.windows.some((w) => w.id === id)) {
      setBouncing(id)
      setTimeout(() => setBouncing(null), 1100)
    }
    openApp(id)
  }

  return (
    <nav className="dock-wrap" aria-label="Dock">
      <div className="dock">
        {APP_ORDER.map((id) => {
          const win = state.windows.find((w) => w.id === id)
          return (
            <button key={id} className="dock-item" onClick={() => launch(id)} aria-label={APP_META[id].label}>
              <span className="dock-tip">{APP_META[id].label}</span>
              <span className={bouncing === id ? 'dock-icon is-bouncing' : 'dock-icon'}>
                <AppIcon id={id} size={60} />
              </span>
              <span className={win ? 'dock-dot is-on' : 'dock-dot'} />
            </button>
          )
        })}

        <span className="dock-sep" aria-hidden="true" />

        <button
          className="dock-item"
          aria-label="Lixeira"
          onClick={() => notify({ title: 'Lixeira', body: 'Está vazia. Aqui só tem projeto bom.' })}
        >
          <span className="dock-tip">Lixeira</span>
          <span className="dock-icon">
            <TrashIcon size={60} />
          </span>
          <span className="dock-dot" />
        </button>
      </div>
    </nav>
  )
}
