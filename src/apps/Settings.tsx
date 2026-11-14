import { useState } from 'react'
import { profile } from '../data/content'
import { usePrefs } from '../os/prefs'
import { WALLPAPERS } from '../os/wallpapers'

type Section = 'appearance' | 'wallpaper' | 'display' | 'about'

const SECTIONS: { id: Section; label: string }[] = [
  { id: 'appearance', label: 'Aparência' },
  { id: 'wallpaper', label: 'Plano de fundo' },
  { id: 'display', label: 'Tela' },
  { id: 'about', label: 'Sobre' },
]

export function Settings() {
  const { theme, setTheme, wallpaper, setWallpaper, brightness, setBrightness } = usePrefs()
  const [section, setSection] = useState<Section>('appearance')

  return (
    <div className="finder">
      <aside className="fx-side">
        <div className="drag-region fx-side-top" />
        <p className="side-label">Ajustes</p>
        {SECTIONS.map((s) => (
          <button key={s.id} className={s.id === section ? 'side-item is-on' : 'side-item'} onClick={() => setSection(s.id)}>
            <span className="side-dot" />
            {s.label}
          </button>
        ))}
      </aside>

      <div className="fx-main">
        <div className="fx-toolbar drag-region">
          <strong className="fx-title">{SECTIONS.find((x) => x.id === section)?.label}</strong>
        </div>
        <div className="fx-body settings-main">
        {section === 'appearance' && (
          <>
            <h3>Aparência</h3>
            <div className="pref-cards">
              {(['light', 'dark'] as const).map((t) => (
                <button key={t} className={t === theme ? 'pref-card is-on' : 'pref-card'} onClick={() => setTheme(t)}>
                  <span className={`pref-prev prev-${t}`}>
                    <i />
                    <i />
                  </span>
                  {t === 'light' ? 'Claro' : 'Escuro'}
                </button>
              ))}
            </div>
          </>
        )}

        {section === 'wallpaper' && (
          <>
            <h3>Plano de fundo</h3>
            <div className="wp-grid">
              {WALLPAPERS.map((w) => (
                <button key={w.id} className={w.id === wallpaper ? 'wp is-on' : 'wp'} onClick={() => setWallpaper(w.id)}>
                  <span className="wp-swatch" style={{ background: w.background }} />
                  {w.name}
                </button>
              ))}
            </div>
          </>
        )}

        {section === 'display' && (
          <>
            <h3>Tela</h3>
            <div className="set-row">
              <label htmlFor="set-bright">Brilho</label>
              <input id="set-bright" type="range" min={40} max={100} value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
              <span className="muted">{brightness}%</span>
            </div>
          </>
        )}

        {section === 'about' && (
          <>
            <h3>Sobre este portfólio</h3>
            <dl className="about-list">
              <dt>Sistema</dt>
              <dd>iago OS 1.0</dd>
              <dt>Dono</dt>
              <dd>
                {profile.name} · {profile.role}
              </dd>
              <dt>Tecnologia</dt>
              <dd>React, TypeScript e Vite, sem bibliotecas de interface</dd>
              <dt>Atalhos</dt>
              <dd>Ctrl/⌘ + K abre a busca · clique direito no desktop abre o menu</dd>
            </dl>
          </>
        )}
        </div>
      </div>
    </div>
  )
}
