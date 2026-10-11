/**
 * Short, unique initials for a list of names (case-insensitive).
 * Earlier names keep their initials when later names are added.
 * Michael → "Mi", Mia → "Ma", "Anna Lena" → "AL".
 */
export function uniqueInitials(names: string[]): string[] {
  const used = new Set<string>();
  return names.map((name) => {
    const pick = candidates(name).find((c) => !used.has(c.toLowerCase())) ?? fallback(name, used);
    used.add(pick.toLowerCase());
    return pick;
  });
}

function candidates(name: string): string[] {
  const chars = [...name.trim()];
  if (chars.length === 0) return ['?'];
  const first = chars[0].toUpperCase();
  const result: string[] = [];

  const words = name.trim().split(/\s+/);
  if (words.length > 1) result.push(first + [...words[1]][0].toUpperCase());

  for (const c of chars.slice(1)) {
    if (/\s/.test(c)) continue;
    result.push(first + c.toLowerCase());
  }
  if (chars.length === 1) result.push(first);
  return result;
}

function fallback(name: string, used: Set<string>): string {
  const first = [...name.trim()][0]?.toUpperCase() ?? '?';
  for (let n = 2; ; n++) {
    if (!used.has(`${first}${n}`.toLowerCase())) return `${first}${n}`;
  }
}
