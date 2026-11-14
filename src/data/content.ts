/**
 * ============================================================
 *  CONTEÚDO DO PORTFÓLIO — edite apenas este arquivo.
 *
 *  Onde mudar cada coisa:
 *   • profile ............ nome, cargo, cidade, foto (public/foto.webp), bio, PDF do currículo
 *   • skills / skillIcons  habilidades (ícone opcional em public/skills/<nome>.png)
 *   • links .............. e-mail, telefone, GitHub, LinkedIn, WhatsApp, site, repositório
 *   • projects ........... projetos (capa e galeria em public/projects/<id>/)
 *   • experience / education  currículo e app LinkedIn
 *   • linkedinProfile .... textos extras do app LinkedIn (headline, conexões, capa...)
 *   • whatsappChat ....... mensagens e respostas rápidas do app WhatsApp
 *   • techStack .......... comando `stack` do Terminal
 * ============================================================
 */

export const profile = {
  name: 'Iago Bruno',
  fullName: 'Iago Bruno Cassiano da Silva',
  role: 'Desenvolvedor Full Stack',
  location: 'Macaíba, RN',
  availability: 'Disponível para novos projetos',
  photo: '/foto.webp',
  initials: 'IB',
  resumePdf: '/Curriculo_Iago_Bruno.pdf',
  bio: [
    'Desenvolvedor Full Stack com experiência em JavaScript, TypeScript, Node.js, NestJS, .NET/C#, React, Next.js e Flutter.',
    'Atuo do modelo de dados à interface, com foco em arquitetura limpa e escalável, boas práticas e automações inteligentes (n8n) para eliminar trabalho manual.',
    'Trabalho como freelancer, de forma remota, para clientes no Brasil e na Europa. Aprendizado contínuo e entrega de valor real em cada projeto.',
  ],
}

export const skills: { group: string; items: string[] }[] = [
  { group: 'Principais hoje', items: ['JavaScript', 'Node.js', 'Flutter', 'Python'] },
  { group: 'Linguagens', items: ['JavaScript', 'TypeScript', 'Python', 'C#', 'PHP', 'Dart'] },
  { group: 'Front-end', items: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Redux', 'SASS'] },
  { group: 'Back-end', items: ['Node.js', 'NestJS', 'Express', '.NET/C#', 'Laravel', 'APIs REST'] },
  { group: 'Mobile', items: ['Flutter', 'Dart'] },
  { group: 'Banco de dados', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'NoSQL'] },
  { group: 'DevOps e ferramentas', items: ['Git', 'GitHub', 'Docker', 'n8n', 'Figma', 'Deploy'] },
]

/** App GitHub: perfil + README do perfil (use **negrito** nos textos). Edite à vontade. */
export const githubProfile = {
  displayName: 'iago bruno',
  bio: 'Desenvolvedor Full Stack | JavaScript | React | Next | NestJS | Node | Flutter | Dart',
  followers: 1,
  following: 0,
  repositories: 45,
  stars: 28,
  readme: {
    title: 'Iago Bruno',
    subtitle: 'Full Stack Developer',
    tagline: 'Desenvolvimento de sistemas modernos e escaláveis',
    /** Botões vermelhos do topo (url vazia = usa o link correspondente em `links`) */
    buttons: ['LinkedIn', 'GitHub', 'Email', 'Portfólio', 'WhatsApp'],
    aboutTitle: '🧠 Sobre mim',
    about: [
      ['Atuação', 'Desenvolvedor **Full Stack**'],
      ['Perfil', 'Construo aplicações completas, do backend ao frontend, com arquitetura limpa e escalável.'],
      ['Backend', 'APIs REST com **Node.js**, **NestJS**, **Express**.'],
      ['Frontend', 'Interfaces modernas com **React** e **Next.js**.'],
      ['Mobile', 'Aplicativos multiplataforma com **Flutter**.'],
      ['UI', 'Estilização com **Tailwind CSS**.'],
      ['Bancos', 'PostgreSQL, MySQL e MongoDB.'],
      ['Local', 'Brasil — **remoto**, **híbrido** ou **presencial**.'],
    ] as [string, string][],
    code: `const iagoBruno = {
  cargo: "Desenvolvedor Full Stack",

  foco: [
    "Node.js, NestJS",
    "APIs REST e arquitetura escalável",
    "React e Next.js",
    "Flutter para apps mobile",
    "TypeScript e JavaScript",
    "Integrações, dashboards e sistemas web"
  ],

  objetivo:
    "Criar soluções modernas, escaláveis e bem estruturadas."
};`,
    stack: [
      { title: '💻 Linguagens', items: ['JavaScript', 'TypeScript', 'C#', 'Dart'] },
      { title: '🎨 Frontend', items: ['React', 'Next.js', 'TailwindCSS', 'HTML5', 'CSS3'] },
      { title: '📱 Mobile', items: ['Flutter', 'Dart'] },
      { title: '🧱 Backend', items: ['Node.js', 'NestJS', 'Express', '.NET'] },
      { title: '🗄️ Banco de Dados', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
      { title: '⚙️ DevOps & Ferramentas', items: ['Git', 'GitHub', 'Docker', 'n8n'] },
      { title: '🎨 Design', items: ['Figma', 'Photoshop'] },
    ],
    expertiseTitle: '📊 Distribuição de Expertise',
    expertise: [
      { area: 'Frontend', percent: 90, highlight: 'React, Next.js, Tailwind' },
      { area: 'Backend', percent: 90, highlight: 'Node.js, C# .NET' },
      { area: 'Full Stack', percent: 88, highlight: 'Integração completa frontend + backend' },
      { area: 'Mobile', percent: 89, highlight: 'Flutter, Dart' },
      { area: 'Banco de Dados', percent: 82, highlight: 'Modelagem e performance' },
    ],
    openTitle: '🌍 Aberto a oportunidades',
    openRoles: ['Desenvolvedor Full Stack', 'Desenvolvedor Backend (.NET / Node.js)', 'Desenvolvedor Frontend', 'Desenvolvedor Mobile (Flutter)'],
    openModels: ['Remoto', 'Híbrido', 'Presencial'],
    footer: 'Construa com Código e Propósito',
  },
}

/** Mensagens do app WhatsApp: `inbox` aparece como se fosse você falando; `quick` são os botões de resposta rápida. */
export const whatsappChat = {
  inbox: [
    'Oi! Que bom ter você por aqui.',
    'Sou o Iago. Me conta: você quer falar de um projeto, de uma vaga ou só trocar uma ideia?',
  ],
  quick: ['Quero um orçamento', 'Tenho uma vaga para você', 'Só passei para dar oi'],
}

/** Textos do app LinkedIn (edite aqui quando seu perfil mudar). */
export const linkedinProfile = {
  headline: 'Desenvolvedor Full Stack | JavaScript | React | Next | NestJS | Node | Flutter | Dart',
  locationFull: 'Macaíba, Rio Grande do Norte, Brasil',
  connections: 'Mais de 500 conexões',
  /** Faixa azul "aberto a oportunidades". Deixe openTo vazio ('') para esconder. */
  openTo: 'Aberto a oportunidades · Full Stack, Backend e Frontend',
  openToDetail: 'Macaíba, RN · Remoto · Híbrido · Presencial',
  /** Imagem de capa (arquivo em public/) */
  cover: '/linkedin-capa.webp',
  /** Empresa mostrada ao lado do nome. Use o índice de `experience` (0 = primeira). */
  currentCompanyIndex: 0,
}

/** Ícones (public/skills) para as habilidades que têm um. */
export const skillIcons: Record<string, string> = {
  JavaScript: 'js',
  TypeScript: 'ts',
  'C#': 'csharp',
  Dart: 'dart',
  React: 'react',
  'Next.js': 'next',
  'Tailwind CSS': 'tailwind',
  HTML5: 'html',
  CSS3: 'css',
  'Node.js': 'node',
  NestJS: 'nestjs',
  Express: 'express',
  '.NET/C#': 'dotnet',
  Flutter: 'flutter',
  PostgreSQL: 'postgres',
  MySQL: 'mysql',
  MongoDB: 'mongodb',
  Git: 'git',
  GitHub: 'github',
  Docker: 'docker',
}

export const links = {
  email: 'iago.silva6969@gmail.com',
  phone: '(84) 9 9145-4957',
  github: 'https://github.com/iago193',
  linkedin: 'https://linkedin.com/in/iago-bruno-developer',
  whatsapp: 'https://wa.me/558491454957',
  site: 'https://iagobrunodev.vercel.app',
  repo: 'https://github.com/iago193/iago-os-portfolio',
}

/** Usado pelo comando `stack` do Terminal (para quem é técnico). */
export const techStack: { name: string; version: string; note: string }[] = [
  { name: 'React', version: '19', note: 'UI com hooks e React Compiler' },
  { name: 'TypeScript', version: '6', note: 'tipagem estrita em todo o projeto' },
  { name: 'Vite', version: '8', note: 'dev server e build' },
  { name: 'CSS puro', version: '-', note: 'variáveis CSS para tema claro/escuro, sem framework' },
  { name: 'Window manager', version: 'custom', note: 'useReducer + Pointer Events (arrastar/redimensionar)' },
]

/**
 * CATEGORIAS dos projetos (aparecem na barra lateral do app Projetos, nesta ordem).
 * Para criar uma categoria nova, adicione o nome aqui e use-o em `category` do projeto.
 * Categorias sem nenhum projeto não aparecem na barra lateral.
 */
export const CATEGORIES = ['Web', 'IA', 'Mobile', 'Design'] as const
export type ProjectCategory = (typeof CATEGORIES)[number]

/** Cores padrão do thumbnail de cada categoria (usadas quando o projeto não define `colors`). */
const CATEGORY_COLORS: Record<ProjectCategory, [string, string]> = {
  Web: ['#3b82f6', '#6366f1'],
  IA: ['#f97316', '#ef4444'],
  Mobile: ['#10b981', '#14b8a6'],
  Design: ['#ec4899', '#a855f7'],
}

export interface Project {
  id: string
  name: string
  category: ProjectCategory
  year: string
  summary: string
  description: string
  stack: string[]
  colors: [string, string]
  glyph: string
  cover: string
  gallery: string[]
  demo?: string
  repo?: string
}

/**
 * O que você precisa preencher para um projeto novo: id, name, category, year, summary,
 * description e stack. O resto é opcional:
 *   • Imagens: crie a pasta public/projects/<id>/ com `cover.webp` (capa) e `1.webp`, `2.webp`...
 *     (capturas de tela). Informe quantas capturas existem em `shots`.
 *   • colors / glyph: só se quiser personalizar o thumbnail (sem capa) e o ponto do GitHub.
 *   • demo / repo: links "Ver online" e "Código".
 */
interface ProjectInput {
  id: string
  name: string
  category: ProjectCategory
  year: string
  summary: string
  description: string
  stack: string[]
  shots?: number
  cover?: string
  colors?: [string, string]
  glyph?: string
  demo?: string
  repo?: string
}

const buildProject = (p: ProjectInput): Project => ({
  ...p,
  colors: p.colors ?? CATEGORY_COLORS[p.category],
  glyph: p.glyph ?? p.name.charAt(0).toUpperCase(),
  cover: p.cover ?? `/projects/${p.id}/cover.webp`,
  gallery: Array.from({ length: p.shots ?? 0 }, (_, i) => `/projects/${p.id}/${i + 1}.webp`),
})

/* ↓↓↓ ADICIONE NOVOS PROJETOS AQUI (o mais novo primeiro) ↓↓↓ */
const projectList: ProjectInput[] = [
  {
    id: 'iago-os',
    name: 'iago OS (este portfólio)',
    category: 'Web',
    year: '2026',
    summary: 'Portfólio em forma de desktop: janelas, dock, terminal e apps.',
    description:
      'Este portfólio é um desktop completo no navegador: barra de menu, dock, janelas arrastáveis e redimensionáveis, tela de bloqueio, busca (Ctrl/⌘ + K), temas claro e escuro, papéis de parede e um Terminal com comandos para quem é técnico. Cada app é uma seção: Projetos (estilo Finder), Sobre mim, Currículo, Contato, WhatsApp, LinkedIn e GitHub, que busca meus repositórios reais na API do GitHub. Feito sem bibliotecas de interface, com um gerenciador de janelas próprio.',
    stack: ['React', 'TypeScript', 'Vite', 'CSS', 'GitHub API'],
    shots: 6,
    repo: 'https://github.com/iago193/iago-os-portfolio',
    colors: ['#2563eb', '#0ea5e9'],
  },
  // Modelo para copiar e colar (apague o `//` de cada linha):
  // {
  //   id: 'meu-projeto', // nome da pasta em public/projects/
  //   name: 'Meu Projeto',
  //   category: 'Web', // Web | IA | Mobile | Design (veja CATEGORIES acima)
  //   year: '2026',
  //   summary: 'Frase curta que aparece na lista.',
  //   description: 'Texto completo que aparece ao abrir o projeto.',
  //   stack: ['React', 'Node.js'],
  //   shots: 3, // quantas capturas 1.webp, 2.webp... existem na pasta (0 se não tiver)
  //   demo: 'https://...', // opcional
  //   repo: 'https://github.com/...', // opcional
  // },

  {
    id: 'lovyon',
    name: 'Lovyon',
    category: 'Web',
    year: '2026',
    summary: 'Plataforma de descoberta e venda de ingressos para eventos na Europa.',
    description:
      'Plataforma completa de descoberta e venda de ingressos, estilo Fever/GetYourGuide, desenvolvida do zero como freelancer (back-end e front-end). Cobre toda a jornada, da criação do evento pelo produtor até a compra pelo cliente final, pensada para o mercado europeu: euros, cidades europeias e interface em 5 idiomas (inglês, português, espanhol, francês e italiano). Inclui checkout seguro, e-tickets com QR code, mapas de assentos e painel em tempo real para produtores.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    colors: ['#ec4899', '#8b5cf6'],
    shots: 5,
    demo: 'https://lovyon.com/',
  },
  {
    id: 'agente-ia',
    name: 'Agente de IA',
    category: 'IA',
    year: '2026',
    summary: 'Atendimento automatizado para mercados autônomos da NEW MARKET.',
    description:
      'Agente de IA desenvolvido para atendimento automatizado da NEW MARKET, focado em suporte ao cliente em mercados autônomos. Fluxos orquestrados no n8n, com dados em Supabase/PostgreSQL e execução em Docker.',
    stack: ['n8n', 'Supabase', 'PostgreSQL', 'Docker'],
    colors: ['#f97316', '#ef4444'],
    shots: 1,
  },
  {
    id: 'protocolo-seco',
    name: 'Protocolo Seco',
    category: 'Web',
    year: '2026',
    summary: 'Site de um método prático para redução de gordura corporal.',
    description:
      'Protocolo Seco é um método prático e estratégico focado na redução de gordura corporal de forma rápida e eficiente, sem dietas extremas. Combinações alimentares inteligentes e um plano estruturado para acelerar o processo de emagrecimento.',
    stack: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
    colors: ['#10b981', '#14b8a6'],
    shots: 5,
  },
  {
    id: 'brasilnow',
    name: 'BrasilNow',
    category: 'Web',
    year: '2026',
    summary: 'Site de notícias que consome feeds RSS por categoria.',
    description:
      'Site de notícias desenvolvido com Next.js, React e TypeScript, focado em consumo de APIs e renderização dinâmica de conteúdo. Consome feeds RSS para exibir notícias atualizadas por categoria: Geral, Economia, Política, Mundo e Saúde.',
    stack: ['Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
    colors: ['#22c55e', '#eab308'],
    shots: 3,
    repo: 'https://github.com/iago193/brasilnow',
  },
  {
    id: 'smart-stock',
    name: 'Smart Stock',
    category: 'Web',
    year: '2026',
    summary: 'Sistema inteligente de controle de estoque.',
    description:
      'Sistema de controle de estoque com Next.js, Express e Prisma, focado no gerenciamento de produtos, vendas e movimentações, com arquitetura escalável, API REST e atualização em tempo real.',
    stack: ['Next.js', 'Express', 'Prisma', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    colors: ['#3b82f6', '#06b6d4'],
    shots: 5,
    repo: 'https://github.com/iago193/smart-stock-app',
  },
  {
    id: 'portfolio',
    name: 'Portfólio (versão anterior)',
    category: 'Web',
    year: '2025',
    summary: 'Portfólio em React com gráficos 3D e animações fluidas.',
    description:
      'Portfólio dinâmico em React com gráficos 3D imersivos e animações fluidas. Inclui seções interativas como Sobre, Educação, Projetos, Conectar e Contato.',
    stack: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
    colors: ['#6366f1', '#a855f7'],
    shots: 5,
    repo: 'https://github.com/iago193/react-show-case',
  },
  {
    id: 'schooldesk',
    name: 'SchoolDesk',
    category: 'Web',
    year: '2025',
    summary: 'Organização escolar: tarefas, matérias, horários e anotações.',
    description:
      'Aplicação web voltada para organização escolar, permitindo gerenciar tarefas, matérias, horários e anotações em um único ambiente. Interface simples e intuitiva para acompanhar a rotina acadêmica de alunos e professores.',
    stack: ['React', 'TypeScript', 'Node.js', 'Prisma', 'Tailwind CSS'],
    colors: ['#0ea5e9', '#6366f1'],
    shots: 5,
    repo: 'https://github.com/iago193/SchoolDesk',
  },
  {
    id: 'elite-pizzaria',
    name: 'Elite Pizzaria',
    category: 'Web',
    year: '2025',
    summary: 'Sistema de gerenciamento completo para pizzarias.',
    description:
      'Sistema completo de gerenciamento para pizzarias, desenvolvido com PHP e integrado a banco de dados. Controla pedidos, produtos, estoque e atendimento com uma interface moderna e eficiente.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    colors: ['#ef4444', '#f59e0b'],
    shots: 5,
  },
]

export const projects: Project[] = projectList.map(buildProject)

export interface Experience {
  company: string
  role: string
  period: string
  /** Tipo de vínculo (ex.: Freelance, CLT). Opcional. */
  kind?: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    company: 'LovyON',
    role: 'Desenvolvedor Full Stack Freelancer',
    period: 'Atual',
    kind: 'Freelance',
    bullets: [
      'Responsável sozinho pelo desenvolvimento completo, front-end e back-end, de uma plataforma de venda de ingressos para eventos ao vivo, atendendo vários países da Europa.',
      'Checkout seguro com processamento de pagamentos, e-tickets com QR code e mapas de assentos digitais.',
      'Painel em tempo real para produtores acompanharem vendas e gerenciarem eventos (ingresso único, lugar marcado e recorrentes).',
    ],
  },
  {
    company: 'Nascom',
    role: 'Desenvolvedor Full Stack Freelancer',
    period: 'Atual',
    kind: 'Freelance',
    bullets: ['Desenvolvimento e manutenção de sistemas web sob demanda, dando suporte às necessidades técnicas da empresa.'],
  },
]

export const education = [
  { school: '', course: 'JavaScript e TypeScript Avançado — Full Stack', period: 'Jun 2025 — Nov 2025' },
  { school: '', course: 'Desenvolvimento Web Completo', period: 'Out 2024 — Jun 2025' },
]
