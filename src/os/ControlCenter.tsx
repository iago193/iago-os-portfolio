import { LockIcon, MoonIcon, SunIcon } from './Icons'
import { usePrefs } from './prefs'
import { useSystem } from './system'
import { WALLPAPERS } from './wallpapers'

export function ControlCenter({ onDone }: { onDone: () => void }) {
  const { theme, toggleTheme, wallpaper, setWallpaper, brightness, setBrightness } = usePrefs()
  const { lock } = useSystem()

  return (
    <div className="cc" role="dialog" aria-label="Central de Controle">
      <div className="cc-tiles">
        <button className="cc-tile" onClick={toggleTheme}>
          <span className="cc-tile-icon is-on">{theme === 'dark' ? <MoonIcon /> : <SunIcon />}</span>
          <span>
            <strong>Aparência</strong>
            <em>{theme === 'dark' ? 'Escuro' : 'Claro'}</em>
          </span>
        </button>
        <button
          className="cc-tile"
          onClick={() => {
            onDone()
            lock()
          }}
        >
          <span className="cc-tile-icon">
            <LockIcon />
          </span>
          <span>
            <strong>Bloquear</strong>
            <em>Tela</em>
          </span>
        </button>
      </div>

      <div className="cc-block">
        <label htmlFor="cc-bright">Brilho</label>
        <input
          id="cc-bright"
          type="range"
          min={40}
          max={100}
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
        />
      </div>

      <div className="cc-block">
        <span>Plano de fundo</span>
        <div className="cc-walls">
          {WALLPAPERS.map((w) => (
            <button
              key={w.id}
              className={w.id === wallpaper ? 'cc-wall is-on' : 'cc-wall'}
              style={{ background: w.background }}
              aria-label={w.name}
              title={w.name}
              onClick={() => setWallpaper(w.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
