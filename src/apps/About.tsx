import { profile, skillIcons, skills } from '../data/content'
import { useWM } from '../os/context'

export function About() {
  const { openApp } = useWM()

  return (
    <div className="about">
      <aside className="about-side">
        <div className="drag-region fx-side-top" />
        {profile.photo ? (
          <img className="avatar" src={profile.photo} alt={profile.name} />
        ) : (
          <div className="avatar avatar-initials" aria-hidden="true">
            {profile.initials}
          </div>
        )}
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="muted">{profile.location}</p>
        <span className="status">
          <i /> {profile.availability}
        </span>
        <div className="about-actions">
          <button className="btn btn-primary" onClick={() => openApp('contact')}>
            Fale comigo
          </button>
          <button className="btn" onClick={() => openApp('projects')}>
            Ver projetos
          </button>
        </div>
      </aside>

      <div className="about-main">
        <div className="drag-region fx-strip" />
        <h2>Sobre mim</h2>
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}

        <h2>Habilidades</h2>
        {skills.map((g) => (
          <div key={g.group} className="skill-row">
            <span className="muted">{g.group}</span>
            <div className="chips">
              {g.items.map((s) => (
                <span key={s} className="chip">
                  {skillIcons[s] && <img className="chip-ico" src={`/skills/${skillIcons[s]}.png`} alt="" />}
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
