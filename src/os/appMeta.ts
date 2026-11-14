export type AppId = 'projects' | 'about' | 'resume' | 'contact' | 'whatsapp' | 'linkedin' | 'github' | 'terminal' | 'settings'

export interface AppMeta {
  id: AppId
  title: string
  /** Rótulo abaixo do ícone no desktop e no tooltip do dock */
  label: string
  defaultW: number
  defaultH: number
  minW: number
  minH: number
  /** Aparece como ícone no desktop */
  onDesktop: boolean
  /** Janela estilo Finder: barra lateral até o topo e traços do app na barra de ferramentas */
  unified?: boolean
}

export const APP_META: Record<AppId, AppMeta> = {
  projects: { id: 'projects', title: 'Projetos', label: 'Projetos', defaultW: 860, defaultH: 540, minW: 520, minH: 380, onDesktop: true, unified: true },
  about: { id: 'about', title: 'Sobre mim', label: 'Sobre mim', defaultW: 760, defaultH: 520, minW: 480, minH: 360, onDesktop: true, unified: true },
  resume: { id: 'resume', title: 'Currículo.pdf', label: 'Currículo', defaultW: 700, defaultH: 600, minW: 460, minH: 380, onDesktop: true },
  contact: { id: 'contact', title: 'Nova mensagem', label: 'Contato', defaultW: 620, defaultH: 540, minW: 440, minH: 400, onDesktop: true },
  whatsapp: { id: 'whatsapp', title: 'WhatsApp', label: 'WhatsApp', defaultW: 420, defaultH: 560, minW: 340, minH: 420, onDesktop: true },
  linkedin: { id: 'linkedin', title: 'LinkedIn', label: 'LinkedIn', defaultW: 660, defaultH: 560, minW: 440, minH: 380, onDesktop: true },
  github: { id: 'github', title: 'GitHub', label: 'GitHub', defaultW: 940, defaultH: 600, minW: 560, minH: 400, onDesktop: true },
  terminal: { id: 'terminal', title: 'visitante — zsh — 90×26', label: 'Terminal', defaultW: 700, defaultH: 440, minW: 420, minH: 260, onDesktop: true },
  settings: { id: 'settings', title: 'Ajustes do Sistema', label: 'Ajustes', defaultW: 720, defaultH: 470, minW: 520, minH: 340, onDesktop: false, unified: true },
}

/** Ordem em que os apps aparecem no dock e no desktop */
export const APP_ORDER: AppId[] = ['projects', 'about', 'resume', 'contact', 'whatsapp', 'linkedin', 'github', 'terminal', 'settings']
