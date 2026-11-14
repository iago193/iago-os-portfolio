# iago OS

Meu portfólio, montado como se fosse um sistema operacional de desktop: tela de bloqueio, barra de menu, dock, janelas que arrastam e redimensionam, busca, terminal e apps para cada seção. A semelhança com um desktop é só visual.

Site: https://iagobrunodev.vercel.app

## Tecnologias

- React 19 e TypeScript, com React Compiler
- Vite
- CSS puro (sem biblioteca de componentes, sem Tailwind)
- Nenhuma dependência de runtime além de `react` e `react-dom`

O gerenciador de janelas, os menus, os ícones e os apps foram escritos do zero.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # confere os tipos e gera a pasta dist/
npm run preview  # serve o build localmente
npm run lint
```

## O que tem no sistema

- Tela de bloqueio, notificações e Central de Controle (tema claro/escuro, brilho, plano de fundo).
- Barra de menu com menus funcionais e busca em qualquer tela (Ctrl/⌘ + K).
- Dock e ícones no desktop, clique direito no desktop e janelas com minimizar, maximizar, arrastar e redimensionar.
- Projetos: janela no estilo Finder. Cada projeto é uma pasta com a capa; ao abrir, aparecem as imagens como arquivos, a descrição e os links. Também mostra todos os repositórios públicos do GitHub como pastas.
- Sobre mim, Currículo (com download do PDF) e Contato (abre o e-mail já preenchido).
- WhatsApp: conversa que abre o WhatsApp de verdade com a mensagem pronta.
- LinkedIn: réplica do meu perfil, sempre no tema claro.
- GitHub: perfil, README do perfil, repositórios e gráfico de contribuições, tudo lido do GitHub ao abrir.
- Terminal de demonstração, somente leitura (`help`, `stack`, `tree`, `git log`, `cat package.json`, `theme`, `lock` e outros).
- Responsivo: no celular as janelas ocupam a tela inteira e o dock rola na horizontal.

## Estrutura

```
public/
  foto.webp, linkedin-capa.webp, og-image.jpg, favicon.svg
  Curriculo_Iago_Bruno.pdf
  icons/        whatsapp.png, linkedin.png, github.png
  skills/       ícones das tecnologias
  projects/     <id>/cover.webp e 1.webp, 2.webp...
scripts/
  update-repos.mjs   atualiza a cópia local dos repositórios
src/
  data/
    content.ts       todo o conteúdo do site
    githubRepos.ts   cópia dos repositórios públicos (reserva)
    useGithub.ts     busca dados do GitHub ao vivo
  os/                sistema: janelas, menu, dock, busca, tema
  apps/              um componente por app
  styles/
    os.css           shell (menu, dock, janelas, mobile)
    apps.css         conteúdo dos apps
```

## Como funciona

### Gerenciador de janelas

O estado fica em `src/os/reducer.ts` (`useReducer`) e é distribuído por contexto (`WMProvider`, `useWM`). Cada janela guarda posição, tamanho, ordem de empilhamento (`z`) e se está minimizada ou maximizada. Ao abrir, a posição da janela é ajustada para ela caber na tela, inclusive em telas pequenas.

`Window.tsx` usa Pointer Events para arrastar e redimensionar. Dá para arrastar pela barra de título ou por qualquer área marcada com `drag-region`, exceto botões e campos. Os tamanhos e o estilo de cada app estão em `src/os/appMeta.ts`, e `registry.tsx` liga o id do app ao componente.

Apps com `unified: true` usam o estilo Finder: barra lateral translúcida até o topo e a barra de título por cima.

### Conteúdo

Tudo o que é texto está em `src/data/content.ts`: perfil, habilidades, links, projetos, experiência, formação e os textos dos apps LinkedIn, WhatsApp e GitHub. Para trocar um dado, só esse arquivo precisa mudar.

### Dados do GitHub

`useGithub.ts` tem três hooks:

- `useGithub`: perfil e repositórios públicos, pela API do GitHub. O resultado fica 10 minutos no `sessionStorage`. Se a chamada falhar, usa a lista salva em `githubRepos.ts`.
- `useReadme`: README do repositório `<usuário>/<usuário>` em HTML. O HTML passa por uma limpeza (remove scripts e atributos de evento) antes de ser exibido. Se falhar, mostra a versão escrita em `content.ts`.
- `useContributions`: gráfico de contribuições do último ano. O GitHub não tem API oficial para isso, então usa o serviço público `github-contributions-api.jogruber.de`. Se ele estiver fora do ar, o gráfico não aparece.

### Responsivo

Abaixo de 720 px as janelas viram tela cheia, as barras laterais viram faixas de botões, a grade da tela inicial passa a ter 4 colunas e o dock rola. Há ajustes para celular deitado (altura menor que 520 px), `100dvh` e áreas seguras (`env(safe-area-inset-*)`). Ao desbloquear no computador, o app Sobre mim abre sozinho; no celular a tela inicial fica livre.

## Como editar

### Projetos e categorias

Em `src/data/content.ts`:

1. Para uma categoria nova, adicione o nome em `CATEGORIES`. Ela aparece na barra lateral do app Projetos assim que tiver um projeto.
2. Para um projeto novo, copie o modelo comentado em `projectList` e preencha `id`, `name`, `category`, `year`, `summary`, `description` e `stack`.
3. Coloque as imagens em `public/projects/<id>/`: `cover.webp` para a capa e `1.webp`, `2.webp`... para as capturas. Informe quantas existem em `shots`.
4. `demo` e `repo` são opcionais e geram os botões "Ver online" e "Código".

### Habilidades

Em `skills`, cada grupo tem uma lista de nomes. O grupo "Principais hoje" fica em destaque. Para mostrar um ícone, coloque `public/skills/<nome>.png` e registre em `skillIcons`.

### Currículo, foto e ícones

- `public/Curriculo_Iago_Bruno.pdf`: PDF usado no botão de download.
- `public/foto.webp`: foto do perfil (`profile.photo`).
- `public/linkedin-capa.webp`: capa do app LinkedIn.
- `public/icons/`: ícones de WhatsApp, LinkedIn e GitHub (PNG 256×256, fundo transparente). Para trocar, substitua o arquivo mantendo o nome.

### Lista de repositórios de reserva

```bash
node scripts/update-repos.mjs
```

Reescreve `src/data/githubRepos.ts` com os repositórios públicos atuais. É a lista exibida quando a API do GitHub não responde.

## Criar um app novo

1. Adicione o id e os tamanhos em `src/os/appMeta.ts` (tipo `AppId`, `APP_META` e `APP_ORDER`).
2. Crie o componente em `src/apps/`.
3. Registre em `src/os/registry.tsx` e adicione um ícone em `src/os/Icons.tsx`.

## Publicação

O projeto é estático. `npm run build` gera a pasta `dist/`, que pode ir para qualquer hospedagem de arquivos (hoje está na Vercel). `public/robots.txt` e `public/sitemap.xml` já estão configurados para o domínio do site.
