// Atualiza src/data/githubRepos.ts com seus repositórios públicos do GitHub.
// Uso:  node scripts/update-repos.mjs [usuario]      (padrão: iago193)
import { writeFileSync } from 'node:fs'

const HEADER = "/**\n * Repositórios públicos do GitHub (cópia estática, sem chamar a API no navegador).\n * Para atualizar a lista inteira: node scripts/update-repos.mjs\n * (ou edite à mão: cada item é um repositório).\n */\nexport interface Repo {\n  name: string\n  description: string\n  language: string\n  stars: number\n  /** Data da última atualização (AAAA-MM-DD) */\n  updated: string\n  url: string\n  homepage: string\n}\n\nexport const githubRepos: Repo[] = "

const user = process.argv[2] ?? 'iago193'
const all = []
for (let page = 1; ; page++) {
  const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&page=${page}&sort=updated`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!res.ok) throw new Error(`GitHub respondeu ${res.status}`)
  const batch = await res.json()
  all.push(...batch)
  if (batch.length < 100) break
}

const repos = all
  .filter((r) => !r.fork)
  .map((r) => ({
    name: r.name,
    description: r.description ?? '',
    language: r.language ?? '',
    stars: r.stargazers_count,
    updated: (r.pushed_at ?? r.updated_at).slice(0, 10),
    url: r.html_url,
    homepage: r.homepage ?? '',
  }))

const body = `${HEADER}${JSON.stringify(repos, null, 2)}
`
writeFileSync(new URL('../src/data/githubRepos.ts', import.meta.url), body)
console.log(`${repos.length} repositórios salvos em src/data/githubRepos.ts`)
