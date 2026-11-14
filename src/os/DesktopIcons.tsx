import { APP_META, APP_ORDER, type AppId } from './appMeta'
import { useWM } from './context'
import { AppIcon } from './Icons'

interface Props {
  selected: AppId | null
  onSelect: (id: AppId | null) => void
}

export function DesktopIcons({ selected, onSelect }: Props) {
  const { openApp } = useWM()

  // Mouse: um clique seleciona, dois cliques abrem. Toque: um toque abre.
  const onClick = (id: AppId) => {
    if (window.matchMedia('(pointer: coarse)').matches) openApp(id)
    else onSelect(id)
  }

  return (
    <div className="desktop-icons">
      {APP_ORDER.filter((id) => APP_META[id].onDesktop).map((id) => (
        <button
          key={id}
          className={id === selected ? 'desktop-icon is-selected' : 'desktop-icon'}
          onClick={() => onClick(id)}
          onDoubleClick={() => openApp(id)}
          onKeyDown={(e) => e.key === 'Enter' && openApp(id)}
        >
          <AppIcon id={id} size={58} />
          <span>{APP_META[id].label}</span>
        </button>
      ))}
    </div>
  )
}
