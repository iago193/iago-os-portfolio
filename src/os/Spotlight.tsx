import { useState, type KeyboardEvent } from 'react'
import { links, projects } from '../data/content'
import { APP_META, APP_ORDER, type AppId } from './appMeta'
import { useWM } from './context'
import { AppIcon } from './Icons'
import { usePrefs } from './prefs'
import { MOD_KEY, useSystem } from './system'

interface Item {
  id: string
  title: string
  subtitle: string
  icon?: AppId
  run: () => void
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function Spotlight() {
  const { setSpotlightOpen, lock, restart } = useSystem()
  const { openApp } = useWM()
  const { theme, toggleTheme } = usePrefs()
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)

  const open = (url: string) => window.open(url, '_blank', 'noopener')

  const all: Item[] = [
    ...APP_ORDER.map((id) => ({
      id: `app-${id}`,
      title: APP_META[id].label,
      subtitle: 'Aplicativo',
      icon: id,
      run: () => openApp(id),
    })),
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      title: p.name,
      subtitle: `Projeto · ${p.category} · ${p.stack.join(', ')}`,
      icon: 'projects' as AppId,
      run: () => openApp('projects'),
    })),
    { id: 'act-theme', title: theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro', subtitle: 'Ação', run: toggleTheme },
    { id: 'act-lock', title: 'Bloquear tela', subtitle: 'Ação', run: lock },
    { id: 'act-restart', title: 'Reiniciar', subtitle: 'Ação', run: restart },
    { id: 'tech-terminal', title: 'Terminal: comandos técnicos', subtitle: 'Para devs · digite "help", "stack", "tree"…', icon: 'terminal', run: () => openApp('terminal') },
    { id: 'tech-repo', title: 'Ver código-fonte deste portfólio', subtitle: 'Para devs · GitHub', run: () => open(links.repo) },
  ]

  const q = norm(query.trim())
  const results = q ? all.filter((i) => norm(`${i.title} ${i.subtitle}`).includes(q)) : all.slice(0, APP_ORDER.length)
  const active = Math.min(index, Math.max(results.length - 1, 0))

  const close = () => setSpotlightOpen(false)
  const run = (item: Item | undefined) => {
    if (!item) return
    close()
    item.run()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((active + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((active - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter') run(results[active])
  }

  return (
    <div className="sp-overlay" onPointerDown={close}>
      <div className="sp" role="dialog" aria-label="Busca" onPointerDown={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIndex(0)
          }}
          onKeyDown={onKeyDown}
          placeholder={`Buscar apps, projetos, comandos…  (${MOD_KEY} + K)`}
          aria-label="Buscar"
        />
        <div className="sp-list">
          {results.length === 0 && <p className="sp-empty">Nenhum resultado para “{query}”.</p>}
          {results.map((r, i) => (
            <button
              key={r.id}
              className={i === active ? 'sp-item is-on' : 'sp-item'}
              onMouseEnter={() => setIndex(i)}
              onClick={() => run(r)}
            >
              {r.icon ? <AppIcon id={r.icon} size={30} /> : <span className="sp-glyph">↗</span>}
              <span className="sp-text">
                <strong>{r.title}</strong>
                <span>{r.subtitle}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
