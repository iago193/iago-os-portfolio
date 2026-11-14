import { education, experience, links, profile, skills } from '../data/content'

const initials = (s: string) => s.slice(0, 2).toUpperCase()

export function LinkedIn() {
  const headline = `${profile.role} | JavaScript | React | Next | NestJS | Node | Flutter | Dart`
  const current = experience[0]

  return (
    <div className="li">
      <section className="li-card li-top">
        <div className="li-banner" style={{ backgroundImage: 'url(/linkedin-capa.webp)' }} />
        <img className="li-avatar" src={profile.photo} alt={profile.name} />

        <div className="li-info">
          <div className="li-row">
            <h1>
              {profile.name}
              <svg viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-label="Perfil verificado">
                <path d="M8 1.5 13.5 3.4v4.2c0 3.1-2.2 5.6-5.5 6.9C4.7 13.2 2.5 10.7 2.5 7.6V3.4Z" />
                <path d="m5.6 8 1.7 1.7 3.2-3.4" />
              </svg>
            </h1>
            <span className="li-company">
              <i>{initials(current.company)}</i>
              {current.company}
            </span>
          </div>
          <p className="li-headline">{headline}</p>
          <p className="li-meta">
            {profile.location.replace('RN', 'Rio Grande do Norte, Brasil')} ·{' '}
            <a href={`mailto:${links.email}`}>Dados de contato</a>
          </p>
          <p className="li-meta">
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              Mais de 500 conexões
            </a>
          </p>

          <div className="li-btns">
            <a className="li-btn li-btn-fill" href={links.linkedin} target="_blank" rel="noreferrer">
              Ver perfil completo
            </a>
            <a className="li-btn" href={`mailto:${links.email}`}>
              Enviar mensagem
            </a>
            <a className="li-btn" href={profile.resumePdf} download>
              Baixar currículo
            </a>
          </div>

          <div className="li-open">
            <strong>Aberto a oportunidades · Full Stack, Backend e Frontend</strong>
            <span>
              {profile.location} · Remoto · Híbrido · Presencial
            </span>
          </div>
        </div>
      </section>

      <section className="li-card">
        <h2>Sobre</h2>
        {profile.bio.map((b) => (
          <p key={b}>{b}</p>
        ))}
      </section>

      <section className="li-card">
        <h2>Experiência</h2>
        {experience.map((e) => (
          <div key={e.company + e.period} className="li-item">
            <i className="li-logo">{initials(e.company)}</i>
            <div>
              <strong>{e.role}</strong>
              <span>{e.company} · Freelance</span>
              <span className="li-dim">{e.period}</span>
              <p>{e.bullets[0]}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="li-card">
        <h2>Formação</h2>
        {education.map((e) => (
          <div key={e.course} className="li-item">
            <i className="li-logo">★</i>
            <div>
              <strong>{e.course}</strong>
              <span className="li-dim">{e.period}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="li-card">
        <h2>Competências</h2>
        {skills.map((g) => (
          <div key={g.group} className="li-skill">
            <strong>{g.group}</strong>
            <span>{g.items.join(' · ')}</span>
          </div>
        ))}
      </section>
    </div>
  )
}
