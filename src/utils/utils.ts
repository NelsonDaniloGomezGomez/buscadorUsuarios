//por seguridad minima
export function limpiarUrl( url: unknown ): string {
  try {
    const u = new URL(String(url));
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return '';
    return u.toString();
  } catch {
    return '';
  }
}

export function limitarTexto( val: unknown , max = 300 ): string {
  if (val == null) return '';
  const s = String(val);
  return s.length > max ? s.slice(0, max) + '…' : s;
}
