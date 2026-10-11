/**
 * Keeps the screen awake while a game is open (iOS 16.4+).
 * Returns a release function. Re-acquires the lock when the app becomes visible again.
 */
export function keepAwake(): () => void {
  let lock: WakeLockSentinel | null = null;
  let active = true;

  async function acquire() {
    if (!active || !('wakeLock' in navigator) || document.visibilityState !== 'visible') return;
    try {
      lock = await navigator.wakeLock.request('screen');
    } catch {
      // not allowed / not supported – ignore
    }
  }

  const onVisible = () => {
    if (document.visibilityState === 'visible') acquire();
  };

  acquire();
  document.addEventListener('visibilitychange', onVisible);

  return () => {
    active = false;
    document.removeEventListener('visibilitychange', onVisible);
    lock?.release().catch(() => {});
    lock = null;
  };
}
