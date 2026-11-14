import { useRef, useState, type KeyboardEvent } from 'react'
import { education, experience, links, profile, projects, skills, techStack } from '../data/content'
import { APP_META, APP_ORDER } from '../os/appMeta'
import { useWM } from '../os/context'
import { usePrefs } from '../os/prefs'
import { useSystem } from '../os/system'

interface Line {
  kind: 'in' | 'out'
  text: string
}

const PROMPT = 'visitante@iago-os ~ %'

const COMMANDS = [
  'about', 'cat', 'clear', 'contact', 'curl', 'date', 'echo', 'exit', 'git', 'help', 'history', 'lock', 'ls',
  'neofetch', 'open', 'ping', 'projects', 'resume', 'skills', 'stack', 'theme', 'tree', 'uname', 'uptime',
]

const HELP = `Comandos disponíveis

  Sobre mim
    about          resumo sobre mim
    skills         habilidades por área
    projects       lista de projetos
    contact        links de contato
    resume         abre o currículo

  Para devs
    stack          tecnologias usadas neste portfólio
    tree           estrutura de pastas do código
    cat <arquivo>  package.json, README.md, skills.json, projects.json, about.txt
    git log        meu histórico profissional em formato de commits
    curl /api/projects   exemplo de resposta de API (simulada)
    neofetch       informações do "sistema"
    open repo      abre o código-fonte no GitHub

  Sistema
    open <app>     projects, about, resume, contact, whatsapp, linkedin, github, terminal, settings
    theme <dark|light>   troca a aparência
    ls  ping  uname  uptime  date  echo  history  clear  lock  exit

Dicas: Tab completa o comando, ↑ ↓ navegam no histórico, Ctrl+L limpa a tela.`

const TREE = `iago-os-portfolio/
├── public/
│   ├── curriculo.pdf
│   └── favicon.svg
├── src/
│   ├── apps/      # Projects, About, Resume, Contact, Terminal, Settings
│   ├── data/      # content.ts: todo o conteúdo do site
│   ├── os/        # window manager, dock, menu bar, Spotlight
│   ├── styles/    # os.css e apps.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts`

const PACKAGE_JSON = `{
  "name": "iago-os-portfolio",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^19",
    "react-dom": "^19"
  }
}`

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/** Hash curto e estável, só para dar cara de commit ao `git log`. */
function shortHash(s: string): string {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

export function Terminal() {
  const { openApp, dispatch } = useWM()
  const { setTheme, theme } = usePrefs()
  const { lock } = useSystem()
  const [lines, setLines] = useState<Line[]>([
    {
      kind: 'out',
      text: 'iago OS 1.0 — Terminal (demonstração, somente leitura)\nDigite help para ver os comandos. Tente: stack · tree · git log · cat package.json',
    },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const files: Record<string, string> = {
    'package.json': PACKAGE_JSON,
    'README.md': `# ${profile.name}\n${profile.role}\n\nPortfólio em formato de desktop.\nCódigo: ${links.repo}`,
    'about.txt': profile.bio.join('\n\n'),
    'skills.json': JSON.stringify(Object.fromEntries(skills.map((g) => [g.group, g.items])), null, 2),
    'projects.json': JSON.stringify(
      projects.map((p) => ({ name: p.name, category: p.category, year: p.year, stack: p.stack })),
      null,
      2,
    ),
  }

  /** Retorna o texto da saída, ou null para limpar a tela. */
  const run = (raw: string): string | null => {
    const [cmd = '', ...args] = raw.trim().split(/\s+/)
    const arg = args.join(' ')

    switch (cmd.toLowerCase()) {
      case '':
        return ''
      case 'help':
        return HELP
      case 'clear':
        return null
      case 'about':
        return profile.bio.join('\n\n')
      case 'skills':
        return skills.map((g) => `${g.group.padEnd(12)} ${g.items.join(', ')}`).join('\n')
      case 'projects':
        return projects.map((p) => `${p.name.padEnd(16)} ${p.category.padEnd(7)} ${p.year}  ${p.stack.join(', ')}`).join('\n')
      case 'contact':
        return `email     ${links.email}\ngithub    ${links.github}\nlinkedin  ${links.linkedin}\nwhatsapp  ${links.whatsapp}`
      case 'resume':
        openApp('resume')
        return 'Abrindo Currículo…'
      case 'stack':
        return techStack.map((t) => `${t.name.padEnd(15)} ${t.version.padEnd(8)} ${t.note}`).join('\n')
      case 'tree':
        return TREE
      case 'ls':
        return 'about.txt  skills.json  projects.json  package.json  README.md  src/'
      case 'cat': {
        if (!arg) return 'uso: cat <arquivo>'
        return files[arg] ?? `cat: ${arg}: arquivo ou diretório inexistente`
      }
      case 'git': {
        if (args[0] === 'log') {
          const commits = [
            ...experience.map((e) => `${shortHash(e.company + e.role)} ${e.period}: ${e.role} @ ${e.company}`),
            ...education.map((e) => `${shortHash(e.school + e.course)} ${e.period}: ${e.course}`),
          ]
          return commits.join('\n')
        }
        if (args[0] === 'status') return 'On branch main\nnada a commitar, working tree clean'
        return 'uso: git log | git status'
      }
      case 'curl': {
        if (arg.includes('/api/projects')) {
          const body = JSON.stringify(
            projects.map((p) => ({ id: p.id, name: p.name, category: p.category, stack: p.stack })),
            null,
            2,
          )
          return `HTTP/1.1 200 OK\ncontent-type: application/json\n\n${body}\n\n# resposta simulada no navegador, sem backend`
        }
        if (arg.includes('/api/profile')) {
          return `HTTP/1.1 200 OK\ncontent-type: application/json\n\n${JSON.stringify({ name: profile.name, role: profile.role, location: profile.location }, null, 2)}`
        }
        return 'uso: curl /api/projects  ou  curl /api/profile'
      }
      case 'ping':
        return `PING contato (${links.email})\n64 bytes: resposta em menos de 1 dia útil\n64 bytes: resposta em menos de 1 dia útil\n--- 0% de perda de pacotes`
      case 'neofetch':
        return [
          'visitante@iago-os',
          '-----------------',
          'OS:        iago OS 1.0',
          `Host:      ${profile.name}`,
          `Cargo:     ${profile.role}`,
          'Shell:     zsh (simulado)',
          'Stack:     React · TypeScript · Vite',
          `Tema:      ${theme}`,
          `Projetos:  ${projects.length}`,
        ].join('\n')
      case 'uname':
        return 'iago-os 1.0 browser-kernel #1 (React 19, Vite 8)'
      case 'uptime':
        return `no ar há ${Math.max(1, Math.round(performance.now() / 1000))} s (desde que você abriu a página)`
      case 'date':
        return new Date().toLocaleString('pt-BR')
      case 'echo':
        return arg
      case 'history':
        return history.map((h, i) => `${String(i + 1).padStart(3)}  ${h}`).join('\n') || '(vazio)'
      case 'theme': {
        if (arg === 'dark' || arg === 'light') {
          setTheme(arg)
          return `Aparência: ${arg === 'dark' ? 'escuro' : 'claro'}`
        }
        return 'uso: theme <dark|light>'
      }
      case 'lock':
        lock()
        return 'Bloqueando tela…'
      case 'exit':
        dispatch({ type: 'close', id: 'terminal' })
        return ''
      case 'open': {
        if (!arg) return `uso: open <app|github|linkedin|repo>\napps: ${APP_ORDER.join(', ')}`
        const key = norm(arg)
        const app = APP_ORDER.find((id) => id === key || norm(APP_META[id].label) === key)
        if (app) {
          openApp(app)
          return `Abrindo ${APP_META[app].label}…`
        }
        const external: Record<string, string> = { github: links.github, linkedin: links.linkedin, repo: links.repo }
        if (external[key]) {
          window.open(external[key], '_blank', 'noopener')
          return `Abrindo ${external[key]}`
        }
        return `open: "${arg}" não encontrado`
      }
      case 'sudo':
        return 'visitante não está no arquivo sudoers. Este incidente será reportado (brincadeira).'
      case 'rm':
        return 'rm: operação não permitida. Este portfólio é somente leitura.'
      case 'vim':
      case 'nano':
        return `${cmd}: editor indisponível aqui. Para mexer no código, use: open repo`
      case 'cd':
        return 'cd: este shell é só uma demonstração (sem navegação de pastas). Use ls, cat e tree.'
      default:
        return `zsh: comando não encontrado: ${cmd}  (digite help)`
    }
  }

  const submit = () => {
    const raw = input
    const out = run(raw)
    setInput('')
    setCursor(null)
    if (raw.trim()) setHistory((h) => [...h, raw.trim()])
    if (out === null) {
      setLines([])
    } else {
      setLines((l) => [...l, { kind: 'in', text: raw }, ...(out ? [{ kind: 'out' as const, text: out }] : [])])
    }
    // rola até o fim depois de renderizar
    requestAnimationFrame(() => {
      const box = boxRef.current
      if (box) box.scrollTop = box.scrollHeight
    })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cursor === null) return
      const next = cursor + 1
      if (next >= history.length) {
        setCursor(null)
        setInput('')
      } else {
        setCursor(next)
        setInput(history[next])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = COMMANDS.filter((c) => c.startsWith(input.toLowerCase()))
      if (input && !input.includes(' ') && matches.length === 1) setInput(matches[0] + ' ')
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div className="term" ref={boxRef} onClick={() => inputRef.current?.focus()}>
      {lines.map((l, i) =>
        l.kind === 'in' ? (
          <div key={i} className="term-line">
            <span className="term-prompt">{PROMPT}</span> {l.text}
          </div>
        ) : (
          <pre key={i} className="term-out">
            {l.text}
          </pre>
        ),
      )}
      <div className="term-line term-input">
        <span className="term-prompt">{PROMPT}</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          aria-label="Comando"
        />
      </div>
    </div>
  )
}
