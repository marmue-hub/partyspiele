export interface PlayerColor {
  id: string;
  name: string;
  hex: string;
}

/** Palette for players – each color can only be taken by one player. */
export const PLAYER_COLORS: PlayerColor[] = [
  { id: 'red', name: 'Rot', hex: '#e53935' },
  { id: 'orange', name: 'Orange', hex: '#fb8c00' },
  { id: 'yellow', name: 'Gelb', hex: '#fdd835' },
  { id: 'lime', name: 'Limette', hex: '#c0ca33' },
  { id: 'green', name: 'Grün', hex: '#43a047' },
  { id: 'teal', name: 'Türkis', hex: '#00897b' },
  { id: 'cyan', name: 'Cyan', hex: '#00acc1' },
  { id: 'blue', name: 'Blau', hex: '#1e88e5' },
  { id: 'indigo', name: 'Indigo', hex: '#3949ab' },
  { id: 'purple', name: 'Lila', hex: '#8e24aa' },
  { id: 'pink', name: 'Pink', hex: '#d81b60' },
  { id: 'brown', name: 'Braun', hex: '#6d4c41' },
];

export function colorHex(id: string): string {
  return PLAYER_COLORS.find((c) => c.id === id)?.hex ?? '#607d8b';
}

/** Black or white, whichever is more readable on the given background. */
export function textColorOn(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.3 ? '#111' : '#fff';
}
