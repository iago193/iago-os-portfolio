import { education, experience, links, profile, skills } from '../data/content'

export function Resume() {
  return (
    <div className="resume">
      <div className="resume-bar">
        <span className="muted">Página 1 de 1</span>
        <a className="btn btn-primary" href={profile.resumePdf} download>
          Baixar PDF
        </a>
      </div>

      <div className="resume-scroll">
        <article className="paper">
          <header>
            <h1>{profile.fullName}</h1>
            <p className="role">{profile.role}</p>
            <p className="muted">
              {profile.location} · {links.email} · {links.phone}
            </p>
          </header>

          <h2>Experiência</h2>
          {experience.map((e) => (
            <section key={e.company + e.period} className="job">
              <div className="job-head">
                <strong>
                  {e.role} · {e.company}
                </strong>
                <span className="muted">{e.period}</span>
              </div>
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </section>
          ))}

          <h2>Formação</h2>
          {education.map((e) => (
            <div key={e.course} className="job-head">
              <span>
                <strong>{e.course}</strong>{e.school && ` — ${e.school}`}
              </span>
              <span className="muted">{e.period}</span>
            </div>
          ))}

          <h2>Habilidades</h2>
          {skills.map((g) => (
            <p key={g.group}>
              <strong>{g.group}:</strong> {g.items.join(', ')}
            </p>
          ))}
        </article>
      </div>
    </div>
  )
}
