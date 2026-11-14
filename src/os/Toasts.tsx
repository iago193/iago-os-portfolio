import { useWM } from './context'
import { AppIcon } from './Icons'
import { useSystem } from './system'

export function Toasts() {
  const { toasts, dismissToast } = useSystem()
  const { openApp } = useWM()

  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <button
          key={t.id}
          className="toast"
          onClick={() => {
            if (t.app) openApp(t.app)
            dismissToast(t.id)
          }}
        >
          {t.app && <AppIcon id={t.app} size={36} />}
          <span className="toast-text">
            <strong>{t.title}</strong>
            <span>{t.body}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
