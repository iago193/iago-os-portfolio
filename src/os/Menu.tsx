export interface MenuItem {
  label?: string
  onClick?: () => void
  disabled?: boolean
  checked?: boolean
  /** Texto à direita (ex.: atalho) */
  hint?: string
  separator?: boolean
}

export function MenuList({ items, onDone }: { items: MenuItem[]; onDone: () => void }) {
  return (
    <div className="menu-list" role="menu">
      {items.map((it, i) =>
        it.separator ? (
          <hr key={i} />
        ) : (
          <button
            key={i}
            role="menuitem"
            disabled={it.disabled}
            onClick={() => {
              it.onClick?.()
              onDone()
            }}
          >
            <span className="menu-check">{it.checked ? '✓' : ''}</span>
            <span className="menu-label">{it.label}</span>
            {it.hint && <span className="menu-hint">{it.hint}</span>}
          </button>
        ),
      )}
    </div>
  )
}
