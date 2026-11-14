# iago-os-portfolio

Portfólio em formato de desktop (menu bar, dock e janelas arrastáveis). React + TypeScript + Vite, sem dependências extras.

## Rodar

```bash
npm install   # só na primeira vez
npm run dev   # http://localhost:5173
npm run build # gera a pasta dist/ para publicar
```

## O que tem na tela

Tela de bloqueio, menu bar com menus funcionais, dock, clique direito no desktop, busca (Ctrl/⌘ + K), Central de Controle (claro/escuro e brilho), notificações, Ajustes (plano de fundo), Terminal com comandos para devs (`help`, `stack`, `tree`, `git log`, `cat package.json`, `curl /api/projects`…) e apps de WhatsApp, LinkedIn e GitHub.

## Onde editar

- `src/data/content.ts` — **todo o conteúdo** (nome, bio, habilidades, projetos, experiência, links). Hoje está com texto de exemplo.
- `public/curriculo.pdf` — coloque seu PDF aqui (botão "Baixar PDF" do app Currículo).
- `links` em `content.ts` — troque email, GitHub, LinkedIn, WhatsApp (formato `https://wa.me/55DDDNUMERO`) e `repo` pelos seus.
- `public/icons/` — ícones de WhatsApp, LinkedIn e GitHub: ficam `whatsapp.png`, `linkedin.png` e `github.png` (256×256, fundo transparente). Para trocar, substitua os arquivos mantendo os nomes.
- `public/foto.jpg` — sua foto; depois ajuste `photo: '/foto.jpg'` em `content.ts`.

## Estrutura

```
src/
  os/        menu bar, dock, ícones, gerenciador de janelas
  apps/      Projects, About, Resume, Contact, WhatsApp, LinkedIn, GitHub, Terminal, Settings
  data/      content.ts
  styles/    os.css (shell) e apps.css (janelas)
```

## Criar um app novo

1. Adicione o id e os tamanhos em `src/os/appMeta.ts`.
2. Crie o componente em `src/apps/`.
3. Registre-o em `src/os/registry.tsx` e adicione um ícone em `src/os/Icons.tsx`.

## Publicar

Qualquer hospedagem estática funciona (Vercel, Netlify, GitHub Pages): build `npm run build`, pasta de saída `dist`.
