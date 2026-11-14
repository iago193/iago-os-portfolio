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
