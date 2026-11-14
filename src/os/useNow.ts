import { useEffect, useState } from 'react'

/** Data/hora atual, atualizada a cada `ms` milissegundos. */
export function useNow(ms = 15000): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}
