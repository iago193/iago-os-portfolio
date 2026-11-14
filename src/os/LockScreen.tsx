import { useState } from 'react'
import { profile } from '../data/content'
import { usePrefs } from './prefs'
import { useSystem } from './system'
import { useNow } from './useNow'
import { getWallpaper } from './wallpapers'

export function LockScreen() {
  const { unlock } = useSystem()
  const { wallpaper } = usePrefs()
  const now = useNow(5000)
  const [leaving, setLeaving] = useState(false)

  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const rawDate = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
  const date = rawDate.charAt(0).toUpperCase() + rawDate.slice(1)

  const enter = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(unlock, 380)
  }

  return (
    <div className={leaving ? 'lock is-leaving' : 'lock'} style={{ background: getWallpaper(wallpaper).background }}>
      <div className="lock-shade" />
      <div className="lock-date">{date}</div>
      <div className="lock-time">{time}</div>

      <div className="lock-user">
        {profile.photo ? (
          <img className="avatar" src={profile.photo} alt="" />
        ) : (
          <div className="avatar avatar-initials" aria-hidden="true">
            {profile.initials}
          </div>
        )}
        <strong>{profile.name}</strong>
        <button className="lock-enter" autoFocus onClick={enter}>
          Entrar no portfólio
        </button>
        <span className="lock-hint">Pressione Enter ou clique para entrar</span>
      </div>
    </div>
  )
}
