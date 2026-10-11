/**
 * Reactive state that is mirrored to localStorage.
 * Use via `const x = persisted('key', initial)` and read/write `x.value`.
 */
export function persisted<T>(key: string, initial: T) {
  const storageKey = `partyspiele:${key}`;
  let value = $state<T>(load(storageKey, initial));

  $effect.root(() => {
    $effect(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(value));
      } catch {
        // storage unavailable (private mode) – keep in-memory only
      }
    });
  });

  return {
    get value() {
      return value;
    },
    set value(v: T) {
      value = v;
    },
  };
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    // Merge plain objects so newly added settings get their defaults.
    if (isPlainObject(fallback) && isPlainObject(parsed)) return { ...fallback, ...parsed };
    return parsed as T;
  } catch {
    return fallback;
  }
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
