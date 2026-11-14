import { useState, type FormEvent } from 'react'
import { links, profile, whatsappChat } from '../data/content'

export function WhatsApp() {
  const [text, setText] = useState('')
  const [sent, setSent] = useState<string[]>([])

  // Abre o WhatsApp do visitante com a mensagem já escrita (sem backend).
  const send = (e: FormEvent) => {
    e.preventDefault()
    const msg = text.trim()
    if (!msg) return
    setSent((s) => [...s, msg])
    setText('')
    window.open(`${links.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  return (
    <div className="wa">
      <header className="wa-head">
        <span className="wa-avatar" aria-hidden="true">
          {profile.initials}
        </span>
        <div>
          <strong>{profile.name}</strong>
          <span>online</span>
        </div>
      </header>

      <div className="wa-chat">
        {whatsappChat.inbox.map((m) => (
          <p key={m} className="wa-bubble wa-in">
            {m}
          </p>
        ))}
        {sent.map((m, i) => (
          <p key={i} className="wa-bubble wa-out">
            {m}
          </p>
        ))}
        {sent.length > 0 && <p className="wa-note">Abrimos o WhatsApp com a sua mensagem pronta para enviar.</p>}
      </div>

      <div className="wa-quick">
        {whatsappChat.quick.map((q) => (
          <button key={q} type="button" className="chip" onClick={() => setText(q)}>
            {q}
          </button>
        ))}
      </div>

      <form className="wa-foot" onSubmit={send}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Digite uma mensagem" aria-label="Mensagem" />
        <button className="wa-send" type="submit" aria-label="Enviar" disabled={!text.trim()}>
          ➤
        </button>
      </form>
    </div>
  )
}
