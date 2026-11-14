import { useState, type FormEvent } from 'react'
import { links } from '../data/content'

export function Contact() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  // Abre o app de e-mail do visitante já preenchido (sem backend).
  const send = (e: FormEvent) => {
    e.preventDefault()
    const href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
    window.location.href = href
  }

  return (
    <form className="mail" onSubmit={send}>
      <div className="mail-row">
        <label htmlFor="mail-to">Para:</label>
        <input id="mail-to" value={links.email} readOnly />
      </div>
      <div className="mail-row">
        <label htmlFor="mail-subject">Assunto:</label>
        <input id="mail-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Vamos conversar?" />
      </div>
      <textarea
        aria-label="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escreva sua mensagem aqui…"
      />
      <div className="mail-foot">
        <div className="mail-links">
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={links.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <button className="btn btn-primary" type="submit">
          Enviar
        </button>
      </div>
    </form>
  )
}
