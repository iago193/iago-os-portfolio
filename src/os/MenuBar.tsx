import { useEffect, useState, type ReactNode } from 'react'
import { APP_META, APP_ORDER } from './appMeta'
import { ControlCenter } from './ControlCenter'
import { useWM } from './context'
import { BatteryIcon, ControlIcon, LogoMark, SearchIcon, WifiIcon } from './Icons'
import { MenuList, type MenuItem } from './Menu'
import { MOD_KEY, useSystem } from './system'
import { useNow } from './useNow'

const fmt = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

function formatClock(d: Date) {
  return fmt.format(d).replace(/[.,]/g, '').replace(/ de /g, ' ')
}

type MenuId = 'apple' | 'app' | 'file' | 'window' | 'help' | 'cc'

export function MenuBar() {
  const { state, dispatch, openApp } = useWM()
  const { lock, restart, setSpotlightOpen } = useSystem()
  const now = useNow()
  const [open, setOpen] = useState<MenuId | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const active = state.activeId
  const appName = active ? APP_META[active].label : 'Início'
  const visible = state.windows.filter((w) => !w.minimized)

  const menus: Record<Exclude<MenuId, 'cc'>, MenuItem[]> = {
    apple: [
      { label: 'Sobre este portfólio', onClick: () => openApp('about') },
      { separator: true },
      { label: 'Ajustes do Sistema…', onClick: () => openApp('settings') },
      { separator: true },
      { label: 'Bloquear tela', onClick: lock },
      { label: 'Reiniciar…', onClick: restart },
    ],
    app: [
      { label: 'Fechar janela', disabled: !active, onClick: () => active && dispatch({ type: 'close', id: active }) },
      { label: 'Minimizar', disabled: !active, onClick: () => active && dispatch({ type: 'minimize', id: active }) },
      { separator: true },
      { label: 'Buscar…', hint: `${MOD_KEY} K`, onClick: () => setSpotlightOpen(true) },
    ],
    file: APP_ORDER.map((id) => ({ label: `Abrir ${APP_META[id].label}`, onClick: () => openApp(id) })),
    window:
      state.windows.length === 0
        ? [{ label: 'Nenhuma janela aberta', disabled: true }]
        : [
            ...state.windows.map((w) => ({
              label: APP_META[w.id].label,
              checked: w.id === active,
              onClick: () => openApp(w.id),
            })),
            { separator: true },
            {
              label: 'Minimizar todas',
              disabled: visible.length === 0,
              onClick: () => visible.forEach((w) => dispatch({ type: 'minimize', id: w.id })),
            },
          ],
    help: [
      { label: 'Buscar…', hint: `${MOD_KEY} K`, onClick: () => setSpotlightOpen(true) },
      { label: 'Abrir o Terminal', onClick: () => openApp('terminal') },
      { separator: true },
      { label: 'Falar com Iago', onClick: () => openApp('contact') },
    ],
  }

  const top = (id: Exclude<MenuId, 'cc'>, label: ReactNode, className: string) => (
    <div className="mb-menuwrap">
      <button
        className={`${className}${open === id ? ' is-open' : ''}`}
        onClick={() => setOpen(open === id ? null : id)}
        onMouseEnter={() => open && open !== 'cc' && setOpen(id)}
      >
        {label}
      </button>
      {open === id && (
        <div className="mb-menu">
          <MenuList items={menus[id]} onDone={() => setOpen(null)} />
        </div>
      )}
    </div>
  )

  return (
    <header className="menubar">
      {open && <div className="mb-overlay" onClick={() => setOpen(null)} />}

      <div className="mb-left">
        {top('apple', <LogoMark />, 'mb-btn mb-logo')}
        {top('app', appName, 'mb-btn mb-app')}
        <span className="mb-hide-sm mb-flex">{top('file', 'Arquivo', 'mb-btn')}</span>
        <span className="mb-hide-sm mb-flex">{top('window', 'Janela', 'mb-btn')}</span>
        <span className="mb-hide-sm mb-flex">{top('help', 'Ajuda', 'mb-btn')}</span>
      </div>

      <div className="mb-right">
        <button className="mb-btn" aria-label="Buscar" onClick={() => setSpotlightOpen(true)}>
          <SearchIcon />
        </button>
        <div className="mb-menuwrap">
          <button
            className={`mb-btn${open === 'cc' ? ' is-open' : ''}`}
            aria-label="Central de Controle"
            onClick={() => setOpen(open === 'cc' ? null : 'cc')}
          >
            <ControlIcon />
          </button>
          {open === 'cc' && (
            <div className="mb-menu mb-menu-right">
              <ControlCenter onDone={() => setOpen(null)} />
            </div>
          )}
        </div>
        <span className="mb-icon mb-hide-sm">
          <WifiIcon />
        </span>
        <span className="mb-icon mb-hide-sm">
          <BatteryIcon />
        </span>
        <span className="mb-clock">{formatClock(now)}</span>
      </div>
    </header>
  )
}
