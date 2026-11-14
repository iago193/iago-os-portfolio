import { useId, useState, type ReactNode } from 'react'
import type { AppId } from './appMeta'

/**
 * Ícones de app no estilo "squircle": formato arredondado contínuo, degradê com brilho no topo,
 * borda com luz/sombra e ilustração com camadas. Desenhos originais (não são cópias de ícones de ninguém).
 */
const SQUIRCLE =
  'M18.5 2H45.5C56.3 2 62 7.7 62 18.5V45.5C62 56.3 56.3 62 45.5 62H18.5C7.7 62 2 56.3 2 45.5V18.5C2 7.7 7.7 2 18.5 2Z'

const TILE: Record<AppId, [string, string]> = {
  projects: ['#62bcff', '#1f6be6'],
  about: ['#ffa86f', '#ee4660'],
  resume: ['#9a92ff', '#4f41d6'],
  contact: ['#58e6a8', '#0e9f63'],
  whatsapp: ['#5ee27e', '#12a150'],
  linkedin: ['#3b9bf5', '#0b5fc2'],
  github: ['#4d525e', '#14161b'],
  terminal: ['#454650', '#0c0d11'],
  settings: ['#a9afbd', '#555a69'],
}

/** Sombra suave da ilustração (dá profundidade) */
function Shadow({ id }: { id: string }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="1.6" stdDeviation="1.2" floodColor="#000" floodOpacity="0.3" />
    </filter>
  )
}

function Art({ app, u }: { app: AppId; u: string }): ReactNode {
  const sh = `url(#${u}-sh)`
  switch (app) {
    case 'projects':
      return (
        <g filter={sh}>
          <defs>
            <linearGradient id={`${u}-a`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d6e6ff" />
            </linearGradient>
          </defs>
          <path d="M11 20.5a4 4 0 0 1 4-4h10.2l4.6 4.6H49a4 4 0 0 1 4 4V45a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4Z" fill="#a9ccff" />
          <rect x="15.5" y="22" width="31" height="14" rx="2" fill="#fff" transform="rotate(-3 31 29)" />
          <rect x="17" y="24" width="31" height="14" rx="2" fill="#f1f6ff" transform="rotate(2 32 31)" />
          <path d="M11 29a4 4 0 0 1 4-4h34a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4Z" fill={`url(#${u}-a)`} />
          <path d="M12 29.6a3.4 3.4 0 0 1 3.4-3.4h33.2a3.4 3.4 0 0 1 3.4 3.4" fill="none" stroke="#fff" strokeWidth="1.2" opacity=".9" />
        </g>
      )
    case 'about':
      return (
        <g filter={sh}>
          <defs>
            <linearGradient id={`${u}-a`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#ffd9c8" />
            </linearGradient>
          </defs>
          <path d="M14.5 51c0-9.6 8-15.5 17.5-15.5S49.5 41.4 49.5 51c0 1.4-1.1 2.5-2.5 2.5H17c-1.4 0-2.5-1.1-2.5-2.5Z" fill={`url(#${u}-a)`} />
          <circle cx="32" cy="24.5" r="9.5" fill={`url(#${u}-a)`} />
          <ellipse cx="32" cy="37" rx="7" ry="2.2" fill="#e8a089" opacity=".35" />
        </g>
      )
    case 'resume':
      return (
        <g filter={sh}>
          <defs>
            <linearGradient id={`${u}-a`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#e9e7ff" />
            </linearGradient>
          </defs>
          <path d="M18 11.5h18.5L49 24v26.5a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3v-36a3 3 0 0 1 3-3Z" fill={`url(#${u}-a)`} />
          <path d="M36.5 11.5V21a3 3 0 0 0 3 3H49Z" fill="#c8c2ff" />
          <rect x="20.5" y="28" width="13" height="4.4" rx="2.2" fill="#6a5cf0" />
          <rect x="20.5" y="36" width="23" height="2.6" rx="1.3" fill="#c3bff0" />
          <rect x="20.5" y="41.2" width="23" height="2.6" rx="1.3" fill="#c3bff0" />
          <rect x="20.5" y="46.4" width="14" height="2.6" rx="1.3" fill="#c3bff0" />
        </g>
      )
    case 'contact':
      return (
        <g filter={sh}>
          <defs>
            <linearGradient id={`${u}-a`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d9f8ea" />
            </linearGradient>
          </defs>
          <rect x="12" y="18.5" width="40" height="28" rx="5" fill={`url(#${u}-a)`} />
          <path d="m13.5 22.5 18.5 14.5 18.5-14.5" fill="none" stroke="#25b87c" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 45 26 34M49.5 45 38 34" fill="none" stroke="#a9e6cd" strokeWidth="2" strokeLinecap="round" />
        </g>
      )
    case 'terminal':
      return (
        <g>
          <path d="m19 22.5 11.5 9.5-11.5 9.5" fill="none" stroke="#7cffb2" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity=".16" />
          <path d="m19 22.5 11.5 9.5-11.5 9.5" fill="none" stroke="#7cffb2" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="34.5" y="38.5" width="12.5" height="4.2" rx="1.6" fill="#7cffb2" />
        </g>
      )
    case 'settings':
      return (
        <g filter={sh}>
          <defs>
            <linearGradient id={`${u}-a`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#c7ccd8" />
            </linearGradient>
          </defs>
          <g fill={`url(#${u}-a)`}>
            {[0, 45, 90, 135].map((a) => (
              <rect key={a} x="28.4" y="10.5" width="7.2" height="43" rx="2.6" transform={`rotate(${a} 32 32)`} />
            ))}
            <circle cx="32" cy="32" r="16" />
          </g>
          <circle cx="32" cy="32" r="7" fill="#6a6f7e" />
          <circle cx="32" cy="32" r="7" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1" />
        </g>
      )
    case 'whatsapp':
      return (
        <g fill="none" stroke="#fff" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M17 21a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H31l-8 7v-7h-2a4 4 0 0 1-4-4V21Z" fill="rgba(255,255,255,.22)" />
          <path d="M25.5 28h.01M32 28h.01M38.5 28h.01" strokeWidth="4" />
        </g>
      )
    case 'linkedin':
      return (
        <g fill="none" stroke="#fff" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
          <rect x="14" y="23" width="36" height="24" rx="4" fill="rgba(255,255,255,.22)" />
          <path d="M26 23v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3M14 34h36" />
        </g>
      )
    case 'github':
      return (
        <g fill="none" stroke="#fff" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
          <circle cx="24" cy="20" r="4.2" />
          <circle cx="24" cy="44" r="4.2" />
          <circle cx="42" cy="27" r="4.2" />
          <path d="M24 24.2v15.6M42 31.2c0 7-18 3-18 8.6" />
        </g>
      )
  }
}

function GenericIcon({ id, size }: { id: AppId; size: number }) {
  const u = useId().replace(/:/g, '')
  const [top, bottom] = TILE[id]
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${u}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <linearGradient id={`${u}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".34" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".65" />
          <stop offset=".45" stopColor="#fff" stopOpacity=".08" />
          <stop offset="1" stopColor="#000" stopOpacity=".32" />
        </linearGradient>
        <Shadow id={`${u}-sh`} />
      </defs>
      <path d={SQUIRCLE} fill={`url(#${u}-bg)`} />
      <path d={SQUIRCLE} fill={`url(#${u}-gloss)`} />
      <path d={SQUIRCLE} fill="none" stroke={`url(#${u}-edge)`} strokeWidth="1.2" />
      <Art app={id} u={u} />
    </svg>
  )
}

/**
 * Ícones de marca: se existir o arquivo em public/icons/<app>.png, ele é usado.
 * Os arquivos são PNG 256×256 com fundo transparente (veja public/icons/LEIA-ME.txt).
 * Sem o arquivo, cai no ícone genérico acima.
 */
const BRAND_FILES: Partial<Record<AppId, string>> = {
  whatsapp: '/icons/whatsapp.png',
  linkedin: '/icons/linkedin.png',
  github: '/icons/github.png',
}

export function AppIcon({ id, size = 56 }: { id: AppId; size?: number }) {
  const [failed, setFailed] = useState(false)
  const file = BRAND_FILES[id]
  if (!file || failed) return <GenericIcon id={id} size={size} />
  return (
    <img
      src={file}
      width={size}
      height={size}
      alt=""
      draggable={false}
      style={{ objectFit: 'contain', display: 'block' }}
      onError={() => setFailed(true)}
    />
  )
}

export function WifiIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M1.5 5.2a9.5 9.5 0 0 1 13 0M3.7 7.9a6.3 6.3 0 0 1 8.6 0M5.9 10.5a3.1 3.1 0 0 1 4.2 0" />
      <circle cx="8" cy="12.4" r=".9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function BatteryIcon() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden="true">
      <rect x=".75" y=".75" width="20" height="10.5" rx="3" stroke="currentColor" strokeOpacity=".6" strokeWidth="1.2" />
      <rect x="2.5" y="2.5" width="14" height="7" rx="1.6" fill="currentColor" />
      <path d="M22.2 4v4c.9-.3 1.4-1.1 1.4-2s-.5-1.7-1.4-2Z" fill="currentColor" fillOpacity=".6" />
    </svg>
  )
}

export function LogoMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1.2 14.4 8 8 14.8 1.6 8 8 1.2Z" fill="currentColor" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="7" cy="7" r="4.6" />
      <path d="m10.6 10.6 3.4 3.4" />
    </svg>
  )
}

export function ControlIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="1" y="1" width="14" height="5" rx="2.5" />
      <circle cx="11.5" cy="3.5" r="1.4" fill="currentColor" stroke="none" />
      <rect x="1" y="8" width="14" height="5" rx="2.5" />
      <circle cx="4.5" cy="10.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="10" cy="10" r="3.6" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M4.3 15.7l1.4-1.4M14.3 5.7l1.4-1.4" />
    </svg>
  )
}

export function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" />
    </svg>
  )
}

export function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="9" width="12" height="8" rx="2" />
      <path d="M7 9V6.5a3 3 0 0 1 6 0V9" />
    </svg>
  )
}

export function TrashIcon({ size = 56 }: { size?: number }) {
  const u = useId().replace(/:/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${u}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".34" />
          <stop offset="1" stopColor="#fff" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={`${u}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".6" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".1" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id={`${u}-bin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9d0dc" />
        </linearGradient>
        <Shadow id={`${u}-sh`} />
      </defs>
      <path d={SQUIRCLE} fill={`url(#${u}-bg)`} />
      <path d={SQUIRCLE} fill="none" stroke={`url(#${u}-edge)`} strokeWidth="1.2" />
      <g filter={`url(#${u}-sh)`}>
        <path d="M27.5 19.5v-2a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v2" fill="none" stroke="#e6eaf1" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M19.5 25h25l-2.1 21.4a3.2 3.2 0 0 1-3.2 2.9H24.8a3.2 3.2 0 0 1-3.2-2.9Z" fill={`url(#${u}-bin)`} />
        <rect x="15.5" y="20.5" width="33" height="5" rx="2.2" fill="#fff" />
        <path d="M27.5 29.5v14M32 29.5v14M36.5 29.5v14" stroke="#7d869a" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}
