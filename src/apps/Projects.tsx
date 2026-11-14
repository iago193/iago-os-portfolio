import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CATEGORIES, projects, type Project, type ProjectCategory } from '../data/content'
import { GITHUB_USER, useGithub } from '../data/useGithub'
import { useWM } from '../os/context'
import { MenuList, type MenuItem } from '../os/Menu'
import { useSystem } from '../os/system'

type Filter = 'Todos' | ProjectCategory | 'GitHub'
const FILTERS: Filter[] = ['Todos', ...CATEGORIES.filter((c) => projects.some((p) => p.category === c))]

interface Loc {
  filter: Filter
  id: string | null
}

const ico = (d: ReactNode) => (
  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)

const FILTER_ICON: Record<string, ReactNode> = {
  Todos: ico(<path d="M2.5 6.5a1.5 1.5 0 0 1 1.5-1.5h3.2l1.6 1.8H16a1.5 1.5 0 0 1 1.5 1.5v6.2A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5Z" />),
  Web: ico(<><circle cx="10" cy="10" r="7" /><path d="M3 10h14M10 3c2.4 2.2 2.4 11.8 0 14M10 3c-2.4 2.2-2.4 11.8 0 14" /></>),
  Mobile: ico(<><rect x="6" y="2.5" width="8" height="15" rx="2" /><path d="M9 14.8h2" /></>),
  Design: ico(<path d="M3 17l1-4 9-9 3 3-9 9ZM11.5 5.5l3 3" />),
  GitHub: ico(<path d="m7 6-4 4 4 4M13 6l4 4-4 4" />),
  IA: ico(<path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.2 5.2l2 2M12.8 12.8l2 2M14.8 5.2l-2 2M7.2 12.8l-2 2" />),
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', CSS: '#663399', HTML: '#e34c26', PHP: '#4f5d95', 'C#': '#178600', Dart: '#00b4ab', Python: '#3572a5',
}
const fmtDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })

/** Ícone de pasta com a capa do projeto "espiando" lá de dentro. */
function Folder({ p }: { p: Project }) {
  const [broken, setBroken] = useState(false)
  return (
    <span className="fx-folder" aria-hidden="true">
      <span className="fx-folder-back" />
      <span className="fx-folder-paper" style={{ background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }}>
        {p.cover && !broken ? <img src={p.cover} alt="" loading="lazy" draggable={false} onError={() => setBroken(true)} /> : p.glyph}
      </span>
      <span className="fx-folder-front" />
    </span>
  )
}

type RepoT = ReturnType<typeof useGithub>['repos'][number]
const langColor = (l: string) => LANG_COLORS[l] ?? '#6e7681'
const CODE_GLYPH = (
  <svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 14-10 10 10 10M30 14l10 10-10 10M27 10l-6 28" />
  </svg>
)

/** Pasta de repositório: capa genérica no tom da linguagem principal. */
function RepoFolder({ r }: { r: RepoT }) {
  return (
    <span className="fx-folder" aria-hidden="true">
      <span className="fx-folder-back" />
      <span className="fx-folder-paper fx-repo-paper" style={{ ['--lang' as string]: langColor(r.language) }}>{CODE_GLYPH}</span>
      <span className="fx-folder-front" />
    </span>
  )
}

/** Imagem de pré-visualização que o próprio GitHub gera para cada repositório. Some se não carregar. */
function RepoPreview({ name }: { name: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) return null
  const src = `https://opengraph.githubassets.com/1/${GITHUB_USER}/${name}`
  return (
    <div className="fx-files">
      <button className="fx-file" onClick={(e) => { e.stopPropagation(); window.open(src, '_blank', 'noopener') }} aria-label="Abrir pré-visualização">
        <span className="fx-file-img">
          <img src={src} alt="" loading="lazy" draggable={false} onError={() => setBroken(true)} />
        </span>
        <span className="fx-file-name">preview.png</span>
      </button>
    </div>
  )
}

export function Projects() {
  const { openApp } = useWM()
  const { notify } = useSystem()
  const gh = useGithub()
  const [nav, setNav] = useState<{ stack: Loc[]; i: number }>({ stack: [{ filter: 'Todos', id: null }], i: 0 })
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState<string | null>(null)
  const [shot, setShot] = useState<string | null>(null)
  const [ctx, setCtx] = useState<{ x: number; y: number; id: string } | null>(null)

  const loc = nav.stack[nav.i]
  const go = (l: Loc) => {
    setNav((n) => ({ stack: [...n.stack.slice(0, n.i + 1), l], i: n.i + 1 }))
    setSel(null)
    setQuery('')
  }
  const back = () => nav.i > 0 && setNav((n) => ({ ...n, i: n.i - 1 }))
  const forward = () => nav.i < nav.stack.length - 1 && setNav((n) => ({ ...n, i: n.i + 1 }))

  const q = query.trim().toLowerCase()
  const list = projects.filter(
    (p) => (loc.filter === 'Todos' || p.category === loc.filter) && (!q || `${p.name} ${p.category} ${p.stack.join(' ')}`.toLowerCase().includes(q)),
  )
  const isGh = loc.filter === 'GitHub'
  const repoList = isGh ? gh.repos.filter((r) => !q || `${r.name} ${r.description} ${r.language}`.toLowerCase().includes(q)) : []
  const selected = projects.find((p) => p.id === loc.id) ?? null
  const repo = isGh ? (gh.repos.find((x) => x.name === loc.id) ?? null) : null
  const inside = !!(selected || repo)
  const files = selected
    ? [...(selected.cover ? [{ src: selected.cover, name: 'capa.webp' }] : []), ...selected.gallery.map((g, i) => ({ src: g, name: `${selected.id}-${i + 1}.webp` }))]
    : []
  const title = selected ? selected.name : repo ? repo.name : loc.filter === 'Todos' ? 'Projetos' : isGh ? 'Repositórios no GitHub' : loc.filter

  const open = (id: string) => go({ filter: loc.filter, id })
  const activate = (id: string) => {
    if (window.matchMedia('(pointer: coarse)').matches) open(id)
    else setSel(id)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('input')) return
    if (inside) {
      if (e.key === 'Backspace' || e.key === 'Escape') back()
      return
    }
    const ids = isGh ? repoList.map((x) => x.name) : list.map((p) => p.id)
    const idx = ids.indexOf(sel ?? '')
    if (e.key === 'Enter' && sel) open(sel)
    else if (e.key === ' ' && sel && !isGh) {
      e.preventDefault()
      setShot(projects.find((p) => p.id === sel)?.cover ?? null)
    } else if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key) && ids.length) {
      e.preventDefault()
      const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
      setSel(ids[Math.min(ids.length - 1, Math.max(0, idx + d))])
    }
  }

  const ctxItems = (id: string): MenuItem[] => {
    const p = projects.find((x) => x.id === id)!
    return [
      { label: 'Abrir', onClick: () => open(id) },
      { label: 'Visualização Rápida', hint: 'espaço', onClick: () => setShot(p.cover) },
      { separator: true },
      { label: 'Ver online', disabled: !p.demo, onClick: () => p.demo && window.open(p.demo, '_blank', 'noopener') },
      { label: 'Ver código', disabled: !p.repo, onClick: () => p.repo && window.open(p.repo, '_blank', 'noopener') },
      { separator: true },
      {
        label: `Copiar “${p.name}” como nome`,
        onClick: () => {
          void navigator.clipboard?.writeText(p.name)
          notify({ title: 'Copiado', body: p.name })
        },
      },
    ]
  }

  const onCtx = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setSel(id)
    setCtx({ x: Math.min(e.clientX, window.innerWidth - 250), y: Math.min(e.clientY, window.innerHeight - 220), id })
  }

  const rowProps = (p: Project) => ({
    onClick: () => activate(p.id),
    onDoubleClick: () => open(p.id),
    onContextMenu: (e: React.MouseEvent) => onCtx(e, p.id),
  })

  return (
    <div className="finder" tabIndex={0} onKeyDown={onKeyDown} onClick={() => setSel(null)}>
      <aside className="fx-side">
        <div className="drag-region fx-side-top" />
        <p className="side-label">Favoritos</p>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={f === loc.filter && !inside ? 'side-item is-on' : 'side-item'}
            onClick={(e) => {
              e.stopPropagation()
              go({ filter: f, id: null })
            }}
          >
            <span className="side-ico">{FILTER_ICON[f]}</span>
            {f === 'Todos' ? 'Todos os projetos' : f}
            <em>{projects.filter((p) => f === 'Todos' || p.category === f).length}</em>
          </button>
        ))}
        <p className="side-label">GitHub</p>
        <button
          className={isGh && !inside ? 'side-item is-on' : 'side-item'}
          onClick={(e) => {
            e.stopPropagation()
            go({ filter: 'GitHub', id: null })
          }}
        >
          <span className="side-ico">{FILTER_ICON.GitHub}</span>
          Repositórios públicos
          <em>{gh.repos.length}</em>
        </button>
        <p className="side-label">Atalhos</p>
        <button className="side-item" onClick={() => openApp('resume')}>
          <span className="side-ico">{ico(<path d="M5 2.5h6.5L15 6v11.5H5ZM11 2.5V6h4M7.5 10h5M7.5 13h5" />)}</span>
          Currículo
        </button>
        <button className="side-item" onClick={() => openApp('contact')}>
          <span className="side-ico">{ico(<path d="M2.5 5.5h15v10h-15ZM2.5 6l7.5 5.5L17.5 6" />)}</span>
          Contato
        </button>
        <button className="side-item" onClick={() => openApp('github')}>
          <span className="side-ico">{ico(<path d="m7 6-4 4 4 4M13 6l4 4-4 4" />)}</span>
          GitHub
        </button>
      </aside>

      <div className="fx-main">
        <div className="fx-toolbar drag-region">
          <button className="fx-btn" onClick={(e) => { e.stopPropagation(); back() }} disabled={nav.i === 0} aria-label="Voltar">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 4-6 6 6 6" /></svg>
          </button>
          <button className="fx-btn" onClick={(e) => { e.stopPropagation(); forward() }} disabled={nav.i >= nav.stack.length - 1} aria-label="Avançar">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 4 6 6-6 6" /></svg>
          </button>
          <strong className="fx-title">
            <span className="fx-title-ico">{FILTER_ICON.Todos}</span>
            {title}
          </strong>
          <span className="fx-spacer" />
          {!inside && !isGh && (
            <div className="fx-seg" role="group" aria-label="Visualização">
              <button className={view === 'grid' ? 'is-on' : ''} onClick={(e) => { e.stopPropagation(); setView('grid') }} aria-label="Ícones">
                {ico(<><rect x="3" y="3" width="6" height="6" rx="1.2" /><rect x="11" y="3" width="6" height="6" rx="1.2" /><rect x="3" y="11" width="6" height="6" rx="1.2" /><rect x="11" y="11" width="6" height="6" rx="1.2" /></>)}
              </button>
              <button className={view === 'list' ? 'is-on' : ''} onClick={(e) => { e.stopPropagation(); setView('list') }} aria-label="Lista">
                {ico(<path d="M7 5h10M7 10h10M7 15h10M3 5h.5M3 10h.5M3 15h.5" />)}
              </button>
            </div>
          )}
          {!inside && (
            <label className="fx-search" onClick={(e) => e.stopPropagation()}>
              <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="8.5" cy="8.5" r="5" /><path d="m12.5 12.5 4 4" /></svg>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar" aria-label="Buscar" />
            </label>
          )}
        </div>

        <div className="fx-body">
          {selected ? (
            <article className="proj-detail">
              {files.length > 0 && (
                <div className="fx-files">
                  {files.map((f) => (
                    <button key={f.src} className="fx-file" onClick={() => setShot(f.src)} aria-label={`Ampliar ${f.name}`}>
                      <span className="fx-file-img">
                        <img src={f.src} alt="" loading="lazy" draggable={false} />
                      </span>
                      <span className="fx-file-name">{f.name}</span>
                    </button>
                  ))}
                </div>
              )}
              <div className="proj-info">
                <h3>{selected.name}</h3>
                <p className="muted">{selected.category} · {selected.year}</p>
                <p className="proj-desc">{selected.description}</p>
                <div className="chips">
                  {selected.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
                <div className="proj-actions">
                  {selected.demo && <a className="btn btn-primary" href={selected.demo} target="_blank" rel="noreferrer">Ver online</a>}
                  {selected.repo && <a className="btn" href={selected.repo} target="_blank" rel="noreferrer">Código</a>}
                </div>
              </div>
            </article>
          ) : repo ? (
            <article className="proj-detail">
              <RepoPreview name={repo.name} />
              <div className="proj-info">
                <h3>{repo.name}</h3>
                <p className="muted">
                  {[repo.language, repo.stars > 0 ? `★ ${repo.stars}` : '', `Atualizado em ${fmtDate(repo.updated)}`].filter(Boolean).join(' · ')}
                </p>
                <p className="proj-desc">{repo.description || 'Sem descrição.'}</p>
                <div className="proj-actions">
                  <a className="btn btn-primary" href={repo.url} target="_blank" rel="noreferrer">Abrir no GitHub</a>
                  {repo.homepage && <a className="btn" href={repo.homepage} target="_blank" rel="noreferrer">Ver online</a>}
                </div>
              </div>
            </article>
          ) : isGh ? (
            repoList.length === 0 ? (
              <p className="fx-empty muted">Nenhum repositório encontrado</p>
            ) : (
              <div className="fx-grid">
                {repoList.map((x) => (
                  <button
                    key={x.name}
                    className={x.name === sel ? 'fx-item is-sel' : 'fx-item'}
                    onClick={(e) => { e.stopPropagation(); activate(x.name) }}
                    onDoubleClick={() => open(x.name)}
                  >
                    <RepoFolder r={x} />
                    <span className="fx-name">{x.name}</span>
                    <span className="fx-sub">{x.language || 'Repositório'} · {x.updated.slice(0, 4)}</span>
                  </button>
                ))}
              </div>
            )
          ) : list.length === 0 ? (
            <p className="fx-empty muted">Nenhum item encontrado</p>
          ) : view === 'grid' ? (
            <div className="fx-grid">
              {list.map((p) => (
                <button key={p.id} className={p.id === sel ? 'fx-item is-sel' : 'fx-item'} {...rowProps(p)} onClick={(e) => { e.stopPropagation(); activate(p.id) }}>
                  <Folder p={p} />
                  <span className="fx-name">{p.name}</span>
                  <span className="fx-sub">{p.gallery.length + (p.cover ? 1 : 0)} itens · {p.year}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="fx-list" role="table">
              <div className="fx-row fx-head" role="row">
                <span>Nome</span><span>Tipo</span><span>Ano</span><span>Tecnologias</span>
              </div>
              {list.map((p, i) => (
                <button key={p.id} className={['fx-row', i % 2 ? 'is-alt' : '', p.id === sel ? 'is-sel' : ''].join(' ')} {...rowProps(p)} onClick={(e) => { e.stopPropagation(); activate(p.id) }}>
                  <span className="fx-cell-name"><Folder p={p} />{p.name}</span>
                  <span>{p.category}</span>
                  <span>{p.year}</span>
                  <span className="fx-stack">{p.stack.join(', ')}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="fx-path">
          <span>iago OS</span><i>›</i>
          <button onClick={(e) => { e.stopPropagation(); go({ filter: 'Todos', id: null }) }}>Projetos</button>
          {loc.filter !== 'Todos' && (<><i>›</i><button onClick={(e) => { e.stopPropagation(); go({ filter: loc.filter, id: null }) }}>{loc.filter}</button></>)}
          {inside && (<><i>›</i><span className="is-here">{selected?.name ?? repo?.name}</span></>)}
          <span className="fx-count">{inside ? '' : isGh ? `${repoList.length} repositórios${gh.live ? ' · ao vivo' : ''}` : `${list.length} itens`}</span>
        </div>
      </div>

      {shot && (
        <div className="lightbox" onClick={(e) => { e.stopPropagation(); setShot(null) }} role="dialog" aria-label="Imagem ampliada">
          <img src={shot} alt="" />
        </div>
      )}

      {ctx &&
        createPortal(
          <>
            <div className="ctx-overlay" onPointerDown={() => setCtx(null)} onContextMenu={(e) => { e.preventDefault(); setCtx(null) }} />
            <div className="ctx" style={{ left: ctx.x, top: ctx.y }}>
              <MenuList items={ctxItems(ctx.id)} onDone={() => setCtx(null)} />
            </div>
          </>,
          document.body,
        )}
    </div>
  )
}
