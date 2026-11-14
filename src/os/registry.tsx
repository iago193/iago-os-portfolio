import type { ComponentType } from 'react'
import { About } from '../apps/About'
import { Contact } from '../apps/Contact'
import { GitHub } from '../apps/GitHub'
import { LinkedIn } from '../apps/LinkedIn'
import { Projects } from '../apps/Projects'
import { Resume } from '../apps/Resume'
import { Settings } from '../apps/Settings'
import { Terminal } from '../apps/Terminal'
import { WhatsApp } from '../apps/WhatsApp'
import type { AppId } from './appMeta'

/** Para criar um app novo: adicione o id em appMeta.ts e o componente aqui. */
export const APP_COMPONENTS: Record<AppId, ComponentType> = {
  projects: Projects,
  about: About,
  resume: Resume,
  contact: Contact,
  whatsapp: WhatsApp,
  linkedin: LinkedIn,
  github: GitHub,
  terminal: Terminal,
  settings: Settings,
}
