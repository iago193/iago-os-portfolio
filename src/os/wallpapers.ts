export interface Wallpaper {
  id: string
  name: string
  background: string
}

export const WALLPAPERS: Wallpaper[] = [
  {
    id: 'aurora',
    name: 'Aurora',
    background:
      'radial-gradient(60% 55% at 15% 20%, rgba(99,102,241,.75), transparent 70%), radial-gradient(55% 60% at 85% 15%, rgba(236,72,153,.6), transparent 70%), radial-gradient(70% 65% at 70% 90%, rgba(14,165,233,.6), transparent 70%), radial-gradient(60% 60% at 10% 95%, rgba(168,85,247,.55), transparent 70%), #10101a',
  },
  {
    id: 'sunset',
    name: 'Pôr do sol',
    background:
      'radial-gradient(70% 60% at 20% 15%, rgba(255,166,0,.8), transparent 70%), radial-gradient(60% 60% at 85% 25%, rgba(244,63,94,.75), transparent 70%), radial-gradient(80% 70% at 50% 100%, rgba(124,58,237,.8), transparent 70%), #2a1245',
  },
  {
    id: 'ocean',
    name: 'Oceano',
    background:
      'radial-gradient(70% 60% at 80% 10%, rgba(34,211,238,.7), transparent 70%), radial-gradient(60% 70% at 10% 40%, rgba(37,99,235,.8), transparent 70%), radial-gradient(70% 60% at 60% 100%, rgba(20,184,166,.6), transparent 70%), #04132b',
  },
  {
    id: 'forest',
    name: 'Floresta',
    background:
      'radial-gradient(65% 60% at 15% 15%, rgba(34,197,94,.55), transparent 70%), radial-gradient(60% 60% at 90% 30%, rgba(132,204,22,.4), transparent 70%), radial-gradient(70% 70% at 40% 100%, rgba(13,148,136,.6), transparent 70%), #07140e',
  },
  {
    id: 'graphite',
    name: 'Grafite',
    background:
      'radial-gradient(70% 60% at 30% 20%, rgba(120,120,135,.45), transparent 70%), radial-gradient(60% 60% at 80% 90%, rgba(70,70,90,.5), transparent 70%), #121217',
  },
  {
    id: 'lavender',
    name: 'Lavanda',
    background:
      'radial-gradient(60% 55% at 20% 20%, #ffd6f0, transparent 70%), radial-gradient(60% 60% at 85% 20%, #c7d2fe, transparent 70%), radial-gradient(70% 65% at 60% 95%, #a5f3fc, transparent 70%), #eef0ff',
  },
]

export function getWallpaper(id: string): Wallpaper {
  return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0]
}
