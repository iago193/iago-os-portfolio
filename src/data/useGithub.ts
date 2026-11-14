import { useEffect, useState } from 'react'
import { githubProfile } from './content'
import { githubRepos, type Repo } from './githubRepos'
import { links } from './content'

export const GITHUB_USER = links.github.split('/').filter(Boolean).pop() ?? 'iago193'

export interface GithubData {
  repos: Repo[]
  followers: number
  following: number
  repositories: number
  stars: number
  /** true quando os dados vieram da API do GitHub agora (e não da cópia salva no projeto) */
  live: boolean
}

const fallback: GithubData = {
  repos: githubRepos,
  followers: githubProfile.followers,
  following: githubProfile.following,
  repositories: githubProfile.repositories,
  stars: githubProfile.stars,
  live: false,
}

const CACHE_KEY = 'gh-cache-v1'
const CACHE_MS = 10 * 60 * 1000

function readCache(): GithubData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { t, data } = JSON.parse(raw) as { t: number; data: GithubData }
    return Date.now() - t < CACHE_MS ? data : null
  } catch {
    return null
  }
}

interface ApiRepo {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string
  updated_at: string
  html_url: string
  homepage: string | null
  fork: boolean
}

async function load(): Promise<GithubData> {
  const [u, r] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`),
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`),
  ])
  if (!u.ok || !r.ok) throw new Error('GitHub API indisponível')
  const user = (await u.json()) as { followers: number; following: number; public_repos: number }
  const list = ((await r.json()) as ApiRepo[]).filter((x) => !x.fork)
  const repos: Repo[] = list.map((x) => ({
    name: x.name,
    description: x.description ?? '',
    language: x.language ?? '',
    stars: x.stargazers_count,
    updated: (x.pushed_at ?? x.updated_at).slice(0, 10),
    url: x.html_url,
    homepage: x.homepage ?? '',
  }))
  return {
    repos,
    followers: user.followers,
    following: user.following,
    repositories: user.public_repos,
    stars: list.reduce((n, x) => n + x.stargazers_count, 0),
    live: true,
  }
}

/** Busca seus dados no GitHub ao abrir o app. Se falhar (sem internet, limite da API), usa a cópia salva. */
export function useGithub(): GithubData {
  const [data, setData] = useState<GithubData>(() => readCache() ?? fallback)

  useEffect(() => {
    if (readCache()) return
    let cancelled = false
    load()
      .then((d) => {
        if (cancelled) return
        setData(d)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: d }))
        } catch {
          /* sem cache, tudo bem */
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return data
}

/* ───────── README do perfil (repositório <usuário>/<usuário>) ao vivo ───────── */

const README_KEY = 'gh-readme-v1'

function readReadmeCache(): string | null {
  try {
    const raw = sessionStorage.getItem(README_KEY)
    if (!raw) return null
    const { t, html } = JSON.parse(raw) as { t: number; html: string }
    return Date.now() - t < CACHE_MS ? html : null
  } catch {
    return null
  }
}

/** Remove tudo que possa executar código e abre links em nova aba. O HTML já vem sanitizado pelo GitHub; isto é uma segunda barreira. */
function cleanHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  doc.querySelectorAll('script,style,iframe,object,embed,form,link,meta,base,.anchor').forEach((n) => n.remove())
  doc.body.querySelectorAll('*').forEach((el) => {
    for (const a of Array.from(el.attributes)) {
      const v = a.value.trim().toLowerCase()
      if (a.name.startsWith('on') || ((a.name === 'href' || a.name === 'src' || a.name === 'srcset') && /^(javascript|data):/.test(v) && !(a.name === 'src' && v.startsWith('data:image/')))) {
        el.removeAttribute(a.name)
      }
    }
    if (el.tagName === 'A') {
      el.setAttribute('target', '_blank')
      el.setAttribute('rel', 'noreferrer noopener')
    }
    if (el.tagName === 'IMG') el.setAttribute('loading', 'lazy')
  })
  return doc.body.innerHTML
}

async function loadReadme(): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_USER}/readme`, {
    headers: { Accept: 'application/vnd.github.html+json' },
  })
  if (!res.ok) throw new Error('README indisponível')
  const html = cleanHtml(await res.text())
  if (html.replace(/<[^>]*>/g, '').trim().length < 20 && !html.includes('<img')) throw new Error('README vazio')
  return html
}

/** README do seu perfil no GitHub, já em HTML. `null` = ainda carregando ou falhou (o app mostra a versão salva). */
export function useReadme(): string | null {
  const [html, setHtml] = useState<string | null>(() => readReadmeCache())

  useEffect(() => {
    if (readReadmeCache()) return
    let cancelled = false
    loadReadme()
      .then((h) => {
        if (cancelled) return
        setHtml(h)
        try {
          sessionStorage.setItem(README_KEY, JSON.stringify({ t: Date.now(), html: h }))
        } catch {
          /* sem cache, tudo bem */
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return html
}
