import { useEffect, useRef, useState, type ReactNode } from 'react'
import { GITHUB_USER, useGithub, useContributions, useReadme, type GithubData } from '../data/useGithub'
import { githubProfile as gp, links, profile, projects, skillIcons } from '../data/content'

const handle = GITHUB_USER
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9#]/g, '')
const ICONS = Object.fromEntries(Object.entries(skillIcons).map(([k, v]) => [norm(k), v]))
ICONS[norm('TailwindCSS')] = 'tailwind'
ICONS[norm('.NET')] = 'dotnet'
ICONS[norm('Next.js')] = 'next'

/** Converte **negrito** em <strong>. */
function rich(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', CSS: '#663399', HTML: '#e34c26', PHP: '#4f5d95', 'C#': '#178600', Dart: '#00b4ab',
}
const fmtDate = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })

type Sort = 'updated' | 'name' | 'stars'

function RepoList({ repos: githubRepos }: { repos: GithubData['repos'] }) {
  const [q, setQ] = useState('')
  const [lang, setLang] = useState('')
  const [sort, setSort] = useState<Sort>('updated')
  const langs = Array.from(new Set(githubRepos.map((r) => r.language).filter(Boolean))).sort()
  const list = githubRepos
    .filter((r) => (!lang || r.language === lang) && (!q || `${r.name} ${r.description}`.toLowerCase().includes(q.toLowerCase())))
    .sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : sort === 'stars' ? b.stars - a.stars || b.updated.localeCompare(a.updated) : b.updated.localeCompare(a.updated)))

  return (
    <div className="gh-repos">
      <div className="gh-filters">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Encontre um repositório…" aria-label="Buscar repositório" />
        <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Linguagem">
          <option value="">Linguagem: todas</option>
          {langs.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Ordenar">
          <option value="updated">Última atualização</option>
          <option value="name">Nome</option>
          <option value="stars">Estrelas</option>
        </select>
      </div>
      <p className="gh-count">
        <b>{list.length}</b> {list.length === 1 ? 'resultado' : 'resultados'} para repositórios públicos
      </p>
      <ul className="gh-list">
        {list.map((r) => (
          <li key={r.name}>
            <div className="gh-list-main">
              <a className="gh-list-name" href={r.url} target="_blank" rel="noreferrer">
                {r.name}
              </a>
              <span className="gh-pub">Público</span>
              {r.description && <p>{r.description}</p>}
              <div className="gh-list-meta">
                {r.language && (
                  <span>
                    <i style={{ background: LANG_COLORS[r.language] ?? '#8d96a0' }} />
                    {r.language}
                  </span>
                )}
                {r.stars > 0 && <span>★ {r.stars}</span>}
                {r.homepage && (
                  <a href={r.homepage} target="_blank" rel="noreferrer">
                    ↗ site
                  </a>
                )}
                <span>Atualizado em {fmtDate(r.updated)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function ContribGraph() {
  const data = useContributions()
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth
  }, [data])

  if (!data) return null
  // semanas começam no domingo; completa a primeira semana com células vazias
  const first = new Date(`${data.days[0].date}T12:00:00`).getDay()
  const cells: (typeof data.days[number] | null)[] = [...Array(first).fill(null), ...data.days]
  const weeks = Math.ceil(cells.length / 7)
  const labels: { col: number; text: string }[] = []
  let lastMonth = -1
  for (let w = 0; w < weeks; w++) {
    const d = cells.slice(w * 7, w * 7 + 7).find(Boolean)
    if (!d) continue
    const m = new Date(`${d.date}T12:00:00`).getMonth()
    if (m !== lastMonth) {
      if (lastMonth !== -1 || w === 0) labels.push({ col: w, text: MONTHS[m] })
      lastMonth = m
    }
  }

  return (
    <section className="gh-contrib">
      <h2 className="gh-h2">
        {data.total.toLocaleString('pt-BR')} contribuições no último ano <span className="gh-live is-on">● ao vivo</span>
      </h2>
      <div className="gh-contrib-box" ref={scroller}>
        <div className="gh-contrib-inner" style={{ ['--weeks' as string]: weeks }}>
          <div className="gh-contrib-months">
            {labels.map((l) => (
              <span key={l.col} style={{ gridColumn: l.col + 1 }}>{l.text}</span>
            ))}
          </div>
          <div className="gh-contrib-grid">
            {cells.map((c, i) =>
              c ? (
                <i key={c.date} className={`lv${c.level}`} title={`${c.count} contribuiç${c.count === 1 ? 'ão' : 'ões'} em ${fmtDate(c.date)}`} />
              ) : (
                <i key={`e${i}`} className="lv-empty" />
              ),
            )}
          </div>
        </div>
      </div>
      <div className="gh-contrib-legend">
        <a href={`${links.github}`} target="_blank" rel="noreferrer">Ver no GitHub</a>
        <span>Menos</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <i key={l} className={`lv${l}`} />
        ))}
        <span>Mais</span>
      </div>
    </section>
  )
}

export function GitHub() {
  const gh = useGithub()
  const liveReadme = useReadme()
  const [tab, setTab] = useState<'overview' | 'repos'>('overview')
  const r = gp.readme
  const pinned = projects.filter((p) => p.repo)
  const urls: Record<string, string> = {
    linkedin: links.linkedin,
    github: links.github,
    email: `mailto:${links.email}`,
    portfólio: links.site,
    portfolio: links.site,
    whatsapp: links.whatsapp,
  }

  return (
    <div className="gh">
      <aside className="gh-side">
        <img className="gh-avatar" src={profile.photo} alt={profile.name} />
        <h1>{gp.displayName}</h1>
        <p className="gh-handle">{handle}</p>
        <p className="gh-bio">{gp.bio}</p>
        <a className="gh-edit" href={links.github} target="_blank" rel="noreferrer">
          Ver perfil no GitHub
        </a>
        <p className="gh-follow">
          <b>{gh.followers}</b> seguidor · <b>{gh.following}</b> seguindo · <b>{gh.stars}</b> estrelas
        </p>
        <ul className="gh-facts">
          <li>📍 {profile.location.replace(',', '')}</li>
          <li>
            ✉️ <a href={`mailto:${links.email}`}>{links.email}</a>
          </li>
          <li>
            🔗 <a href={links.linkedin} target="_blank" rel="noreferrer">in/iago-bruno-developer</a>
          </li>
          <li>
            🌐 <a href={links.site} target="_blank" rel="noreferrer">{links.site.replace('https://', '')}</a>
          </li>
        </ul>
      </aside>

      <div className="gh-main">
        <nav className="gh-tabs">
          <button className={tab === 'overview' ? 'is-on' : ''} onClick={() => setTab('overview')}>
            Visão geral
          </button>
          <button className={tab === 'repos' ? 'is-on' : ''} onClick={() => setTab('repos')}>
            Repositórios <span>{gh.repos.length}</span>
          </button>
        </nav>
        {tab === 'repos' ? (
          <RepoList repos={gh.repos} />
        ) : (
          <>
        <article className="gh-readme">
          <header className="gh-readme-head">
            <span>
              {handle} / <b>README</b>.md
            </span>
            <span className={liveReadme ? 'gh-live is-on' : 'gh-live'}>{liveReadme ? '● README ao vivo do GitHub' : 'README salvo'}</span>
          </header>
          {liveReadme ? (
            // HTML sanitizado pelo GitHub e limpo em useReadme
            <div className="gh-readme-body gh-md" dangerouslySetInnerHTML={{ __html: liveReadme }} />
          ) : (
          <div className="gh-readme-body">
            <div className="gh-banner">
              <h2>{r.title}</h2>
              <p>{r.subtitle}</p>
            </div>
            <p className="gh-tagline">{r.tagline}</p>
            <div className="gh-btns">
              {r.buttons.map((b) => (
                <a key={b} href={urls[b.toLowerCase()] ?? links.github} target="_blank" rel="noreferrer">
                  {b}
                </a>
              ))}
            </div>
            <div className="gh-badges">
              <span><i>Repositórios</i><b>{gh.repositories}</b></span>
              <span><i>Seguidores</i><b>{gh.followers}</b></span>
              <span><i>Stars</i><b>{gh.stars}</b></span>
            </div>

            <h3>{r.aboutTitle}</h3>
            <ul className="gh-about">
              {r.about.map(([k, v]) => (
                <li key={k}>
                  <strong>{k}:</strong> {rich(v)}
                </li>
              ))}
            </ul>
            <pre className="gh-code">{r.code}</pre>

            {r.stack.map((g) => (
              <section key={g.title}>
                <h3>{g.title}</h3>
                <div className="gh-chips">
                  {g.items.map((it) => (
                    <span key={it} className="gh-chip">
                      {ICONS[norm(it)] && <img src={`/skills/${ICONS[norm(it)]}.png`} alt="" />}
                      {it}
                    </span>
                  ))}
                </div>
              </section>
            ))}

            <h3>{r.expertiseTitle}</h3>
            <table className="gh-table">
              <thead>
                <tr><th>Área</th><th>Foco</th><th>Destaque</th></tr>
              </thead>
              <tbody>
                {r.expertise.map((e) => (
                  <tr key={e.area}>
                    <td><strong>{e.area}</strong></td>
                    <td>
                      <span className="gh-bar"><i style={{ width: `${e.percent}%` }} /></span> {e.percent}%
                    </td>
                    <td>{e.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>{r.openTitle}</h3>
            <p className="gh-label">Cargos:</p>
            <ul>{r.openRoles.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="gh-label">Modelo:</p>
            <ul>{r.openModels.map((x) => <li key={x}>{x}</li>)}</ul>

            <div className="gh-footer">{r.footer}</div>
          </div>
          )}
        </article>

        <h2 className="gh-h2">Repositórios em destaque</h2>
        <div className="gh-grid">
          {pinned.map((p) => (
            <a key={p.id} className="gh-repo" href={p.repo} target="_blank" rel="noreferrer">
              <strong>{p.name}</strong>
              <span className="muted">{p.summary}</span>
              <span className="gh-lang">
                <i style={{ background: p.colors[0] }} />
                {p.stack[0]}
                <em>{p.year}</em>
              </span>
            </a>
          ))}
        </div>
        <ContribGraph />
        <a className="gh-code-link" href={links.repo} target="_blank" rel="noreferrer">
          Código-fonte deste portfólio
        </a>
          </>
        )}
      </div>
    </div>
  )
}
